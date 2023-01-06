import React from "react";
import styled from "@emotion/styled";
import DetailCard from "./DetailCard";
import { IWelfareDataTypes } from "../../types/CompanyData";

interface DetailPropsType {
  wage: number;
  isInclusiveWage: "Y" | "N" | "NULL";
  workingConditions: IWelfareDataTypes[];
  workSupport: IWelfareDataTypes[];
  offDutySupport: IWelfareDataTypes[];
  officeEnvironment: IWelfareDataTypes[];
}

function Detail({
  wage,
  isInclusiveWage,
  workingConditions,
  workSupport,
  offDutySupport,
  officeEnvironment,
}: DetailPropsType) {
  return (
    <Container>
      {(wage > 0 || isInclusiveWage !== "NULL") && (
        <Article>
          <Title>기본 정보</Title>
          <DetailList>
            {wage > 0 && (
              <DetailCard
                icon="payments"
                title={`초봉 ${wage?.toLocaleString() || 0}만원`}
                content="개발 직군 기준??직군별 상이"
              />
            )}
            {isInclusiveWage !== "NULL" && (
              <DetailCard
                icon={
                  isInclusiveWage === "Y" ? "schedule" : "history_toggle_off"
                }
                title={isInclusiveWage === "Y" ? "포괄임금제" : "비포괄임금제"}
              />
            )}
          </DetailList>
        </Article>
      )}
      <Article>
        <Title>근무 조건</Title>
        <DetailList>
          {workingConditions?.map((value: IWelfareDataTypes, idx: number) => (
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
          {workSupport?.map((value: IWelfareDataTypes, idx: number) => (
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
          {offDutySupport?.map((value: IWelfareDataTypes, idx: number) => (
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
          {officeEnvironment?.map((value: IWelfareDataTypes, idx: number) => (
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
const Article = styled.article`
  h3 {
    margin: 20px 0 0;
  }
  &:first-of-type {
    h3 {
      margin: 0;
    }
  }
`;
const Title = styled.h3`
  padding: 12px 12px 8px;
  font-size: 1.3rem;
  font-weight: 600;
`;
const DetailList = styled.ul`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  @media (max-width: 840px) {
    padding: 0 0 8px;
  }
  @media (max-width: 580px) {
    padding: 0 0 8px;
    flex-direction: column;
    gap: 12px;
  }
`;

export default Detail;
