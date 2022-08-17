import styled from "styled-components";

export const CreateMenu = styled.div`
  position: fixed;
  top: 60px;
  right: 200px;
  z-index: 1000;

  & > div {
    position: absolute;
    display: inline-block;
    border-radius: 6px;
    user-select: none;
    min-width: 200px;
    z-index: 512;
    max-height: calc(100vh - 20px);
    color: rgb(29, 28, 29);
  }
`;

export const CloseModalButton = styled.button`
  position: absolute;
  right: 10px;
  top: 6px;
  background: transparent;
  border: none;
  font-size: 30px;
  cursor: pointer;
`;
