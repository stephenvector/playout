import React from "react";
import App from "next/app";
import Link from "next/link";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

class PlayoutApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <DndProvider backend={HTML5Backend}>
        <Link href="/">
          <a>Playout</a>
        </Link>
        <ul>
          <li>
            <Link href="/content-types">
              <a>Content Types</a>
            </Link>
          </li>
        </ul>
        <Component {...pageProps} />
      </DndProvider>
    );
  }
}

export default PlayoutApp;
