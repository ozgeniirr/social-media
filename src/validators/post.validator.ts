import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(6, "Başlık en az 6 karakter olmalıdır"),
  content: z.string().min(6, "İçerik en az 6 karakter olmalıdır")
});