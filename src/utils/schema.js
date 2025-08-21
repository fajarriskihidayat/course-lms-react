import z from "zod";

export const signUpSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Email is invalid" }),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(5, { message: "Password should have min 5 character" }),
});

export const signInSchema = signUpSchema.omit({ name: true });
