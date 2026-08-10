"use server";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { getToken } from "@/lib/auth-server";
import { fetchMutation } from "convex/nextjs";
import { revalidatePath } from "next/cache";

export async function createBlogAction(data: {
  title: string;
  content: string;
  storageId?: Id<"_storage">;
  slug:string;
}) {
  try {
    const token = await getToken();

    // Panggil mutation createPost dengan token autentikasi
    await fetchMutation(
      api.posts.createPost,
      {
        title: data.title,
        body: data.content,
        imageStorageId: data.storageId,
        slug: data.slug,
      },
      { token },
    );
  } catch {
    return {
      error: "Failed to Create post. Please try again.",
    };
  }
  
  revalidatePath("/blog");
}
