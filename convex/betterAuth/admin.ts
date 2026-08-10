import { mutation } from "./_generated/server";

export const makeFirstUserAdmin = mutation({
  args: {},
  handler: async (ctx) => {
    const firstUser = await ctx.db.query("user").order("asc").first();

    if (!firstUser) {
      throw new Error("Belum ada user.");
    }

    if (firstUser.role === "admin") {
      return {
        success: true,
        message: "User pertama sudah menjadi admin.",
      };
    }

    await ctx.db.patch(firstUser._id, {
      role: "admin",
    });

    return {
      success: true,
      message: "User pertama berhasil menjadi admin.",
    };
  },
});
