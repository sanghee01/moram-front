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
import Profile from "./routes/Profile";
import LoginSuccess from "./routes/LoginSuccess";
import Posting from "./routes/Posting";
import ProfileEdit from "./routes/ProfileEdit";
import Write from "./routes/Write";
import SelfIntroDuction from "./routes/SelfIntroduction";
import Admin from "./routes/Admin";
import { useRecoilValue } from "recoil";
import { userState } from "./state";
import Users from "./components/Admin/Users";
import AllPosts from "./components/Admin/AllPosts";
import NoticeDetail from "./routes/NoticeDetail";
import WriteNotice from "./routes/WriteNotice";
import AllComments from "./components/Admin/AllComments";

function AppRouter() {
  const user = useRecoilValue(userState);
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/community" element={<Community />} />
          <Route path="/community/:id" element={<Posting />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/notice/:id" element={<NoticeDetail />} />
          <Route path="/qna" element={<Qna />} />
          <Route path="/intro" element={<Intro />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile-edit" element={<ProfileEdit />} />
          <Route path="/login-success" element={<LoginSuccess />} />
          {user ? (
            <>
              <Route path="/admin" element={<Admin />}>
                <Route path="/admin" element={<Users />}></Route>
                <Route path="/admin/allPosts" element={<AllPosts />}></Route>
                <Route
                  path="/admin/allComments"
                  element={<AllComments />}
                ></Route>
              </Route>
              <Route path="/gpt" element={<SelfIntroDuction />} />
              <Route path="/write" element={<Write />} />
              <Route path="/write/:id" element={<Write />} />
              <Route path="/write-notice" element={<WriteNotice />} />
              <Route path="/write-notice/:id" element={<WriteNotice />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="*"
                element={
                  <h2>페이지가 없거나 로그인이 필요한 페이지 입니다.</h2>
                }
              />
            </>
          )}

          <Route path="*" element={<h2>404 NOT FOUND PAGE</h2>} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default AppRouter;
