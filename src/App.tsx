import GlobalStyles from "./styles/GlobalStyles";
import AppRouter from "./Router";
import { useEffect } from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { userState } from "./state";

function App() {
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_APIADDRESS}/user/check`
      );
      setUser(response.data);
      console.log("user check : ", response);
    } catch (error: any) {
      alert(error.response.data || "알 수 없는 오류 발생");
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
