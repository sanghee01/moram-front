import GlobalStyles from "./styles/GlobalStyles";
import AppRouter from "./Router";
import { useEffect } from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { userState } from "./state";

function App() {
  const setUser = useSetRecoilState(userState); //유저 설정

  useEffect(() => {
    getUser();
  }, []);

  /**새로고침시에도 세션을 이용하여 유저 이메일, 닉네임 정보 받는 함수*/
  const getUser = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_APIADDRESS}/user/check`
      );
      setUser(response.data.content);
      console.log("user check : ", response.data.content);
    } catch (error: any) {
      console.error(error?.response?.data?.message || "알 수 없는 에러 발생.");
    }
  };
  return (
    <>
      <GlobalStyles />
      <AppRouter />
    </>
  );
}

export default App;
