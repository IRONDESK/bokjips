import React from "react";
import styled from "@emotion/styled";

interface NoDataPropsType {
  code?: string;
}

function NoData({ code }: NoDataPropsType) {
  return (
    <Container>
      <i></i>
      <div>
        <strong>발견된 회사가 없습니다</strong>
        <p>더 많은 정보를 준비하겠습니다</p>
        {code && <p>Server Error: ${code}</p>}
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  margin: 60px 8px;
  justify-content: center;
  gap: 16px;
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
    font-size: 2rem;
    font-weight: 600;
    line-height: 2.4rem;
  }
  p {
    font-size: 1.2rem;
    line-height: 1.55rem;
  }
  @media (max-width: 690px) {
    i {
      width: 40px;
      height: 40px;
    }
    strong {
      margin: 0;
      font-size: 1.5rem;
    }
    p {
      font-size: 1.1rem;
    }
  }
`;

export default NoData;
