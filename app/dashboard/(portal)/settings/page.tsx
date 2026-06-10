import { founders } from "@/lib/data/founders"

export default function SettingsPage() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35 mb-1.5">System</div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-white/45 mt-1">Dashboard configuration, access, and system information.</p>
      </div>

      <div className="space-y-6">
        {/* Access */}
        <div className="p-6 rounded-2xl border border-white/6 bg-white/[0.02]">
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35 mb-5">Access Control</div>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-white/5">
              <div>
                <div className="text-sm font-medium text-white/70">Dashboard Password</div>
                <div className="text-xs text-white/30 mt-0.5">Shared access password for all founders</div>
              </div>
              <div className="font-mono text-sm text-amber-400/70 bg-amber-500/5 border border-amber-500/15 px-3 py-1.5 rounded-lg">
                aigentic2024
              </div>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <div className="text-sm font-medium text-white/70">Authentication Method</div>
                <div className="text-xs text-white/30 mt-0.5">Session-based (sessionStorage)</div>
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded border bg-white/5 text-white/35 border-white/10">
                Active
              </span>
            </div>
          </div>
        </div>

        {/* Founders */}
        <div className="p-6 rounded-2xl border border-white/6 bg-white/[0.02]">
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35 mb-5">Founders</div>
          <div className="space-y-3">
            {founders.map((f) => (
              <div key={f.slug} className="flex items-center gap-4 py-3 border-b border-white/5 last:border-0">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ backgroundColor: `${f.accentHex}15`, color: f.accentHex }}
                >
                  {f.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-white/75">{f.name}</div>
                  <div className="text-xs text-white/35">{f.title.split("&").pop()?.trim()}</div>
                </div>
                <div className="text-[10px] text-white/25 font-mono">{f.slug}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Integrations */}
        <div className="p-6 rounded-2xl border border-white/6 bg-white/[0.02]">
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35 mb-5">Integrations</div>
          <div className="space-y-3">
            {[
              { name: "Supabase (as_leads)", status: "connected", note: "Run schema.sql to initialize tables", color: "emerald" },
              { name: "Vercel", status: "connected", note: "Auto-deploy on push to main", color: "emerald" },
              { name: "Claude API", status: "not configured", note: "Add ANTHROPIC_API_KEY to env vars", color: "amber" },
            ].map((item) => (
              <div key={item.name} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                <div>
                  <div className="text-sm font-medium text-white/70">{item.name}</div>
                  <div className="text-xs text-white/30 mt-0.5">{item.note}</div>
                </div>
                <span
                  className={`text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded border ${
                    item.color === "emerald"
                      ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/20"
                      : "bg-amber-500/10 text-amber-300 border-amber-500/20"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* System Info */}
        <div className="p-6 rounded-2xl border border-white/6 bg-white/[0.02]">
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35 mb-5">System Info</div>
          <div className="space-y-2">
            {[
              { label: "Product", value: "Aigentic OS" },
              { label: "Version", value: "1.0.0" },
              { label: "Framework", value: "Next.js 16.2.7" },
              { label: "Styling", value: "Tailwind CSS v4" },
              { label: "Database", value: "Supabase (Postgres)" },
              { label: "Deployment", value: "Vercel" },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <span className="text-xs text-white/40">{row.label}</span>
                <span className="text-xs text-white/65 font-mono">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
