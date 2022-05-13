export interface UserProps {
  name: string
  email: string
  password: string
  root: boolean
  role: 'adm' | 'user'
  avatar: string
}
