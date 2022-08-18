import styled from "styled-components";

export const WriteModal = styled.div`
  position: fixed;
  text-align: center;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  z-index: 90;
  color: black;

  & > div {
    margin-top: 80px;
    display: inline-block;
    width: 840px;
    height: 80vh;
    background: white;
    background-color: #f8f8f8;
    border-radius: 6px;
    user-select: none;
    padding: 30px 40px 0;
    z-index: 90;
    position: relative;
  }
`;

export const CloseModalButton = styled.div`
  position: absolute;
  right: 10px;
  top: 6px;
  background: transparent;
  border: none;
  font-size: 30px;
  cursor: pointer;
`;
