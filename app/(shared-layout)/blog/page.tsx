"use client";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";

export default function BlogPage() {
  const posts = useQuery(api.posts.getPosts);

  return (
    <div className="py-12">
      <div className="text-center pb-12">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Our Blog
        </h1>
        <p className="pt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
          Insights, thoughts, and trends from our team.
        </p>
      </div>

      {posts === undefined ? (
        <SkeletonLoadingUi />
      ) : posts.length === 0 ? (
        <p className="text-center text-muted-foreground">No posts found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.slug} className="pt-0 overflow-hidden">
              <div className="relative h-48 w-full">
                <Image
                  src={
                    post.imageUrl ||
                    "https://images.unsplash.com/photo-1777661097541-e9ebeffe6aa2?q=80&w=1632&auto=format&fit=crop"
                  }
                  alt={post.title}
                  fill
                  className="rounded-t-lg object-cover"
                />
              </div>
              <CardContent className="pt-4">
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-2xl font-bold hover:text-primary transition-colors line-clamp-1">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-muted-foreground line-clamp-3 mt-2">
                  {post.body}
                </p>
              </CardContent>
              <CardFooter>
                <Link
                  className={buttonVariants({ className: "w-full" })}
                  href={`/blog/${post.slug}`}
                >
                  Read More
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function SkeletonLoadingUi() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div className="flex flex-col space-y-3" key={i}>
          <Skeleton className="h-48 w-full rounded-xl" />
          <div className="space-y-2 flex flex-col">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/4" />
          </div>
        </div>
      ))}
    </div>
  );
}
