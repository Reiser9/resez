/** @type {import('next').NextConfig} */
const { hostname } = require('os');
const path = require('path');
const { protocol } = require('socket.io-client');

const nextConfig = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8080',
            },
            {
                protocol: 'https',
                hostname: 'resez.ru',
            },
        ],
    },
};

module.exports = nextConfig;
