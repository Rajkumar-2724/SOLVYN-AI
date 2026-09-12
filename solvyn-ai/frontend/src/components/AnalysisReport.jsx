import { ClipboardList, ShieldCheck, ShieldAlert } from 'lucide-react'
import { analysisFindings } from '../data/liveWaveData.js'

export default function AnalysisReport() {
  return (
    <div className="card-panel p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <ClipboardList size={16} className="text-accent-light" />
          <h3 className="text-sm font-bold text-white">Live Analysis Report</h3>
        </div>
      </div>
      <ul className="space-y-2">
        {analysisFindings.map((f, i) => (
          <li key={i} className={`flex items-center gap-2 text-xs ${f.type === 'success' ? 'text-txt-muted' : 'text-warning'}`}>
            {f.type === 'success' ? (
              <ShieldCheck size={13} className="text-success shrink-0" />
            ) : (
              <ShieldAlert size={13} className="text-warning shrink-0" />
            )}
            {f.text}
          </li>
        ))}
      </ul>
    </div>
  )
}
