import { useState } from 'react'
import { Wifi, RefreshCw, X, ChevronDown, Clock } from 'lucide-react'
import LiveIndicator from './LiveIndicator.jsx'

export default function ApiConnectionCard() {
  const [connected, setConnected] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  const handleSync = () => {
    setSyncing(true)
    setLastUpdated(new Date())
    setTimeout(() => setSyncing(false), 1500)
  }

  const handleDisconnect = () => {
    setConnected(false)
  }

  return (
    <div className="card-panel p-5">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-success-dim flex items-center justify-center">
            <Wifi size={18} className="text-success" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Live Wave Data API Connected</h3>
            <p className="text-[11px] text-txt-muted">Receiving real-time data from ocean monitoring system</p>
          </div>
        </div>
        {connected ? (
          <LiveIndicator />
        ) : (
          <span className="badge bg-danger-dim text-danger"><X size={10} /> Disconnected</span>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <div>
          <p className="text-[10px] text-txt-dim mb-0.5">API Key</p>
          <p className="text-xs text-txt-muted font-mono">sk-****_****_****_x7k2</p>
        </div>
        <div>
          <p className="text-[10px] text-txt-dim mb-0.5">Status</p>
          <p className="text-xs text-success font-semibold">{connected ? 'Connected' : 'Disconnected'}</p>
        </div>
        <div>
          <p className="text-[10px] text-txt-dim mb-0.5">Last Updated</p>
          <p className="text-xs text-txt-muted flex items-center gap-1"><Clock size={11} />{lastUpdated.toLocaleTimeString()}</p>
        </div>
        <div>
          <p className="text-[10px] text-txt-dim mb-0.5">Sync Interval</p>
          <p className="text-xs text-txt-muted">5 seconds</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={handleSync}
          disabled={!connected || syncing}
          className="btn-primary px-4 py-2 text-xs font-semibold flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw size={12} className={syncing ? 'animate-spin' : ''} />
          {syncing ? 'Syncing...' : 'Sync Now'}
        </button>
        <button onClick={handleDisconnect} className="btn-outline px-3 py-2 text-xs font-semibold flex items-center gap-1.5 text-danger border-danger/20 hover:bg-danger/10">
          <X size={12} /> Disconnect
        </button>
      </div>
    </div>
  )
}
