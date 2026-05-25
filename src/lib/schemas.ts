import { z } from "zod";

export const ContactSchema = z.object({
  name: z.string().min(2, "Please enter at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Please enter at least 10 characters."),
});

export type ContactValues = z.infer<typeof ContactSchema>;
