import styled from "styled-components";
import { Link } from "react-router-dom";

export const HeaderWrapper = styled.div`
  position: fixed;
  box-sizing: border-box;
  width: 100%;
  display: block;
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 0 40px;
  align-items: center;
  z-index: 500;
  height: 60px;
  top:0;
`;

export const LinkToHome = styled(Link)`
  text-decoration: none;
  color: white;
`;

export const ProfileImg = styled.img`
  width: 28px;
  height: 28px;
  position: absolute;
  top: 5px;
  right: 16px;
`;

export const ProfileModal = styled.div`
  display: flex;
  padding: 20px;
  background-color: white;
  & img {
    display: flex;
  }

  & > div {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
  }

  & #profile-name {
    font-weight: bold;
    display: inline-flex;
  }

  & #profile-active {
    font-size: 13px;
    display: inline-flex;
  }
`;
export const LogOutButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 16px;
`;
