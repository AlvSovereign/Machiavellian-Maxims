// tslint:disable
// this is an auto generated file. This will be overwritten

export const getRandomMaxim = `query GetRandomMaxim($index: String!) {
  getRandomMaxim(index: $index) {
    id
    index
    name
    maxim
  }
}
`;
export const getMaxim = `query GetMaxim($id: ID!) {
  getMaxim(id: $id) {
    id
    index
    name
    maxim
  }
}
`;
export const listMaxims = `query ListMaxims(
  $filter: ModelMaximFilterInput
  $limit: Int
  $nextToken: String
) {
  listMaxims(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      index
      name
      maxim
    }
    nextToken
  }
}
`;
