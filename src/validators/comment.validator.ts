import { z } from "zod";

export const commentSchema = z.object({
  content: z.string().trim()
  .min(1, "Yorum içeriği boş olamaz.")
  .max(100, "İçerik en fazla 100 karakter olabilir.")
});