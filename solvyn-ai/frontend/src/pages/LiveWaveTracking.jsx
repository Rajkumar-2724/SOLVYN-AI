import { useState, useEffect } from 'react'
import {
  Waves, Wifi, RefreshCw, Clock, Compass, Zap, Activity,
  Bell, ChevronDown, Menu, User, Settings, LogOut, Search, SlidersHorizontal,
  Radar, AlertTriangle, ShieldAlert, ShieldCheck, ShieldQuestion, Lightbulb,
  Eye, Sparkles, Wrench,
} from 'lucide-react'
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  AreaChart, Area, ReferenceDot,
} from 'recharts'
import { liveWaveTrend, waveHeightOverview, topRiskStones } from '../data/liveWaveData.js'
import ApiConnectionCard from '../components/ApiConnectionCard.jsx'
import LiveIndicator from '../components/LiveIndicator.jsx'
import WaveMetricCard from '../components/WaveMetricCard.jsx'
import RiskMetricCard from '../components/RiskMetricCard.jsx'
import CoastalMonitoring from '../components/CoastalMonitoring.jsx'
import DisplacementPrediction from '../components/DisplacementPrediction.jsx'
import DefectPrediction from '../components/DefectPrediction.jsx'
import RiskTable from '../components/RiskTable.jsx'
import AnalysisReport from '../components/AnalysisReport.jsx'
import RecommendedActions from '../components/RecommendedActions.jsx'

const severityColor = { High: 'bg-danger-dim text-danger', Medium: 'bg-warning-dim text-warning', Low: 'bg-success-dim text-success' }

export default function LiveWaveTracking() {
  const [timeRange, setTimeRange] = useState('24H')
  const [currentTime, setCurrentTime] = useState(new Date())
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [liveMetrics, setLiveMetrics] = useState({
    height: 2.8, period: 8.6, direction: 236, energy: 12.4, waterLevel: 1.2, freq: 0.116,
    heightTrend: '+12%', periodTrend: '+8%', energyTrend: '+15%', waterLevelTrend: '+6%', freqTrend: '+7%',
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
      setLastUpdate(new Date())
      setLiveMetrics(prev => ({
        ...prev,
        height: parseFloat((2.5 + Math.random() * 1.5).toFixed(1)),
        period: parseFloat((7.5 + Math.random() * 3).toFixed(1)),
        direction: Math.floor(220 + Math.random() * 40),
        energy: parseFloat((9 + Math.random() * 6).toFixed(1)),
        waterLevel: parseFloat((0.9 + Math.random() * 0.7).toFixed(1)),
        freq: parseFloat((0.10 + Math.random() * 0.04).toFixed(3)),
      }))
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const chartData = liveWaveTrend.map(d => ({
    time: d.time,
    height: d.height + (Math.random() * 0.6 - 0.3),
    period: d.period + (Math.random() * 1 - 0.5),
    direction: d.direction + (Math.random() * 10 - 5),
    energy: d.energy + (Math.random() * 2 - 1),
    waterLevel: d.waterLevel + (Math.random() * 0.2 - 0.1),
    freq: d.freq + (Math.random() * 0.02 - 0.01),
    event: d.event,
  }))

  const tooltipStyle = { contentStyle: { background: '#0a1c33', border: '1px solid rgba(94,168,219,0.2)', borderRadius: 10, fontSize: 12 } }

  return (
    <div className="pb-16">
      {/* TOP HEADER */}
      <div className="px-4 lg:px-6 pt-4">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3 text-xs">
            <span className="text-txt-muted">Service</span><span className="text-txt-dim">›</span><span className="text-accent-light">Live Wave Tracking</span>
            <LiveIndicator />
          </div>
          <div className="flex items-center gap-2">
            <span className="badge bg-success-dim text-success flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-success pulse-dot" /> API Connected · Live</span>
            <button className="btn-primary px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5"><RefreshCw size={12} /> Sync Now</button>
            <button className="relative w-9 h-9 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors">
              <Bell size={17} className="text-txt-primary" />
              <span className="absolute top-1.5 right-2 w-1.5 h-1.5 rounded-full bg-danger" />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/30 to-accent/20 flex items-center justify-center text-accent-light">
              <Radar size={20} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Live Wave Tracking & Analysis</h1>
              <p className="text-sm text-txt-muted mt-1 max-w-xl">Real-time wave data analysis with live API connection and AI-powered prediction of stone displacement and defects.</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] text-txt-dim flex items-center gap-1"><Clock size={12} /> {currentTime.toLocaleTimeString()}</span>
            <span className="badge bg-accent-dim text-accent-light"><Activity size={10} /> Monitoring</span>
          </div>
        </div>
      </div>

      {/* API CONNECTION CARD */}
      <div className="px-4 lg:px-6 mb-4">
        <ApiConnectionCard />
      </div>

      {/* REAL-TIME ANALYSIS */}
      <div className="px-4 lg:px-6 mb-4">
        <div className="card-panel p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LiveIndicator />
            <div>
              <p className="text-sm font-semibold text-white">Real-time Analysis</p>
              <p className="text-[11px] text-txt-muted">Live data is being analyzed continuously</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-txt-muted">
            <span>Last update: {lastUpdate.toLocaleTimeString()}</span>
            <span>Interval: 5s</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-success pulse-dot" /> Active</span>
          </div>
        </div>
      </div>

      {/* WAVE METRIC CARDS */}
      <div className="px-4 lg:px-6 mb-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <WaveMetricCard icon={Waves} label="Wave Height" value={`${liveMetrics.height} m`} trend="up" trendValue={liveMetrics.heightTrend} iconBg="bg-blue-500/15 text-blue-300" trendClass="text-success" />
          <WaveMetricCard icon={Clock} label="Wave Period" value={`${liveMetrics.period} s`} trend="up" trendValue={liveMetrics.periodTrend} iconBg="bg-warning-dim text-warning" trendClass="text-success" />
          <WaveMetricCard icon={Compass} label="Wave Direction" value={`${liveMetrics.direction}° SW`} trend="" iconBg="bg-accent-dim text-accent-light" />
          <WaveMetricCard icon={Zap} label="Wave Energy" value={`${liveMetrics.energy} kW/m`} trend="up" trendValue={liveMetrics.energyTrend} iconBg="bg-orange-500/15 text-orange-300" trendClass="text-success" />
          <WaveMetricCard icon={Waves} label="Water Level" value={`${liveMetrics.waterLevel} m`} trend="up" trendValue={liveMetrics.waterLevelTrend} iconBg="bg-accent-dim text-accent" trendClass="text-success" />
          <WaveMetricCard icon={Waves} label="Wave Frequency" value={`${liveMetrics.freq} Hz`} trend="up" trendValue={liveMetrics.freqTrend} iconBg="bg-violet-500/15 text-violet-300" trendClass="text-success" />
        </div>
      </div>

      {/* LIVE WAVE DATA ANALYSIS CHART */}
      <div className="px-4 lg:px-6 mb-4">
        <div className="card-panel p-5">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2 text-white font-semibold text-sm">
              <Waves size={16} className="text-accent-light" /> Live Wave Data Analysis
            </div>
            <div className="flex items-center gap-1">
              {['24H', '7D', '30D'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                   className={`px-3 py-1 text-[11px] font-semibold rounded-lg transition-colors ${timeRange === range ? 'bg-accent/20 text-accent-light' : 'text-txt-muted hover:bg-white/5'}`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="time" tick={{ fill: '#7e97b3', fontSize: 10 }} axisLine={{ stroke: 'rgba(255,255,255,0.08)' }} tickLine={false} />
                <YAxis yAxisId="left" tick={{ fill: '#7e97b3', fontSize: 10 }} axisLine={{ stroke: 'rgba(255,255,255,0.08)' }} tickLine={false} />
                <YAxis yAxisId="right" orientation="right" tick={{ fill: '#7e97b3', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip {...tooltipStyle} />
                <Line yAxisId="left" type="monotone" dataKey="height" stroke="#22d3ee" strokeWidth={2} dot={false} name="Wave Height (m)" />
                <Line yAxisId="left" type="monotone" dataKey="period" stroke="#fbbf24" strokeWidth={1.5} strokeDasharray="4 3" dot={false} name="Wave Period (s)" />
                <Line yAxisId="right" type="monotone" dataKey="direction" stroke="#3ddc84" strokeWidth={1.5} dot={false} name="Wave Direction (°)" />
                {chartData.filter(d => d.event).map((d, i) => (
                  <ReferenceDot key={i} x={d.time} y={d.height} yAxisId="left" r={6} fill="#ef4444" stroke="#ef4444" />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-4 mt-2 text-[11px] text-txt-muted">
            <span className="flex items-center gap-1.5"><span className="w-4 h-0.5 bg-accent inline-block" /> Wave Height</span>
            <span className="flex items-center gap-1.5"><span className="w-4 h-0.5 bg-warning inline-block border-dashed" style={{ borderTop: '1px dashed #fbbf24' }} /> Wave Period</span>
            <span className="flex items-center gap-1.5"><span className="w-4 h-0.5 bg-success inline-block" /> Direction</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-danger" /> High Energy Event</span>
          </div>
        </div>
      </div>

      {/* LIVE COASTAL MONITORING */}
      <div className="px-4 lg:px-6 mb-4">
        <CoastalMonitoring />
      </div>

      {/* AI STRUCTURAL IMPACT + PREDICTIONS ROW */}
      <div className="px-4 lg:px-6 mb-4">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr] gap-4">
          <div>
            <div className="card-panel p-5 mb-4">
              <div className="flex items-center gap-2 mb-4">
                <ShieldAlert size={16} className="text-accent-light" />
                <h3 className="text-sm font-bold text-white">AI Structural Impact Analysis</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <RiskMetricCard icon={AlertTriangle} label="Displacement Risk" value="3.2%" sub="Low - Moderate" valueClass="text-warning" iconBg="bg-warning-dim text-warning" />
                <RiskMetricCard icon={ShieldQuestion} label="Suspected Defects" value="5" sub="of 180 stones" valueClass="text-orange-400" iconBg="bg-orange-500/15 text-orange-400" />
                <RiskMetricCard icon={ShieldAlert} label="Critical Zones" value="1" sub="Zone 03" valueClass="text-danger" iconBg="bg-danger-dim text-danger" />
                <RiskMetricCard icon={ShieldCheck} label="Stability Score" value="87%" sub="Good" valueClass="text-success" iconBg="bg-success-dim text-success" />
              </div>
            </div>
          </div>
          <DisplacementPrediction />
          <DefectPrediction />
        </div>
      </div>

      {/* TOP RISK ZONES TABLE */}
      <div className="px-4 lg:px-6 mb-4">
        <RiskTable />
      </div>

      {/* WAVE DATA OVERVIEW + ANALYSIS REPORT + RECOMMENDED ACTIONS */}
      <div className="px-4 lg:px-6 mb-4">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-4">
          <div className="card-panel p-5">
            <div className="flex items-center gap-2 text-white font-semibold text-sm mb-2">
              <Waves size={16} className="text-accent-light" /> Wave Data Overview
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={waveHeightOverview} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="liveWaveFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="day" tick={{ fill: '#7e97b3', fontSize: 10 }} axisLine={{ stroke: 'rgba(255,255,255,0.08)' }} tickLine={false} />
                  <YAxis domain={[0, 6]} tick={{ fill: '#7e97b3', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip {...tooltipStyle} />
                  <Area type="monotone" dataKey="height" stroke="#22d3ee" strokeWidth={2} fill="url(#liveWaveFill)" dot={{ r: 3, fill: '#22d3ee' }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <AnalysisReport />
        </div>
      </div>

      <div className="px-4 lg:px-6 mb-4">
        <RecommendedActions />
      </div>
    </div>
  )
}
