export interface UserProps {
  _id: string
  name: string
  email: string
  password: string
  role: 'adm' | 'user'
  avatar: string
}
