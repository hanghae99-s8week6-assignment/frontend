
  import styled from "styled-components";
  import Contents from "../components/Contents";

  function Detail () {

    return (
      <DetailContainer>
        <Contents />
      </DetailContainer>
    )
  }

  const DetailContainer = styled.div`
    display:block;

    width:74vw;
    height: 92vh;
    margin:1rem auto;
  `

  export default Detail;