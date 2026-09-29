import { Link } from 'react-router-dom'

export default function PageHeader({ icon: Icon, crumbs = [], title, subtitle, right }) {
  return (
    <div className="px-4 lg:px-6 pt-5 pb-2">
      {crumbs.length > 0 && (
        <div className="flex items-center gap-1.5 text-xs text-accent-light/60 mb-2">
          {crumbs.map((c, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {c.path ? (
                <Link to={c.path} className="hover:text-accent-light transition-colors">{c.label}</Link>
              ) : (
                <span className={i === crumbs.length - 1 ? 'text-accent-light font-semibold' : ''}>{c.label}</span>
              )}
              {i < crumbs.length - 1 && <span className="text-slate-600">›</span>}
            </span>
          ))}
        </div>
      )}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            {Icon && (
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/15 to-accent-light/10 border border-accent/15 flex items-center justify-center text-accent-light">
                <Icon size={20} />
              </div>
            )}
            <h1 className="text-2xl lg:text-[28px] font-bold text-white tracking-tight">{title}</h1>
          </div>
          {subtitle && <p className="text-sm text-txt-muted/80 mt-1.5 max-w-xl">{subtitle}</p>}
        </div>
        {right}
      </div>
    </div>
  )
}
