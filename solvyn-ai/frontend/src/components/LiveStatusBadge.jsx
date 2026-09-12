export default function LiveStatusBadge({ label, icon: Icon, colorClass = 'bg-success-dim text-success' }) {
  return (
    <span className={`badge ${colorClass}`}>
      {Icon && <Icon size={10} />}
      {label}
    </span>
  )
}
