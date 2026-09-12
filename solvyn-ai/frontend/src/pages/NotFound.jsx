import { Link } from 'react-router-dom'
import { Waves, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <Waves size={40} className="text-accent mb-4" />
      <h1 className="text-2xl font-bold text-white mb-2">Page not found</h1>
      <p className="text-sm text-txt-muted mb-6">The page you're looking for doesn't exist or has moved.</p>
      <Link to="/" className="btn-primary px-5 py-2.5 text-sm font-semibold flex items-center gap-2">
        <Home size={15} /> Back to Dashboard
      </Link>
    </div>
  )
}
