import React from "react";
import App from "next/app";
import Link from "next/link";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { Global, css } from "@emotion/core";
import { ThemeProvider } from "emotion-theming";
import styled from "@emotion/styled";
import { EmotionTheme } from "../@types";
import { AuthProvider } from "../contexts/auth";
import Header from "../components/Header";

const theme: EmotionTheme = {
  colors: {
    background: "#f3f3f3",
    foreground: "#333",
    accent: "#45e"
  }
};

const Footer = styled("footer")`
  padding: 3rem 1rem;
  background: ${theme.colors.accent};
  color: ${theme.colors.background};
  font-weight: bold;
`;

class PlayoutApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <AuthProvider>
        <DndProvider backend={HTML5Backend}>
          <ThemeProvider theme={theme}>
            <Global<EmotionTheme>
              styles={theme => css`
                *,
                *:before,
                *:after {
                  box-sizing: inherit;
                }
                html {
                  box-sizing: border-box;
                }
                body {
                  margin: 0;
                  padding: 0;
                  font-family: sans-serif;
                  background: ${theme.colors.background};
                  color: ${theme.colors.foreground};
                }
                a {
                  color: inherit;
                  text-decoration: none;
                }
              `}
            />
            <Header />
            <section>
              <Component {...pageProps} />
            </section>
            <Footer>Footer</Footer>
          </ThemeProvider>
        </DndProvider>
      </AuthProvider>
    );
  }
}

export default PlayoutApp;
