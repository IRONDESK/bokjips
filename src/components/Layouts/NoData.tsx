import React from "react";
import styled from "@emotion/styled";
import { ServiceAlertSpeakerIcon } from "../../svg/ServiceAlertIcon";
import { COLOR } from "../../constants/style";

interface NoDataPropsType {
  code?: string;
}

function NoData({ code }: NoDataPropsType) {
  return (
    <Container isErrorCode={!!code}>
      <ServiceAlertSpeakerIcon width={68} height={68} />
      <strong>발견된 회사가 없습니다</strong>
      {code && <p>Server Error: ${code}</p>}
    </Container>
  );
}

const Container = styled.div<{ isErrorCode: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 300px);
  gap: 12px;
  word-break: keep-all;
  svg {
    margin: 0 0 20px;
    padding: 12px;
    fill: #fff;
    background-color: ${({ isErrorCode }) => (isErrorCode ? COLOR.report : COLOR.main)};
    border-radius: 20px;
  }
  strong {
    margin: 0 0 4px;
    font-size: 2rem;
    font-weight: 600;
  }
  p {
    font-size: 1.2rem;
  }
  @media (max-width: 690px) {
    strong {
      font-size: 1.5rem;
    }
    p {
      font-size: 1.1rem;
    }
  }
`;

export default NoData;
