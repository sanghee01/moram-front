import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Header from "./components/Header";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Community from "./routes/Community";
import Notice from "./routes/Notice";
import Qna from "./routes/Qna";
import Intro from "./routes/Intro";
import Footer from "./components/Footer";
import LoginSuccess from "./routes/LoginSuccess";
import Posting from "./routes/Posting";

function AppRouter() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/community" element={<Community />} />
          <Route path="/community/:id" element={<Posting />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/qna" element={<Qna />} />
          <Route path="/intro" element={<Intro />} />
          <Route path="/login-success" element={<LoginSuccess />} />
          <Route path="*" element={<div>404 NOT FOUND PAGE</div>} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default AppRouter;
