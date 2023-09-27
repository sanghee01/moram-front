import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./Home";
import Header from "../components/Header";
import Login from "./Login";

function AppRouter() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<div>404 NOT FOUND PAGE</div>} />
        </Routes>
      </Router>
    </>
  );
}

export default AppRouter;
