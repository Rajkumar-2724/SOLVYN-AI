import { useState, useContext } from 'react'
import { useNavigate, Navigate, Link } from 'react-router-dom'
import { Waves, User, Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, CheckCircle2, Building2 } from 'lucide-react'
import { AuthContext } from '../contexts/AuthContext.jsx'
import AuthServices from '../components/AuthServices.jsx'

export default function SignUp() {
  const [form, setForm] = useState({
    name: '', email: '', password: '', confirmPassword: '', organization: '', role: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()
  const { isAuthenticated, signup } = useContext(AuthContext)

  if (isAuthenticated) return <Navigate to="/" replace />

  const update = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: '' }))
  }

  const validate = () => {
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = 'Please enter your full name'
    if (!form.email.trim()) {
      newErrors.email = 'Please enter your email address'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!form.password) {
      newErrors.password = 'Please enter a password'
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    if (!form.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))

    const result = signup({ name: form.name, email: form.email, password: form.password })
    if (!result?.success) {
      setLoading(false)
      return
    }
    setSuccess(true)
    await new Promise(r => setTimeout(r, 1500))
    navigate('/login')
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
        <div className="auth-container auth-container-signup">
        {/* Logo / Branding */}
        <div className="auth-brand">
          <div className="auth-logo-icon">
            <Waves size={28} className="text-white" />
          </div>
          <h1 className="auth-brand-name">SeaGuard AI</h1>
          <p className="auth-brand-tagline">Smarter Breakwaters. Safer Coasts.</p>
        </div>

        {/* Sign Up Card */}
        <div className="auth-card">
          <h2 className="auth-card-title">Create Your Account</h2>
          <p className="auth-card-subtitle">Join SeaGuard AI and manage smarter coastal infrastructure</p>

          {success ? (
            <div className="auth-success-box">
              <CheckCircle2 size={48} className="text-success mx-auto mb-3" />
              <p className="text-lg font-semibold text-white mb-1">Account created successfully!</p>
              <p className="text-sm text-txt-muted">Redirecting to login...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="auth-form auth-form-signup">
              {/* Full Name */}
              <div className="auth-field">
                <label className="auth-label" htmlFor="signup-name">Full Name</label>
                <div className="auth-input-wrapper">
                  <User size={16} className="auth-input-icon" />
                  <input
                    id="signup-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    placeholder="Enter your full name"
                    className={`auth-input pl-10 ${errors.name ? 'auth-input-error' : ''}`}
                    autoComplete="name"
                  />
                </div>
                {errors.name && <p className="auth-error"><AlertCircle size={12} /> {errors.name}</p>}
              </div>

              {/* Email */}
              <div className="auth-field">
                <label className="auth-label" htmlFor="signup-email">Email Address</label>
                <div className="auth-input-wrapper">
                  <Mail size={16} className="auth-input-icon" />
                  <input
                    id="signup-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    placeholder="you@example.com"
                    className={`auth-input pl-10 ${errors.email ? 'auth-input-error' : ''}`}
                    autoComplete="email"
                  />
                </div>
                {errors.email && <p className="auth-error"><AlertCircle size={12} /> {errors.email}</p>}
              </div>

              {/* Password */}
              <div className="auth-field">
                <label className="auth-label" htmlFor="signup-password">Password</label>
                <div className="auth-input-wrapper">
                  <Lock size={16} className="auth-input-icon" />
                  <input
                    id="signup-password"
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={(e) => update('password', e.target.value)}
                    placeholder="Create a strong password"
                    className={`auth-input pl-10 pr-10 ${errors.password ? 'auth-input-error' : ''}`}
                    autoComplete="new-password"
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

              {/* Confirm Password */}
              <div className="auth-field">
                <label className="auth-label" htmlFor="signup-confirm">Confirm Password</label>
                <div className="auth-input-wrapper">
                  <Lock size={16} className="auth-input-icon" />
                  <input
                    id="signup-confirm"
                    type={showConfirm ? 'text' : 'password'}
                    value={form.confirmPassword}
                    onChange={(e) => update('confirmPassword', e.target.value)}
                    placeholder="Re-enter your password"
                    className={`auth-input pl-10 pr-10 ${errors.confirmPassword ? 'auth-input-error' : ''}`}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="auth-password-toggle"
                    aria-label={showConfirm ? 'Hide password' : 'Show password'}
                  >
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="auth-error"><AlertCircle size={12} /> {errors.confirmPassword}</p>}
              </div>

              {/* Organization (optional) */}
              <div className="auth-field">
                <label className="auth-label" htmlFor="signup-org">Organization <span className="text-txt-dim">(optional)</span></label>
                <div className="auth-input-wrapper">
                  <Building2 size={16} className="auth-input-icon" />
                  <input
                    id="signup-org"
                    type="text"
                    value={form.organization}
                    onChange={(e) => update('organization', e.target.value)}
                    placeholder="Company or organization"
                    className="auth-input pl-10"
                  />
                </div>
              </div>

              {/* Submit */}
              <button type="submit" disabled={loading} className="auth-submit">
                {loading ? (
                  <span className="auth-spinner" />
                ) : (
                  <ArrowRight size={16} />
                )}
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
          )}

          {/* Footer */}
          <div className="auth-footer">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="auth-footer-link">Sign In</Link>
            </p>
          </div>
        </div>
        </div>
        <AuthServices />
      </div>
    </div>
  )
}
