import React from "react";
import Link from "next/link";
import { useAuth, signOut } from "../contexts/auth";
import { styled } from "../style";

import RelationshipIcon from "./icons/RelationshipIcon";

const HeaderStyled = styled("header")`
  padding: 1rem;
  color: ${p => p.theme.colors.accent};
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid ${p => p.theme.colors.accent};
  .logo {
    font-size: 150%;
  }
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    display: flex;
  }
  li {
    display: block;
    margin-right: 1rem;
  }
`;

export default function Header() {
  const [authState, dispatch] = useAuth();
  return (
    <HeaderStyled>
      <RelationshipIcon />
      <Link href="/">
        <a className="logo">Playout</a>
      </Link>
      <ul>
        <li>
          <Link href="/content-types">
            <a>Content Types</a>
          </Link>
        </li>
        <li>
          <Link href="/users">
            <a>Users</a>
          </Link>
        </li>
        {authState.loggedIn && (
          <li>
            <button
              type="button"
              onClick={() => {
                signOut(dispatch);
              }}
            >
              Sign Out
            </button>
          </li>
        )}

        {!authState.loggedIn && (
          <>
            <li>
              <Link href="/signup">
                <a>Sign Up</a>
              </Link>
            </li>
            <li>
              <Link href="/signin">
                <a>Sign In</a>
              </Link>
            </li>
          </>
        )}
      </ul>
    </HeaderStyled>
  );
}
