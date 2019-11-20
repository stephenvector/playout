import React from "react";
import Link from "next/link";
import App from "next/app";
import {
  Container,
  Row,
  Column,
  PrefabThemeProvider,
  defaultPrefabTheme
} from "@stephenvector/prefab";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

class PlayoutApp extends App {
  componentDidMount() {
    console.log(process.env);
    firebase.initializeApp({
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.FIREBASE_DATABASE_URL,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID
    });
  }
  render() {
    const { Component, pageProps } = this.props;
    return (
      <PrefabThemeProvider includeGlobals theme={defaultPrefabTheme}>
        <header>
          <Container>
            <Row>
              <Column>
                <h1>Playout</h1>
                <ul>
                  <li>
                    <Link href="/content-types">
                      <a>Content Types</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/content-types/new">
                      <a>New Content Type</a>
                    </Link>
                  </li>
                </ul>
              </Column>
            </Row>
          </Container>
        </header>
        <section>
          <Container>
            <Row>
              <Column>
                <Component {...pageProps} />
              </Column>
            </Row>
          </Container>
        </section>
      </PrefabThemeProvider>
    );
  }
}

export default PlayoutApp;
