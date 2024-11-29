import z from "zod";

export const signupSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const updateProfileSchema = z.object({
  newUsername: z.string(),
  newEmail: z.string(),
});

export const createProjectSchema = z.object({
  name: z.string(),
  description: z.string(),
  language: z.string(),
});

export const updateProjectSchema = z.object({
  newName: z.string(),
  newDescription: z.string(),
});

export const getTemplateCode = z.object({
  name:z.string(),
  template: z.string(),
});
