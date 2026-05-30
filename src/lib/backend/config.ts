import 'server-only'

export const getBackendBaseUrl = (): string => (process.env.BACKEND_URL ?? '').replace(/\/+$/, '')

export const isBackendConfigured = (): boolean => getBackendBaseUrl().length > 0
