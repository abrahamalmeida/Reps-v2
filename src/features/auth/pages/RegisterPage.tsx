import { type FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { supabase } from '@/lib/supabase'
import { authErrorMessage } from '../auth-error-message'

const schema = z.object({
  name: z.string().min(1, 'Escribe tu nombre'),
  email: z.string().email('Correo inválido'),
  password: z.string().min(8, 'Mínimo 8 caracteres'),
})

type FormValues = z.infer<typeof schema>

export default function RegisterPage() {
  const navigate = useNavigate()
  const [values, setValues] = useState<FormValues>({ name: '', email: '', password: '' })
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormValues, string>>>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

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
        name: issues.find((issue) => issue.path[0] === 'name')?.message,
        email: issues.find((issue) => issue.path[0] === 'email')?.message,
        password: issues.find((issue) => issue.path[0] === 'password')?.message,
      })
      return
    }
    setFieldErrors({})
    setFormError(null)
    setIsSubmitting(true)
    const { data, error } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: { data: { full_name: parsed.data.name } },
    })
    setIsSubmitting(false)
    if (error) {
      setFormError(authErrorMessage(error))
      return
    }
    if (!data.session) {
      setFormError('Revisa tu correo para confirmar la cuenta antes de entrar.')
      return
    }
    navigate('/dashboard', { replace: true })
  }

  return (
    <Card className="p-6 sm:p-8">
      <h1 className="text-xl font-bold text-white">Crea tu cuenta</h1>
      <p className="mt-1 text-sm text-slate-400">Únete y empieza a mover hierro.</p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
        <div className="space-y-1.5">
          <label htmlFor="name" className="text-sm font-medium text-slate-300">
            Nombre
          </label>
          <Input
            id="name"
            placeholder="Tu nombre"
            autoComplete="name"
            value={values.name}
            onChange={(e) => setField('name', e.target.value)}
            aria-invalid={Boolean(fieldErrors.name)}
          />
          {fieldErrors.name && <p className="text-xs text-rose">{fieldErrors.name}</p>}
        </div>

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
            placeholder="Mínimo 8 caracteres"
            autoComplete="new-password"
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
          Crear cuenta
        </Button>
        <p className="text-center text-xs text-slate-500">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="font-medium text-acid hover:underline">
            Inicia sesión
          </Link>
        </p>
      </form>
    </Card>
  )
}
