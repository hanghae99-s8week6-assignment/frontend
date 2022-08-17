import React, { useCallback, useState, useEffect } from "react";
import {
  HeaderWrapper,
  ProfileModal,
  LogOutButton,
  LinkProfile,
  Line,
  LinkTo,
} from "./styles";
import Menu from "../Menu/Menu";
import { useDispatch, useSelector } from "react-redux";
import { userCheckThunk } from "../../app/modules/LoginSlice";

const Header = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const dispatch = useDispatch();

  const userData = useSelector((state) => state.userLogin.userLogin);

  useEffect(() => {
    console.log("re");
    dispatch(userCheckThunk());
  }, [userData]);

  console.log("userData:", userData);
  const onClickUserProfile = useCallback((e) => {
    e.stopPropagation();
    setShowUserMenu((prev) => !prev);
    console.log(showUserMenu);
  }, []);

  const onCloseModal = useCallback(() => {
    setShowUserMenu(false);
    console.log(showUserMenu);
  }, []);

  const onLogOut = useCallback(() => {}, []);
  return (
    <div>
      <HeaderWrapper>
        <LinkTo to="/">프로젝트 홈트</LinkTo>
        {userData?.length ? (
          <div onClick={onClickUserProfile}>프로필 이미지 버튼</div>
        ) : (
          <LinkTo to="/login ">로그인</LinkTo>
        )}
        {showUserMenu && (
          <Menu show={showUserMenu} onCloseModal={onCloseModal}>
            <ProfileModal>
              <div>
                <LinkProfile to={"/"} id="profile-menu">
                  내 프로필
                </LinkProfile>
                <Line />
                <LogOutButton onClick={onLogOut}>로그아웃</LogOutButton>
              </div>
            </ProfileModal>
          </Menu>
        )}
      </HeaderWrapper>
    </div>
  );
};

export default Header;
