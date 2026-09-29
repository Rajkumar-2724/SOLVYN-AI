import { Link } from 'react-router-dom'
import {
  Waves, Image as ImageIcon, Database, Radar, Gauge, Wrench, FileText, ArrowRight, Activity,
} from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'

const services = [
  { icon: Waves, title: 'Wave Analysis', desc: 'Real-time and historical wave data analysis with AI prediction.', path: '/wave-analysis' },
  { icon: ImageIcon, title: 'Pre & Post Image Analysis', desc: 'Detect changes, damage and displacement using AI.', path: '/pre-post-analysis' },
  { icon: Activity, title: 'Solvyn Analysis', desc: 'AI-powered structural analysis combining wave and image data.', path: '/solvyn-analysis' },
  { icon: Database, title: 'Stone Database', desc: 'Store and manage stone zone-wise with full history.', path: '/database' },
  { icon: Radar, title: 'Live Wave Tracking', desc: 'Monitor real-time wave activity and environmental conditions.', path: '/live-wave-tracking' },
  { icon: Gauge, title: 'Risk & Lifespan Prediction', desc: 'Predict stone lifespan and failure risk using AI models.', path: '/risk-lifespan' },
  { icon: Wrench, title: 'Maintenance Recommendation', desc: 'Get prioritized repair and replacement suggestions.', path: '/maintenance' },
  { icon: FileText, title: 'Report Generation', desc: 'Detailed reports with insights, charts and recommendations.', path: '/reports' },
]

export default function Service() {
  return (
    <div className="dark-page pb-16">
      <PageHeader
        icon={Gauge}
        crumbs={[{ label: 'Home', path: '/' }, { label: 'Service' }]}
        title="Comprehensive Breakwater Intelligence"
        subtitle="From data collection to actionable insights — explore every AI-powered tool for smarter, safer coastal infrastructure."
      />
      <div className="px-4 lg:px-6 mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((s) => (
          <Link to={s.path} key={s.title} className="card-panel p-5 hover:border-accent/40 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/25 to-accent/15 flex items-center justify-center text-accent-light mb-4">
              <s.icon size={22} />
            </div>
            <p className="text-sm font-semibold text-white mb-1.5">{s.title}</p>
            <p className="text-xs text-txt-muted leading-relaxed mb-4">{s.desc}</p>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-light">
              Explore <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
