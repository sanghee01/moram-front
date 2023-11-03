import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { idsState, postingState } from "../state";

function CategoryBtn({ category, marginL, marginR }: any) {
  const navigate = useNavigate();
  const setPostings = useSetRecoilState(postingState);
  const setIds = useSetRecoilState(idsState);
  return (
    <Btn
      $marginL={marginL}
      $marginR={marginR}
      onClick={() => {
        setPostings("");
        setIds([99999, 0]);
        navigate(`/community?category=${category}`);
      }}
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
