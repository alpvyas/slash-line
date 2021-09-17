import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import App from "./App";
import configureStore from "./store";
import "./index.css";

export const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
        <ReduxProvider store={store}>
          <BrowserRouter>
            <App />
            {/* <Footer /> */}
          </BrowserRouter>
        </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
