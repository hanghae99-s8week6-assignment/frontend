import styled from "styled-components";

export const LogOutModalWrap = styled.div`
  position: fixed;
  text-align: center;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  z-index: 100;
  color: black;

  & > div {
    margin-top: 180px;
    display: inline-block;
    width: 400px;
    height: 25vh;
    background: white;
    background-color: #f8f8f8;
    border-radius: 6px;
    user-select: none;
    padding: 30px 40px 0;
    z-index: 100;
    position: relative;
    padding-top: 80px;
  }

  & > div > span {
    font-size: 24px;
    font-weight: 800;
  }
`;

export const ButtonWrap = styled.div`
  padding-top: 90px;
  & > button {
    width: 100px;
    height: 30px;
    margin: 0 10px;
    border-radius: 8px;
    background-color: #499449;
    color: white;
    border: none;
    cursor: pointer;
    &:last-child {
      background-color: #b46060;
    }
  }
`;
