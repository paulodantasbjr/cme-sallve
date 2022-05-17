import type { NextApiRequest, NextApiResponse } from 'next'

import { compare } from 'bcrypt'

import {
  createAccessToken,
  createRefreshToken,
} from '../../../utils/GenerateToken'
import { connectDB } from '../../../utils/DB'
import { User } from '../../../../models/userModel'

connectDB()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST':
      await login(req, res)
      break
    default:
      break
  }
}

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ error: 'Usuaŕio nao encontrado' })

    const isPasswordMatch = await compare(password, user.password)
    if (!isPasswordMatch)
      return res.status(400).json({ error: 'senha incorreta' })

    const accessToken = createAccessToken({ id: user._id })
    const refreshToken = createRefreshToken({ id: user._id })

    res.status(200).json({
      success: 'Sucesso ao logar',
      accessToken,
      refreshToken,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        root: user.root,
      },
    })
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}
