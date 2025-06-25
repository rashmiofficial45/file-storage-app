// users.ts
import { ConvexError, v } from "convex/values";
import {
  internalMutation,
  MutationCtx,
  query,
  QueryCtx,
} from "./_generated/server";
import { roles } from "./schema";

/*
  Helper: fetch a user by their tokenIdentifier.
  Throws if user not found.
*/
export const getUser = async (
  ctx: QueryCtx | MutationCtx,
  tokenIdentifier: string
) => {
  const user = await ctx.db
    .query("users")
    .withIndex("by_tokenIdentifier", (q) =>
      q.eq("tokenIdentifier", tokenIdentifier)
    )
    .first();
  if (!user) throw new ConvexError("User not found");
  return user;
};

/*
  INTERNAL: create a new user record.
  Only server code (e.g. webhooks) can call this.
*/
export const createUser = internalMutation({
  args: {
    tokenIdentifier: v.string(),
    name: v.string(),
    image: v.string(),
  },
  async handler(ctx, args) {
    await ctx.db.insert("users", {
      tokenIdentifier: args.tokenIdentifier /* Unique Clerk identifier */,
      orgIds: [] /* Empty array to start */,
      name: args.name,
      image: args.image,
    });
  },
});

/*
  INTERNAL: update an existing user’s basic profile info.
*/
export const updateUser = internalMutation({
  args: {
    tokenIdentifier: v.string(),
    name: v.string(),
    image: v.string(),
  },
  async handler(ctx, args) {
    const user = await getUser(ctx, args.tokenIdentifier);
    await ctx.db.patch(user._id, {
      name: args.name,
      image: args.image,
    });
  },
});

/*
  INTERNAL: add a new organization to a user’s orgIds array.
*/
export const addOrgIdToUser = internalMutation({
  args: {
    tokenIdentifier: v.string(),
    orgId: v.string(),
    role: roles,
  },
  async handler(ctx, args) {
    const user = await getUser(ctx, args.tokenIdentifier);
    await ctx.db.patch(user._id, {
      orgIds: [...user.orgIds, { orgId: args.orgId, role: args.role }],
    });
  },
});

/*
  INTERNAL: update a user’s role within an org.
  Finds the matching org entry and mutates its role.
*/
export const updateRoleInOrgForUser = internalMutation({
  args: {
    tokenIdentifier: v.string(),
    orgId: v.string(),
    role: roles,
  },
  async handler(ctx, args) {
    const user = await getUser(ctx, args.tokenIdentifier);
    const orgEntry = user.orgIds.find((o) => o.orgId === args.orgId);
    if (!orgEntry) throw new ConvexError("User not found in the organization");
    orgEntry.role = args.role;
    await ctx.db.patch(user._id, { orgIds: user.orgIds });
  },
});

/*
  PUBLIC QUERY: fetch another user’s public profile by userId.
*/
export const getUserProfile = query({
  args: { userId: v.id("users") },
  async handler(ctx, args) {
    const user = await ctx.db.get(args.userId);
    return {
      name: user?.name,
      image: user?.image,
    };
  },
});

/*
  PUBLIC QUERY: fetch the “current user” based on auth context.
  Returns full user record or null.
*/
export const getMe = query({
  args: {},
  async handler(ctx) {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const user = await getUser(ctx, identity.tokenIdentifier);
    return user || null;
  },
});
