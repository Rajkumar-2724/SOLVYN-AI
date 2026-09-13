import {
  Activity,
  Database,
  FileText,
  Radar,
  ShieldCheck,
  Waves,
} from 'lucide-react'

const services = [
  { icon: Radar, title: 'Live coastal monitoring', desc: 'Track wave activity and environmental conditions.' },
  { icon: Waves, title: 'Wave analysis', desc: 'Understand wave forces before they affect your structure.' },
  { icon: Activity, title: 'AI predictions', desc: 'Spot displacement, defects, and risk early.' },
  { icon: Database, title: 'Stone intelligence', desc: 'Manage zone-wise history and remaining lifespan.' },
  { icon: FileText, title: 'Clear reports', desc: 'Turn complex analysis into practical action plans.' },
]

export default function AuthServices() {
  return (
    <aside className="auth-services" aria-label="Available services">
      <p className="auth-services-eyebrow">Available services</p>
      <h2 className="auth-services-title">One clear view of your coastline.</h2>
      <p className="auth-services-intro">
        SOLVYN AI brings monitoring, prediction, and maintenance intelligence together in one workspace.
      </p>

      <div className="auth-services-list">
        {services.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="auth-service-item">
            <span className="auth-service-icon"><Icon size={17} /></span>
            <span>
              <strong>{title}</strong>
              <small>{desc}</small>
            </span>
          </div>
        ))}
      </div>

      <div className="auth-services-status">
        <ShieldCheck size={17} />
        <span><strong>System ready</strong><small>Reliable coastal intelligence, whenever you need it.</small></span>
      </div>
    </aside>
  )
}
