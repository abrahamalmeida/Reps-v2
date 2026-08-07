import { type FormEvent, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { supabase } from '@/lib/supabase'
import { authErrorMessage } from '../auth-error-message'

const schema = z.object({
  email: z.string().email('Correo inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
})

type FormValues = z.infer<typeof schema>

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [values, setValues] = useState<FormValues>({ email: '', password: '' })
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormValues, string>>>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const from = (location.state as { from?: string } | null)?.from ?? '/dashboard'

  function setField<K extends keyof FormValues>(key: K, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }))
    setFieldErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const parsed = schema.safeParse(values)
    if (!parsed.success) {
      const issues = parsed.error.issues
      setFieldErrors({
        email: issues.find((issue) => issue.path[0] === 'email')?.message,
        password: issues.find((issue) => issue.path[0] === 'password')?.message,
      })
      return
    }
    setFieldErrors({})
    setFormError(null)
    setIsSubmitting(true)
    const { error } = await supabase.auth.signInWithPassword(parsed.data)
    setIsSubmitting(false)
    if (error) {
      setFormError(authErrorMessage(error))
      return
    }
    navigate(from, { replace: true })
  }

  return (
    <Card className="p-6 sm:p-8">
      <h1 className="text-xl font-bold text-white">Iniciar sesión</h1>
      <p className="mt-1 text-sm text-slate-400">Continúa tu racha.</p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-sm font-medium text-slate-300">
            Correo
          </label>
          <Input
            id="email"
            type="email"
            placeholder="tu@correo.com"
            autoComplete="email"
            value={values.email}
            onChange={(e) => setField('email', e.target.value)}
            aria-invalid={Boolean(fieldErrors.email)}
          />
          {fieldErrors.email && <p className="text-xs text-rose">{fieldErrors.email}</p>}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="password" className="text-sm font-medium text-slate-300">
            Contraseña
          </label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            value={values.password}
            onChange={(e) => setField('password', e.target.value)}
            aria-invalid={Boolean(fieldErrors.password)}
          />
          {fieldErrors.password && <p className="text-xs text-rose">{fieldErrors.password}</p>}
        </div>

        {formError && (
          <p className="rounded-lg bg-rose/10 px-3 py-2 text-sm text-rose">{formError}</p>
        )}

        <Button type="submit" className="w-full" isLoading={isSubmitting}>
          Entrar
        </Button>
        <p className="text-center text-xs text-slate-500">
          ¿No tienes cuenta?{' '}
          <Link to="/registro" className="font-medium text-acid hover:underline">
            Regístrate
          </Link>
        </p>
      </form>
    </Card>
  )
}
