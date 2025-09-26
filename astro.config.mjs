import { defineConfig } from "astro/config";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
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
