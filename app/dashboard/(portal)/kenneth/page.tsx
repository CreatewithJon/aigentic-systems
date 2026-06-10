import MetricCard from "@/components/dashboard/MetricCard"
import StatusBadge from "@/components/dashboard/StatusBadge"
import { mockMetrics, mockDeals, mockClients, mockContent } from "@/lib/data/mock"
import type { DealStage } from "@/lib/types"

const ACCENT = "#10b981"

const PIPELINE_COLUMNS: { stage: DealStage; label: string }[] = [
  { stage: "new_lead", label: "New Lead" },
  { stage: "discovery", label: "Discovery" },
  { stage: "proposal", label: "Proposal" },
  { stage: "negotiation", label: "Negotiation" },
  { stage: "won", label: "Won" },
]

const STAGE_ACCENT: Record<DealStage, string> = {
  new_lead: "#3b82f6",
  discovery: "#f59e0b",
  proposal: "#8b5cf6",
  negotiation: "#f97316",
  won: "#10b981",
  lost: "#ef4444",
}

export default function KennethDashboard() {
  const wonDeals = mockDeals.filter((d) => d.stage === "won")
  const publishedContent = mockContent.filter((c) => c.status === "published")
  const totalPipeline = mockDeals.reduce((sum, d) => sum + d.value, 0)

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <div className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-1.5" style={{ color: ACCENT }}>
          Chief Business Officer
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Kenneth — CBO</h1>
        <p className="text-sm text-white/45 mt-1">Revenue, sales pipeline, partnerships, and client success.</p>
      </div>

      {/* Revenue Metrics */}
      <section className="mb-10">
        <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35 mb-4">Revenue Metrics</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard label="Monthly Recurring" value={`$${mockMetrics.mrr.toLocaleString()}`} delta="3 contracts" accent={ACCENT} />
          <MetricCard label="One-Time Revenue" value={`$${mockMetrics.oneTimeRevenue.toLocaleString()}`} delta="This month" accent={ACCENT} />
          <MetricCard label="Active Pipeline" value={`$${totalPipeline.toLocaleString()}`} delta={`${mockDeals.length} deals`} accent={ACCENT} />
          <MetricCard label="Deals Closed" value={wonDeals.length} delta="All time" accent={ACCENT} />
        </div>
      </section>

      {/* Sales Pipeline Kanban */}
      <section className="mb-10">
        <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35 mb-4">Sales Pipeline</div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {PIPELINE_COLUMNS.map((col) => {
            const deals = mockDeals.filter((d) => d.stage === col.stage)
            const colValue = deals.reduce((sum, d) => sum + d.value, 0)
            return (
              <div
                key={col.stage}
                className="flex-shrink-0 w-52 rounded-2xl border border-white/6 bg-white/[0.02] p-4"
              >
                <div className="flex items-center justify-between mb-1">
                  <div
                    className="text-[9px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-md"
                    style={{
                      backgroundColor: `${STAGE_ACCENT[col.stage]}15`,
                      color: STAGE_ACCENT[col.stage],
                    }}
                  >
                    {col.label}
                  </div>
                  <span className="text-[10px] text-white/25">{deals.length}</span>
                </div>
                {colValue > 0 && (
                  <div className="text-[10px] text-white/30 mb-3">${colValue.toLocaleString()}</div>
                )}
                <div className="space-y-2 mt-3">
                  {deals.map((deal) => (
                    <div
                      key={deal.id}
                      className="p-3 rounded-xl border border-white/5 bg-white/[0.03] hover:border-white/10 transition-all"
                    >
                      <div className="text-xs font-semibold text-white/85 mb-0.5 leading-tight">{deal.name}</div>
                      <div className="text-[10px] text-white/40 mb-2">{deal.company}</div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold" style={{ color: STAGE_ACCENT[col.stage] }}>
                          ${deal.value.toLocaleString()}
                        </span>
                        <span className="text-[9px] text-white/25">{deal.probability}%</span>
                      </div>
                      {deal.notes && (
                        <div className="text-[10px] text-white/30 mt-1.5 leading-relaxed line-clamp-2">{deal.notes}</div>
                      )}
                    </div>
                  ))}
                  {deals.length === 0 && (
                    <div className="text-xs text-white/20 text-center py-4">Empty</div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Partnership Center */}
        <section>
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35 mb-4">Partnership Center</div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Strategic Partners", count: 0, note: "Building pipeline" },
              { label: "Referral Sources", count: 2, note: "Active referrers" },
              { label: "Affiliates", count: 0, note: "Program launching" },
              { label: "Event Sponsors", count: 3, note: "Crypto Mondays LV" },
            ].map((item) => (
              <div key={item.label} className="p-4 rounded-2xl border border-white/6 bg-white/[0.02]">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30 mb-2">{item.label}</div>
                <div className="text-2xl font-bold mb-0.5" style={{ color: item.count > 0 ? ACCENT : "rgba(255,255,255,0.3)" }}>
                  {item.count}
                </div>
                <div className="text-[10px] text-white/25">{item.note}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Marketing */}
        <section>
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35 mb-4">Marketing</div>
          <div className="space-y-3">
            {[
              { channel: "LinkedIn", metric: "Active", detail: "Posts going out weekly", icon: "in" },
              { channel: "Email Outreach", metric: "Building", detail: "CRM outreach workflows in progress", icon: "✉" },
              { channel: "Content Published", metric: publishedContent.length.toString(), detail: `${mockContent.length} total pieces created`, icon: "◈" },
            ].map((item) => (
              <div key={item.channel} className="flex items-center gap-4 p-4 rounded-2xl border border-white/6 bg-white/[0.02]">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-xs font-bold text-white/40 flex-shrink-0">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-white/75">{item.channel}</div>
                  <div className="text-[10px] text-white/35">{item.detail}</div>
                </div>
                <div className="text-sm font-bold" style={{ color: ACCENT }}>{item.metric}</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Client Success */}
      <section>
        <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35 mb-4">Client Success</div>
        <div className="rounded-2xl border border-white/6 bg-white/[0.02] overflow-hidden">
          {mockClients.map((client, i) => (
            <div
              key={client.id}
              className={`flex items-center gap-4 px-5 py-4 hover:bg-white/[0.02] transition-all ${
                i < mockClients.length - 1 ? "border-b border-white/5" : ""
              }`}
            >
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-white/85">{client.name}</div>
                <div className="text-[10px] text-white/35 mt-0.5">{client.industry} · {client.primaryContact}</div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                {client.contractValue > 0 && (
                  <div className="text-sm font-bold" style={{ color: ACCENT }}>
                    ${client.contractValue.toLocaleString()}/mo
                  </div>
                )}
                <div className="text-[10px] text-white/30">
                  Renews {new Date(client.renewalDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                </div>
                <StatusBadge status={client.status} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
