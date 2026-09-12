export default function StatCard({ icon: Icon, label, value, sub, valueClass = 'text-white', iconBg = 'bg-accent-dim text-accent-light', trend }) {
  return (
    <div className="stat-panel px-4 py-4 flex items-start gap-3 min-w-0">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>
        <Icon size={18} strokeWidth={2} />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-txt-muted truncate">{label}</p>
        <p className={`text-xl font-bold mt-0.5 ${valueClass}`}>{value}</p>
        <p className="text-[11px] text-txt-dim mt-0.5">
          {sub}
          {trend && <span className="text-success ml-1">{trend}</span>}
        </p>
      </div>
    </div>
  )
}
