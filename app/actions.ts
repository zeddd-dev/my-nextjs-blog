"use server";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { getToken } from "@/lib/auth-server";
import { fetchMutation } from "convex/nextjs";
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

    if (error instanceof Error) {
      errorMessage = error.message;

      // Bersihkan pesan error Convex
      if (errorMessage.includes("Slug sudah digunakan")) {
        errorMessage = "Slug sudah digunakan. Silakan gunakan slug lain.";
      }

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
