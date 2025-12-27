import React from "react";
import { createStore, compose } from "redux";
import { Provider } from "react-redux";
import { Navigation } from "./src/Navigation";
import { reducers } from "./src/store/reducers";

const store = createStore(
  reducers,
  compose(
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
