import MetricCard from "@/components/dashboard/MetricCard"
import StatusBadge from "@/components/dashboard/StatusBadge"
import { mockMetrics, mockMeetings, mockTasks } from "@/lib/data/mock"

const ACCENT = "#f59e0b"

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

const PRIORITY_STYLES: Record<string, string> = {
  high: "bg-rose-500/10 text-rose-300 border-rose-500/20",
  medium: "bg-amber-500/10 text-amber-300 border-amber-500/20",
  low: "bg-white/5 text-white/30 border-white/8",
}

const ASSIGNEE_ACCENT: Record<string, string> = {
  Jonathan: "#3b82f6",
  Kenneth: "#10b981",
  Alberto: "#8b5cf6",
}

export default function ExecutiveDashboard() {
  const upcomingMeetings = mockMeetings.slice(0, 3)

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <div className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-1.5" style={{ color: ACCENT }}>
          Company Overview
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Executive Dashboard</h1>
        <p className="text-sm text-white/45 mt-1">Real-time company health across revenue, pipeline, and operations.</p>
      </div>

      {/* Company Metrics */}
      <section className="mb-10">
        <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35 mb-4">Company Metrics</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard label="Monthly Recurring Revenue" value={`$${mockMetrics.mrr.toLocaleString()}`} delta="3 active contracts" accent={ACCENT} />
          <MetricCard label="One-Time Revenue" value={`$${mockMetrics.oneTimeRevenue.toLocaleString()}`} delta="This month" accent={ACCENT} />
          <MetricCard label="Pipeline Value" value={`$${mockMetrics.pipeline.toLocaleString()}`} delta="5 active deals" accent={ACCENT} />
          <MetricCard label="Active Clients" value={mockMetrics.activeClients} delta="All in good standing" accent={ACCENT} />
          <MetricCard label="Leads Generated" value={mockMetrics.leadsGenerated} delta="Last 30 days" />
          <MetricCard label="Meetings Scheduled" value={mockMetrics.meetingsScheduled} delta="This week" />
          <MetricCard label="Proposals Sent" value={mockMetrics.proposalsSent} delta="Awaiting response" />
          <MetricCard label="Projects In Progress" value={mockMetrics.projectsInProgress} delta="Across all clients" />
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Upcoming Meetings */}
        <section>
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35 mb-4">Upcoming Meetings</div>
          <div className="space-y-3">
            {upcomingMeetings.map((meeting) => (
              <div
                key={meeting.id}
                className="p-4 rounded-2xl border border-white/6 bg-white/[0.02] hover:border-white/10 transition-all"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold truncate">{meeting.title}</div>
                    <div className="text-xs text-white/40 mt-0.5">with {meeting.with}</div>
                  </div>
                  <span className={`text-[9px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded border flex-shrink-0 ${MEETING_TYPE_STYLES[meeting.type]}`}>
                    {MEETING_TYPE_LABELS[meeting.type]}
                  </span>
                </div>
                <div className="text-[10px] text-white/30">
                  {new Date(meeting.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                  {" · "}
                  {new Date(meeting.date).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* System Status */}
        <section>
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35 mb-4">Infrastructure Status</div>
          <div className="p-5 rounded-2xl border border-white/6 bg-white/[0.02] space-y-3">
            {[
              { name: "Claude API", status: "Operational", note: "claude-3-5-sonnet" },
              { name: "Supabase", status: "Operational", note: "as_leads + clients" },
              { name: "Vercel", status: "Operational", note: "Auto-deploy on main" },
              { name: "GitHub", status: "Operational", note: "CreatewithJon" },
            ].map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-sm text-white/70">{item.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wide">{item.status}</div>
                  <div className="text-[10px] text-white/25">{item.note}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Team Tasks */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">Team Tasks</div>
          <div className="text-[10px] text-white/25">{mockTasks.filter(t => t.status !== "done").length} open</div>
        </div>
        <div className="rounded-2xl border border-white/6 bg-white/[0.02] overflow-hidden">
          {mockTasks.map((task, i) => (
            <div
              key={task.id}
              className={`flex items-center gap-4 px-5 py-3.5 hover:bg-white/[0.02] transition-all ${
                i < mockTasks.length - 1 ? "border-b border-white/5" : ""
              }`}
            >
              <div className="flex-1 min-w-0">
                <div className="text-sm text-white/80">{task.title}</div>
                {task.dueDate && (
                  <div className="text-[10px] text-white/30 mt-0.5">
                    Due {new Date(task.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span
                  className="text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-md"
                  style={{
                    backgroundColor: `${ASSIGNEE_ACCENT[task.assignee] ?? "#ffffff"}15`,
                    color: ASSIGNEE_ACCENT[task.assignee] ?? "rgba(255,255,255,0.4)",
                  }}
                >
                  {task.assignee}
                </span>
                <span className={`text-[9px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded border ${PRIORITY_STYLES[task.priority]}`}>
                  {task.priority}
                </span>
                <StatusBadge status={task.status} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
