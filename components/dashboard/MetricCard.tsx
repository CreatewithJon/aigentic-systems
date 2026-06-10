type Props = {
  label: string
  value: string | number
  delta?: string
  accent?: string
}

export default function MetricCard({ label, value, delta, accent }: Props) {
  return (
    <div className="p-5 rounded-2xl border border-white/6 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.03] transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">{label}</div>
        {accent && (
          <div className="w-1.5 h-1.5 rounded-full mt-0.5" style={{ backgroundColor: accent }} />
        )}
      </div>
      <div className="text-2xl font-bold tracking-tight mb-1">{value}</div>
      {delta && <div className="text-[10px] text-white/30">{delta}</div>}
    </div>
  )
}
