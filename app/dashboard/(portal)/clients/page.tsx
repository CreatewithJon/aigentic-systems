import Link from "next/link"
import StatusBadge from "@/components/dashboard/StatusBadge"
import { mockClients } from "@/lib/data/mock"

const STATUS_DOT: Record<string, string> = {
  live: "bg-emerald-400",
  in_progress: "bg-blue-400",
  needs_attention: "bg-rose-400",
  planned: "bg-white/20",
}

export default function ClientsPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35 mb-1.5">Operations</div>
        <h1 className="text-2xl font-bold tracking-tight">Clients</h1>
        <p className="text-sm text-white/45 mt-1">Active client accounts, systems, and contract overview.</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        <div className="p-5 rounded-2xl border border-white/6 bg-white/[0.02]">
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35 mb-2">Active Clients</div>
          <div className="text-2xl font-bold text-emerald-400">{mockClients.filter(c => c.status === "active").length}</div>
        </div>
        <div className="p-5 rounded-2xl border border-white/6 bg-white/[0.02]">
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35 mb-2">Monthly Recurring</div>
          <div className="text-2xl font-bold">${mockClients.reduce((s, c) => s + c.contractValue, 0).toLocaleString()}</div>
        </div>
        <div className="p-5 rounded-2xl border border-white/6 bg-white/[0.02]">
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35 mb-2">Total Systems Built</div>
          <div className="text-2xl font-bold">{mockClients.reduce((s, c) => s + c.systems.length, 0)}</div>
        </div>
      </div>

      {/* Client Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {mockClients.map((client) => (
          <Link
            key={client.id}
            href={`/dashboard/clients/${client.id}`}
            className="block p-6 rounded-2xl border border-white/6 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.03] transition-all group"
          >
            {/* Client Header */}
            <div className="flex items-start justify-between mb-1">
              <div>
                <div className="text-sm font-bold text-white/90 group-hover:text-white transition-colors">
                  {client.name}
                </div>
              </div>
              <StatusBadge status={client.status} />
            </div>
            <div className="text-[10px] text-white/35 mb-4">{client.industry}</div>

            {/* Contract Value */}
            {client.contractValue > 0 && (
              <div className="flex items-center gap-1 mb-4">
                <span className="text-lg font-bold text-white/80">${client.contractValue.toLocaleString()}</span>
                <span className="text-xs text-white/30">/mo</span>
              </div>
            )}

            {/* Systems */}
            <div className="space-y-1.5 mb-4">
              {client.systems.map((sys) => (
                <div key={sys.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${STATUS_DOT[sys.status] ?? "bg-white/20"}`} />
                    <span className="text-xs text-white/55">{sys.name}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact */}
            <div className="pt-3 border-t border-white/5 flex items-center justify-between">
              <div className="text-[10px] text-white/30">Contact: {client.primaryContact}</div>
              <div className="text-[10px] text-white/20 group-hover:text-white/40 transition-colors">View →</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
