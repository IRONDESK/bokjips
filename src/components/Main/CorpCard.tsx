import React from "react";
import styled from "@emotion/styled";
import { SHADOW } from "../../constants/style";
import { ICompanyDataTypes, IWelfareDataTypes } from "../../types/CompanyData";
import { COMPANY_TYPES_LITERAL } from "../../constants/job";

interface CorpCardPropsType extends ICompanyDataTypes {
  welfares: IWelfareDataTypes[];
}

function CorpCard({
  companyId,
  name,
  classification,
  wage,
  isInclusiveWage,
  isPublicStock,
  numberOfEmployee,
  recruitmentSite,
  site,
  welfares,
}: CorpCardPropsType) {
  return (
    <Container>
      <Title>
        <Logo src="https://image.rocketpunch.com/company/5466/naver_logo.png?s=400x400&t=inside" />
        <Name>
          <strong>{name}</strong>
          <p>
            {isPublicStock ? "상장" : "비상장"} |{" "}
            {COMPANY_TYPES_LITERAL[classification]}
          </p>
        </Name>
      </Title>
      <WelfareList>
        {welfares?.map((value, idx) => (
          <span key={idx}>{value?.title}</span>
        ))}
        <p className="list-text-more">...더보기</p>
      </WelfareList>
      <Option>
        <div>
          <Tag icon="money">초봉 {wage?.toLocaleString()}만</Tag>
          <Tag icon="groups">{numberOfEmployee?.toLocaleString()}명</Tag>
        </div>
        <Tag icon="heart">-</Tag>
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
  .list-text-more {
    margin: 0 0 0 4px;
    font-size: 0.8rem;
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
