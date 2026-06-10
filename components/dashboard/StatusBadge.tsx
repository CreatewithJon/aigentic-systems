type Props = {
  status: string
  size?: "sm" | "md"
}

const STATUS_MAP: Record<string, string> = {
  // Project statuses
  live: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  in_progress: "bg-blue-500/10 text-blue-300 border-blue-500/20",
  needs_attention: "bg-rose-500/10 text-rose-300 border-rose-500/20",
  planned: "bg-white/5 text-white/35 border-white/10",
  // Lead statuses
  new: "bg-blue-500/10 text-blue-300 border-blue-500/20",
  contacted: "bg-amber-500/10 text-amber-300 border-amber-500/20",
  qualified: "bg-violet-500/10 text-violet-300 border-violet-500/20",
  closed: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  // Deal stages
  new_lead: "bg-blue-500/10 text-blue-300 border-blue-500/20",
  discovery: "bg-amber-500/10 text-amber-300 border-amber-500/20",
  proposal: "bg-violet-500/10 text-violet-300 border-violet-500/20",
  negotiation: "bg-orange-500/10 text-orange-300 border-orange-500/20",
  won: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  lost: "bg-rose-500/5 text-rose-400/50 border-rose-500/10",
  // Task statuses
  todo: "bg-white/5 text-white/35 border-white/10",
  done: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  // Client statuses
  active: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  paused: "bg-amber-500/10 text-amber-300 border-amber-500/20",
  churned: "bg-rose-500/5 text-rose-400/50 border-rose-500/10",
  onboarding: "bg-violet-500/10 text-violet-300 border-violet-500/20",
  // Content statuses
  draft: "bg-white/5 text-white/35 border-white/10",
  ready: "bg-amber-500/10 text-amber-300 border-amber-500/20",
  published: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
}

const STATUS_LABELS: Record<string, string> = {
  in_progress: "In Progress",
  new_lead: "New Lead",
}

export default function StatusBadge({ status, size = "sm" }: Props) {
  const classes = STATUS_MAP[status] ?? "bg-white/5 text-white/30 border-white/8"
  const label = STATUS_LABELS[status] ?? status.replace(/_/g, " ")
  const sizeClasses = size === "md"
    ? "text-[10px] px-2.5 py-1"
    : "text-[9px] px-2 py-0.5"

  return (
    <span className={`inline-flex items-center font-semibold uppercase tracking-wide rounded border ${sizeClasses} ${classes}`}>
      {label}
    </span>
  )
}
