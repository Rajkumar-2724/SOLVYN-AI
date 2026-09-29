import { useState } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Bell, ChevronDown, Menu, SlidersHorizontal, LogOut, Settings, User } from 'lucide-react'
import { AuthContext } from '../contexts/AuthContext.jsx'

export default function Navbar({ onMenuClick, placeholder = 'Search zone, stone ID, or feature...' }) {
  const [profileOpen, setProfileOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const navigate = useNavigate()
  const { user, logout } = useContext(AuthContext)

  return (
    <div className="sticky top-0 z-30 glass-navbar px-4 lg:px-6 py-3 flex items-center gap-3">
      <button className="lg:hidden text-accent hover:text-white transition-colors" onClick={onMenuClick}>
        <Menu size={22} />
      </button>

      <div className="flex-1 max-w-xl relative">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-accent/60" />
        <input
          type="text"
          placeholder={placeholder}
          className="input-dark w-full pl-10 pr-10 py-2.5 text-sm focus:outline-none"
        />
        <SlidersHorizontal size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-accent/50" />
      </div>

      <div className="flex-1 hidden sm:block" />

      <div className="relative">
        <button
          className="relative w-9 h-9 rounded-xl flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all"
          onClick={() => setNotifOpen((v) => !v)}
        >
          <Bell size={16} className="text-accent/80" />
          <span className="absolute top-1.5 right-2 w-1.5 h-1.5 rounded-full bg-danger shadow-[0_0_6px_rgba(231,76,60,0.5)]" />
        </button>
        {notifOpen && (
          <div className="absolute right-0 mt-2 w-72 glass-panel p-3 text-sm z-50">
            <p className="font-semibold text-white mb-2 text-xs">Notifications</p>
            <div className="space-y-1.5 text-txt-muted text-xs">
              <p className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-colors cursor-pointer">Stone S-3057 reached Critical status in Zone 03.</p>
              <p className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-colors cursor-pointer">Analysis complete for Zone 03 pre/post comparison.</p>
              <p className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-colors cursor-pointer">Weekly maintenance report is ready to download.</p>
            </div>
          </div>
        )}
      </div>

      <div className="relative">
        <button
          className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all"
          onClick={() => setProfileOpen((v) => !v)}
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-accent to-accent-light flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-accent/20">
            A
          </div>
          <div className="hidden sm:block text-left leading-tight">
            <p className="text-xs font-semibold text-white">{user?.name || 'Admin'}</p>
            <p className="text-[10px] text-accent-light/80">{user?.role || 'Marine Engineer'}</p>
          </div>
          <ChevronDown size={13} className="text-accent/60" />
        </button>
        {profileOpen && (
          <div className="absolute right-0 mt-2 w-48 glass-panel p-1.5 text-sm z-50">
            <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/8 text-slate-200 text-xs transition-colors">
              <User size={14} /> Profile
            </button>
            <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/8 text-slate-200 text-xs transition-colors">
              <Settings size={14} /> Settings
            </button>
            <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-danger/10 text-danger text-xs transition-colors" onClick={() => { logout(); navigate('/login') }}>
              <LogOut size={14} /> Log out
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
