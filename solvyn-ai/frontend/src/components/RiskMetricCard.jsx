export default function RiskMetricCard({ icon: Icon, label, value, sub, valueClass, iconBg = 'bg-accent-dim text-accent-light' }) {
  return (
    <div className="stat-panel px-4 py-3 flex items-center gap-3 min-w-0">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>
        <Icon size={18} strokeWidth={2} />
      </div>
      <div>
        <p className="text-2xl font-bold text-white leading-tight">{value}</p>
        <p className="text-[11px] text-txt-muted">{label}</p>
        <p className="text-[10px] text-txt-dim">{sub}</p>
      </div>
    </div>
  )
}
