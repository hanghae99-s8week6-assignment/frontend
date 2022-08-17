import React from "react";
import styled from "styled-components";
import Header from "../components/common/Header";
import Contents from "../components/Contents";

function Detail () {

  return (
    <>
      <Header />
      <DetailContainer>
        <Contents />
      </DetailContainer>
    </>
  )
}

const DetailContainer = styled.div`
  display:block;

  width:74vw;
  height: 80vh;
  margin:5rem auto 4rem auto;
`

export default Detail;