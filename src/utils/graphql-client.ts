import { GraphQLClient } from "graphql-request";

export const client = new GraphQLClient(
  "https://graphql.contentful.com/content/v1/spaces/j8md9ikrag2j/environments/test?access_token=c0eae4b4c6ddb1acdef7590927e9c901eca36f51fffd93a540a13a756d3278a4"
);
