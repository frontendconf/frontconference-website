import { defineConfig } from "astro/config";
import icon from "astro-icon";
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  adapter: node({
    mode: 'standalone',
  }),
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
