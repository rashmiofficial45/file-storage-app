/** @type {import('next').NextConfig} */
import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

const nextConfig = {
    images:{
        remotePatterns:[
            {
                hostname: 'notable-kiwi-908.convex.cloud',
            }
        ]
    }
};

if (process.env.NODE_ENV === 'development') {
    await setupDevPlatform();
  }
export default nextConfig;
