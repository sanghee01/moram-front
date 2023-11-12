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

  return <>report</>;
}

export default Reports;
