import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Header from "./components/Header";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Comunity from "./routes/Comunity";
import Notice from "./routes/Notice";
import Qna from "./routes/Qna";
import Intro from "./routes/Intro";

function AppRouter() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/comunity" element={<Comunity />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/qna" element={<Qna />} />
          <Route path="/intro" element={<Intro />} />
          <Route path="*" element={<div>404 NOT FOUND PAGE</div>} />
        </Routes>
      </Router>
    </>
  );
}

export default AppRouter;
