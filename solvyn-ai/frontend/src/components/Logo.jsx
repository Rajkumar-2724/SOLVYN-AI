import { Waves } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-accent-light flex items-center justify-center shrink-0 shadow-lg shadow-accent/20 group-hover:shadow-accent/30 transition-shadow">
        <Waves size={19} className="text-white" strokeWidth={2.5} />
      </div>
      <div className="leading-tight">
        <p className="font-bold text-[15px] text-white tracking-tight">SeaGuard AI</p>
        <p className="text-[10px] text-accent-light/70 -mt-0.5 font-medium">Coastal Intelligence</p>
      </div>
    </Link>
  )
}
