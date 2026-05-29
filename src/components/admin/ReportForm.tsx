import { createReport } from '@/app/admin/actions'
import type { ReportCompany } from '@/lib/reports'

export default function ReportForm({ companies }: { companies: readonly ReportCompany[] }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase text-slate-500">New report</p>
      <h2 className="mt-2 text-2xl font-semibold text-slate-950">Add company analysis</h2>

      <form action={createReport} encType="multipart/form-data" className="mt-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="title" className="text-sm font-medium text-slate-700">
              Report title
            </label>
            <input
              id="title"
              name="title"
              required
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-950 shadow-sm outline-none focus:border-slate-500"
            />
          </div>

          <div>
            <label htmlFor="slug" className="text-sm font-medium text-slate-700">
              Slug override
            </label>
            <input
              id="slug"
              name="slug"
              placeholder="optional"
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-950 shadow-sm outline-none focus:border-slate-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="companyId" className="text-sm font-medium text-slate-700">
            Existing company
          </label>
          <select
            id="companyId"
            name="companyId"
            className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 shadow-sm outline-none focus:border-slate-500"
          >
            <option value="">General report or create a new company below</option>
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
                {company.ticker ? ` (${company.ticker})` : ''}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4 md:grid-cols-2">
          <div>
            <label htmlFor="newCompanyName" className="text-sm font-medium text-slate-700">
              New company name
            </label>
            <input
              id="newCompanyName"
              name="newCompanyName"
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-950 shadow-sm outline-none focus:border-slate-500"
            />
          </div>
          <div>
            <label htmlFor="newCompanyTicker" className="text-sm font-medium text-slate-700">
              New company ticker
            </label>
            <input
              id="newCompanyTicker"
              name="newCompanyTicker"
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm uppercase text-slate-950 shadow-sm outline-none focus:border-slate-500"
            />
          </div>
          <div>
            <label htmlFor="newCompanySector" className="text-sm font-medium text-slate-700">
              Sector
            </label>
            <input
              id="newCompanySector"
              name="newCompanySector"
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-950 shadow-sm outline-none focus:border-slate-500"
            />
          </div>
          <div>
            <label htmlFor="newCompanyDescription" className="text-sm font-medium text-slate-700">
              Company description
            </label>
            <input
              id="newCompanyDescription"
              name="newCompanyDescription"
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-950 shadow-sm outline-none focus:border-slate-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="summary" className="text-sm font-medium text-slate-700">
            Summary
          </label>
          <textarea
            id="summary"
            name="summary"
            required
            rows={3}
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-950 shadow-sm outline-none focus:border-slate-500"
          />
        </div>

        <div>
          <label htmlFor="content" className="text-sm font-medium text-slate-700">
            Main analysis content
          </label>
          <textarea
            id="content"
            name="content"
            required
            rows={10}
            className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-950 shadow-sm outline-none focus:border-slate-500"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="documentTitle" className="text-sm font-medium text-slate-700">
              Document title
            </label>
            <input
              id="documentTitle"
              name="documentTitle"
              placeholder="optional"
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-950 shadow-sm outline-none focus:border-slate-500"
            />
          </div>
          <div>
            <label htmlFor="document" className="text-sm font-medium text-slate-700">
              Upload document
            </label>
            <input
              id="document"
              name="document"
              type="file"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.txt"
              className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm file:mr-3 file:rounded-md file:border-0 file:bg-slate-950 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-white"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            name="status"
            value="draft"
            className="inline-flex justify-center rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
          >
            Save draft
          </button>
          <button
            type="submit"
            name="status"
            value="published"
            className="inline-flex justify-center rounded-md bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            Publish report
          </button>
        </div>
      </form>
    </section>
  )
}
