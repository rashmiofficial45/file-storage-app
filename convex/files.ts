import { ConvexError, v } from "convex/values";
import { mutation, MutationCtx, query, QueryCtx } from "./_generated/server";
import { getUser } from "./users";

export const generateUploadUrl = mutation(async (ctx) => {
  const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError(" Must be Loggedin to create Files");
    }
  return await ctx.storage.generateUploadUrl();
});


async function hasAccessToOrg(
  ctx: MutationCtx | QueryCtx,
  orgId: string
): Promise<boolean> {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    return false;
  }
  const user = await getUser(ctx, identity.tokenIdentifier);
  return user.orgIds.includes(orgId) || user.tokenIdentifier.includes(orgId);
}


export const createFile = mutation({
  args: {
      name: v.string(),
      orgId: v.string(),
      fileId: v.id("_storage"),
    },
    async handler(ctx, args) {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError(" Must be Loggedin to create Files");
    }
    const user = await getUser(ctx, identity.tokenIdentifier);
    const hasAccess = hasAccessToOrg(ctx, args.orgId);
    console.log(user.tokenIdentifier);

    if (!hasAccess) {
      throw new ConvexError(
        "You are not authorized to create files in this organization"
      );
    }
    await ctx.db.insert("files", {
      name: args.name,
      orgId: args.orgId,
      fileId: args.fileId,
    });
  },
});


export const getFiles = query({
  args: {
    orgId: v.string(),
  },
  async handler(ctx, args) {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return [];
    }
    return ctx.db
      .query("files")
      .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
      .collect();
  },
});

export const deleteFile = mutation({
  args:{
    fileId: v.id("files"),
  },
  async handler(ctx, args){
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("You are not authorized to delete this file");
    }
    const file = await ctx.db.get(args.fileId);
    if (!file) {
      throw new ConvexError("File not found");
    }
    if (file.orgId === undefined) {
      throw new ConvexError("You don't have Access to this org");
    }
    const hasAccess = hasAccessToOrg(ctx, file?.orgId );
    if (!hasAccess) {
      throw new ConvexError(
        "You don't have Access to this org"
      );
    }
    await ctx.db.delete(args.fileId);
  }

})