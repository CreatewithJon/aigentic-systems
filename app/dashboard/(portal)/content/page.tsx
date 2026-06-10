"use client"

import { useState } from "react"
import { mockContent } from "@/lib/data/mock"
import type { ContentType } from "@/lib/types"

type ContentStatus = "draft" | "ready" | "published"

const TYPE_STYLES: Record<ContentType, string> = {
  linkedin: "bg-blue-500/10 text-blue-300 border-blue-500/20",
  youtube: "bg-rose-500/10 text-rose-300 border-rose-500/20",
  instagram: "bg-violet-500/10 text-violet-300 border-violet-500/20",
  blog: "bg-amber-500/10 text-amber-300 border-amber-500/20",
  email: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  asset: "bg-white/5 text-white/40 border-white/10",
}

const STATUS_STYLES: Record<ContentStatus, string> = {
  draft: "bg-white/5 text-white/35 border-white/10",
  ready: "bg-amber-500/10 text-amber-300 border-amber-500/20",
  published: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
}

const TYPE_ICONS: Record<ContentType, string> = {
  linkedin: "in",
  youtube: "▶",
  instagram: "◈",
  blog: "✍",
  email: "✉",
  asset: "⬡",
}

const CONTENT_TYPE_FILTERS: { value: ContentType | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "youtube", label: "YouTube" },
  { value: "instagram", label: "Instagram" },
  { value: "blog", label: "Blog" },
  { value: "asset", label: "Assets" },
]

const STATUS_FILTERS: { value: ContentStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "draft", label: "Draft" },
  { value: "ready", label: "Ready" },
  { value: "published", label: "Published" },
]

export default function ContentPage() {
  const [typeFilter, setTypeFilter] = useState<ContentType | "all">("all")
  const [statusFilter, setStatusFilter] = useState<ContentStatus | "all">("all")

  const filtered = mockContent.filter((item) => {
    const matchesType = typeFilter === "all" || item.type === typeFilter
    const matchesStatus = statusFilter === "all" || item.status === statusFilter
    return matchesType && matchesStatus
  })

  const publishedCount = mockContent.filter((c) => c.status === "published").length
  const draftCount = mockContent.filter((c) => c.status === "draft").length
  const readyCount = mockContent.filter((c) => c.status === "ready").length

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35 mb-1.5">Operations</div>
        <h1 className="text-2xl font-bold tracking-tight">Content Center</h1>
        <p className="text-sm text-white/45 mt-1">LinkedIn, YouTube, blog posts, social assets, and email campaigns.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="p-4 rounded-2xl border border-white/6 bg-white/[0.02]">
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30 mb-2">Published</div>
          <div className="text-2xl font-bold text-emerald-400">{publishedCount}</div>
        </div>
        <div className="p-4 rounded-2xl border border-white/6 bg-white/[0.02]">
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30 mb-2">Ready to Post</div>
          <div className="text-2xl font-bold text-amber-400">{readyCount}</div>
        </div>
        <div className="p-4 rounded-2xl border border-white/6 bg-white/[0.02]">
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30 mb-2">In Draft</div>
          <div className="text-2xl font-bold text-white/40">{draftCount}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex gap-1 p-1 bg-white/3 rounded-xl border border-white/5">
          {CONTENT_TYPE_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setTypeFilter(f.value)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold uppercase tracking-wide transition-all ${
                typeFilter === f.value ? "bg-white/8 text-white" : "text-white/30 hover:text-white/60"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex gap-1 p-1 bg-white/3 rounded-xl border border-white/5">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setStatusFilter(f.value)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold uppercase tracking-wide transition-all ${
                statusFilter === f.value ? "bg-white/8 text-white" : "text-white/30 hover:text-white/60"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl border border-white/6 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.03] transition-all"
          >
            {/* Type icon + badges */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold border ${TYPE_STYLES[item.type]}`}>
                  {TYPE_ICONS[item.type]}
                </div>
                <span className={`text-[9px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded border ${TYPE_STYLES[item.type]}`}>
                  {item.type}
                </span>
              </div>
              <span className={`text-[9px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded border ${STATUS_STYLES[item.status]}`}>
                {item.status}
              </span>
            </div>

            {/* Title */}
            <div className="text-sm font-semibold text-white/85 leading-snug mb-2">{item.title}</div>

            {/* Platform */}
            {item.platform && (
              <div className="text-[10px] text-white/35 mb-3">{item.platform}</div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {item.tags.map((tag) => (
                <span key={tag} className="text-[9px] text-white/30 bg-white/5 px-1.5 py-0.5 rounded-md">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Date */}
            <div className="text-[10px] text-white/25">
              {new Date(item.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-3 text-sm text-white/25 text-center py-16">
            No content matches those filters.
          </div>
        )}
      </div>
    </div>
  )
}
