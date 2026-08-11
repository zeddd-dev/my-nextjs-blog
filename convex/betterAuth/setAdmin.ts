import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const setAdmin = mutation({
  args: {
    userId: v.id("user"),
  },

  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, {
      role: "admin",
    });

    return true;
  },
});
