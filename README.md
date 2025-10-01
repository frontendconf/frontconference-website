# Frontconference Website

## Project Structure

Astro looks for `.astro`, `.md`, or `.js` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components or layouts.

Any static assets, like images, can be placed in the `public/` directory.

## Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                             |
| :--------------------- | :------------------------------------------------- |
| `npm install`          | Installs dependencies                              |
| `npm run dev`          | Starts local dev server at `localhost:3000`        |
| `npm run build`        | Build your production site to `./dist/`            |
| `npm run preview`      | Preview your build locally, before deploying       |
| `npm run start`        | Starts a production dev server at `localhost:3000` |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro preview` |
| `npm run astro --help` | Get help using the Astro CLI                       |

## Environment

See `.env.template` for required environment variables. Locally, creating a `.env` file is probably the easiest way to provide them to the app.

## GraphQL

You can generate the GraphQL Schema and Types by running the following command:

```bash
npx gql.tada generate-schema https://graphql.contentful.com/content/v1/spaces/{SPACE}/environments/master\?access_token\={CDA_TOKEN}
```

The `SPACE` and `CDA_TOKEN` can be found in the Contentful settings. 
