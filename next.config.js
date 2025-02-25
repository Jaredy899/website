/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/mac',
        destination: 'https://raw.githubusercontent.com/Jaredy899/mac/main/setup.sh',
        permanent: true,
      },
      {
        source: '/win',
        destination: 'https://raw.githubusercontent.com/Jaredy899/win/main/first-setup.ps1',
        permanent: true,
      },
      {
        source: '/linux',
        destination: 'https://raw.githubusercontent.com/Jaredy899/linux/refs/heads/main/linux.sh',
        permanent: true,
      },
      {
        source: '/linuxdev',
        destination: 'https://raw.githubusercontent.com/Jaredy899/linux/refs/heads/dev/linux.sh',
        permanent: true,
      },
      {
        source: '/debian',
        destination: 'https://raw.githubusercontent.com/Jaredy899/linux/refs/heads/main/config_changes/preseed.cfg',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig; 