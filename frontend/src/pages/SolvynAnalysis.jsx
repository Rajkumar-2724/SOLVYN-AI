import { useState, useCallback, useRef, useEffect } from 'react'
import {
  Activity, UploadCloud, X, FileText, CheckCircle2, AlertTriangle,
  ArrowRight, RotateCcw, Download, Trash2, Zap, Target, Shield,
  BarChart3, ChevronRight, CircleAlert, Search, TrendingUp, TrendingDown,
  Minus, Waves, Image as ImageIcon, GitMerge,
} from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'

const MAX_FILE_SIZE = 50 * 1024 * 1024
const ALLOWED_TYPES = [
  'application/pdf', 'text/csv', 'application/json',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel',
]
const ALLOWED_EXTENSIONS = ['.pdf', '.csv', '.json', '.xlsx', '.xls']

const PROGRESS_STAGES = [
  'Validating uploaded reports',
  'Reading wave analysis data',
  'Processing image analysis data',
  'Correlating structural data',
  'Detecting displacement',
  'Detecting defects',
  'Calculating severity',
  'Generating Solvyn Analysis report',
]

const mockDisplacementData = [
  { stone: 'Stone A12', displacement: 24.6, severity: 'High', direction: 'NE', area: 'Eastern Section' },
  { stone: 'Stone B08', displacement: 12.3, severity: 'Medium', direction: 'SW', area: 'Central Section' },
  { stone: 'Stone C14', displacement: 6.8, severity: 'Low', direction: 'N', area: 'Western Section' },
  { stone: 'Stone D03', displacement: 31.2, severity: 'Critical', direction: 'E', area: 'Eastern Section' },
  { stone: 'Stone A07', displacement: 9.1, severity: 'Medium', direction: 'SE', area: 'Eastern Section' },
  { stone: 'Stone F22', displacement: 4.2, severity: 'Low', direction: 'W', area: 'Northern Section' },
  { stone: 'Stone E11', displacement: 18.7, severity: 'High', direction: 'NW', area: 'Central Section' },
]

const mockDefectData = [
  { id: 'DEF-001', location: 'Stone A12', type: 'Stone displacement', severity: 'High', confidence: 96.4, status: 'Confirmed' },
  { id: 'DEF-002', location: 'Stone D03', type: 'Stone rotation', severity: 'Critical', confidence: 98.1, status: 'Confirmed' },
  { id: 'DEF-003', location: 'Stone B08', type: 'Cracking', severity: 'Medium', confidence: 91.7, status: 'Confirmed' },
  { id: 'DEF-004', location: 'Stone E11', type: 'Erosion', severity: 'High', confidence: 89.3, status: 'Confirmed' },
  { id: 'DEF-005', location: 'Stone C14', type: 'Surface damage', severity: 'Low', confidence: 85.6, status: 'Review' },
  { id: 'DEF-006', location: 'Stone A07', type: 'Joint gap', severity: 'Medium', confidence: 93.2, status: 'Confirmed' },
  { id: 'DEF-007', location: 'Stone F22', type: 'Structural deformation', severity: 'Low', confidence: 82.4, status: 'Review' },
]

function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

function getFileExtension(name) {
  return name.slice(name.lastIndexOf('.')).toLowerCase()
}

function severityColor(s) {
  if (s === 'Critical') return 'bg-danger-dim text-danger'
  if (s === 'High') return 'bg-orange-500/15 text-orange-400'
  if (s === 'Medium') return 'bg-warning-dim text-warning'
  return 'bg-success-dim text-success'
}

function severityDot(s) {
  if (s === 'Critical') return 'bg-danger'
  if (s === 'High') return 'bg-orange-400'
  if (s === 'Medium') return 'bg-warning'
  return 'bg-success'
}

function stabilityColor(pct) {
  if (pct >= 85) return 'text-success'
  if (pct >= 60) return 'text-warning'
  return 'text-danger'
}

function stabilityLabel(pct) {
  if (pct >= 85) return 'Stable'
  if (pct >= 60) return 'Warning'
  return 'Critical'
}

function stabilityBg(pct) {
  if (pct >= 85) return 'bg-success-dim text-success'
  if (pct >= 60) return 'bg-warning-dim text-warning'
  return 'bg-danger-dim text-danger'
}

export default function SolvynAnalysis() {
  const [waveFile, setWaveFile] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [waveError, setWaveError] = useState('')
  const [imageError, setImageError] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const [progressStage, setProgressStage] = useState(0)
  const [results, setResults] = useState(null)
  const waveInputRef = useRef(null)
  const imageInputRef = useRef(null)

  const bothUploaded = waveFile && imageFile

  function validateFile(file) {
    if (!file) return 'No file selected.'
    if (file.size > MAX_FILE_SIZE) return 'File too large. Maximum size is 50MB.'
    const ext = getFileExtension(file.name)
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return 'Invalid file type. Supported: PDF, CSV, JSON, XLSX.'
    }
    return ''
  }

  function handleWaveUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const err = validateFile(file)
    if (err) { setWaveError(err); return }
    if (waveFile && file.name === waveFile.name && file.size === waveFile.size) return
    setWaveError('')
    setWaveFile({ name: file.name, size: file.size, type: file.type, raw: file })
  }

  function handleImageUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const err = validateFile(file)
    if (err) { setImageError(err); return }
    if (imageFile && file.name === imageFile.name && file.size === imageFile.size) return
    setImageError('')
    setImageFile({ name: file.name, size: file.size, type: file.type, raw: file })
  }

  function handleWaveDrop(e) {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (!file) return
    const err = validateFile(file)
    if (err) { setWaveError(err); return }
    setWaveError('')
    setWaveFile({ name: file.name, size: file.size, type: file.type, raw: file })
  }

  function handleImageDrop(e) {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (!file) return
    const err = validateFile(file)
    if (err) { setImageError(err); return }
    setImageError('')
    setImageFile({ name: file.name, size: file.size, type: file.type, raw: file })
  }

  function removeWave() { setWaveFile(null); setWaveError('') }
  function removeImage() { setImageFile(null); setImageError('') }

  function startAnalysis() {
    if (!bothUploaded) return
    setAnalyzing(true)
    setProgressStage(0)
    setResults(null)
  }

  useEffect(() => {
    if (!analyzing) return
    if (progressStage < PROGRESS_STAGES.length - 1) {
      const delay = 600 + Math.random() * 800
      const timer = setTimeout(() => setProgressStage((p) => p + 1), delay)
      return () => clearTimeout(timer)
    }
    const timer = setTimeout(() => {
      setAnalyzing(false)
      setResults({
        displacement: {
          total: 24.6,
          max: 31.2,
          avg: 15.3,
          direction: 'NE',
          affectedArea: 'Eastern Section',
          severity: 'High',
        },
        defects: { total: 7, critical: 1, high: 2, medium: 2, low: 2 },
        stability: 87,
        confidence: 94.2,
        overallCondition: 'Requires Attention',
        primaryFinding: 'Significant displacement detected in the eastern section with associated surface deterioration on multiple stones.',
        highestRisk: 'Stone displacement with associated surface deterioration.',
        inspectionPriority: 'High',
      })
    }, 1000)
    return () => clearTimeout(timer)
  }, [analyzing, progressStage])

  function runAgain() { setResults(null); setWaveFile(null); setImageFile(null) }
  function clearReports() { setResults(null); setWaveFile(null); setImageFile(null) }

  return (
    <div className="dark-page pb-16">
      <PageHeader
        icon={Activity}
        crumbs={[{ label: 'Home', path: '/' }, { label: 'Solvyn Analysis' }]}
        title="Solvyn Analysis"
        subtitle="AI-powered structural analysis using wave and image analysis reports"
      />

      {/* UPLOAD SECTION */}
      {!results && !analyzing && (
        <div className="px-4 lg:px-6 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Wave Analysis Report Upload */}
            <div className="card-panel p-5">
              <div className="flex items-center gap-2 text-white font-semibold text-sm mb-1">
                <Waves size={16} className="text-accent-light" /> Wave Analysis Report
              </div>
              <p className="text-xs text-txt-muted mb-4">Upload the wave analysis report containing structural wave/sensor analysis data.</p>

              {!waveFile ? (
                <label
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleWaveDrop}
                  className="border-2 border-dashed border-accent/25 rounded-xl h-40 flex flex-col items-center justify-center text-center cursor-pointer hover:border-accent/50 hover:bg-accent/5 transition-all mb-3"
                >
                  <UploadCloud size={24} className="text-accent-light mb-2" />
                  <p className="text-xs text-slate-200 font-medium">Click to upload or drag and drop</p>
                  <p className="text-[10px] text-txt-dim mt-1">PDF, CSV, JSON, XLSX (Max 50MB)</p>
                  <input
                    ref={waveInputRef}
                    type="file"
                    className="hidden"
                    accept=".pdf,.csv,.json,.xlsx,.xls"
                    onChange={handleWaveUpload}
                  />
                </label>
              ) : (
                <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/5 p-4 mb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-success-dim flex items-center justify-center shrink-0">
                        <FileText size={18} className="text-success" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-white truncate">{waveFile.name}</p>
                        <p className="text-[11px] text-txt-muted">{formatFileSize(waveFile.size)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => waveInputRef.current?.click()}
                        className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-txt-muted hover:text-white transition-colors"
                        title="Replace file"
                      >
                        <RotateCcw size={13} />
                      </button>
                      <button
                        onClick={removeWave}
                        className="w-7 h-7 rounded-lg bg-white/5 hover:bg-danger/15 flex items-center justify-center text-txt-muted hover:text-danger transition-colors"
                        title="Remove file"
                      >
                        <X size={13} />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 mt-3 text-[11px] text-success">
                    <CheckCircle2 size={12} /> Report ready for analysis
                  </div>
                  <input
                    ref={waveInputRef}
                    type="file"
                    className="hidden"
                    accept=".pdf,.csv,.json,.xlsx,.xls"
                    onChange={handleWaveUpload}
                  />
                </div>
              )}

              {waveError && (
                <div className="flex items-center gap-1.5 text-[11px] text-danger mt-1">
                  <CircleAlert size={12} /> {waveError}
                </div>
              )}
            </div>

            {/* Image Analysis Report Upload */}
            <div className="card-panel p-5">
              <div className="flex items-center gap-2 text-white font-semibold text-sm mb-1">
                <ImageIcon size={16} className="text-accent-light" /> Image Analysis Report
              </div>
              <p className="text-xs text-txt-muted mb-4">Upload the image analysis report containing visual inspection and structural defect information.</p>

              {!imageFile ? (
                <label
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleImageDrop}
                  className="border-2 border-dashed border-accent/25 rounded-xl h-40 flex flex-col items-center justify-center text-center cursor-pointer hover:border-accent/50 hover:bg-accent/5 transition-all mb-3"
                >
                  <UploadCloud size={24} className="text-accent-light mb-2" />
                  <p className="text-xs text-slate-200 font-medium">Click to upload or drag and drop</p>
                  <p className="text-[10px] text-txt-dim mt-1">PDF, CSV, JSON, XLSX (Max 50MB)</p>
                  <input
                    ref={imageInputRef}
                    type="file"
                    className="hidden"
                    accept=".pdf,.csv,.json,.xlsx,.xls"
                    onChange={handleImageUpload}
                  />
                </label>
              ) : (
                <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/5 p-4 mb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-success-dim flex items-center justify-center shrink-0">
                        <FileText size={18} className="text-success" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-white truncate">{imageFile.name}</p>
                        <p className="text-[11px] text-txt-muted">{formatFileSize(imageFile.size)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => imageInputRef.current?.click()}
                        className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-txt-muted hover:text-white transition-colors"
                        title="Replace file"
                      >
                        <RotateCcw size={13} />
                      </button>
                      <button
                        onClick={removeImage}
                        className="w-7 h-7 rounded-lg bg-white/5 hover:bg-danger/15 flex items-center justify-center text-txt-muted hover:text-danger transition-colors"
                        title="Remove file"
                      >
                        <X size={13} />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 mt-3 text-[11px] text-success">
                    <CheckCircle2 size={12} /> Report ready for analysis
                  </div>
                  <input
                    ref={imageInputRef}
                    type="file"
                    className="hidden"
                    accept=".pdf,.csv,.json,.xlsx,.xls"
                    onChange={handleImageUpload}
                  />
                </div>
              )}

              {imageError && (
                <div className="flex items-center gap-1.5 text-[11px] text-danger mt-1">
                  <CircleAlert size={12} /> {imageError}
                </div>
              )}
            </div>
          </div>

          {/* START BUTTON */}
          <div className="mt-6 flex flex-col items-center">
            <button
              onClick={startAnalysis}
              disabled={!bothUploaded}
              className={`btn-primary px-8 py-3 text-sm font-semibold flex items-center gap-2.5 transition-all ${
                !bothUploaded ? 'opacity-40 cursor-not-allowed !shadow-none' : ''
              }`}
            >
              <Zap size={16} /> Start Solvyn Analysis <ArrowRight size={15} />
            </button>
            {!bothUploaded && (
              <p className="text-[11px] text-txt-dim mt-2">
                {!waveFile && !imageFile
                  ? 'Please upload both the Wave Analysis Report and Image Analysis Report.'
                  : !waveFile
                  ? 'Please upload the Wave Analysis Report.'
                  : 'Please upload the Image Analysis Report.'}
              </p>
            )}
          </div>
        </div>
      )}

      {/* PROGRESS STATE */}
      {analyzing && (
        <div className="px-4 lg:px-6 mt-6">
          <div className="card-panel p-6 max-w-2xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent-dim flex items-center justify-center">
                <Activity size={18} className="text-accent-light animate-spin-slow" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Analyzing Reports</p>
                <p className="text-[11px] text-txt-muted">Please wait while the Solvyn Analysis engine processes your data</p>
              </div>
            </div>

            <div className="space-y-2.5">
              {PROGRESS_STAGES.map((stage, i) => {
                const done = i < progressStage
                const active = i === progressStage
                return (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold transition-all ${
                      done
                        ? 'bg-success/20 text-success'
                        : active
                        ? 'bg-accent/20 text-accent-light'
                        : 'bg-white/5 text-txt-dim'
                    }`}>
                      {done ? <CheckCircle2 size={14} /> : i + 1}
                    </div>
                    <span className={`text-xs transition-colors ${
                      done ? 'text-success' : active ? 'text-white font-medium' : 'text-txt-dim'
                    }`}>
                      {stage}
                    </span>
                    {active && <span className="w-1.5 h-1.5 rounded-full bg-accent pulse-dot" />}
                  </div>
                )
              })}
            </div>

            <div className="mt-6">
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${((progressStage + 1) / PROGRESS_STAGES.length) * 100}%` }}
                />
              </div>
              <p className="text-[10px] text-txt-dim mt-1.5 text-right">
                {Math.round(((progressStage + 1) / PROGRESS_STAGES.length) * 100)}% complete
              </p>
            </div>
          </div>
        </div>
      )}

      {/* RESULTS */}
      {results && (
        <div className="px-4 lg:px-6 mt-4 space-y-4">
          {/* Status Banner */}
          <div className="card-panel p-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-success-dim flex items-center justify-center">
                <CheckCircle2 size={20} className="text-success" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Solvyn Analysis Results</p>
                <p className="text-[11px] text-success">Analysis Completed</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={runAgain} className="btn-outline px-4 py-2 text-xs font-semibold flex items-center gap-1.5">
                <RotateCcw size={13} /> Run Analysis Again
              </button>
              <button className="btn-outline px-4 py-2 text-xs font-semibold flex items-center gap-1.5">
                <Download size={13} /> Download Report
              </button>
              <button onClick={clearReports} className="btn-outline px-4 py-2 text-xs font-semibold flex items-center gap-1.5">
                <Trash2 size={13} /> Clear Reports
              </button>
            </div>
          </div>

          {/* KEY METRICS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {/* Displacement */}
            <div className="card-panel p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-accent-dim flex items-center justify-center">
                  <Target size={15} className="text-accent-light" />
                </div>
                <p className="text-xs font-semibold text-txt-muted">Displacement</p>
              </div>
              <p className="text-2xl font-bold text-white">{results.displacement.total} mm</p>
              <div className="flex items-center gap-2 mt-2">
                <span className={`badge ${severityColor(results.displacement.severity)}`}>{results.displacement.severity}</span>
                <span className="text-[11px] text-txt-muted">Direction: {results.displacement.direction}</span>
              </div>
            </div>

            {/* Defects */}
            <div className="card-panel p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-danger-dim flex items-center justify-center">
                  <AlertTriangle size={15} className="text-danger" />
                </div>
                <p className="text-xs font-semibold text-txt-muted">Defects Detected</p>
              </div>
              <p className="text-2xl font-bold text-white">{results.defects.total}</p>
              <div className="flex items-center gap-3 mt-2 text-[11px]">
                <span className="text-danger">{results.defects.critical} Critical</span>
                <span className="text-orange-400">{results.defects.high} High</span>
                <span className="text-warning">{results.defects.medium} Medium</span>
                <span className="text-success">{results.defects.low} Low</span>
              </div>
            </div>

            {/* Stability */}
            <div className="card-panel p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-success-dim flex items-center justify-center">
                  <Shield size={15} className="text-success" />
                </div>
                <p className="text-xs font-semibold text-txt-muted">Structural Stability</p>
              </div>
              <p className={`text-2xl font-bold ${stabilityColor(results.stability)}`}>{results.stability}%</p>
              <div className="mt-2">
                <span className={`badge ${stabilityBg(results.stability)}`}>{stabilityLabel(results.stability)}</span>
              </div>
            </div>

            {/* Confidence */}
            <div className="card-panel p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/15 flex items-center justify-center">
                  <BarChart3 size={15} className="text-blue-400" />
                </div>
                <p className="text-xs font-semibold text-txt-muted">Analysis Confidence</p>
              </div>
              <p className="text-2xl font-bold text-white">{results.confidence}%</p>
              <div className="mt-2">
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" style={{ width: `${results.confidence}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* CORRELATED ANALYSIS FLOW */}
          <div className="card-panel p-5">
            <div className="flex items-center gap-2 mb-4">
              <GitMerge size={16} className="text-accent-light" />
              <p className="text-sm font-semibold text-white">Correlated Analysis</p>
            </div>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-3 lg:gap-4 py-4">
              <div className="stat-panel px-5 py-4 text-center min-w-[180px]">
                <Waves size={20} className="text-accent-light mx-auto mb-2" />
                <p className="text-xs font-semibold text-white">Wave Analysis Report</p>
                <p className="text-[10px] text-txt-muted mt-0.5">Sensor & wave data</p>
              </div>
              <div className="flex lg:flex-col items-center gap-1 text-accent/50">
                <div className="hidden lg:block w-px h-6 bg-accent/30" />
                <ChevronRight size={16} className="lg:rotate-90" />
                <div className="hidden lg:block w-px h-6 bg-accent/30" />
              </div>
              <div className="stat-panel px-6 py-5 text-center border border-accent/30 min-w-[200px]">
                <Activity size={24} className="text-accent-light mx-auto mb-2" />
                <p className="text-sm font-bold text-white">SOLVYN ANALYSIS</p>
                <p className="text-[10px] text-accent-light mt-0.5">AI Correlation Engine</p>
              </div>
              <div className="flex lg:flex-col items-center gap-1 text-accent/50">
                <div className="hidden lg:block w-px h-6 bg-accent/30" />
                <ChevronRight size={16} className="lg:rotate-90" />
                <div className="hidden lg:block w-px h-6 bg-accent/30" />
              </div>
              <div className="flex flex-col gap-3 min-w-[180px]">
                <div className="stat-panel px-4 py-3 text-center">
                  <Target size={16} className="text-accent-light mx-auto mb-1" />
                  <p className="text-xs font-semibold text-white">Displacement</p>
                </div>
                <div className="stat-panel px-4 py-3 text-center">
                  <AlertTriangle size={16} className="text-danger mx-auto mb-1" />
                  <p className="text-xs font-semibold text-white">Defects</p>
                </div>
              </div>
              <div className="hidden lg:flex flex-col items-center gap-1 text-accent/50">
                <div className="w-px h-6 bg-accent/30" />
                <ChevronRight size={16} className="rotate-90" />
                <div className="w-px h-6 bg-accent/30" />
              </div>
              <div className="stat-panel px-5 py-4 text-center min-w-[180px]">
                <ImageIcon size={20} className="text-accent-light mx-auto mb-2" />
                <p className="text-xs font-semibold text-white">Image Analysis Report</p>
                <p className="text-[10px] text-txt-muted mt-0.5">Visual inspection data</p>
              </div>
            </div>
          </div>

          {/* DISPLACEMENT ANALYSIS */}
          <div className="card-panel p-5">
            <div className="flex items-center gap-2 mb-4">
              <Target size={16} className="text-accent-light" />
              <p className="text-sm font-semibold text-white">Displacement Analysis</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
              {[
                ['Total Displacement', results.displacement.total + ' mm'],
                ['Max Displacement', results.displacement.max + ' mm'],
                ['Avg Displacement', results.displacement.avg + ' mm'],
                ['Direction', results.displacement.direction],
                ['Affected Area', results.displacement.affectedArea],
                ['Severity', results.displacement.severity],
              ].map(([label, val]) => (
                <div key={label} className="stat-panel px-3 py-2.5">
                  <p className="text-[10px] text-txt-muted">{label}</p>
                  <p className="text-sm font-bold text-white mt-0.5">{val}</p>
                </div>
              ))}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-txt-muted border-b border-white/5">
                    <th className="text-left font-medium px-3 py-2.5">Stone/Area</th>
                    <th className="text-left font-medium px-3 py-2.5">Displacement</th>
                    <th className="text-left font-medium px-3 py-2.5">Direction</th>
                    <th className="text-left font-medium px-3 py-2.5">Area</th>
                    <th className="text-left font-medium px-3 py-2.5">Severity</th>
                  </tr>
                </thead>
                <tbody>
                  {mockDisplacementData.map((d) => (
                    <tr key={d.stone} className="border-b border-white/5 hover:bg-white/[0.03]">
                      <td className="px-3 py-2.5 font-medium text-white">{d.stone}</td>
                      <td className="px-3 py-2.5 text-txt-muted">{d.displacement} mm</td>
                      <td className="px-3 py-2.5 text-txt-muted">{d.direction}</td>
                      <td className="px-3 py-2.5 text-txt-muted">{d.area}</td>
                      <td className="px-3 py-2.5">
                        <span className={`badge ${severityColor(d.severity)}`}>{d.severity}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* DEFECT DETECTION */}
          <div className="card-panel p-5">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle size={16} className="text-accent-light" />
              <p className="text-sm font-semibold text-white">Defect Detection</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-txt-muted border-b border-white/5">
                    <th className="text-left font-medium px-3 py-2.5">Defect ID</th>
                    <th className="text-left font-medium px-3 py-2.5">Location</th>
                    <th className="text-left font-medium px-3 py-2.5">Defect Type</th>
                    <th className="text-left font-medium px-3 py-2.5">Severity</th>
                    <th className="text-left font-medium px-3 py-2.5">Confidence</th>
                    <th className="text-left font-medium px-3 py-2.5">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockDefectData.map((d) => (
                    <tr key={d.id} className="border-b border-white/5 hover:bg-white/[0.03]">
                      <td className="px-3 py-2.5 font-medium text-white">{d.id}</td>
                      <td className="px-3 py-2.5 text-txt-muted">{d.location}</td>
                      <td className="px-3 py-2.5 text-txt-muted">{d.type}</td>
                      <td className="px-3 py-2.5">
                        <span className={`badge ${severityColor(d.severity)}`}>{d.severity}</span>
                      </td>
                      <td className="px-3 py-2.5 text-txt-muted">{d.confidence}%</td>
                      <td className="px-3 py-2.5">
                        <span className={`badge ${d.status === 'Confirmed' ? 'bg-success-dim text-success' : 'bg-warning-dim text-warning'}`}>{d.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ANALYSIS SUMMARY */}
          <div className="card-panel p-5">
            <div className="flex items-center gap-2 mb-4">
              <Search size={16} className="text-accent-light" />
              <p className="text-sm font-semibold text-white">Analysis Summary</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-3">
                {[
                  ['Overall Condition', results.overallCondition, 'text-warning'],
                  ['Primary Finding', results.primaryFinding, 'text-txt-muted'],
                  ['Highest Risk', results.highestRisk, 'text-txt-muted'],
                  ['Inspection Priority', results.inspectionPriority, 'text-danger'],
                ].map(([label, val, valClass]) => (
                  <div key={label} className="stat-panel px-4 py-3">
                    <p className="text-[10px] text-txt-muted mb-0.5">{label}</p>
                    <p className={`text-sm font-semibold ${valClass}`}>{val}</p>
                  </div>
                ))}
              </div>
              <div className="stat-panel px-4 py-4">
                <p className="text-xs font-semibold text-white mb-3">Key Findings</p>
                <div className="space-y-2.5">
                  {[
                    { icon: TrendingUp, text: `${results.defects.total} defects detected across the structure`, color: 'text-danger' },
                    { icon: Target, text: `Maximum displacement of ${results.displacement.max} mm in ${results.displacement.affectedArea}`, color: 'text-accent-light' },
                    { icon: Shield, text: `Structural stability at ${results.stability}% — ${stabilityLabel(results.stability).toLowerCase()}`, color: stabilityColor(results.stability) },
                    { icon: BarChart3, text: `Analysis confidence of ${results.confidence}% across all data sources`, color: 'text-blue-400' },
                  ].map((f, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <f.icon size={14} className={`${f.color} shrink-0 mt-0.5`} />
                      <p className="text-xs text-txt-muted">{f.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM ACTIONS */}
          <div className="flex flex-wrap items-center justify-center gap-3 pb-4">
            <button onClick={runAgain} className="btn-primary px-6 py-2.5 text-sm font-semibold flex items-center gap-2">
              <RotateCcw size={15} /> Run Analysis Again
            </button>
            <button className="btn-outline px-6 py-2.5 text-sm font-semibold flex items-center gap-2">
              <Download size={15} /> Download Analysis Report
            </button>
            <button onClick={clearReports} className="btn-outline px-6 py-2.5 text-sm font-semibold flex items-center gap-2">
              <Trash2 size={15} /> Clear Reports
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
