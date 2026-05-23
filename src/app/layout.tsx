import "./globals.css"
import React from 'react'
import PageShell from '@/components/layout/PageShell'

export const metadata = {
  title: 'Geon Oh Kim Research',
  description: 'Personal equity research and company analysis'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-50 text-slate-900">
        <PageShell>{children}</PageShell>
      </body>
    </html>
  )
}
