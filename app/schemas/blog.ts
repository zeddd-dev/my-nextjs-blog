import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(3, "Judul minimal 3 karakter"),
  description: z.string().optional(),
  content: z.string().min(10, "Konten minimal 10 karakter"),
  image: z.instanceof(File, {
    message: "Gambar wajib diupload",
  }),
  slug: z.string().min(1, "Slug wajib diisi"),
});

export const editPostSchema = z.object({
  title: z.string().min(3, "Judul minimal 3 karakter"),
  description: z.string().optional(),
  content: z.string().min(10, "Konten minimal 10 karakter"),
  image: z.instanceof(File).optional(),
  slug: z.string().min(1, "Slug wajib diisi"),
});
