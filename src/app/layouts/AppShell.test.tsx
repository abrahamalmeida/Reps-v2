import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { AppShell } from './AppShell'

vi.mock('@/features/auth/use-current-user', () => ({
  useCurrentUser: () => ({
    user: { email: 'athleta@reps.dev' },
    profile: { full_name: 'Athleta Test' },
    isProfileLoading: false,
  }),
}))

function renderShell() {
  return render(
    <MemoryRouter initialEntries={['/dashboard']}>
      <AppShell />
    </MemoryRouter>,
  )
}

describe('AppShell', () => {
  it('renderiza el logo y la navegación principal', () => {
    renderShell()
    expect(screen.getByText('Reps')).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /dashboard/i }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: /ejercicios/i }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: /progreso/i }).length).toBeGreaterThan(0)
  })

  it('muestra el usuario conectado', () => {
    renderShell()
    expect(screen.getByText('Athleta Test')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cerrar sesión' })).toBeInTheDocument()
  })
})
