import axios from "axios";
import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { Title, Table, Row, GoToPost } from "../../styles/TableStyles";
import { handleDateChange } from "../../dateChange";
import { useNavigate } from "react-router-dom";

function AllPosts() {
  const [allPostsData, SetAllPostsData] = useState<null | any>(null);
  const [loading, setLoding] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_APIADDRESS}/admin/allposts`
      );
      const allPostsData = response.data.content;
      SetAllPostsData(allPostsData);
      setLoding(false);
    } catch (error: any) {
      alert(error.response.data);
    }
  };

  const deletePost = async (e: any) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_APIADDRESS}/admin/posting/${e.target.id}`
      );
      getAllPosts();
      alert(response.data.message);
    } catch (error: any) {
      alert(error.response.data);
    }
  };

  return (
    <Container>
      <Title>작성된 글 목록</Title>
      {loading ? (
        <div>loading...</div>
      ) : (
        <>
          <span>총합 : {allPostsData.length}</span>
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>작성시간</th>
                <th>작성자</th>
                <th>제목</th>
                <th>태그</th>
                <th>카테고리</th>
                <th>글 삭제</th>
              </tr>
            </thead>
            <tbody>
              {allPostsData
                ?.sort((a: any, b: any) => {
                  return b.id - a.id;
                })
                .map((post: any) => {
                  return (
                    <Row key={post.id}>
                      <td>{post.id}</td>
                      <td>{handleDateChange(post.writeTime)}</td>
                      <td>{post.nickname}</td>
                      <GoToPost
                        onClick={() => navigate(`/community/${post.id}`)}
                      >
                        {post.title}
                      </GoToPost>
                      <td>{post.tag}</td>
                      <td>{post.category}</td>
                      <td id={post.id} onClick={deletePost}>
                        삭제
                      </td>
                    </Row>
                  );
                })}
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
}

export default AllPosts;

const Container = styled.div`
  width: 70%;
  margin: auto;
  margin-top: 50px;
  height: 100vh;
  @media screen and (max-width: 800px) {
    width: 90%;
    font-size: 0.8rem;
  }
`;
