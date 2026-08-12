"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { toast } from "sonner";
import { useEffect } from "react";

export default function AdminPostsPage() {
  const router = useRouter();

  const isAdmin = useQuery(api.posts.isAdmin);
  const posts = useQuery(api.posts.getPosts);
  const deletePost = useMutation(api.posts.deletePost);

  // Redirect jika bukan admin
  useEffect(() => {
    if (isAdmin === false) {
      router.replace("/auth/login");
    }
  }, [isAdmin, router]);

  async function handleDelete(postId: Id<"posts">) {
    const confirmed = window.confirm(
      "Apakah kamu yakin ingin menghapus artikel ini?",
    );

    if (!confirmed) return;

    try {
      await deletePost({ postId });

      toast.success("Artikel berhasil dihapus.");
    } catch (error) {
      console.error(error);

      toast.error("Gagal menghapus artikel.");
    }
  }

  // Masih mengecek authentication / role
  if (isAdmin === undefined) {
    return (
      <main className="container mx-auto px-6 py-10">
        <p className="text-muted-foreground">Memeriksa akses...</p>
      </main>
    );
  }

  // Bukan admin
  if (!isAdmin) {
    return null;
  }

  // Posts masih loading
  if (posts === undefined) {
    return (
      <main className="container mx-auto px-6 py-10">
        <p className="text-muted-foreground">Memuat artikel...</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto max-w-5xl px-6 py-10">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="rounded-lg border px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            ← Kembali
          </button>

          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Kelola Artikel
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Kelola artikel yang sudah dibuat.
            </p>
          </div>
        </div>

        <Link
          href="/admin/posts/create"
          className="inline-flex items-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          + Buat Artikel
        </Link>
      </div>

      {/* Empty State */}
      {posts.length === 0 ? (
        <div className="rounded-xl border border-dashed p-12 text-center">
          <h2 className="font-semibold">Belum ada artikel</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Mulai buat artikel pertama kamu.
          </p>

          <Link
            href="/admin/posts/create"
            className="mt-5 inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            + Buat Artikel
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <article
              key={post._id}
              className="rounded-xl border bg-background p-5 transition-colors hover:bg-muted/30"
            >
              <div className="flex items-start justify-between gap-6">
                {/* Article Info */}
                <div className="min-w-0 flex-1">
                  <h2 className="truncate text-base font-semibold">
                    {post.title}
                  </h2>

                  <p className="mt-2 truncate text-sm text-muted-foreground">
                    /blog/{post.slug}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex shrink-0 items-center gap-2">
                  {/* Edit */}
                  <Link
                    href={`/admin/posts/${post._id}/edit`}
                    className="rounded-lg border px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
                  >
                    Edit
                  </Link>

                  {/* Hapus */}
                  <button
                    type="button"
                    onClick={() => handleDelete(post._id)}
                    className="rounded-lg border border-destructive/30 px-3 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
