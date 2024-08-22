import { ConvexError, v } from "convex/values";
import { mutation, MutationCtx, query, QueryCtx } from "./_generated/server";
import { fileTypes } from "./schema";
import { Id } from "./_generated/dataModel";

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
) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    return false;
  }
  const user = await ctx.db
  .query("users")
  .withIndex("by_tokenIdentifier", (q) =>
    q.eq("tokenIdentifier", identity.tokenIdentifier)
  )
  .first();
  if (!user) {
    return null;
  }
   const hasAccess = user.orgIds.some(orgIds => orgIds.orgId.includes(orgId)) || user.tokenIdentifier.includes(orgId);
   if(!hasAccess){
    return null;
   }
   return {user};
}
export const createFile = mutation({
  args: {
    name: v.string(),
    orgId: v.string(),
    fileId: v.id("_storage"),
    types: fileTypes,
  },
  async handler(ctx, args) {
    const hasAccess = await hasAccessToOrg(ctx, args.orgId);
    if (!hasAccess) {
      throw new ConvexError("you do not have access to this org");
    }
    await ctx.db.insert("files", {
      name: args.name,
      types: args.types,
      orgId: args.orgId,
      fileId: args.fileId,
      userId: hasAccess.user._id,
    });
  },
});

export const getFiles = query({
  args: {
    orgId: v.string(),
    query: v.optional(v.string()),
    favourites: v.optional(v.boolean()),
  },
  async handler(ctx, args) {
    const hasAccess = await hasAccessToOrg(ctx, args.orgId);
    if (!hasAccess) {
      return [];
    }
    let files = await ctx.db
      .query("files")
      .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
      .collect();

    const query = args.query;
    if (query) {
      files = files.filter((file) =>
        file.name.toLowerCase().includes(query.toLowerCase())
      );
    }
    if (args.favourites) {
      const hasAccess = await hasAccessToOrg(ctx, args.orgId);
    if (!hasAccess) {
      return [];
    }
      const favourites = await ctx.db
        .query("favourites")
        .withIndex("by_userId_orgId_fileId", (q) =>
          q
            .eq("userId",hasAccess.user._id )
            .eq("orgId", args.orgId)
        )
        .collect();
      files = files.filter((file) =>
        favourites.some((fav) => fav.fileId === file._id)
      );
    }
    const filesWithUrl = await Promise.all(
      files.map(async (file) => ({
        ...file,
        url: await ctx.storage.getUrl(file.fileId),
      }))
    );

    return filesWithUrl;
  },
});

export const deleteFile = mutation({
  args: {
    fileId: v.id("files"),
  },
  async handler(ctx, args) {
    const access = await hasAccessToFile(ctx, args.fileId);
    if (!access) {
      throw new ConvexError("You are not authorized to access this file");
    }
    await ctx.db.delete(args.fileId);
  },
});

export const toggleFavourites = mutation({
  args: {
    fileId: v.id("files"),
  },
  async handler(ctx, args) {
    const access = await hasAccessToFile(ctx, args.fileId);
    console.log(access);
    if (!access) {
      throw new ConvexError("You are not authorized to access this file");
    }
    const favourites = await ctx.db
      .query("favourites")
      .withIndex("by_userId_orgId_fileId", (q) =>
        q
          .eq("userId", access.user?._id)
          .eq("orgId", access.file.orgId)
          .eq("fileId", access.file._id)
      )
      .collect();
    if (favourites.length > 0) {
      await ctx.db.delete(favourites[0]._id);
    } else {
      await ctx.db.insert("favourites", {
        userId: access.user._id,
        orgId: access.file.orgId,
        fileId: access.file._id,
      });
    }
  },
});

async function hasAccessToFile(
  ctx: QueryCtx | MutationCtx,
  fileId: Id<"files">
) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    return null;
  }
  const file = await ctx.db.get(fileId);
  if (!file) {
    return null;
  }
  const hasAccess = await hasAccessToOrg(ctx, file?.orgId);
  if (!hasAccess) {
    throw new ConvexError("you do not have access to this org");
  }
  const user = hasAccess.user
  return { user, file };
}

export const getAllFavorites = query({
  args: { orgId: v.string() },
  async handler(ctx, args) {
    const hasAccess = await hasAccessToOrg(ctx, args.orgId);

    if (!hasAccess) {
      return [];
    }

    const favorites = await ctx.db
      .query("favourites")
      .withIndex("by_userId_orgId_fileId", (q) =>
        q.eq("userId", hasAccess.user._id).eq("orgId", args.orgId)
      )
      .collect();

    return favorites;
  },
});
