import {
  Info, Radar, Database, Gauge, FileText, ShieldAlert, Wrench, CircleCheck, ArrowUpRight, Activity,
} from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'

const features = [
  { icon: Radar, title: 'Real-time Monitoring', desc: 'Live wave data & environmental analysis' },
  { icon: Database, title: 'Zone-wise Database', desc: 'Complete stone history & tracking' },
  { icon: Gauge, title: 'AI-Powered Analysis', desc: 'Detects defects, predicts lifespan' },
  { icon: FileText, title: 'Accurate Reporting', desc: 'Detailed insights & action plans' },
  { icon: Activity, title: 'Solvyn Analysis', desc: 'AI-powered wave and image structural analysis' },
  { icon: ShieldAlert, title: 'Neighbour Impact Analysis', desc: 'Predicts failure propagation' },
  { icon: Wrench, title: 'Smart Recommendations', desc: 'Prioritized maintenance & repair plans' },
  { icon: CircleCheck, title: 'Sustainable Coastal Protection', desc: 'Longer lifespan, lower cost' },
]

const team = [
  { name: 'Marine Sensing', desc: 'Aerial, sonar and LiDAR sensor fusion for full-coverage inspection.' },
  { name: 'AI & Modeling', desc: 'Computer vision and predictive models trained on coastal failure data.' },
  { name: 'Field Engineering', desc: 'Actionable maintenance plans built with practicing marine engineers.' },
]

export default function About() {
  return (
    <div className="dark-page pb-16">
      <PageHeader
        icon={Info}
        crumbs={[{ label: 'Home', path: '/' }, { label: 'About & Features' }]}
        title="About & Features"
        subtitle="Everything SeaGuard AI does to keep coastal breakwaters monitored, predicted, and protected."
      />

      <div className="about-surface px-4 lg:px-6 mt-4 relative rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-ocean-800 to-ocean-900" />
        <div className="absolute inset-0 opacity-15">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.3),transparent_70%)]" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-950/70 to-ocean-950/95" />
        <div className="relative px-5 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-accent-light text-xs font-semibold tracking-wide mb-2">About Us</p>
            <h2 className="text-2xl font-bold text-white mb-3">Built for a Stronger, Safer Tomorrow</h2>
            <p className="text-sm text-txt-muted mb-6 max-w-md">
              SeaGuard AI is an intelligent breakwater monitoring system that combines advanced sensors, AI and data analytics to detect, predict and prevent structural failures — keeping our coasts and communities safer.
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-4">
              {features.map((f) => (
                <div key={f.title} className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center text-accent-light shrink-0">
                    <f.icon size={15} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">{f.title}</p>
                    <p className="text-[11px] text-txt-muted">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn-primary px-5 py-2.5 text-sm font-semibold mt-6 flex items-center gap-2">
              Get Started <ArrowUpRight size={15} />
            </button>
          </div>
          <div className="relative rounded-2xl overflow-hidden h-64 lg:h-80 bg-gradient-to-br from-ocean-700 to-ocean-900 border border-accent/20">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-ocean-950" />
            <p className="absolute bottom-3 left-4 text-xs text-txt-muted italic">Building Stronger Breakwaters</p>
          </div>
        </div>
      </div>

      <div className="px-4 lg:px-6 mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {team.map((t) => (
          <div key={t.name} className="card-panel p-5">
            <p className="text-sm font-semibold text-white mb-1.5">{t.name}</p>
            <p className="text-xs text-txt-muted leading-relaxed">{t.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
