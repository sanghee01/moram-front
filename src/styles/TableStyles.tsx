import styled from "styled-components";

export const Title = styled.h2`
  margin-bottom: 20px;
`;

export const Table = styled.table`
  margin: auto;
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;

  & td,
  th {
    padding: 6px 15px;
    border: 1px solid black;
  }

  & th {
    background: #42444e;
    color: #fff;
  }
  & tr:first-child th:first-child {
    border-top-left-radius: 6px;
  }
  & tr:first-child th:last-child {
    border-top-right-radius: 6px;
  }
  & td {
    border-right: 1px solid #c6c9cc;
    border-bottom: 1px solid #c6c9cc;
  }
  & td:first-child {
    border-left: 1px solid #c6c9cc;
  }
  & tr:nth-child(even) td {
    background: #eaeaed;
  }
  & tr:last-child td:first-child {
    border-bottom-left-radius: 6px;
  }
  & tr:last-child td:last-child {
    border-bottom-right-radius: 6px;
  }
`;
export const Row = styled.tr`
  text-align: center;
`;
