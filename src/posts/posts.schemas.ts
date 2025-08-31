import { z } from 'zod';

export const PostSchema = z.object({
  id: z.number(),
  publicId: z.uuid(),
  userId: z.number(),
  text: z.string(),
  createdAt: z.date(),
});
