"use client";

import { commentSchema } from "@/app/schemas/comment";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useConvexAuth,
  useMutation,
  usePreloadedQuery,
  type Preloaded,
} from "convex/react";
import { Loader2, Lock, MessageSquare, Send, Sparkles } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button, buttonVariants } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Textarea } from "../ui/textarea";

export function CommentSection(props: {
  preloadedComments: Preloaded<typeof api.comments.getCommentsByPostId>;
}) {
  const { isAuthenticated } = useConvexAuth();
  const params = useParams<{ postId: Id<"posts"> }>();
  const data = usePreloadedQuery(props.preloadedComments);
  const [isLoading, startTransition] = useTransition();
  const createComment = useMutation(api.comments.createComment);

  const form = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      body: "",
      postId: params.postId,
    },
  });

  async function onSubmit(formData: z.infer<typeof commentSchema>) {
    startTransition(async () => {
      try {
        await createComment(formData);
        toast.success("Comment Posted!");
        form.reset();
      } catch {
        toast.error("Failed to post comment");
      }
    });
  }

  if (data === undefined) {
    return (
      <Card className="border-border/50 shadow-xs rounded-2xl overflow-hidden mt-8 p-8 text-center text-sm text-muted-foreground animate-pulse">
        Loading comments...
      </Card>
    );
  }

  return (
    <Card className="border-border/50 shadow-sm rounded-2xl overflow-hidden mt-8 bg-card/50 backdrop-blur-xs">
      {/* Header */}
      <CardHeader className="bg-muted/20 border-b border-border/40 py-4 px-6 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <MessageSquare className="size-4" />
          </div>
          <h2 className="text-base font-bold tracking-tight">Comments</h2>
        </div>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-muted text-muted-foreground border border-border/50">
          {data.length} {data.length === 1 ? "comment" : "comments"}
        </span>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Form / Lock Banner */}
        {isAuthenticated ? (
          <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
            <Controller
              name="body"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="space-y-2">
                  <FieldLabel className="text-xs font-semibold text-muted-foreground tracking-wide flex items-center gap-1.5">
                    <Sparkles className="size-3 text-primary" /> Leave a comment
                  </FieldLabel>
                  <Textarea
                    placeholder="Write a comment..."
                    className="min-h-27.5 resize-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded-xl bg-background/80 transition-all border-border/80 p-3.5 text-sm"
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError className="text-xs text-destructive">
                      {fieldState.error?.message}
                    </FieldError>
                  )}
                </Field>
              )}
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isLoading}
                size="sm"
                className="gap-2 rounded-lg px-5 shadow-xs transition-transform active:scale-95"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="size-3.5 animate-spin" />
                    <span>Posting...</span>
                  </>
                ) : (
                  <>
                    <Send className="size-3.5" />
                    <span>Post Comment</span>
                  </>
                )}
              </Button>
            </div>
          </form>
        ) : (
          <div className="relative overflow-hidden rounded-2xl bg-linear-to-b from-muted/40 via-muted/20 to-transparent p-6 border border-dashed border-border/80 text-center space-y-3">
            <div className="size-11 rounded-full bg-background border border-border shadow-xs flex items-center justify-center mx-auto text-primary">
              <Lock className="size-4" />
            </div>
            <div className="space-y-1 max-w-xs mx-auto">
              <p className="text-sm font-semibold text-foreground">
                Log in to leave a comment
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Please log in to leave a comment on this post.
              </p>
            </div>
            <Link
              href="/auth/login"
              className={buttonVariants({
                variant: "default",
                size: "sm",
                className: "mt-1 px-6 rounded-lg font-medium shadow-xs",
              })}
            >
              Log In
            </Link>
          </div>
        )}

        {/* Daftar Komentar dengan Garis Pemisah (Divider) */}
        <div className="divide-y divide-border/60">
          {data.map((comment) => (
            <div
              key={comment._id}
              className="flex gap-4 py-4 first:pt-2 last:pb-0 group"
            >
              <div className="relative shrink-0">
                <Avatar className="size-9 border border-background shadow-xs">
                  <AvatarImage
                    src={`https://avatar.vercel.sh/${comment.authorName}`}
                    alt={comment.authorName}
                  />
                  <AvatarFallback className="bg-linear-to-br from-primary/20 to-primary/5 text-primary font-bold text-xs">
                    {comment.authorName.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="flex-1 min-w-0 space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-sm text-foreground tracking-tight group-hover:text-primary transition-colors">
                    {comment.authorName}
                  </span>
                  <span className="text-[11px] font-medium text-muted-foreground shrink-0">
                    {new Date(comment._creationTime).toLocaleDateString(
                      "id-ID",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      },
                    )}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap wrap-break-word">
                  {comment.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
