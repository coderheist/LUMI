"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "submitting" | "sent" | "error";
type Errors = Partial<Record<"name" | "email" | "message", string>>;

const VOLUMES = [
  "Under 1,000 conversations a month",
  "1,000 – 5,000",
  "5,000 – 20,000",
  "More than 20,000",
];

/**
 * Template form: it validates properly and moves through real states, but has
 * no endpoint behind it. Point `submit` at your own handler to make it live.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const next: Errors = {};
    if (!name) next.name = "Tell us who you are.";
    if (!email) next.email = "We need an email to reply to.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) next.email = "That email does not look right.";
    if (message.length < 10) next.message = "A sentence or two about your store helps us reply usefully.";

    setErrors(next);
    if (Object.keys(next).length > 0) {
      setStatus("error");
      return;
    }

    setStatus("submitting");
    // Stands in for a real request.
    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus("sent");
  };

  if (status === "sent") {
    return (
      <div className="rounded-panel border border-line bg-paper-raised p-8 text-center">
        <span
          aria-hidden
          className="mx-auto grid h-11 w-11 place-items-center rounded-full border border-sage/30 bg-sage-tint text-sage"
        >
          <svg viewBox="0 0 14 14" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M3 7.4 5.6 10 11 4.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h2 className="t-h3 mt-5">Thanks — that reached us.</h2>
        <p className="t-small mx-auto mt-3 max-w-[38ch]">
          Someone from the team replies within one working day, usually with questions about your
          catalogue rather than a calendar link.
        </p>
        <Button variant="outline" size="sm" className="mt-6" onClick={() => setStatus("idle")}>
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="rounded-panel border border-line bg-paper-raised p-6 md:p-8">
      <div className="flex flex-col gap-5">
        <Field label="Your name" name="name" error={errors.name} autoComplete="name" />
        <Field
          label="Work email"
          name="email"
          type="email"
          error={errors.email}
          autoComplete="email"
        />
        <Field label="Store or brand" name="company" optional autoComplete="organization" />

        <div>
          <label htmlFor="volume" className="mb-2 block text-[0.88rem] font-medium">
            Support volume
          </label>
          <select
            id="volume"
            name="volume"
            defaultValue={VOLUMES[1]}
            className="h-11 w-full rounded-chip border border-line-strong bg-paper px-3 text-[0.92rem] transition-colors duration-200 hover:border-ink focus:border-ink"
          >
            {VOLUMES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="message" className="mb-2 block text-[0.88rem] font-medium">
            What are you trying to automate?
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            placeholder="We sell knitwear, and about a third of our tickets are sizing questions…"
            className={`w-full resize-y rounded-card border bg-paper px-3 py-2.5 text-[0.92rem] leading-relaxed transition-colors duration-200 placeholder:text-ink-faint hover:border-ink focus:border-ink ${
              errors.message ? "border-ochre" : "border-line-strong"
            }`}
          />
          {errors.message ? (
            <p id="message-error" className="mt-1.5 text-[0.8rem] text-ochre">
              {errors.message}
            </p>
          ) : null}
        </div>
      </div>

      <Button type="submit" size="lg" className="mt-7 w-full" disabled={status === "submitting"}>
        {status === "submitting" ? (
          <>
            <span
              aria-hidden
              className="h-3.5 w-3.5 animate-spin rounded-full border-[1.5px] border-paper/35 border-t-paper"
            />
            Sending
          </>
        ) : (
          "Send message"
        )}
      </Button>

      <p className="t-micro mt-4">
        This template form validates and shows its states, but is not wired to an endpoint.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
  optional = false,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
  optional?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 flex items-baseline justify-between text-[0.88rem] font-medium">
        {label}
        {optional ? <span className="text-[0.78rem] font-normal text-ink-faint">Optional</span> : null}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`h-11 w-full rounded-chip border bg-paper px-3 text-[0.92rem] transition-colors duration-200 placeholder:text-ink-faint hover:border-ink focus:border-ink ${
          error ? "border-ochre" : "border-line-strong"
        }`}
      />
      {error ? (
        <p id={`${name}-error`} className="mt-1.5 text-[0.8rem] text-ochre">
          {error}
        </p>
      ) : null}
    </div>
  );
}
