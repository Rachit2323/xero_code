import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";

import { Auth0Provider } from "@auth0/auth0-react";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));

// 
root.render(
  // <Auth0Provider
  //   domain="dev-2nah2t74zk4lhs11.au.auth0.com"
  //   clientId="yah3UllYh6BTdAfNv4Zt9xJauA3j5F7Q"
  //   authorizationParams={{
  //     redirect_uri: window.location.origin,
  //   }}
  //   scope="openid profile email"
  // >
  <GoogleOAuthProvider
    clientId={`647769021135-huphnbtb2703f7c6pe39b7k1m0q0thln.apps.googleusercontent.com`}
  >
    <Provider store={store}>
      <App />
    </Provider>
  </GoogleOAuthProvider>
  // </Auth0Provider>
);
