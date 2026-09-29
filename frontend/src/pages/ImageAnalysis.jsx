import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ScanSearch, X, RotateCcw, RefreshCw, Wifi, CheckCircle2, AlertTriangle,
  ShieldAlert, ShieldCheck, Eye, EyeOff, Sparkles, Download, ChevronRight,
  ChevronDown, Clock, Calendar, MapPin, Radio, Target, BarChart3,
  Waves, Image as ImageIcon, Maximize2, Activity, GitMerge, ExternalLink,
  Layers, Move, HelpCircle, Database,
} from 'lucide-react'
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts'
import PageHeader from '../components/PageHeader.jsx'
import ImageUploadCard from '../components/ImageUploadCard.jsx'
import { useWaveAnalysis } from '../contexts/WaveAnalysisContext.jsx'
import {
  PIPELINE_STAGES, mockStoneMatches, mockDefects, generatedOutputs,
  DISPLACEMENT_NOTICE, formatFileSize,
} from '../data/imageAnalysisData.js'
import { datasetRegistry, priorityBadge, defectTaxonomy } from '../data/datasetRegistry.js'

const STONE_COUNT_ANALYZED = 48
const STONE_COUNT_MATCHED = 47
const ANALYSIS_CONFIDENCE = 92

const sevDot = { Critical: 'bg-danger', High: 'bg-orange-400', Medium: 'bg-warning', Low: 'bg-success' }
const sevBadge = {
  Critical: 'bg-danger-dim text-danger',
  High: 'bg-orange-500/15 text-orange-400',
  Medium: 'bg-warning-dim text-warning',
  Low: 'bg-success-dim text-success',
}
const tooltipStyle = { background: '#0a1c33', border: '1px solid rgba(94,168,219,0.2)', borderRadius: 10, fontSize: 11 }

export default function ImageAnalysis() {
  const { waveAnalysis } = useWaveAnalysis()
  const waveMetrics = waveAnalysis.metrics
  const waveCompleted = waveAnalysis.status === 'completed'

  const [pre, setPre] = useState(null)
  const [post, setPost] = useState(null)
  const [phase, setPhase] = useState('input') // 'input' | 'analyzing' | 'results'
  const [stage, setStage] = useState(0)
  const [showOverlays, setShowOverlays] = useState(true)
  const [sensors, setSensors] = useState({ uav: true, ortho: false, pointCloud: false, dsm: false })
  const [sensor3d, setSensor3d] = useState(false)
  const [metricMode, setMetricMode] = useState('px') // 'px' | 'mm'
  const [scaleMmPx, setScaleMmPx] = useState(1.0)
  const [showRegistry, setShowRegistry] = useState(false)

  const canStart = Boolean(pre && post)
  const dispUnit = metricMode === 'mm' ? 'mm' : 'px'

  const present = useMemo(() => mockStoneMatches.filter((m) => m.matched), [])
  const missingCount = mockStoneMatches.length - present.length
  const moved = present.filter((m) => m.px > 20).length
  const rotated = present.filter((m) => m.rotation && Math.abs(m.rotation.yaw) >= 5).length
  const maxDisp = useMemo(() => Math.max(...present.map((m) => m.px)), [present])
  const toDisp = (px) => (metricMode === 'mm' ? +(px * scaleMmPx).toFixed(1) : px)

  const preMarkers = mockStoneMatches.map((m) => ({
    id: m.id, x: m.pre.x, y: m.pre.y, color: m.matched ? sevDot[m.severity] : 'bg-violet-400', missing: !m.matched,
  }))
  const postMarkers = present.map((m) => ({
    id: m.id, x: m.post.x, y: m.post.y, color: sevDot[m.severity],
  }))
  const chartData = present.map((m) => ({ name: m.id, value: toDisp(m.px) }))

  const stageModule =
    stage <= 1 ? 'Input Validation'
    : stage === 2 ? 'Stage 1 · Detection / Segmentation'
    : stage === 3 ? 'Stage 2 · PRE/POST Matching'
    : stage === 4 ? 'Stage 3 · Displacement'
    : stage === 5 ? 'Stage 4 · Rotation'
    : stage === 6 ? 'Stage 5 · Defects'
    : 'Correlation & Report'

  useEffect(() => {
    if (phase !== 'analyzing') return
    if (stage < PIPELINE_STAGES.length - 1) {
      const t = setTimeout(() => setStage((s) => s + 1), 520 + Math.random() * 700)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setPhase('results'), 700)
    return () => clearTimeout(t)
  }, [phase, stage])

  function startAnalysis() {
    if (!canStart || phase !== 'input') return
    setPhase('analyzing')
    setStage(0)
  }

  function runAgain() {
    if (!pre || !post) return
    setPhase('analyzing')
    setStage(0)
  }

  function resetAll() {
    setPhase('input')
    setStage(0)
    setPre(null)
    setPost(null)
    setShowOverlays(true)
    setSensors({ uav: true, ortho: false, pointCloud: false, dsm: false })
    setSensor3d(false)
    setMetricMode('px')
    setScaleMmPx(1)
    setShowRegistry(false)
  }

  function toggleSensor(key) {
    const next = { ...sensors, [key]: !sensors[key] }
    setSensors(next)
    setSensor3d(next.pointCloud || next.dsm)
  }

  function downloadReport() {
    const payload = {
      module: 'Image Analysis — Armour-Stone Displacement & Defect Detection',
      generatedAt: new Date().toISOString(),
      inputs: {
        pre: pre ? { name: pre.name, size: pre.size, width: pre.width, height: pre.height } : null,
        post: post ? { name: post.name, size: post.size, width: post.width, height: post.height } : null,
        sensors: { ...sensors, sensor3d },
        metricMode,
        scaleMmPerPixel: scaleMmPx,
        waveAnalysis: {
          status: waveAnalysis.status,
          metrics: waveMetrics,
          lastCompleted: waveAnalysis.lastCompleted,
        },
      },
      summary: {
        stonesAnalyzed: STONE_COUNT_ANALYZED,
        matched: STONE_COUNT_MATCHED,
        displacedUnits: moved + missingCount,
        missingUnits: missingCount,
        rotatedUnits: rotated,
        defects: mockDefects.length,
        maxDisplacement: toDisp(maxDisp),
        units: dispUnit,
        confidence: ANALYSIS_CONFIDENCE,
      },
      displacement: mockStoneMatches.map((m) => ({
        id: m.id, zone: m.zone, matched: m.matched,
        deltaX: m.dX === null ? null : toDisp(m.dX),
        deltaY: m.dY === null ? null : toDisp(m.dY),
        deltaZmm: sensor3d ? m.dz : null,
        magnitude: m.px === null ? null : toDisp(m.px),
        direction: m.dir,
        rotationDeg: sensor3d ? m.rotation : null,
        severity: m.severity,
        confidence: m.confidence,
      })),
      defects: mockDefects,
      notes: [DISPLACEMENT_NOTICE],
    }
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'armour-stone-analysis-report.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="dark-page pb-16">
      {/* Top bar */}
      <div className="px-4 lg:px-6 pt-4">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <span className="badge bg-accent-dim text-accent-light"><ScanSearch size={12} /> Multi-Stage AI Pipeline · Detection → Matching → Displacement → Defects</span>
          <div className="flex items-center gap-2">
            <span className="badge bg-success-dim text-success"><Wifi size={12} /> API Connected · Live Data</span>
            <button className="btn-primary px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5" onClick={runAgain}><RefreshCw size={12} /> Sync Now</button>
          </div>
        </div>

        <PageHeader
          icon={ScanSearch}
          crumbs={[{ label: 'Home', path: '/' }, { label: 'Image Analysis' }]}
          title="Image Analysis"
          subtitle="Upload PRE-event and POST-event breakwater images to detect armour-stone displacement, rotation and defects, combined with the existing Wave Analysis results."
          right={
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={startAnalysis}
                disabled={phase !== 'input' || !canStart}
                className={`btn-primary px-4 py-2.5 text-sm font-semibold flex items-center gap-2 ${
                  phase !== 'input' || !canStart ? 'opacity-40 cursor-not-allowed !shadow-none' : ''
                }`}
              >
                <Sparkles size={15} /> Start Image Analysis
              </button>
              <button onClick={resetAll} className="btn-outline px-4 py-2.5 text-sm font-semibold flex items-center gap-2">
                <RotateCcw size={15} /> Reset Analysis
              </button>
            </div>
          }
        />
      </div>

      {/* ============ INPUT PHASE ============ */}
      {phase === 'input' && (
        <div className="px-4 lg:px-6 mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr_280px] gap-4 mb-4">
            <ImageUploadCard
              tag="PRE"
              tagClass="bg-accent-dim text-accent-light"
              title="PRE-Event Image"
              subtitle="Baseline capture"
              purpose="Image captured before the storm / event / survey."
              file={pre}
              onReady={setPre}
              onRemove={() => setPre(null)}
              metaFields={[
                { icon: Calendar, label: 'Capture Date', value: '10 May 2024' },
                { icon: MapPin, label: 'Zone', value: 'Zone 03' },
                { icon: Radio, label: 'Sensor Type', value: 'Aerial Image (UAV)' },
              ]}
            />
            <ImageUploadCard
              tag="POST"
              tagClass="bg-success-dim text-success"
              title="POST-Event Image"
              subtitle="Latest capture"
              purpose="Image captured after the storm / event / survey."
              file={post}
              onReady={setPost}
              onRemove={() => setPost(null)}
              metaFields={[
                { icon: Calendar, label: 'Capture Date', value: '12 May 2025' },
                { icon: MapPin, label: 'Zone', value: 'Zone 03' },
                { icon: Radio, label: 'Sensor Type', value: 'Aerial Image (UAV)' },
              ]}
            />

            {/* 3D & Sensor data (optional) */}
            <div className="card-panel p-4">
              <div className="flex items-center gap-2 text-white font-semibold text-sm mb-1">
                <Layers size={16} className="text-accent-light" /> 3D & Sensor Data
              </div>
              <p className="text-xs text-txt-muted mb-1">Optional — used where available</p>
              <p className="text-[10px] text-txt-dim mb-3">UAV imagery, orthomosaic, point clouds and DSM/DEM unlock 3D displacement and roll/pitch/yaw estimation.</p>
              <div className="space-y-2 mb-3">
                <SensorToggle label="UAV / Drone Imagery" on={sensors.uav} onToggle={() => toggleSensor('uav')} />
                <SensorToggle label="Orthomosaic" on={sensors.ortho} onToggle={() => toggleSensor('ortho')} />
                <SensorToggle label="Point Cloud / 3D (ΔZ · Roll/Pitch/Yaw)" on={sensors.pointCloud} onToggle={() => toggleSensor('pointCloud')} />
                <SensorToggle label="DSM / DEM" on={sensors.dsm} onToggle={() => toggleSensor('dsm')} />
              </div>
              <div className="pt-3 border-t border-white/5">
                <p className="text-txt-muted mb-1.5 text-[11px]">Displacement units</p>
                <div className="flex gap-2 mb-3">
                  <button
                    onClick={() => setMetricMode('px')}
                    className={`flex-1 py-1.5 rounded-lg text-[10px] font-semibold ${metricMode === 'px' ? 'bg-accent text-white' : 'bg-white/5 text-txt-muted'}`}
                  >
                    Pixel (image-space)
                  </button>
                  <button
                    onClick={() => setMetricMode('mm')}
                    className={`flex-1 py-1.5 rounded-lg text-[10px] font-semibold ${metricMode === 'mm' ? 'bg-accent text-white' : 'bg-white/5 text-txt-muted'}`}
                  >
                    Millimetres
                  </button>
                </div>
                {metricMode === 'mm' && (
                  <div>
                    <p className="text-txt-muted mb-1 text-[11px]">Scale (mm per pixel)</p>
                    <input
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={scaleMmPx}
                      onChange={(e) => setScaleMmPx(Math.max(0.01, Number(e.target.value) || 1))}
                      className="input-dark w-full px-3 py-2 text-xs"
                    />
                    <p className="text-[9px] text-txt-dim mt-1">Physical mm requires calibrated GCP / known geometry. mm = Δpx × scale.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Wave Analysis context */}
            <div className="card-panel p-4">
              <div className="flex items-center gap-2 text-white font-semibold text-sm mb-2">
                <Waves size={16} className="text-accent-light" /> Wave Analysis Context
              </div>
              <span className={`badge mb-3 ${waveCompleted ? 'bg-success-dim text-success' : 'bg-warning-dim text-warning'}`}>
                {waveCompleted ? <CheckCircle2 size={12} /> : <AlertTriangle size={12} />}
                {waveCompleted ? 'Wave Analysis Completed' : 'No Wave Analysis Run'}
              </span>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <MiniStat icon={Waves} label="Wave Height" value={`${waveMetrics.height} m`} />
                <MiniStat icon={Clock} label="Wave Period" value={`${waveMetrics.period} s`} />
                <MiniStat icon={MapPin} label="Direction" value={`${waveMetrics.direction}° ${waveMetrics.directionLabel}`} />
                <MiniStat icon={BarChart3} label="Energy" value={`${waveMetrics.energy} kW/m`} />
                <MiniStat icon={Waves} label="Water Level" value={`${waveMetrics.waterLevel} m`} />
                <MiniStat icon={Clock} label="Frequency" value={`${waveMetrics.frequency} Hz`} />
              </div>
              <p className="text-[10px] text-txt-dim mb-3">
                Wave parameters are retrieved from the existing Wave Analysis module and combined into the armour-stone analysis.
              </p>
              {!waveCompleted && (
                <Link to="/wave-analysis" className="btn-outline w-full py-2 text-[11px] font-semibold flex items-center justify-center gap-1.5">
                  Run Wave Analysis First <ChevronRight size={12} />
                </Link>
              )}
              {waveCompleted && (
                <p className="text-[10px] text-success flex items-center gap-1">
                  <CheckCircle2 size={11} /> Last run: {waveAnalysis.lastCompleted?.toLocaleString?.() || 'just now'}
                </p>
              )}
            </div>
          </div>

          {/* Start button */}
          <div className="mt-2 flex flex-col items-center pb-2">
            <button
              onClick={startAnalysis}
              disabled={!canStart}
              className={`btn-primary px-8 py-3 text-sm font-semibold flex items-center gap-2.5 ${
                !canStart ? 'opacity-40 cursor-not-allowed !shadow-none' : ''
              }`}
            >
              <Sparkles size={16} /> Start Image Analysis <ChevronRight size={15} />
            </button>
            {!canStart && (
              <p className="text-[11px] text-txt-dim mt-2">
                {!pre && !post
                  ? 'Please upload both the PRE-Event and POST-Event images.'
                  : !pre
                  ? 'Please upload the PRE-Event image (captured before the event).'
                  : 'Please upload the POST-Event image (captured after the event).'}
              </p>
            )}
            {pre && post && (
              <p className="text-[11px] text-success mt-2 flex items-center gap-1">
                <CheckCircle2 size={12} /> Both images validated and ready for analysis.
              </p>
            )}
          </div>
        </div>
      )}

      {/* ============ ANALYZING PHASE ============ */}
      {phase === 'analyzing' && (
        <div className="px-4 lg:px-6 mt-6">
          <div className="card-panel p-6 max-w-2xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent-dim flex items-center justify-center">
                <ScanSearch size={18} className="text-accent-light animate-spin-slow" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Analyzing PRE ↔ POST Imagery</p>
                <p className="text-[11px] text-accent-light">{stageModule}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 mb-5">
              <FileChip tag="PRE" file={pre} color="bg-accent" />
              <FileChip tag="POST" file={post} color="bg-success" />
            </div>

            <div className="space-y-2.5">
              {PIPELINE_STAGES.map((s, i) => {
                const done = i < stage
                const active = i === stage
                return (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold transition-all ${
                      done ? 'bg-success/20 text-success' : active ? 'bg-accent/20 text-accent-light' : 'bg-white/5 text-txt-dim'
                    }`}>
                      {done ? <CheckCircle2 size={14} /> : i + 1}
                    </div>
                    <span className={`text-xs transition-colors ${
                      done ? 'text-success' : active ? 'text-white font-medium' : 'text-txt-dim'
                    }`}>
                      {s}
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
                  style={{ width: `${((stage + 1) / PIPELINE_STAGES.length) * 100}%` }}
                />
              </div>
              <p className="text-[10px] text-txt-dim mt-1.5 text-right">
                {Math.round(((stage + 1) / PIPELINE_STAGES.length) * 100)}% complete
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ============ RESULTS PHASE ============ */}
      {phase === 'results' && (
        <div className="px-4 lg:px-6 mt-4 space-y-4">
          {/* STATUS BANNER */}
          <div className="card-panel p-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-success-dim flex items-center justify-center">
                <CheckCircle2 size={20} className="text-success" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Armour-Stone Displacement & Defect Analysis</p>
                <p className="text-[11px] text-success">
                  Analysis Completed · {STONE_COUNT_ANALYZED} units analyzed · {STONE_COUNT_MATCHED} matched · {missingCount} missing
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button onClick={runAgain} className="btn-outline px-4 py-2 text-xs font-semibold flex items-center gap-1.5">
                <RotateCcw size={13} /> Run Again
              </button>
              <button onClick={downloadReport} className="btn-outline px-4 py-2 text-xs font-semibold flex items-center gap-1.5">
                <Download size={13} /> Download Report
              </button>
              <Link to="/solvyn-analysis" className="btn-primary px-4 py-2 text-xs font-semibold flex items-center gap-1.5">
                <Activity size={13} /> Open Solvyn Analysis <ChevronRight size={13} />
              </Link>
            </div>
          </div>

          {/* KEY METRICS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <Kpi icon={Move} label="Max Displacement" value={`${toDisp(maxDisp)} ${dispUnit}`} sub={`Direction varies · ${sensor3d ? '3D enabled' : '2D image-space'}`} iconBg="bg-accent-dim text-accent-light" />
            <Kpi icon={AlertTriangle} label="Displaced Units" value={moved + missingCount} sub={`${missingCount} missing · ${moved} moved`} iconBg="bg-danger-dim text-danger" />
            <Kpi icon={ShieldAlert} label="Defects Detected" value={mockDefects.length} sub="Crack · Chip · Fracture · Breakage" iconBg="bg-orange-500/15 text-orange-400" />
            <Kpi icon={BarChart3} label="Analysis Confidence" value={`${ANALYSIS_CONFIDENCE}%`} sub={
              <span className="block mt-1.5">
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" style={{ width: `${ANALYSIS_CONFIDENCE}%` }} />
                </div>
              </span>
            } iconBg="bg-success-dim text-success" />
          </div>

          {/* MINI SUMMARY */}
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-2">
            <MiniStat icon={ShieldCheck} label="Stones Analyzed" value={STONE_COUNT_ANALYZED} />
            <MiniStat icon={ScanSearch} label="Successfully Matched" value={STONE_COUNT_MATCHED} />
            <MiniStat icon={AlertTriangle} label="Displaced Units" value={moved + missingCount} color="text-danger" />
            <MiniStat icon={X} label="Missing Units" value={missingCount} color="text-danger" />
            <MiniStat icon={RotateCcw} label="Rotation ≥ 5°" value={rotated} color="text-warning" />
            <MiniStat icon={HelpCircle} label="Uncertain / Review" value={mockDefects.filter((d) => d.status === 'Review').length} color="text-warning" />
          </div>

          {/* COMPARISON VISUAL */}
          <div className="card-panel p-4">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 text-white font-semibold text-sm">
                <ScanSearch size={16} className="text-accent-light" /> PRE ↔ POST Comparison & Detection Overlays
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowOverlays((v) => !v)}
                  className="btn-outline px-3 py-1.5 text-[11px] font-semibold flex items-center gap-1.5"
                >
                  {showOverlays ? <Eye size={12} /> : <EyeOff size={12} />} {showOverlays ? 'Hide Overlays' : 'Show Overlays'}
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <PreviewPanel label="PRE-Event" sub="10 May 2024 · Zone 03" file={pre} markers={preMarkers} overlays={showOverlays} />
              <PreviewPanel label="POST-Event" sub="12 May 2025 · Zone 03" file={post} markers={postMarkers} overlays={showOverlays} />
            </div>
            <div className="flex flex-wrap items-center gap-4 mt-3 text-[10px] text-txt-muted">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-danger" /> Moved / displaced</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-orange-400" /> Damaged</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-warning" /> Possible change</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-success" /> No significant change</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-violet-400 ring-2 ring-white/60" /> Missing in POST</span>
            </div>
            <div className={`mt-3 flex items-start gap-2 rounded-lg px-3 py-2 text-[11px] ${metricMode === 'px' ? 'bg-warning-dim text-warning' : 'bg-success-dim text-success'}`}>
              <AlertTriangle size={13} className="shrink-0 mt-0.5" />
              <span>{DISPLACEMENT_NOTICE}</span>
            </div>
          </div>

          {/* DISPLACEMENT + ROTATION */}
          <div className="grid grid-cols-1 xl:grid-cols-[1.6fr_1fr] gap-4">
            <div className="card-panel p-4 min-w-0">
              <div className="flex items-center gap-2 text-white font-semibold text-sm mb-1">
                <Move size={16} className="text-accent-light" /> Displacement & Rotation Per Unit
              </div>
              <p className="text-[10px] text-txt-muted mb-3">
                ΔZ and roll/pitch/yaw are {sensor3d ? 'enabled (point-cloud / DSM·DEM attached)' : 'unavailable — attach 3D & sensor data to estimate vertical movement and orientation change'}.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-txt-muted border-b border-white/5">
                      <th className="text-left font-medium px-3 py-2.5">Unit</th>
                      <th className="text-left font-medium px-3 py-2.5">Zone</th>
                      <th className="text-left font-medium px-3 py-2.5">ΔX</th>
                      <th className="text-left font-medium px-3 py-2.5">ΔY</th>
                      <th className="text-left font-medium px-3 py-2.5">Magnitude</th>
                      <th className="text-left font-medium px-3 py-2.5">ΔZ</th>
                      <th className="text-left font-medium px-3 py-2.5">Direction</th>
                      <th className="text-left font-medium px-3 py-2.5">Rotation</th>
                      <th className="text-left font-medium px-3 py-2.5">Severity</th>
                      <th className="text-left font-medium px-3 py-2.5">Conf.</th>
                      <th className="text-left font-medium px-3 py-2.5">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockStoneMatches.map((m) => {
                      const missing = !m.matched
                      return (
                        <tr key={m.id} className="border-b border-white/5 hover:bg-white/[0.03]">
                          <td className="px-3 py-2.5 font-medium text-white">{m.id}</td>
                          <td className="px-3 py-2.5 text-txt-muted">{m.zone}</td>
                          <td className="px-3 py-2.5 text-txt-muted">{missing ? '—' : toDisp(m.dX)}</td>
                          <td className="px-3 py-2.5 text-txt-muted">{missing ? '—' : toDisp(m.dY)}</td>
                          <td className="px-3 py-2.5 font-semibold text-white">{missing ? '—' : `${toDisp(m.px)} ${dispUnit}`}</td>
                          <td className="px-3 py-2.5 text-txt-muted">{sensor3d && !missing ? `${m.dz} mm` : '—'}</td>
                          <td className="px-3 py-2.5 text-txt-muted">{m.dir}</td>
                          <td className="px-3 py-2.5 text-txt-muted">
                            {sensor3d && !missing ? `${m.rotation?.yaw ?? 0}°` : '—'}
                          </td>
                          <td className="px-3 py-2.5"><span className={`badge ${sevBadge[m.severity]}`}>{m.severity}</span></td>
                          <td className="px-3 py-2.5 text-txt-muted">{m.confidence}%</td>
                          <td className="px-3 py-2.5">
                            <span className={`badge ${m.status === 'Confirmed' ? 'bg-success-dim text-success' : 'bg-warning-dim text-warning'}`}>{m.status}</span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              <p className="text-[9px] text-txt-dim mt-2">
                D = √(ΔX² + ΔY² + ΔZ²) · Displacement is measured {metricMode === 'mm' ? 'in mm via the configured scale' : 'in image-space (px)'} — never reported as true physical metres without calibration.
              </p>
            </div>

            {/* Displacement chart */}
            <div className="card-panel p-4 min-w-0">
              <div className="flex items-center gap-2 text-white font-semibold text-sm mb-2">
                <BarChart3 size={16} className="text-accent-light" /> Displacement Magnitude
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 20, right: 10, left: -24, bottom: 0 }}>
                    <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis dataKey="name" tick={{ fill: '#7e97b3', fontSize: 9 }} angle={-35} textAnchor="end" height={46} axisLine={{ stroke: 'rgba(255,255,255,0.08)' }} tickLine={false} />
                    <YAxis tick={{ fill: '#7e97b3', fontSize: 10 }} axisLine={false} tickLine={false} label={{ value: dispUnit, angle: -90, position: 'insideLeft', fill: '#7e97b3', fontSize: 10 }} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Bar dataKey="value" name={`Magnitude (${dispUnit})`} fill="#22d3ee" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-[10px] text-txt-dim mt-1">Per matched unit — highest impact units {metricMode === 'mm' ? '(mm)' : '(px)'}.</p>
            </div>
          </div>

          {/* DEFECTS */}
          <div className="card-panel p-5">
            <div className="flex items-center gap-2 mb-1">
              <ShieldAlert size={16} className="text-accent-light" />
              <p className="text-sm font-semibold text-white">Defect Detection</p>
            </div>
            <p className="text-[10px] text-txt-muted mb-3">
              Labels come from the fixed taxonomy only — never invented on the fly. See the dataset registry below for the training & annotation workflow.
            </p>
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
                  {mockDefects.map((d) => (
                    <tr key={d.id} className="border-b border-white/5 hover:bg-white/[0.03]">
                      <td className="px-3 py-2.5 font-medium text-white">{d.id}</td>
                      <td className="px-3 py-2.5 text-txt-muted">{d.stone} · {d.location}</td>
                      <td className="px-3 py-2.5 text-txt-muted">{d.type}</td>
                      <td className="px-3 py-2.5"><span className={`badge ${sevBadge[d.severity]}`}>{d.severity}</span></td>
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

          {/* WAVE + IMAGE → ARMOUR-STONE FLOW */}
          <div className="card-panel p-5">
            <div className="flex items-center gap-2 mb-4">
              <GitMerge size={16} className="text-accent-light" />
              <p className="text-sm font-semibold text-white">Combined Analysis — Wave + Image → Armour-Stone</p>
            </div>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-3 lg:gap-5 py-3">
              <div className="stat-panel px-5 py-4 text-center min-w-[180px]">
                <Waves size={20} className="text-accent-light mx-auto mb-2" />
                <p className="text-xs font-semibold text-white">WAVE ANALYSIS</p>
                <p className="text-[10px] text-txt-muted mt-0.5">Hs {waveMetrics.height} m · Tp {waveMetrics.period} s · {waveMetrics.direction}° {waveMetrics.directionLabel}</p>
              </div>
              <FlowArrow />
              <div className="stat-panel px-6 py-5 text-center border border-accent/30 min-w-[200px]">
                <ScanSearch size={24} className="text-accent-light mx-auto mb-2" />
                <p className="text-sm font-bold text-white">IMAGE ANALYSIS</p>
                <p className="text-[10px] text-accent-light mt-0.5">PRE ↔ POST · {STONE_COUNT_ANALYZED} units</p>
              </div>
              <FlowArrow />
              <div className="flex flex-col gap-3 min-w-[180px]">
                <div className="stat-panel px-4 py-3 text-center">
                  <Move size={16} className="text-accent-light mx-auto mb-1" />
                  <p className="text-xs font-semibold text-white">Displacement</p>
                </div>
                <div className="stat-panel px-4 py-3 text-center">
                  <ShieldAlert size={16} className="text-danger mx-auto mb-1" />
                  <p className="text-xs font-semibold text-white">Defects</p>
                </div>
              </div>
              <FlowArrow />
              <div className="stat-panel px-5 py-4 text-center min-w-[180px]">
                <Target size={20} className="text-accent-light mx-auto mb-2" />
                <p className="text-xs font-semibold text-white">ARMOUR-STONE REPORT</p>
                <p className="text-[10px] text-txt-muted mt-0.5">Displacement + Defects + Wave context</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {[
                `Wave Height ${waveMetrics.height} m`,
                `Wave Period ${waveMetrics.period} s`,
                `Direction ${waveMetrics.direction}° ${waveMetrics.directionLabel}`,
                `Energy ${waveMetrics.energy} kW/m`,
                `Water Level ${waveMetrics.waterLevel} m`,
                `Frequency ${waveMetrics.frequency} Hz`,
              ].map((chip) => (
                <span key={chip} className="badge bg-accent-dim text-accent-light">{chip}</span>
              ))}
            </div>
            <p className="text-[11px] text-txt-muted mt-3">
              Wave conditions from the existing Wave Analysis module are correlated with the displaced & defective units concentrated in
              Zones 02–09 (wave-exposed section). These parameters weight the structural-impact risk of each affected unit.
            </p>
          </div>

          {/* GENERATED OUTPUTS */}
          <div className="card-panel p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-white font-semibold text-sm">
                <Maximize2 size={15} className="text-accent-light" /> Generated Multi-Sensor Outputs
              </div>
              <button className="btn-outline px-3 py-1.5 text-xs font-semibold">View All</button>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {generatedOutputs.map((v) => (
                <div key={v.label} className={`rounded-xl overflow-hidden relative group bg-gradient-to-br ${v.bg}`}>
                  <div className="w-full h-20" />
                  <div className="absolute inset-0 bg-black/30" />
                  <p className="absolute top-1.5 left-1.5 text-[9px] font-semibold text-white">{v.sub}</p>
                  <p className="absolute bottom-1.5 left-1.5 text-[10px] font-semibold text-white">{v.label}</p>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-txt-dim mt-2">Multi-sensor outputs · segmentation masks, matched pairs, displacement vectors, 3D unit model when sensor data is attached.</p>
          </div>

          {/* DATASET REGISTRY */}
          <div className="card-panel p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-white font-semibold text-sm">
                <Database size={16} className="text-accent-light" /> Public Dataset Registry — Training & Validation Sources
              </div>
              <button
                onClick={() => setShowRegistry((v) => !v)}
                className="btn-outline px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5"
              >
                {showRegistry ? 'Hide' : 'Show'} Sources <ChevronDown size={12} className={`transition-transform ${showRegistry ? 'rotate-180' : ''}`} />
              </button>
            </div>
            {showRegistry && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  {datasetRegistry.map((d) => (
                    <div key={d.id} className="stat-panel p-3.5">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <p className="text-xs font-semibold text-white">{d.name}</p>
                        <span className={`badge shrink-0 ${priorityBadge(d.priority)}`}>{d.priority}</span>
                      </div>
                      <p className="text-[10px] text-txt-dim mb-2">{d.location}</p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {d.useCases.map((u) => (
                          <span key={u} className="badge bg-white/5 text-txt-muted">{u}</span>
                        ))}
                      </div>
                      <a href={d.url} target="_blank" rel="noreferrer" className="text-accent-light text-[10px] font-semibold flex items-center gap-1 break-all">
                        <ExternalLink size={11} /> {d.url}
                      </a>
                      {d.repositoryUrl && (
                        <a href={d.repositoryUrl} target="_blank" rel="noreferrer" className="text-accent-light text-[10px] font-semibold flex items-center gap-1 mt-1 break-all">
                          <ExternalLink size={11} /> Repository: {d.repositoryUrl}
                        </a>
                      )}
                      <p className="text-[9px] text-txt-dim mt-2">{d.notes}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-lg bg-white/5 p-3 mb-3">
                  <p className="text-[11px] font-semibold text-white mb-1.5 flex items-center gap-1.5"><ShieldCheck size={12} className="text-success" /> Defect Taxonomy (fixed label set)</p>
                  <div className="flex flex-wrap gap-1">
                    {defectTaxonomy.map((t) => (
                      <span key={t.id} className="badge bg-accent-dim text-accent-light">{t.label}</span>
                    ))}
                  </div>
                </div>
                <p className="text-[10px] text-txt-dim">
                  Annotation workflow: annotate every visible armour unit as a segmentation mask (COCO / YOLO-Seg + SAM-assisted), assign a
                  persistent stone ID and zone, then mark defects using only the taxonomy above. This is how future real-world images get labelled
                  before models are fine-tuned on real breakwater data.
                </p>
              </>
            )}
          </div>

          {/* BOTTOM ACTIONS */}
          <div className="flex flex-wrap items-center justify-center gap-3 pb-4">
            <button onClick={runAgain} className="btn-primary px-6 py-2.5 text-sm font-semibold flex items-center gap-2">
              <RotateCcw size={15} /> Run Analysis Again
            </button>
            <button onClick={downloadReport} className="btn-outline px-6 py-2.5 text-sm font-semibold flex items-center gap-2">
              <Download size={15} /> Download Report
            </button>
            <Link to="/solvyn-analysis" className="btn-outline px-6 py-2.5 text-sm font-semibold flex items-center gap-2">
              <Activity size={15} /> Open Combined Solvyn Analysis
            </Link>
            <button onClick={resetAll} className="btn-outline px-6 py-2.5 text-sm font-semibold flex items-center gap-2">
              <X size={15} /> Clear & Upload New Images
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

/* ---------- local helpers ---------- */

function FlowArrow() {
  return (
    <div className="flex lg:flex-col items-center gap-1 text-accent/50">
      <div className="hidden lg:block w-px h-6 bg-accent/30" />
      <ChevronRight size={16} className="lg:rotate-90" />
      <div className="hidden lg:block w-px h-6 bg-accent/30" />
    </div>
  )
}

function SensorToggle({ label, on, onToggle }) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onToggle}
        className="w-9 h-5 rounded-full relative shrink-0"
        style={{ background: on ? '#22d3ee' : 'rgba(255,255,255,0.1)' }}
      >
        <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${on ? 'translate-x-[18px]' : 'translate-x-0.5'}`} />
      </button>
      <span className={`text-[11px] ${on ? 'text-white' : 'text-txt-muted'}`}>{label}</span>
    </div>
  )
}

function MiniStat({ icon: Icon, label, value, color = 'text-accent-light' }) {
  return (
    <div className="stat-panel px-2.5 py-2.5 text-center">
      <Icon size={15} className={`mx-auto mb-1 ${color}`} />
      <p className={`text-sm font-bold ${color}`}>{value}</p>
      <p className="text-[9px] text-txt-muted leading-tight">{label}</p>
    </div>
  )
}

function Kpi({ icon: Icon, label, value, sub, iconBg }) {
  return (
    <div className="card-panel p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconBg}`}>
          <Icon size={15} />
        </div>
        <p className="text-xs font-semibold text-txt-muted">{label}</p>
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      {sub && <div className="text-[11px] text-txt-muted mt-1.5">{sub}</div>}
    </div>
  )
}

function FileChip({ tag, file, color }) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3 py-1.5 text-[11px]">
      <span className={`w-2 h-2 rounded-full ${color}`} />
      <span className="text-accent-light font-semibold">{tag}</span>
      <span className="text-txt-muted truncate max-w-[160px]">{file?.name}</span>
      {file ? <span className="text-txt-dim">{formatFileSize(file.size)}</span> : null}
    </div>
  )
}

function PreviewPanel({ label, sub, file, markers, overlays }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-semibold text-white flex items-center gap-1.5">
          <ScanSearch size={13} className="text-accent-light" /> {label}
        </p>
        {sub && <span className="text-[10px] text-txt-dim">{sub}</span>}
      </div>
      <div className="relative rounded-xl overflow-hidden h-64 bg-gradient-to-br from-ocean-700 via-ocean-800 to-ocean-900 border border-accent/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.12),transparent_70%)]" />
        {file?.preview && (
          <img src={file.preview} alt={`${label} preview`} className="absolute inset-0 w-full h-full object-cover" />
        )}
        {!file?.preview && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-txt-dim">
            <ImageIcon size={26} className="text-accent-light" />
            <span className="text-[11px]">TIFF preview not supported in browser</span>
          </div>
        )}
        {overlays &&
          markers.map((m) => (
            <div
              key={m.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none"
              style={{ top: `${m.y}%`, left: `${m.x}%` }}
            >
              <span className={`w-3 h-3 rounded-full ${m.color} ring-2 ring-white/70`} />
              <span className="mt-0.5 text-[8px] font-bold text-white px-1 bg-black/50 rounded">{m.id}</span>
            </div>
          ))}
      </div>
    </div>
  )
}