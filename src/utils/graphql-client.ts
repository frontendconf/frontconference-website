import { GraphQLClient } from "graphql-request";

const { CONTENTFUL_SPACE, CONTENTFUL_ENVIRONMENT, CONTENTFUL_API_TOKEN } =
	import.meta.env;

export const client = new GraphQLClient(
	`https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE}/environments/${CONTENTFUL_ENVIRONMENT}?access_token=${CONTENTFUL_API_TOKEN}`,
);
