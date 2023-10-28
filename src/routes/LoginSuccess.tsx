import { useLocation, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../state";
import { useEffect } from "react";

/**카카오로그인시 redirect 받는 컴포넌트 */
function LoginSuccess() {
  const location = useLocation();
  const getUser = new URLSearchParams(location.search).get("user");
  const setUser = useSetRecoilState(userState);
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
  }, []);

  return (
    <div>
      <h1>로그인 성공!</h1>
    </div>
  );
}

export default LoginSuccess;
