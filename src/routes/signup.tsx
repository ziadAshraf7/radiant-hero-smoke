import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { GoldDivider } from "@/components/ui-bits";

export const Route = createFileRoute("/signup")({
  validateSearch: (search: Record<string, unknown>) => ({
    redirect: typeof search["redirect"] === "string" ? search["redirect"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Create Account — Deco Sur" },
      { name: "description", content: "Create your Deco Sur client account." },
      { property: "og:title", content: "Create Account — Deco Sur" },
      { property: "og:description", content: "Create your Deco Sur client account." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SignupPage,
});

const field =
  "w-full border-b border-border bg-transparent py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-accent";

function SignupPage() {
  const navigate = useNavigate();
  const { redirect: redirectTo } = Route.useSearch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);

  const safeRedirect =
    redirectTo && redirectTo.startsWith("/") && !redirectTo.startsWith("//")
      ? redirectTo
      : "/dashboard";

  async function handleSignup(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim()) return setError("Please enter your name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError("Please enter a valid email.");
    if (password.length < 6) return setError("Password must be at least 6 characters.");
    if (password !== confirm) return setError("Passwords do not match.");

    setBusy(true);
    const { data, error: err } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name.trim() } },
    });
    setBusy(false);
    if (err) {
      setError(err.message);
      return;
    }
    if (!data.session) {
      // Email confirmation is enabled — the user must confirm first.
      setCheckEmail(true);
      return;
    }
    navigate({ to: safeRedirect });
  }

  if (checkEmail) {
    return (
      <section className="flex min-h-screen items-center justify-center px-6 pt-28 pb-20">
        <div className="w-full max-w-md text-center">
          <p className="eyebrow">Almost there</p>
          <h1 className="mt-4 font-display text-5xl">Check your inbox.</h1>
          <GoldDivider className="mt-6 justify-center" />
          <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
            We sent a confirmation link to <span className="text-foreground">{email}</span>. Click
            it to activate your account, then sign in.
          </p>
          <Link to="/login" search={{ redirect: undefined }} className="btn-gold mt-10 inline-flex">
            Go to sign in
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="flex min-h-screen items-center justify-center px-6 pt-28 pb-20">
      <div className="w-full max-w-md">
        <p className="eyebrow text-center">Client Area</p>
        <h1 className="mt-4 text-center font-display text-5xl">Join Deco Sur.</h1>
        <GoldDivider className="mt-6 justify-center" />

        <form onSubmit={handleSignup} className="mt-10 flex flex-col gap-6">
          <input
            required
            placeholder="Full name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={field}
          />
          <input
            required
            type="email"
            placeholder="Email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={field}
          />
          <input
            required
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={field}
          />
          <input
            required
            type="password"
            placeholder="Confirm password"
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className={field}
          />

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button type="submit" disabled={busy} className="btn-gold justify-center disabled:opacity-60">
            {busy ? "Creating account…" : "Create account"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            to="/login"
            search={{ redirect: redirectTo }}
            className="text-accent underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
}
