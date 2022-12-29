/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // "presets": ["next/babel"]
}


module.exports = {
  nextConfig,
  env:{
    servidor: 'http://localhost:3001/api'
  }

  
}