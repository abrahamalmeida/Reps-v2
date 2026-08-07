import { Card } from '@/components/ui/Card'
import { Avatar } from '@/components/ui/Avatar'
import { useCurrentUser } from '@/features/auth/use-current-user'

export default function ProfilePage() {
  const { user, profile } = useCurrentUser()
  const displayName = profile?.full_name || user?.email || 'Tu cuenta'

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-white">Perfil</h1>
        <p className="mt-1 text-sm text-slate-400">Tu cuenta, datos y preferencias.</p>
      </header>

      <Card className="flex items-center gap-4 p-6">
        <Avatar name={displayName} className="size-14 text-lg" />
        <div className="min-w-0">
          <p className="truncate text-lg font-bold text-white">{displayName}</p>
          <p className="truncate text-sm text-slate-500">{user?.email}</p>
          {profile?.fitness_goal && (
            <span className="mt-1 inline-block rounded-full bg-acid/15 px-2.5 py-0.5 text-xs font-medium text-acid">
              {profile.fitness_goal}
            </span>
          )}
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="font-semibold text-white">Editar perfil</h2>
        <p className="mt-1 text-sm text-slate-400">
          Unidades, metas, foto de perfil y más detalles llegan en una fase próxima.
        </p>
      </Card>
    </div>
  )
}
