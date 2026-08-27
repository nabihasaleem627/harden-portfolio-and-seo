import { useState, useCallback, useRef } from "react";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

type SubmitState = "idle" | "submitting" | "success" | "error";

const MAX_LENGTHS = {
  name: 100,
  email: 254,
  subject: 200,
  message: 2000,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};

  const name = data.name.trim();
  if (!name) {
    errors.name = "Name is required.";
  } else if (name.length < 2) {
    errors.name = "Name must be at least 2 characters.";
  } else if (name.length > MAX_LENGTHS.name) {
    errors.name = `Name must be ${MAX_LENGTHS.name} characters or fewer.`;
  }

  const email = data.email.trim();
  if (!email) {
    errors.email = "Email address is required.";
  } else if (!EMAIL_RE.test(email)) {
    errors.email = "Please enter a valid email address.";
  } else if (email.length > MAX_LENGTHS.email) {
    errors.email = "Email address is too long.";
  }

  const subject = data.subject.trim();
  if (!subject) {
    errors.subject = "Subject is required.";
  } else if (subject.length > MAX_LENGTHS.subject) {
    errors.subject = `Subject must be ${MAX_LENGTHS.subject} characters or fewer.`;
  }

  const message = data.message.trim();
  if (!message) {
    errors.message = "Message is required.";
  } else if (message.length < 10) {
    errors.message = "Message must be at least 10 characters.";
  } else if (message.length > MAX_LENGTHS.message) {
    errors.message = `Message must be ${MAX_LENGTHS.message} characters or fewer.`;
  }

  return errors;
}

const EMPTY_FORM: FormData = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const submitInProgress = useRef(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;

      // Enforce hard character cap at input level
      const maxLen = MAX_LENGTHS[name as keyof typeof MAX_LENGTHS];
      const capped = maxLen ? value.slice(0, maxLen) : value;

      setFormData((prev) => ({ ...prev, [name]: capped }));

      // Re-validate touched field inline
      setErrors((prev) => {
        const updated = validate({ ...formData, [name]: capped });
        return { ...prev, [name]: updated[name as keyof FormErrors] };
      });
    },
    [formData]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));
      const fieldErrors = validate(formData);
      setErrors((prev) => ({
        ...prev,
        [name]: fieldErrors[name as keyof FormErrors],
      }));
    },
    [formData]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // Guard against rapid double submission
      if (submitInProgress.current || submitState === "submitting") return;

      // Validate all fields
      const allErrors = validate(formData);
      setErrors(allErrors);
      setTouched({ name: true, email: true, subject: true, message: true });

      if (Object.keys(allErrors).length > 0) return;

      submitInProgress.current = true;
      setSubmitState("submitting");

      try {
        // Simulate async form submission (no real backend in this demo)
        await new Promise<void>((resolve) => setTimeout(resolve, 1400));
        setSubmitState("success");
        setFormData(EMPTY_FORM);
        setErrors({});
        setTouched({});
      } catch {
        setSubmitState("error");
      } finally {
        submitInProgress.current = false;
      }
    },
    [formData, submitState]
  );

  const handleReset = () => {
    setSubmitState("idle");
    setFormData(EMPTY_FORM);
    setErrors({});
    setTouched({});
  };

  const isSubmitting = submitState === "submitting";

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-24 bg-slate-900"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-violet-400 font-semibold text-sm uppercase tracking-wider mb-3">
            Get In Touch
          </p>
          <h2
            id="contact-heading"
            className="text-3xl sm:text-4xl font-extrabold text-white mb-4"
          >
            Let's Work Together
          </h2>
          <p className="mx-auto max-w-xl text-slate-400">
            Have a project in mind? Looking for a developer to join your team?
            I'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Info panel */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Contact Details</h3>
              <ul className="space-y-4" aria-label="Contact information">
                {[
                  {
                    icon: (
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    ),
                    label: "Email",
                    value: "hello@alexmorgan.dev",
                    href: "mailto:hello@alexmorgan.dev",
                  },
                  {
                    icon: (
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    ),
                    label: "Location",
                    value: "Bristol, UK (Remote-friendly)",
                    href: null,
                  },
                  {
                    icon: (
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                      </svg>
                    ),
                    label: "Response time",
                    value: "Usually within 24 hours",
                    href: null,
                  },
                ].map((item) => (
                  <li key={item.label} className="flex items-start gap-3">
                    <span className="mt-1 text-violet-400">{item.icon}</span>
                    <div>
                      <p className="text-slate-500 text-xs uppercase tracking-wide">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-slate-200 hover:text-violet-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded-sm"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-slate-200">{item.value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold text-lg mb-4">Follow Me</h3>
              <div className="flex gap-3">
                {[
                  {
                    href: "https://github.com/alexmorgandev",
                    label: "GitHub profile (opens in new tab)",
                    icon: (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
                      </svg>
                    ),
                  },
                  {
                    href: "https://linkedin.com/in/alexmorgandev",
                    label: "LinkedIn profile (opens in new tab)",
                    icon: (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    ),
                  },
                ].map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex items-center justify-center h-10 w-10 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 hover:border-slate-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl bg-slate-800 border border-slate-700 p-8">
              {submitState === "success" ? (
                <SuccessMessage onReset={handleReset} />
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  aria-label="Contact form"
                >
                  {submitState === "error" && (
                    <div
                      role="alert"
                      className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
                    >
                      <strong>Something went wrong.</strong> Please try again, or
                      email me directly at{" "}
                      <a
                        href="mailto:hello@alexmorgan.dev"
                        className="underline hover:text-red-300 transition-colors"
                      >
                        hello@alexmorgan.dev
                      </a>
                      .
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field
                      id="contact-name"
                      name="name"
                      label="Full Name"
                      type="text"
                      value={formData.name}
                      error={touched.name ? errors.name : undefined}
                      maxLength={MAX_LENGTHS.name}
                      autoComplete="name"
                      required
                      disabled={isSubmitting}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Jane Smith"
                    />
                    <Field
                      id="contact-email"
                      name="email"
                      label="Email Address"
                      type="email"
                      value={formData.email}
                      error={touched.email ? errors.email : undefined}
                      maxLength={MAX_LENGTHS.email}
                      autoComplete="email"
                      required
                      disabled={isSubmitting}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="jane@example.com"
                    />
                  </div>
                  <div className="mt-5">
                    <Field
                      id="contact-subject"
                      name="subject"
                      label="Subject"
                      type="text"
                      value={formData.subject}
                      error={touched.subject ? errors.subject : undefined}
                      maxLength={MAX_LENGTHS.subject}
                      autoComplete="off"
                      required
                      disabled={isSubmitting}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Project enquiry — React app"
                    />
                  </div>
                  <div className="mt-5">
                    <TextareaField
                      id="contact-message"
                      name="message"
                      label="Message"
                      value={formData.message}
                      error={touched.message ? errors.message : undefined}
                      maxLength={MAX_LENGTHS.message}
                      required
                      disabled={isSubmitting}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-4">
                    <p className="text-slate-500 text-xs">
                      * Required fields. No spam, ever.
                    </p>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      aria-disabled={isSubmitting}
                      className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800 shadow-md shadow-violet-900/30"
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="h-4 w-4 animate-spin"
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden="true"
                          >
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Sending…
                        </>
                      ) : (
                        <>
                          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <path d="M22 2 11 13" />
                            <path d="m22 2-7 20-4-9-9-4 20-7z" />
                          </svg>
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Field Components ───────────────────────────────────────────────────── */

interface FieldProps {
  id: string;
  name: string;
  label: string;
  type: string;
  value: string;
  error?: string;
  maxLength?: number;
  autoComplete?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

function Field({
  id,
  name,
  label,
  type,
  value,
  error,
  maxLength,
  autoComplete,
  required,
  disabled,
  placeholder,
  onChange,
  onBlur,
}: FieldProps) {
  const errorId = `${id}-error`;
  const hasError = Boolean(error);

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-1.5">
        {label}
        {required && (
          <span className="ml-1 text-violet-400" aria-hidden="true">
            *
          </span>
        )}
        {required && <span className="sr-only"> (required)</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        maxLength={maxLength}
        autoComplete={autoComplete}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        aria-required={required}
        aria-invalid={hasError}
        aria-describedby={hasError ? errorId : undefined}
        onChange={onChange}
        onBlur={onBlur}
        className={`w-full px-4 py-2.5 rounded-lg bg-slate-900 border text-slate-200 placeholder-slate-600 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500/50 disabled:opacity-50 disabled:cursor-not-allowed ${
          hasError
            ? "border-red-500 focus:border-red-500"
            : "border-slate-700 hover:border-slate-600 focus:border-violet-500"
        }`}
      />
      {hasError && (
        <p id={errorId} role="alert" className="mt-1.5 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

interface TextareaFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  error?: string;
  maxLength?: number;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
}

function TextareaField({
  id,
  name,
  label,
  value,
  error,
  maxLength,
  required,
  disabled,
  placeholder,
  onChange,
  onBlur,
}: TextareaFieldProps) {
  const errorId = `${id}-error`;
  const hasError = Boolean(error);

  return (
    <div>
      <div className="flex justify-between items-baseline mb-1.5">
        <label htmlFor={id} className="block text-sm font-medium text-slate-300">
          {label}
          {required && (
            <span className="ml-1 text-violet-400" aria-hidden="true">
              *
            </span>
          )}
          {required && <span className="sr-only"> (required)</span>}
        </label>
        {maxLength && (
          <span
            className={`text-xs tabular-nums ${
              value.length >= maxLength
                ? "text-red-400"
                : value.length >= maxLength * 0.9
                ? "text-amber-400"
                : "text-slate-500"
            }`}
            aria-live="polite"
            aria-label={`${value.length} of ${maxLength} characters used`}
          >
            {value.length}/{maxLength}
          </span>
        )}
      </div>
      <textarea
        id={id}
        name={name}
        value={value}
        maxLength={maxLength}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        rows={5}
        aria-required={required}
        aria-invalid={hasError}
        aria-describedby={hasError ? errorId : undefined}
        onChange={onChange}
        onBlur={onBlur}
        className={`w-full px-4 py-2.5 rounded-lg bg-slate-900 border text-slate-200 placeholder-slate-600 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500/50 resize-y min-h-[120px] max-h-[400px] disabled:opacity-50 disabled:cursor-not-allowed ${
          hasError
            ? "border-red-500 focus:border-red-500"
            : "border-slate-700 hover:border-slate-600 focus:border-violet-500"
        }`}
      />
      {hasError && (
        <p id={errorId} role="alert" className="mt-1.5 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

function SuccessMessage({ onReset }: { onReset: () => void }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center text-center py-12 gap-5"
    >
      <div
        className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 border-2 border-emerald-500/30"
        aria-hidden="true"
      >
        <svg
          className="h-8 w-8 text-emerald-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <path d="m9 11 3 3L22 4" />
        </svg>
      </div>
      <div>
        <h3 className="text-white font-bold text-xl mb-2">Message Sent!</h3>
        <p className="text-slate-400 text-sm max-w-xs">
          Thanks for reaching out. I'll get back to you within 24 hours.
        </p>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="mt-2 px-5 py-2.5 rounded-lg border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
      >
        Send Another Message
      </button>
    </div>
  );
}
