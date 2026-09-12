import { useState } from 'react'
import {
  Clock, ScanFace, UploadCloud, X, Calendar, MapPin, Radio, Sparkles,
  ChevronLeft, ChevronRight, Users, AlertTriangle, ShieldAlert, HelpCircle,
  CircleCheck, Download, Settings2, Maximize2,
} from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'

const sensorViews = [
  { label: 'LiDAR Output', sub: '3D point cloud data', bg: 'from-cyan-900/50 to-ocean-800' },
  { label: 'Sonar Output', sub: 'Underwater scan', bg: 'from-sky-900/50 to-ocean-800' },
  { label: 'Photogrammetry', sub: '3D reconstructed view', bg: 'from-teal-900/50 to-ocean-800' },
]

const progressSteps = [
  { label: 'Registering images', value: 100, status: 'done' },
  { label: 'Aligning and identifying stones', value: 72, status: 'active' },
  { label: 'Comparing pre and post images', value: 45, status: 'active' },
  { label: 'Detecting changes and damages', value: 0, status: 'pending' },
  { label: 'Generating multi-sensor outputs', value: 0, status: 'pending' },
]

export default function PrePostAnalysis() {
  const [preImg, setPreImg] = useState(null)
  const [postImg, setPostImg] = useState(null)

  return (
    <div className="dark-page pb-16">
      <PageHeader
        icon={ScanFace}
        crumbs={[{ label: 'Home', path: '/' }, { label: 'Pre & Post Image Analysis' }]}
        title="Pre & Post Image Analysis"
        subtitle="Compare breakwater images across two different inspection periods to detect stone movement, damage, and structural changes using multi-sensor AI analysis."
      />

      <div className="px-4 lg:px-6 mt-4 grid grid-cols-1 xl:grid-cols-[1fr_1fr_1.3fr] gap-4">
        {/* Pre Inspection */}
        <UploadCard
          icon={Clock}
          title="Pre-Inspection Image"
          subtitle="Upload baseline image (earlier inspection)"
          image={preImg}
          onRemove={() => setPreImg(null)}
          captureDate="10 May 2024"
          zone="Zone 03"
          sensor="Aerial Image (UAV)"
        />
        {/* Post Inspection */}
        <UploadCard
          icon={Users}
          title="Post-Inspection Image"
          subtitle="Upload recent image (latest inspection)"
          image={postImg}
          onRemove={() => setPostImg(null)}
          captureDate="12 May 2025"
          zone="Zone 03"
          sensor="Aerial Image (UAV)"
        />

        {/* Analysis Result */}
        <div className="card-panel p-4 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-white font-semibold text-sm">
              <ScanFace size={16} className="text-accent-light" /> Analysis Result
            </div>
            <span className="badge bg-success-dim text-success"><CircleCheck size={12} /> Completed</span>
          </div>

          <div className="relative rounded-xl overflow-hidden h-48 mb-3 bg-gradient-to-br from-ocean-700 via-ocean-800 to-ocean-900 border border-accent/20">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.1),transparent_70%)]" />
            {[
              { top: '30%', left: '20%', color: 'bg-danger' },
              { top: '55%', left: '38%', color: 'bg-warning' },
              { top: '40%', left: '55%', color: 'bg-accent' },
              { top: '65%', left: '70%', color: 'bg-orange-500' },
            ].map((d, i) => (
              <span key={i} className={`absolute w-3 h-3 rounded-full ${d.color} ring-2 ring-white/60`} style={{ top: d.top, left: d.left }} />
            ))}
            <button className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center"><ChevronLeft size={15} /></button>
            <button className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center"><ChevronRight size={15} /></button>
            <div className="absolute bottom-2 left-2 text-[10px] text-white bg-black/40 px-2 py-0.5 rounded">Zone 03 | 12 May 2025</div>
            <div className="absolute top-2 right-2 bg-black/60 rounded-lg p-2 text-[10px] text-white space-y-1">
              <LegendDot color="bg-danger" label="Moved Stone" />
              <LegendDot color="bg-orange-500" label="Damaged Stone" />
              <LegendDot color="bg-warning" label="Possible Change" />
              <LegendDot color="bg-accent" label="No Significant Change" />
            </div>
          </div>

          <div className="grid grid-cols-5 gap-2 mb-3">
            <MiniStat label="Total Stones Analyzed" value="128" icon={Users} color="text-accent" />
            <MiniStat label="Moved Stones" value="6" icon={AlertTriangle} color="text-danger" />
            <MiniStat label="Damaged Stones" value="3" icon={ShieldAlert} color="text-orange-400" />
            <MiniStat label="Missing Stones" value="1" icon={HelpCircle} color="text-violet-400" />
            <MiniStat label="Uncertain" value="2" icon={HelpCircle} color="text-accent" />
          </div>

          <div className="flex gap-2 mt-auto">
            <button className="btn-primary flex-1 py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5">
              View Detailed Results <ChevronRight size={14} />
            </button>
            <button className="btn-outline flex-1 py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5">
              <Download size={13} /> Download Report
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 lg:px-6 mt-4">
        <button className="w-full btn-primary py-3.5 text-sm font-semibold flex items-center justify-center gap-2">
          <Sparkles size={16} /> Analyze Changes
        </button>
      </div>

      <div className="px-4 lg:px-6 mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Analysis progress */}
        <div className="card-panel p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-white font-semibold text-sm">
              <Settings2 size={16} className="text-accent-light" /> Analysis Progress
            </div>
            <span className="badge bg-success-dim text-success"><span className="w-1.5 h-1.5 rounded-full bg-success pulse-dot" /> Live</span>
          </div>
          <div className="space-y-4">
            {progressSteps.map((s, i) => (
              <div key={s.label} className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${
                  s.status === 'done' ? 'bg-success/20 text-success' : s.status === 'active' ? 'bg-accent/20 text-accent-light' : 'bg-white/5 text-txt-dim'
                }`}>{i + 1}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-txt-primary mb-1.5">{s.label}</p>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div className={`h-full rounded-full ${s.status === 'done' ? 'bg-success' : 'bg-accent'}`} style={{ width: `${s.value}%` }} />
                  </div>
                </div>
                <span className="text-[11px] text-txt-muted w-20 text-right shrink-0">
                  {s.status === 'done' ? '100% ✓' : s.status === 'active' ? `${s.value}%` : 'Pending'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Generated Sensor Views */}
        <div className="card-panel p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-white font-semibold text-sm">
              <Maximize2 size={15} className="text-accent-light" /> Generated Sensor Views
            </div>
            <button className="btn-outline px-3 py-1.5 text-xs font-semibold">View All</button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {sensorViews.map((v) => (
              <div key={v.label} className={`rounded-xl overflow-hidden relative group bg-gradient-to-br ${v.bg}`}>
                <div className="w-full h-20" />
                <div className="absolute inset-0 bg-black/30" />
                <p className="absolute bottom-1 left-1.5 text-[10px] font-semibold text-white">{v.label}</p>
              </div>
            ))}
            <div className="rounded-xl overflow-hidden relative bg-gradient-to-br from-ocean-600 to-ocean-800 flex items-center justify-center border border-accent/20">
              <div className="w-full h-20" />
              <p className="absolute text-white text-sm font-bold">+24</p>
            </div>
          </div>
          <p className="text-[10px] text-txt-dim mt-2">Other views · Additional images</p>
        </div>
      </div>
    </div>
  )
}

function UploadCard({ icon: Icon, title, subtitle, image, onRemove, captureDate, zone, sensor }) {
  return (
    <div className="card-panel p-4">
      <div className="flex items-center gap-2 text-white font-semibold text-sm mb-1">
        <Icon size={16} className="text-accent-light" /> {title}
      </div>
      <p className="text-xs text-txt-muted mb-3">{subtitle}</p>

      {!image ? (
        <label className="border-2 border-dashed border-accent/25 rounded-xl h-32 flex flex-col items-center justify-center text-center cursor-pointer hover:border-accent/50 transition-colors mb-3">
          <UploadCloud size={22} className="text-accent-light mb-2" />
          <p className="text-xs text-txt-primary font-medium">Click to upload or drag and drop</p>
          <p className="text-[10px] text-txt-dim mt-1">Supports JPG, PNG, TIFF (Max 50MB)</p>
          <input type="file" className="hidden" />
        </label>
      ) : (
        <div className="relative rounded-xl overflow-hidden h-32 mb-3">
          <img src={image} className="w-full h-full object-cover" />
          <button onClick={onRemove} className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center">
            <X size={13} />
          </button>
        </div>
      )}

      <div className="space-y-2.5 text-xs">
        <Field icon={Calendar} label="Capture Date" value={captureDate} />
        <Field icon={MapPin} label="Zone" value={zone} select />
        <Field icon={Radio} label="Sensor Type" value={sensor} select />
      </div>
    </div>
  )
}

function Field({ icon: Icon, label, value, select }) {
  return (
    <div>
      <p className="text-txt-muted flex items-center gap-1.5 mb-1"><Icon size={12} /> {label}</p>
      <div className="input-dark px-3 py-2 flex items-center justify-between text-txt-primary">
        <span>{value}</span>
        {select ? <ChevronRight size={12} className="rotate-90 text-txt-dim" /> : <Calendar size={12} className="text-txt-dim" />}
      </div>
    </div>
  )
}

function LegendDot({ color, label }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={`w-2 h-2 rounded-full ${color}`} /> {label}
    </div>
  )
}

function MiniStat({ label, value, icon: Icon, color }) {
  return (
    <div className="stat-panel px-2 py-2 text-center">
      <Icon size={14} className={`mx-auto mb-1 ${color}`} />
      <p className={`text-sm font-bold ${color}`}>{value}</p>
      <p className="text-[9px] text-txt-dim leading-tight mt-0.5">{label}</p>
    </div>
  )
}
