export type Project = {
  slug: string;
  title: string;
  description: string;

  // Detail page fields
  problem?: string;
  approach?: string;
  challenges?: string[];
  results?: string[];

  // UI fields
  href?: string;
  imageSrc?: string;
  alt?: string;

  // rename for UI consistency
  tags: string[];

  // styling
  gradient: string;
};

// ContactValues is exported from @/lib/schemas (Zod-inferred)
