import { Middleware } from "redux";

export const resultsTable: Middleware = (store) => (next) => (action) => {
  const returnVal = next(action);
  // localStorage.setItem("test", JSON.stringify(store.getState()));
  // const existingValuesStr = localStorage.getItem("test");
  // if (existingValuesStr) {
  //   existingValues.push(JSON.parse(existingValuesStr));
  //   localStorage.setItem("leaderBoard", JSON.stringify(existingValues));

  //   console.log(existingValues);
  // }

  return returnVal;
};
