import React from "react";
import { NavLink, Link } from "react-router-dom";
import styled from "@emotion/styled";
import { Container } from "./primitives";
import Masthead from "./Masthead";

const HeaderStyled = styled.header`
  position: relative;

  .bg {
    position: absolute;
    height: 100%;
    width: 100%;
    background: linear-gradient(22deg, pink, orange);
    transform: skewY(-4deg);
    transform-origin: 0;
  }
  .fg {
    position: relative;
  }
  nav ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
  nav {
    padding: 2rem 0;
  }
  a {
    font-weight: bold;
    text-decoration: none;
  }
`;

export default function Header() {
  return (
    <HeaderStyled>
      <div className="bg" aria-hidden={true}></div>
      <div className="fg">
        <Container>
          <nav>
            <Link to="/">Playout</Link>
            <ul>
              <li>
                <NavLink exact to="/content-types">
                  Content Types
                </NavLink>
              </li>
              <li>
                <NavLink exact to="/content-types/new">
                  New Content Type
                </NavLink>
              </li>
            </ul>
          </nav>
        </Container>
        <Masthead />
      </div>
    </HeaderStyled>
  );
}
