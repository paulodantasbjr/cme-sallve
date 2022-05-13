import { NextApiRequest, NextApiResponse } from 'next'

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
    default:
      break
  }
}

const deleteUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query
    console.log('chegou')
    const user = await User.findByIdAndDelete(id)
    if (!user) return res.status(404).json({ error: 'Usuário nao encontrado' })

    res.status(200).json({
      success: 'Usuário deletado com sucesso',
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}
