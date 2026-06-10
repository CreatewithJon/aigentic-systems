"use client"

import { useEffect, useState, useCallback } from "react"
import StatusBadge from "@/components/dashboard/StatusBadge"
import { mockProjects, mockClients } from "@/lib/data/mock"

const ACCENT = "#3b82f6"

type Lead = {
  id: string
  name: string
  email: string
  business_name?: string
  message?: string
  notes?: string
  status: "new" | "contacted" | "qualified" | "closed"
  source: "website_form" | "manual"
  created_at: string
}

const STATUS_STYLES: Record<Lead["status"], string> = {
  new: "bg-blue-500/10 text-blue-300 border-blue-500/20",
  contacted: "bg-amber-500/10 text-amber-300 border-amber-500/20",
  qualified: "bg-violet-500/10 text-violet-300 border-violet-500/20",
  closed: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
}

const SOURCE_STYLES: Record<Lead["source"], string> = {
  website_form: "bg-blue-500/8 text-blue-400/70 border-blue-500/15",
  manual: "bg-white/5 text-white/30 border-white/8",
}

const SOURCE_LABELS: Record<Lead["source"], string> = {
  website_form: "Website",
  manual: "Manual",
}

const STATUSES: Lead["status"][] = ["new", "contacted", "qualified", "closed"]
const EMPTY_FORM = { name: "", email: "", business_name: "", message: "", notes: "" }

export default function JonathanDashboard() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<Lead["status"] | "all">("all")
  const [activeLeadTab, setActiveLeadTab] = useState<"leads" | "pipeline">("leads")
  const [showAdd, setShowAdd] = useState(false)
  const [addForm, setAddForm] = useState(EMPTY_FORM)
  const [addLoading, setAddLoading] = useState(false)
  const [addError, setAddError] = useState("")
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [notesDraft, setNotesDraft] = useState<Record<string, string>>({})
  const [savingNotes, setSavingNotes] = useState<string | null>(null)

  const fetchLeads = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/leads")
      if (res.ok) setLeads(await res.json())
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchLeads()
  }, [fetchLeads])

  async function updateStatus(id: string, status: Lead["status"]) {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)))
    await fetch("/api/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    })
  }

  async function saveNotes(id: string) {
    setSavingNotes(id)
    const notes = notesDraft[id] ?? leads.find((l) => l.id === id)?.notes ?? ""
    await fetch("/api/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, notes }),
    })
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, notes } : l)))
    setSavingNotes(null)
  }

  async function deleteLead(id: string) {
    if (!confirm("Remove this lead?")) return
    setLeads((prev) => prev.filter((l) => l.id !== id))
    await fetch(`/api/leads?id=${id}`, { method: "DELETE" })
  }

  async function handleAddLead(e: React.FormEvent) {
    e.preventDefault()
    setAddError("")
    setAddLoading(true)
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...addForm, source: "manual" }),
      })
      if (!res.ok) throw new Error("Failed")
      setShowAdd(false)
      setAddForm(EMPTY_FORM)
      await fetchLeads()
    } catch {
      setAddError("Something went wrong. Please try again.")
    } finally {
      setAddLoading(false)
    }
  }

  const filtered = statusFilter === "all" ? leads : leads.filter((l) => l.status === statusFilter)

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-10 flex items-start justify-between">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-1.5" style={{ color: ACCENT }}>
            Chief AI Officer
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Jonathan — CAO</h1>
          <p className="text-sm text-white/45 mt-1">AI architecture, client systems, infrastructure, and lead CRM.</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white font-semibold text-xs hover:opacity-90 transition-opacity"
          style={{ background: "linear-gradient(135deg, #3b82f6, #6366f1)" }}
        >
          <span className="text-base leading-none">+</span> Add Lead
        </button>
      </div>

      {/* Active Builds */}
      <section className="mb-10">
        <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35 mb-4">Active Builds</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {mockProjects.map((project) => (
            <div
              key={project.id}
              className="p-4 rounded-2xl border border-white/6 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.03] transition-all"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="text-sm font-semibold text-white/85">{project.name}</div>
                <StatusBadge status={project.status} />
              </div>
              <div className="text-[10px] text-white/35 mb-1">{project.clientName}</div>
              <div className="text-xs text-white/50 leading-relaxed">{project.description}</div>
              {project.dueDate && (
                <div className="text-[10px] text-white/25 mt-2">
                  Due {new Date(project.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Client Systems Status */}
      <section className="mb-10">
        <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35 mb-4">Client Systems Status</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockClients.map((client) => (
            <div
              key={client.id}
              className="p-5 rounded-2xl border border-white/6 bg-white/[0.02] hover:border-white/10 transition-all"
            >
              <div className="text-sm font-semibold mb-0.5">{client.name}</div>
              <div className="text-[10px] text-white/35 mb-4">{client.industry}</div>
              <div className="space-y-2">
                {client.systems.map((sys) => (
                  <div key={sys.name} className="flex items-center justify-between">
                    <span className="text-xs text-white/55">{sys.name}</span>
                    <StatusBadge status={sys.status} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Infrastructure Links */}
      <section className="mb-10">
        <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35 mb-4">Infrastructure</div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { name: "GitHub", url: "https://github.com/CreatewithJon", desc: "CreatewithJon", icon: "⌥" },
            { name: "Vercel", url: "https://vercel.com", desc: "Deployments & domains", icon: "▲" },
            { name: "Supabase", url: "https://supabase.com", desc: "Database & auth", icon: "⬡" },
          ].map((item) => (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-2xl border border-white/6 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.03] transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-sm text-white/40 group-hover:text-white/70 transition-colors flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <div className="text-sm font-medium text-white/75 group-hover:text-white transition-colors">{item.name}</div>
                <div className="text-[10px] text-white/30">{item.desc}</div>
              </div>
              <div className="ml-auto text-white/20 group-hover:text-white/50 transition-colors text-xs">↗</div>
            </a>
          ))}
        </div>
      </section>

      {/* Product Roadmap */}
      <section className="mb-10">
        <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35 mb-4">Product Roadmap</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              sprint: "Current Sprint",
              accent: ACCENT,
              items: ["Finish BMR lead engine API", "Deploy Aigentic OS v1", "Aigentic Knowledge Base scaffold"],
            },
            {
              sprint: "Next Sprint",
              accent: "rgba(255,255,255,0.4)",
              items: ["BMR AI Assistant — Phase 1", "Aigentic public website v2", "Client portal template"],
            },
            {
              sprint: "Backlog",
              accent: "rgba(255,255,255,0.2)",
              items: ["CRM automation workflows", "Email notification system", "Multi-tenant dashboard template"],
            },
          ].map((col) => (
            <div key={col.sprint} className="p-4 rounded-2xl border border-white/6 bg-white/[0.02]">
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: col.accent }}>
                {col.sprint}
              </div>
              <div className="space-y-2">
                {col.items.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-white/20 flex-shrink-0" />
                    <span className="text-xs text-white/55">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lead CRM */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">Lead CRM</div>
          <div className="text-[10px] text-white/25">{leads.length} total leads</div>
        </div>

        {/* Tabs + Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
          <div className="flex gap-1 p-1 bg-white/3 rounded-xl border border-white/5 w-fit">
            {(["leads", "pipeline"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveLeadTab(tab)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wide transition-all ${
                  activeLeadTab === tab ? "bg-white/8 text-white" : "text-white/35 hover:text-white/60"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          {activeLeadTab === "leads" && (
            <div className="flex gap-1 p-1 bg-white/3 rounded-xl border border-white/5 w-fit">
              {(["all", ...STATUSES] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold uppercase tracking-wide transition-all ${
                    statusFilter === s ? "bg-white/8 text-white" : "text-white/30 hover:text-white/55"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Leads List */}
        {activeLeadTab === "leads" && (
          <div className="space-y-3">
            {loading && <div className="text-sm text-white/30 text-center py-12">Loading leads…</div>}
            {!loading && filtered.length === 0 && (
              <div className="text-sm text-white/25 text-center py-12">No leads yet.</div>
            )}
            {!loading && filtered.map((lead) => (
              <div key={lead.id} className="rounded-2xl border border-white/6 bg-white/[0.02] hover:border-white/10 transition-colors overflow-hidden">
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-sm font-semibold">{lead.name}</span>
                        {lead.business_name && <span className="text-xs text-white/35">{lead.business_name}</span>}
                        <span className={`text-[9px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded border ${SOURCE_STYLES[lead.source]}`}>
                          {SOURCE_LABELS[lead.source]}
                        </span>
                      </div>
                      <div className="text-xs text-white/40 mb-3">{lead.email}</div>
                      {lead.message && <p className="text-xs text-white/50 leading-relaxed line-clamp-2">{lead.message}</p>}
                    </div>
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <select
                        value={lead.status}
                        onChange={(e) => updateStatus(lead.id, e.target.value as Lead["status"])}
                        className={`text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-md border cursor-pointer bg-transparent ${STATUS_STYLES[lead.status]}`}
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s} className="bg-[#0d1220] text-white normal-case">{s}</option>
                        ))}
                      </select>
                      <span className="text-[10px] text-white/25">{new Date(lead.created_at).toLocaleDateString()}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setExpandedId(expandedId === lead.id ? null : lead.id)}
                          className="text-[10px] text-white/25 hover:text-white/55 transition-colors"
                        >
                          {expandedId === lead.id ? "Hide notes" : "Notes"}
                        </button>
                        <button
                          onClick={() => deleteLead(lead.id)}
                          className="text-[10px] text-white/20 hover:text-rose-400 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {expandedId === lead.id && (
                  <div className="border-t border-white/5 px-5 py-4 bg-white/[0.015]">
                    <div className="text-[10px] font-semibold uppercase tracking-wide text-white/30 mb-2">Notes</div>
                    <textarea
                      rows={3}
                      placeholder="Add notes, follow-up reminders, context…"
                      value={notesDraft[lead.id] ?? lead.notes ?? ""}
                      onChange={(e) => setNotesDraft((p) => ({ ...p, [lead.id]: e.target.value }))}
                      className="w-full bg-white/5 border border-white/8 rounded-lg px-3 py-2.5 text-xs text-white/70 placeholder-white/20 focus:outline-none focus:border-blue-500/40 resize-none"
                    />
                    <button
                      onClick={() => saveNotes(lead.id)}
                      disabled={savingNotes === lead.id}
                      className="mt-2 text-[10px] font-semibold uppercase tracking-wide hover:opacity-80 transition-opacity disabled:opacity-40"
                      style={{ color: ACCENT }}
                    >
                      {savingNotes === lead.id ? "Saving…" : "Save Notes"}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Pipeline View */}
        {activeLeadTab === "pipeline" && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {STATUSES.map((status) => {
              const col = leads.filter((l) => l.status === status)
              return (
                <div key={status} className="rounded-2xl border border-white/6 bg-white/[0.02] p-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-md border ${STATUS_STYLES[status]}`}>
                      {status}
                    </span>
                    <span className="text-xs text-white/30">{col.length}</span>
                  </div>
                  <div className="space-y-2">
                    {col.map((lead) => (
                      <div key={lead.id} className="p-3 rounded-xl border border-white/5 bg-white/3">
                        <div className="text-xs font-medium mb-0.5">{lead.name}</div>
                        <div className="text-[10px] text-white/35">{lead.business_name || lead.email}</div>
                      </div>
                    ))}
                    {col.length === 0 && <div className="text-xs text-white/20 text-center py-4">Empty</div>}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* Add Lead Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0d1220] p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base font-bold">Add Lead</h2>
              <button onClick={() => { setShowAdd(false); setAddForm(EMPTY_FORM); setAddError("") }} className="text-white/30 hover:text-white/60 transition-colors text-xl leading-none">×</button>
            </div>
            <form onSubmit={handleAddLead} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wide text-white/40 mb-1.5">Name *</label>
                  <input required type="text" value={addForm.name} onChange={(e) => setAddForm((p) => ({ ...p, name: e.target.value }))} placeholder="Full name" className="w-full bg-white/5 border border-white/8 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50" />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wide text-white/40 mb-1.5">Email *</label>
                  <input required type="email" value={addForm.email} onChange={(e) => setAddForm((p) => ({ ...p, email: e.target.value }))} placeholder="email@company.com" className="w-full bg-white/5 border border-white/8 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wide text-white/40 mb-1.5">Business Name</label>
                <input type="text" value={addForm.business_name} onChange={(e) => setAddForm((p) => ({ ...p, business_name: e.target.value }))} placeholder="Company" className="w-full bg-white/5 border border-white/8 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50" />
              </div>
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wide text-white/40 mb-1.5">Message / Context</label>
                <textarea rows={3} value={addForm.message} onChange={(e) => setAddForm((p) => ({ ...p, message: e.target.value }))} placeholder="What are they looking for?" className="w-full bg-white/5 border border-white/8 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50 resize-none" />
              </div>
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wide text-white/40 mb-1.5">Notes</label>
                <textarea rows={2} value={addForm.notes} onChange={(e) => setAddForm((p) => ({ ...p, notes: e.target.value }))} placeholder="Internal notes…" className="w-full bg-white/5 border border-white/8 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50 resize-none" />
              </div>
              {addError && <p className="text-xs text-rose-400">{addError}</p>}
              <div className="flex gap-3 pt-1">
                <button type="button" onClick={() => { setShowAdd(false); setAddForm(EMPTY_FORM); setAddError("") }} className="flex-1 py-2.5 rounded-xl border border-white/8 text-white/50 text-sm font-semibold hover:border-white/15 transition-colors">Cancel</button>
                <button type="submit" disabled={addLoading} className="flex-1 py-2.5 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50" style={{ background: "linear-gradient(135deg, #3b82f6, #6366f1)" }}>
                  {addLoading ? "Saving…" : "Add Lead"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
