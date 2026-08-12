"use server";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { getToken } from "@/lib/auth-server";
import { fetchMutation } from "convex/nextjs";
import { ConvexError } from "convex/values";
import { revalidatePath } from "next/cache";

export async function createBlogAction(data: {
  title: string;
  description: string;
  content: string;
  storageId: Id<"_storage">;
  slug: string;
}) {
  try {
    const token = await getToken();

    await fetchMutation(
      api.posts.createPost,
      {
        title: data.title,
        description: data.description,
        body: data.content,
        imageStorageId: data.storageId,
        slug: data.slug,
      },
      { token },
    );

    revalidatePath("/blog");

    return {
      success: true,
    };
  } catch (error) {
    let errorMessage = "Failed to create post. Please try again.";

    if (error instanceof ConvexError) {
      errorMessage =
        typeof error.data === "string"
          ? error.data
          : "Terjadi kesalahan saat membuat artikel.";
    } else if (error instanceof Error) {
      errorMessage = error.message;

      if (errorMessage.toLowerCase().includes("not authenticated")) {
        errorMessage = "You must be logged in to create a post.";
      }
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
}
