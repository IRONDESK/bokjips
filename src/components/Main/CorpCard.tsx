import React from "react";
import styled from "@emotion/styled";
import { SHADOW } from "../../constants/style";

function CorpCard() {
  const walfare = [
    "포괄임금",
    "사내식당",
    "석식비제공",
    "최신형장비",
    "자유로운연차",
    "재택근무",
    "스톡옵션",
  ];
  return (
    <Container>
      <Title>
        <Logo src="https://image.rocketpunch.com/company/5466/naver_logo.png?s=400x400&t=inside" />
        <Name>
          <strong>회사명</strong>
          <p>상장 | IT/테크</p>
        </Name>
      </Title>
      <WelfareList>
        {walfare.map((value, idx) => (
          <span key={idx}>{value}</span>
        ))}
        <p>...더보기</p>
      </WelfareList>
      <Option>
        <div>
          <Tag icon="money">초봉 5,000만</Tag>
          <Tag icon="groups">3,000명</Tag>
        </div>
        <Tag icon="heart">300</Tag>
      </Option>
    </Container>
  );
}

const Container = styled.article`
  cursor: pointer;
  padding: 24px 32px;
  background-color: #fff;
  border-radius: 24px;
  transition: all 0.3s;
  &:hover {
    box-shadow: ${SHADOW.hover};
  }
`;

const Title = styled.div`
  display: flex;
  padding: 0 0 12px;
  align-items: center;
  justify-content: space-between;
`;
const Logo = styled.img`
  width: 44px;
  height: 44px;
  border: 1px solid #eee;
  border-radius: 18px;
`;
const Name = styled.div`
  text-align: right;
  line-height: 1.4rem;
  strong {
    font-size: 1.35rem;
    font-weight: 600;
  }
  p {
    font-size: 0.9rem;
    opacity: 0.55;
  }
`;

const WelfareList = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
  span {
    padding: 4px 6px;
    background-color: #eee;
    font-size: 0.9rem;
    border-radius: 4px;
  }
`;

const Option = styled.div`
  display: flex;
  margin: 12px 0 0;
  justify-content: space-between;
  font-size: 0.8rem;
  div {
    display: flex;
    gap: 8px;
  }
`;

const Tag = styled.i<{ icon: string }>`
  display: flex;
  align-items: center;
  gap: 4px;
  opacity: 0.75;
  &::before {
    content: "";
    display: inline-block;
    width: 16px;
    height: 16px;
    background-image: url(${(props) => `/icons/${props.icon}.svg`});
    background-size: 16px;
  }
`;

export default CorpCard;
