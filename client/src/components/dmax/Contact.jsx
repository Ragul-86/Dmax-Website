import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Globe, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { validateContact, submitContact } from "@/lib/api/contact";

const initial = { name: "", email: "", company: "", budget: "", message: "" };

export function Contact() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [serverError, setServerError] = useState(null);

  const set = (k, v) => {
    setValues((p) => ({ ...p, [k]: v }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setServerError(null);

    const fieldErrors = validateContact(values);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setStatus("loading");
    try {
      await submitContact({
        name: values.name.trim(),
        email: values.email.trim(),
        company: values.company?.trim() || "",
        budget: values.budget?.trim() || "",
        message: values.message.trim(),
      });
      setStatus("success");
      setValues(initial);
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 lg:py-36 scroll-mt-24">
      <div className="container-narrow grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <p className="eyebrow">Book Your Strategy Session</p>
          <h2 className="mt-4 h2-section text-balance" style={{ fontSize: "clamp(1.875rem, 1.5rem + 1.8vw, 3rem)" }}>
            Ready to Discover What's <span className="text-accent">Limiting Your Growth?</span>
          </h2>
          <p className="mt-5 text-muted-foreground max-w-md">
            The businesses that grow consistently aren't always the ones working the hardest.
            They're the ones that understand exactly where to focus next. Let's identify your
            biggest growth bottleneck—and build a roadmap to overcome it.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 60, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
            className="mt-10 rounded-3xl glass p-8 shadow-card"
          >
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Founder & CEO</div>
            <div className="mt-1 text-2xl font-bold">Manoj</div>
            <ul className="mt-6 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="size-4 mt-0.5 text-accent" />
                <a href="https://wa.me/918667041373" className="hover:text-accent">
                  +91 86670 41373 · WhatsApp
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="size-4 mt-0.5 text-accent" />
                <a href="mailto:manoj@dmaxnow.com" className="hover:text-accent">
                  manoj@dmaxnow.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Globe className="size-4 mt-0.5 text-accent" />
                <a href="https://dmaxnow.com" className="hover:text-accent">
                  dmaxnow.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="size-4 mt-0.5 text-accent" />
                <span className="text-muted-foreground">
                  No. 6, 2nd Floor,
                  <br />
                  Angeripalayam Rd,
                  <br />
                  Tirupur – 641602, India
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-7 rounded-3xl border border-border bg-card p-8 md:p-10 shadow-card"
          noValidate
        >
          {status === "success" ? (
            <div className="min-h-[400px] flex flex-col items-center justify-center text-center">
              <div className="size-16 rounded-full bg-accent/15 grid place-items-center">
                <CheckCircle2 className="size-8 text-accent" />
              </div>
              <h3 className="mt-6 text-2xl font-bold">Enquiry sent</h3>
              <p className="mt-3 text-muted-foreground max-w-sm">
                Thanks — we received your message and will get back within one business day.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-foreground/15 px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:border-foreground/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
              >
                Send another
              </button>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-5">
                <Field label="Your Name" placeholder="Manoj R" value={values.name} onChange={(v) => set("name", v)} error={errors.name} />
                <Field label="Email" type="email" placeholder="you@company.com" value={values.email} onChange={(v) => set("email", v)} error={errors.email} />
                <Field label="Company" placeholder="Acme Inc." value={values.company ?? ""} onChange={(v) => set("company", v)} error={errors.company} />
                <Field label="Monthly Marketing Budget" placeholder="₹3L – ₹3Cr" value={values.budget ?? ""} onChange={(v) => set("budget", v)} error={errors.budget} />
              </div>
              <div className="mt-5">
                <label htmlFor="contact-message" className="text-xs uppercase tracking-widest text-muted-foreground">
                  Tell us about your goals
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={values.message}
                  onChange={(e) => set("message", e.target.value)}
                  placeholder="What does success look like in the next 12 months?"
                  aria-invalid={errors.message ? "true" : undefined}
                  aria-describedby={errors.message ? "contact-message-error" : undefined}
                  className="mt-2 w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground/60 focus:border-foreground focus:ring-0 outline-none transition-colors resize-none"
                />
                {errors.message && (
                  <p id="contact-message-error" className="mt-1.5 text-xs text-destructive">
                    {errors.message}
                  </p>
                )}
              </div>
              {serverError && <p className="mt-4 text-sm text-destructive">{serverError}</p>}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs text-muted-foreground">
                  We never share your data. Replies within 1 business day.
                </p>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="group pulse-glow btn-primary"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="size-4 animate-spin" /> Sending…
                    </>
                  ) : (
                    <>
                      Book Your Strategy Session
                      <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </motion.form>
      </div>
    </section>
  );
}

function Field({ label, type = "text", placeholder, value, onChange, error }) {
  const id = `contact-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`mt-2 w-full rounded-2xl border bg-background px-4 py-3 text-sm placeholder:text-muted-foreground/60 focus:ring-0 outline-none transition-colors ${
          error ? "border-destructive focus:border-destructive" : "border-input focus:border-foreground"
        }`}
      />
      {error && (
        <p id={errorId} className="mt-1.5 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
