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
    height: auto;
    margin: 0;
    padding: 0;
    margin: 0 auto;
    color: black;
    font-family : "Noto Sans KR";
  }
  #root {
  min-height: 100%;
}
  *{
    box-sizing: border-box;
    font-family : "Noto Sans KR";
  }
`;

export default App;
