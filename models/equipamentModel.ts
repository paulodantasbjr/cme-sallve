import { Schema, model, models } from 'mongoose'

import { EquipamentProps } from '../src/types/Equipament'

const EquipamentSchema = new Schema<EquipamentProps>(
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

const equipamentModel =
  models.equipament || model<EquipamentProps>('equipament', EquipamentSchema)

export const Equipament = equipamentModel
