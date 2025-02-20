export const PremiseActionTypes = {
  GET_PREMISES_BEGINS: "GET_PREMISES_BEGINS",
  GET_PREMISES_SUCCESS: "GET_PREMISES_SUCCESS",
  GET_PREMISES_FAILURE: "GET_PREMISES_FAILURE",

  GET_PREMISE_BEGINS: "GET_PREMISE_BEGINS",
  GET_PREMISE_SUCCESS: "GET_PREMISE_SUCCESS",
  GET_PREMISE_FAILURE: "GET_PREMISE_FAILURE",

  GET_BUILDING_BEGINS: "GET_BUILDING_BEGINS",
  GET_BUILDING_SUCCESS: "GET_BUILDING_SUCCESS",
  GET_BUILDING_FAILURE: "GET_BUILDING_FAILURE",

  UPDATE_PREMISE_BEGINS: "UPDATE_PREMISE_BEGINS",
  UPDATE_PREMISE_SUCCESS: "UPDATE_PREMISE_SUCCESS",
  UPDATE_PREMISE_FAILURE: "UPDATE_PREMISE_FAILURE",

  DELETE_PREMISE_BEGINS: "DELETE_PREMISE_BEGINS",
  DELETE_PREMISE_SUCCESS: "DELETE_PREMISE_SUCCESS",
  DELETE_PREMISE_FAILURE: "DELETE_PREMISE_FAILURE",

  CREATE_PREMISE_BEGINS: "CREATE_PREMISE_BEGINS",
  CREATE_PREMISE_SUCCESS: "CREATE_PREMISE_SUCCESS",
  CREATE_PREMISE_FAILURE: "CREATE_PREMISE_FAILURE",
} as const;

export type PremiseActionType =
  (typeof PremiseActionTypes)[keyof typeof PremiseActionTypes];
