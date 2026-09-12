import { useState } from 'react'
import {
  FileText, Waves, Image as ImageIcon, Layers, Database, Clock, Wrench, Boxes, FileBarChart,
  CloudSun, ChevronDown, Download, Star, CheckCircle2, Home, Grid3x3, Rotate3d,
} from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'

const sections = [
  { icon: Waves, title: 'Wave Analysis Report', desc: 'Wave data, activity, loading impact', on: true },
  { icon: ImageIcon, title: 'Pre & Post Analysis Report', desc: 'Image comparison, displacement, damage', on: true },
  { icon: Layers, title: 'Combined Analysis Report', desc: 'AI verification & cross validation', on: true },
  { icon: Database, title: 'Stone Database Summary', desc: 'Zone-wise stone details', on: true },
  { icon: Clock, title: 'Lifespan & Risk Analysis', desc: 'Remaining life, risk score, failure prediction', on: true },
  { icon: Wrench, title: 'Maintenance Recommendation', desc: 'Replace / Monitor / Leave as is', on: true },
  { icon: Boxes, title: 'Optimized Structure Recommendation', desc: 'Better lifespan, material, design', on: true },
  { icon: CloudSun, title: 'Environmental & Wave Forecast', desc: 'Future wave conditions, risk', on: true },
]

const reportTabs = ['Summary', 'Detailed Analysis', 'Recommendations', 'Appendix']

const defects = [
  { id: 'S-3057', risk: 'Critical', life: '1.2 yrs', status: 'Replace' },
  { id: 'S-3061', risk: 'High', life: '1.8 yrs', status: 'Replace' },
  { id: 'S-3083', risk: 'Moderate', life: '4.3 yrs', status: 'Monitor' },
  { id: 'S-3102', risk: 'Moderate', life: '5.1 yrs', status: 'Monitor' },
  { id: 'S-3120', risk: 'Low', life: '6.7 yrs', status: 'Leave' },
]

const riskColor = { Critical: 'text-danger', High: 'text-orange-400', Moderate: 'text-warning', Low: 'text-success' }
const statusColor = { Replace: 'bg-rose-600/70', Monitor: 'bg-amber-500/70', Leave: 'bg-emerald-500/70' }

export default function Reports() {
  const [enabled, setEnabled] = useState(sections.map(() => true))
  const [tab, setTab] = useState('Summary')
  const [format, setFormat] = useState('PDF')

  return (
    <div className="dark-page pb-16">
      <PageHeader
        icon={FileText}
        crumbs={[{ label: 'Home', path: '/' }, { label: 'Report Generation' }]}
        title="Report Generation"
        subtitle="Select the analysis results you want to include in the report."
      />

      <div className="px-4 lg:px-6 mt-4 grid grid-cols-1 xl:grid-cols-[320px_1fr_1fr] gap-4">
        {/* left: section selector */}
        <div className="card-panel p-4 h-fit">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-white">Report Sections</p>
            <button
              onClick={() => setEnabled(sections.map(() => true))}
              className="text-[11px] text-accent-light font-semibold"
            >
              Select All
            </button>
          </div>
          <div className="space-y-1">
            {sections.map((s, i) => (
              <div key={s.title} className="flex items-center gap-2.5 py-2">
                <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center text-accent-light shrink-0">
                  <s.icon size={15} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-white truncate">{s.title}</p>
                  <p className="text-[10px] text-txt-dim truncate">{s.desc}</p>
                </div>
                <button
                  onClick={() => setEnabled((e) => e.map((v, idx) => idx === i ? !v : v))}
                  className="w-9 h-5 rounded-full relative shrink-0"
                  style={{ background: enabled[i] ? '#22d3ee' : 'rgba(255,255,255,0.1)' }}
                >
                  <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${enabled[i] ? 'translate-x-[18px]' : 'translate-x-0.5'}`} />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-white/5">
            <p className="text-sm font-semibold text-white mb-3">Report Settings</p>
            <div className="space-y-3 text-xs">
              <div>
                <p className="text-txt-muted mb-1">Report Title</p>
                <input defaultValue="Breakwater Health Analysis Report" className="input-dark w-full px-3 py-2 text-xs" />
              </div>
              <div>
                <p className="text-txt-muted mb-1.5">Report Format</p>
                <div className="flex gap-2">
                  {['PDF', 'PPT', 'DOCX'].map((f) => (
                    <button
                      key={f}
                      onClick={() => setFormat(f)}
                      className={`flex-1 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 ${format === f ? 'bg-accent text-white' : 'bg-white/5 text-txt-muted'}`}
                    >
                      <FileText size={12} /> {f}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-txt-muted mb-1">Date Range</p>
                <div className="input-dark px-3 py-2 flex items-center justify-between">Last 3 Months <ChevronDown size={12} className="text-txt-dim" /></div>
              </div>
            </div>
            <button className="btn-primary w-full py-2.5 text-sm font-semibold mt-4 flex items-center justify-center gap-2">
              <FileText size={15} /> Generate Report
            </button>
          </div>
        </div>

        {/* middle: 3D viewer + stats */}
        <div className="space-y-4 min-w-0">
          <div className="card-panel p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs text-txt-dim flex items-center gap-1"><Home size={11} /> Report Generation <span>›</span> Zone 03</p>
                <p className="text-sm font-semibold text-white mt-1">Zone 03 – 3D View</p>
                <p className="text-[10px] text-txt-dim">Interactive 3D model of armour stone structure</p>
              </div>
              <p className="text-[10px] text-txt-dim shrink-0">Last Updated: 12 May 2025 · 14:32</p>
            </div>
            <div className="relative rounded-xl overflow-hidden h-52 bg-gradient-to-br from-ocean-700 via-ocean-800 to-ocean-900 border border-accent/20">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.12),transparent_70%)]" />
              <div className="absolute inset-0 bg-black/20" />
              {['Zone 01', 'Zone 02', 'Zone 03'].map((z, i) => (
                <span key={z} className={`absolute text-[9px] font-semibold px-2 py-0.5 rounded-full ${i === 2 ? 'bg-accent text-white' : 'bg-black/50 text-txt-primary'}`} style={{ top: `${20 + i * 15}%`, left: `${25 + i * 15}%` }}>{z}</span>
              ))}
              <div className="absolute top-2 right-2 bg-black/50 rounded-lg px-2 py-1.5 text-[9px] text-white space-y-1">
                <LegendDot color="bg-success" label="Minor Risk" />
                <LegendDot color="bg-warning" label="Moderate Risk" />
                <LegendDot color="bg-orange-500" label="High Risk" />
                <LegendDot color="bg-danger" label="Critical" />
              </div>
              <button className="absolute bottom-2 right-2 btn-outline !bg-black/50 px-2.5 py-1 text-[10px] font-semibold flex items-center gap-1"><Rotate3d size={11} /> Rotate</button>
            </div>
            <div className="grid grid-cols-6 gap-1.5 mt-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className={`rounded-lg overflow-hidden h-10 bg-gradient-to-br from-ocean-700 to-ocean-800 ${i === 2 ? 'ring-2 ring-accent' : 'opacity-60'}`} />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatBox icon={Home} label="Total Zones" value="5" sub="Active Zones" />
            <StatBox icon={Grid3x3} label="Total Stones" value="2,480" sub="Zone 03" />
            <StatBox icon={Waves} label="Avg. Wave Activity" value="2.6 m" sub="Last 7 Days" />
            <StatBox icon={Clock} label="Avg. Remaining Life" value="7.8 years" sub="Zone 03" />
          </div>

          <div className="card-panel p-4">
            <p className="text-sm font-semibold text-white mb-3">Defected Stone Overview (Zone 03)</p>
            <div className="flex items-center gap-4">
              <div className="relative w-24 h-24 shrink-0">
                <svg viewBox="0 0 36 36" className="w-24 h-24 -rotate-90">
                  <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
                  <circle cx="18" cy="18" r="15.5" fill="none" stroke="#ef4444" strokeWidth="4" strokeDasharray="97.4" strokeDashoffset="0" strokeLinecap="round" />
                  <circle cx="18" cy="18" r="15.5" fill="none" stroke="#fbbf24" strokeWidth="4" strokeDasharray="97.4" strokeDashoffset="-33" strokeLinecap="round" />
                  <circle cx="18" cy="18" r="15.5" fill="none" stroke="#34d399" strokeWidth="4" strokeDasharray="97.4" strokeDashoffset="-63" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-lg font-bold text-white">18</p>
                  <p className="text-[8px] text-txt-muted">Defected Stones</p>
                </div>
              </div>
              <div className="flex-1 space-y-1.5 text-xs">
                <div className="flex items-center justify-between"><LegendDot color="bg-danger" label="Replace Immediately" /><span className="text-white font-semibold">6</span></div>
                <div className="flex items-center justify-between"><LegendDot color="bg-warning" label="Monitor" /><span className="text-white font-semibold">7</span></div>
                <div className="flex items-center justify-between"><LegendDot color="bg-success" label="Leave as is" /><span className="text-white font-semibold">5</span></div>
              </div>
            </div>
            <table className="w-full text-[11px] mt-3">
                <thead><tr className="text-txt-dim border-b border-white/5"><th className="text-left font-medium py-1">Stone ID</th><th className="text-left font-medium py-1">Risk Score</th><th className="text-left font-medium py-1">Status</th><th className="text-left font-medium py-1">Life</th></tr></thead>
              <tbody>
                {[['S-3057', 0.92, 'Replace', '1.2 yrs'], ['S-3061', 0.87, 'Replace', '1.8 yrs'], ['S-3083', 0.76, 'Monitor', '4.3 yrs'], ['S-3102', 0.71, 'Monitor', '5.1 yrs'], ['S-3120', 0.68, 'Leave', '6.7 yrs']].map((r) => (
                  <tr key={r[0]} className="border-b border-white/5">
                    <td className="py-1.5 text-white font-medium">{r[0]}</td>
                    <td className="py-1.5 text-danger">{r[1]}</td>
                    <td className="py-1.5"><span className={`badge ${r[2] === 'Replace' ? 'bg-danger-dim text-danger' : r[2] === 'Monitor' ? 'bg-warning-dim text-warning' : 'bg-success-dim text-success'}`}>{r[2]}</span></td>
                    <td className="py-1.5 text-txt-muted">{r[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="text-accent-light text-xs font-semibold mt-3 flex items-center gap-1">View Full Database →</button>
          </div>
        </div>

        {/* right: generated report preview */}
        <div className="card-panel p-4 min-w-0">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-white">Generated Report</p>
            <button className="btn-primary px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5"><Download size={12} /> Download Report</button>
          </div>
          <div className="flex bg-white/5 rounded-lg p-1 text-[11px] mb-4 overflow-x-auto">
            {reportTabs.map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`px-3 py-1.5 rounded-md font-medium whitespace-nowrap ${tab === t ? 'bg-accent text-white' : 'text-txt-muted'}`}>{t}</button>
            ))}
          </div>

          <div className="space-y-5 text-xs max-h-[600px] overflow-y-auto scrollbar-thin pr-1">
            <div>
              <p className="text-sm font-semibold text-white mb-2">1. Defected Stones Based on Lifespan</p>
              <p className="text-[10px] text-txt-dim mb-2">Stones are arranged by remaining life (lowest to highest).</p>
              <table className="w-full text-[10px]">
                <thead><tr className="text-txt-dim border-b border-white/5"><th className="text-left py-1"></th><th className="text-left py-1">Stone ID</th><th className="text-left py-1">Risk</th><th className="text-left py-1">Life</th><th className="text-left py-1">Status</th></tr></thead>
                <tbody>
                  {defects.map((d) => (
                    <tr key={d.id} className="border-b border-white/5">
                      <td className="py-1.5"><input type="checkbox" defaultChecked /></td>
                      <td className="py-1.5 text-white font-medium">{d.id}</td>
                      <td className={`py-1.5 ${riskColor[d.risk]}`}>{d.risk}</td>
                      <td className="py-1.5 text-txt-muted">{d.life}</td>
                      <td className="py-1.5"><span className={`badge text-white ${statusColor[d.status]}`}>{d.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <p className="text-sm font-semibold text-white mb-2">2. Stone Replacement Analysis</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="stat-panel p-3 !bg-rose-950/30 border-danger/20">
                  <p className="text-xs font-semibold text-danger mb-1.5">Replace Recommended (6 Stones)</p>
                  <p className="text-[10px] text-txt-muted mb-1.5">Why?</p>
                  <ul className="text-[10px] text-txt-muted space-y-1">
                    <li>Structural damage (cracks/breakage)</li>
                    <li>High movement & instability</li>
                    <li>Located in high wave exposure zone</li>
                    <li>Risk of failure propagation to neighbours</li>
                  </ul>
                </div>
                <div className="stat-panel p-3 !bg-emerald-950/30 border-success/20">
                  <p className="text-xs font-semibold text-success mb-1.5">Can Leave as it is (5 Stones)</p>
                  <p className="text-[10px] text-txt-muted mb-1.5">Consequences if not replaced:</p>
                  <ul className="text-[10px] text-txt-muted space-y-1">
                    <li>Reduced structural stability</li>
                    <li>Potential for future displacement</li>
                    <li>Increased maintenance cost</li>
                    <li>Shortened lifespan of adjacent stones</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-white mb-2">3. Recommended Armour Stone Structure</p>
              <div className="flex gap-3">
                <div className="w-24 h-20 rounded-lg overflow-hidden shrink-0 bg-gradient-to-br from-ocean-700 to-ocean-800 border border-accent/20">
                  <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.15),transparent_70%)]" />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-white">Double Layer Armour (Core + Secondary)</p>
                    <span className="badge bg-success-dim text-success">+25%</span>
                  </div>
                  <p className="text-[10px] text-txt-muted mb-1.5">Expected Lifespan Increase</p>
                  <ul className="text-[10px] text-txt-muted space-y-0.5">
                    <li className="flex items-center gap-1"><CheckCircle2 size={10} className="text-success" /> Better interlocking</li>
                    <li className="flex items-center gap-1"><CheckCircle2 size={10} className="text-success" /> Higher stability under wave load</li>
                    <li className="flex items-center gap-1"><CheckCircle2 size={10} className="text-success" /> Reduced voids & movement</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-white mb-2">4. Executive Summary</p>
              <p className="text-[11px] text-txt-muted leading-relaxed">
                By replacing 6 critical stones and adopting the recommended double-layer structure with granite material, the estimated lifespan of the breakwater can be increased by 25%, reducing the risk of progressive failure and long-term maintenance costs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatBox({ icon: Icon, label, value, sub }) {
  return (
    <div className="stat-panel px-3.5 py-3.5 flex items-start gap-2.5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-sky-500/15 text-accent">
        <Icon size={16} />
      </div>
      <div>
        <p className="text-[11px] text-txt-muted">{label}</p>
        <p className="text-lg font-bold mt-0.5 text-white">{value}</p>
        <p className="text-[10px] text-txt-dim mt-0.5">{sub}</p>
      </div>
    </div>
  )
}

function LegendDot({ color, label }) {
  return <div className="flex items-center gap-1.5"><span className={`w-2 h-2 rounded-full ${color}`} /> {label}</div>
}
