import { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "digital-identity-platform",
    title: "Digital Identity Platform",
    description:
      "A full-stack platform for creating QR-powered digital profiles with secure authentication, media management, and protected user access.",
    problem:
      "Users needed a way to create and share digital profiles quickly via QR codes, with secure authentication and media management — without relying on fragmented third-party tools.",
    approach:
      "Built a full-stack Next.js application with Clerk for authentication, MongoDB for data persistence, and Cloudinary for media uploads. Used Zustand for client-side state management and implemented protected API routes with middleware-level auth checks.",
    challenges: [
      "Integrating Clerk webhooks with MongoDB to keep user data in sync across services",
      "Handling image upload validation and transformation pipelines through Cloudinary",
      "Designing a flexible QR code system that encodes profile URLs with tracking metadata",
      "Implementing role-based access control across both frontend routes and API endpoints",
    ],
    results: [
      "Fully functional platform with secure user registration. login, and profile management",
      "QR code generation with instant profile sharing and scan tracking",
      "Optimized media pipeline handling uploads, cropping, and CDN delivery",
      "Protected routing ensuring unauthorized users cannot access restricted content",
    ],
    tags: [
      "Next.js",
      "React",
      "Node.js",
      "MongoDB",
      "Clerk",
      "Cloudinary",
      "Zustand",
      "TypeScript",
    ],
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    slug: "authentication-security-system",
    title: "Authentication & Security System",
    description:
      "JWT-based authentication system with OTP verification, password reset workflows, and protected routing using secure HTTP-only cookies.",
    problem:
      "The application required a robust authentication layer supporting multi-step verification, token-based sessions, and secure password recovery — all without relying on third-party auth providers.",
    approach:
      "Implemented a custom auth system using ASP.NET Core for the API, JWT tokens stored in HTTP-only cookies, and React for the frontend. Added OTP email verification and a full password reset flow with time-limited tokens.",
    challenges: [
      "Securing JWT tokens against XSS and CSRF by using HTTP-only cookies with SameSite policies",
      "Building a time-limited OTP verification flow with retry limits and expiration handling",
      "Designing a password reset pipeline that validates token integrity before allowing changes",
      "Coordinating frontend route protection with backend middleware authorization checks",
    ],
    results: [
      "End-to-end auth system with login, registration, OTP verification, and password reset",
      "Secure session management using HTTP-only cookies with proper expiration policies",
      "Protected API endpoints and frontend routes with role-aware middleware",
      "Clean, reusable auth patterns applicable across multiple projects",
    ],
    tags: ["React", "ASP.NET Core", "C#", "SQL Server", "JWT", "Ant Design"],
    gradient: "from-blue-500 to-purple-500",
  },
  {
    slug: "enterprise-data-grid-system",
    title: "Enterprise Data Grid System",
    description:
      "Data-intensive application featuring dynamic grids, expandable rows, and API-driven rendering for handling structured datasets.",
    problem:
      "Enterprise users needed to browse, filter, and interact with large structured datasets through a responsive UI — replacing slow legacy Razor views with a modern React frontend.",
    approach:
      "Built a React frontend using KendoReact data grids connected to ASP.NET Core APIs backed by SQL Server. Implemented expandable rows, server-side pagination, and async data loading with proper loading states.",
    challenges: [
      "Handling server-side pagination and sorting for datasets with thousands of rows",
      "Implementing expandable detail rows that load child data on demand without blocking the UI",
      "Migrating existing Razor views to React components while preserving business logic",
      "Optimizing re-renders in data-heavy grids to maintain smooth scrolling performance",
    ],
    results: [
      "Responsive data grid handling large datasets with smooth client-side interactions",
      "Expandable row system with lazy-loaded detail views",
      "Successful migration from legacy Razor views to modern React architecture",
      "Reduced page load times through server-side pagination and optimized API queries",
    ],
    tags: ["React", "KendoReact", "ASP.NET Core", "SQL Server", "TypeScript"],
    gradient: "from-purple-500 to-pink-500",
  },
  {
    slug: "excel-report-generation-engine",
    title: "Excel Report Generation Engine",
    description:
      "Backend system for generating structured Excel reports with pagination, multi-sheet handling, and dynamic branding.",
    problem:
      "Stakeholders required automated Excel reports generated from complex SQL queries, with consistent formatting, company branding, and support for multi-sheet workbooks.",
    approach:
      "Built a .NET backend service using EPPlus and ClosedXML to generate Excel workbooks programmatically. Designed a templating system that applies headers, footers, branding, and pagination rules to each sheet based on report type.",
    challenges: [
      "Handling large result sets without excessive memory consumption during workbook generation",
      "Designing a flexible templating system that adapts formatting based on report configuration",
      "Implementing multi-sheet workbooks where each sheet has independent pagination and styling",
      "Ensuring generated files are compatible across Excel versions and third-party viewers",
    ],
    results: [
      "Automated report generation replacing hours of manual spreadsheet work",
      "Consistent branding and formatting across all generated reports",
      "Multi-sheet workbook support with configurable pagination and layout rules",
      "Reliable output compatible with Excel 2016+ and Google Sheets",
    ],
    tags: ["C#", ".NET", "SQL Server", "EPPlus", "ClosedXML"],
    gradient: "from-orange-500 to-amber-500",
  },
  {
    slug: "real-time-chat-system",
    title: "Real-Time Chat System (Dating App)",
    description:
      "Designed a real-time messaging system for matched users with event-driven communication and notification workflows.",
    problem:
      "Matched users on a dating platform needed instant, reliable messaging with real-time delivery indicators and notification support — without polling or page refreshes.",
    approach:
      "Implemented WebSocket-based messaging using Node.js on the backend and React on the frontend. Designed an event-driven architecture where connections are managed per-user and messages are broadcast only to matched pairs.",
    challenges: [
      "Managing WebSocket connection lifecycles — handling reconnection, heartbeats, and cleanup",
      "Ensuring messages are delivered in order and persisted even when recipients are offline",
      "Scoping message visibility so users only see conversations with their matched partners",
      "Building a notification system that triggers on new messages without duplicating alerts",
    ],
    results: [
      "Real-time messaging with sub-second delivery between matched users",
      "Event-driven architecture cleanly separating connection management from business logic",
      "Message persistence ensuring no data loss during disconnections",
      "Notification workflows integrated with the messaging pipeline",
    ],
    tags: ["React", "WebSockets", "JavaScript", "Node.js"],
    gradient: "from-green-500 to-cyan-500",
  },
  {
    slug: "cybersecurity-automation-scripts",
    title: "Cybersecurity Automation Scripts",
    description:
      "Python-based automation scripts for handling repetitive security and data processing tasks with a focus on efficiency and reliability.",
    problem:
      "Repetitive security tasks — log parsing, file validation, data transformation — were being done manually, consuming time and introducing human error.",
    approach:
      "Wrote a collection of Python scripts automating common security and data processing workflows. Focused on file handling, pattern matching, and structured output generation with clear logging and error reporting.",
    challenges: [
      "Handling diverse file formats and encodings without data corruption",
      "Building robust error handling so scripts fail gracefully with actionable log messages",
      "Designing scripts to be composable — each performing a single task and piping output to the next",
      "Balancing performance with readability for scripts that others might maintain",
    ],
    results: [
      "Automated workflows that replaced hours of manual security and data processing tasks",
      "Reliable scripts with structured logging and clear error reporting",
      "Composable design allowing scripts to be chained for complex multi-step operations",
      "Reduced human error in repetitive data handling and validation tasks",
    ],
    tags: ["Python", "File Handling", "Automation"],
    gradient: "from-emerald-500 to-teal-500",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
