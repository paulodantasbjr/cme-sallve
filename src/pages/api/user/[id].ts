import { NextApiRequest, NextApiResponse } from 'next'

import { hash } from 'bcrypt'

import { connectDB } from '../../../utils/DB'
import { User } from '../../../../models/userModel'

connectDB()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'DELETE':
      await deleteUser(req, res)
      break
    case 'PATCH':
      await updateUser(req, res)
      break
    default:
      break
  }
}

const deleteUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query
    const user = await User.findByIdAndDelete(id)
    if (!user) return res.status(404).json({ error: 'Usuário nao encontrado' })

    res.status(200).json({
      success: 'Usuário deletado com sucesso',
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

const updateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query
    const { email, name, role } = req.body

    const user = await User.findOneAndUpdate(
      { _id: id },
      {
        email,
        name: name.toUpperCase(),
        role: role.toUpperCase(),
      }
    )
    if (!user) return res.status(404).json({ error: 'Usuário nao encontrado' })

    res.json({ success: 'Usuário editado com sucesso' })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}
