import { ConvexError, v } from "convex/values";
import { Doc } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { authComponent } from "./auth";

export const createPost = mutation({
  args: {
    title: v.string(),
    slug: v.string(), // Ditambahkan agar sesuai schema
    body: v.string(),
    description: v.optional(v.string()),
    category: v.optional(v.string()),
    isFeatured: v.optional(v.boolean()),
    isEditorsPick: v.optional(v.boolean()),
    imageStorageId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);

    if (!user) {
      throw new ConvexError("Not authenticated !");
    }

    const existingPost = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();

    if (existingPost) {
      throw new ConvexError("Slug sudah digunakan. Silakan gunakan slug lain.");
    }

    const blogArticle = await ctx.db.insert("posts", {
      title: args.title,
      slug: args.slug,
      body: args.body,
      description: args.description,
      category: args.category ?? "Teknologi",
      isFeatured: args.isFeatured ?? false,
      isEditorsPick: args.isEditorsPick ?? false,
      authorId: user._id,
      imageStorageId: args.imageStorageId,
    });
    return blogArticle;
  },
});

export const getPosts = query({
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db.query("posts").order("desc").collect();

    return await Promise.all(
      posts.map(async (post) => {
        const resolvedImageUrl = post.imageStorageId
          ? await ctx.storage.getUrl(post.imageStorageId)
          : null;

        return {
          ...post,
          imageUrl: resolvedImageUrl,
        };
      }),
    );
  },
});

// Query Khusus Artikel Hero Utama
export const getFeaturedPost = query({
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db.query("posts").order("desc").collect();
    const featured = posts.find((p) => p.isFeatured) || posts[0];

    if (!featured) return null;

    const resolvedImageUrl = featured.imageStorageId
      ? await ctx.storage.getUrl(featured.imageStorageId)
      : null;

    return {
      ...featured,
      imageUrl: resolvedImageUrl,
    };
  },
});

// Query Khusus Artikel Pilihan Editor
export const getEditorsPicks = query({
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db.query("posts").order("desc").collect();
    const picks = posts.filter((p) => p.isEditorsPick).slice(0, 3);

    // Jika belum ada yang di-flag, ambil 3 artikel terbaru selain artikel pertama
    const resultPosts = picks.length > 0 ? picks : posts.slice(1, 4);

    return await Promise.all(
      resultPosts.map(async (post) => {
        const resolvedImageUrl = post.imageStorageId
          ? await ctx.storage.getUrl(post.imageStorageId)
          : null;

        return {
          ...post,
          imageUrl: resolvedImageUrl,
        };
      }),
    );
  },
});

export const generateImageUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.safeGetAuthUser(ctx);

    if (!user) {
      throw new ConvexError("Not authenticated !");
    }
    return await ctx.storage.generateUploadUrl();
  },
});

export const getPostById = query({
  args: {
    postId: v.id("posts"),
  },
  handler: async (ctx, args) => {
    const post = await ctx.db.get(args.postId);

    if (!post) {
      return null;
    }

    const resolvedImageUrl = post.imageStorageId
      ? await ctx.storage.getUrl(post.imageStorageId)
      : null;

    return {
      ...post,
      imageUrl: resolvedImageUrl,
    };
  },
});

export const getPostBySlug = query({
  args: {
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    const post = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();

    if (!post) {
      return null;
    }

    const resolvedImageUrl = post.imageStorageId
      ? await ctx.storage.getUrl(post.imageStorageId)
      : null;

    return {
      ...post,
      imageUrl: resolvedImageUrl,
    };
  },
});

interface searchResultTypes {
  _id: string;
  title: string;
  body: string;
}

export const searchPosts = query({
  args: {
    term: v.string(),
    limit: v.number(),
  },
  handler: async (ctx, args) => {
    const limit = args.limit;
    const results: Array<searchResultTypes> = [];
    const seen = new Set();

    const pushDocs = async (docs: Array<Doc<"posts">>) => {
      for (const doc of docs) {
        if (seen.has(doc._id)) continue;

        seen.add(doc._id);
        results.push({
          _id: doc._id,
          title: doc.title,
          body: doc.body,
        });
        if (results.length >= limit) break;
      }
    };

    const titlematches = await ctx.db
      .query("posts")
      .withSearchIndex("search_title", (q) => q.search("title", args.term))
      .take(limit);
    await pushDocs(titlematches);

    if (results.length < limit) {
      const bodymatches = await ctx.db
        .query("posts")
        .withSearchIndex("search_body", (q) => q.search("body", args.term))
        .take(limit);
      await pushDocs(bodymatches);
    }
    return results;
  },
});
