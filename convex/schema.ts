import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  posts: defineTable({
    title: v.string(),
    body: v.string(),
    authorId: v.string(),
    imageStorageId: v.optional(v.id("_storage")),
    
    slug: v.string(),
    description: v.optional(v.string()),
    category: v.optional(v.string()),
    isFeatured: v.optional(v.boolean()),
    isEditorsPick: v.optional(v.boolean()),
  })
    .index("by_slug", ["slug"])
    .searchIndex("search_title", { searchField: "title" })
    .searchIndex("search_body", { searchField: "body" }),

  comments: defineTable({
    postId: v.id("posts"),
    authorId: v.string(),
    authorName: v.string(),
    body: v.string(),
  }),
});