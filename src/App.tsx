import { createGlobalStyle } from "styled-components";
import AppRouter from "./routes/Router";

function App() {
  return (
    <>
      <GlobalStyle />
      <AppRouter />
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  html, body {
    width: 100vw;
    min-height: 100dvh;
    margin: 0;
    padding: 0;
    color: black;
    font-family : "Noto Sans KR";
  }
  #root {
  height: 100dvh;
}
  *{
    box-sizing: border-box;
    font-family : "Noto Sans KR";
  }
`;

export default App;
