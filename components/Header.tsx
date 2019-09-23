import React from "react";
import Link from "next/link";
import { useAuth, signOut } from "../contexts/auth"
import { styled } from "../style";

const HeaderStyled = styled("header")`
  padding: 1rem;
  background: ${p => p.theme.colors.accent};
  color: ${p => p.theme.colors.background};
  font-weight: bold;
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
`;

export default function Header() {
  const [ authState, dispatch ] = useAuth();
  return (
    <HeaderStyled>
      <Link href="/">
        <a>Playout</a>
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
            <button type="button" onClick={() => {
              signOut(dispatch)
            }}>Sign Out</button>
          </li>
        )}

        {!authState.loggedIn && (
          <>
            <li>
              <Link href="/signup"><a>Sign Up</a></Link>
            </li>
            <li>
              <Link href="/signin"><a>Sign In</a></Link>
            </li>
          </>
        )}
      </ul>
    </HeaderStyled>
  );
}
