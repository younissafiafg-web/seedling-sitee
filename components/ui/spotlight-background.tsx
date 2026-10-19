"use client"

import * as React from "react"

// A soft light that follows the cursor (or finger) behind the whole page.
// Written with plain inline styles, so Tailwind is not needed.
export default function SpotlightBackground({ color = "167,243,181", opacity = 0.28 }: { color?: string; opacity?: number }) {
  const [pos, setPos] = React.useState({ x: -999, y: -999 })
  const [moving, setMoving] = React.useState(false)
  const [seen, setSeen] = React.useState(false)
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => {
    const onMove = (e: PointerEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      setSeen(true)
      setMoving(true)
      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(() => setMoving(false), 150)
    }
    window.addEventListener("pointermove", onMove)
    return () => {
      window.removeEventListener("pointermove", onMove)
      if (timer.current) clearTimeout(timer.current)
    }
  }, [])

  const size = moving ? 260 : 340
  return (
    <div aria-hidden="true" style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      <div
        style={{
          position: "absolute",
          left: pos.x,
          top: pos.y,
          width: size,
          height: size,
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          opacity: seen ? 1 : 0,
          transition: "width .3s ease-out, height .3s ease-out, opacity .6s ease",
          background: `radial-gradient(circle, rgba(${color},${opacity}) 0%, transparent 70%)`,
        }}
      />
    </div>
  )
}
