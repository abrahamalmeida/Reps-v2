import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom'

export default function ErrorPage() {
  const error = useRouteError()

  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
      ? error.message
      : 'Algo salió mal'

  return (
    <div className="grid min-h-screen place-items-center bg-surface px-4 text-center text-white">
      <div className="space-y-4">
        <p className="text-6xl font-black text-acid">Ups</p>
        <h1 className="text-xl font-bold">Algo salió mal</h1>
        <p className="text-sm text-slate-400">{message}</p>
        <Link
          to="/dashboard"
          className="inline-flex h-10 items-center justify-center rounded-lg bg-acid px-6 text-sm font-semibold text-surface hover:bg-acid-dim"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
