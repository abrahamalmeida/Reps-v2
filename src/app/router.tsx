/* oxlint-disable react/only-export-components */
import { lazy, Suspense, type ComponentType } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppShell } from '@/app/layouts/AppShell'
import { AuthLayout } from '@/app/layouts/AuthLayout'
import { PageLoader } from '@/app/PageLoader'
import ErrorPage from '@/app/pages/ErrorPage'
import { AuthGate } from '@/app/guards/AuthGate'
import { GuestOnly } from '@/app/guards/GuestOnly'

const DashboardPage = lazy(() => import('@/features/dashboard/pages/DashboardPage'))
const WorkoutsPage = lazy(() => import('@/features/workouts/pages/WorkoutsPage'))
const ExercisesPage = lazy(() => import('@/features/exercises/pages/ExercisesPage'))
const ProgressPage = lazy(() => import('@/features/progress/pages/ProgressPage'))
const ProfilePage = lazy(() => import('@/features/profile/pages/ProfilePage'))
const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage'))
const RegisterPage = lazy(() => import('@/features/auth/pages/RegisterPage'))
const NotFoundPage = lazy(() => import('@/app/pages/NotFoundPage'))

function lazyPage(Component: ComponentType) {
  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  )
}

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <GuestOnly>{lazyPage(LoginPage)}</GuestOnly> },
      { path: '/registro', element: <GuestOnly>{lazyPage(RegisterPage)}</GuestOnly> },
    ],
  },
  {
    element: <AuthGate />,
    children: [
      {
        element: <AppShell />,
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Navigate to="/dashboard" replace /> },
          { path: '/dashboard', element: lazyPage(DashboardPage) },
          { path: '/rutinas', element: lazyPage(WorkoutsPage) },
          { path: '/ejercicios', element: lazyPage(ExercisesPage) },
          { path: '/progreso', element: lazyPage(ProgressPage) },
          { path: '/perfil', element: lazyPage(ProfilePage) },
          { path: '*', element: lazyPage(NotFoundPage) },
        ],
      },
    ],
  },
])
