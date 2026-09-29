export const zones = Array.from({ length: 12 }, (_, i) => `Zone ${String(i + 1).padStart(2, '0')}`)

const statuses = ['Healthy', 'Healthy', 'Healthy', 'Moderate', 'Damaged', 'Critical']

function seededRandom(seed) {
  let x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

export const stoneDatabase = Array.from({ length: 60 }, (_, i) => {
  const idx = i + 1
  const r = seededRandom(idx * 13.37)
  const status = statuses[Math.floor(r * statuses.length)]
  const remainingLife =
    status === 'Critical' ? (0.5 + r * 1.2) :
    status === 'Damaged' ? (1 + r * 2) :
    status === 'Moderate' ? (3 + r * 2.5) :
    (6 + r * 3.5)
  return {
    id: `S-${3050 + idx}`,
    zone: `Zone ${String(((i % 12) + 1)).padStart(2, '0')}`,
    size: `${(1.8 + r * 0.8).toFixed(2)} x ${(1.4 + r * 0.6).toFixed(2)} x ${(1.1 + r * 0.5).toFixed(2)}`,
    position: `${(10 + r * 20).toFixed(1)}, ${(6 + r * 12).toFixed(1)}, ${(-2 - r * 2).toFixed(1)}`,
    orientation: `${Math.round(280 + r * 60)}° (NW)`,
    status,
    remainingLife: remainingLife.toFixed(1),
    weight: (7 + r * 5).toFixed(1),
    material: 'Natural Rock',
    neighbourCount: Math.round(4 + r * 6),
    lastUpdated: '12 May 2025',
  }
})

export const statusColor = {
  Healthy: 'text-emerald-400',
  Moderate: 'text-amber-400',
  Damaged: 'text-rose-400',
  Critical: 'text-red-500',
}

export const statusBg = {
  Healthy: 'bg-emerald-400/15 text-emerald-400',
  Moderate: 'bg-amber-400/15 text-amber-400',
  Damaged: 'bg-rose-400/15 text-rose-400',
  Critical: 'bg-red-500/15 text-red-400',
}
