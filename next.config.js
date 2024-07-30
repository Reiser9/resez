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
        domains: ['resez.ru'],
        unoptimized: true,
    },
};

module.exports = nextConfig;
