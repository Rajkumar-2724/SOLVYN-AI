import { useState, useEffect } from 'react'
import { TrendingDown, AlertTriangle } from 'lucide-react'
import {
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend,
} from 'recharts'

const COLORS = ['#3ddc84', '#fbbf24', '#f97316', '#ef4444']

export default function DisplacementPrediction() {
  const [percentage, setPercentage] = useState(18)
  const [stonesAtRisk, setStonesAtRisk] = useState(32)
  const [totalStones] = useState(180)
  const [trendData, setTrendData] = useState([
    { day: '6 Sep', value: 12 },
    { day: '7 Sep', value: 14 },
    { day: '8 Sep', value: 11 },
    { day: '9 Sep', value: 16 },
    { day: '10 Sep', value: 13 },
    { day: '11 Sep', value: 15 },
    { day: '12 Sep', value: 18 },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage(prev => Math.max(5, Math.min(40, prev + (Math.random() * 4 - 2))))
      setStonesAtRisk(prev => Math.max(20, Math.min(60, prev + Math.floor(Math.random() * 5 - 2))))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const pieData = [
    { name: 'High Risk', value: Math.round(percentage * 0.4), color: '#ef4444' },
    { name: 'Medium Risk', value: Math.round(percentage * 0.35), color: '#f97316' },
    { name: 'Low Risk', value: Math.round(percentage * 0.25), color: '#fbbf24' },
  ]

  return (
    <div className="card-panel p-5">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle size={16} className="text-warning" />
        <h3 className="text-sm font-bold text-white">Stone Displacement Prediction</h3>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
        <div className="relative w-32 h-32 shrink-0">
          <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow">
            <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="#ef4444" strokeWidth="8" strokeDasharray={`${percentage * 2.51} 251`} strokeLinecap="round" style={{ transition: 'stroke-dasharray 0.5s ease' }} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-white">{Math.round(percentage)}%</span>
            <span className="text-[10px] text-txt-muted">Risk Level</span>
          </div>
        </div>
        <div className="text-center sm:text-left">
          <p className="text-2xl font-bold text-white">{stonesAtRisk} <span className="text-sm font-normal text-txt-muted">/ {totalStones}</span></p>
          <p className="text-xs text-txt-muted mt-1">Stones at Risk</p>
          <div className="flex gap-3 mt-2 text-[10px]">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-danger" /> High</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-400" /> Medium</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-warning" /> Low</span>
          </div>
        </div>
      </div>
      <div className="h-28">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={pieData} cx="50%" cy="50%" innerRadius="60%" outerRadius="80%" paddingAngle={2} dataKey="value">
              {pieData.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ background: '#0a1c33', border: '1px solid rgba(94,168,219,0.2)', borderRadius: 10, fontSize: 11 }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center gap-1 mt-2 text-[10px] text-txt-muted">
        <TrendingDown size={10} />
        <span>Displacement trend updated live</span>
      </div>
    </div>
  )
}
