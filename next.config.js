/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASEPATH : "",
  // images: {
  //   loader: 'akamai',
  //   path: process.env.NEXT_PUBLIC_URL,
  // },
  images: {
    domains: ['limitless-escarpment-05345-1ca012576c29.herokuapp.com', 'localhost'],
  }
}

module.exports = nextConfig

