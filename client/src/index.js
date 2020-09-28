import React from "react";
import ReactDOM from "react-dom";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { TaskReducer } from "./imports";
import App from "./App";

const rootReducer = (state = {}, action) => {
  return {
    tasks: TaskReducer(state.tasks, action),
    isLoading: state.isLoading
  };
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
