import { c as createAstro, a as createComponent, r as renderTemplate, b as addAttribute, d as renderHead, e as renderSlot, m as maybeRenderHead, f as renderComponent } from '../astro.82f3fdcf.mjs';
import 'html-escaper';
/* empty css                           *//* empty css                           */
const $$Astro$5 = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <meta name="generator"${addAttribute(Astro2.generator, "content")}>
    <title>${title}</title>
  ${renderHead($$result)}</head>
  <body>
    ${renderSlot($$result, $$slots["default"])}
  </body></html>`;
}, "/Users/christiansany/Development/freelance/frontconference/frontconference-website/src/layouts/Layout.astro");

const $$Astro$4 = createAstro();
const $$Card = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Card;
  const { href, title, body } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<li class="link-card astro-DOHJNAO5">
	<a${addAttribute(href, "href")} class="astro-DOHJNAO5">
		<h2 class="astro-DOHJNAO5">
			${title}
			<span class="astro-DOHJNAO5">&rarr;</span>
		</h2>
		<p class="astro-DOHJNAO5">
			${body}
		</p>
	</a>
</li>`;
}, "/Users/christiansany/Development/freelance/frontconference/frontconference-website/src/components/Card.astro");

const $$Astro$3 = createAstro();
const $$Index$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Index$1;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Welcome to Astro.", "class": "astro-J7PV25F6" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead($$result2)}<main class="astro-J7PV25F6">
    <a href="./speakers" class="astro-J7PV25F6">⭐️ Speakers</a>
    <h1 class="astro-J7PV25F6">Welcome to <span class="text-gradient astro-J7PV25F6">Astro</span></h1>
    <p class="instructions astro-J7PV25F6">
      To get started, open the directory <code class="astro-J7PV25F6">src/pages</code> in your project.<br class="astro-J7PV25F6">
      <strong class="astro-J7PV25F6">Code Challenge:</strong> Tweak the "Welcome to Astro" message above.
    </p>
    <ul role="list" class="link-card-grid astro-J7PV25F6">
      ${renderComponent($$result2, "Card", $$Card, { "href": "https://docs.astro.build/", "title": "Documentation", "body": "Learn how Astro works and explore the official API docs.", "class": "astro-J7PV25F6" })}
      ${renderComponent($$result2, "Card", $$Card, { "href": "https://astro.build/integrations/", "title": "Integrations", "body": "Supercharge your project with new frameworks and libraries.", "class": "astro-J7PV25F6" })}
      ${renderComponent($$result2, "Card", $$Card, { "href": "https://astro.build/themes/", "title": "Themes", "body": "Explore a galaxy of community-built starter themes.", "class": "astro-J7PV25F6" })}
      ${renderComponent($$result2, "Card", $$Card, { "href": "https://astro.build/chat/", "title": "Community", "body": "Come say hi to our amazing Discord community. \u2764\uFE0F", "class": "astro-J7PV25F6" })}
    </ul>
  </main>` })}`;
}, "/Users/christiansany/Development/freelance/frontconference/frontconference-website/src/pages/index.astro");

const $$file$3 = "/Users/christiansany/Development/freelance/frontconference/frontconference-website/src/pages/index.astro";
const $$url$3 = "";

const _page0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index$1,
  file: $$file$3,
  url: $$url$3
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$2 = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Index;
  const response = await fetch(
    "https://graphql.contentful.com/content/v1/spaces/j8md9ikrag2j?access_token=c0eae4b4c6ddb1acdef7590927e9c901eca36f51fffd93a540a13a756d3278a4",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
      query speakers($limit: Int = 200, $yearTag: String = "FRONT23") {
        tags: tagCollection(limit: 1, where: { title: $yearTag }) {
          items {
            linkedFrom {
              speakers: speakerCollection(limit: $limit) {
                items {
                  name
                  role
                  company
                  description
                  bio
                  slug
                  order
                  photo {
                    url(transform: { resizeStrategy: FILL })
                  }
                }
              }
            }
          }
        }
      }
      `
      })
    }
  );
  const json = await response.json();
  const speakers = json.data.tags.items[0].linkedFrom.speakers.items;
  speakers.sort((a, b) => {
    if (a.order > b.order)
      return 1;
    else if (a.order < b.order)
      return -1;
    if (a.name > b.name)
      return 1;
    else
      return -1;
  });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Speakers" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead($$result2)}<ul>
    ${speakers.map((speaker) => renderTemplate`<li>
          <a${addAttribute(`/speakers/${speaker.slug}`, "href")}>${speaker.name}</a>
        </li>`)}
  </ul>` })}`;
}, "/Users/christiansany/Development/freelance/frontconference/frontconference-website/src/pages/speakers/index.astro");

const $$file$2 = "/Users/christiansany/Development/freelance/frontconference/frontconference-website/src/pages/speakers/index.astro";
const $$url$2 = "/speakers";

const _page1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file$2,
  url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$1 = createAstro();
const $$speaker = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$speaker;
  const { speaker: speakerSlug } = Astro2.params;
  const response = await fetch(
    "https://graphql.contentful.com/content/v1/spaces/j8md9ikrag2j?access_token=c0eae4b4c6ddb1acdef7590927e9c901eca36f51fffd93a540a13a756d3278a4",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
      query GetSpeaker($slug: String!) {
        speakerCollection(limit: 1, where: {slug: $slug}) {
          items {
            name
            description
          }
        }
      }
      `,
        variables: {
          slug: speakerSlug
        }
      })
    }
  );
  const json = await response.json();
  const speaker = json.data.speakerCollection.items[0];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": speaker.name }, { "default": ($$result2) => renderTemplate`${maybeRenderHead($$result2)}<h1>${speaker.name}</h1><p>${speaker.description}</p>` })}`;
}, "/Users/christiansany/Development/freelance/frontconference/frontconference-website/src/pages/speakers/[speaker].astro");

const $$file$1 = "/Users/christiansany/Development/freelance/frontconference/frontconference-website/src/pages/speakers/[speaker].astro";
const $$url$1 = "/speakers/[speaker]";

const _page2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$speaker,
  file: $$file$1,
  url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro = createAstro();
const $$404 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$404;
  Astro2.response.status = 404;
  Astro2.response.statusText = "Not found";
  return renderTemplate`${maybeRenderHead($$result)}<h1>Not Found</h1>`;
}, "/Users/christiansany/Development/freelance/frontconference/frontconference-website/src/pages/404.astro");

const $$file = "/Users/christiansany/Development/freelance/frontconference/frontconference-website/src/pages/404.astro";
const $$url = "/404";

const _page3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { _page0 as _, _page1 as a, _page2 as b, _page3 as c };
