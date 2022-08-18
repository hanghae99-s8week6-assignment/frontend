import React from "react";
import styled from "styled-components";
import Gravatar from "react-gravatar";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/common/Header";
import { getPostAysnc } from "../app/modules/postSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const userData = useSelector((state) => state.userLogin?.userLogin[0]);
  const postData = useSelector((state) => state.posts.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPostAysnc());
  }, [dispatch]);

  const moveToDetailPage = (event) => {
    navigate(`/detail/${postData.postId}`);
  };

  return (
    <>
      <Header />
      <ProfileContainer>
        <ProfileBox>
          {userData === undefined || userData === null ? (
            <div>로딩중입니다..</div>
          ) : (
            <>
              <Gravatar
                style={ProfileImage}
                default="identicon"
                email={userData.email}
              />
              <ProfileUserName>{userData.userName}</ProfileUserName>
              <ProfileEmail>{userData.email}</ProfileEmail>
            </>
          )}
        </ProfileBox>
        <WritingBox>
          <SeriesInfoText>최근 올린 포스트</SeriesInfoText>
          <SeriesCardList>
            {postData === undefined || postData.length === 0 ? (
              <div>로딩중입니다...</div>
            ) : (
              postData.Post.filter((elem) => elem.email === userData.email)
                .sort((a, b) => b.liked - a.liked)
                .map((elem) => (
                  <SeriesCard onClick={moveToDetailPage}>
                    <SeriesImageBox>
                      <SeriesImage
                        src={
                          elem.Images === ""
                            ? "https://images.unsplash.com/photo-1591311630200-ffa9120a540f"
                            : elem.Images
                        }
                        alt="Home traning Image"
                      />
                    </SeriesImageBox>
                    <SeriesTextBox>
                      <TextBoxTitle>{elem.title}</TextBoxTitle>
                      <TextBoxUserName>{elem.userName}</TextBoxUserName>
                    </SeriesTextBox>
                  </SeriesCard>
                ))
            )}
          </SeriesCardList>
          <SeriesInfoText>좋아요 많이 받은 포스트</SeriesInfoText>

          <SeriesCardList>
            {postData === undefined ||
            postData.length === 0 ||
            userData === undefined ? (
              <div>로딩중입니다...</div>
            ) : (
              postData.Post.filter((elem) => elem.email === userData.email).map(
                (elem) => (
                  <SeriesCard onClick={moveToDetailPage}>
                    <SeriesImageBox>
                      <SeriesImage
                        src={
                          elem.Images === ""
                            ? "https://images.unsplash.com/photo-1591311630200-ffa9120a540f"
                            : elem.Images
                        }
                        alt="Home traning Image"
                      />
                    </SeriesImageBox>
                    <SeriesTextBox>
                      <TextBoxTitle>{elem.title}</TextBoxTitle>
                      <TextBoxUserName>{elem.userName}</TextBoxUserName>
                    </SeriesTextBox>
                  </SeriesCard>
                )
              )
            )}
          </SeriesCardList>
        </WritingBox>
      </ProfileContainer>
    </>
  );
}

const ProfileContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.8fr;
  justify-content: center;

  margin: auto;
  margin-top: 7rem;
`;

const ProfileBox = styled.div`
  background: #e7ecef;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  border-radius: 5px;
  margin: 0 auto;

  height: 80vh;
  width: 22vw;

  box-shadow: 0 5px 20px 0 #121212;
  box-sizing: border-box;
`;

const ProfileUserName = styled.h2`
  font-size: 2rem;
  font-weight: 700;
`;

const ProfileEmail = styled.h3`
  font-size: 1.5rem;
  margin: 0;
`;

const WritingBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  padding-left: 1rem;

  width: 60vw;

  box-sizing: border-box;
`;

const SeriesInfoText = styled.h2`
  font-weight: 600;
  color: #e7ecef;

  margin: 0;
  margin-bottom: 1rem;
`;

const SeriesCardList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const SeriesCard = styled.button`
  display: flex;
  flex-direction: column;
  background: #e7ecef;

  text-align: left;

  border: none;
  outline: none;
  border-radius: 10px;
  padding: 0;
  margin-right: 3rem;
  margin-bottom: 5rem;

  width: 15vw;

  height: 40vh;

  box-shadow: 0 5px 20px 0 #121212;
  box-sizing: border-box;

  cursor: pointer;

  transition: 0.2s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const SeriesImageBox = styled.div`
  background: black;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 10px 10px 0 0;

  height: 25vh;
`;

const SeriesImage = styled.img`
  width: 100%;
`;

const SeriesTextBox = styled.div`
  background: #e7ecef;

  height: 15vh;

  padding: 0 1rem;
  margin: 0;

  border-radius: 0 0 10px 10px;
`;

const TextBoxTitle = styled.h3`
  font-size: 1rem;
`;

const TextBoxUserName = styled.p`
  font-size: 0.8rem;
`;

const ProfileImage = {
  width: "30vh",
  height: "30vh",

  border: "5px solid #274C77",
  borderRadius: "50%",
  margin: "4rem",
  marginBottom: "3rem",
};

export default Profile;
