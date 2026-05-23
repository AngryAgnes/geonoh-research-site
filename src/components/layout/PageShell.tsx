import React from 'react'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'

export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-8">{children}</main>
      <SiteFooter />
    </div>
  )
}
