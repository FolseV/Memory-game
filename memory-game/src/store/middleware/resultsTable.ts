import { Middleware } from "redux";

export const resultsTable: Middleware = (store) => (next) => (action) => {
  const returnVal = next(action);
  let counter = 0;
  localStorage.setItem(counter++ + "", JSON.stringify(store.getState()));
  console.log(store.getState());
  return returnVal;
};
