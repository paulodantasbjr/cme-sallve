import { NextApiRequest, NextApiResponse } from 'next'

import { connectDB } from '../../../utils/DB'
import { User } from '../../../../models/userModel'

connectDB()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      await getUsers(res)
      break

    default:
      break
  }
}

const getUsers = async (res: NextApiResponse) => {
  try {
    const users = await User.find().sort({ updatedAt: -1 })
    res.status(200).json({
      total: users.length,
      users,
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}
