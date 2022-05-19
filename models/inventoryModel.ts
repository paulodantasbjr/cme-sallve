import { Schema, model, models } from 'mongoose'

import { InventoryProps } from '../src/types/Inventory'

const InventorySchema = new Schema<InventoryProps>(
  {
    ns: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    local: {
      type: String,
      required: true,
    },
    obs: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
)

const inventoryModel =
  models.inventory || model<InventoryProps>('inventory', InventorySchema)

export const Inventory = inventoryModel
