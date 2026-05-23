import React from 'react'

export default function SiteFooter() {
  return (
    <footer className="w-full border-t border-slate-200 bg-white">
      <div className="max-w-4xl mx-auto px-4 py-6 text-sm text-slate-600">
        <div>Long-term company analysis, investment theses, and supporting research documents.</div>
        <div className="mt-3 text-xs text-slate-500">© {new Date().getFullYear()} Geon Oh Kim Research</div>
      </div>
    </footer>
  )
}
