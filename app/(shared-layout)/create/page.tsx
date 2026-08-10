"use client";

import { createBlogAction } from "@/app/actions";
import { postSchema } from "@/app/schemas/blog";
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
import { api } from "@/convex/_generated/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useConvexAuth, useMutation } from "convex/react";
import { ConvexError } from "convex/values";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react"; // 1. Dipanggil dari hook 'react'
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";

export default function CreateRoute() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const router = useRouter();

  // 2. Deklarasikan isPending dari useTransition
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast.error("You must be logged in to create a post.");
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  const generateUploadUrl = useMutation(api.posts.generateImageUploadUrl);

  const form = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
      image: undefined,
      slug:""
    },
  });

  function onSubmit(values: z.infer<typeof postSchema>) {
    if (!isAuthenticated) {
      toast.error("You must be logged in to create a post.");
      return;
    }

    startTransition(async () => {
      try {
        let storageId = null;

        if (values.image) {
          const postUrl = await generateUploadUrl();

          const uploadResult = await fetch(postUrl, {
            method: "POST",
            headers: { "Content-Type": values.image.type },
            body: values.image,
          });

          if (!uploadResult.ok) {
            throw new Error("Failed to upload image to Convex storage");
          }

          const json = await uploadResult.json();
          storageId = json.storageId;
        }

        const res = await createBlogAction({
          title: values.title,
          content: values.content,
          storageId: storageId,
          slug: values.slug
        });

        if (res?.error) {
          toast.error(res.error);
          return;
        }

        toast.success("Blog article created successfully!");
        form.reset();
        router.push("/blog");
      } catch (error) {
        let errorMessage = "Failed to create post. Please try again.";

        if (error instanceof ConvexError) {
          const errorData = typeof error.data === "string" ? error.data : "";
          if (errorData.toLowerCase().includes("authenticated")) {
            errorMessage = "You must be logged in to create a post.";
          } else if (errorData) {
            errorMessage = errorData;
          }
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }

        toast.error(errorMessage);
      }
    });
  }

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Create Post
        </h1>
        <p className="text-xl text-muted-foreground pt-4">
          Share your thoughts with the big world.
        </p>
      </div>
      <Card className="w-full max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Create A Blog Article</CardTitle>
          <CardDescription>Create a new blog article</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="gap-y-4">
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
              <Controller
                name="slug"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Slug Url</FieldLabel>
                    <Input placeholder="Type your title here." {...field} />
                    {fieldState.invalid && (
                      <FieldError>{fieldState.error?.message}</FieldError>
                    )}
                  </Field>
                )}
              />

              <Controller
                name="content"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Content</FieldLabel>
                    <Textarea
                      placeholder="Type your content here."
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError>{fieldState.error?.message}</FieldError>
                    )}
                  </Field>
                )}
              />
              <Controller
                name="image"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Image</FieldLabel>
                    <Input
                      aria-invalid={fieldState.invalid}
                      placeholder="Upload an image."
                      type="file"
                      accept="image/*"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        field.onChange(file);
                      }}
                    />
                    {fieldState.invalid && (
                      <FieldError>{fieldState.error?.message}</FieldError>
                    )}
                  </Field>
                )}
              />
              {/* 3. Gunakan isPending pada atribut disabled dan label teks */}
              <Button
                type="submit"
                disabled={isPending || form.formState.isSubmitting || isLoading}
              >
                {isPending ? "Creating..." : "Create Post"}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
