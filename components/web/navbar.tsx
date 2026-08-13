"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/web/theme-toggle";
import { authClient } from "@/lib/auth-client";
import { useConvexAuth } from "convex/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "../ui/toast";
import { SearchInput } from "./SearchInput";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  async function handleLogout() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.add({
            title: "Logged out successfully",
            type: "success",
          });

          closeMenu();
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
    });
  }

  return (
    <nav className="w-full py-4 sm:py-5">
      {/* =========================
          MAIN NAVBAR
      ========================== */}
      <div className="flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" onClick={closeMenu} className="shrink-0">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Next<span className="text-primary">Tech</span>
          </h1>
        </Link>

        {/* =========================
            DESKTOP NAVIGATION
            lg ke atas
        ========================== */}
        <div className="hidden lg:flex items-center gap-2">
          <Link
            className={buttonVariants({ variant: "ghost" })}
            href="/"
          >
            Home
          </Link>

          <Link
            className={buttonVariants({ variant: "ghost" })}
            href="/blog"
          >
            Blog
          </Link>

          <Link
            className={buttonVariants({ variant: "ghost" })}
            href="/about"
          >
            Tentang Kami
          </Link>

          <Link
            className={buttonVariants({ variant: "ghost" })}
            href="/contact"
          >
            Kontak
          </Link>
        </div>

        {/* =========================
            DESKTOP RIGHT SIDE
        ========================== */}
        <div className="hidden lg:flex items-center gap-2">
          <div className="w-56 xl:w-64">
            <SearchInput />
          </div>

          {!isLoading &&
            (isAuthenticated ? (
              <Button onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <>
                <Link
                  className={buttonVariants({
                    className: "h-10 px-5 text-sm",
                  })}
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
            ))}

          <ThemeToggle />
        </div>

        {/* =========================
            MOBILE / TABLET
        ========================== */}
        <div className="flex lg:hidden items-center gap-2">
          <ThemeToggle />

          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </Button>
        </div>
      </div>

      {/* =========================
          MOBILE / TABLET SEARCH
      ========================== */}
      <div className="lg:hidden mt-4">
        <SearchInput />
      </div>

      {/* =========================
          MOBILE / TABLET MENU
      ========================== */}
      {isMenuOpen && (
        <div className="lg:hidden mt-4 rounded-xl border border-border/60 bg-card p-2 shadow-sm animate-in fade-in-0 slide-in-from-top-2 duration-200">
          <div className="flex flex-col">
            <Link
              href="/"
              onClick={closeMenu}
              className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-muted ${
                pathname === "/" ? "bg-muted text-primary" : ""
              }`}
            >
              Home
            </Link>

            <Link
              href="/blog"
              onClick={closeMenu}
              className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-muted ${
                pathname.startsWith("/blog")
                  ? "bg-muted text-primary"
                  : ""
              }`}
            >
              Blog
            </Link>

            <Link
              href="/about"
              onClick={closeMenu}
              className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-muted ${
                pathname.startsWith("/about")
                  ? "bg-muted text-primary"
                  : ""
              }`}
            >
              Tentang Kami
            </Link>

            <Link
              href="/contact"
              onClick={closeMenu}
              className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-muted ${
                pathname.startsWith("/contact")
                  ? "bg-muted text-primary"
                  : ""
              }`}
            >
              Kontak
            </Link>

            {/* Divider */}
            <div className="my-2 border-t border-border/60" />

            {/* Auth */}
            {!isLoading &&
              (isAuthenticated ? (
                <Button
                  type="button"
                  variant="ghost"
                  className="justify-start px-4 py-3"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              ) : (
                <div className="flex flex-col gap-2 p-2">
                  <Link
                    href="/auth/sign-up"
                    onClick={closeMenu}
                    className={buttonVariants({
                      className: "w-full",
                    })}
                  >
                    Sign Up
                  </Link>

                  <Link
                    href="/auth/login"
                    onClick={closeMenu}
                    className={buttonVariants({
                      variant: "secondary",
                      className: "w-full",
                    })}
                  >
                    Login
                  </Link>
                </div>
              ))}
          </div>
        </div>
      )}
    </nav>
  );
}