import { describe, it, expect } from "vitest";
import { ContactSchema } from "@/lib/schemas";

describe("ContactSchema", () => {
  it("accepts valid input", () => {
    const result = ContactSchema.safeParse({
      name: "Jane Doe",
      email: "jane@example.com",
      message: "Hello, I'd like to discuss a project.",
    });
    expect(result.success).toBe(true);
  });

  it("rejects name shorter than 2 characters", () => {
    const result = ContactSchema.safeParse({
      name: "J",
      email: "jane@example.com",
      message: "Hello, I'd like to discuss a project.",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = ContactSchema.safeParse({
      name: "Jane Doe",
      email: "not-an-email",
      message: "Hello, I'd like to discuss a project.",
    });
    expect(result.success).toBe(false);
  });

  it("rejects message shorter than 10 characters", () => {
    const result = ContactSchema.safeParse({
      name: "Jane Doe",
      email: "jane@example.com",
      message: "Hi",
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty fields", () => {
    const result = ContactSchema.safeParse({
      name: "",
      email: "",
      message: "",
    });
    expect(result.success).toBe(false);
  });
});
