import { UserRound } from 'lucide-react'
import { Card } from '@/components/ui/Card'

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-white">Perfil</h1>
        <p className="mt-1 text-sm text-slate-400">Tu cuenta, datos y preferencias.</p>
      </header>

      <Card className="grid place-items-center gap-4 p-10 text-center">
        <span className="grid size-14 place-items-center rounded-full bg-ultra/15 text-ultra">
          <UserRound className="size-6" aria-hidden />
        </span>
        <div>
          <p className="font-semibold text-slate-200">Cuenta invitada</p>
          <p className="mt-1 text-sm text-slate-500">
            Conecta tu cuenta para sincronizar datos entre dispositivos.
          </p>
        </div>
      </Card>
    </div>
  )
}
