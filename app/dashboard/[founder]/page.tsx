"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { getFounderBySlug, founders } from "@/lib/data/founders";

type Lead = {
  id: string;
  name: string;
  email: string;
  business_name?: string;
  message?: string;
  created_at: string;
  status: "new" | "contacted" | "qualified" | "closed";
};

const MOCK_LEADS: Lead[] = [
  { id: "1", name: "Marcus Rivera", email: "marcus@lasvegasroofing.com", business_name: "LV Roofing Co", message: "We need help automating our follow-up process. Getting 50+ leads/week but only converting 10%.", created_at: "2026-06-01T14:22:00Z", status: "new" },
  { id: "2", name: "Sandra Kim", email: "sandra@skinbykim.com", business_name: "Skin by Kim Med Spa", message: "Looking to set up an AI appointment system and reduce no-shows.", created_at: "2026-05-30T09:15:00Z", status: "contacted" },
  { id: "3", name: "Derrick Thomas", email: "derrick@thomasrealty.com", business_name: "Thomas Realty Group", message: "Need a full AI lead capture + CRM workflow for our real estate team of 8 agents.", created_at: "2026-05-29T16:40:00Z", status: "qualified" },
  { id: "4", name: "Priya Patel", email: "priya@brightsmilesdental.com", business_name: "Bright Smiles Dental", message: "Want to automate patient reminders and reactivation campaigns.", created_at: "2026-05-27T11:30:00Z", status: "contacted" },
  { id: "5", name: "James Caldwell", email: "james@caldwellsolar.com", business_name: "Caldwell Solar", message: "Our sales team is overwhelmed. Need AI to pre-qualify inbound before they reach us.", created_at: "2026-05-25T08:00:00Z", status: "closed" },
];

const STATUS_STYLES: Record<Lead["status"], string> = {
  new: "bg-blue-500/10 text-blue-300 border-blue-500/20",
  contacted: "bg-amber-500/10 text-amber-300 border-amber-500/20",
  qualified: "bg-violet-500/10 text-violet-300 border-violet-500/20",
  closed: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
};

const METRICS = [
  { label: "Total Leads", value: "5", delta: "+3 this week" },
  { label: "Qualified", value: "1", delta: "20% rate" },
  { label: "Contacted", value: "2", delta: "40% response" },
  { label: "Revenue Pipeline", value: "$12,500", delta: "est." },
];

export default function FounderDashboard() {
  const router = useRouter();
  const params = useParams();
  const founderSlug = typeof params.founder === "string" ? params.founder : "";
  const founder = getFounderBySlug(founderSlug);

  const [authed, setAuthed] = useState(false);
  const [activeTab, setActiveTab] = useState<"leads" | "pipeline" | "notes">("leads");

  useEffect(() => {
    const auth = sessionStorage.getItem("dashboard_auth");
    if (auth !== "true") {
      router.push("/dashboard");
      return;
    }
    setAuthed(true);
  }, [router]);

  if (!founder || !authed) return null;

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
              onClick={() => {
                sessionStorage.removeItem("dashboard_auth");
                router.push("/dashboard");
              }}
              className="text-xs text-white/25 hover:text-white/50 transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Welcome */}
        <div className="mb-10">
          <div
            className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-1"
            style={{ color: founder.accentHex }}
          >
            {founder.title}
          </div>
          <h1 className="text-2xl font-bold">Welcome back, {founder.name.split(" ")[0]}.</h1>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {METRICS.map((m) => (
            <div key={m.label} className="p-5 rounded-2xl border border-white/6 bg-white/[0.02]">
              <div className="text-[10px] font-semibold uppercase tracking-wide text-white/35 mb-2">{m.label}</div>
              <div className="text-2xl font-bold mb-1">{m.value}</div>
              <div className="text-[10px] text-white/30">{m.delta}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-white/3 rounded-xl border border-white/5 w-fit mb-8">
          {(["leads", "pipeline", "notes"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wide transition-all ${
                activeTab === tab
                  ? "bg-white/8 text-white"
                  : "text-white/35 hover:text-white/60"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Leads Tab */}
        {activeTab === "leads" && (
          <div className="space-y-3">
            {MOCK_LEADS.map((lead) => (
              <div
                key={lead.id}
                className="p-5 rounded-2xl border border-white/6 bg-white/[0.02] hover:border-white/10 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-sm font-semibold">{lead.name}</span>
                      {lead.business_name && (
                        <span className="text-xs text-white/35">{lead.business_name}</span>
                      )}
                    </div>
                    <div className="text-xs text-white/40 mb-3">{lead.email}</div>
                    {lead.message && (
                      <p className="text-xs text-white/50 leading-relaxed line-clamp-2">{lead.message}</p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-md border ${STATUS_STYLES[lead.status]}`}
                    >
                      {lead.status}
                    </span>
                    <span className="text-[10px] text-white/25">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pipeline Tab */}
        {activeTab === "pipeline" && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {(["new", "contacted", "qualified", "closed"] as Lead["status"][]).map((status) => {
              const statusLeads = MOCK_LEADS.filter((l) => l.status === status);
              return (
                <div key={status} className="rounded-2xl border border-white/6 bg-white/[0.02] p-4">
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-md border ${STATUS_STYLES[status]}`}
                    >
                      {status}
                    </span>
                    <span className="text-xs text-white/30">{statusLeads.length}</span>
                  </div>
                  <div className="space-y-2">
                    {statusLeads.map((lead) => (
                      <div key={lead.id} className="p-3 rounded-xl border border-white/5 bg-white/3">
                        <div className="text-xs font-medium mb-0.5">{lead.name}</div>
                        <div className="text-[10px] text-white/35">{lead.business_name}</div>
                      </div>
                    ))}
                    {statusLeads.length === 0 && (
                      <div className="text-xs text-white/20 text-center py-4">Empty</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Notes Tab */}
        {activeTab === "notes" && (
          <div className="p-8 rounded-2xl border border-white/6 bg-white/[0.02]">
            <div className="text-[10px] font-semibold uppercase tracking-wide text-white/30 mb-4">
              {founder.name.split(" ")[0]}&apos;s Notes
            </div>
            <textarea
              rows={14}
              placeholder={`Write notes, tasks, follow-ups, ideas...`}
              className="w-full bg-transparent text-sm text-white/70 placeholder-white/20 focus:outline-none resize-none leading-relaxed"
            />
          </div>
        )}
      </div>
    </div>
  );
}
