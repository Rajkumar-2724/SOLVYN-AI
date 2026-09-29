import { useState, useContext } from 'react'
import { useNavigate, Navigate, Link } from 'react-router-dom'
import { Waves, Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react'
import { AuthContext } from '../contexts/AuthContext.jsx'
import AuthServices from '../components/AuthServices.jsx'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()
  const { isAuthenticated, login } = useContext(AuthContext)

  if (isAuthenticated) return <Navigate to="/" replace />

  const validate = () => {
    const newErrors = {}
    if (!email.trim()) {
      newErrors.email = 'Please enter your email address'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!password) {
      newErrors.password = 'Please enter your password'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setServerError('')
    if (!validate()) return

    setLoading(true)
    await new Promise(r => setTimeout(r, 800))

    const result = login(email, password)
    if (result.success) {
      setSuccess(true)
      await new Promise(r => setTimeout(r, 600))
      navigate('/')
    } else {
      setServerError(result.error)
    }
    setLoading(false)
  }

  return (
    <div className="auth-page">
      {/* Background effects */}
      <div className="auth-bg">
        <div className="auth-glow auth-glow-1" />
        <div className="auth-glow auth-glow-2" />
        <div className="auth-glow auth-glow-3" />
        <svg className="auth-waves" viewBox="0 0 1440 900" preserveAspectRatio="none">
          <path d="M0,450 C200,350 400,550 600,450 C800,350 1000,550 1200,450 C1300,400 1370,430 1440,400 L1440,900 L0,900 Z" fill="rgba(14,165,233,0.03)" />
          <path d="M0,550 C200,470 400,620 600,520 C800,420 1000,600 1200,500 C1300,460 1370,480 1440,460 L1440,900 L0,900 Z" fill="rgba(6,182,212,0.02)" />
        </svg>
        <div className="auth-grid" />
      </div>

      <div className="auth-layout">
        <div className="auth-container">
        {/* Logo / Branding */}
        <div className="auth-brand">
          <div className="auth-logo-icon">
            <Waves size={28} className="text-white" />
          </div>
          <h1 className="auth-brand-name">SOLVYN AI</h1>
          <p className="auth-brand-tagline">Smarter Breakwaters. Safer Coasts.</p>
        </div>

        {/* Login Card */}
        <div className="auth-card">
          <h2 className="auth-card-title">Welcome Back</h2>
          <p className="auth-card-subtitle">Sign in to access your coastal intelligence dashboard</p>

          <form onSubmit={handleSubmit} className="auth-form">
            {/* Email */}
            <div className="auth-field">
              <label className="auth-label" htmlFor="login-email">Email Address</label>
              <div className="auth-input-wrapper">
                <Mail size={16} className="auth-input-icon" />
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: '' })); setServerError('') }}
                  placeholder="admin@solvyn-ai.ai"
                  className={`auth-input pl-10 ${errors.email ? 'auth-input-error' : ''}`}
                  autoComplete="email"
                />
              </div>
              {errors.email && <p className="auth-error"><AlertCircle size={12} /> {errors.email}</p>}
            </div>

            {/* Password */}
            <div className="auth-field">
              <label className="auth-label" htmlFor="login-password">Password</label>
              <div className="auth-input-wrapper">
                <Lock size={16} className="auth-input-icon" />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors(prev => ({ ...prev, password: '' })); setServerError('') }}
                  placeholder="Enter your password"
                  className={`auth-input pl-10 pr-10 ${errors.password ? 'auth-input-error' : ''}`}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="auth-password-toggle"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="auth-error"><AlertCircle size={12} /> {errors.password}</p>}
            </div>

            {/* Remember me + Forgot */}
            <div className="auth-options">
              <label className="auth-checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="auth-checkbox"
                />
                <span>Remember me</span>
              </label>
              <button type="button" className="auth-link">Forgot Password?</button>
            </div>

            {/* Server error */}
            {serverError && (
              <div className="auth-server-error">
                <AlertCircle size={14} />
                {serverError}
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="auth-success">
                <CheckCircle2 size={14} />
                Login successful! Redirecting...
              </div>
            )}

            {/* Submit */}
            <button type="submit" disabled={loading || success} className="auth-submit">
              {loading ? (
                <span className="auth-spinner" />
              ) : (
                <ArrowRight size={16} />
              )}
              {loading ? 'Signing in...' : success ? 'Success!' : 'Sign In'}
            </button>
          </form>

          {/* Footer */}
          <div className="auth-footer">
            <p>
              Don't have an account?{' '}
              <Link to="/signup" className="auth-footer-link">Create Account</Link>
            </p>
          </div>

          {/* Demo hint */}
          <div className="auth-demo">
            Demo: admin@solvyn-ai.ai / admin123
          </div>
        </div>
        </div>
        <AuthServices />
      </div>
    </div>
  )
}
