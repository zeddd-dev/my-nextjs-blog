"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { toast } from "sonner";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();

  const isAdmin = useQuery(api.posts.isAdmin);

  useEffect(() => {
    if (isAdmin === false) {
      toast.error("Akses Ditolak", {
        description:
          "Anda tidak memiliki izin untuk mengakses halaman admin.",
      });

      router.replace("/");
    }
  }, [isAdmin, router]);

  // Masih mengecek akses
  if (isAdmin === undefined) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted-foreground">
          Memeriksa akses...
        </p>
      </main>
    );
  }

  // Bukan admin
  if (!isAdmin) {
    return null;
  }

  // Admin
  return <>{children}</>;
}