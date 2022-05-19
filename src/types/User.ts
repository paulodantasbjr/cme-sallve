export interface UserProps {
  _id: string
  name: string
  email: string
  password: string
  role: 'ADM' | 'USER' | 'AUTHOR'
  avatar: string
}
