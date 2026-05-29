import React from 'react'

export default function SiteFooter() {
  return (
    <footer className="w-full border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-slate-600 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>Long-term company analysis, investment theses, and supporting research documents.</div>
        <div className="text-xs font-medium text-slate-500">
          © {new Date().getFullYear()} Geon Oh Kim Research
        </div>
      </div>
    </footer>
  )
}
