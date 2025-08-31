import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number(),
  name: z.string().max(50),
  createdAt: z.date(),
});
