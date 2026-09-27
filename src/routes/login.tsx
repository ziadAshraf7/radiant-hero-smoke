import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { GoldDivider } from "@/components/ui-bits";

export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>) => ({
    redirect: typeof search["redirect"] === "string" ? search["redirect"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Sign In — Deco Sur" },
      { name: "description", content: "Sign in to your Deco Sur client account." },
      { property: "og:title", content: "Sign In — Deco Sur" },
      { property: "og:description", content: "Sign in to your Deco Sur client account." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LoginPage,
});

const field =
  "w-full border-b border-border bg-transparent py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-accent";

function LoginPage() {
  const navigate = useNavigate();
  const { redirect: redirectTo } = Route.useSearch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const safeRedirect =
    redirectTo && redirectTo.startsWith("/") && !redirectTo.startsWith("//")
      ? redirectTo
      : "/dashboard";

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (err) {
      setError(err.message);
      return;
    }
    if (!remember) {
      // Session persistence is handled by the client; "remember me" off means
      // we clear the stored session when the tab closes.
      window.addEventListener("beforeunload", () => {
        void supabase.auth.signOut({ scope: "local" });
      });
    }
    navigate({ to: safeRedirect });
  }

  async function handleForgotPassword() {
    setError(null);
    setNotice(null);
    if (!email) {
      setError("Enter your email above first, then click “Forgot password”.");
      return;
    }
    setBusy(true);
    const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    });
    setBusy(false);
    if (err) {
      setError(err.message);
      return;
    }
    setNotice("If an account exists for that email, a reset link is on its way.");
  }

  return (
    <section className="flex min-h-screen items-center justify-center px-6 pt-28 pb-20">
      <div className="w-full max-w-md">
        <p className="eyebrow text-center">Client Area</p>
        <h1 className="mt-4 text-center font-display text-5xl">Welcome back.</h1>
        <GoldDivider className="mt-6 justify-center" />

        <form onSubmit={handleLogin} className="mt-10 flex flex-col gap-6">
          <input
            required
            type="email"
            autoComplete="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={field}
          />
          <input
            required
            type="password"
            autoComplete="current-password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={field}
          />

          <div className="flex items-center justify-between text-sm">
            <label className="flex cursor-pointer items-center gap-2 text-muted-foreground">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="accent-[var(--accent)]"
              />
              Remember me
            </label>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-muted-foreground underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}
          {notice && <p className="text-sm text-accent">{notice}</p>}

          <button type="submit" disabled={busy} className="btn-gold justify-center disabled:opacity-60">
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          New to Deco Sur?{" "}
          <Link
            to="/signup"
            search={{ redirect: redirectTo }}
            className="text-accent underline-offset-4 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </section>
  );
}
