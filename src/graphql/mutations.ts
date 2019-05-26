// tslint:disable
// this is an auto generated file. This will be overwritten

export const batchAddMaxims = `mutation BatchAddMaxims($maxims: [CreateMaximInput]) {
  batchAddMaxims(maxims: $maxims) {
    id
    name
    maxim
  }
}
`;
export const createMaxim = `mutation CreateMaxim($input: CreateMaximInput!) {
  createMaxim(input: $input) {
    id
    name
    maxim
  }
}
`;
export const updateMaxim = `mutation UpdateMaxim($input: UpdateMaximInput!) {
  updateMaxim(input: $input) {
    id
    name
    maxim
  }
}
`;
export const deleteMaxim = `mutation DeleteMaxim($input: DeleteMaximInput!) {
  deleteMaxim(input: $input) {
    id
    name
    maxim
  }
}
`;
