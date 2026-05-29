import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { isSupabaseConfigured } from '@/lib/supabase/config'

interface DownloadRouteContext {
  params: {
    id: string
  }
}

interface DocumentDownloadRow {
  bucket: string
  path: string
  filename: string
}

export async function GET(_request: Request, { params }: DownloadRouteContext) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: 'Supabase is not configured.' }, { status: 503 })
  }

  const supabase = createSupabaseServerClient()
  const { data: document, error } = await supabase
    .from('documents')
    .select('bucket, path, filename')
    .eq('id', params.id)
    .eq('public', true)
    .maybeSingle()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!document) {
    return NextResponse.json({ error: 'Document not found.' }, { status: 404 })
  }

  const typedDocument = document as DocumentDownloadRow
  const { data: signedUrl, error: signedUrlError } = await supabase.storage
    .from(typedDocument.bucket)
    .createSignedUrl(typedDocument.path, 60, {
      download: typedDocument.filename
    })

  if (signedUrlError || !signedUrl?.signedUrl) {
    return NextResponse.json(
      { error: signedUrlError?.message ?? 'Unable to create download link.' },
      { status: 500 }
    )
  }

  return NextResponse.redirect(signedUrl.signedUrl)
}
