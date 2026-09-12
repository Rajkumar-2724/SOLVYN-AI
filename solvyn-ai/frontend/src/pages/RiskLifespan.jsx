import { useState } from 'react'
import { ShieldAlert, Gauge, TrendingDown, Clock, ChevronDown } from 'lucide-react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts'
import PageHeader from '../components/PageHeader.jsx'
import { stoneDatabase, statusBg } from '../data/stones.js'

const lifeBuckets = [
  { range: '0-1 yr', count: 8, color: '#ef4444' },
  { range: '1-3 yrs', count: 21, color: '#fb923c' },
  { range: '3-5 yrs', count: 34, color: '#fbbf24' },
  { range: '5-7 yrs', count: 46, color: '#34d399' },
  { range: '7-10 yrs', count: 39, color: '#22d3ee' },
  { range: '10+ yrs', count: 18, color: '#2dd4bf' },
]

export default function RiskLifespan() {
  const [zone, setZone] = useState('Zone 03')
  const critical = stoneDatabase.filter((s) => s.status === 'Critical' || s.status === 'Damaged').slice(0, 8)

  return (
    <div className="dark-page pb-16">
      <PageHeader
        icon={ShieldAlert}
        crumbs={[{ label: 'Home', path: '/' }, { label: 'Risk & Lifespan Prediction' }]}
        title="Risk & Lifespan Prediction"
        subtitle="AI models estimate remaining structural life and failure risk for every stone."
        right={
          <div className="relative">
            <select value={zone} onChange={(e) => setZone(e.target.value)} className="input-dark pl-3 pr-8 py-2 text-sm appearance-none">
              <option>Zone 03</option><option>Zone 04</option><option>Zone 05</option>
            </select>
            <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-txt-muted pointer-events-none" />
          </div>
        }
      />

      <div className="px-4 lg:px-6 mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatBox icon={Gauge} label="Avg. Risk Score" value="0.42" sub="Moderate" color="text-warning" iconBg="bg-warning-dim" />
        <StatBox icon={TrendingDown} label="Declining Stones" value="63" sub="Lifespan trending down" color="text-danger" iconBg="bg-danger-dim" />
        <StatBox icon={ShieldAlert} label="High Failure Risk" value="29" sub="Requires monitoring" color="text-orange-400" iconBg="bg-orange-500/15" />
        <StatBox icon={Clock} label="Avg. Remaining Life" value="6.1 Years" sub="All zones" color="text-accent" iconBg="bg-sky-500/15" />
      </div>

      <div className="px-4 lg:px-6 mt-4 grid grid-cols-1 xl:grid-cols-[1.4fr_1fr] gap-4">
        <div className="card-panel p-4">
          <p className="text-sm font-semibold text-white mb-3">Remaining Lifespan Distribution</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={lifeBuckets} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="range" tick={{ fill: '#7e97b3', fontSize: 11 }} axisLine={{ stroke: 'rgba(255,255,255,0.08)' }} tickLine={false} />
                <YAxis tick={{ fill: '#7e97b3', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: '#0a1c33', border: '1px solid rgba(94,168,219,0.2)', borderRadius: 10, fontSize: 12 }} />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {lifeBuckets.map((b, i) => <Cell key={i} fill={b.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card-panel p-4">
          <p className="text-sm font-semibold text-white mb-3">Highest Risk Stones</p>
          <div className="space-y-2.5 max-h-64 overflow-y-auto scrollbar-thin pr-1">
            {critical.map((s) => (
              <div key={s.id} className="flex items-center gap-3 stat-panel px-3 py-2.5">
                <div className="w-9 h-9 rounded-lg overflow-hidden shrink-0 bg-gradient-to-br from-ocean-600 to-ocean-800 border border-accent/20">
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-white">{s.id}</p>
                  <p className="text-[10px] text-txt-dim">{s.zone}</p>
                </div>
                <span className={`badge ${statusBg[s.status]}`}>{s.status}</span>
                <span className="text-xs font-semibold text-danger w-12 text-right">{s.remainingLife}y</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 lg:px-6 mt-4">
        <div className="card-panel overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-txt-muted border-b border-white/5">
                <th className="text-left font-medium px-4 py-3">Stone ID</th>
                <th className="text-left font-medium px-3 py-3">Zone</th>
                <th className="text-left font-medium px-3 py-3">Failure Risk</th>
                <th className="text-left font-medium px-3 py-3">Risk Score</th>
                <th className="text-left font-medium px-3 py-3">Status</th>
                <th className="text-left font-medium px-3 py-3">Remaining Life</th>
              </tr>
            </thead>
            <tbody>
              {stoneDatabase.slice(0, 10).map((s) => {
                const score = (1 / (Number(s.remainingLife) + 1)).toFixed(2)
                return (
                  <tr key={s.id} className="border-b border-white/5 hover:bg-white/[0.03]">
                    <td className="px-4 py-2.5 font-medium text-white">{s.id}</td>
                    <td className="px-3 py-2.5 text-txt-muted">{s.zone}</td>
                    <td className="px-3 py-2.5">
                      <div className="w-28 h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-500" style={{ width: `${score * 100}%` }} />
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-txt-muted">{score}</td>
                    <td className="px-3 py-2.5"><span className={`badge ${statusBg[s.status]}`}>{s.status}</span></td>
                    <td className="px-3 py-2.5 text-txt-muted">{s.remainingLife} yrs</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
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
