import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { GetServerSideProps } from "next";
import styled from "@emotion/styled";

import { SHADOW } from "../../constants/style";
import { Title } from "../../components/Layouts/partials/Title";
import Detail from "../../components/Corp/Detail";
import Comments from "../../components/Corp/Comments";

import { useAtom } from "jotai";
import { verticalSplited } from "../../atoms/atoms";
// import { CompanyById } from "../../api/CompanyApi";
import { ICompanyDataTypes } from "../../types/CompanyData";

import corp from "../../../public/data/corp.json";
import { JOB_TYPES, JOB_TYPES_LITERAL } from "../../constants/job";

interface ICorpPropsType {
  corpId?: string;
  corpData: ICompanyDataTypes;
}

function CorpId({ corpId, corpData: companyData }: ICorpPropsType) {
  const [isSplited, setIsSplited] = useAtom(verticalSplited);

  return (
    <>
      <Title title={companyData?.name} />
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,300,0,200"
        />
      </Head>
      <Container isSplited={isSplited}>
        <SideOne>
          <Banner>
            <div className="corp-identified">
              <img src="https://image.rocketpunch.com/company/5466/naver_logo.png?s=400x400&t=inside" />
              <h2>{companyData?.name}</h2>
              <i>{companyData?.isPublicStock ? "상장" : "비상장"}</i>
              <i>{JOB_TYPES_LITERAL[companyData?.classification]}</i>
            </div>
            <div className="corp-buttons">
              <Button icon="heart">0</Button>
              <Link href={companyData?.site || ""}>
                <Button icon="site">사이트</Button>
              </Link>
              <Link href={companyData?.recruitmentSite || ""}>
                <Button icon="recruit">채용정보</Button>
              </Link>
            </div>
          </Banner>
          <Detail
            wage={companyData?.wage}
            isInclusiveWage={companyData?.isInclusiveWage}
            welfares={companyData?.welfares}
          />
        </SideOne>
        <SideTwo isSplited={isSplited}>
          <Vertical
            type="button"
            id="vertical-active"
            onClick={() => setIsSplited(!isSplited)}
          ></Vertical>
          <Comments />
        </SideTwo>
      </Container>
    </>
  );
}

const Container = styled.main<{ isSplited: boolean }>`
  padding: 0 24px;
  display: ${(props) => (props.isSplited ? "flex" : "block")};
  justify-content: space-between;
  @media (max-width: 1125px) {
    display: block;
  }
  @media (max-width: 580px) {
    padding: 0 8px 20px;
  }
`;
const SideOne = styled.section`
  flex: 1;
`;
const SideTwo = styled.section<{ isSplited: boolean }>`
  ${(props) =>
    !props.isSplited &&
    `
  margin: 36px 0 0;
  padding: 36px 0;
  border-top: 1px solid #c8c8c8;`}
  @media (min-width: 1125px) {
    ${(props) =>
      props.isSplited &&
      `
  position: sticky;
  top: 0;
  margin: 0 -24px 0 0;
  padding: 40px 0 0;
  width: 320px;
  height: 100vh;
  background-color: #ffffff;
  overflow-y: scroll;
  #vertical-active {
    margin-right: 24px;
  }
`}
  }

  @media (max-width: 1125px) {
    margin: 36px 0 0;
    padding: 36px 0;
    border-top: 1px solid #c8c8c8;
  }
`;

const Banner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 8px 0 20px;
  .corp-identified {
    display: flex;
    align-items: center;
    margin: 0 -24px;
    padding: 20px 32px;
    gap: 12px;
    h2 {
      font-weight: 600;
      font-size: 1.5rem;
    }
    img {
      width: 42px;
      height: 42px;
      border-radius: 18px;
    }
  }
  @media (max-width: 840px) {
    flex-direction: column;
    .corp-identified {
      width: 100%;
      padding: 20px 12px;
    }
    .corp-buttons {
      display: flex;
      width: 100%;
      padding: 0 12px;
      gap: 12px;
    }
  }
  @media (max-width: 580px) {
    .corp-buttons {
      button:nth-of-type(2),
      button:nth-of-type(3) {
        padding: 12px 18px;
        &::after {
          width: 0;
          left: 0;
        }
      }
    }
  }
`;

const Button = styled.button<{ icon: string }>`
  position: relative;
  margin: 0 12px 0 0;
  padding: 12px 18px 12px 42px;
  min-width: 80px;
  background-color: #fff;
  border-radius: 28px;
  font-size: 0.95rem;
  transition: all 0.3s;
  box-shadow: ${SHADOW.basic};
  &::after {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    left: 18px;
    top: 50%;
    background-image: url(${(props) => `/icons/${props.icon}.svg`});
    background-size: 20px;
    background-position: center;
    transform: translateY(-50%);
  }
  &:hover {
    box-shadow: ${SHADOW.hover};
  }
  @media (max-width: 840px) {
    flex: 1;
    margin: 0;
  }
`;

const Vertical = styled.button`
  position: absolute;
  right: 0;
  margin: -12px 40px 0 0;
  padding: 20px;
  background-color: #fff;
  background-image: url("/icons/vertical_split.svg");
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 28px;
  transition: all 0.3s;
  box-shadow: ${SHADOW.basic};
  &:hover {
    box-shadow: ${SHADOW.hover};
  }
  @media (max-width: 1125px) {
    opacity: 0;
  }
`;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const corpData = corp.filter((el) => el.id == Number(id))[0] || {};
  return {
    props: {
      corpId: id,
      corpData,
    },
  };
};

export default CorpId;
