export interface UserProps {
  name: string
  email: string
  password: string
  role: 'adm' | 'user'
  root: boolean
  avatar: string
}
