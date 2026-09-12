import { createContext, useState, useContext } from 'react'

export const AuthContext = createContext(null)

const DEMO_CREDENTIALS = { email: 'admin@seaguard.ai', password: 'admin123' }

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [accounts, setAccounts] = useState([DEMO_CREDENTIALS])

  const login = (email, password) => {
    const account = accounts.find((candidate) => candidate.email === email && candidate.password === password)
    if (account) {
      setIsAuthenticated(true)
      setUser({ name: account.name || 'Admin', role: 'Marine Engineer', email })
      return { success: true }
    }
    return { success: false, error: 'Invalid email or password. Try admin@seaguard.ai / admin123' }
  }

  const signup = ({ name, email, password }) => {
    setAccounts((current) => [...current, { name, email, password }])
    return { success: true }
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
