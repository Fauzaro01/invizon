/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
        new URL('https://res.cloudinary.com/dtzcamtgb/**'),
        new URL('https://cdn3d.iconscout.com/**'),
        new URL('https://lh3.googleusercontent.com/a/**')
    ],
  },
};

export default nextConfig;
