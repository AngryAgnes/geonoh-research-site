import { signInAdmin } from '@/app/admin/actions'

const errorMessages: Record<string, string> = {
  'login-failed': 'Login failed. Check the email and password for your Supabase admin user.',
  'not-admin': 'You do not have admin access.',
  'missing-config': 'Supabase is not configured yet.',
  'signed-out': 'Please sign in to continue.'
}

export default function AdminLoginForm({ error }: { error?: string }) {
  return (
    <section className="mx-auto max-w-lg rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase text-slate-500">Admin login</p>
      <h1 className="mt-3 text-2xl font-semibold text-slate-950">Research dashboard</h1>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        Sign in with the Supabase admin user credentials for an email listed in
        `ADMIN_EMAILS`.
      </p>

      {error ? (
        <div className="mt-5 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {errorMessages[error] ?? 'Unable to complete that admin action.'}
        </div>
      ) : null}

      <form action={signInAdmin} className="mt-6 space-y-4">
        <div>
          <label htmlFor="email" className="text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 shadow-sm outline-none focus:border-slate-500"
          />
        </div>

        <div>
          <label htmlFor="password" className="text-sm font-medium text-slate-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 shadow-sm outline-none focus:border-slate-500"
          />
        </div>

        <button
          type="submit"
          className="inline-flex w-full justify-center rounded-md bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
        >
          Sign in
        </button>
      </form>
    </section>
  )
}
