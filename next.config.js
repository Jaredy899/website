/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async redirects() {
    return [
      {
        source: '/mac',
        destination: process.env.REDIRECT_MAC,
        permanent: true,
      },
      {
        source: '/win',
        destination: process.env.REDIRECT_WIN,
        permanent: true,
      },
      {
        source: '/winps5',
        destination: process.env.REDIRECT_WIN,
        permanent: false,
      },
      {
        source: '/linux',
        destination: process.env.REDIRECT_LINUX,
        permanent: true,
      },
      {
        source: '/linuxdev',
        destination: process.env.REDIRECT_LINUX_DEV,
        permanent: true,
      },
      {
        source: '/debian',
        destination: process.env.REDIRECT_DEBIAN,
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
