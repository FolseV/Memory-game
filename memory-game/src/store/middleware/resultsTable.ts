import { Middleware } from "redux";

export const resultsTable: Middleware = (store) => (next) => (action) => {
  const returnVal = next(action);
  localStorage.setItem("results", JSON.stringify(store.getState()));
  return returnVal;
};
