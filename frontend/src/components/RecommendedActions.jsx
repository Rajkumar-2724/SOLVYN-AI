import { useState } from 'react'
import { Eye, Sparkles, FileText, CheckCircle } from 'lucide-react'
import { recommendedActions } from '../data/liveWaveData.js'

export default function RecommendedActions() {
  const [generated, setGenerated] = useState(false)
  const [reportGenerated, setReportGenerated] = useState(false)

  return (
    <div className="card-panel p-5">
      <div className="flex items-center gap-2 mb-3">
        <FileText size={16} className="text-accent-light" />
        <h3 className="text-sm font-bold text-white">Recommended Actions</h3>
      </div>
      <ol className="space-y-2 mb-4">
        {recommendedActions.map((a, i) => (
          <li key={i} className="flex items-start gap-2 text-xs text-txt-muted">
            <span className="w-4 h-4 rounded-full bg-accent/20 text-accent-light flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">{i + 1}</span>
            {a.text}
          </li>
        ))}
      </ol>
      <div className="flex gap-2">
        <button
          onClick={() => setReportGenerated(!reportGenerated)}
          className="btn-outline px-4 py-2 text-xs font-semibold flex items-center gap-1.5 flex-1"
        >
          {reportGenerated ? <CheckCircle size={13} className="text-success" /> : <Eye size={13} />} {reportGenerated ? 'Report Ready' : 'View Full Report'}
        </button>
        <button
          onClick={() => setGenerated(!generated)}
          className="btn-primary px-4 py-2 text-xs font-semibold flex items-center gap-1.5 flex-1"
        >
          {generated ? <CheckCircle size={13} className="text-success" /> : <Sparkles size={13} />} {generated ? 'Generated' : 'Generate Report'}
        </button>
      </div>
      {generated && (
        <div className="mt-3 p-3 rounded-lg bg-success/5 border border-success/20 text-xs text-success flex items-center gap-2">
          <CheckCircle size={14} /> Report generated successfully!
        </div>
      )}
      {reportGenerated && (
        <div className="mt-3 p-3 rounded-lg bg-accent/5 border border-accent/20 text-xs text-accent-light flex items-center gap-2">
          <FileText size={14} /> Full report is now available for download.
        </div>
      )}
    </div>
  )
}
