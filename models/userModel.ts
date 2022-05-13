import { Schema, model, models } from 'mongoose'

import { UserProps } from '../src/types/User'

const userSchema = new Schema<UserProps>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    root: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: 'user',
    },
    avatar: {
      type: String,
      default:
        'https://res.cloudinary.com/jrw0w/image/upload/v1648834448/ecommerce/default-user-image_soucpq.png',
    },
  },
  {
    timestamps: true,
  }
)

const userModel = models.user || model<UserProps>('user', userSchema)

export const User = userModel
