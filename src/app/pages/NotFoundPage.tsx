import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="grid min-h-[60vh] place-items-center text-center">
      <div className="space-y-4">
        <p className="text-7xl font-black text-acid">404</p>
        <h1 className="text-xl font-bold text-white">Página no encontrada</h1>
        <p className="text-sm text-slate-400">La ruta que buscas no existe… todavía.</p>
        <Link
          to="/dashboard"
          className="inline-flex h-10 items-center justify-center rounded-lg bg-acid px-6 text-sm font-semibold text-surface hover:bg-acid-dim"
        >
          Volver al dashboard
        </Link>
      </div>
    </div>
  )
}
