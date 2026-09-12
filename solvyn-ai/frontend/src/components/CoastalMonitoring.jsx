import { useState } from 'react'
import { Compass, Navigation, Waves, MapPin } from 'lucide-react'
import { stoneMarkers, selectedStone } from '../data/liveWaveData.js'

const statusColors = {
  normal: 'bg-success',
  minor: 'bg-warning',
  medium: 'bg-warning',
  high: 'bg-danger',
  low: 'bg-success',
}

const statusGlows = {
  normal: 'shadow-success/30',
  minor: 'shadow-warning/30',
  high: 'shadow-danger/40',
  low: 'shadow-success/30',
}

export default function CoastalMonitoring() {
  const [selected, setSelected] = useState(selectedStone)
  const [hoveredStone, setHoveredStone] = useState(null)

  return (
    <div className="card-panel p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Waves size={16} className="text-accent-light" />
          <h3 className="text-sm font-bold text-white">Live Coastal Monitoring - Stone Analysis</h3>
        </div>
        <div className="flex items-center gap-3 text-[10px]">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-success" /> Normal</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-warning" /> Minor Risk</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-danger" /> High Risk</span>
        </div>
      </div>
      <div className="relative">
        <div className="w-full aspect-[16/9] rounded-xl overflow-hidden bg-ocean-950 border border-white/5 relative">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 225">
            <defs>
              <linearGradient id="oceanGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0a2140" />
                <stop offset="100%" stopColor="#050d1a" />
              </linearGradient>
              <linearGradient id="breakwaterGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1e3a5f" />
                <stop offset="100%" stopColor="#0f2f52" />
              </linearGradient>
            </defs>
            <rect fill="url(#oceanGrad)" x="0" y="0" width="400" height="225" />
            <path d="M0,140 Q50,130 100,138 Q150,145 200,135 Q250,125 300,132 Q350,140 400,135 L400,225 L0,225 Z" fill="#0a1e3a" />
            <path d="M0,155 Q50,148 100,153 Q150,158 200,150 Q250,142 300,150 Q350,157 400,152 L400,225 L0,225 Z" fill="#0c1528" />
            <rect x="120" y="30" width="160" height="105" rx="4" fill="url(#breakwaterGrad)" opacity="0.8" />
            <rect x="125" y="35" width="150" height="95" rx="3" fill="#153050" opacity="0.6" />
            {stoneMarkers.map((s) => {
              const x = (s.x / 100) * 340 + 30
              const y = (s.y / 100) * 110 + 25
              const isSelected = selected && selected.id === s.id
              const isHovered = hoveredStone === s.id
              return (
                <g key={s.id}>
                  <circle
                    cx={x} cy={y} r={isSelected ? 8 : isHovered ? 7 : 5}
                    className={`${statusColors[s.status]} ${statusGlows[s.status] || ''}`}
                    fill={statusColors[s.status]}
                    opacity={isSelected ? 1 : isHovered ? 0.9 : 0.7}
                    style={{ cursor: 'pointer', filter: isSelected ? `drop-shadow(0 0 6px rgba(255,80,80,0.6))` : `drop-shadow(0 0 4px ${statusColors[s.status]}40)` }}
                    onMouseEnter={() => setHoveredStone(s.id)}
                    onMouseLeave={() => setHoveredStone(null)}
                    onClick={() => setSelected({ id: s.id, displacement: (Math.random() * 10 + 2).toFixed(1) + ' cm', defect: s.status === 'high' ? 'Surface Wear' : s.status === 'minor' ? 'Crack' : 'Minor Erosion', confidence: Math.floor(Math.random() * 30 + 60), zone: s.zone, status: s.status })}
                  />
                  {isSelected && (
                    <>
                      <circle cx={x} cy={y} r={14} fill="none" stroke="#ff5050" strokeWidth="1.5" opacity="0.5" className="pulse-dot" />
                      <text x={x} y={y - 14} textAnchor="middle" fill="#e6f1fb" fontSize="7" fontWeight="600">{s.id}</text>
                    </>
                  )}
                </g>
              )
            })}
          </svg>
          <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
            <Compass size={12} className="text-txt-muted" />
            <span className="text-[10px] text-txt-muted">236° SW</span>
          </div>
        </div>
        {selected && (
          <div className="mt-3 card-panel p-3 border-accent/20 bg-accent/5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-accent-light" />
                <span className="text-sm font-bold text-white">Stone {selected.id}</span>
                <span className="badge text-[10px] bg-accent-dim text-accent-light">{selected.zone}</span>
              </div>
              <button className="text-[10px] text-txt-muted hover:text-accent-light" onClick={() => setSelected(null)}>✕</button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div>
                <p className="text-[10px] text-txt-dim">Displacement</p>
                <p className="text-xs font-bold text-white">{selected.displacement}</p>
              </div>
              <div>
                <p className="text-[10px] text-txt-dim">Defect</p>
                <p className="text-xs font-bold text-warning">{selected.defect}</p>
              </div>
              <div>
                <p className="text-[10px] text-txt-dim">Confidence</p>
                <p className="text-xs font-bold text-success">{selected.confidence}%</p>
              </div>
              <div>
                <p className="text-[10px] text-txt-dim">Severity</p>
                <p className="text-xs font-bold text-danger capitalize">{selected.status}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
