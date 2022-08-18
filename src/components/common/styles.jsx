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
  top: 0;
`;

export const LinkTo = styled(Link)`
  text-decoration: none;
  color: white;
  padding-top: 3px;
  &:first-child {
    font-size: 18px;
  }
  &:last-child {
    font-size: 15px;
    padding-top: 5px;
  }
`;

export const RightMenu = styled.div`
  display: flex;
  gap: 16px;
  font-size: 16px;
`;

export const ProfileImg = styled.img`
  width: 28px;
  height: 28px;
  position: absolute;
  top: 5px;
  right: 16px;
`;

export const ProfileModal = styled.div`
  border-radius: 6px;
  display: flex;
  padding: 15px;
  background-color: #f8f8f8;
  & img {
    display: flex;
  }

  & > div {
    display: flex;
    height: 50px;
    flex-direction: column;
    margin: auto;
  }
`;

export const LinkProfile = styled(Link)`
  padding-left: 5px;
  cursor: pointer;
  text-decoration: none;
  color: black;
`;

export const LogOutButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 16px;
  cursor: pointer;
`;

export const Line = styled.hr`
  width: 100%;
  size: 1px;
`;

export const ProfileImage = {
  width: "45px",
  height: "45px",

  border: "2px solid #274C77",
  borderRadius: "30px",
};

export const Profile = styled.div`
  display: flex;
  cursor: pointer;
  font-size: 20px;
  & > div {
    line-height: 50px;
    margin: 0 10px;
  }
`;
