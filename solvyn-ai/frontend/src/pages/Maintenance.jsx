import { useState } from 'react'
import {
  Wrench, ShieldAlert, AlertTriangle, ShieldCheck, Clock, ChevronRight, Sun, Waves,
  MapPin, Compass, Box, Download, Calendar, CheckCircle2, Info,
} from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import { recommendedActions, priorityColor, actionColor, interventionComparison } from '../data/maintenance.js'

export default function Maintenance() {
  const [zone, setZone] = useState('Zone 03')
  const [selectedRow, setSelectedRow] = useState('R-007')

  return (
    <div className="dark-page pb-16">
      <PageHeader
        icon={Wrench}
        crumbs={[{ label: 'Home', path: '/' }, { label: 'Maintenance Recommendation' }]}
        title="Maintenance Recommendation"
        subtitle="AI-driven recommendations for optimal, cost-effective and safe breakwater maintenance."
        right={
          <div className="stat-panel px-4 py-2.5 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Sun size={18} className="text-warning" />
              <div>
                <p className="text-sm font-bold text-white leading-none">32°C</p>
                <p className="text-[10px] text-txt-muted">Partly Cloudy</p>
              </div>
            </div>
            <div className="w-px h-7 bg-white/10" />
            <div className="flex items-center gap-2">
              <Waves size={18} className="text-accent-light" />
              <div>
                <p className="text-sm font-bold text-white leading-none">1.8 m</p>
                <p className="text-[10px] text-txt-muted flex items-center gap-1"><MapPin size={9} />Chennai Coast</p>
              </div>
            </div>
          </div>
        }
      />

      <div className="px-4 lg:px-6 mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatBox icon={Box} label="Total Stones" value="12" sub="Active Zones" color="text-accent" iconBg="bg-accent-dim" />
        <StatBox icon={AlertTriangle} label="Affected Stones" value="6" sub="Requires Action" color="text-warning" iconBg="bg-warning-dim" />
        <StatBox icon={ShieldAlert} label="Critical Risk" value="2" sub="Immediate Attention" color="text-danger" iconBg="bg-danger-dim" />
        <StatBox icon={Clock} label="Avg. Reinspection" value="4.3 Years" sub="Across all zones" color="text-accent" iconBg="bg-accent-dim" />
      </div>

      <div className="px-4 lg:px-6 mt-4 grid grid-cols-1 xl:grid-cols-[1.7fr_1fr] gap-4">
        {/* Recommended Actions */}
        <div className="card-panel p-4">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2 text-white font-semibold text-sm">
              <Wrench size={16} className="text-accent-light" /> Recommended Actions
            </div>
            <div className="flex gap-2">
              <select value={zone} onChange={(e) => setZone(e.target.value)} className="input-dark px-3 py-1.5 text-xs">
                <option>Zone 03</option><option>Zone 04</option><option>Zone 05</option>
              </select>
              <select className="input-dark px-3 py-1.5 text-xs">
                <option>All Priorities</option><option>Critical</option><option>High</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto -mx-4">
            <table className="w-full text-xs min-w-[640px]">
              <thead>
                <tr className="text-txt-muted border-b border-white/5">
                  <th className="w-1"></th>
                  <th className="px-2 py-2 text-left font-medium">Stone ID</th>
                  <th className="px-2 py-2 text-left font-medium">Condition</th>
                  <th className="px-2 py-2 text-left font-medium">Displacement</th>
                  <th className="px-2 py-2 text-left font-medium">Prop. Risk</th>
                  <th className="px-2 py-2 text-left font-medium">Stability</th>
                  <th className="px-2 py-2 text-left font-medium">Recommended Action</th>
                  <th className="px-2 py-2 text-left font-medium">Priority</th>
                  <th className="px-2 py-2 text-left font-medium">Confidence</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {recommendedActions.map((r) => (
                  <tr
                    key={r.id}
                    onClick={() => setSelectedRow(r.id)}
                    className={`border-b border-white/5 hover:bg-white/[0.03] cursor-pointer ${selectedRow === r.id ? 'bg-white/[0.04]' : ''}`}
                  >
                    <td className={`w-1 ${actionColor[r.action]}`} style={{ width: 4 }}></td>
                      <td className="px-2 py-2.5 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-gradient-to-br from-ocean-600 to-ocean-800 flex items-center justify-center overflow-hidden shrink-0 border border-accent/20">
                      </div>
                      <span className="text-white font-medium">{r.id}</span>
                    </td>
                    <td className="px-2 py-2.5 text-danger font-medium">{r.condition}</td>
                    <td className="px-2 py-2.5 text-txt-muted">{r.displacement}</td>
                    <td className="px-2 py-2.5 text-txt-muted">{r.risk}</td>
                    <td className="px-2 py-2.5 text-txt-muted">{r.stability}</td>
                    <td className="px-2 py-2.5">
                      <span className={`badge text-white ${actionColor[r.action]}`}>{r.action} <ChevronRight size={11} /></span>
                    </td>
                    <td className="px-2 py-2.5"><span className={`badge ${priorityColor[r.priority]}`}>{r.priority}</span></td>
                    <td className="px-2 py-2.5 text-success font-semibold">{r.confidence}%</td>
                    <td className="px-2 py-2.5"><ChevronRight size={14} className="text-txt-dim" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Zone Overview + priority map */}
        <div className="space-y-4">
          <div className="card-panel p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-white">Zone 03 – Maintenance Overview</p>
            </div>
            <div className="relative rounded-xl overflow-hidden h-40 bg-gradient-to-br from-ocean-700 via-ocean-800 to-ocean-900 border border-accent/20">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.08),transparent_70%)]" />
              <div className="absolute inset-0 bg-black/20" />
              {[
                { top: '25%', left: '35%', id: 'R-003', color: 'bg-danger' },
                { top: '55%', left: '55%', id: 'R-007', color: 'bg-orange-500' },
              ].map((d) => (
                <span key={d.id} className={`absolute text-[9px] font-semibold text-white px-2 py-0.5 rounded-full ${d.color}`} style={{ top: d.top, left: d.left }}>{d.id}</span>
              ))}
              <div className="absolute top-2 left-2 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white text-[8px] font-bold">N</div>
              <div className="absolute top-2 right-2 bg-black/50 rounded-lg px-2 py-1.5 text-[9px] text-white space-y-1">
                <LegendDot color="bg-danger" label="Critical" />
                <LegendDot color="bg-orange-500" label="High" />
                <LegendDot color="bg-warning" label="Medium" />
                <LegendDot color="bg-success" label="Low" />
              </div>
            </div>
            <button className="btn-primary w-full py-2 text-xs font-semibold mt-3 flex items-center justify-center gap-1.5">
              <Box size={13} /> View Zone 03 in 3D
            </button>
          </div>

          <div className="card-panel p-4">
            <p className="text-sm font-semibold text-white mb-4">Maintenance Priority Map</p>
            <div className="flex items-center justify-between">
              {[
                { id: 'R-003', color: 'ring-danger text-danger', tag: 'Higher risk' },
                { id: 'R-007', color: 'ring-orange-400 text-orange-400', tag: '' },
                { id: 'R-012', color: 'ring-warning text-warning', tag: 'Medium risk' },
                { id: 'R-018', color: 'ring-accent text-accent', tag: 'Lower risk' },
              ].map((n, i) => (
                <div key={n.id} className="flex items-center">
                  <div className="flex flex-col items-center gap-1">
                    <div className={`w-11 h-11 rounded-full bg-gradient-to-br from-ocean-600 to-ocean-800 ring-2 ${n.color} flex items-center justify-center overflow-hidden shrink-0 border border-accent/20`}>
                    </div>
                    <span className={`text-[10px] font-semibold ${n.color.split(' ')[1]}`}>{n.id}</span>
                    {n.tag && <span className="text-[9px] text-txt-dim">{n.tag}</span>}
                  </div>
                  {i < 3 && <ChevronRight size={14} className="text-txt-dim mx-1" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 lg:px-6 mt-4 grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Minimum intervention analysis */}
        <div className="card-panel p-4">
          <div className="flex items-center gap-2 text-white font-semibold text-sm mb-4">
            <ShieldCheck size={16} className="text-accent-light" /> Minimum Intervention Analysis <Info size={12} className="text-txt-dim" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-4">
            <div className="stat-panel p-3 text-center">
              <div className="w-14 h-14 rounded-lg overflow-hidden mx-auto mb-2 bg-gradient-to-br from-ocean-600 to-ocean-800 border border-accent/20">
              </div>
              <p className="text-[10px] text-txt-muted">Recommended Action</p>
              <p className="text-sm font-bold text-warning mb-2">Reposition</p>
              <ul className="text-left text-[10px] text-txt-muted space-y-1 mb-2">
                <li className="flex items-start gap-1"><CheckCircle2 size={11} className="text-success mt-0.5 shrink-0" /> Restores stability</li>
                <li className="flex items-start gap-1"><CheckCircle2 size={11} className="text-success mt-0.5 shrink-0" /> Lower cost than replacement</li>
                <li className="flex items-start gap-1"><CheckCircle2 size={11} className="text-success mt-0.5 shrink-0" /> Reduces propagation risk</li>
              </ul>
              <span className="badge bg-success-dim text-success">Optimal Choice</span>
            </div>
            <div>
              <table className="w-full text-[11px]">
                <thead>
                <tr className="text-txt-muted border-b border-white/5">
                    <th className="text-left font-medium py-1.5">Action</th>
                    <th className="text-left font-medium py-1.5">Cost (Est.)</th>
                    <th className="text-left font-medium py-1.5">Risk Reduction</th>
                    <th className="text-left font-medium py-1.5">Residual Risk</th>
                  </tr>
                </thead>
                <tbody>
                  {interventionComparison.map((row) => (
                    <tr key={row.action} className={`border-b border-white/5 ${row.recommended ? 'bg-accent/15' : ''}`}>
                      <td className="py-2 text-txt-primary">{row.action}</td>
                      <td className="py-2 text-txt-muted">{row.cost}</td>
                      <td className="py-2 text-success">{row.riskReduction}%</td>
                      <td className="py-2 text-txt-muted">{row.residualRisk}%
                        {row.recommended && <span className="badge bg-accent/40 text-accent ml-2">Recommended</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex gap-3 mt-3">
                <div className="stat-panel px-3 py-2 flex-1">
                  <p className="text-[10px] text-txt-muted">Total Estimated Cost (Selected Plan)</p>
                  <p className="text-sm font-bold text-white">₹ 1.8 Lakhs</p>
                </div>
                <div className="stat-panel px-3 py-2 flex-1">
                  <p className="text-[10px] text-txt-muted">Expected Risk Reduction</p>
                  <p className="text-sm font-bold text-success">76% → 19%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Generated work order */}
        <div className="card-panel p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-white font-semibold text-sm">
              <Wrench size={16} className="text-accent-light" /> Generated Work Order
            </div>
            <button className="btn-outline px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5"><Download size={12} /> Download PDF</button>
          </div>
          <div className="flex items-start gap-3 mb-3">
            <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-gradient-to-br from-ocean-600 to-ocean-800 border border-accent/20">
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Stone ID: <span className="text-accent-light">R-007</span></p>
              <span className="badge bg-orange-500/20 text-orange-400 mt-1">High Priority</span>
            </div>
          </div>
          <div className="space-y-2 text-xs mb-3">
            <Row k="Recommended Action" v="Reposition + Void Restoration" />
            <Row k="Zone" v="Zone 03" />
            <Row k="Estimated Resources" v="Labour: 3 · Excavator: 1 · Material: Medium" />
            <Row k="Estimated Cost" v="₹ 45,000 (approx.)" />
            <Row k="Expected Risk" v="Before: 76%  →  After: 19%" />
            <div className="flex items-center justify-between">
              <span className="text-txt-muted">Status</span>
              <span className="badge bg-warning-dim text-warning"><Clock size={11} /> Awaiting Engineer Approval</span>
            </div>
          </div>
          <button className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] text-xs text-txt-muted font-medium">
            <span className="flex items-center gap-2"><Calendar size={14} /> Maintenance History</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <div className="px-4 lg:px-6 mt-4">
        <div className="card-panel p-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <Info size={18} className="text-accent-light mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-white">Reinspection Recommendation</p>
              <p className="text-xs text-txt-muted mt-0.5">Stone R-012 shows <span className="text-warning font-semibold">42% confidence</span> due to partial occlusion. Recommended: Low-tide oblique image (R-012 + R-011 + R-013).</p>
            </div>
          </div>
          <button className="btn-primary px-4 py-2 text-xs font-semibold flex items-center gap-1.5 shrink-0">
            <Calendar size={14} /> Plan Reinspection
          </button>
        </div>
      </div>
    </div>
  )
}

function StatBox({ icon: Icon, label, value, sub, color, iconBg }) {
  return (
    <div className="stat-panel px-3.5 py-3.5 flex items-start gap-2.5">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${iconBg} ${color}`}>
        <Icon size={16} />
      </div>
      <div>
        <p className="text-[11px] text-txt-muted">{label}</p>
        <p className={`text-lg font-bold mt-0.5 ${color}`}>{value}</p>
        <p className="text-[10px] text-txt-dim mt-0.5">{sub}</p>
      </div>
    </div>
  )
}

function Row({ k, v }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-txt-muted shrink-0">{k}</span>
      <span className="text-txt-primary font-medium text-right">{v}</span>
    </div>
  )
}

function LegendDot({ color, label }) {
  return <div className="flex items-center gap-1"><span className={`w-1.5 h-1.5 rounded-full ${color}`} /> {label}</div>
}
