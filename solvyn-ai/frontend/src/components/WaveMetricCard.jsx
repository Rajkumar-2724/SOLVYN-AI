import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

export default function WaveMetricCard({ icon: Icon, label, value, trend, trendValue, iconBg = 'bg-accent-dim text-accent-light', trendClass = 'text-success' }) {
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus

  return (
    <div className="stat-panel px-4 py-3 flex items-start gap-3 min-w-0">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>
        <Icon size={18} strokeWidth={2} />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] text-txt-muted truncate">{label}</p>
        <p className="text-lg font-bold text-white mt-0.5">{value}</p>
        {trend && (
          <p className="text-[11px] mt-0.5 flex items-center gap-1">
            <TrendIcon size={11} className={trendClass} />
            <span className={trendClass}>{trendValue}</span>
          </p>
        )}
      </div>
    </div>
  )
}
