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
  }
  #root {
  height: 100dvh;
}
  *{
    box-sizing: border-box;
  }
`;

export default App;
