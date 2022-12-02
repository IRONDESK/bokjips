import React from "react";
import styled from "@emotion/styled";
import DetailCard from "./DetailCard";

function Detail({ data }: { data: any }) {
  return (
    <Container>
      <Article>
        <Title>기본 정보</Title>
        <DetailList>
          <DetailCard
            icon="payments"
            title="초봉 5,000만원"
            description="개발 직군 한정"
          />
          <DetailCard icon="schedule" title="포괄임금제" />
          <DetailCard icon="history_toggle_off" title="비포괄임금제" />
        </DetailList>
      </Article>
      <Article>
        <Title>근무 조건</Title>
        <DetailList>
          <DetailCard icon="forest" title="결재없는 휴가" />
          <DetailCard
            icon="monitoring"
            title="스톡옵션 지급"
            description="1년 이상 근속자"
          />
          <DetailCard
            icon="location_away"
            title="일부재택근무"
            description="주 3일 재택근무"
          />
          <DetailCard
            icon="work_history"
            title="PC 자동오프제"
            description="야근시 상급자 결재"
          />
          <DetailCard
            icon="local_taxi"
            title="야근 택시비 지원"
            description="22시 이후 퇴근 한정"
          />
        </DetailList>
      </Article>
      <Article>
        <Title>근무 지원</Title>
        <DetailList>
          <DetailCard
            icon="menu_book"
            title="도서비 지원"
            description="월 최대 10만원"
          />
          <DetailCard
            icon="important_devices"
            title="최신 장비 지급"
            description="Mac, Windows 택1"
          />
          <DetailCard icon="chair_alt" title="자율좌석제" />
          <DetailCard
            icon="phone_in_talk"
            title="통신비 지원"
            description="영업 직군 한정"
          />
        </DetailList>
      </Article>
      <Article>
        <Title>근무 외 지원</Title>
        <DetailList>
          <DetailCard
            icon="redeem"
            title="복지포인트 지급"
            description="연 100만원"
          />
          <DetailCard
            icon="monitor_heart"
            title="무료 건강검진"
            description="연 1회 실시"
            additional="본인, 배우자, 양가부모"
          />
          <DetailCard
            icon="diversity_2"
            title="경조사 지원"
            description="경조비, 화환"
          />
          <DetailCard
            icon="pregnant_woman"
            title="출산 지원"
            description="휴가 및 축하금"
          />
        </DetailList>
      </Article>
      <Article>
        <Title>사내 환경</Title>
        <DetailList>
          <DetailCard icon="restaurant" title="사내 식당" />
          <DetailCard icon="local_cafe" title="사내 카페" />
          <DetailCard icon="child_care" title="사내 어린이집" />
          <DetailCard icon="fitness_center" title="사내 헬스장" />
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
