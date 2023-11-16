import { useLocation, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { idsState, postingState } from "../state";

function CategoryBtn({ category, tag, marginL, marginR }: any) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Btn
      $marginL={marginL}
      $marginR={marginR}
      onClick={() => {
        //   if (location.pathname !== "/community") {
        //     // setPostings("");
        //     // setIds([99999, 0]);
        //   }
        navigate(
          `/community?category=${category}&tag=${tag || ""}&reload=true`
        );
      }}
    >
      {category}
    </Btn>
  );
}

const Btn = styled.button<any>`
  background-color: #7f8cff;
  color: white;
  padding: 5px 5px;
  border-radius: 5px;
  border: 0;
  margin-left: ${(props) => `${props.$marginL}px`};
  margin-right: ${(props) => `${props.$marginR}px`};
  transition: 0.5s all;
  white-space: nowrap;
  &:hover {
    background-color: #606ffc;
  }
`;

export default CategoryBtn;
