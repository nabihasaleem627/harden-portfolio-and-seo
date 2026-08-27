export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-24 bg-slate-800"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <p className="text-violet-400 font-semibold text-sm uppercase tracking-wider mb-3">
              About Me
            </p>
            <h2
              id="about-heading"
              className="text-3xl sm:text-4xl font-extrabold text-white mb-6 leading-tight"
            >
              Turning ideas into{" "}
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                real products
              </span>
            </h2>

            <div className="space-y-4 text-slate-400 leading-relaxed">
              <p>
                I'm Alex Morgan, a full-stack developer with 5+ years of
                experience building web applications that people actually enjoy
                using. My focus is on React, TypeScript, and Node.js —
                technologies that let me ship fast without sacrificing quality.
              </p>
              <p>
                Before going full-stack I studied Computer Science at the
                University of Bristol, where I fell in love with the intersection
                of design and engineering. I've since worked with startups,
                agencies, and enterprises across fintech, edtech, and SaaS.
              </p>
              <p>
                When I'm not coding you'll find me hiking, tinkering with
                side-projects, or over-engineering my home automation setup.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-6">
              <Stat value="5+" label="Years experience" />
              <Stat value="30+" label="Projects shipped" />
              <Stat value="15+" label="Happy clients" />
            </div>
          </div>

          {/* Card / visual */}
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 blur-xl"
            />
            <div className="relative rounded-3xl bg-slate-900 border border-slate-700 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-black text-lg" aria-hidden="true">
                  AM
                </div>
                <div>
                  <p className="text-white font-bold">Alex Morgan</p>
                  <p className="text-slate-400 text-sm">Full-Stack Developer</p>
                </div>
              </div>

              <ul className="space-y-4" aria-label="Personal details">
                {[
                  {
                    icon: (
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    ),
                    label: "Location",
                    value: "Bristol, UK",
                  },
                  {
                    icon: (
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    ),
                    label: "Email",
                    value: "hello@alexmorgan.dev",
                  },
                  {
                    icon: (
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                      </svg>
                    ),
                    label: "Availability",
                    value: "Open to opportunities",
                  },
                  {
                    icon: (
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                        <path d="M6 12v5c3 3 9 3 12 0v-5" />
                      </svg>
                    ),
                    label: "Education",
                    value: "BSc Computer Science, University of Bristol",
                  },
                ].map((item) => (
                  <li key={item.label} className="flex items-start gap-3">
                    <span className="mt-0.5 text-violet-400">{item.icon}</span>
                    <div>
                      <p className="text-slate-500 text-xs uppercase tracking-wide">{item.label}</p>
                      <p className="text-slate-200 text-sm">{item.value}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-6 border-t border-slate-700">
                <a
                  href="/cv-alex-morgan.pdf"
                  download
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                  aria-label="Download Alex Morgan's CV as a PDF file"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" x2="12" y1="15" y2="3" />
                  </svg>
                  Download CV
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-3xl font-extrabold text-white">{value}</p>
      <p className="text-slate-400 text-sm mt-0.5">{label}</p>
    </div>
  );
}
