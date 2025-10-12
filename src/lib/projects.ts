import { Project } from "@/types";

export const projects: Project[] = [
  {
    title: "E-Commerce Platform",
    description:
      "Full-stack store with real-time inventory, Stripe checkout, and an admin analytics suite.",
    tech: [
      "Next.js",
      "Node",
      "PostgreSQL",
      "Prisma",
      "Stripe",
      "Docker",
      "AWS",
    ],
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    title: "Task Management (Realtime Kanban)",
    description:
      "Collaborative boards with comments and optimistic updates; live presence via WebSockets.",
    tech: ["TypeScript", "Next.js", "WebSocket", "Redis", "PostgreSQL"],
    gradient: "from-blue-500 to-purple-500",
  },
  {
    title: "AI Content Generator",
    description:
      "Brief-to-draft writing assistant with tone/length controls and export workflows.",
    tech: ["React", "FastAPI", "Python", "PostgreSQL", "S3"],
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Analytics Dashboard",
    description:
      "Realtime KPIs, custom charting, and CSV/Excel exports with a focus on smooth visuals.",
    tech: ["React", "D3/KendoReact", "GraphQL", "Node", "AWS"],
    gradient: "from-green-500 to-cyan-500",
  },
  {
    title: "QR / Identity Verification",
    description:
      "Secure QR issuance and verification with role-based access controls and audit trails.",
    tech: [".NET", "C#", "SQL Server", "JWT", "Redis", "Next.js"],
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    title: "Automated Reporting Suite",
    description:
      "Scheduled and ad-hoc Excel/PDF generation using branded templates and email delivery.",
    tech: [".NET", "C#", "SQL Server", "EPPlus", "PDF tooling"],
    gradient: "from-orange-500 to-amber-500",
  },
];
