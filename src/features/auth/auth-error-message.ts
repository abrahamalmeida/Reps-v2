type AuthErrorLike = { code?: string; message: string }

export function authErrorMessage(error: AuthErrorLike | null): string | null {
  if (!error) return null
  switch (error.code) {
    case 'invalid_credentials':
      return 'Correo o contraseña incorrectos.'
    case 'email_not_confirmed':
      return 'Confirma tu correo antes de iniciar sesión.'
    case 'user_already_exists':
      return 'Ya existe una cuenta con ese correo.'
    case 'weak_password':
      return 'La contraseña es demasiado débil.'
    case 'over_email_send_rate_limit':
    case 'over_request_rate_limit':
      return 'Demasiados intentos. Espera un momento.'
    default:
      return error.message || 'Algo salió mal. Intenta de nuevo.'
  }
}
