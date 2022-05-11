import type { NextApiRequest, NextApiResponse } from 'next'

import { hash } from 'bcrypt'

import { connectDB } from '../../../utils/DB'
import { User } from '../../../../models/userModel'

connectDB()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST':
      await register(req, res)
      break

    default:
      break
  }
}

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name, email, password } = req.body

    const user = await User.findOne({ email })
    if (user) return res.status(404).json({ error: 'email ja existe' })

    const passwordHash = await hash(password, 12)

    const newUser = new User({ name, email, password: passwordHash })

    await newUser.save()

    res.status(200).json({ success: 'usuario criado com sucesso' })
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}
