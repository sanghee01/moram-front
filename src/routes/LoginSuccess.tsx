import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userState } from "../state";
import { useEffect } from "react";

function LoginSuccess() {
  const location = useLocation();
  const getUser = new URLSearchParams(location.search).get("user");
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();
  useEffect(() => {
    if (getUser) {
      try {
        // 문자열을 객체로 변환
        const parsedUser = JSON.parse(getUser);
        // Recoil 상태 설정
        setUser(parsedUser);
        navigate("/");
      } catch (error) {
        console.error("사용자 정보 파싱 중 오류 발생:", error);
      }
    }
  }, [getUser]);

  return (
    <div>
      <h1>로그인 성공!</h1>
      <p>사용자 정보: {user}</p>
    </div>
  );
}

export default LoginSuccess;
