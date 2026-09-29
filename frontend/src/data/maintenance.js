export const recommendedActions = [
  { id: 'R-003', condition: 'Fracture', displacement: '12.5 cm', risk: 'High', stability: 'Low', action: 'Replace', priority: 'Critical', confidence: 91 },
  { id: 'R-007', condition: 'Displaced', displacement: '8.3 cm', risk: 'High', stability: 'Medium', action: 'Reposition', priority: 'High', confidence: 87 },
  { id: 'R-012', condition: 'Gap / Void', displacement: '5.2 cm', risk: 'Medium', stability: 'Medium', action: 'Void Restoration', priority: 'Medium', confidence: 76 },
  { id: 'R-018', condition: 'Crack', displacement: '3.1 cm', risk: 'Medium', stability: 'High', action: 'Repair', priority: 'Medium', confidence: 68 },
  { id: 'R-021', condition: 'Minor Move', displacement: '2.4 cm', risk: 'Low', stability: 'High', action: 'Monitor', priority: 'Low', confidence: 94 },
  { id: 'R-027', condition: 'Missing', displacement: '-', risk: 'High', stability: 'Low', action: 'Replace', priority: 'High', confidence: 62 },
]

export const priorityColor = {
  Critical: 'bg-rose-600/25 text-rose-400',
  High: 'bg-orange-500/20 text-orange-400',
  Medium: 'bg-amber-400/20 text-amber-400',
  Low: 'bg-emerald-400/20 text-emerald-400',
}

export const actionColor = {
  Replace: 'bg-rose-600/70',
  Reposition: 'bg-orange-500/70',
  'Void Restoration': 'bg-violet-500/70',
  Repair: 'bg-sky-500/70',
  Monitor: 'bg-teal-500/70',
}

export const interventionComparison = [
  { action: 'Monitor', cost: '₹15K', riskReduction: 25, residualRisk: 62 },
  { action: 'Reposition', cost: '₹45K', riskReduction: 72, residualRisk: 18, recommended: true },
  { action: 'Repair', cost: '₹60K', riskReduction: 68, residualRisk: 22 },
  { action: 'Void Restoration', cost: '₹70K', riskReduction: 75, residualRisk: 16 },
  { action: 'Replace', cost: '₹1.2L', riskReduction: 88, residualRisk: 8 },
]
