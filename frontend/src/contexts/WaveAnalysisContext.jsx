import { createContext, useContext, useState, useCallback, useMemo } from 'react'

// Baseline snapshot of an existing Wave Analysis run.
// These are the same parameters already shown on the Wave Analysis page
// (Wave Analysis + Live Wave Tracking) so downstream modules such as
// Image Analysis / Solvyn Analysis reuse the real existing data model.
export const defaultWaveMetrics = {
  height: 2.8,        // m
  period: 8.6,        // s
  direction: 236,     // degrees
  directionLabel: 'SW',
  energy: 12.4,       // kW/m
  waterLevel: 1.2,    // m
  frequency: 0.116,   // Hz
}

const WaveAnalysisContext = createContext(null)

export function WaveAnalysisProvider({ children }) {
  const [waveAnalysis, setWaveAnalysis] = useState({
    status: 'not-run',          // 'not-run' | 'completed'
    metrics: defaultWaveMetrics,
    lastCompleted: null,        // Date when the last wave analysis was recorded
  })

  const saveWaveAnalysis = useCallback((metrics) => {
    setWaveAnalysis({
      status: 'completed',
      metrics: { ...defaultWaveMetrics, ...(metrics || {}) },
      lastCompleted: new Date(),
    })
  }, [])

  const resetWaveAnalysis = useCallback(() => {
    setWaveAnalysis({ status: 'not-run', metrics: defaultWaveMetrics, lastCompleted: null })
  }, [])

  const value = useMemo(
    () => ({ waveAnalysis, saveWaveAnalysis, resetWaveAnalysis }),
    [waveAnalysis, saveWaveAnalysis, resetWaveAnalysis],
  )

  return <WaveAnalysisContext.Provider value={value}>{children}</WaveAnalysisContext.Provider>
}

export function useWaveAnalysis() {
  const ctx = useContext(WaveAnalysisContext)
  if (!ctx) throw new Error('useWaveAnalysis must be used within a WaveAnalysisProvider')
  return ctx
}