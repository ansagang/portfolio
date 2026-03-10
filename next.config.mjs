/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    experimental: {
        proxyClientMaxBodySize: '30mb'
    }
};

export default nextConfig;
