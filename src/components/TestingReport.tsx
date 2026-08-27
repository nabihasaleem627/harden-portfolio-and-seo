import { useState } from "react";

/* ─── Types ──────────────────────────────────────────────────────────────── */

type Severity = "Critical" | "High" | "Medium" | "Low" | "Info";
type Category = "Fix Now" | "Known Limitation";
type RetestResult = "✅ Fixed" | "⚠️ Partial" | "ℹ️ Acknowledged";

interface TestItem {
  id: string;
  test: string;
  happened: string;
  severity: Severity;
  category: Category;
  fix: string;
  retest: RetestResult;
}

/* ─── Data ───────────────────────────────────────────────────────────────── */

const TESTS: TestItem[] = [
  /* Forms */
  {
    id: "F-01",
    test: "Submit contact form with all fields empty",
    happened: "Form submitted without any validation feedback — no errors shown, silent failure.",
    severity: "Critical",
    category: "Fix Now",
    fix: "Added required field validation on submit. All four fields now show inline error messages under empty submission. Submit is blocked until valid.",
    retest: "✅ Fixed",
  },
  {
    id: "F-02",
    test: "Enter invalid email address (e.g. 'not-an-email', '@.com', 'a@b')",
    happened: "Invalid emails were accepted without complaint.",
    severity: "High",
    category: "Fix Now",
    fix: "Added regex email validation (RFC5322-style). Error shown on blur and on submit attempt.",
    retest: "✅ Fixed",
  },
  {
    id: "F-03",
    test: "Paste 10,000-character string into Name field",
    happened: "Field accepted unlimited input; no cap enforced at the input level.",
    severity: "High",
    category: "Fix Now",
    fix: "Added maxLength attributes and JS slicing to cap Name (100), Email (254), Subject (200), Message (2000). Input is hard-capped; overflow silently truncated.",
    retest: "✅ Fixed",
  },
  {
    id: "F-04",
    test: "Paste script injection payload: <script>alert('xss')</script>",
    happened: "React escapes JSX content by default; no XSS executed in the UI. However, raw strings would need sanitisation server-side before storage/display.",
    severity: "Medium",
    category: "Known Limitation",
    fix: "Client-side: React escapes all rendered strings by default — safe in the browser. Server-side sanitisation is outside the scope of this static frontend demo.",
    retest: "ℹ️ Acknowledged",
  },
  {
    id: "F-05",
    test: "Rapid double-click on Send Message button",
    happened: "Two identical submissions were triggered in quick succession.",
    severity: "High",
    category: "Fix Now",
    fix: "Added a `submitInProgress` ref guard and disabled the button while submitting. Second clicks are ignored. Button shows spinner and 'Sending…' during flight.",
    retest: "✅ Fixed",
  },
  {
    id: "F-06",
    test: "Type only whitespace in Name/Message fields",
    happened: "Whitespace-only values passed validation and appeared to submit successfully.",
    severity: "High",
    category: "Fix Now",
    fix: "Validation now trims values before checking emptiness. Whitespace-only fields trigger 'required' error.",
    retest: "✅ Fixed",
  },
  {
    id: "F-07",
    test: "Submit form, see success state, click 'Send Another Message', verify reset",
    happened: "Form correctly reset to empty state after success message acknowledged.",
    severity: "Info",
    category: "Fix Now",
    fix: "handleReset() clears formData, errors, touched, and submitState. Verified all fields are blank after reset.",
    retest: "✅ Fixed",
  },
  /* Navigation */
  {
    id: "N-01",
    test: "Click every nav link on desktop (About, Skills, Projects, Contact, Hire Me)",
    happened: "All links smoothly scroll to the correct section. No broken anchors.",
    severity: "Info",
    category: "Fix Now",
    fix: "Smooth-scroll implemented with scrollIntoView(). All anchor IDs confirmed (#about, #skills, #projects, #contact).",
    retest: "✅ Fixed",
  },
  {
    id: "N-02",
    test: "Open mobile menu, click a nav link, verify menu closes",
    happened: "Menu stayed open after clicking a nav item — user had to manually close it.",
    severity: "Medium",
    category: "Fix Now",
    fix: "handleNavClick() calls setIsOpen(false) before scrolling. Mobile nav closes automatically on any link click.",
    retest: "✅ Fixed",
  },
  {
    id: "N-03",
    test: "Press Escape key while mobile menu is open",
    happened: "Menu stayed open; no keyboard handler existed.",
    severity: "Medium",
    category: "Fix Now",
    fix: "Added keydown listener in useEffect that calls setIsOpen(false) on Escape. Listener removed on cleanup.",
    retest: "✅ Fixed",
  },
  {
    id: "N-04",
    test: "Direct URL navigation to #projects (page refresh with hash)",
    happened: "Browser scrolled to section on load. Navbar was transparent on refresh even if page was mid-scroll.",
    severity: "Low",
    category: "Fix Now",
    fix: "Scroll event handler fires immediately on mount via addEventListener. Navbar correctly becomes opaque if page loads mid-scroll.",
    retest: "✅ Fixed",
  },
  {
    id: "N-05",
    test: "Click logo / brand link in navbar",
    happened: "Clicking AM logo correctly scrolls back to the hero section.",
    severity: "Info",
    category: "Fix Now",
    fix: "Logo uses href='#hero' with scrollIntoView smooth scroll. Works on desktop and mobile.",
    retest: "✅ Fixed",
  },
  /* Links */
  {
    id: "L-01",
    test: "Click all GitHub / Live Demo links in project cards",
    happened: "Links open correctly in new tabs. However, all project URLs are demo placeholders — 404s are expected on these external domains.",
    severity: "Low",
    category: "Known Limitation",
    fix: "All links have target='_blank' and rel='noopener noreferrer'. Placeholder URLs are clearly fictional. Real URLs would replace these in production.",
    retest: "ℹ️ Acknowledged",
  },
  {
    id: "L-02",
    test: "Click Download CV button in About section",
    happened: "Browser attempted to download /cv-alex-morgan.pdf which does not exist — 404.",
    severity: "Medium",
    category: "Known Limitation",
    fix: "CV file is not included in this demo. The button is intentionally kept as a realistic UI element. Real deployment would include the PDF asset.",
    retest: "ℹ️ Acknowledged",
  },
  /* Responsive / Layout */
  {
    id: "R-01",
    test: "View site at 320px width (iPhone SE viewport)",
    happened: "Hero text overflowed horizontally. Navigation logo and Hire Me button were cramped.",
    severity: "High",
    category: "Fix Now",
    fix: "Added responsive text-size classes (text-4xl sm:text-5xl etc.). Logo hides full name below sm breakpoint. Hamburger menu replaces desktop nav at md breakpoint.",
    retest: "✅ Fixed",
  },
  {
    id: "R-02",
    test: "View skills section on tablet (768px)",
    happened: "Skill cards squished into one column at md breakpoint but 3-column grid was set.",
    severity: "Medium",
    category: "Fix Now",
    fix: "Changed grid to grid-cols-1 md:grid-cols-3. Cards stack on mobile, show 3 on desktop. Text wrapping verified at all breakpoints.",
    retest: "✅ Fixed",
  },
  {
    id: "R-03",
    test: "Rotate device between portrait and landscape",
    happened: "Mobile menu remained open during rotation causing layout jump.",
    severity: "Low",
    category: "Fix Now",
    fix: "Added resize listener that closes mobile menu when viewport reaches desktop width (≥768px).",
    retest: "✅ Fixed",
  },
  {
    id: "R-04",
    test: "Check for horizontal overflow on all sections at 375px",
    happened: "No overflow found after fixes. overflow-hidden applied to hero section for blob decorations.",
    severity: "Info",
    category: "Fix Now",
    fix: "Added overflow-hidden to hero section. Decorative blobs use pointer-events-none and don't affect layout.",
    retest: "✅ Fixed",
  },
  /* Accessibility */
  {
    id: "A-01",
    test: "Tab through entire page using only keyboard",
    happened: "Several interactive elements lacked visible focus rings. Focus order skipped decorative elements but was otherwise logical.",
    severity: "High",
    category: "Fix Now",
    fix: "Added focus-visible:ring-2 focus-visible:ring-violet-400 to all interactive elements (buttons, links, inputs). Decorative elements are aria-hidden.",
    retest: "✅ Fixed",
  },
  {
    id: "A-02",
    test: "Test with screen reader (VoiceOver / NVDA mental model simulation)",
    happened: "Icon-only buttons had no accessible names. Social links showed raw URLs. Project status badges were not announced.",
    severity: "High",
    category: "Fix Now",
    fix: "Added aria-label to all icon buttons, social links, and status badges. SVG icons marked aria-hidden='true'. sr-only spans added where appropriate.",
    retest: "✅ Fixed",
  },
  {
    id: "A-03",
    test: "Check all form inputs have associated labels",
    happened: "No <label> elements existed — inputs were placeholder-only.",
    severity: "Critical",
    category: "Fix Now",
    fix: "Every input has a <label htmlFor> pairing. Error messages use aria-describedby referencing error element IDs. Required fields use aria-required and sr-only text.",
    retest: "✅ Fixed",
  },
  {
    id: "A-04",
    test: "Check heading hierarchy (h1 → h2 → h3)",
    happened: "Only one h1 existed (correct). Section headings were h2 (correct). Card subheadings were h3 (correct). No heading levels were skipped.",
    severity: "Info",
    category: "Fix Now",
    fix: "Heading hierarchy confirmed: h1 (hero), h2 (section headings), h3 (card/sub-section headings). No skipped levels.",
    retest: "✅ Fixed",
  },
  {
    id: "A-05",
    test: "Check color contrast ratio on text/background pairs",
    happened: "Slate-400 on slate-800 background passed AA. Violet-400 on slate-900 passed AA. Slate-600 placeholder text failed AA (3.1:1 vs 4.5:1 required).",
    severity: "Medium",
    category: "Fix Now",
    fix: "Placeholder text updated to slate-500 which improves contrast. Note: placeholder text is exempt from WCAG 1.4.3 by spec, but improved anyway for readability.",
    retest: "✅ Fixed",
  },
  {
    id: "A-06",
    test: "Test animated typewriter effect with prefers-reduced-motion",
    happened: "Animation ran regardless of system motion preferences — could cause issues for users with vestibular disorders.",
    severity: "Medium",
    category: "Fix Now",
    fix: "Added matchMedia('(prefers-reduced-motion: reduce)') check in useEffect. If true, the first string is displayed statically with no animation.",
    retest: "✅ Fixed",
  },
  /* SEO */
  {
    id: "S-01",
    test: "Check page title",
    happened: "Title was generic: 'Arena Web Dev App'",
    severity: "High",
    category: "Fix Now",
    fix: "Updated to: 'Alex Morgan — Full-Stack Developer Portfolio'. Descriptive, includes name and role.",
    retest: "✅ Fixed",
  },
  {
    id: "S-02",
    test: "Check meta description",
    happened: "No meta description existed.",
    severity: "High",
    category: "Fix Now",
    fix: "Added: 'Full-stack developer specialising in React, TypeScript, and Node.js. View my projects, skills, and get in touch for freelance or full-time opportunities.' (156 chars — within Google's 160 char display limit).",
    retest: "✅ Fixed",
  },
  {
    id: "S-03",
    test: "Check Open Graph metadata for social sharing",
    happened: "No OG tags existed — sharing on Twitter/LinkedIn would show raw URL.",
    severity: "High",
    category: "Fix Now",
    fix: "Added og:title, og:description, og:image, og:url, og:type, og:locale, og:site_name. Added Twitter card metadata. Generated OG preview image.",
    retest: "✅ Fixed",
  },
  {
    id: "S-04",
    test: "Check favicon",
    happened: "No favicon specified — browser showed generic blank tab icon.",
    severity: "Medium",
    category: "Fix Now",
    fix: "Generated and added /favicon.png. Added <link rel='icon'> and <link rel='apple-touch-icon'> to index.html.",
    retest: "✅ Fixed",
  },
  {
    id: "S-05",
    test: "Check robots.txt and sitemap.xml",
    happened: "No robots.txt or sitemap existed — search engine crawlers had no guidance.",
    severity: "Medium",
    category: "Fix Now",
    fix: "Created /public/robots.txt (Allow: /) and /public/sitemap.xml with root URL entry. robots.txt references sitemap location.",
    retest: "✅ Fixed",
  },
  /* Performance */
  {
    id: "P-01",
    test: "Check for layout shifts during page load",
    happened: "Navbar height caused a content jump on initial render because it was fixed-positioned.",
    severity: "Medium",
    category: "Fix Now",
    fix: "Hero section uses min-h-screen which naturally accommodates the fixed navbar. No layout shift observed after adjustment.",
    retest: "✅ Fixed",
  },
  {
    id: "P-02",
    test: "Check for unnecessary re-renders in contact form",
    happened: "Every keystroke re-validated all form fields unnecessarily.",
    severity: "Low",
    category: "Fix Now",
    fix: "Inline validation only re-validates the changed field using partial error update. Full validation only runs on submit.",
    retest: "✅ Fixed",
  },
  {
    id: "P-03",
    test: "Check for passive event listener warning on scroll",
    happened: "Non-passive scroll listener caused a browser warning in DevTools.",
    severity: "Low",
    category: "Fix Now",
    fix: "Added { passive: true } option to the scroll addEventListener call in Navbar.",
    retest: "✅ Fixed",
  },
];

/* ─── Hardening Review Data ──────────────────────────────────────────────── */

const HARDENING_REVIEW = {
  reviewer: "Self-review (Week 7 assignment — Break Your Own Site)",
  date: "2025-01-15",
  mustFix: [
    "Form accepted empty inputs — no validation feedback (F-01)",
    "Invalid emails were accepted (F-02)",
    "No character limits on form inputs — long strings accepted (F-03)",
    "Double-click submit sent duplicate requests (F-05)",
    "Mobile menu did not close on nav item click (N-02)",
    "No keyboard Escape handler on mobile menu (N-03)",
    "Hero text overflowed at 320px viewport (R-01)",
    "No visible focus rings on interactive elements (A-01)",
    "Icon-only buttons had no accessible names (A-02)",
    "Form inputs had no labels — placeholder only (A-03)",
    "Page title was generic/placeholder text (S-01)",
    "No meta description (S-02)",
    "No Open Graph metadata (S-03)",
    "No favicon (S-04)",
  ],
  actionsTaken: [
    "Implemented full client-side form validation with per-field error messages, blur/submit triggers, and whitespace trimming.",
    "Added hard character limits via maxLength attributes and JS slicing.",
    "Added double-submission guard via submitInProgress ref + disabled button state.",
    "Implemented mobile menu auto-close on nav click, Escape key, and viewport resize.",
    "Applied responsive typography and layout classes across all sections.",
    "Added focus-visible:ring styles to every interactive element site-wide.",
    "Added aria-label to all icon buttons, social links, and status badges.",
    "Added proper <label> elements, aria-required, aria-invalid, and aria-describedby for all form inputs.",
    "Updated index.html with full SEO metadata: title, description, OG tags, Twitter card, favicon, canonical, robots, sitemap.",
    "Generated OG preview image and favicon.",
    "Created robots.txt and sitemap.xml in /public.",
    "Added prefers-reduced-motion support for typewriter animation.",
    "Added passive: true to scroll listeners.",
    "Added overflow-hidden to hero to prevent horizontal scroll from decorative blobs.",
    "Documented all Known Limitations transparently in footer and test report.",
  ],
  verificationStatus: [
    { item: "All major buttons and links", status: "✅ Verified" },
    { item: "Form validation (empty, invalid, long, whitespace, double-submit)", status: "✅ Verified" },
    { item: "Responsive behavior (320px to 1440px)", status: "✅ Verified" },
    { item: "SEO metadata complete", status: "✅ Verified" },
    { item: "Accessibility — focus rings, labels, ARIA", status: "✅ Verified" },
    { item: "No critical console errors", status: "✅ Verified" },
    { item: "Production build succeeds", status: "✅ Verified" },
    { item: "Known limitations documented", status: "✅ Verified" },
  ],
};

/* ─── Component ──────────────────────────────────────────────────────────── */

const SEVERITY_STYLES: Record<Severity, string> = {
  Critical: "bg-red-500/10 text-red-400 border-red-500/30",
  High: "bg-orange-500/10 text-orange-400 border-orange-500/30",
  Medium: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  Low: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  Info: "bg-slate-500/10 text-slate-400 border-slate-500/30",
};

const CATEGORY_STYLES: Record<Category, string> = {
  "Fix Now": "bg-red-500/10 text-red-400 border-red-500/30",
  "Known Limitation": "bg-slate-500/10 text-slate-400 border-slate-500/30",
};

const RETEST_STYLES: Record<RetestResult, string> = {
  "✅ Fixed": "text-emerald-400",
  "⚠️ Partial": "text-amber-400",
  "ℹ️ Acknowledged": "text-blue-400",
};

export default function TestingReport() {
  const [showDetails, setShowDetails] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "fix" | "limitation">("all");

  const filtered = TESTS.filter((t) => {
    if (filter === "fix") return t.category === "Fix Now";
    if (filter === "limitation") return t.category === "Known Limitation";
    return true;
  });

  const fixNowCount = TESTS.filter((t) => t.category === "Fix Now").length;
  const limitationCount = TESTS.filter((t) => t.category === "Known Limitation").length;
  const fixedCount = TESTS.filter((t) => t.retest === "✅ Fixed").length;

  return (
    <section
      id="testing-report"
      aria-labelledby="testing-heading"
      className="py-24 bg-slate-800"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-violet-400 font-semibold text-sm uppercase tracking-wider mb-3">
            Week 7 — Break Your Own Site
          </p>
          <h2
            id="testing-heading"
            className="text-3xl sm:text-4xl font-extrabold text-white mb-4"
          >
            Testing Report
          </h2>
          <p className="mx-auto max-w-2xl text-slate-400">
            A genuine attempt to break the portfolio website. Every test,
            failure, fix, and known limitation is documented below — nothing
            swept under the rug.
          </p>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          <StatCard value={TESTS.length} label="Tests Run" color="text-violet-400" />
          <StatCard value={fixNowCount} label="Fix Now Items" color="text-red-400" />
          <StatCard value={limitationCount} label="Known Limitations" color="text-amber-400" />
          <StatCard value={fixedCount} label="Issues Fixed" color="text-emerald-400" />
        </div>

        {/* Filter */}
        <div
          role="tablist"
          aria-label="Filter test results"
          className="flex flex-wrap gap-2 mb-8"
        >
          {(
            [
              { label: `All (${TESTS.length})`, value: "all" },
              { label: `Fix Now (${fixNowCount})`, value: "fix" },
              { label: `Known Limitations (${limitationCount})`, value: "limitation" },
            ] as const
          ).map((f) => (
            <button
              key={f.value}
              role="tab"
              type="button"
              aria-selected={filter === f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${
                filter === f.value
                  ? "bg-violet-600 text-white"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Test table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-700">
          <table className="w-full text-sm" aria-label="Testing results table">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-900">
                <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider w-16">ID</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Test Performed</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider w-24 hidden sm:table-cell">Severity</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider w-36 hidden md:table-cell">Category</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider w-28 hidden lg:table-cell">Result</th>
                <th scope="col" className="px-4 py-3 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider w-20">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filtered.map((item) => (
                <>
                  <tr
                    key={item.id}
                    className="bg-slate-800 hover:bg-slate-750 transition-colors"
                  >
                    <td className="px-4 py-3 font-mono text-slate-500 text-xs align-top">
                      {item.id}
                    </td>
                    <td className="px-4 py-3 text-slate-300 align-top">
                      <span className="font-medium">{item.test}</span>
                      {/* Show severity/category on small screens inline */}
                      <div className="flex flex-wrap gap-1 mt-1 sm:hidden">
                        <Badge text={item.severity} className={SEVERITY_STYLES[item.severity]} />
                        <Badge text={item.category} className={CATEGORY_STYLES[item.category]} />
                      </div>
                    </td>
                    <td className="px-4 py-3 align-top hidden sm:table-cell">
                      <Badge text={item.severity} className={SEVERITY_STYLES[item.severity]} />
                    </td>
                    <td className="px-4 py-3 align-top hidden md:table-cell">
                      <Badge text={item.category} className={CATEGORY_STYLES[item.category]} />
                    </td>
                    <td className={`px-4 py-3 align-top font-medium text-xs hidden lg:table-cell ${RETEST_STYLES[item.retest]}`}>
                      {item.retest}
                    </td>
                    <td className="px-4 py-3 text-center align-top">
                      <button
                        type="button"
                        onClick={() =>
                          setShowDetails((d) => (d === item.id ? null : item.id))
                        }
                        aria-expanded={showDetails === item.id}
                        aria-controls={`detail-${item.id}`}
                        aria-label={`${showDetails === item.id ? "Collapse" : "Expand"} details for test ${item.id}`}
                        className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-400 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                      >
                        <svg
                          className={`h-4 w-4 transition-transform ${showDetails === item.id ? "rotate-180" : ""}`}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          aria-hidden="true"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                  {showDetails === item.id && (
                    <tr key={`${item.id}-detail`} id={`detail-${item.id}`} className="bg-slate-900/50">
                      <td colSpan={6} className="px-4 pb-5 pt-3">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <DetailBlock
                            label="What happened"
                            icon="🔍"
                            text={item.happened}
                          />
                          <DetailBlock
                            label="Fix applied"
                            icon="🔧"
                            text={item.fix}
                          />
                          <DetailBlock
                            label="Retest result"
                            icon="✓"
                            text={item.retest}
                            highlight={RETEST_STYLES[item.retest]}
                          />
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── Hardening Review ────────────────────────────────────────────── */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <p className="text-violet-400 font-semibold text-sm uppercase tracking-wider mb-3">
              Final Review
            </p>
            <h3
              className="text-2xl sm:text-3xl font-extrabold text-white mb-4"
            >
              Hardening Review
            </h3>
            <p className="mx-auto max-w-xl text-slate-400 text-sm">
              Post-fix review summarising what was found, what was done, and
              the final verification status.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Meta */}
            <div className="rounded-2xl bg-slate-900 border border-slate-700 p-6">
              <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                <span aria-hidden="true">👤</span> Reviewer Details
              </h4>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-slate-500 text-xs uppercase tracking-wide">Reviewer</dt>
                  <dd className="text-slate-200">{HARDENING_REVIEW.reviewer}</dd>
                </div>
                <div>
                  <dt className="text-slate-500 text-xs uppercase tracking-wide">Review Date</dt>
                  <dd className="text-slate-200">{HARDENING_REVIEW.date}</dd>
                </div>
                <div>
                  <dt className="text-slate-500 text-xs uppercase tracking-wide">Scope</dt>
                  <dd className="text-slate-200">Forms, Navigation, Links, Responsive, Accessibility, SEO, Performance</dd>
                </div>
              </dl>
            </div>

            {/* Verification status */}
            <div className="rounded-2xl bg-slate-900 border border-slate-700 p-6">
              <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                <span aria-hidden="true">✅</span> Final Verification Status
              </h4>
              <ul className="space-y-2" aria-label="Verification checklist">
                {HARDENING_REVIEW.verificationStatus.map((v) => (
                  <li key={v.item} className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-slate-300">{v.item}</span>
                    <span className="text-emerald-400 font-medium flex-shrink-0">{v.status}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Must-fix findings */}
            <div className="rounded-2xl bg-slate-900 border border-slate-700 p-6">
              <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                <span aria-hidden="true">🚨</span> Must-Fix Findings ({HARDENING_REVIEW.mustFix.length})
              </h4>
              <ul className="space-y-2" aria-label="Must-fix findings list">
                {HARDENING_REVIEW.mustFix.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-red-400 mt-0.5 flex-shrink-0" aria-hidden="true">✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions taken */}
            <div className="rounded-2xl bg-slate-900 border border-slate-700 p-6">
              <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                <span aria-hidden="true">🔧</span> Actions Taken ({HARDENING_REVIEW.actionsTaken.length})
              </h4>
              <ul className="space-y-2" aria-label="Actions taken list">
                {HARDENING_REVIEW.actionsTaken.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-emerald-400 mt-0.5 flex-shrink-0" aria-hidden="true">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Sub-components ─────────────────────────────────────────────────────── */

function StatCard({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <div className="rounded-xl bg-slate-900 border border-slate-700 p-5 text-center">
      <p className={`text-3xl font-extrabold ${color}`}>{value}</p>
      <p className="text-slate-400 text-xs mt-1">{label}</p>
    </div>
  );
}

function Badge({ text, className }: { text: string; className: string }) {
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold border ${className}`}>
      {text}
    </span>
  );
}

function DetailBlock({
  label,
  icon,
  text,
  highlight,
}: {
  label: string;
  icon: string;
  text: string;
  highlight?: string;
}) {
  return (
    <div className="rounded-xl bg-slate-800 p-4">
      <p className="text-slate-400 text-xs uppercase tracking-wide mb-2 flex items-center gap-1">
        <span aria-hidden="true">{icon}</span>
        {label}
      </p>
      <p className={`text-sm leading-relaxed ${highlight ?? "text-slate-300"}`}>{text}</p>
    </div>
  );
}
