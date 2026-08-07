import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from './store'

export function SessionManager() {
  const setSession = useAuthStore((s) => s.setSession)
  const setLoading = useAuthStore((s) => s.setLoading)

  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => {
      subscription.subscription.unsubscribe()
    }
  }, [setSession, setLoading])

  return null
}
