"use client"

import { useState } from "react"
import { mockKnowledge } from "@/lib/data/mock"
import type { KBCategory } from "@/lib/types"

const ACCENT = "#ffffff"

const CATEGORY_STYLES: Record<KBCategory, string> = {
  sop: "bg-blue-500/10 text-blue-300 border-blue-500/20",
  sales: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  technical: "bg-violet-500/10 text-violet-300 border-violet-500/20",
  client: "bg-amber-500/10 text-amber-300 border-amber-500/20",
  training: "bg-rose-500/10 text-rose-300 border-rose-500/20",
  prompts: "bg-orange-500/10 text-orange-300 border-orange-500/20",
}

const CATEGORY_LABELS: Record<KBCategory, string> = {
  sop: "SOP",
  sales: "Sales",
  technical: "Technical",
  client: "Client",
  training: "Training",
  prompts: "Prompts",
}

const FILTER_TABS: { value: KBCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "sop", label: "SOPs" },
  { value: "sales", label: "Sales" },
  { value: "technical", label: "Technical" },
  { value: "client", label: "Client" },
  { value: "training", label: "Training" },
  { value: "prompts", label: "Prompts" },
]

export default function KnowledgePage() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState<KBCategory | "all">("all")
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filtered = mockKnowledge.filter((item) => {
    const matchesCategory = category === "all" || item.category === category
    const matchesSearch =
      !search ||
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35 mb-1.5">Operations</div>
        <h1 className="text-2xl font-bold tracking-tight">Knowledge Base</h1>
        <p className="text-sm text-white/45 mt-1">SOPs, sales playbooks, technical docs, prompts, and case studies.</p>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25 text-sm">⌕</div>
          <input
            type="text"
            placeholder="Search knowledge base…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/8 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-white/20"
          />
        </div>
        <div className="flex gap-1 p-1 bg-white/3 rounded-xl border border-white/5 overflow-x-auto">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setCategory(tab.value)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold uppercase tracking-wide whitespace-nowrap transition-all flex-shrink-0 ${
                category === tab.value ? "bg-white/8 text-white" : "text-white/30 hover:text-white/60"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="text-[10px] text-white/25 mb-5">
        {filtered.length} {filtered.length === 1 ? "item" : "items"}
      </div>

      {/* Knowledge Cards */}
      <div className="space-y-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-white/6 bg-white/[0.02] hover:border-white/10 transition-all overflow-hidden"
          >
            <button
              onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
              className="w-full text-left p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <span className="text-sm font-semibold text-white/90">{item.title}</span>
                    <span className={`text-[9px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded border ${CATEGORY_STYLES[item.category]}`}>
                      {CATEGORY_LABELS[item.category]}
                    </span>
                  </div>
                  <p className="text-xs text-white/50 leading-relaxed mb-3">{item.description}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {item.tags.map((tag) => (
                      <span key={tag} className="text-[9px] text-white/30 bg-white/5 px-2 py-0.5 rounded-md">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <div className="text-[10px] text-white/25">
                    {new Date(item.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </div>
                  <div className="text-[10px] text-white/30">
                    {expandedId === item.id ? "▲ Collapse" : "▼ Expand"}
                  </div>
                </div>
              </div>
            </button>

            {/* Expanded Content */}
            {expandedId === item.id && (
              <div className="border-t border-white/5 px-5 py-4 bg-white/[0.015]">
                <div className="text-[10px] font-semibold uppercase tracking-wide text-white/30 mb-3">Content</div>
                <pre className="text-xs text-white/60 leading-relaxed whitespace-pre-wrap font-sans">
                  {item.content}
                </pre>
              </div>
            )}
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-sm text-white/25 text-center py-16">
            No items match your search.
          </div>
        )}
      </div>
    </div>
  )
}
