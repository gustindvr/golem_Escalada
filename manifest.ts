import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Golem Escalada",
    short_name: "Golem",
    description: "Gestión de pagos para gimnasio de escalada",
    start_url: "/",
    display: "standalone",
    background_color: "#aaa7a7",
    theme_color: "#000000",
    icons: [
      { src: "/Logo.png", sizes: "192x192", type: "image/png" },
    ],
  };
}
