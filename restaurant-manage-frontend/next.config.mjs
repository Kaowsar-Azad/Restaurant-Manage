const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://restaurant-manage-43zz.vercel.app/api/:path*",
      },
    ];
  },
};

export default nextConfig;
