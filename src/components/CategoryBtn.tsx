import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function CategoryBtn({ category, marginL, marginR }: any) {
  const navigate = useNavigate();
  return (
    <Btn
      $marginL={marginL}
      $marginR={marginR}
      onClick={() => navigate(`/community?category=${category}`)}
    >
      {category}
    </Btn>
  );
}

const Btn = styled.button<any>`
  background-color: #eee6f8;
  padding: 2px 5px;
  border-radius: 5px;
  border: 0;
  margin-left: ${(props) => `${props.$marginL}px`};
  margin-right: ${(props) => `${props.$marginR}px`};
  transition: 0.5s all;

  &:hover {
    background-color: #dcc0ff;
  }
`;

export default CategoryBtn;
