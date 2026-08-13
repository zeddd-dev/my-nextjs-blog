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
    <div className="py-8 sm:py-10 lg:py-12">
      {/* Header */}
      <div className="text-center pb-8 sm:pb-10 lg:pb-12">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
          Our Blog
        </h1>

        <p className="pt-3 sm:pt-4 max-w-2xl mx-auto text-base sm:text-lg lg:text-xl text-muted-foreground">
          Insights, thoughts, and trends from our team.
        </p>
      </div>

      {/* Content */}
      {posts === undefined ? (
        <SkeletonLoadingUi />
      ) : posts.length === 0 ? (
        <p className="text-center text-muted-foreground">
          No posts found.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {posts.map((post) => (
            <Card
              key={post.slug}
              className="h-full pt-0 overflow-hidden"
            >
              {/* Image */}
              <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  src={
                    post.imageUrl ||
                    "https://images.unsplash.com/photo-1777661097541-e9ebeffe6aa2?q=80&w=1632&auto=format&fit=crop"
                  }
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Content */}
              <CardContent className="flex flex-1 flex-col pt-4 sm:pt-5">
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-xl sm:text-2xl font-bold leading-tight hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                </Link>

                <p className="mt-2 text-sm sm:text-base text-muted-foreground line-clamp-3">
                  {post.description || "Belum ada deskripsi artikel."}
                </p>
              </CardContent>

              {/* Footer */}
              <CardFooter>
                <Link
                  className={buttonVariants({
                    className: "w-full",
                  })}
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
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div className="flex flex-col space-y-3" key={i}>
          <Skeleton className="aspect-video w-full rounded-xl" />

          <div className="space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/4" />
          </div>
        </div>
      ))}
    </div>
  );
}