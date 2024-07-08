import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  adapter: vercel(),
  integrations: [icon({
    iconDir: "src/assets/icons",
    svgoOptions: {
      plugins: [
        {
          name: "preset-default",
            params: {
                overrides: {
                  convertColors: {
                    currentColor: true
                  },
                },
            },
        }
      ],
    }
  }),]
});
