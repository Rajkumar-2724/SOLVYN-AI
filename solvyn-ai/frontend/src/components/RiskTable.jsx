import { severityColor } from '../data/liveWaveData.js'

export default function RiskTable() {
  return (
    <div className="card-panel p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-1 h-4 rounded-full bg-accent-light" />
        <h3 className="text-sm font-bold text-white">Top Risk Zones / Stones</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-[11px]">
          <thead>
            <tr className="text-txt-dim border-b border-white/5">
              <th className="text-left font-medium py-2">#</th>
              <th className="text-left font-medium py-2">Zone</th>
              <th className="text-left font-medium py-2">Stone ID</th>
              <th className="text-left font-medium py-2">Est. Displacement</th>
              <th className="text-left font-medium py-2">Defect Type</th>
              <th className="text-left font-medium py-2">Confidence</th>
              <th className="text-left font-medium py-2">Severity</th>
            </tr>
          </thead>
          <tbody>
            {[
              { rank: 1, zone: 'Z03', stoneId: 'S-3057', displacement: '8.7 cm', defect: 'Surface Wear', confidence: 87, severity: 'High' },
              { rank: 2, zone: 'Z03', stoneId: 'S-3061', displacement: '6.2 cm', defect: 'Crack', confidence: 76, severity: 'Medium' },
              { rank: 3, zone: 'Z04', stoneId: 'S-3048', displacement: '4.8 cm', defect: 'Crack', confidence: 68, severity: 'Medium' },
              { rank: 4, zone: 'Z06', stoneId: 'S-3059', displacement: '3.1 cm', defect: 'Minor Erosion', confidence: 62, severity: 'Low' },
            ].map((r) => (
              <tr key={r.rank} className="border-b border-white/5 hover:bg-white/[0.03]">
                <td className="py-2 text-txt-muted">{r.rank}</td>
                <td className="py-2 text-txt-muted">{r.zone}</td>
                <td className="py-2 text-white font-medium">{r.stoneId}</td>
                <td className="py-2 text-txt-muted">{r.displacement}</td>
                <td className="py-2 text-txt-muted">{r.defect}</td>
                <td className="py-2 text-txt-muted">{r.confidence}%</td>
                <td className="py-2"><span className={`badge ${severityColor[r.severity]}`}>{r.severity}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
