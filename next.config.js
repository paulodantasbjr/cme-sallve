/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
  env: {
    BASE_URL: 'http://localhost:3000',
    // BASE_URL: 'https://cme-salve.vercel.app/',
    MONGO_URL:
      'mongodb+srv://admin:admin@db-cme.9ioe3.mongodb.net/db-cme?retryWrites=true&w=majority',
    ACCESS_TOKEN_SECRET: 'token_secret',
    REFRESH_TOKEN_SECRET: 'refresh_token_secret',
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ]
  },
}
