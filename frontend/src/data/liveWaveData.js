export const liveWaveTrend = [
  { time: '12:00', height: 2.4, period: 8.2, direction: 230, energy: 10.5, waterLevel: 1.1, freq: 0.122, event: false },
  { time: '13:00', height: 2.6, period: 8.8, direction: 234, energy: 11.2, waterLevel: 1.15, freq: 0.114, event: false },
  { time: '14:00', height: 2.9, period: 9.1, direction: 238, energy: 11.8, waterLevel: 1.2, freq: 0.110, event: false },
  { time: '15:00', height: 3.2, period: 9.4, direction: 242, energy: 12.4, waterLevel: 1.25, freq: 0.106, event: true },
  { time: '16:00', height: 2.8, period: 8.6, direction: 236, energy: 11.0, waterLevel: 1.18, freq: 0.116, event: false },
  { time: '17:00', height: 2.5, period: 8.3, direction: 233, energy: 10.2, waterLevel: 1.12, freq: 0.120, event: false },
  { time: '18:00', height: 3.1, period: 9.2, direction: 240, energy: 12.1, waterLevel: 1.22, freq: 0.109, event: true },
  { time: '19:00', height: 2.7, period: 8.7, direction: 235, energy: 11.4, waterLevel: 1.16, freq: 0.115, event: false },
  { time: '20:00', height: 2.3, period: 8.1, direction: 231, energy: 9.8, waterLevel: 1.10, freq: 0.123, event: false },
  { time: '21:00', height: 2.6, period: 8.5, direction: 237, energy: 10.9, waterLevel: 1.14, freq: 0.117, event: false },
  { time: '22:00', height: 2.9, period: 9.0, direction: 239, energy: 11.6, waterLevel: 1.19, freq: 0.111, event: false },
  { time: '23:00', height: 3.3, period: 9.5, direction: 243, energy: 12.8, waterLevel: 1.26, freq: 0.105, event: true },
]

export const waveHeightOverview = [
  { day: '6 Sep', height: 2.1 },
  { day: '7 Sep', height: 2.6 },
  { day: '8 Sep', height: 1.9 },
  { day: '9 Sep', height: 3.4 },
  { day: '10 Sep', height: 2.3 },
  { day: '11 Sep', height: 2.7 },
  { day: '12 Sep', height: 2.8 },
  { day: '13 Sep', height: 3.0 },
  { day: '14 Sep', height: 2.5 },
  { day: '15 Sep', height: 3.1 },
  { day: '16 Sep', height: 2.9 },
  { day: '17 Sep', height: 2.6 },
]

export const topRiskStones = [
  { rank: 1, zone: 'Z03', stoneId: 'S-3057', displacement: '8.7 cm', defect: 'Surface Wear', confidence: 87, severity: 'High' },
  { rank: 2, zone: 'Z03', stoneId: 'S-3061', displacement: '6.2 cm', defect: 'Crack', confidence: 76, severity: 'Medium' },
  { rank: 3, zone: 'Z04', stoneId: 'S-3048', displacement: '4.8 cm', defect: 'Crack', confidence: 68, severity: 'Medium' },
  { rank: 4, zone: 'Z06', stoneId: 'S-3059', displacement: '3.1 cm', defect: 'Minor Erosion', confidence: 62, severity: 'Low' },
]

export const severityColor = { High: 'bg-rose-500/15 text-rose-400', Medium: 'bg-amber-400/15 text-amber-400', Low: 'bg-emerald-400/15 text-emerald-400' }

export const stoneMarkers = [
  { id: 'S-3050', x: 25, y: 30, status: 'normal', zone: 'Z01' },
  { id: 'S-3051', x: 35, y: 45, status: 'normal', zone: 'Z01' },
  { id: 'S-3052', x: 50, y: 25, status: 'minor', zone: 'Z02' },
  { id: 'S-3053', x: 60, y: 55, status: 'high', zone: 'Z03' },
  { id: 'S-3054', x: 75, y: 35, status: 'normal', zone: 'Z03' },
  { id: 'S-3055', x: 40, y: 60, status: 'minor', zone: 'Z02' },
  { id: 'S-3056', x: 80, y: 50, status: 'high', zone: 'Z04' },
  { id: 'S-3057', x: 55, y: 40, status: 'high', zone: 'Z03' },
  { id: 'S-3058', x: 30, y: 70, status: 'normal', zone: 'Z02' },
  { id: 'S-3059', x: 65, y: 70, status: 'low', zone: 'Z04' },
  { id: 'S-3060', x: 45, y: 35, status: 'normal', zone: 'Z02' },
  { id: 'S-3061', x: 70, y: 60, status: 'medium', zone: 'Z04' },
]

export const defectCategories = [
  { name: 'Surface Wear', percentage: 9, count: 16 },
  { name: 'Crack', percentage: 3, count: 5 },
  { name: 'Minor Erosion', percentage: 2, count: 4 },
  { name: 'Severe Defect', percentage: 0, count: 0 },
]

export const analysisFindings = [
  { type: 'success', text: 'Wave height is within normal range' },
  { type: 'success', text: 'Wave energy increased by 15%' },
  { type: 'success', text: 'Dominant wave direction: SW (236°)' },
  { type: 'warning', text: 'High-energy event detected (4.8 m)' },
  { type: 'success', text: 'Wave direction remains relatively stable' },
]

export const recommendedActions = [
  { text: 'Inspect Zone 03 (high priority)' },
  { text: 'Check S-3057 for displacement' },
  { text: 'Verify S-3057 surface wear' },
  { text: 'Schedule maintenance within 7 days' },
]

export const selectedStone = {
  id: 'S-3057',
  displacement: '8.7 cm',
  defect: 'Surface Wear',
  confidence: 87,
  zone: 'Z03',
  status: 'high',
}
