import MetricCard from "@/components/dashboard/MetricCard"
import StatusBadge from "@/components/dashboard/StatusBadge"
import { mockMetrics, mockMeetings, mockDeals } from "@/lib/data/mock"

const ACCENT = "#8b5cf6"

const MEETING_TYPE_STYLES: Record<string, string> = {
  discovery: "bg-amber-500/10 text-amber-300 border-amber-500/20",
  demo: "bg-violet-500/10 text-violet-300 border-violet-500/20",
  follow_up: "bg-blue-500/10 text-blue-300 border-blue-500/20",
  internal: "bg-white/5 text-white/35 border-white/10",
  client_checkin: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
}

const MEETING_TYPE_LABELS: Record<string, string> = {
  discovery: "Discovery",
  demo: "Demo",
  follow_up: "Follow Up",
  internal: "Internal",
  client_checkin: "Client Check-in",
}

const INDUSTRY_ICONS: Record<string, string> = {
  "Real Estate": "🏠",
  "Insurance": "🛡",
  "Automotive": "🚗",
  "Healthcare": "⚕",
  "Education": "📚",
  "Local Services": "🔧",
}

type IndustryGroup = {
  industry: string
  count: number
  value: number
}

export default function AlbertoDashboard() {
  const totalRevenue = mockMetrics.mrr + mockMetrics.oneTimeRevenue

  // Group deals by industry (approximating from deal names)
  const industryData: IndustryGroup[] = [
    { industry: "Real Estate", count: mockDeals.filter(d => d.name.toLowerCase().includes("real estate") || d.company.toLowerCase().includes("realty")).length, value: mockDeals.filter(d => d.name.toLowerCase().includes("real estate") || d.company.toLowerCase().includes("realty")).reduce((s, d) => s + d.value, 0) },
    { industry: "Insurance", count: mockDeals.filter(d => d.company.toLowerCase().includes("insurance")).length, value: mockDeals.filter(d => d.company.toLowerCase().includes("insurance")).reduce((s, d) => s + d.value, 0) },
    { industry: "Healthcare", count: mockDeals.filter(d => d.company.toLowerCase().includes("aesthetics") || d.company.toLowerCase().includes("med spa")).length, value: mockDeals.filter(d => d.company.toLowerCase().includes("aesthetics") || d.company.toLowerCase().includes("spa")).reduce((s, d) => s + d.value, 0) },
    { industry: "Local Services", count: mockDeals.filter(d => d.company.toLowerCase().includes("solar") || d.company.toLowerCase().includes("castillo")).length, value: mockDeals.filter(d => d.company.toLowerCase().includes("solar") || d.company.toLowerCase().includes("castillo")).reduce((s, d) => s + d.value, 0) },
    { industry: "Automotive", count: 0, value: 0 },
    { industry: "Education", count: 0, value: 0 },
  ]

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <div className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-1.5" style={{ color: ACCENT }}>
          Chief Executive Officer
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Alberto — CEO</h1>
        <p className="text-sm text-white/45 mt-1">Company vision, deal discovery, business development, and executive oversight.</p>
      </div>

      {/* Company Health */}
      <section className="mb-10">
        <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35 mb-4">Company Health</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard label="Total Revenue" value={`$${totalRevenue.toLocaleString()}`} delta="MRR + one-time" accent={ACCENT} />
          <MetricCard label="Pipeline Value" value={`$${mockMetrics.pipeline.toLocaleString()}`} delta="Active opportunities" accent={ACCENT} />
          <MetricCard label="Active Clients" value={mockMetrics.activeClients} delta="All healthy" accent={ACCENT} />
          <MetricCard label="Projects Running" value={mockMetrics.projectsInProgress} delta="Across clients" accent={ACCENT} />
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Discovery Pipeline */}
        <section>
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35 mb-4">Discovery Pipeline</div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Scheduled", items: mockMeetings.filter((m) => m.type === "discovery"), accent: "#f59e0b" },
              { label: "Follow Up Needed", items: mockMeetings.filter((m) => m.type === "follow_up"), accent: ACCENT },
              { label: "Proposal Ready", items: mockDeals.filter((d) => d.stage === "proposal"), accent: "#3b82f6" },
              { label: "In Negotiation", items: mockDeals.filter((d) => d.stage === "negotiation"), accent: "#f97316" },
            ].map((col) => (
              <div key={col.label} className="p-4 rounded-2xl border border-white/6 bg-white/[0.02]">
                <div
                  className="text-[9px] font-semibold uppercase tracking-[0.15em] mb-2"
                  style={{ color: col.accent }}
                >
                  {col.label}
                </div>
                <div className="text-2xl font-bold mb-0.5" style={{ color: col.items.length > 0 ? col.accent : "rgba(255,255,255,0.2)" }}>
                  {col.items.length}
                </div>
                <div className="space-y-1 mt-2">
                  {col.items.slice(0, 2).map((item) => (
                    <div key={item.id} className="text-[10px] text-white/35 truncate">{"title" in item ? item.title : item.name}</div>
                  ))}
                  {col.items.length > 2 && (
                    <div className="text-[10px] text-white/20">+{col.items.length - 2} more</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming Meetings */}
        <section>
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35 mb-4">Upcoming Meetings</div>
          <div className="space-y-2">
            {mockMeetings.map((meeting) => (
              <div
                key={meeting.id}
                className="flex items-center gap-3 p-3.5 rounded-xl border border-white/6 bg-white/[0.02] hover:border-white/10 transition-all"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-white/80 truncate">{meeting.title}</div>
                  <div className="text-[10px] text-white/35 mt-0.5">
                    {new Date(meeting.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })} · {meeting.with}
                  </div>
                </div>
                <span className={`text-[9px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded border flex-shrink-0 ${MEETING_TYPE_STYLES[meeting.type]}`}>
                  {MEETING_TYPE_LABELS[meeting.type]}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Opportunity Board by Industry */}
      <section className="mb-8">
        <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35 mb-4">Opportunity Board — By Industry</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {industryData.map((ind) => (
            <div
              key={ind.industry}
              className="p-4 rounded-2xl border border-white/6 bg-white/[0.02] hover:border-white/10 transition-all"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-base">{INDUSTRY_ICONS[ind.industry] ?? "◆"}</span>
                <span className="text-xs font-semibold text-white/70">{ind.industry}</span>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-xl font-bold" style={{ color: ind.count > 0 ? ACCENT : "rgba(255,255,255,0.2)" }}>
                    {ind.count}
                  </div>
                  <div className="text-[10px] text-white/30">{ind.count === 1 ? "deal" : "deals"}</div>
                </div>
                {ind.value > 0 && (
                  <div className="text-sm font-bold text-white/50">${ind.value.toLocaleString()}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Workflow Discovery — Active Deals */}
      <section>
        <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35 mb-4">Active Deal Workflow</div>
        <div className="space-y-3">
          {mockDeals.map((deal) => (
            <div
              key={deal.id}
              className="p-5 rounded-2xl border border-white/6 bg-white/[0.02] hover:border-white/10 transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-sm font-semibold">{deal.name}</span>
                    <span className="text-xs text-white/40">{deal.company}</span>
                  </div>
                  {deal.notes && <p className="text-xs text-white/50 leading-relaxed">{deal.notes}</p>}
                </div>
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <StatusBadge status={deal.stage} />
                  <div className="text-sm font-bold" style={{ color: ACCENT }}>
                    ${deal.value.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-white/30">
                    {deal.probability}% · Close {new Date(deal.closeDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
