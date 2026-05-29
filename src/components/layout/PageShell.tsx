import React from 'react'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'

export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 lg:px-8">{children}</main>
      <SiteFooter />
    </div>
  )
}
