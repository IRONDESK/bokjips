import React from "react";
import styled from "@emotion/styled";

function Loading() {
  return (
    <Container>
      <img src="/icons/hourglass.svg" alt="Loading" />
      <p>정보를 가져오고 있습니다</p>
    </Container>
  );
}
const Container = styled.section`
  padding: 80px 0;
  height: 40vh;
  text-align: center;
  img {
    width: 48px;
    height: 48px;
    object-fit: cover;
  }
  p {
    margin: 16px 0 0;
    font-size: 1.05rem;
  }
`;

export default Loading;
