import React from "react";
import styled from "@emotion/styled";
import { COLOR, SHADOW } from "../../constants/style";
import { COMPANY_TYPES_LITERAL } from "../../constants/job";

import { ICompanyDataTypes, IWelfareDataTypes } from "../../types/CompanyData";

interface CorpCardPropsType extends ICompanyDataTypes {
  welfares: IWelfareDataTypes[];
}

function CorpCard({
  name,
  classification,
  logo,
  wage,
  isPublicStock,
  numberOfEmployee,
  welfares,
  isCertified,
  favorite,
}: CorpCardPropsType) {
  return (
    <Container>
      <Title>
        <div>
          <Logo src={logo} alt={name + " 로고"} aria-hidden="true" />
          {isCertified === "true" && <i></i>}
        </div>
        <Name>
          <strong>{name}</strong>
          <p>
            {isPublicStock ? "상장" : "비상장"} |{" "}
            {COMPANY_TYPES_LITERAL[classification]}
          </p>
        </Name>
      </Title>
      <WelfareList aria-hidden="true">
        {welfares?.map((value, idx) => (
          <span key={idx}>{value?.title}</span>
        ))}
        <p className="list-text-more">...</p>
      </WelfareList>
      <Option>
        <span className="a11y-hidden">
          {wage && wage > 0 ? `,초봉 ${wage}만원,` : ""}
          {numberOfEmployee && numberOfEmployee > 0
            ? `,직원 수 ${numberOfEmployee}명,`
            : ""}
          {`이 회사를 찜한 사람은 ${favorite}명입니다.`}
        </span>
        <div>
          {wage && wage > 0 ? (
            <Tag icon="money" aria-hidden="true">
              초봉 {wage?.toLocaleString()}만
            </Tag>
          ) : null}
          {numberOfEmployee && numberOfEmployee > 0 ? (
            <Tag icon="groups" aria-hidden="true">
              {numberOfEmployee?.toLocaleString()}명
            </Tag>
          ) : null}
        </div>
        <Tag icon="heart" aria-hidden="true">
          {favorite?.toLocaleString() || 0}
        </Tag>
      </Option>
    </Container>
  );
}

const Container = styled.article`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 28px;
  height: 100%;
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
  div {
    position: relative;
    i {
      position: absolute;
      top: -4px;
      right: -8px;
      width: 16px;
      height: 16px;
      background-color: ${COLOR.check};
      border-radius: 100%;
      color: #fff;
      font-size: 0.7rem;
      font-weight: 500;
      line-height: 16px;
      text-align: center;
      &::after {
        content: "✓";
      }
    }
  }
`;
const Logo = styled.img`
  width: 44px;
  height: 44px;
  border: 1px solid #eeeeee;
  border-radius: 12px;
  object-fit: cover;
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
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  align-items: flex-start;
  gap: 4px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  span {
    padding: 4px;
    background-color: #eee;
    font-size: 0.8rem;
    letter-spacing: -0.3px;
    border-radius: 4px;
  }
  .list-text-more {
    margin: 4px 0 4px 2px;
    font-size: 0.9rem;
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
  opacity: 0.7;
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
