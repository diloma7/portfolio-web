"use client";

import Section from "@/components/Section";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactFormData } from "@/types";
import { Button } from "@/components/ui/button";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  message: z.string().min(10, "Please add a few more details"),
});

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: ContactFormData) => {
    // Example: send to an API route or third-party service
    console.log("Contact submission:", data);
    reset();
    alert("Thanks! I’ll get back to you soon.");
  };

  return (
    <>
      <Section className="w-7/12 mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold">Contact</h1>
        <p className="mt-3 text-muted-foreground">
          Let’s collaborate. I’ll reply within 1–2 days.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 grid gap-4 max-w-xl"
          aria-labelledby="contact-form"
        >
          <label className="grid gap-2">
            <span className="text-sm">Name</span>
            <input
              {...register("name")}
              type="text"
              className="rounded-xl border bg-background px-3 py-2"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && (
              <span id="name-error" className="text-sm text-red-600">
                {errors.name.message}
              </span>
            )}
          </label>

          <label className="grid gap-2">
            <span className="text-sm">Email</span>
            <input
              {...register("email")}
              type="email"
              className="rounded-xl border bg-background px-3 py-2"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <span id="email-error" className="text-sm text-red-600">
                {errors.email.message}
              </span>
            )}
          </label>

          <label className="grid gap-2">
            <span className="text-sm">Message</span>
            <textarea
              {...register("message")}
              rows={6}
              className="rounded-xl border bg-background px-3 py-2"
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
            />
            {errors.message && (
              <span id="message-error" className="text-sm text-red-600">
                {errors.message.message}
              </span>
            )}
          </label>

          <Button type="submit" disabled={isSubmitting} className="w-fit">
            {isSubmitting ? "Sending..." : "Send message"}
          </Button>
        </form>
      </Section>
    </>
  );
}
