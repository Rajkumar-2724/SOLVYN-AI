import { useState, useMemo } from 'react'
import {
  Database, Users, ShieldCheck, ShieldAlert, HelpCircle, ChevronDown, Search, Download,
  Eye, Pencil, Trash2, ChevronLeft, ChevronRight, Plus, UploadCloud, Sparkles, Compass,
  Rotate3d, ZoomIn, Maximize2,
} from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import { zones, stoneDatabase, statusBg } from '../data/stones.js'

export default function StoneDatabase() {
  const [zone, setZone] = useState('Zone 03')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const pageSize = 10

  const rows = useMemo(() => {
    return stoneDatabase
      .filter((s) => s.zone === zone)
      .filter((s) => s.id.toLowerCase().includes(search.toLowerCase()))
  }, [zone, search])

  const totalPages = Math.max(1, Math.ceil(2487 / pageSize))
  const pageRows = rows.slice(0, pageSize)

  return (
    <div className="dark-page pb-16">
      <PageHeader
        icon={Database}
        title="Stone Database"
        subtitle="View, manage and analyze armour stone data across all zones."
      />

      <div className="px-4 lg:px-6 mt-4 grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-4">
        <div className="space-y-4 min-w-0">
          {/* filter row */}
          <div className="card-panel p-4 flex flex-wrap items-center gap-4">
            <div>
              <p className="text-[11px] text-txt-muted mb-1">Select Zone</p>
              <div className="relative">
                <select
                  value={zone}
                  onChange={(e) => { setZone(e.target.value); setPage(1) }}
                  className="input-dark pl-8 pr-8 py-2 text-sm appearance-none"
                >
                  {zones.map((z) => <option key={z}>{z}</option>)}
                </select>
                <Compass size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-accent-light pointer-events-none" />
                <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-txt-muted pointer-events-none" />
              </div>
            </div>
            <div className="flex-1" />
            <MiniMetric icon={Users} label="Total Stones" value="2,487" color="text-accent" />
            <MiniMetric icon={ShieldCheck} label="Healthy" value="1,982" color="text-success" />
            <MiniMetric icon={ShieldAlert} label="Damaged" value="342" color="text-danger" />
            <MiniMetric icon={HelpCircle} label="Missing" value="12" color="text-warning" />
          </div>

          {/* 3D view */}
          <div className="card-panel p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-white font-semibold text-sm">
                <Database size={16} className="text-accent-light" /> Zone 03 – 3D View
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden h-64 bg-gradient-to-br from-ocean-700 via-ocean-800 to-ocean-900 border border-accent/20">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.08),transparent_70%)]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              {[
                { top: '30%', left: '30%', id: 'R0125', color: 'bg-emerald-500' },
                { top: '35%', left: '52%', id: 'R0387', color: 'bg-danger' },
                { top: '58%', left: '65%', id: 'R0276', color: 'bg-sky-500' },
              ].map((d) => (
                <div key={d.id} className="absolute" style={{ top: d.top, left: d.left }}>
                  <span className={`text-[9px] font-semibold text-white px-2 py-0.5 rounded-full ${d.color} whitespace-nowrap`}>{d.id}</span>
                </div>
              ))}
              <div className="absolute right-3 top-3 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white text-[8px] font-semibold">
                N<br />S
              </div>
              <div className="absolute bottom-3 left-3 flex items-center gap-3 bg-black/50 rounded-lg px-3 py-1.5 text-[10px] text-white">
                <LegendDot color="bg-success" label="Healthy" />
                <LegendDot color="bg-danger" label="Damaged" />
                <LegendDot color="bg-warning" label="High Risk" />
                <LegendDot color="bg-accent" label="Reinspection" />
              </div>
              <div className="absolute bottom-3 right-3 flex gap-1.5">
                <IconPill icon={Rotate3d} />
                <IconPill icon={ZoomIn} />
                <IconPill icon={Maximize2} />
              </div>
            </div>
          </div>

          {/* table */}
          <div className="card-panel p-4">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <p className="text-sm font-semibold text-white">Stone Database – {zone}</p>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-txt-muted" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search stone ID..."
                    className="input-dark pl-8 pr-3 py-1.5 text-xs w-40"
                  />
                </div>
                <button className="btn-outline px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5">
                  <Download size={12} /> Export CSV
                </button>
              </div>
            </div>
            <div className="overflow-x-auto -mx-4">
              <table className="w-full text-xs min-w-[700px]">
                <thead>
                  <tr className="text-txt-muted border-b border-white/5">
                    <th className="px-4 py-2 text-left"><input type="checkbox" /></th>
                    <th className="px-2 py-2 text-left font-medium">Stone ID</th>
                    <th className="px-2 py-2 text-left font-medium">Zone</th>
                    <th className="px-2 py-2 text-left font-medium">Position (X,Y,Z)</th>
                    <th className="px-2 py-2 text-left font-medium">Size (LxWxH)</th>
                    <th className="px-2 py-2 text-left font-medium">Weight (ton)</th>
                    <th className="px-2 py-2 text-left font-medium">Orientation (°)</th>
                    <th className="px-2 py-2 text-left font-medium">Condition</th>
                    <th className="px-2 py-2 text-left font-medium">Remaining Life</th>
                    <th className="px-4 py-2 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pageRows.map((s) => (
                    <tr key={s.id} className="border-b border-white/5 hover:bg-white/[0.03]">
                      <td className="px-4 py-2.5"><input type="checkbox" /></td>
                      <td className="px-2 py-2.5 flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-gradient-to-br from-ocean-600 to-ocean-800 overflow-hidden shrink-0 flex items-center justify-center border border-accent/20">
                        </div>
                        <span className="text-white font-medium">{s.id}</span>
                      </td>
                      <td className="px-2 py-2.5 text-txt-muted">{zone.replace('Zone ', 'Zon ')}</td>
                      <td className="px-2 py-2.5 text-txt-muted">{s.position}</td>
                      <td className="px-2 py-2.5 text-txt-muted">{s.size}</td>
                      <td className="px-2 py-2.5 text-txt-muted">{s.weight}</td>
                      <td className="px-2 py-2.5 text-txt-muted">{s.orientation.split('°')[0]}</td>
                      <td className="px-2 py-2.5"><span className={`badge ${statusBg[s.status]}`}>{s.status}</span></td>
                      <td className={`px-2 py-2.5 font-medium ${Number(s.remainingLife) < 2 ? 'text-danger' : 'text-txt-muted'}`}>{s.remainingLife}</td>
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-2 text-txt-muted">
                          <Eye size={13} className="hover:text-accent-light cursor-pointer" />
                          <Pencil size={13} className="hover:text-accent-light cursor-pointer" />
                          <Trash2 size={13} className="hover:text-danger cursor-pointer" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
              <p className="text-[11px] text-txt-muted">Showing 1 – {pageRows.length} of 2,487 stones</p>
              <div className="flex items-center gap-1">
                <PageBtn icon={ChevronLeft} onClick={() => setPage((p) => Math.max(1, p - 1))} />
                {[1, 2, 3, 4, 5].map((p) => (
                    <button key={p} onClick={() => setPage(p)} className={`w-7 h-7 rounded-lg text-xs font-medium ${page === p ? 'bg-accent text-white' : 'text-txt-muted hover:bg-white/5'}`}>{p}</button>
                ))}
                <span className="text-txt-dim text-xs px-1">...</span>
                <button className="w-7 h-7 rounded-lg text-xs font-medium text-txt-muted hover:bg-white/5">249</button>
                <PageBtn icon={ChevronRight} onClick={() => setPage((p) => Math.min(totalPages, p + 1))} />
              </div>
            </div>
          </div>
        </div>

        {/* Add stone data panel */}
        <div className="card-panel p-4 h-fit space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white font-semibold text-sm">
              <Plus size={16} className="text-accent-light" /> Add Stone Data
            </div>
            <ChevronRight size={14} className="text-txt-muted" />
          </div>

          <div className="flex bg-white/5 rounded-lg p-1 text-xs">
            <button className="flex-1 py-1.5 rounded-md bg-accent text-white font-semibold">Upload Zone Image</button>
              <button className="flex-1 py-1.5 rounded-md text-txt-muted font-medium">Manual Entry</button>
          </div>

          <label className="border-2 border-dashed border-accent/25 rounded-xl h-28 flex flex-col items-center justify-center text-center cursor-pointer hover:border-accent/50 transition-colors">
            <UploadCloud size={20} className="text-accent-light mb-2" />
            <p className="text-xs text-txt-primary font-medium">Upload zone image</p>
            <p className="text-[10px] text-txt-dim mt-1">(JPG, PNG, TIFF)</p>
            <span className="text-accent-light text-xs font-semibold mt-2">Choose File</span>
            <input type="file" className="hidden" />
          </label>

          <div className="stat-panel p-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-white mb-1.5">
              <Sparkles size={14} className="text-accent-light" /> AI Extraction & Auto Naming
            </div>
            <p className="text-[11px] text-txt-muted mb-3">The system will detect stones, assign IDs and extract key details.</p>
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-gradient-to-br from-ocean-600 to-ocean-800 border border-accent/20">
              </div>
              <div className="flex-1">
                <p className="text-[11px] text-success font-semibold flex items-center gap-1">✓ Detected Stones: 12</p>
                <p className="text-[10px] text-txt-dim mb-1">Processing...</p>
                <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full bg-accent w-full" />
                </div>
              </div>
            </div>
          </div>

          <button className="btn-primary w-full py-2.5 text-sm font-semibold flex items-center justify-center gap-2">
            <Sparkles size={15} /> Run Analysis
          </button>

          <div>
            <p className="text-xs font-semibold text-white mb-3 flex items-center gap-1.5">
              <Sparkles size={13} className="text-accent-light" /> Extracted Data (Auto-filled)
            </p>
            <div className="space-y-3 text-xs">
              <LabeledInput label="Stone ID" value="R-0457" select />
              <LabeledInput label="Zone" value="Zone 03" select />
              <div className="grid grid-cols-3 gap-2">
                <LabeledInput label="Size L (m)" value="2.10" />
                <LabeledInput label="W (m)" value="1.60" />
                <LabeledInput label="H (m)" value="1.40" />
              </div>
              <LabeledInput label="Weight (ton)" value="8.3" />
              <LabeledInput label="Orientation (°)" value="298" />
              <div className="grid grid-cols-3 gap-2">
                <LabeledInput label="X" value="14.2" />
                <LabeledInput label="Y" value="9.1" />
                <LabeledInput label="Z" value="-3.4" />
              </div>
              <LabeledInput label="Condition" value="Healthy" select />
              <div>
                <p className="text-txt-muted mb-1">Notes</p>
                <textarea placeholder="Additional notes..." className="input-dark w-full px-3 py-2 text-xs h-16 resize-none" />
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="btn-primary flex-1 py-2.5 text-xs font-semibold">Save Stone</button>
            <button className="btn-outline flex-1 py-2.5 text-xs font-semibold">Reset</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function MiniMetric({ icon: Icon, label, value, color }) {
  return (
    <div className="flex items-center gap-2">
      <Icon size={16} className={color} />
      <div>
        <p className={`text-sm font-bold leading-none ${color}`}>{value}</p>
        <p className="text-[10px] text-txt-dim mt-0.5">{label}</p>
      </div>
    </div>
  )
}

function LegendDot({ color, label }) {
  return <div className="flex items-center gap-1"><span className={`w-1.5 h-1.5 rounded-full ${color}`} /> {label}</div>
}

function IconPill({ icon: Icon }) {
  return <button className="w-8 h-8 rounded-lg bg-black/50 text-white flex items-center justify-center"><Icon size={14} /></button>
}

function PageBtn({ icon: Icon, onClick }) {
  return <button onClick={onClick} className="w-7 h-7 rounded-lg text-txt-muted hover:bg-white/5 flex items-center justify-center"><Icon size={14} /></button>
}

function LabeledInput({ label, value, select }) {
  return (
    <div>
      <p className="text-txt-muted mb-1">{label}</p>
      <div className="input-dark px-3 py-2 flex items-center justify-between text-txt-primary">
        <span>{value}</span>
        {select && <ChevronDown size={12} className="text-txt-dim" />}
      </div>
    </div>
  )
}
