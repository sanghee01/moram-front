import styled from "styled-components";

export const SmallBtn = styled.button<any>`
  transition: 0.5s all;
  width: ${(props) => props.$width || "auto"};
  height: ${(props) => props.$height || "auto"};
  background-color: ${(props) => props.$background || "white"};
  padding: ${(props) => props.$padding || "10px 20px"};
  margin: ${(props) => props.$margin || "0"};
  color: ${(props) => props.$color || "black"};
  border-radius: 15px;
  font-weight: 500;
  border: 0;

  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.$backgroundHover || "#d6d6ff"};
  }
`;
