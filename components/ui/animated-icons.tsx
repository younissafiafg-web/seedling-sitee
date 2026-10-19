// Animated icons: plain SVG + CSS (styles live in app/globals.css), no extra packages.
export function ChatIcon() {
  return (
    <svg className="ai" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-8l-5 4v-4H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/><circle className="ai-dot d1" cx="8" cy="10.5" r="1.1" fill="currentColor" stroke="none"/><circle className="ai-dot d2" cx="12" cy="10.5" r="1.1" fill="currentColor" stroke="none"/><circle className="ai-dot d3" cx="16" cy="10.5" r="1.1" fill="currentColor" stroke="none"/></svg>
  )
}

export function AppIcon() {
  return (
    <svg className="ai" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3.5" width="18" height="17" rx="2.5"/><path d="M3 8h18"/><rect className="ai-bar b1" x="7" y="12" width="2.4" height="5" rx=".6" fill="currentColor" stroke="none"/><rect className="ai-bar b2" x="11" y="12" width="2.4" height="5" rx=".6" fill="currentColor" stroke="none"/><rect className="ai-bar b3" x="15" y="12" width="2.4" height="5" rx=".6" fill="currentColor" stroke="none"/></svg>
  )
}

export function GearIcon() {
  return (
    <svg className="ai" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><g className="ai-gear"><circle cx="12" cy="12" r="3.2"/><circle cx="12" cy="12" r="6.6"/><path d="M12 2.6v2.8M12 18.6v2.8M2.6 12h2.8M18.6 12h2.8M5.4 5.4l2 2M16.6 16.6l2 2M5.4 18.6l2-2M16.6 7.4l2-2"/></g></svg>
  )
}

