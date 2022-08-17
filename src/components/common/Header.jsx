import React, { useCallback, useState, useEffect } from "react";
import {
  HeaderWrapper,
  ProfileModal,
  LogOutButton,
  LinkProfile,
  Line,
  LinkTo,
  ProfileImage,
  Profile,
} from "./styles";
import Menu from "../Menu/Menu";
import { useDispatch, useSelector } from "react-redux";
import { userCheckThunk } from "../../app/modules/LoginSlice";
import Gravatar from "react-gravatar";

const Header = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const dispatch = useDispatch();

  const userData = useSelector((state) => state.userLogin?.userLogin[0]);

  useEffect(() => {
    dispatch(userCheckThunk());
  }, []);

  const onClickUserProfile = useCallback((e) => {
    e.stopPropagation();
    setShowUserMenu((prev) => !prev);
  }, []);

  const onCloseModal = useCallback(() => {
    setShowUserMenu(false);
  }, []);

  const onLogOut = useCallback(() => {}, []);
  return (
    <div>
      <HeaderWrapper>
        <LinkTo to="/">프로젝트 홈트</LinkTo>
        {userData ? (
          <Profile onClick={onClickUserProfile}>
            <Gravatar
              style={ProfileImage}
              default="identicon"
              email="a-email@example.com"
            />
            <div>{userData.userName}</div>
          </Profile>
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
