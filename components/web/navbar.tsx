"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/web/theme-toggle";
import { authClient } from "@/lib/auth-client";
import { useConvexAuth } from "convex/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "../ui/toast";
import { SearchInput } from "./SearchInput";

export function Navbar() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const router = useRouter();
  return (
    <nav className="w-full py-5 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link href="/">
          <h1 className="text-3xl font-bold">
            Next<span className="text-primary">Tech</span>
          </h1>
        </Link>

        <div className="flex items-center gap-2">
          <Link className={buttonVariants({ variant: "ghost" })} href="/">
            Home
          </Link>
          <Link className={buttonVariants({ variant: "ghost" })} href="/blog">
            Blog
          </Link>
          <Link className={buttonVariants({ variant: "ghost" })} href="/create">
            Create
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="hidden md:block">
          <SearchInput />
        </div>

        {isLoading ? null : isAuthenticated ? (
          <Button
            onClick={() =>
              authClient.signOut({
                fetchOptions: {
                  onSuccess: () => {
                    toast.add({
                      title: "Logged out successfully",
                      type: "success",
                    });
                    router.push("/");
                    router.refresh();
                  },
                  onError: (ctx: { error: { message?: string } }) => {
                    toast.add({
                      title: ctx.error.message || "Failed to log out",
                      type: "error",
                    });
                  },
                },
              })
            }
          >
            Logout
          </Button>
        ) : (
          <>
            <Link
              className={buttonVariants({ className: "h-10 px-5 text-sm" })}
              href="/auth/sign-up"
            >
              Sign Up
            </Link>
            <Link
              className={buttonVariants({
                variant: "secondary",
                className: "h-10 px-5 text-sm",
              })}
              href="/auth/login"
            >
              Login
            </Link>
          </>
        )}
        <ThemeToggle />
      </div>
    </nav>
  );
}
