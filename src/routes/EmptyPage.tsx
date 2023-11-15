import styled from "styled-components";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function EmptyPage({ needLogin, wrongAccess }: any) {
  return (
    <>
      <Container>
        <Img src="/assets/profileselectimage/pink.jpg" />
        {needLogin && <div>로그인이 필요하거나, 잘못된 접근입니다.</div>}
        {wrongAccess && <div>잘못된 접근이거나 없는 페이지입니다.</div>}
        {!needLogin && !wrongAccess && <div>없는 페이지입니다.</div>}
        <HomeBtn>
          <Link to="/">홈으로</Link>
        </HomeBtn>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  height: calc(100dvh - (var(--headerHeight) + var(--footerHeight)));
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  font-size: 2rem;
  font-weight: bolder;
  gap: 15px;
  & div {
    color: tomato;
  }
`;

const Img = styled.img`
  width: 80%;
  max-width: 400px;
  height: auto;
  border-radius: 560px;
`;

const HomeBtn = styled.button`
  width: 200px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  border: 0px;
  background-color: #e2e2e2;
  font-size: 1.5rem;
`;

export default EmptyPage;
