const validateEmail = (email: string) => {
  const verifyEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return verifyEmail.test(String(email).toLowerCase())
}

export const valid = (
  email: string,
  password: string,
  name?: string,
  passwordConfirm?: string
) => {
  if (!name || !email || !password || !passwordConfirm)
    return 'Preencha todos os campos'

  if (!validateEmail(email)) return 'Email inválido'

  if (password.length < 6) return 'A senha deve ter no mínimo 6 caracteres'

  if (password !== passwordConfirm) return 'As senhas não conferem'
}
