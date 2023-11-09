/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["localhost", "api.ricogann.com"],
        unoptimized: true,
    },
    reactStrictMode: true,
    output: "export",
    trailingSlash: true,
};

module.exports = nextConfig;
