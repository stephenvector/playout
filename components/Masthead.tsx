import React from "react";
import styled from "@emotion/styled";
import { Container } from "./primitives";

const MastheadStyled = styled.div`
  padding: 6rem 0 12rem 0;
  font-size: 6rem;
  line-height: 1;
  font-weight: bold;
  background: transparent;
  color: rgba(0, 0, 0, 1);
`;

export default function Masthead() {
  return (
    <MastheadStyled>
      <Container className="animated fadeIn"></Container>
    </MastheadStyled>
  );
}
