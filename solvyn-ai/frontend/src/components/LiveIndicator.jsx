export default function LiveIndicator({ pulse = true }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={`w-2 h-2 rounded-full bg-success ${pulse ? 'pulse-dot' : ''}`} />
      <span className="text-xs font-semibold text-success">LIVE</span>
    </span>
  )
}
