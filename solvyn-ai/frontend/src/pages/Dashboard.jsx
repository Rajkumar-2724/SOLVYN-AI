import { useState } from 'react'
import {
  Home, Users, Waves, ShieldAlert, Clock, Sun, ChevronDown, MapPin,
  Wind, Image as ImageIcon, Database, Radar, Gauge, Wrench,
  FileText, ArrowRight, CircleCheck, ArrowUpRight, Activity
} from 'lucide-react'
import { zones, stoneDatabase, statusBg } from '../data/stones.js'

const services = [
  { icon: Waves, title: 'Wave Analysis', desc: 'Real-time and historical wave data analysis with AI prediction.' },
  { icon: ImageIcon, title: 'Pre & Post Image Analysis', desc: 'Detect changes, damage and displacement using AI.' },
  { icon: Activity, title: 'Solvyn Analysis', desc: 'AI-powered structural analysis combining wave and image data.' },
  { icon: Database, title: 'Stone Database', desc: 'Store and manage stone zone-wise with full history.' },
  { icon: Radar, title: 'Live Wave Tracking', desc: 'Monitor real-time wave activity and environmental conditions.' },
  { icon: Gauge, title: 'Risk & Lifespan Prediction', desc: 'Predict stone lifespan and failure risk using AI models.' },
  { icon: Wrench, title: 'Maintenance Recommendation', desc: 'Get prioritized repair and replacement suggestions.' },
  { icon: FileText, title: 'Report Generation', desc: 'Detailed reports with insights, charts and recommendations.' },
]

const aboutFeatures = [
  { icon: Radar, title: 'Real-time Monitoring', desc: 'Live wave data & environmental analysis' },
  { icon: Database, title: 'Zone-wise Database', desc: 'Complete stone history & tracking' },
  { icon: Gauge, title: 'AI-Powered Analysis', desc: 'Detects defects, predicts lifespan' },
  { icon: FileText, title: 'Accurate Reporting', desc: 'Detailed insights & action plans' },
  { icon: Activity, title: 'Solvyn Analysis', desc: 'AI-powered wave and image structural analysis' },
  { icon: ShieldAlert, title: 'Neighbour Impact Analysis', desc: 'Predicts failure propagation' },
  { icon: Wrench, title: 'Smart Recommendations', desc: 'Prioritized maintenance & repair plans' },
  { icon: CircleCheck, title: 'Sustainable Coastal Protection', desc: 'Longer lifespan, lower cost' },
]

export default function Dashboard() {
  const [zone, setZone] = useState('Zone 03')
  const zoneStones = stoneDatabase.filter((s) => s.zone === zone).slice(0, 7)

  return (
    <div className="dark-page pb-16">
      {/* HERO */}
      <div className="dashboard-surface relative mx-4 lg:mx-6 mt-4 rounded-2xl overflow-hidden animate-fade-in-up">
        <div className="absolute inset-0 bg-gradient-to-br from-ocean-800/80 via-ocean-700/60 to-cyan-900/30" />
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(59,159,224,0.12),transparent_50%)]" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,rgba(108,196,245,0.08),transparent_50%)]" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-ocean-950/70 via-ocean-950/20 to-ocean-950/50" />
        {/* Top border glow */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

        <div className="relative px-5 lg:px-8 pt-6 pb-8">
          <p className="text-accent-light/90 text-xs font-semibold tracking-widest uppercase mb-2">Real-time Monitoring & Analysis</p>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-white leading-tight max-w-md">
            Smarter Breakwater<br />Management with AI
          </h1>
          <p className="text-sm text-txt-muted/80 mt-3">Monitor &middot; Analyse &middot; Predict &middot; Protect</p>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px_260px] gap-4 mt-6">
            <div className="hidden lg:block" />

            <div className="stat-panel !bg-ocean-900/60 backdrop-blur px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-warning-dim flex items-center justify-center">
                  <Sun size={18} className="text-warning" />
                </div>
                <div>
                  <p className="text-lg font-bold text-white leading-none">32°C</p>
                  <p className="text-[11px] text-txt-muted mt-1">Partly Cloudy</p>
                </div>
              </div>
              <div className="w-px h-8 bg-white/8" />
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-accent-dim flex items-center justify-center">
                  <Waves size={18} className="text-accent-light" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white leading-none">1.8 m</p>
                  <p className="text-[11px] text-txt-muted mt-1 flex items-center gap-1"><MapPin size={10} /> Chennai Coast</p>
                </div>
              </div>
            </div>

            <div className="stat-panel !bg-ocean-900/60 backdrop-blur p-3.5">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-slate-200">Zone Selection</p>
              </div>
              <div className="relative mb-2">
                <select
                  value={zone}
                  onChange={(e) => setZone(e.target.value)}
                  className="input-dark w-full text-sm px-3 py-2 appearance-none focus:outline-none"
                >
                  {zones.map((z) => <option key={z}>{z}</option>)}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-txt-muted pointer-events-none" />
              </div>
              <div className="flex gap-2">
                <div className="w-24 h-16 rounded-lg overflow-hidden shrink-0 bg-gradient-to-br from-ocean-600 to-ocean-800 relative border border-accent/15">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/8 to-ocean-900" />
                </div>
                <div className="flex-1 space-y-1 text-[11px]">
                  {zones.slice(0, 5).map((z) => (
                    <button
                      key={z}
                      onClick={() => setZone(z)}
                      className={`w-full flex items-center gap-1.5 px-1.5 py-0.5 rounded transition-colors ${zone === z ? 'text-accent-light font-semibold' : 'text-txt-muted hover:text-txt-primary'}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full transition-colors ${zone === z ? 'bg-accent shadow-[0_0_6px_rgba(59,159,224,0.5)]' : 'bg-ocean-600'}`} />
                      {z}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STAT ROW */}
      <div className="px-4 lg:px-6 -mt-2 mb-8 grid grid-cols-2 lg:grid-cols-5 gap-3">
        <StatBox icon={Home} label="Total Zones" value="12" sub="Active Zones" />
        <StatBox icon={Users} label="Total Stones (Selected Zone)" value="15,842" sub="↑ 2.5%" subClass="text-success" />
        <StatBox icon={Waves} label="Avg. Wave Activity" value="2.4 m" sub="Live sensor data" mini />
        <StatBox icon={ShieldAlert} label="Critical Stones" value="126" valueClass="text-danger" sub="Require Attention" iconBg="bg-danger-dim text-danger" />
        <StatBox icon={Clock} label="Avg. Remaining Life" value="7.3 Years" sub="Across all zones" />
      </div>

      {/* SERVICES SECTION */}
      <div className="dashboard-surface relative mx-4 lg:mx-6 rounded-2xl overflow-hidden mb-8">
        <div className="absolute inset-0 bg-gradient-to-br from-ocean-800/60 to-ocean-900/80" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,159,224,0.12),transparent_70%)]" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-950/60 to-ocean-950/80" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

        <div className="relative px-5 lg:px-8 py-8">
          <p className="text-accent-light/90 text-xs font-semibold tracking-widest uppercase mb-2">Our Services</p>
          <h2 className="text-2xl font-bold text-white mb-2">Comprehensive Breakwater Intelligence</h2>
          <p className="text-sm text-txt-muted/80 max-w-xl mb-6">
            From data collection to actionable insights — we provide end-to-end solutions for smarter and safer coastal infrastructure.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((s, i) => (
              <div
                key={s.title}
                className="card-panel p-4 group cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent/10 to-accent-light/5 border border-accent/10 flex items-center justify-center text-accent-light mb-3 group-hover:border-accent/25 transition-colors">
                  <s.icon size={20} />
                </div>
                <p className="text-sm font-semibold text-white mb-1">{s.title}</p>
                <p className="text-xs text-txt-muted leading-relaxed mb-3">{s.desc}</p>
                <ArrowRight size={15} className="text-accent/60 group-hover:text-accent-light group-hover:translate-x-1 transition-all" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* STONE DATABASE SECTION */}
      <div className="mx-4 lg:mx-6 mb-8">
        <p className="text-xs text-txt-muted mb-1 flex items-center gap-1.5">
          <span className="text-accent-light font-semibold">Zone 03</span>
          <span className="text-ocean-600">›</span>
          <span>Stone Database</span>
        </p>
        <h2 className="text-xl font-bold text-white mb-1">Stone Database</h2>
        <p className="text-sm text-txt-muted mb-4">View and manage detailed information of each armour stone in the selected zone.</p>

        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_280px] gap-4">
          <div className="card-panel p-3 hidden lg:block">
            <p className="text-xs font-semibold text-txt-muted mb-2 px-1">All Zones</p>
            <div className="space-y-0.5 max-h-72 overflow-y-auto scrollbar-thin">
              {zones.map((z) => (
                <button
                  key={z}
                  onClick={() => setZone(z)}
                  className={`w-full text-left text-xs px-3 py-2 rounded-lg transition-all ${zone === z ? 'bg-accent-dim text-accent-light font-semibold border border-accent/15' : 'text-txt-muted hover:bg-white/5 hover:text-txt-primary border border-transparent'}`}
                >
                  {z}
                </button>
              ))}
            </div>
          </div>

          <div className="card-panel overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-txt-muted border-b border-white/5">
                  <th className="text-left font-medium px-4 py-3">Stone ID</th>
                  <th className="text-left font-medium px-3 py-3">Size (m)</th>
                  <th className="text-left font-medium px-3 py-3">Position (X, Y, Z)</th>
                  <th className="text-left font-medium px-3 py-3">Orientation</th>
                  <th className="text-left font-medium px-3 py-3">Status</th>
                  <th className="text-left font-medium px-3 py-3">Remaining Life</th>
                </tr>
              </thead>
              <tbody>
                {zoneStones.map((s) => (
                  <tr key={s.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-2.5 font-medium text-white">{s.id}</td>
                    <td className="px-3 py-2.5 text-txt-muted">{s.size}</td>
                    <td className="px-3 py-2.5 text-txt-muted">{s.position}</td>
                    <td className="px-3 py-2.5 text-txt-muted">{s.orientation}</td>
                    <td className="px-3 py-2.5">
                      <span className={`badge ${statusBg[s.status]}`}>{s.status}</span>
                    </td>
                    <td className="px-3 py-2.5 text-txt-muted">{s.remainingLife} yrs</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card-panel p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-white">Stone ID : {zoneStones[0]?.id}</p>
              <span className="badge bg-danger-dim text-danger border-danger/15">Damaged</span>
            </div>
            <div className="w-full h-32 rounded-xl overflow-hidden mb-3 bg-gradient-to-br from-ocean-600 via-ocean-700 to-ocean-800 border border-white/5 relative">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,159,224,0.1),transparent_70%)]" />
            </div>
            <div className="space-y-2 text-xs">
              {[
                ['Size', zoneStones[0]?.size],
                ['Position', zoneStones[0]?.position],
                ['Orientation', zoneStones[0]?.orientation],
                ['Weight (Est.)', `${zoneStones[0]?.weight} Ton`],
                ['Material', zoneStones[0]?.material],
                ['Neighbour Count', zoneStones[0]?.neighbourCount],
                ['Last Updated', zoneStones[0]?.lastUpdated],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between">
                  <span className="text-txt-muted">{k}</span>
                  <span className="text-slate-200 font-medium">{v}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-4">
              <button className="btn-outline flex-1 py-2 text-xs font-semibold">View Details</button>
              <button className="btn-primary flex-1 py-2 text-xs font-semibold">View on Map</button>
            </div>
          </div>
        </div>
      </div>

      {/* ABOUT SECTION */}
      <div className="dashboard-surface relative mx-4 lg:mx-6 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-ocean-800/60 to-ocean-900/80" />
          <div className="absolute inset-0 opacity-15">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,159,224,0.12),transparent_70%)]" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-950/60 to-ocean-950/90" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

        <div className="relative px-5 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-accent-light/90 text-xs font-semibold tracking-widest uppercase mb-2">About Us</p>
            <h2 className="text-2xl font-bold text-white mb-3">Built for a Stronger, Safer Tomorrow</h2>
            <p className="text-sm text-txt-muted/80 mb-6 max-w-md">
              SOLVYN AI is an intelligent breakwater monitoring system that combines advanced sensors, AI and data analytics to detect, predict and prevent structural failures — keeping our coasts and communities safer.
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-4">
              {aboutFeatures.map((f) => (
                <div key={f.title} className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-accent/8 border border-accent/10 flex items-center justify-center text-accent-light/80 shrink-0">
                    <f.icon size={14} />
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
          <div className="relative rounded-2xl overflow-hidden h-64 lg:h-80 bg-gradient-to-br from-ocean-700/60 via-ocean-800/70 to-ocean-900/80 border border-white/5">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,159,224,0.08),transparent_70%)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/60 to-transparent" />
            <p className="absolute bottom-3 left-4 text-xs text-txt-muted/60 italic">"Building Stronger Breakwaters"</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatBox({ icon: Icon, label, value, sub, subClass = 'text-txt-muted', valueClass = 'text-white', iconBg = 'bg-accent-dim text-accent-light' }) {
  return (
    <div className="stat-panel px-3.5 py-3.5 flex items-start gap-2.5 min-w-0">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>
        <Icon size={16} />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] text-txt-muted leading-tight">{label}</p>
        <p className={`text-lg font-bold mt-1 ${valueClass}`}>{value}</p>
        <p className={`text-[10px] mt-0.5 ${subClass}`}>{sub}</p>
      </div>
    </div>
  )
}
