import z from "zod";

export const postSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
  image: z.instanceof(File),
  slug: z.string().min(1, "Slug is required"),
});
