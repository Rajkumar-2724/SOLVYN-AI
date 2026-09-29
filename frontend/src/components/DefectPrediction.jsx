import { useState, useEffect } from 'react'
import { ShieldAlert, AlertCircle } from 'lucide-react'
import { defectCategories } from '../data/liveWaveData.js'

export default function DefectPrediction() {
  const [totalDefects, setTotalDefects] = useState(25)
  const [totalStones] = useState(180)
  const [percentage, setPercentage] = useState(14)
  const [categories, setCategories] = useState(defectCategories)

  useEffect(() => {
    const interval = setInterval(() => {
      const newTotal = Math.max(15, Math.min(40, totalDefects + Math.floor(Math.random() * 3 - 1)))
      setTotalDefects(newTotal)
      setPercentage(Math.round((newTotal / totalStones) * 100))
      setCategories(prev => prev.map(c => ({
        ...c,
        count: Math.max(0, c.count + Math.floor(Math.random() * 3 - 1)),
        percentage: Math.max(0, Math.round((Math.random() * 10 + 1) * 10) / 10),
      })))
    }, 6000)
    return () => clearInterval(interval)
  }, [totalDefects, totalStones])

  const colorMap = {
    'Surface Wear': 'bg-success',
    'Crack': 'bg-danger',
    'Minor Erosion': 'bg-warning',
    'Severe Defect': 'bg-red-600',
  }

  return (
    <div className="card-panel p-5">
      <div className="flex items-center gap-2 mb-4">
        <ShieldAlert size={16} className="text-warning" />
        <h3 className="text-sm font-bold text-white">Defect Prediction</h3>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <div className="relative w-20 h-20">
          <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow">
            <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="#f97316" strokeWidth="8" strokeDasharray={`${percentage * 2.51} 251`} strokeLinecap="round" style={{ transition: 'stroke-dasharray 0.5s ease' }} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold text-white">{percentage}%</span>
            <span className="text-[9px] text-txt-muted">Defects</span>
          </div>
        </div>
        <div>
          <p className="text-2xl font-bold text-white">{totalDefects} <span className="text-sm font-normal text-txt-muted">/ {totalStones}</span></p>
          <p className="text-xs text-txt-muted mt-1">Stones with Defects</p>
        </div>
      </div>
      <div className="space-y-2">
        {categories.map((cat) => (
          <div key={cat.name} className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full shrink-0 ${colorMap[cat.name] || 'bg-txt-muted'}`} />
            <span className="text-[11px] text-txt-muted flex-1">{cat.name}</span>
            <span className="text-[11px] text-txt-muted">{cat.percentage}%</span>
            <span className="text-[11px] text-txt-dim w-8 text-right">({cat.count})</span>
          </div>
        ))}
      </div>
    </div>
  )
}
