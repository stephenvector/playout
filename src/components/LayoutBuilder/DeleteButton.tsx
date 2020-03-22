import React from "react";
import styled from "@emotion/styled";

const DeleteButtonStyled = styled.button`
  color: red;
  background: transparent;
  border: none;
  font: inherit;
  font-weight: bold;
  display: inline-block;
  line-height: 2rem;
  cursor: pointer;
`;

export default function DeleteButton(props: any) {
  return <DeleteButtonStyled {...props}>{`delete`}</DeleteButtonStyled>;
}
