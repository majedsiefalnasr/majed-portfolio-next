"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";

type Status = "idle" | "submitting" | "done";

/**
 * Email capture ("Join the List"). Client component for form state.
 * No backend yet — submit is optimistic; wire to a real endpoint later.
 */
export function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || status !== "idle") return;
    setStatus("submitting");
    // Placeholder: simulate request until a real endpoint exists.
    await new Promise((r) => setTimeout(r, 600));
    setStatus("done");
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-h2 font-semibold text-title">📩 Join the List</h2>
      {status === "done" ? (
        <p className="flex items-center gap-2 text-lead text-body">
          <Check className="size-5 text-title" aria-hidden />
          Thanks — you&apos;re on the list.
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-xl items-center gap-2 rounded-pill bg-surface p-2 ring-1 ring-ink/10 focus-within:ring-ink/30"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="min-w-0 flex-1 bg-transparent px-4 text-body outline-none placeholder:text-subtle"
          />
          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex h-[50px] items-center gap-2 rounded-pill bg-ink px-6 text-sm font-medium text-paper transition-colors hover:bg-ink/90 disabled:opacity-60"
          >
            {status === "submitting" ? "Joining…" : "Subscribe"}
            <ArrowRight className="size-4" aria-hidden />
          </button>
        </form>
      )}
    </div>
  );
}
