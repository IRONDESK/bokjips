import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";

import { SHADOW } from "../../constants/style";
import { COMPANY_TYPES_LITERAL } from "../../constants/job";
import { ICompanyDataTypes, IWelfareDataTypes } from "../../types/CompanyData";

interface CorpCardPropsType extends ICompanyDataTypes {
  welfares: IWelfareDataTypes[];
}

function CorpCard({
  companyId,
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
  const router = useRouter();
  const CardContainer = useRef(null);
  const [viewCard, setViewCard] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (cards) => {
        cards.forEach((card) => {
          if (card.isIntersecting) {
            setViewCard(true);
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(CardContainer.current!);
  }, []);

  return (
    <Container ref={CardContainer} role="button" onClick={() => router.push(`/corp/${companyId}`)}>
      <Title>
        <Logo src={viewCard ? logo : ""} alt="" />
        <Name>
          <strong className="corp-name">
            {name} {isCertified === "true" && <i></i>}
          </strong>
          <p>
            <span aria-label={`기업분류 ${COMPANY_TYPES_LITERAL[classification]}`}>
              {COMPANY_TYPES_LITERAL[classification]}
            </span>
            {isPublicStock && <span aria-label="상장사">상장</span>}
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
          {wage && wage > 0 ? `, 초봉 ${wage}만원,` : ","}
          {numberOfEmployee && numberOfEmployee > 0 ? `직원 수 ${numberOfEmployee}명,` : ""}
          {`이 회사를 찜한 사람 ${favorite}명.`}
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
  padding: 24px 28px;
  height: 100%;
  background-color: #fff;
  border-radius: 16px;
  transition: all 0.3s;
  &:hover {
    box-shadow: ${SHADOW.hover};
  }
`;

const Title = styled.div`
  display: flex;
  padding: 0 0 12px;
  align-items: center;
  gap: 8px;
`;
const Logo = styled.img`
  width: 32px;
  height: 32px;
  border: 1px solid #eeeeee;
  border-radius: 100%;
  object-fit: cover;
`;
const Name = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 1.3rem;
  .corp-name {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    font-size: 1.1rem;
    font-weight: 600;
    i {
      display: inline-block;
      width: 20px;
      height: 20px;
      background-image: url("/icons/verified.svg");
      background-size: 20px;
    }
  }
  span {
    display: inline-block;
    margin: 0 0 0 3px;
    padding: 0 8px;
    border-radius: 20px;
    border: 1px solid #707070;
    color: #707070;
    font-size: 0.75rem;
    font-weight: 500;
    opacity: 0.85;
  }
`;

const WelfareList = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  align-items: flex-start;
  gap: 6px 4px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  span {
    padding: 6px 8px;
    border-radius: 12px;
    background-color: #f3f3f3;
    color: #4a4a4a;
    font-size: 0.75rem;
    letter-spacing: -0.1px;
  }
  .list-text-more {
    margin: 4px 0 4px 2px;
    font-size: 0.9rem;
  }
`;

const Option = styled.div`
  display: flex;
  margin: 16px 0 0;
  padding: 0 4px;
  justify-content: space-between;
  font-size: 0.75rem;
  opacity: 0.8;
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
  font-weight: ${(props) => props.icon === "heart" && 600};
  &::before {
    content: "";
    display: inline-block;
    width: 14px;
    height: 14px;
    background-image: url(${(props) => `/icons/${props.icon}.svg`});
    background-size: 14px;
    background-position: center;
    background-repeat: no-repeat;
  }
`;

export default CorpCard;
