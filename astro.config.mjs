import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/edge";

// https://astro.build/config
export default defineConfig({
  output: "server",
  experimental: {
    assets: true,
  },
  adapter: vercel({
    imageService: true,
  }),
  // integrations: [react()],
  // server: {
  //   headers: {
  //     // Default cache-control for all pages
  //     // https://vercel.com/docs/concepts/functions/serverless-functions/edge-caching#recommended-cache-control
  //     "Cache-Control": "s-maxage=300, stale-while-revalidate",
  //   },
  // },
});
