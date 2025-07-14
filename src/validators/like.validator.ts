import { z } from "zod";

export const likeParamSchema = z.object({
  postId: z.string().regex(/^\d+$/) 
});
