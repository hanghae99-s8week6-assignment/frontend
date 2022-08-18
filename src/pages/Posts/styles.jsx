import styled from "styled-components";

export const PostsPageWrap = styled.div`
  padding: 0px 40px;
  justify-content: center;
  margin-top: 5.5rem;
`;

export const PostContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
`;
export const Title = styled.div`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 1.4rem;
  color: white;
  font-weight: 700;
`;

export const Card = styled.div`
  width: 25%;
  padding: 1rem;
  background-color: #e7ecef;
  display: flex;
  justify-content: space-between;
  border-radius: 4px;
  box-shadow: 0 5px 10px 0 #121212;
`;

export const CardImage = styled.img`
  width: 9rem;
  height: 8rem;
  background-color: black;
`;

export const CardText = styled.div`
  & > div {
    &:first-child {
      font-size: 16px;
      margin-bottom: 2.4em;
    }
    &:last-child {
      font-size: 30px;
    }
  }
`;
