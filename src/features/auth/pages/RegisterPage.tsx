import { type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'

export default function RegisterPage() {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
  }

  return (
    <Card className="p-6 sm:p-8">
      <h1 className="text-xl font-bold text-white">Crea tu cuenta</h1>
      <p className="mt-1 text-sm text-slate-400">Únete y empieza a mover hierro.</p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-1.5">
          <label htmlFor="name" className="text-sm font-medium text-slate-300">
            Nombre
          </label>
          <Input id="name" placeholder="Tu nombre" autoComplete="name" />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-sm font-medium text-slate-300">
            Correo
          </label>
          <Input id="email" type="email" placeholder="tu@correo.com" autoComplete="email" />
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
          />
        </div>
        <Button type="submit" className="w-full">
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
