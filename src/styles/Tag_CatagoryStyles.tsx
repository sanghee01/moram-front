import styled from "styled-components";

export const Tag = styled.div<any>`
  background-color: ${(props) => props.$background || "#ced3ff"};
  padding: 5px;
  border-radius: 5px;
  transition: 0.5s all;
  border: 0;
  white-space: nowrap;
  & * {
    color: ${(props) => props.$color || "black"};
  }
  & div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
  }
  &:hover {
    filter: contrast(130%);
    cursor: pointer;
  }

  @media screen and (max-width: 450px) {
    padding: 3px;
    font-size: 0.7rem;
  }
`;

export const Category = styled.div<any>`
  background-color: #7f8cff;
  color: white;
  padding: 5px 5px;
  border-radius: 5px;
  border: 0;
  transition: 0.5s all;
  &:hover {
    background-color: #606ffc;
  }
  @media screen and (max-width: 450px) {
    padding: 3px;
    font-size: 0.7rem;
  }
`;
