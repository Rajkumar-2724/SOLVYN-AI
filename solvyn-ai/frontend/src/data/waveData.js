export const waveTrend = [
  { time: '12:00\nSep 11', direction: 150, period: 8, event: false },
  { time: '14:00', direction: 175, period: 9, event: false },
  { time: '16:00', direction: 190, period: 10, event: false },
  { time: '18:00', direction: 260, period: 14, event: true, label: 'High Energy Event', value: '4.2 m' },
  { time: '20:00\nSep 11', direction: 220, period: 11, event: false },
  { time: '00:00\nSep 12', direction: 200, period: 9, event: false },
  { time: '04:00', direction: 190, period: 8, event: false },
  { time: '08:00', direction: 250, period: 13, event: true, label: 'High Energy Event', value: '3.9 m' },
  { time: '12:00\nSep 12', direction: 210, period: 10, event: false },
]

export const waveHeightOverview = [
  { day: '6 Sep', height: 2.1 },
  { day: '7 Sep', height: 2.6 },
  { day: '8 Sep', height: 1.9 },
  { day: '9 Sep', height: 3.4 },
  { day: '10 Sep', height: 2.3 },
  { day: '11 Sep', height: 2.7 },
  { day: '12 Sep', height: 2.8 },
]

export const waveActivityTrend = [
  { day: '6 May', height: 2.0 },
  { day: '7 May', height: 2.9 },
  { day: '8 May', height: 2.1 },
  { day: '9 May', height: 3.2 },
  { day: '10 May', height: 2.4 },
  { day: '11 May', height: 2.9 },
  { day: '12 May', height: 2.6 },
]

export const riskZones = [
  { rank: 1, zone: '03', stoneId: 'S-3053', displacement: '12.4 cm', defect: 'Crack', confidence: 92, severity: 'High' },
  { rank: 2, zone: '03', stoneId: 'S-3057', displacement: '8.7 cm', defect: 'Surface Wear', confidence: 87, severity: 'High' },
  { rank: 3, zone: '04', stoneId: 'S-3061', displacement: '6.2 cm', defect: 'Dislodged', confidence: 81, severity: 'Medium' },
  { rank: 4, zone: '06', stoneId: 'S-3048', displacement: '4.8 cm', defect: 'Crack', confidence: 76, severity: 'Medium' },
  { rank: 5, zone: '05', stoneId: 'S-3059', displacement: '3.1 cm', defect: 'Minor Erosion', confidence: 68, severity: 'Low' },
]
