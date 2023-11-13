import styled from "styled-components";
import { useEffect } from "react";

function EmptyPage({ needLogin, wrongAccess }: any) {
  return (
    <>
      <Container>
        {needLogin && <div>로그인이 필요하거나, 잘못된 접근입니다.</div>}
        {wrongAccess && <div>잘못된 접근이거나 없는 페이지입니다.</div>}
        {!needLogin && !wrongAccess && <div>없는 페이지입니다.</div>}
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  height: calc(100dvh - (var(--headerHeight) + var(--footerHeight)));
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bolder;
  color: tomato;
`;

export default EmptyPage;
