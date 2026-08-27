const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      role="contentinfo"
      className="bg-slate-900 border-t border-slate-800"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <span
              className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-violet-500 to-indigo-600 text-white text-xs font-black"
              aria-hidden="true"
            >
              AM
            </span>
            <span className="text-slate-400 text-sm">
              &copy; {CURRENT_YEAR} Alex Morgan. All rights reserved.
            </span>
          </div>

          {/* Links */}
          <nav aria-label="Footer navigation">
            <ul className="flex items-center gap-5 text-slate-500 text-sm" role="list">
              {[
                { label: "About", href: "#about" },
                { label: "Projects", href: "#projects" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .querySelector(link.href)
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="hover:text-slate-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Back to top */}
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll back to top of page"
            className="flex items-center gap-1.5 text-slate-500 hover:text-slate-300 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded-sm"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="m18 15-6-6-6 6" />
            </svg>
            Back to top
          </button>
        </div>

        {/* Known limitation notice */}
        <p className="mt-6 text-center text-slate-600 text-xs">
          This portfolio is a demonstration project. Project links and contact form
          submissions are simulated — no real data is sent or stored.
        </p>
      </div>
    </footer>
  );
}
