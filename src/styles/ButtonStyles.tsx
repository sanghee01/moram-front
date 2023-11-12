import styled from "styled-components";

export const SmallBtn = styled.button<any>`
  transition: 0.5s all;
  width: ${(props) => props.$width || "auto"} !important;
  height: ${(props) => props.$height || "auto"} !important;
  background-color: ${(props) => props.$background || "white"} !important;
  padding: ${(props) => props.$padding || "10px 20px"} !important;
  margin: ${(props) => props.$margin || "0"} !important;
  color: ${(props) => props.$color || "black"} !important;
  border-radius: 15px;
  font-weight: 500;
  border: 0;

  &:hover {
    cursor: pointer;
    background-color: ${(props) =>
      props.$backgroundHover || "#d6d6ff"} !important;
  }
`;
