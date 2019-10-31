import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Container } from "./primitives";
import { useContentTypes } from "../hooks";

export default function Header() {
  const { contentTypes } = useContentTypes();
  return (
    <header className="Header">
      <Container>
        <nav>
          <Link to="/">Playout</Link>
          {contentTypes !== undefined &&
            Object.keys(contentTypes).map(contentTypeId => (
              <NavLink key={contentTypeId} exact to={`/posts/${contentTypeId}`}>
                {contentTypes[contentTypeId].name}
              </NavLink>
            ))}

          <NavLink exact to="/media">
            Media
          </NavLink>

          <NavLink exact to="/content-types">
            Content Types
          </NavLink>
        </nav>
      </Container>
    </header>
  );
}
