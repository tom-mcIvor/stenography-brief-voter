/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Exclude database drivers from client-side bundle
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        oracledb: false,
        'pg-query-stream': false,
        pg: false,
        'pg-native': false,
        mysql: false,
        mysql2: false,
        sqlite3: false,
        'better-sqlite3': false,
      }
    }
    return config
  },
}

module.exports = nextConfig
