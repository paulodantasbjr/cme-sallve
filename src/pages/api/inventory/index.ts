import { NextApiRequest, NextApiResponse } from 'next'

import { connectDB } from '../../../utils/DB'
import { Inventory } from '../../../../models/inventoryModel'

connectDB()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      await getInventory(res)
      break
    case 'POST':
      await createInventory(req, res)
      break
    default:
      break
  }
}

const getInventory = async (res: NextApiResponse) => {
  try {
    const inventory = await Inventory.find().sort({ updatedAt: -1 })
    res.status(200).json({
      total: inventory.length,
      inventory,
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

const createInventory = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { ns, type, model, brand, status, local, obs } = req.body

    const verifyNS = await Inventory.findOne({ ns })
    if (verifyNS) return res.status(400).json({ error: 'NS já cadastrada' })

    const newInventory = new Inventory({
      ns: ns.toUpperCase(),
      type: type.toUpperCase(),
      model: model.toUpperCase(),
      brand: brand.toUpperCase(),
      status: status.toUpperCase(),
      local: local.toUpperCase(),
      obs,
    })

    await newInventory.save()

    res.json({ success: 'Novo item criado' })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}
