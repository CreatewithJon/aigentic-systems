import { notFound } from "next/navigation"
import Link from "next/link"
import StatusBadge from "@/components/dashboard/StatusBadge"
import { mockClients } from "@/lib/data/mock"

const STATUS_DOT: Record<string, string> = {
  live: "bg-emerald-400",
  in_progress: "bg-blue-400",
  needs_attention: "bg-rose-400",
  planned: "bg-white/20",
}

export default async function ClientPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  const client = mockClients.find((c) => c.id === id)
  if (!client) notFound()

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[10px] text-white/30 mb-8">
        <Link href="/dashboard/clients" className="hover:text-white/60 transition-colors">Clients</Link>
        <span>/</span>
        <span className="text-white/50">{client.name}</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between mb-10">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35 mb-1.5">{client.industry}</div>
          <h1 className="text-2xl font-bold tracking-tight">{client.name}</h1>
          <p className="text-sm text-white/45 mt-1">{client.email}</p>
        </div>
        <div className="flex items-center gap-3">
          {client.website && (
            <a
              href={client.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-white/30 hover:text-white/60 transition-colors border border-white/8 rounded-lg px-3 py-2"
            >
              Visit Site ↗
            </a>
          )}
          <StatusBadge status={client.status} size="md" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Company Info */}
        <div className="p-5 rounded-2xl border border-white/6 bg-white/[0.02]">
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35 mb-4">Company Info</div>
          <div className="space-y-3">
            {[
              { label: "Primary Contact", value: client.primaryContact },
              { label: "Email", value: client.email },
              { label: "Industry", value: client.industry },
              {
                label: "Contract Value",
                value: client.contractValue > 0 ? `$${client.contractValue.toLocaleString()}/mo` : "Internal",
              },
              {
                label: "Renewal Date",
                value: new Date(client.renewalDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
              },
            ].map((row) => (
              <div key={row.label}>
                <div className="text-[10px] text-white/30 uppercase tracking-wide mb-0.5">{row.label}</div>
                <div className="text-sm text-white/70">{row.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="p-5 rounded-2xl border border-white/6 bg-white/[0.02]">
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35 mb-4">Performance</div>
          <div className="space-y-4">
            <div>
              <div className="text-[10px] text-white/30 uppercase tracking-wide mb-1">Leads Generated</div>
              <div className="text-2xl font-bold text-blue-400">{client.metrics.leadsGenerated}</div>
            </div>
            <div>
              <div className="text-[10px] text-white/30 uppercase tracking-wide mb-1">Appointments Booked</div>
              <div className="text-2xl font-bold text-violet-400">{client.metrics.appointmentsBooked}</div>
            </div>
            <div>
              <div className="text-[10px] text-white/30 uppercase tracking-wide mb-1">Revenue Attributed</div>
              <div className="text-2xl font-bold text-emerald-400">
                {client.metrics.revenueAttributed > 0
                  ? `$${client.metrics.revenueAttributed.toLocaleString()}`
                  : "—"}
              </div>
            </div>
          </div>
        </div>

        {/* Systems Status */}
        <div className="p-5 rounded-2xl border border-white/6 bg-white/[0.02]">
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35 mb-4">Systems Status</div>
          <div className="space-y-3">
            {client.systems.map((sys) => (
              <div key={sys.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${STATUS_DOT[sys.status] ?? "bg-white/20"}`} />
                  <span className="text-sm text-white/65">{sys.name}</span>
                </div>
                <StatusBadge status={sys.status} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Placeholder sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { title: "Documents & Contracts", desc: "SOWs, contracts, and signed agreements." },
          { title: "SOPs & Playbooks", desc: "Standard operating procedures for this client." },
          { title: "Proposals", desc: "Sent proposals and pricing history." },
          { title: "Support & Notes", desc: "Issue log, support notes, and internal context." },
        ].map((section) => (
          <div key={section.title} className="p-5 rounded-2xl border border-white/6 bg-white/[0.015]">
            <div className="text-sm font-semibold text-white/50 mb-1">{section.title}</div>
            <div className="text-xs text-white/25">{section.desc}</div>
            <div className="mt-4 text-[10px] font-semibold uppercase tracking-wide text-white/15 border border-white/6 rounded-lg px-3 py-2 w-fit">
              Coming soon
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
