"use client";

import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import BlockEditor from "@/components/editor/BlockEditor";

import { zodResolver } from "@hookform/resolvers/zod";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { ConvexError } from "convex/values";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";

import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";
import { editPostSchema } from "@/app/schemas/blog";

export default function EditPostPage() {
  const { postId } = useParams<{ postId: string }>();
  const router = useRouter();

  const { isAuthenticated, isLoading } = useConvexAuth();

  const currentUser = useQuery(api.auth.getCurrentUser);

  const post = useQuery(api.posts.getPostById, {
    postId: postId as Id<"posts">,
  });

  const updatePost = useMutation(api.posts.updatePost);
  const generateUploadUrl = useMutation(api.posts.generateImageUploadUrl);

  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(editPostSchema),

    defaultValues: {
      title: "",
      description: "",
      content: "",
      image: undefined,
      slug: "",
    },
  });

  // ==============================
  // CEK LOGIN & ADMIN
  // ==============================

  useEffect(() => {
    if (isLoading || currentUser === undefined) return;

    if (!isAuthenticated) {
      toast.error("You must be logged in.");
      router.push("/auth/login");
      return;
    }

    if (currentUser === null || currentUser.role !== "admin") {
      toast.error("Anda tidak memiliki izin untuk mengedit artikel.");
      router.push("/");
    }
  }, [isAuthenticated, isLoading, currentUser, router]);

  // ==============================
  // MASUKKAN DATA POST KE FORM
  // ==============================

  useEffect(() => {
    if (!post) return;

    form.reset({
      title: post.title,
      description: post.description ?? "",
      content: post.body,
      slug: post.slug,

      // Jangan isi image dengan gambar lama.
      // Input file memang tidak boleh diisi secara programmatic.
      image: undefined,
    });
  }, [post, form]);

  // ==============================
  // SUBMIT UPDATE
  // ==============================

  function onSubmit(values: z.infer<typeof editPostSchema>) {
    if (!isAuthenticated) {
      toast.error("You must be logged in.");
      return;
    }

    startTransition(async () => {
      try {
        let storageId: Id<"_storage"> | undefined;

        // =====================================
        // UPLOAD GAMBAR HANYA JIKA PILIH BARU
        // =====================================

        if (values.image) {
          const postUrl = await generateUploadUrl();

          const uploadResult = await fetch(postUrl, {
            method: "POST",
            headers: {
              "Content-Type": values.image.type,
            },
            body: values.image,
          });

          if (!uploadResult.ok) {
            throw new Error("Failed to upload image to Convex storage");
          }

          const json = await uploadResult.json();

          storageId = json.storageId;

          if (!storageId) {
            throw new Error("Failed to get storage ID after image upload");
          }
        }

        // =====================================
        // UPDATE POST
        // =====================================

        await updatePost({
          postId: postId as Id<"posts">,

          title: values.title,

          slug: values.slug,

          body: values.content,

          description: values.description,

          // Kalau undefined:
          // mutation tidak akan mengubah gambar lama.
          imageStorageId: storageId,
        });

        toast.success("Artikel berhasil diperbarui.");

        router.push("/admin/posts");
      } catch (error) {
        let errorMessage = "Gagal memperbarui artikel.";

        if (error instanceof ConvexError) {
          const errorData = typeof error.data === "string" ? error.data : "";

          if (errorData) {
            errorMessage = errorData;
          }
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }

        toast.error(errorMessage);
      }
    });
  }

  // ==============================
  // LOADING
  // ==============================

  if (isLoading || currentUser === undefined || post === undefined) {
    return (
      <main className="py-12">
        <p className="text-center text-muted-foreground">Memuat artikel...</p>
      </main>
    );
  }

  // ==============================
  // POST TIDAK DITEMUKAN
  // ==============================

  if (!post) {
    return (
      <main className="py-12">
        <p className="text-center text-muted-foreground">
          Artikel tidak ditemukan.
        </p>
      </main>
    );
  }

  // ==============================
  // FORM EDIT
  // ==============================

  return (
    <div className="py-12">
      {/* HEADER */}

      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Edit Post
        </h1>

        <p className="pt-4 text-xl text-muted-foreground">
          Edit your blog article.
        </p>
      </div>

      <Card className="mx-auto w-full max-w-xl">
        <CardHeader>
          <CardTitle>Edit Blog Article</CardTitle>

          <CardDescription>Perbarui artikel yang sudah dibuat.</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="gap-y-4">
              {/* =========================
                  TITLE
              ========================= */}

              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Title</FieldLabel>

                    <Input placeholder="Type your title here." {...field} />

                    {fieldState.invalid && (
                      <FieldError>{fieldState.error?.message}</FieldError>
                    )}
                  </Field>
                )}
              />

              {/* =========================
                  DESCRIPTION
              ========================= */}

              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Description</FieldLabel>

                    <Textarea
                      placeholder="Tulis ringkasan singkat artikel..."
                      className="min-h-24 resize-none"
                      {...field}
                    />

                    {fieldState.invalid && (
                      <FieldError>{fieldState.error?.message}</FieldError>
                    )}
                  </Field>
                )}
              />

              {/* =========================
                  SLUG
              ========================= */}

              <Controller
                name="slug"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Slug URL</FieldLabel>

                    <div className="flex gap-2">
                      <Input placeholder="contoh-berita-viral" {...field} />

                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          const title = form.getValues("title");

                          if (!title.trim()) {
                            toast.error("Please enter a title first.");
                            return;
                          }

                          const slug = title
                            .toLowerCase()
                            .trim()
                            .replace(/[^a-z0-9\s-]/g, "")
                            .replace(/\s+/g, "-")
                            .replace(/-+/g, "-");

                          field.onChange(slug);
                        }}
                      >
                        Generate
                      </Button>
                    </div>

                    {fieldState.invalid && (
                      <FieldError>{fieldState.error?.message}</FieldError>
                    )}
                  </Field>
                )}
              />

              {/* =========================
                  CONTENT
              ========================= */}

              <Controller
                name="content"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Content</FieldLabel>

                    <div className="overflow-hidden rounded-lg border">
                      <BlockEditor
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </div>

                    {fieldState.invalid && (
                      <FieldError>{fieldState.error?.message}</FieldError>
                    )}
                  </Field>
                )}
              />

              {/* =========================
                  IMAGE
              ========================= */}

              <Controller
                name="image"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Image</FieldLabel>

                    <Input
                      aria-invalid={fieldState.invalid}
                      type="file"
                      accept="image/*"
                      onChange={(event) => {
                        const file = event.target.files?.[0];

                        field.onChange(file);
                      }}
                    />

                    <p className="text-xs text-muted-foreground">
                      Kosongkan jika ingin tetap menggunakan gambar lama.
                    </p>

                    {fieldState.invalid && (
                      <FieldError>{fieldState.error?.message}</FieldError>
                    )}
                  </Field>
                )}
              />

              {/* =========================
                  UPDATE BUTTON
              ========================= */}

              <Button
                type="submit"
                disabled={isPending || form.formState.isSubmitting || isLoading}
              >
                {isPending ? "Updating..." : "Update Post"}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
