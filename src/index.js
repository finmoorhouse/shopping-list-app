import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import "./styles/styles.scss";
import AppRouter, { history } from "./routers/AppRouter";
import { Provider } from "react-redux";
import { startSetItems } from "./store/actions";
import configureStore from "./store/configureStore";

const store = configureStore();
const state = store.getState();
console.log("Process: ",process.env)
const renderApp = () => {
  ReactDOM.render(
    <Provider store={store}>
      <AppRouter />
    </Provider>,
    document.getElementById("root")
  );
};

if (state.currentId) {
  store.dispatch(startSetItems(state.currentId)).then(() => {
    renderApp();
    if (history.location.pathname === "/") {
      history.push("/add");
    }
  });
} else {
  renderApp();
  history.push("/");
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
