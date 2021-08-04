import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import configureStore, { persistor } from "./store";
import "./index.css";
import { ModalProvider } from "./context/Modal";
import Footer from "./components/Footer";

export const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
      <PersistGate loading={null} persistor={persistor}>
        <ReduxProvider store={store}>
          <BrowserRouter>
            <App />
            {/* <Footer /> */}
          </BrowserRouter>
        </ReduxProvider>
      </PersistGate>
  </React.StrictMode>,
  document.getElementById('root')
);
