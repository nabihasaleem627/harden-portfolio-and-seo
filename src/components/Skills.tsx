const SKILL_GROUPS = [
  {
    category: "Frontend",
    skills: [
      { name: "React", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Vite", level: 88 },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", level: 88 },
      { name: "Express", level: 85 },
      { name: "PostgreSQL", level: 80 },
      { name: "MongoDB", level: 75 },
      { name: "GraphQL", level: 70 },
    ],
  },
  {
    category: "Tooling & DevOps",
    skills: [
      { name: "Git / GitHub", level: 95 },
      { name: "Docker", level: 72 },
      { name: "CI/CD (GitHub Actions)", level: 78 },
      { name: "Vercel / Netlify", level: 90 },
      { name: "AWS (S3, Lambda)", level: 65 },
    ],
  },
];

const TECH_TAGS = [
  "React", "TypeScript", "Next.js", "Node.js", "Express",
  "PostgreSQL", "MongoDB", "GraphQL", "Tailwind CSS", "Vite",
  "Docker", "Git", "AWS", "Vercel", "Figma",
  "Jest", "Vitest", "Prisma", "tRPC", "Zod",
];

export default function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="py-24 bg-slate-900"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-violet-400 font-semibold text-sm uppercase tracking-wider mb-3">
            Expertise
          </p>
          <h2
            id="skills-heading"
            className="text-3xl sm:text-4xl font-extrabold text-white mb-4"
          >
            Skills &amp; Technologies
          </h2>
          <p className="mx-auto max-w-xl text-slate-400">
            A curated overview of my technical stack. Proficiency levels reflect
            real-world project experience.
          </p>
        </div>

        {/* Skill bars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.category}
              className="rounded-2xl bg-slate-800 border border-slate-700 p-6"
            >
              <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-6 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500"
                />
                {group.category}
              </h3>
              <ul className="space-y-5" aria-label={`${group.category} skills`}>
                {group.skills.map((skill) => (
                  <li key={skill.name}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-slate-300 text-sm font-medium">
                        {skill.name}
                      </span>
                      <span className="text-slate-500 text-sm" aria-hidden="true">
                        {skill.level}%
                      </span>
                    </div>
                    <div
                      role="meter"
                      aria-label={`${skill.name} proficiency`}
                      aria-valuenow={skill.level}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuetext={`${skill.level} percent`}
                      className="h-2 rounded-full bg-slate-700 overflow-hidden"
                    >
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-700"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Tech tag cloud */}
        <div className="text-center">
          <h3 className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-6">
            Also worked with
          </h3>
          <ul
            className="flex flex-wrap justify-center gap-2"
            aria-label="Additional technologies"
            role="list"
          >
            {TECH_TAGS.map((tag) => (
              <li key={tag}>
                <span className="inline-block px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-sm hover:border-violet-500/50 hover:text-violet-300 transition-colors">
                  {tag}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
