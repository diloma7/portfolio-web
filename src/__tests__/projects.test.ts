import { describe, it, expect } from "vitest";
import { projects, getProjectBySlug } from "@/lib/projects";

describe("projects data", () => {
  it("has at least one project", () => {
    expect(projects.length).toBeGreaterThan(0);
  });

  it("every project has a unique slug", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every project has required fields", () => {
    for (const p of projects) {
      expect(p.slug).toBeTruthy();
      expect(p.title).toBeTruthy();
      expect(p.description).toBeTruthy();
      expect(p.tags.length).toBeGreaterThan(0);
    }
  });
});

describe("getProjectBySlug", () => {
  it("returns a project for a valid slug", () => {
    const first = projects[0];
    const found = getProjectBySlug(first.slug);
    expect(found).toBeDefined();
    expect(found!.title).toBe(first.title);
  });

  it("returns undefined for an unknown slug", () => {
    expect(getProjectBySlug("nonexistent-project")).toBeUndefined();
  });
});
