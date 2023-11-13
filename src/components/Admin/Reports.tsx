import axios from "axios";
import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { Title, Table, Row, GoToPost } from "../../styles/TableStyles";
import { handleDateChange } from "../../dateChange";
import { useNavigate } from "react-router-dom";

function Reports() {
  const [allReportsData, SetAllReportsData] = useState<null | any>(null);
  const [loading, setLoding] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getAllReports();
  }, []);

  const getAllReports = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_APIADDRESS}/admin/report`
      );
      const allReportsData = response.data.content;
      console.log(allReportsData);
      SetAllReportsData(allReportsData);
      setLoding(false);
    } catch (error: any) {
      alert(error.response.data);
    }
  };

  return (
    <Container>
      <Title>신고 목록</Title>
      {loading ? (
        <div>loading...</div>
      ) : (
        <>
          <span>총합 : {allReportsData.length}</span>
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>작성시간</th>
                <th>작성자</th>
                <th>내용</th>
              </tr>
            </thead>
            <tbody>
              {allReportsData
                ?.sort((a: any, b: any) => {
                  return b.id - a.id;
                })
                .map((report: any) => {
                  return (
                    <Row key={report.id}>
                      <td>{report.id}</td>
                      <td>{handleDateChange(report.createTime)}</td>
                      <td>{report.nickname}</td>
                      <GoToPost
                        onClick={() => navigate(`/community/${report.postId}`)}
                      >
                        {report.reason}
                      </GoToPost>
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

export default Reports;
