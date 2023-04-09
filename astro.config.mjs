import { defineConfig } from "astro/config";
// import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel(),
  // integrations: [react()],
  server: {
    headers: {
      // Default cache-control for all pages
      // https://vercel.com/docs/concepts/functions/serverless-functions/edge-caching#recommended-cache-control
      "Cache-Control": "s-maxage=300, stale-while-revalidate",
    },
  },
});
