import React, { useCallback, useState, useEffect } from "react";
import {
  HeaderWrapper,
  RightMenu,
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
import LogOutModal from "../LogOutModal/LogOutModal";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLogOutModal, setShowLogOutModal] = useState(false);

  const dispatch = useDispatch();

  const userData = useSelector((state) => state.userLogin?.userLogin[0]);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(userCheckThunk());
  }, []);

  const onClickUserProfile = useCallback((e) => {
    e.stopPropagation();
    setShowUserMenu((prev) => !prev);
  }, []);

  const onCloseModal = useCallback(() => {
    setShowUserMenu(false);
    setShowLogOutModal(false);
  }, []);
  const onShowLogOutModal = useCallback(() => {
    setShowLogOutModal(true);
  }, []);
  // const onLogOut = useCallback(() => {
  //   dispatch(logoutAsync());
  //   localStorage.removeItem("user");
  //   window.location.reload();
  // }, []);

  if (userData === []) {
    navigate("/");
  }
  return (
    <>
      <HeaderWrapper>
        <RightMenu>
          <LinkTo to="/">프로젝트 홈트</LinkTo>
          <div></div>
          <LinkTo to="/posts">전체 게시글</LinkTo>
        </RightMenu>
        {userData ? (
          <Profile onClick={onClickUserProfile}>
            <Gravatar
              style={ProfileImage}
              default="identicon"
              email={userData.email}
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
                <LinkProfile to={"/profile"} id="profile-menu">
                  내 프로필
                </LinkProfile>
                <Line />
                <LogOutButton onClick={onShowLogOutModal}>
                  로그아웃
                </LogOutButton>
              </div>
            </ProfileModal>
          </Menu>
        )}
      </HeaderWrapper>
      {showLogOutModal && (
        <LogOutModal
          setShowLogOutModal={setShowLogOutModal}
          onCloseModal={onCloseModal}
        />
      )}
    </>
  );
};

export default Header;
