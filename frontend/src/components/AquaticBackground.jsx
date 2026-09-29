import { useEffect, useRef } from 'react'

export default function AquaticBackground() {
  const canvasRef = useRef(null)
  const sizeRef = useRef({ w: 0, h: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationId
    let width = window.innerWidth
    let height = window.innerHeight

    sizeRef.current = { w: width, h: height }
    canvas.width = width
    canvas.height = height

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      sizeRef.current = { w: width, h: height }
      canvas.width = width
      canvas.height = height
    }
    window.addEventListener('resize', resize)

    const waves = []
    for (let i = 0; i < 5; i++) {
      waves.push({
        y: height * (0.3 + i * 0.12),
        amplitude: 18 + i * 8,
        wavelength: 200 + i * 50,
        speed: 0.002 + i * 0.0008,
        phase: i * 0.5,
        opacity: 0.03 + i * 0.01,
        color: i % 2 === 0 ? `rgba(59, 159, 224, ${0.02 + i * 0.006})` : `rgba(108, 196, 245, ${0.02 + i * 0.006})`,
      })
    }

    const bubbles = []
    for (let i = 0; i < 30; i++) {
      bubbles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 3.5 + 0.8,
        speed: Math.random() * 0.5 + 0.15,
        opacity: Math.random() * 0.18 + 0.05,
      })
    }

    const particles = []
    for (let i = 0; i < 15; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.25 + 0.08,
        opacity: Math.random() * 0.12 + 0.03,
      })
    }

    let time = 0

    const draw = () => {
      time += 0.016
      ctx.clearRect(0, 0, width, height)

      // Deep ocean gradient — Coastal AI base
      const gradient = ctx.createLinearGradient(0, 0, 0, height)
      gradient.addColorStop(0, '#0b1520')
      gradient.addColorStop(0.3, '#0d1824')
      gradient.addColorStop(0.6, '#0a1420')
      gradient.addColorStop(1, '#080f18')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      // Subtle radial glow at top
      const topGlow = ctx.createRadialGradient(width * 0.5, 0, 0, width * 0.5, 0, height * 0.6)
      topGlow.addColorStop(0, 'rgba(59, 159, 224, 0.03)')
      topGlow.addColorStop(0.5, 'rgba(59, 159, 224, 0.012)')
      topGlow.addColorStop(1, 'rgba(59, 159, 224, 0)')
      ctx.fillStyle = topGlow
      ctx.fillRect(0, 0, width, height)

      // Light rays (subtle)
      ctx.save()
      for (let i = 0; i < 3; i++) {
        const rx = width * (0.2 + i * 0.3)
        const rayGrad = ctx.createLinearGradient(rx, 0, rx + 100, height)
        rayGrad.addColorStop(0, `rgba(59, 159, 224, ${0.015 + i * 0.005})`)
        rayGrad.addColorStop(0.5, 'rgba(59, 159, 224, 0.008)')
        rayGrad.addColorStop(1, 'rgba(59, 159, 224, 0)')
        ctx.fillStyle = rayGrad
        ctx.beginPath()
        ctx.moveTo(rx - 40, 0)
        ctx.lineTo(rx + 140, 0)
        ctx.lineTo(rx + 220, height)
        ctx.lineTo(rx - 40, height)
        ctx.closePath()
        ctx.fill()
      }
      ctx.restore()

      // Animated waves (very subtle)
      waves.forEach(wave => {
        ctx.save()
        ctx.globalAlpha = wave.opacity
        ctx.beginPath()
        ctx.moveTo(0, wave.y)
        for (let x = 0; x <= width; x += 4) {
          const y = wave.y + Math.sin((x / wave.wavelength) * Math.PI * 2 + time * wave.speed * 1000 + wave.phase) * wave.amplitude
            + Math.sin((x / (wave.wavelength * 0.4)) * Math.PI * 2 + time * wave.speed * 600) * wave.amplitude * 0.2
          ctx.lineTo(x, y)
        }
        ctx.lineTo(width, height)
        ctx.lineTo(0, height)
        ctx.closePath()
        ctx.fillStyle = wave.color
        ctx.fill()
        ctx.restore()
      })

      // Caustics at bottom
      ctx.save()
      ctx.globalAlpha = 0.025
      for (let i = 0; i < 10; i++) {
        const cx = (width * 0.08) + (i / 10) * (width * 0.84) + Math.sin(time * 0.3 + i * 1.3) * 30
        const cy = height - 12 + Math.sin(time * 0.2 + i * 0.9) * 10
        const cr = 20 + Math.sin(time * 0.25 + i * 0.7) * 10
        const cGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, cr)
        cGrad.addColorStop(0, 'rgba(59, 159, 224, 0.3)')
        cGrad.addColorStop(1, 'rgba(59, 159, 224, 0)')
        ctx.fillStyle = cGrad
        ctx.beginPath()
        ctx.arc(cx, cy, cr, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.restore()

      // Particles
      ctx.save()
      particles.forEach(p => {
        p.y -= p.speed
        p.x += Math.sin(time + p.y * 0.008) * 0.15
        if (p.y < -5) {
          p.y = height + 5
          p.x = Math.random() * width
        }
        ctx.globalAlpha = p.opacity
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(108, 196, 245, 0.35)'
        ctx.fill()
      })
      ctx.restore()

      // Bubbles
      ctx.save()
      bubbles.forEach(bubble => {
        bubble.y -= bubble.speed
        bubble.x += Math.sin(time * 1.5 + bubble.y * 0.01) * 0.2
        if (bubble.y < -10) {
          bubble.y = height + 10
          bubble.x = Math.random() * width
        }
        ctx.globalAlpha = bubble.opacity
        ctx.beginPath()
        ctx.arc(bubble.x, bubble.y, Math.max(0.4, bubble.r), 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(59, 159, 224, 0.2)'
        ctx.fill()
        ctx.strokeStyle = 'rgba(59, 159, 224, 0.12)'
        ctx.lineWidth = 0.4
        ctx.stroke()
      })
      ctx.restore()

      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        backgroundColor: '#0b1520',
        backgroundImage: "url('/ocean-background.jpg.jpg')",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
    </div>
  )
}
