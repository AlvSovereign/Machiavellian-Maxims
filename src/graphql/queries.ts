// tslint:disable
// this is an auto generated file. This will be overwritten

export const getMaxim = `query GetMaxim($id: ID!) {
  getMaxim(id: $id) {
    id
    name
    content
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
      name
      content
    }
    nextToken
  }
}
`;

export const _listMaxims = `query listMaxims {
		listMaxims {
			items {
				id
				name
				content
			}
		}
	}
`;
