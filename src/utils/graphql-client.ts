import { GraphQLClient } from "graphql-request";

const spaceId = import.meta.env.CONTENTFUL_SPACE_ID;
const environment = import.meta.env.CONTENTFUL_ENVIRONMENT;
const token = import.meta.env.CONTENTFUL_ACCESS_TOKEN;

export const client = new GraphQLClient(
	`https://graphql.contentful.com/content/v1/spaces/${spaceId}/environments/${environment}?access_token=${token}`,
);
