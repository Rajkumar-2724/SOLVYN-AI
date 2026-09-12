import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Service from './pages/Service.jsx'
import WaveAnalysis from './pages/WaveAnalysis.jsx'
import LiveWaveTracking from './pages/LiveWaveTracking.jsx'
import PrePostAnalysis from './pages/PrePostAnalysis.jsx'
import SolvynAnalysis from './pages/SolvynAnalysis.jsx'
import StoneDatabase from './pages/StoneDatabase.jsx'
import RiskLifespan from './pages/RiskLifespan.jsx'
import Maintenance from './pages/Maintenance.jsx'
import Reports from './pages/Reports.jsx'
import About from './pages/About.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <Routes>
      {/* Auth routes - no layout wrapper */}
      <Route path="/login" element={<Login />} />
      <Route path="/signin" element={<Navigate to="/login" replace />} />
      <Route path="/signup" element={<SignUp />} />

      {/* App routes - with sidebar/navbar layout */}
      <Route path="*" element={
        <MainLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/service" element={<Service />} />
            <Route path="/wave-analysis" element={<WaveAnalysis />} />
            <Route path="/live-wave-tracking" element={<LiveWaveTracking />} />
            <Route path="/pre-post-analysis" element={<PrePostAnalysis />} />
            <Route path="/solvyn-analysis" element={<SolvynAnalysis />} />
            <Route path="/database" element={<StoneDatabase />} />
            <Route path="/risk-lifespan" element={<RiskLifespan />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MainLayout>
      } />
    </Routes>
  )
}
