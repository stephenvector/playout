import styled from "@emotion/styled";

export const Container = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
`;

export const Button = styled.button`
  background: rgb(66, 100, 251);
  background: #48dd8f;
  color: #fff;
  font-family: inherit;
  font-size: inherit;
  line-height: 3rem;
  height: 3rem;
  display: inline-block;
  padding: 0 1.5rem;
  border-radius: 1.5rem;
  border: none;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
`;

export const Input = styled.input`
  background: #fff;
  border: none;
  font: inherit;
  line-height: 3rem;
  height: 3rem;
  border-radius: 3px;
  display: block;
  width: 100%;
  padding: 0 0.75rem;
  &:focus {
    box-shadow: 0 0 0 2px #48dd8f;
  }
`;

export const FormControlWrapper = styled.div`
  margin-bottom: 2rem;
`;

export const LargeText = styled.div`
  font-weight: bold;
  font-size: 3rem;
  color: #000;
  line-height: 1;
  margin: 0 0 2rem 0;
`;
