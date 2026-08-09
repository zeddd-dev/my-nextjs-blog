"use client";

import { Loader2, Search } from "lucide-react";
import { Input } from "../ui/input";
import { useState, useRef, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";

export function SearchInput() {
  const [term, setTerm] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const results = useQuery(
    api.posts.searchPosts,
    term.length >= 2 ? { limit: 5, term: term } : "skip",
  );

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTerm(e.target.value);
    setOpen(true);
  }

  // Menutup dropdown saat mengeklik di luar komponen
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-sm">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full pl-8 bg-background"
          value={term}
          onChange={handleInputChange}
          onFocus={() => term.length >= 2 && setOpen(true)}
        />
      </div>

      {open && term.length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95 z-50 overflow-hidden">
          {results === undefined ? (
            <div className="flex items-center justify-center gap-2 p-4 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" />
              <span>Searching...</span>
            </div>
          ) : results.length === 0 ? (
            <p className="p-4 text-sm text-center text-muted-foreground">
              No results found.
            </p>
          ) : (
            <div className="p-1">
              {results.map((post) => (
                <Link
                  href={`/blog/${post._id}`}
                  key={post._id}
                  onClick={() => {
                    setOpen(false);
                    setTerm("");
                  }}
                  className="block px-3 py-2 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <p className="font-medium line-clamp-1">{post.title}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
