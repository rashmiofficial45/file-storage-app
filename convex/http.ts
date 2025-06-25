// http.ts
import { httpRouter } from "convex/server";
import { internal } from "./_generated/api";
import { httpAction } from "./_generated/server";

/*
  Instantiate a router to define HTTP endpoints.
  Convex’s `httpRouter()` wires Express-style routes to server-side actions.
*/
const http = httpRouter();

http.route({
  path: "/clerk" /* URL path that Clerk will POST webhooks to */,
  method: "POST" /* Only accept HTTP POST requests */,
  handler: httpAction(async (ctx, request) => {
    /*
      Read raw body text (Clerk sends a JSON payload, but we verify signature first).
    */
    const payloadString = await request.text();
    const headerPayload = request.headers;

    try {
      /*
        Call our internal Action to verify the webhook signature.
        We pass the raw payload and headers so that Svix can verify authenticity.
      */
      const result = await ctx.runAction(internal.clerk.fulfill, {
        payload: payloadString,
        headers: {
          "svix-id": headerPayload.get("svix-id")! /* Unique Svix event ID */,
          "svix-timestamp":
            headerPayload.get("svix-timestamp")! /* When Clerk sent it */,
          "svix-signature":
            headerPayload.get("svix-signature")! /* HMAC signature */,
        },
      });

      console.log(result); /* Log the parsed Clerk event for debugging */

      /*
        Depending on Clerk’s event type, call the appropriate internal mutation
        to sync users/orgs in our Convex DB.
      */
      switch (result.type) {
        case "user.created":
          await ctx.runMutation(internal.users.createUser, {
            tokenIdentifier: `https://${process.env.CLERK_HOSTNAME}|${result.data.id}`,
            name: `${result.data.first_name ?? ""} ${result.data.last_name ?? ""}`,
            image: result.data.image_url,
          });
          break;
        case "user.updated":
          await ctx.runMutation(internal.users.updateUser, {
            tokenIdentifier: `https://${process.env.CLERK_HOSTNAME}|${result.data.id}`,
            name: `${result.data.first_name ?? ""} ${result.data.last_name ?? ""}`,
            image: result.data.image_url,
          });
          break;
        case "organizationMembership.created":
          await ctx.runMutation(internal.users.addOrgIdToUser, {
            tokenIdentifier: `https://${process.env.CLERK_HOSTNAME}|${result.data.public_user_data.user_id}`,
            orgId: result.data.organization.id,
            role: result.data.role === "org:admin" ? "admin" : "member",
          });
          break;
        case "organizationMembership.updated":
          await ctx.runMutation(internal.users.updateRoleInOrgForUser, {
            tokenIdentifier: `https://${process.env.CLERK_HOSTNAME}|${result.data.public_user_data.user_id}`,
            orgId: result.data.organization.id,
            role: result.data.role === "org:admin" ? "admin" : "member",
          });
          break;
      }

      /*
        Respond with 200 OK so Clerk knows we handled it.
      */
      return new Response(null, { status: 200 });
    } catch (err) {
      /*
        Signature verification failed or mutation threw—return 400
      */
      return new Response("Webhook Error", { status: 400 });
    }
  }),
});

export default http;
