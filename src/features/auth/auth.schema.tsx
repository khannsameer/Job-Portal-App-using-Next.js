import { email, z } from "zod";

export const registerUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be atleast 2 characters long")
    .max(255, "Name must not be exceed 255 characters"),

  userName: z
    .string()
    .trim()
    .min(3, "UserName must be atleast 3 characters long")
    .max(255, "Name must not be exceed 255 characters")
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "UserName Can only contain letters, numbers, underscores and hyphens",
    ),

  email: z
    .email("Please enter a valid email address")
    .trim()
    .max(255, "Email must be exceed 255 characters")
    .toLowerCase(),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one lowercase, uppercase, number and special characters",
    ),

  role: z.enum(["applicant", "employer"]).default("applicant"),
});

// z.infer automatically creates a TypeScript type from yous zod schema
export type RegisterUserData = z.infer<typeof registerUserSchema>;

// Create a schema with password confirmation - in server we don't need confPass
export const registerUserWithConfirmSchema = registerUserSchema
  .extend({
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"],
  });

export type RegisterUserWithConfirmData = z.infer<
  typeof registerUserWithConfirmSchema
>;

export const loginUserSchema = z.object({
  email: z
    .email("Please enter a valid email address")
    .trim()
    .max(255, "Email must be exceed 255 characters")
    .toLowerCase(),

  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export type LoginUserData = z.infer<typeof loginUserSchema>;
