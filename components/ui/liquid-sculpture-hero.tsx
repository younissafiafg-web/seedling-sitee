"use client"

import * as React from "react"

type Link = { label: string; href: string }

export interface SculptureHeroProps {
  brand?: string
  navLinks?: Link[]
  navCta?: Link
  eyebrow?: string
  headline?: string
  headlineAccent?: string
  body?: string
  primaryCta?: Link
  secondaryCta?: Link
  hint?: string
  darkBackground?: string
  accentColor?: string
  logoSrc?: string
}

const SPLIT = 0.586 // where the arrow icon ends and the SEEDLING word begins

const CSS = `
.sh{position:relative;min-height:100svh;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden;
  background:transparent;color:#f4f4f2;font-family:'Helvetica Neue',Arial,sans-serif;-webkit-font-smoothing:antialiased;touch-action:pan-y}
.sh canvas{position:absolute;left:0;top:0}
.sh-nav{position:relative;z-index:1;display:flex;justify-content:space-between;align-items:center;padding:24px clamp(20px,4vw,48px)}
.sh-brand{font-weight:600;letter-spacing:.1em;text-decoration:none;color:inherit}
.sh-links{display:flex;gap:24px;align-items:center}
.sh-links a{text-decoration:none;color:inherit;font-size:14px;opacity:.75}
.sh-links a.sh-cta{opacity:1;border:1px solid rgba(255,255,255,.25);border-radius:999px;padding:8px 16px}
.sh-hint{position:absolute;z-index:1;left:50%;transform:translateX(-50%);bottom:34%;font-size:11px;letter-spacing:.14em;
  text-transform:uppercase;opacity:.5;pointer-events:none;white-space:nowrap}
.sh-main{position:relative;z-index:1;display:grid;grid-template-columns:1.5fr 1fr;gap:40px;align-items:end;pointer-events:none;
  padding:0 clamp(20px,4vw,48px) clamp(28px,4vw,48px)}
.sh-main a{pointer-events:auto}
.sh-eye{font-size:12px;letter-spacing:.12em;text-transform:uppercase;opacity:.65;margin:0 0 14px}
.sh h1{font-size:clamp(34px,5.2vw,76px);line-height:.96;letter-spacing:-.04em;font-weight:500;margin:0}
.sh h1 span.l{display:block}
.sh-acc{color:var(--acc);font-style:italic;font-weight:400}
.sh-body{font-size:16px;line-height:1.55;opacity:.78;margin:0 0 22px;max-width:400px}
.sh-btns{display:flex;flex-wrap:wrap;align-items:center;gap:20px}
.sh-btn{background:var(--acc);color:#050505;text-decoration:none;font-weight:500;font-size:15px;padding:14px 24px;border-radius:999px}
.sh-txt{color:inherit;text-decoration:none;font-size:15px;border-bottom:1px solid rgba(255,255,255,.3);padding:4px 0}
@media(max-width:800px){
  .sh-main{grid-template-columns:1fr;gap:20px}
  .sh-links a.sh-l{display:none}
  .sh-hint{bottom:44%}
}
`

function renderHeadline(text: string, accent: string) {
  return text.split("\n").map((line, i) => {
    const idx = accent ? line.indexOf(accent) : -1
    return (
      <span className="l" key={i}>
        {idx >= 0 ? (
          <>
            {line.slice(0, idx)}
            <span className="sh-acc">{accent}</span>
            {line.slice(idx + accent.length)}
          </>
        ) : (
          line
        )}
      </span>
    )
  })
}

export default function SculptureHero({
  brand = "SEEDLING",
  navLinks = [],
  navCta,
  eyebrow = "",
  headline = "",
  headlineAccent = "",
  body = "",
  primaryCta,
  secondaryCta,
  hint = "",
  darkBackground = "#050505",
  accentColor = "#a7f3b5",
  logoSrc = "/logo.png",
}: SculptureHeroProps) {
  const rootRef = React.useRef<HTMLElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  React.useEffect(() => {
    const root = rootRef.current
    const canvas = canvasRef.current
    if (!root || !canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    type P = { hx: number; hy: number; x: number; y: number; vx: number; vy: number; g: boolean }
    let parts: P[] = []
    let w = 0
    let h = 0
    let raf = 0
    let ready = false
    let gap = 5
    const mouse = { x: -9999, y: -9999, boost: 0 }
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const img = new Image()

    const build = () => {
      if (!ready) return
      w = root.clientWidth
      h = root.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + "px"
      canvas.style.height = h + "px"
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const ar = img.naturalWidth / img.naturalHeight
      const lw = Math.round(Math.min(w * 0.8, h * 0.5 * ar, 720))
      const lh = Math.round(lw / ar)
      const lx = (w - lw) / 2
      const ly = Math.max(72, h * 0.1)
      gap = w < 640 ? 4 : 5
      const off = document.createElement("canvas")
      off.width = lw
      off.height = lh
      const octx = off.getContext("2d", { willReadFrequently: true })
      if (!octx) return
      octx.drawImage(img, 0, 0, lw, lh)
      const data = octx.getImageData(0, 0, lw, lh).data
      parts = []
      for (let y = 0; y < lh; y += gap) {
        for (let x = 0; x < lw; x += gap) {
          const i = (y * lw + x) * 4
          if ((data[i] + data[i + 1] + data[i + 2]) / 3 < 110) continue
          parts.push({ hx: lx + x, hy: ly + y, x: lx + x, y: ly + y, vx: 0, vy: 0, g: y < lh * SPLIT })
        }
      }
    }

    const tick = () => {
      ctx.clearRect(0, 0, w, h)
      const R = 130
      const r = gap * 0.5
      for (const p of parts) {
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const d = Math.sqrt(dx * dx + dy * dy) || 1
        if (d < R) {
          const f = (1 - d / R) * (2.2 + mouse.boost * 9)
          p.vx += (dx / d) * f + (-dy / d) * f * 0.4
          p.vy += (dy / d) * f + (dx / d) * f * 0.4
        }
        p.vx += (p.hx - p.x) * 0.04
        p.vy += (p.hy - p.y) * 0.04
        p.vx *= 0.88
        p.vy *= 0.88
        p.x += p.vx
        p.y += p.vy
        ctx.fillStyle = p.g ? accentColor : "#f4f4f2"
        ctx.beginPath()
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
        ctx.fill()
      }
      mouse.boost *= 0.9
      raf = requestAnimationFrame(tick)
    }

    const pos = (e: PointerEvent) => {
      const b = root.getBoundingClientRect()
      mouse.x = e.clientX - b.left
      mouse.y = e.clientY - b.top
    }
    const onMove = (e: PointerEvent) => pos(e)
    const onDown = (e: PointerEvent) => {
      pos(e)
      mouse.boost = 1
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    img.onload = () => {
      ready = true
      build()
      raf = requestAnimationFrame(tick)
    }
    img.src = logoSrc
    const ro = new ResizeObserver(build)
    ro.observe(root)
    root.addEventListener("pointermove", onMove)
    root.addEventListener("pointerdown", onDown)
    root.addEventListener("pointerleave", onLeave)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      root.removeEventListener("pointermove", onMove)
      root.removeEventListener("pointerdown", onDown)
      root.removeEventListener("pointerleave", onLeave)
    }
  }, [accentColor, logoSrc])

  const vars = { "--bg": darkBackground, "--acc": accentColor } as React.CSSProperties

  return (
    <section ref={rootRef} className="sh" style={vars}>
      <style>{CSS}</style>
      <canvas ref={canvasRef} role="img" aria-label="Seedling logo made of moving dots" />

      <nav className="sh-nav">
        <a className="sh-brand" href="#">{brand}</a>
        <div className="sh-links">
          {navLinks.map((l, i) => (
            <a key={i} className="sh-l" href={l.href}>{l.label}</a>
          ))}
          {navCta ? <a className="sh-cta" href={navCta.href}>{navCta.label}</a> : null}
        </div>
      </nav>

      {hint ? <div className="sh-hint" aria-hidden="true">{hint}</div> : null}

      <div className="sh-main">
        <div>
          {eyebrow ? <p className="sh-eye">{eyebrow}</p> : null}
          <h1>{renderHeadline(headline, headlineAccent)}</h1>
        </div>
        <div>
          {body ? <p className="sh-body">{body}</p> : null}
          <div className="sh-btns">
            {primaryCta ? <a className="sh-btn" href={primaryCta.href}>{primaryCta.label}</a> : null}
            {secondaryCta ? <a className="sh-txt" href={secondaryCta.href}>{secondaryCta.label}</a> : null}
          </div>
        </div>
      </div>
    </section>
  )
}
