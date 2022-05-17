import { hash } from 'bcrypt'
import { NextApiRequest, NextApiResponse } from 'next'
import { User } from '../../../../../models/userModel'
import { connectDB } from '../../../../utils/DB'

connectDB()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'PATCH':
      await resetPassword(req, res)
      break

    default:
      break
  }
}

const resetPassword = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query

    const { password } = req.body

    const passwordHash = await hash(password, 12)

    await User.findOneAndUpdate({ _id: id }, { password: passwordHash })

    res.json({ success: 'Senha alterada com sucesso!' })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}
