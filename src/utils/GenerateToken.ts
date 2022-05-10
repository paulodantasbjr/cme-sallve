import { sign } from 'jsonwebtoken'

export const createAccessToken = (userId: string | object | Buffer) => {
  return sign(userId, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '15m' })
}

export const createRefreshToken = (userId: string | object | Buffer) => {
  return sign(userId, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '7d' })
}
