"use client";

import { buttonVariants } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import {
  ArrowUpRight,
  Bookmark,
  Calendar,
  Cpu,
  Newspaper,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  const posts = useQuery(api.posts.getPosts);
  const featuredPost = useQuery(api.posts.getFeaturedPost);
  const editorsPicks = useQuery(api.posts.getEditorsPicks);

  if (
    posts === undefined ||
    featuredPost === undefined ||
    editorsPicks === undefined
  ) {
    return (
      <div className="py-20 text-center text-sm text-muted-foreground animate-pulse">
        Memuat artikel NextTech...
      </div>
    );
  }

  const editorIds = new Set(editorsPicks.map((post) => post._id));

  const remainingPosts = posts.filter(
    (post) => post._id !== featuredPost?._id && !editorIds.has(post._id),
  );

  return (
    <div className="space-y-12 pb-12">
      {/* 1. Dynamic Animated Tech Updates Ticker Bar */}
      <div className="bg-muted/80 border border-border/60 text-xs py-2 px-4 flex items-center gap-4 overflow-hidden rounded-xl backdrop-blur-xs w-full">
        {/* Badge / Label Statis */}
        <div className="bg-primary text-primary-foreground font-bold px-3 py-1 rounded-lg uppercase tracking-wider text-[10px] shrink-0 flex items-center gap-1.5 z-20 shadow-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-foreground opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-foreground"></span>
          </span>
          <Cpu className="size-3" /> TECH UPDATES
        </div>

        {/* Marquee Teks Berjalan */}
        <div className="relative flex overflow-x-hidden w-full select-none">
          <div className="flex shrink-0 items-center gap-8 animate-[marquee_50s_linear_infinite] hover:paused whitespace-nowrap min-w-full">
            {posts.map((post, idx) => (
              <div
                key={`ticker-1-${post.slug}`}
                className="flex items-center gap-8"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-primary transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <strong className="text-primary font-bold">
                    {idx === 0 ? "LATEST" : "UPDATE"} •
                  </strong>
                  <span className="font-medium text-foreground hover:underline">
                    {post.title}
                  </span>
                </Link>
                <span className="text-muted-foreground/40">•</span>
              </div>
            ))}
          </div>

          <div
            aria-hidden="true"
            className="flex shrink-0 items-center gap-8 animate-[marquee_50s_linear_infinite] hover:paused whitespace-nowrap min-w-full"
          >
            {posts.map((post, idx) => (
              <div
                key={`ticker-2-${post.slug}`}
                className="flex items-center gap-8"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-primary transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <strong className="text-primary font-bold">
                    {idx === 0 ? "LATEST" : "UPDATE"} •
                  </strong>
                  <span className="font-medium text-foreground hover:underline">
                    {post.title}
                  </span>
                </Link>
                <span className="text-muted-foreground/40">•</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Blog Title & Description */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
          Next<span className="text-primary">Tech</span>
        </h1>
        <p className="text-muted-foreground text-sm md:text-base max-w-2xl leading-relaxed">
          Portal artikel dan berita teknologi terkini seputar web development,
          software engineering, gadget, dan tren digital modern.
        </p>
      </div>

      {/* 3. Featured Main Article */}
      {featuredPost ? (
        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card shadow-xs hover:shadow-md transition-shadow">
          <div className="grid md:grid-cols-12 items-center">
            <div className="relative md:col-span-7 h-70 sm:h-90 md:h-100 w-full overflow-hidden bg-muted">
              <Image
                src={
                  featuredPost.imageUrl ||
                  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000"
                }
                alt={featuredPost.title}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                priority
              />
            </div>

            <div className="md:col-span-5 p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold bg-primary/10 text-primary border border-primary/20 uppercase tracking-wider">
                  <TrendingUp className="size-3" /> UTAMA
                </span>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  TEKNOLOGI
                </span>
              </div>

              <Link href={`/blog/${featuredPost.slug}`} className="block group">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight leading-snug group-hover:text-primary transition-colors">
                  {featuredPost.title}
                </h2>
              </Link>

              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                {featuredPost.description}
              </p>

              <div className="pt-2 flex items-center justify-between gap-4 border-t border-border/40">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                  <Calendar className="size-3.5" />
                  <span>
                    {new Date(featuredPost._creationTime).toLocaleDateString(
                      "id-ID",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      },
                    )}
                  </span>
                </div>

                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className={buttonVariants({
                    variant: "default",
                    size: "sm",
                    className: "rounded-full px-5 shadow-xs gap-1.5",
                  })}
                >
                  <span>Baca Artikel</span>
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center border rounded-2xl text-muted-foreground">
          Belum ada artikel yang dibuat.
        </div>
      )}

      {/* 4. Pilihan Editor */}
      {editorsPicks.length > 0 && (
        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Sparkles className="size-4" />
              </div>
              <h3 className="text-xl font-bold tracking-tight">
                Pilihan Editor
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {editorsPicks.map((post) => (
              <div
                key={post.slug}
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card hover:border-primary/40 transition-all hover:shadow-xs flex flex-col justify-between"
              >
                <div className="relative h-48 w-full overflow-hidden bg-muted">
                  <Image
                    src={
                      post.imageUrl ||
                      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000"
                    }
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        PILIHAN
                      </span>
                      <Bookmark className="size-4 text-muted-foreground/60 group-hover:text-primary transition-colors" />
                    </div>
                    <Link href={`/blog/${post.slug}`}>
                      <h4 className="font-bold text-base text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                    </Link>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {post.description ||
                        "Baca artikel selengkapnya di NextTech."}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-border/40 text-[11px] text-muted-foreground">
                    <span>
                      {new Date(post._creationTime).toLocaleDateString(
                        "id-ID",
                        {
                          day: "numeric",
                          month: "short",
                        },
                      )}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="font-semibold text-foreground group-hover:text-primary flex items-center gap-0.5"
                    >
                      Baca <ArrowUpRight className="size-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Section Terbaru / Semua Artikel */}
      {remainingPosts.length > 0 && (
        <div className="space-y-6 pt-6 border-t border-border/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Newspaper className="size-4" />
              </div>
              <h3 className="text-xl font-bold tracking-tight">
                Artikel Terbaru
              </h3>
            </div>
            <Link
              href="/blog"
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
            >
              Lihat Semua <ArrowUpRight className="size-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {remainingPosts.map((post) => (
              <div
                key={post.slug}
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card hover:border-primary/40 transition-all hover:shadow-xs flex flex-col justify-between"
              >
                <div className="relative h-44 w-full overflow-hidden bg-muted">
                  <Image
                    src={
                      post.imageUrl ||
                      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000"
                    }
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <Link href={`/blog/${post.slug}`}>
                      <h4 className="font-bold text-base text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                    </Link>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {post.description ||
                        "Baca artikel selengkapnya di NextTech."}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-border/40 text-[11px] text-muted-foreground">
                    <span>
                      {new Date(post._creationTime).toLocaleDateString(
                        "id-ID",
                        {
                          day: "numeric",
                          month: "short",
                        },
                      )}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="font-semibold text-foreground group-hover:text-primary flex items-center gap-0.5"
                    >
                      Baca <ArrowUpRight className="size-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
