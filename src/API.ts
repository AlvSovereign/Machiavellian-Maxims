/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type CreateMaximInput = {
  id?: string | null,
  name: string,
  maxim?: string | null,
};

export type UpdateMaximInput = {
  id: string,
  name?: string | null,
  maxim?: string | null,
};

export type DeleteMaximInput = {
  id?: string | null,
};

export type ModelMaximFilterInput = {
  id?: ModelIDFilterInput | null,
  name?: ModelStringFilterInput | null,
  maxim?: ModelStringFilterInput | null,
  and?: Array< ModelMaximFilterInput | null > | null,
  or?: Array< ModelMaximFilterInput | null > | null,
  not?: ModelMaximFilterInput | null,
};

export type ModelIDFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelStringFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type BatchAddMaximsMutationVariables = {
  maxims?: Array< CreateMaximInput | null > | null,
};

export type BatchAddMaximsMutation = {
  batchAddMaxims:  Array< {
    __typename: "Maxim",
    id: string,
    name: string,
    maxim: string,
  } | null > | null,
};

export type CreateMaximMutationVariables = {
  input: CreateMaximInput,
};

export type CreateMaximMutation = {
  createMaxim:  {
    __typename: "Maxim",
    id: string,
    name: string,
    maxim: string,
  } | null,
};

export type UpdateMaximMutationVariables = {
  input: UpdateMaximInput,
};

export type UpdateMaximMutation = {
  updateMaxim:  {
    __typename: "Maxim",
    id: string,
    name: string,
    maxim: string,
  } | null,
};

export type DeleteMaximMutationVariables = {
  input: DeleteMaximInput,
};

export type DeleteMaximMutation = {
  deleteMaxim:  {
    __typename: "Maxim",
    id: string,
    name: string,
    maxim: string,
  } | null,
};

export type GetMaximQueryVariables = {
  id: string,
};

export type GetMaximQuery = {
  getMaxim:  {
    __typename: "Maxim",
    id: string,
    name: string,
    maxim: string,
  } | null,
};

export type ListMaximsQueryVariables = {
  filter?: ModelMaximFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMaximsQuery = {
  listMaxims:  {
    __typename: "ModelMaximConnection",
    items:  Array< {
      __typename: "Maxim",
      id: string,
      name: string,
      maxim: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateMaximSubscription = {
  onCreateMaxim:  {
    __typename: "Maxim",
    id: string,
    name: string,
    maxim: string,
  } | null,
};

export type OnUpdateMaximSubscription = {
  onUpdateMaxim:  {
    __typename: "Maxim",
    id: string,
    name: string,
    maxim: string,
  } | null,
};

export type OnDeleteMaximSubscription = {
  onDeleteMaxim:  {
    __typename: "Maxim",
    id: string,
    name: string,
    maxim: string,
  } | null,
};
