import Container from "@/components/Container";
import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import { Project } from "@/types";

const projects: Project[] = [
  {
    id: "p1",
    title: "Analytics Dashboard",
    description: "Next.js + TanStack Query + server actions.",
    tags: ["Next.js", "TypeScript", "Postgres"],
    href: "#",
    imageAlt: "Analytics dashboard UI preview",
  },
  {
    id: "p2",
    title: "E-commerce Storefront",
    description: "Headless storefront: fast, accessible, resilient.",
    tags: ["React", "Tailwind", "Stripe"],
    href: "#",
    imageAlt: "E-commerce preview",
  },
  {
    id: "p3",
    title: "Real-time Chat",
    description: "WebSocket messaging with graceful fallbacks.",
    tags: ["WebSocket", "Zustand", "Node.js"],
    href: "#",
    imageAlt: "Chat app preview",
  },
];

export default function ProjectsPage() {
  return (
    <Section>
      <Container>
        <h1 className="text-3xl md:text-4xl font-bold">Projects</h1>
        <p className="mt-3 text-muted-foreground">
          A small selection of recent work.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
