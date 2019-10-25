import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/App";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { DefaultTheme } from "styled-components";
import { PrefabThemeProvider, defaultPrefabTheme } from "@stephenvector/prefab";

import "./index.css";

firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
});

const playoutTheme = defaultPrefabTheme;

playoutTheme.colors.bg = "#f2f2f2";

function Root() {
  return (
    <PrefabThemeProvider includeGlobals theme={playoutTheme}>
      <Router>
        <App />
      </Router>
    </PrefabThemeProvider>
  );
}

ReactDOM.render(<Root />, document.getElementById("root"));
