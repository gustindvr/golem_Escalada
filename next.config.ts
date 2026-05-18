import withPWA from "next-pwa";

const nextConfig = {
  reactStrictMode: true,
  reactCompiler: true,
  // tu otras configuraciones...
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development"
})(nextConfig);