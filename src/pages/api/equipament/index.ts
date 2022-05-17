import { NextApiRequest, NextApiResponse } from 'next'

import { connectDB } from '../../../utils/DB'
import { Equipament } from '../../../../models/equipamentModel'

connectDB()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      await getEquipaments(res)
      break
    case 'POST':
      await createEquipament(req, res)
      break
    default:
      break
  }
}

const getEquipaments = async (res: NextApiResponse) => {
  try {
    const equipaments = await Equipament.find().sort({ updatedAt: -1 })
    res.status(200).json({
      total: equipaments.length,
      equipaments,
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

const createEquipament = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { ns, type, model, brand, status, local, obs } = req.body

    const verifyNS = await Equipament.findOne({ ns })
    if (verifyNS) return res.status(400).json({ error: 'NS já cadastrada' })

    const newEquipament = new Equipament({
      ns: ns.toUpperCase(),
      type: type.toUpperCase(),
      model: model.toUpperCase(),
      brand: brand.toUpperCase(),
      status: status.toUpperCase(),
      local: local.toUpperCase(),
      obs,
    })

    await newEquipament.save()

    res.json({ success: 'Novo equipamento criado' })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}
