// clerk.ts
"use node";

import type { WebhookEvent } from "@clerk/clerk-sdk-node";
import { v } from "convex/values";
import { Webhook } from "svix";

import { internalAction } from "./_generated/server";

/*
  Pull the webhook secret from environment.
  Clerk provides this so you can verify requests genuinely came from them.
*/
const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || "";

export const fulfill = internalAction({
  /*
    Define `args` shape: we expect raw headers and raw payload string.
  */
  args: { headers: v.any(), payload: v.string() },
  handler: async (ctx, args) => {
    /*
      Instantiate Svix webhook verifier with our secret.
    */
    const wh = new Webhook(webhookSecret);

    /*
      `verify` checks HMAC signature against our secret.
      If valid, returns the parsed payload as `WebhookEvent`.
    */
    const payload = wh.verify(args.payload, args.headers) as WebhookEvent;

    /*
      Return the validated Clerk event to whoever called this action.
    */
    return payload;
  },
});
