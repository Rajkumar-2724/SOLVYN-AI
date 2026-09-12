import { useState } from 'react'
import {
  Waves, Play, RotateCcw, Wifi, RefreshCw, UploadCloud, KeyRound, FileCheck2,
  AlertTriangle, ShieldAlert, ShieldQuestion, ShieldCheck, Lightbulb, ClipboardList,
  Eye, Sparkles, Clock, Compass, Zap,
} from 'lucide-react'
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  AreaChart, Area, ReferenceDot, ReferenceLine,
} from 'recharts'
import { waveTrend, waveHeightOverview, riskZones } from '../data/waveData.js'

const severityColor = { High: 'bg-danger-dim text-danger', Medium: 'bg-warning-dim text-warning', Low: 'bg-success-dim text-success' }

export default function WaveAnalysis() {
  const [zoneImport, setZoneImport] = useState(true)

  return (
    <div className="dark-page pb-16">
      {/* top bar */}
      <div className="px-4 lg:px-6 pt-4">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3 text-xs">
            <span className="text-txt-muted">Service</span><span className="text-slate-600">›</span><span className="text-accent-light">Wave Analysis</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="badge bg-success-dim text-success"><Wifi size={12} /> API Connected · Live Data</span>
            <button className="btn-primary px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5"><RefreshCw size={12} /> Sync Now</button>
          </div>
        </div>

        <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/30 to-accent/20 flex items-center justify-center text-accent-light">
              <Waves size={20} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Wave Analysis</h1>
              <p className="text-sm text-txt-muted mt-1 max-w-lg">Analyze wave data (real-time or uploaded) to understand wave characteristics and get insights for coastal protection and structural safety.</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button className="btn-primary px-4 py-2.5 text-sm font-semibold flex items-center gap-2"><Play size={15} /> Start Wave Analysis</button>
            <button className="btn-outline px-4 py-2.5 text-sm font-semibold flex items-center gap-2"><RotateCcw size={15} /> Reset Analysis</button>
          </div>
        </div>
      </div>

      {/* Wave data import */}
      <div className="px-4 lg:px-6">
        <div className="card-panel p-4 grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr_260px] gap-4 mb-4">
          <ImportCard icon={UploadCloud} title="Automatic Wave Data Import" desc="Fetch wave data automatically from external ocean data sources using your API key." btnLabel="Import via API Key" btnIcon />
          <ImportCard icon={FileCheck2} title="Manual Wave Data Import" desc="Upload your wave data file (CSV, XLSX, or TXT) for analysis." btnLabel="Upload Wave Data" />
          <ImportCard icon={KeyRound} title="API Key Input (Modal)" desc="Enter your API key to connect with ocean data sources." btnLabel="Configure API Key" />
          <div className="stat-panel p-4">
            <p className="text-xs font-semibold text-white mb-3">Selected File</p>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-accent/15 flex items-center justify-center text-accent-light shrink-0"><FileCheck2 size={16} /></div>
              <div className="min-w-0">
                <p className="text-xs text-white font-medium truncate">wave_data_sample.csv</p>
                <p className="text-[10px] text-txt-dim">2.4 MB · CSV</p>
              </div>
              <ShieldCheck size={16} className="text-success ml-auto shrink-0" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-4 mb-4">
          {/* Wave Analysis chart */}
          <div className="card-panel p-4">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2 text-white font-semibold text-sm">
                <Waves size={16} className="text-accent-light" /> Wave Analysis
              </div>
              <div className="flex items-center gap-3 text-[11px] text-txt-muted">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-0.5 bg-accent inline-block" /> Wave Direction (°)</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-0.5 bg-warning inline-block border-dashed" style={{ borderTop: '1px dashed #fbbf24', height: 0 }} /> Wave Period (s)</span>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={waveTrend} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="time" tick={{ fill: '#7e97b3', fontSize: 10 }} axisLine={{ stroke: 'rgba(255,255,255,0.08)' }} tickLine={false} />
                  <YAxis yAxisId="left" domain={[0, 360]} tick={{ fill: '#7e97b3', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis yAxisId="right" orientation="right" domain={[0, 20]} tick={{ fill: '#7e97b3', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: '#0a1c33', border: '1px solid rgba(94,168,219,0.2)', borderRadius: 10, fontSize: 12 }} />
                  <ReferenceLine yAxisId="left" y={220} stroke="#fbbf24" strokeDasharray="4 4" />
                  <Line yAxisId="left" type="monotone" dataKey="direction" stroke="#22d3ee" strokeWidth={2} dot={false} />
                  <Line yAxisId="right" type="monotone" dataKey="period" stroke="#fbbf24" strokeWidth={1.5} strokeDasharray="4 3" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Wave characteristics */}
          <div className="card-panel p-4">
            <p className="text-sm font-semibold text-white mb-3">Wave Characteristics</p>
            <div className="grid grid-cols-2 gap-3">
              <Metric icon={Waves} label="Wave Height" value="2.8 m" />
              <Metric icon={Clock} label="Wave Period" value="8.6 s" />
              <Metric icon={Compass} label="Wave Direction" value="236° (SW)" />
              <Metric icon={Zap} label="Wave Energy" value="12.4 kW/m" />
              <Metric icon={Waves} label="Water Level" value="1.2 m" />
              <Metric icon={Waves} label="Wave Frequency" value="0.116 Hz" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_1fr] gap-4 mb-4">
          {/* Wave data overview */}
          <div className="card-panel p-4">
            <div className="flex items-center gap-2 text-white font-semibold text-sm mb-2">
              <Waves size={16} className="text-accent-light" /> Wave Data Overview
            </div>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={waveHeightOverview} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="waveFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="day" tick={{ fill: '#7e97b3', fontSize: 10 }} axisLine={{ stroke: 'rgba(255,255,255,0.08)' }} tickLine={false} />
                  <YAxis domain={[0, 6]} tick={{ fill: '#7e97b3', fontSize: 10 }} axisLine={false} tickLine={false} label={{ value: 'Wave Height (m)', angle: -90, position: 'insideLeft', fill: '#7e97b3', fontSize: 10 }} />
                  <Tooltip contentStyle={{ background: '#0a1c33', border: '1px solid rgba(94,168,219,0.2)', borderRadius: 10, fontSize: 12 }} />
                  <Area type="monotone" dataKey="height" stroke="#22d3ee" strokeWidth={2} fill="url(#waveFill)" dot={{ r: 3, fill: '#22d3ee' }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI Structural Impact */}
          <div className="card-panel p-4">
            <div className="flex items-center gap-2 text-white font-semibold text-sm mb-3">
              <ShieldAlert size={16} className="text-accent-light" /> AI Structural Impact Analysis
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
              <MiniStat icon={AlertTriangle} label="Displacement Risk" value="3.2%" sub="(Low - Moderate)" color="text-warning" />
              <MiniStat icon={ShieldQuestion} label="Suspected Defects" value="5" sub="(of 48 stones)" color="text-orange-400" />
              <MiniStat icon={ShieldAlert} label="Critical Zones" value="1" sub="(Zone 03)" color="text-danger" />
              <MiniStat icon={ShieldCheck} label="Stability Score" value="87%" sub="(Good)" color="text-success" />
            </div>
            <p className="text-xs text-txt-muted mb-2">Top Risk Zones / Stones</p>
            <div className="overflow-x-auto">
              <table className="w-full text-[11px]">
                <thead><tr className="text-txt-dim border-b border-white/5">
                  <th className="text-left font-medium py-1">#</th><th className="text-left font-medium py-1">Zone</th><th className="text-left font-medium py-1">Stone ID</th>
                  <th className="text-left font-medium py-1">Displacement</th><th className="text-left font-medium py-1">Defect</th><th className="text-left font-medium py-1">Conf.</th><th className="text-left font-medium py-1">Sev.</th>
                </tr></thead>
                <tbody>
                  {riskZones.map((r) => (
                    <tr key={r.rank} className="border-b border-white/5">
                      <td className="py-1.5 text-txt-muted">{r.rank}</td>
                      <td className="py-1.5 text-txt-muted">{r.zone}</td>
                      <td className="py-1.5 text-white font-medium">{r.stoneId}</td>
                      <td className="py-1.5 text-txt-muted">{r.displacement}</td>
                      <td className="py-1.5 text-txt-muted">{r.defect}</td>
                      <td className="py-1.5 text-txt-muted">{r.confidence}%</td>
                      <td className="py-1.5"><span className={`badge ${severityColor[r.severity]}`}>{r.severity}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Analysis report */}
        <div className="card-panel p-4">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr_auto] gap-4">
            <div>
              <div className="flex items-center gap-2 text-white font-semibold text-sm mb-2">
                <ClipboardList size={16} className="text-accent-light" /> Analysis Report
              </div>
              <p className="text-xs text-txt-muted">Detailed wave characteristics, trends, and insights based on the latest data.</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-white font-semibold text-sm mb-2">
                <Lightbulb size={16} className="text-warning" /> Key Findings
              </div>
              <ul className="text-xs text-txt-muted space-y-1.5">
                <li className="flex items-center gap-1.5"><ShieldCheck size={12} className="text-success" /> Wave height is within normal range (2.8 – 4.6 m)</li>
                <li className="flex items-center gap-1.5"><ShieldCheck size={12} className="text-success" /> Wave energy increased by 15% (vs last 24h)</li>
                <li className="flex items-center gap-1.5"><ShieldCheck size={12} className="text-success" /> Dominant wave direction: SW</li>
                <li className="flex items-center gap-1.5"><ShieldCheck size={12} className="text-success" /> High-energy event detected</li>
              </ul>
            </div>
            <div>
              <p className="text-white font-semibold text-sm mb-2">Recommended Actions</p>
              <ol className="text-xs text-txt-muted space-y-1.5 list-decimal list-inside">
                <li>Inspect Zone 03 (high priority)</li>
                <li>Check S-3053 for displacement</li>
                <li>Verify S-3057 surface wear</li>
                <li>Schedule maintenance within 7 days</li>
              </ol>
            </div>
            <div className="flex flex-col gap-2 justify-end">
              <button className="btn-outline px-4 py-2.5 text-xs font-semibold flex items-center gap-2 whitespace-nowrap"><Eye size={13} /> View Full Report</button>
              <button className="btn-primary px-4 py-2.5 text-xs font-semibold flex items-center gap-2 whitespace-nowrap"><Sparkles size={13} /> Generate Report</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ImportCard({ icon: Icon, title, desc, btnLabel }) {
  return (
    <div className="stat-panel p-4 flex flex-col">
      <div className="w-9 h-9 rounded-lg bg-accent/15 flex items-center justify-center text-accent-light mb-2.5"><Icon size={17} /></div>
      <p className="text-xs font-semibold text-white mb-1">{title}</p>
      <p className="text-[10px] text-txt-muted mb-3 flex-1">{desc}</p>
      <button className="btn-outline py-1.5 text-[11px] font-semibold flex items-center justify-center gap-1.5">{btnLabel}</button>
    </div>
  )
}

function Metric({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center text-accent-light shrink-0"><Icon size={14} /></div>
      <div>
        <p className="text-[10px] text-txt-muted">{label}</p>
        <p className="text-sm font-bold text-white">{value}</p>
      </div>
    </div>
  )
}

function MiniStat({ icon: Icon, label, value, sub, color }) {
  return (
    <div className="stat-panel px-2.5 py-2.5 text-center">
      <Icon size={16} className={`mx-auto mb-1 ${color}`} />
      <p className={`text-base font-bold ${color}`}>{value}</p>
      <p className="text-[9px] text-txt-muted leading-tight">{label}</p>
      <p className="text-[9px] text-txt-dim leading-tight">{sub}</p>
    </div>
  )
}
