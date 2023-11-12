import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  min-height: calc(100dvh - (var(--headerHeight) + var(--footerHeight)));
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0;
`;

export const Form = styled.div`
  width: 80%;
  max-width: 700px;
  height: auto;
  border-radius: 25px;
  border: 1px solid gray;
  display: flex;
  flex-direction: column;
  padding: 40px 7%;
`;

export const Logo = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 30px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  font-size: 1rem;
  border-radius: 15px;
  border: 2px solid gray;
`;

export const Buttons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;
  margin-top: 30px;
  & button,
  a {
    height: 50px;
    width: 100%;
    border-radius: 15px;
    border: 0;
    color: white;
    transition: all 0.5s;
    font-size: 1.05rem;
    font-weight: 700;
  }
  & a {
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: #181601;
    background-color: #fee501;
  }
  & button:nth-child(3) {
    background-color: rgb(33 33 33);
  }
  & button:hover {
    filter: contrast(200%);
    cursor: pointer;
  }
  & button:active {
    filter: hue-rotate(340deg);
  }
`;

export const Label = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  font-weight: 800;
  font-size: 1.2rem;
  margin-top: 10px;
`;
