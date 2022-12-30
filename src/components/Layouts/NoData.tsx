import styled from "@emotion/styled";
import React from "react";

function NoData() {
  return (
    <Container>
      <i></i>
      <div>
        <strong>찾으시는 회사가 없습니다</strong>
        <p>더 많은 회사 정보를 준비하겠습니다</p>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  margin: 36px 8px;
  justify-content: center;
  gap: 12px;
  word-break: keep-all;
  opacity: 0.8;
  i {
    display: block;
    width: 52px;
    height: 52px;
    background-image: url("/icons/campaign.svg");
    background-size: 48px;
    background-repeat: no-repeat;
  }
  strong {
    display: block;
    margin: 0 0 12px;
    font-size: 2.25rem;
    font-weight: 600;
    line-height: 2.4rem;
  }
  p {
    font-size: 1.3rem;
    line-height: 1.55rem;
  }
`;

export default NoData;
