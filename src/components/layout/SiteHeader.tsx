import Link from 'next/link'
import React from 'react'

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    href={href}
    className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
  >
    {children}
  </Link>
)

export default function SiteHeader() {
  return (
    <header className="w-full border-b border-slate-200 bg-white/95">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex h-10 w-10 items-center justify-center rounded-md bg-slate-950 text-sm font-semibold text-white"
            aria-label="Geon Oh Kim Research home"
          >
            GK
          </Link>
          <div>
            <Link href="/" className="text-base font-semibold text-slate-950">
              Geon Oh Kim Research
            </Link>
            <div className="mt-0.5 text-xs font-medium text-slate-500">
              Long-term company analysis
            </div>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-1" aria-label="Primary navigation">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/research">Research</NavLink>
          <NavLink href="/companies">Companies</NavLink>
          <NavLink href="/documents">Documents</NavLink>
        </nav>
      </div>
    </header>
  )
}
