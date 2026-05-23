import React from 'react'

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="text-sm text-slate-700 hover:text-slate-900 px-3 py-2 rounded-sm"
  >
    {children}
  </a>
)

export default function SiteHeader() {
  return (
    <header className="w-full border-b border-slate-200 bg-white">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <div>
          <a href="/" className="text-lg font-semibold text-slate-900">
            Geon Oh Kim Research
          </a>
          <div className="text-xs text-slate-500">Long-term company analysis</div>
        </div>

        <nav className="hidden md:flex items-center" aria-label="Primary navigation">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/analysis">Analysis</NavLink>
          <NavLink href="/companies">Companies</NavLink>
          <NavLink href="/documents">Documents</NavLink>
          <NavLink href="/admin">Admin</NavLink>
        </nav>

        <div className="md:hidden">
          <button aria-label="Open menu" className="text-slate-600">☰</button>
        </div>
      </div>
    </header>
  )
}
