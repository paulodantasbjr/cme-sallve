import type { NextApiRequest, NextApiResponse } from 'next'

import { Inventory } from '../../../../models/inventoryModel'
import { connectDB } from '../../../utils/DB'

connectDB()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      await getInventory(req, res)
      break
    case 'PUT':
      await updateInventory(req, res)
      break
    case 'DELETE':
      await deleteInventory(req, res)
      break
    default:
      break
  }
}

const getInventory = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query
    const inventory = await Inventory.findById(id)
    if (!inventory)
      return res.status(404).json({ error: 'item nao encontrado' })

    res.status(200).json({
      inventory,
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

const updateInventory = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query
    const { ns, type, model, brand, status, local, obs } = req.body

    const inventario = await Inventory.findOneAndUpdate(
      { _id: id },
      {
        ns: ns.toUpperCase(),
        type: type.toUpperCase(),
        model: model.toUpperCase(),
        brand: brand.toUpperCase(),
        status: status.toUpperCase(),
        local: local.toUpperCase(),
        obs,
      }
    )
    if (!inventario)
      return res.status(404).json({ error: 'Item nao encontrado' })

    res.json({ success: 'Item editado com sucesso' })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

const deleteInventory = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query
    const inventory = await Inventory.findByIdAndDelete(id)
    if (!inventory)
      return res.status(404).json({ error: 'Item nao encontrado' })

    res.status(200).json({
      success: 'Item deletado com sucesso',
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}
