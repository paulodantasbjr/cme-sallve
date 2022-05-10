import { connect, connections } from 'mongoose'

export const connectDB = () => {
  if (connections[0].readyState) return

  connect(
    process.env.MONGO_URL!,
    {
      appName: 'cme-app',
    },
    (err) => {
      if (err) throw err
      console.log('Conectado ao MongoDB')
    }
  )
}
