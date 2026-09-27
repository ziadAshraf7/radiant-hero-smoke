import type { ReactNode } from "react";

export const field =
  "w-full border-b border-border bg-transparent py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-accent";

export function StatCard({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="border border-border bg-surface p-6">
      <p className="label-caps text-muted-foreground">{label}</p>
      <p className="mt-3 font-display text-4xl text-accent">{value}</p>
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const tone =
    status === "published" || status === "active"
      ? "border-accent text-accent"
      : status === "pending"
        ? "border-border text-foreground"
        : "border-destructive text-destructive";
  return <span className={`label-caps inline-block border px-2 py-1 ${tone}`}>{status}</span>;
}

export function Table({ head, children }: { head: string[]; children: ReactNode }) {
  return (
    <div className="overflow-x-auto border border-border">
      <table className="w-full text-left text-sm">
        <thead className="bg-surface">
          <tr>
            {head.map((h) => (
              <th key={h} className="label-caps px-4 py-3 font-normal text-muted-foreground">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">{children}</tbody>
      </table>
    </div>
  );
}

export function TextBtn({
  onClick,
  children,
  danger,
}: {
  onClick: () => void;
  children: ReactNode;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`label-caps mr-3 transition-colors ${danger ? "text-destructive hover:opacity-70" : "text-muted-foreground hover:text-accent"}`}
    >
      {children}
    </button>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <label className="label-caps text-muted-foreground">{label}</label>
      {children}
    </div>
  );
}

export const fmtDate = (s: string) => new Date(s).toLocaleDateString();
