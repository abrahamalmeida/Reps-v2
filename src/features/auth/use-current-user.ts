import { useProfile } from '@/features/profile/use-profile'
import { useAuthStore } from './store'

export function useCurrentUser() {
  const session = useAuthStore((s) => s.session)
  const profile = useProfile(session?.user.id)

  return {
    user: session?.user ?? null,
    profile: profile.data ?? null,
    isProfileLoading: profile.isLoading,
  }
}
