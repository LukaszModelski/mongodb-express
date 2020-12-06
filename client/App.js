
import React from 'react';
import { MainView } from "./src/components/mainView/MainView";
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux'
import { reducers } from "./src/store/reducers";

const store = createStore(
  reducers,
  compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
)

export default function App() {

  return (
    <Provider store={store}>
      <MainView />
    </Provider>
  );
}
