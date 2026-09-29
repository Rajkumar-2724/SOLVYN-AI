import { NavLink } from 'react-router-dom'
import { X } from 'lucide-react'
import Logo from './Logo.jsx'
import { primaryNav } from '../data/nav.js'

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed lg:static lg:sticky lg:top-0 z-50 top-0 left-0 h-full lg:h-screen w-[240px] shrink-0 glass-sidebar flex flex-col justify-between transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        {/* Top glow accent */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

        <div>
          <div className="flex items-center justify-between px-5 py-5">
            <Logo />
            <button className="lg:hidden text-txt-dim hover:text-white transition-colors" onClick={onClose}>
              <X size={20} />
            </button>
          </div>

          {/* Separator */}
          <div className="mx-4 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

          <nav className="px-3 mt-3 flex flex-col gap-0.5 overflow-y-auto max-h-[calc(100vh-180px)] scrollbar-thin">
            {primaryNav.map((item, index) => (
              <NavLink
                key={item.label}
                to={item.path}
                end={item.path === '/'}
                onClick={onClose}
                className={({ isActive }) =>
                  `nav-link animate-fade-in-up stagger-${Math.min(index + 1, 5)} ${isActive ? 'active' : ''}`
                }
              >
                <item.icon size={17} strokeWidth={2} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom section */}
        <div className="px-4 py-5 border-t border-white/5">
          {/* Decorative wave */}
          <div className="mb-3 opacity-40">
            <svg width="100%" height="20" viewBox="0 0 200 20">
              <defs>
                <linearGradient id="sidebarWave" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
                  <stop offset="30%" stopColor="#22d3ee" stopOpacity="0.6" />
                  <stop offset="70%" stopColor="#0ea5e9" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 12c8-8 16 8 24 0s16-8 24 0 16 8 24 0 16-8 24 0 16 8 24 0 16-8 32 0"
                stroke="url(#sidebarWave)"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <p className="text-[11px] font-semibold text-txt-primary tracking-wide">Protecting Coastlines</p>
          <p className="text-[11px] text-accent-light/80 mt-0.5">with Intelligence</p>
        </div>

        {/* Bottom glow accent */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      </aside>
    </>
  )
}
