import { NextResponse } from 'next/server'
import { getBackendBaseUrl } from '@/lib/backend/config'

interface DownloadRouteContext {
  params: {
    id: string
  }
}

export async function GET(_request: Request, { params }: DownloadRouteContext) {
  const backendBaseUrl = getBackendBaseUrl()

  if (!backendBaseUrl) {
    return NextResponse.json({ error: 'Backend API URL is not configured.' }, { status: 503 })
  }

  return NextResponse.redirect(
    `${backendBaseUrl}/v1/documents/${encodeURIComponent(params.id)}/download`
  )
}
