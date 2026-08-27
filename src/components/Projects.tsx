import { useState } from "react";

const PROJECTS = [
  {
    id: 1,
    title: "TaskFlow",
    description:
      "A real-time project management tool with drag-and-drop kanban boards, team workspaces, and Slack integration. Built to handle 10k+ concurrent users.",
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL", "WebSockets"],
    category: "fullstack",
    status: "live",
    liveUrl: "https://taskflow-demo.vercel.app",
    repoUrl: "https://github.com/alexmorgandev/taskflow",
    highlight: true,
    emoji: "📋",
    color: "from-violet-500 to-indigo-600",
  },
  {
    id: 2,
    title: "DevMetrics",
    description:
      "Open-source developer analytics dashboard. Pulls data from GitHub, Jira, and Linear APIs to give engineering teams insights on velocity and code quality.",
    tags: ["Next.js", "TypeScript", "GraphQL", "Prisma", "Chart.js"],
    category: "fullstack",
    status: "live",
    liveUrl: "https://devmetrics.io",
    repoUrl: "https://github.com/alexmorgandev/devmetrics",
    highlight: true,
    emoji: "📊",
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: 3,
    title: "ShopKit",
    description:
      "Headless e-commerce starter kit with Stripe payments, inventory management, and a blazing-fast storefront powered by Next.js App Router.",
    tags: ["Next.js", "Stripe", "Tailwind", "Vercel", "MongoDB"],
    category: "frontend",
    status: "live",
    liveUrl: "https://shopkit-demo.vercel.app",
    repoUrl: "https://github.com/alexmorgandev/shopkit",
    highlight: false,
    emoji: "🛒",
    color: "from-orange-500 to-pink-600",
  },
  {
    id: 4,
    title: "MarkdownAI",
    description:
      "AI-powered markdown editor with real-time preview, smart suggestions, and one-click export to PDF, HTML, or Notion. Uses OpenAI GPT-4.",
    tags: ["React", "OpenAI", "TypeScript", "Vite", "IndexedDB"],
    category: "frontend",
    status: "wip",
    liveUrl: null,
    repoUrl: "https://github.com/alexmorgandev/markdownai",
    highlight: false,
    emoji: "✍️",
    color: "from-blue-500 to-cyan-600",
  },
  {
    id: 5,
    title: "AuthKit",
    description:
      "Production-ready authentication microservice with JWT, OAuth2 (Google, GitHub), MFA, and session management. Docker-ready with full test coverage.",
    tags: ["Node.js", "Express", "PostgreSQL", "Docker", "JWT"],
    category: "backend",
    status: "live",
    liveUrl: null,
    repoUrl: "https://github.com/alexmorgandev/authkit",
    highlight: false,
    emoji: "🔐",
    color: "from-slate-500 to-slate-700",
  },
  {
    id: 6,
    title: "PulseAPI",
    description:
      "Lightweight uptime monitoring API. Pings endpoints on configurable schedules, stores latency history, and sends alerts via email or webhook.",
    tags: ["Node.js", "TypeScript", "SQLite", "Cron", "REST"],
    category: "backend",
    status: "live",
    liveUrl: null,
    repoUrl: "https://github.com/alexmorgandev/pulseapi",
    highlight: false,
    emoji: "📡",
    color: "from-rose-500 to-red-600",
  },
];

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Full-Stack", value: "fullstack" },
  { label: "Frontend", value: "frontend" },
  { label: "Backend", value: "backend" },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="py-24 bg-slate-800"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-violet-400 font-semibold text-sm uppercase tracking-wider mb-3">
            Portfolio
          </p>
          <h2
            id="projects-heading"
            className="text-3xl sm:text-4xl font-extrabold text-white mb-4"
          >
            Selected Projects
          </h2>
          <p className="mx-auto max-w-xl text-slate-400">
            A selection of projects I've built — ranging from open-source tools
            to production applications.
          </p>
        </div>

        {/* Filter tabs */}
        <div
          role="tablist"
          aria-label="Filter projects by category"
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {FILTERS.map((f) => (
            <button
              key={f.value}
              role="tab"
              type="button"
              aria-selected={activeFilter === f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${
                activeFilter === f.value
                  ? "bg-violet-600 text-white shadow-md shadow-violet-900/40"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <p className="text-center text-slate-400 py-16" role="status">
            No projects in this category yet.
          </p>
        ) : (
          <ul
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            role="list"
            aria-label={`${activeFilter === "all" ? "All" : FILTERS.find(f => f.value === activeFilter)?.label} projects`}
          >
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </ul>
        )}

        {/* CTA */}
        <div className="mt-14 text-center">
          <a
            href="https://github.com/alexmorgandev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-600 hover:border-violet-500 text-slate-300 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            aria-label="View all projects on GitHub (opens in new tab)"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
            </svg>
            View all on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: (typeof PROJECTS)[0] }) {
  return (
    <li className="group relative flex flex-col rounded-2xl bg-slate-900 border border-slate-700 hover:border-slate-500 transition-all duration-300 overflow-hidden">
      {/* Top gradient bar */}
      <div
        className={`h-1.5 w-full bg-gradient-to-r ${project.color} flex-shrink-0`}
        aria-hidden="true"
      />

      <div className="flex flex-col flex-1 p-6">
        {/* Icon & status */}
        <div className="flex items-start justify-between mb-4">
          <span
            className="text-3xl"
            role="img"
            aria-label={`${project.title} project icon`}
          >
            {project.emoji}
          </span>
          <StatusBadge status={project.status} />
        </div>

        {/* Title & description */}
        <h3 className="text-white font-bold text-lg mb-2 group-hover:text-violet-300 transition-colors">
          {project.title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Tags */}
        <ul
          className="flex flex-wrap gap-1.5 mt-5 mb-5"
          aria-label={`Technologies used in ${project.title}`}
          role="list"
        >
          {project.tags.map((tag) => (
            <li key={tag}>
              <span className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-slate-400 text-xs">
                {tag}
              </span>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded-sm"
              aria-label={`View live demo of ${project.title} (opens in new tab)`}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" x2="21" y1="14" y2="3" />
              </svg>
              Live Demo
            </a>
          ) : (
            <span className="text-sm text-slate-600 italic">No live demo</span>
          )}
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded-sm"
            aria-label={`View ${project.title} source code on GitHub (opens in new tab)`}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
            </svg>
            GitHub
          </a>
        </div>
      </div>
    </li>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; classes: string }> = {
    live: {
      label: "Live",
      classes: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    },
    wip: {
      label: "In Progress",
      classes: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    },
    archived: {
      label: "Archived",
      classes: "bg-slate-500/10 text-slate-400 border-slate-500/30",
    },
  };

  const badge = map[status] ?? {
    label: status,
    classes: "bg-slate-500/10 text-slate-400 border-slate-500/30",
  };

  return (
    <span
      className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold border ${badge.classes}`}
      aria-label={`Project status: ${badge.label}`}
    >
      {badge.label}
    </span>
  );
}
