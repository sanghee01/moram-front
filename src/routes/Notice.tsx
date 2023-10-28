import axios from "axios";

function Notice() {
  const check = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_APIADDRESS}/user/check`,
        {
          withCredentials: true,
        }
      );
    } catch (error: any) {
      alert(error?.response?.data || "알 수 없는 에러");
    }
  };
  return <div onClick={() => check()}>Notice</div>;
}

export default Notice;
