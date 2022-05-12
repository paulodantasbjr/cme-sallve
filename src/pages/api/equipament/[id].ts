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
    case 'PUT':
      await updateEquipament(req, res)
      break
    case 'DELETE':
      await deleteEquipament(req, res)
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

const updateEquipament = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query
    const { ns, type, model, brand, status, obs } = req.body

    const equipament = await Equipament.findOneAndUpdate(
      { _id: id },
      {
        ns: ns.toUpperCase(),
        type: type.toUpperCase(),
        model: model.toUpperCase(),
        brand: brand.toUpperCase(),
        status: status.toUpperCase(),
        obs,
      }
    )
    if (!equipament)
      return res.status(404).json({ error: 'Equipamento nao encontrado' })

    res.json({ success: 'Equipamento editado com sucesso' })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

const deleteEquipament = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query
    const equipament = await Equipament.findByIdAndDelete(id)
    if (!equipament)
      return res.status(404).json({ error: 'Equipamento nao encontrado' })

    res.status(200).json({
      success: 'Equipamento deletado com sucesso',
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}
