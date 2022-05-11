import type { NextApiRequest, NextApiResponse } from 'next'

import { Equipament } from '../../../../models/equipamentModel'
import { connectDB } from '../../../utils/DB'

connectDB()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      await getEquipament(req, res)
      break
    default:
      break
  }
}

const getEquipament = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query
    const equipament = await Equipament.findById(id)
    if (!equipament)
      return res.status(404).json({ error: 'Equipamento nao encontrado' })

    res.status(200).json({
      equipament,
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}
