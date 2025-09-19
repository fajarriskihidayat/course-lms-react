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

export const createCourseSchema = z.object({
  name: z
    .string()
    .nonempty({ message: "Name is required" })
    .min(5, { message: "Name should have min 5 character" }),
  categoryId: z.string().nonempty({ message: "Category is required" }),
  tagline: z
    .string()
    .nonempty({ message: "Tagline is required" })
    .min(5, { message: "Tagline should have min 5 character" }),
  description: z
    .string()
    .nonempty({ message: "Description is required" })
    .min(10, { message: "Description should have min 10 character" }),
  thumbnail: z
    .any()
    .refine((file) => file?.name, { message: "Thumbnail is required" }),
});

export const updateCourseSchema = createCourseSchema.partial({
  thumbnail: true,
});

export const mutateContentSchema = z
  .object({
    title: z.string().nonempty({ message: "Title is required" }),
    type: z.string().min(1, { message: "Type is required" }),
    youtubeId: z.string().optional(),
    text: z.string().optional(),
  })
  .superRefine((val, ctx) => {
    const videoIdParse = z.string().nonempty().safeParse(val.youtubeId);
    const textParse = z.string().nonempty().safeParse(val.text);

    if (val.type === "video") {
      if (!videoIdParse.success) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Youtube ID is required",
          path: ["youtubeId"],
        });
      }
    }

    if (val.type === "text") {
      if (!textParse.success) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Content Text is required",
          path: ["text"],
        });
      }
    }
  });
