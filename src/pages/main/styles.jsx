import styled from "styled-components";

export const Body = styled.div`
  height: 130vh;
  width: 100%;
  background-color: #6096ba;
`;

export const BodyWrapper = styled.div`
  padding: 0 80px;
  padding-top: 120px;
  color: white;
  & h3 {
    font-weight: 800;
    font-size: 24px;
  }
`;
export const HeadWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const WriteButton = styled.button`
  height: 30px;
  width: 80px;
  border: 1px solid #e7ecef;
  color: #e7ecef;
  border-radius: 10px;
  text-decoration: none;
  cursor: pointer;
  background-color: #6096ba;

  &:active {
    transform: scale(0.97);
  }
`;

export const CardWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 12px;
  flex-wrap: nowrap;
  overflow-y: scroll;
  padding-bottom: 5px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Cards = styled.div`
  min-width: 260px;
  max-width: 260px;
  height: 350px;
  border-radius: 6px;
  background-color: #e7ecef;
  color: black;
  box-shadow: 0 2px 5px 3px #121212;

  & img {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    width: 100%;
    height: 70%;
  }
  & span {
    padding-left: 10px;
    display: inline-block;
    margin-top: 10px;
    font-size: 16px;
    opacity: 0.5;
    font-weight: 500;
    margin-bottom: 18px;
  }
  & div {
    padding-left: 10px;
    font-size: 20px;
  }
`;
