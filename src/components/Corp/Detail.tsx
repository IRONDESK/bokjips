import React from "react";
import styled from "@emotion/styled";
import DetailCard from "./DetailCard";
import { IWelfareDataTypes } from "../../types/CompanyData";

interface DetailPropsType {
  wage: number;
  isInclusiveWage: "Y" | "N";
  welfares: IWelfareDataTypes[];
}

function Detail({ wage, isInclusiveWage, welfares }: DetailPropsType) {
  return (
    <Container>
      <Article>
        <Title>기본 정보</Title>
        <DetailList>
          <DetailCard
            icon="payments"
            title={`초봉 ${wage?.toLocaleString() || 0}만원`}
            content="개발 직군 한정"
          />
          {isInclusiveWage === "Y" ? (
            <DetailCard icon="schedule" title="포괄임금제" />
          ) : (
            <DetailCard icon="history_toggle_off" title="비포괄임금제" />
          )}
        </DetailList>
      </Article>
      <Article>
        <Title>근무 조건</Title>
        <DetailList>
          {welfares
            ?.filter((el) => el.type === "근무 조건")
            .map((value: IWelfareDataTypes, idx: number) => (
              <DetailCard
                key={idx}
                icon={value.icon}
                title={value.title}
                content={value.content}
              />
            ))}
        </DetailList>
      </Article>
      <Article>
        <Title>근무 지원</Title>
        <DetailList>
          {" "}
          {welfares
            ?.filter((el) => el.type === "근무 지원")
            .map((value: IWelfareDataTypes, idx: number) => (
              <DetailCard
                key={idx}
                icon={value.icon}
                title={value.title}
                content={value.content}
              />
            ))}
        </DetailList>
      </Article>
      <Article>
        <Title>근무 외 지원</Title>
        <DetailList>
          {welfares
            ?.filter((el) => el.type === "근무 외 지원")
            .map((value: IWelfareDataTypes, idx: number) => (
              <DetailCard
                key={idx}
                icon={value.icon}
                title={value.title}
                content={value.content}
              />
            ))}
        </DetailList>
      </Article>
      <Article>
        <Title>사내 환경</Title>
        <DetailList>
          {welfares
            ?.filter((el) => el.type === "사내 환경")
            .map((value: IWelfareDataTypes, idx: number) => (
              <DetailCard
                key={idx}
                icon={value.icon}
                title={value.title}
                content={value.content}
              />
            ))}
        </DetailList>
      </Article>
    </Container>
  );
}

const Container = styled.section`
  padding: 0 12px 52px;
`;
const Article = styled.article``;
const Title = styled.h3`
  margin: 20px 0 0;
  padding: 12px 12px 8px;
  font-size: 1.3rem;
  font-weight: 600;
`;
const DetailList = styled.ul`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  @media (max-width: 840px) {
    margin: 0 -32px;
    padding: 0 12px 8px 32px;
    flex-wrap: nowrap;
    overflow-x: scroll;
  }
  @media (max-width: 580px) {
    margin: 0 -20px;
    padding: 0 12px 8px 20px;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  &::-webkit-scrollbar {
    background-color: transparent;
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #cfcfcf;
    border-radius: 20px;
  }
`;

export default Detail;
