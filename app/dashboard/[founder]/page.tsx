"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { getFounderBySlug, founders } from "@/lib/data/founders";

type Lead = {
  id: string;
  name: string;
  email: string;
  business_name?: string;
  message?: string;
  notes?: string;
  status: "new" | "contacted" | "qualified" | "closed";
  source: "website_form" | "manual";
  created_at: string;
};

const STATUS_STYLES: Record<Lead["status"], string> = {
  new: "bg-blue-500/10 text-blue-300 border-blue-500/20",
  contacted: "bg-amber-500/10 text-amber-300 border-amber-500/20",
  qualified: "bg-violet-500/10 text-violet-300 border-violet-500/20",
  closed: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
};

const SOURCE_STYLES: Record<Lead["source"], string> = {
  website_form: "bg-blue-500/8 text-blue-400/70 border-blue-500/15",
  manual: "bg-white/5 text-white/30 border-white/8",
};

const SOURCE_LABELS: Record<Lead["source"], string> = {
  website_form: "Website",
  manual: "Manual",
};

const STATUSES: Lead["status"][] = ["new", "contacted", "qualified", "closed"];

const EMPTY_FORM = { name: "", email: "", business_name: "", message: "", notes: "" };

export default function FounderDashboard() {
  const router = useRouter();
  const params = useParams();
  const founderSlug = typeof params.founder === "string" ? params.founder : "";
  const founder = getFounderBySlug(founderSlug);

  const [authed, setAuthed] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"leads" | "pipeline">("leads");
  const [statusFilter, setStatusFilter] = useState<Lead["status"] | "all">("all");

  // Add lead modal
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState(EMPTY_FORM);
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState("");

  // Notes drawer
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [notesDraft, setNotesDraft] = useState<Record<string, string>>({});
  const [savingNotes, setSavingNotes] = useState<string | null>(null);

  useEffect(() => {
    const auth = sessionStorage.getItem("dashboard_auth");
    if (auth !== "true") {
      router.push("/dashboard");
      return;
    }
    setAuthed(true);
  }, [router]);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/leads");
      if (res.ok) setLeads(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authed) fetchLeads();
  }, [authed, fetchLeads]);

  async function updateStatus(id: string, status: Lead["status"]) {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    await fetch("/api/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
  }

  async function saveNotes(id: string) {
    setSavingNotes(id);
    const notes = notesDraft[id] ?? leads.find((l) => l.id === id)?.notes ?? "";
    await fetch("/api/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, notes }),
    });
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, notes } : l)));
    setSavingNotes(null);
  }

  async function deleteLead(id: string) {
    if (!confirm("Remove this lead?")) return;
    setLeads((prev) => prev.filter((l) => l.id !== id));
    await fetch(`/api/leads?id=${id}`, { method: "DELETE" });
  }

  async function handleAddLead(e: React.FormEvent) {
    e.preventDefault();
    setAddError("");
    setAddLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...addForm, source: "manual" }),
      });
      if (!res.ok) throw new Error("Failed");
      setShowAdd(false);
      setAddForm(EMPTY_FORM);
      await fetchLeads();
    } catch {
      setAddError("Something went wrong. Please try again.");
    } finally {
      setAddLoading(false);
    }
  }

  if (!founder || !authed) return null;

  const filtered = statusFilter === "all" ? leads : leads.filter((l) => l.status === statusFilter);

  const metrics = [
    { label: "Total Leads", value: leads.length, delta: `${leads.filter((l) => l.source === "website_form").length} from website` },
    { label: "New", value: leads.filter((l) => l.status === "new").length, delta: "awaiting contact" },
    { label: "Qualified", value: leads.filter((l) => l.status === "qualified").length, delta: `${leads.length ? Math.round((leads.filter((l) => l.status === "qualified").length / leads.length) * 100) : 0}% rate` },
    { label: "Closed", value: leads.filter((l) => l.status === "closed").length, delta: "converted" },
  ];

  return (
    <div className="min-h-screen bg-[#080c12] text-white">
      {/* Top Bar */}
      <header className="border-b border-white/5 bg-[#080c12]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">A</span>
              </div>
              <span className="text-sm text-white/50">Portal</span>
            </Link>
            <div className="h-4 w-px bg-white/8" />
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold"
                style={{ backgroundColor: `${founder.accentHex}20`, color: founder.accentHex }}
              >
                {founder.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </div>
              <span className="text-sm font-medium">{founder.name}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {founders.filter((f) => f.slug !== founderSlug).map((f) => (
              <button
                key={f.slug}
                onClick={() => router.push(`/dashboard/${f.slug}`)}
                className="text-xs text-white/30 hover:text-white/60 transition-colors"
              >
                {f.name.split(" ")[0]}
              </button>
            ))}
            <button
              onClick={() => { sessionStorage.removeItem("dashboard_auth"); router.push("/dashboard"); }}
              className="text-xs text-white/25 hover:text-white/50 transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Welcome */}
        <div className="mb-10 flex items-start justify-between">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-1" style={{ color: founder.accentHex }}>
              {founder.title}
            </div>
            <h1 className="text-2xl font-bold">Welcome back, {founder.name.split(" ")[0]}.</h1>
          </div>
          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold text-xs hover:opacity-90 transition-opacity"
          >
            <span className="text-base leading-none">+</span> Add Lead
          </button>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {metrics.map((m) => (
            <div key={m.label} className="p-5 rounded-2xl border border-white/6 bg-white/[0.02]">
              <div className="text-[10px] font-semibold uppercase tracking-wide text-white/35 mb-2">{m.label}</div>
              <div className="text-2xl font-bold mb-1">{loading ? "—" : m.value}</div>
              <div className="text-[10px] text-white/30">{m.delta}</div>
            </div>
          ))}
        </div>

        {/* Tabs + filter */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
          <div className="flex gap-1 p-1 bg-white/3 rounded-xl border border-white/5 w-fit">
            {(["leads", "pipeline"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wide transition-all ${
                  activeTab === tab ? "bg-white/8 text-white" : "text-white/35 hover:text-white/60"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "leads" && (
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

        {/* Leads Tab */}
        {activeTab === "leads" && (
          <div className="space-y-3">
            {loading && (
              <div className="text-sm text-white/30 text-center py-16">Loading leads…</div>
            )}
            {!loading && filtered.length === 0 && (
              <div className="text-sm text-white/25 text-center py-16">No leads yet. Add one or share the website!</div>
            )}
            {!loading && filtered.map((lead) => (
              <div key={lead.id} className="rounded-2xl border border-white/6 bg-white/[0.02] hover:border-white/10 transition-colors overflow-hidden">
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-sm font-semibold">{lead.name}</span>
                        {lead.business_name && (
                          <span className="text-xs text-white/35">{lead.business_name}</span>
                        )}
                        <span className={`text-[9px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded border ${SOURCE_STYLES[lead.source]}`}>
                          {SOURCE_LABELS[lead.source]}
                        </span>
                      </div>
                      <div className="text-xs text-white/40 mb-3">{lead.email}</div>
                      {lead.message && (
                        <p className="text-xs text-white/50 leading-relaxed line-clamp-2">{lead.message}</p>
                      )}
                    </div>

                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      {/* Status dropdown */}
                      <select
                        value={lead.status}
                        onChange={(e) => updateStatus(lead.id, e.target.value as Lead["status"])}
                        className={`text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-md border cursor-pointer bg-transparent ${STATUS_STYLES[lead.status]}`}
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s} className="bg-[#0d1220] text-white normal-case">{s}</option>
                        ))}
                      </select>
                      <span className="text-[10px] text-white/25">
                        {new Date(lead.created_at).toLocaleDateString()}
                      </span>
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

                {/* Notes drawer */}
                {expandedId === lead.id && (
                  <div className="border-t border-white/5 px-5 py-4 bg-white/[0.015]">
                    <div className="text-[10px] font-semibold uppercase tracking-wide text-white/30 mb-2">Notes</div>
                    <textarea
                      rows={3}
                      placeholder="Add notes, follow-up reminders, context…"
                      value={notesDraft[lead.id] ?? lead.notes ?? ""}
                      onChange={(e) => setNotesDraft((p) => ({ ...p, [lead.id]: e.target.value }))}
                      className="w-full bg-white/5 border border-white/8 rounded-lg px-3 py-2.5 text-xs text-white/70 placeholder-white/20 focus:outline-none focus:border-violet-500/40 resize-none"
                    />
                    <button
                      onClick={() => saveNotes(lead.id)}
                      disabled={savingNotes === lead.id}
                      className="mt-2 text-[10px] font-semibold uppercase tracking-wide text-violet-400 hover:text-violet-300 transition-colors disabled:opacity-40"
                    >
                      {savingNotes === lead.id ? "Saving…" : "Save Notes"}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Pipeline Tab */}
        {activeTab === "pipeline" && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {STATUSES.map((status) => {
              const col = leads.filter((l) => l.status === status);
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
                        <div className="flex items-start justify-between gap-1">
                          <div>
                            <div className="text-xs font-medium mb-0.5">{lead.name}</div>
                            <div className="text-[10px] text-white/35">{lead.business_name || lead.email}</div>
                          </div>
                          <span className={`text-[9px] font-semibold uppercase px-1.5 py-0.5 rounded border flex-shrink-0 ${SOURCE_STYLES[lead.source]}`}>
                            {SOURCE_LABELS[lead.source]}
                          </span>
                        </div>
                      </div>
                    ))}
                    {col.length === 0 && (
                      <div className="text-xs text-white/20 text-center py-4">Empty</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Community Projects */}
        <div className="mt-10">
          <div className="text-[10px] font-semibold uppercase tracking-wide text-white/30 mb-4">
            Community Projects
          </div>
          <a
            href="https://cryptomondays-lv.vercel.app/crypto-mondays-admin"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-5 rounded-2xl border border-white/6 bg-white/[0.02] hover:border-white/10 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.25)" }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="9" r="6.5" stroke="#c9a84c" strokeWidth="1.3" />
                  <circle cx="9" cy="9" r="2.5" fill="#c9a84c" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">
                  Manage Crypto Mondays
                </div>
                <div className="text-xs text-white/35 mt-0.5">
                  Events · Photos · Testimonials · Sponsors · Settings
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-white/25 group-hover:text-white/50 transition-colors">
              <span className="text-[10px] uppercase tracking-wide">Admin</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </a>
        </div>
      </div>

      {/* Add Lead Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0d1220] p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base font-bold">Add Lead</h2>
              <button onClick={() => { setShowAdd(false); setAddForm(EMPTY_FORM); setAddError(""); }} className="text-white/30 hover:text-white/60 transition-colors text-xl leading-none">×</button>
            </div>

            <form onSubmit={handleAddLead} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wide text-white/40 mb-1.5">Name *</label>
                  <input
                    required
                    type="text"
                    value={addForm.name}
                    onChange={(e) => setAddForm((p) => ({ ...p, name: e.target.value }))}
                    placeholder="Full name"
                    className="w-full bg-white/5 border border-white/8 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-violet-500/50"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wide text-white/40 mb-1.5">Email *</label>
                  <input
                    required
                    type="email"
                    value={addForm.email}
                    onChange={(e) => setAddForm((p) => ({ ...p, email: e.target.value }))}
                    placeholder="email@company.com"
                    className="w-full bg-white/5 border border-white/8 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-violet-500/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wide text-white/40 mb-1.5">Business Name</label>
                <input
                  type="text"
                  value={addForm.business_name}
                  onChange={(e) => setAddForm((p) => ({ ...p, business_name: e.target.value }))}
                  placeholder="Company"
                  className="w-full bg-white/5 border border-white/8 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-violet-500/50"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wide text-white/40 mb-1.5">Message / Context</label>
                <textarea
                  rows={3}
                  value={addForm.message}
                  onChange={(e) => setAddForm((p) => ({ ...p, message: e.target.value }))}
                  placeholder="What are they looking for?"
                  className="w-full bg-white/5 border border-white/8 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-violet-500/50 resize-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wide text-white/40 mb-1.5">Notes</label>
                <textarea
                  rows={2}
                  value={addForm.notes}
                  onChange={(e) => setAddForm((p) => ({ ...p, notes: e.target.value }))}
                  placeholder="Internal notes…"
                  className="w-full bg-white/5 border border-white/8 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-violet-500/50 resize-none"
                />
              </div>

              {addError && <p className="text-xs text-rose-400">{addError}</p>}

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => { setShowAdd(false); setAddForm(EMPTY_FORM); setAddError(""); }}
                  className="flex-1 py-2.5 rounded-xl border border-white/8 text-white/50 text-sm font-semibold hover:border-white/15 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={addLoading}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {addLoading ? "Saving…" : "Add Lead"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
