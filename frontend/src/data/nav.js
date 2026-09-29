import {
  LayoutDashboard,
  Grid3x3,
  Database,
  ScanSearch,
  Radar,
  ShieldAlert,
  Wrench,
  FileText,
  Info,
  Waves,
  Activity,
  Image,
} from 'lucide-react'

export const navItems = [
  { label: 'Dashboard', path: '/', icon: LayoutDashboard },
  { label: 'Service', path: '/service', icon: Grid3x3 },
  { label: 'Wave Analysis', path: '/wave-analysis', icon: Waves },
  { label: 'Image Analysis', path: '/image-analysis', icon: Image },
  { label: 'Pre & Post Analysis', path: '/pre-post-analysis', icon: ScanSearch },
  { label: 'Solvyn Analysis', path: '/solvyn-analysis', icon: Activity },
  { label: 'Live Wave Tracking', path: '/live-wave-tracking', icon: Radar },
  { label: 'Risk & Lifespan', path: '/risk-lifespan', icon: ShieldAlert },
  { label: 'Maintenance', path: '/maintenance', icon: Wrench },
  { label: 'Database', path: '/database', icon: Database },
  { label: 'Reports', path: '/reports', icon: FileText },
  { label: 'About & Features', path: '/about', icon: Info },
]

// Primary sidebar shown on most pages (compact set, matches reference)
export const primaryNav = [
  { label: 'Dashboard', path: '/', icon: LayoutDashboard },
  { label: 'Service', path: '/service', icon: Grid3x3 },
  { label: 'Wave Analysis', path: '/wave-analysis', icon: Waves },
  { label: 'Image Analysis', path: '/image-analysis', icon: Image },
  { label: 'Live Wave Tracking', path: '/live-wave-tracking', icon: Radar },
  { label: 'Pre & Post Analysis', path: '/pre-post-analysis', icon: ScanSearch },
  { label: 'Solvyn Analysis', path: '/solvyn-analysis', icon: Activity },
  { label: 'Risk & Lifespan', path: '/risk-lifespan', icon: ShieldAlert },
  { label: 'Maintenance', path: '/maintenance', icon: Wrench },
  { label: 'Database', path: '/database', icon: Database },
  { label: 'Reports', path: '/reports', icon: FileText },
  { label: 'About & Features', path: '/about', icon: Info },
]
