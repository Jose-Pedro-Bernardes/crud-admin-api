import { z } from "zod";

const usersCreateSchema = z.object({
  name: z.string().max(20),
  password: z.string().max(120),
  email: z.string().email(),
  admin: z.boolean().optional(),
  active: z.boolean().optional(),
});

const usersLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().max(120),
});

const usersUpdateSchema = z.object({
  name: z.string().max(20),
  password: z.string().max(120),
  email: z.string().email(),
});

const usersInfoSchema = z.object({
  id: z.number(),
  name: z.string().max(20),
  email: z.string().email(),
  admin: z.boolean(),
  active: z.boolean(),
});

export {
  usersCreateSchema,
  usersLoginSchema,
  usersUpdateSchema,
  usersInfoSchema,
};
