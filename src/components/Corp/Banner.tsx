import React from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { getCookie } from "cookies-next";
import { useSWRConfig } from "swr";

import { activeAlert } from "../../atoms/atoms";
import { COLOR, SHADOW } from "../../constants/style";
import { COMPANY_TYPES_LITERAL } from "../../constants/job";

import { ServerURL } from "../../api/ServerURL";
import { HandlerCompanyFavorite } from "../../api/CompanyApi";
import { ICompanyDataTypes } from "../../types/CompanyData";

interface ICorpBannerPropsType {
  corpId: string;
  companyData: ICompanyDataTypes;
}

function Banner({ corpId, companyData }: ICorpBannerPropsType) {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const cookie = getCookie("accessToken") as string;

  const [, setAlertMessage] = useAtom(activeAlert);

  const handlerFavorite = () => {
    HandlerCompanyFavorite(corpId as string, cookie)
      .then((res) => {
        mutate([`${ServerURL}/${corpId}`, cookie]);
        if (res.data.message === "성공") setAlertMessage("ADD_FAVORITE");
        if (res.data.message === "취소") setAlertMessage("UNFAVORITE");
      })
      .catch((res) => {
        if (res?.response?.status === 401) {
          setAlertMessage("NOT_LOGIN");
        } else if (res?.response?.status === 500) {
          setAlertMessage("SERVER");
        }
      });
  };

  return (
    <Container>
      <div className="corp-identified">
        <img src={companyData?.logo} alt={companyData?.name} />
        <div>
          <h1 id="corp-name">{companyData?.name}</h1>
          {companyData?.isCertified === "true" && (
            <i>
              <span className="a11y-hidden">현직자 검증 정보</span>
            </i>
          )}
        </div>
        <span className="corp-category">
          <span>{companyData?.isPublicStock ? "상장" : "비상장"}</span>
          <span>{COMPANY_TYPES_LITERAL[companyData?.classification]}</span>
        </span>
      </div>
      <div className="corp-buttons">
        <Button
          id="company-favorite-button"
          aria-label={`찜 등록 및 해제 버튼. ${
            companyData?.favorite || 0
          }명이 찜했습니다.`}
          icon={!!companyData?.isFavorite ? "heart_white_fill" : "heart"}
          isFavorite={!!companyData?.isFavorite}
          onClick={handlerFavorite}
        >
          {companyData?.favorite?.toLocaleString() || 0}
        </Button>
        <Button
          icon="site"
          aria-label="회사 사이트로 이동"
          onClick={() => router.push(companyData?.site || "")}
        >
          사이트
        </Button>
        <Button
          icon="recruit"
          aria-label="회사 채용 페이지로 이동"
          onClick={() => router.push(companyData?.recruitmentSite || "")}
        >
          채용정보
        </Button>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
  .corp-identified {
    display: flex;
    align-items: center;
    padding: 0 8px;
    gap: 8px;
    img {
      float: left;
      width: 48px;
      height: 48px;
      border: 1px solid #e4e4e4;
      border-radius: 12px;
      background-color: #fff;
      object-fit: cover;
    }
    div {
      display: flex;
      gap: 2px;
      align-items: center;
      #corp-name {
        font-weight: 600;
        font-size: 1.5rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      i {
        display: inline-block;
        width: 20px;
        height: 20px;
        background-image: url("/icons/verified.svg");
        background-size: 20px;
      }
    }
    .corp-category {
      white-space: nowrap;
      font-size: 0.95rem;
      opacity: 0.65;
      span {
        margin: 0 4px;
      }
    }
  }
  @media (max-width: 840px) {
    margin: 12px 0 20px;
    flex-direction: column;
    .corp-identified {
      width: 100%;
      padding: 12px;
      div {
        font-size: 1.35rem;
      }
      .corp-category {
        font-size: 0.9rem;
      }
    }
    .corp-buttons {
      display: flex;
      width: 100%;
      padding: 0 12px;
      gap: 8px;
      button:nth-of-type(2),
      button:nth-of-type(3) {
        flex: 1;
      }
    }
  }
  @media (max-width: 580px) {
    .corp-identified {
      padding: 8px 12px 20px;
      flex-direction: column;
    }
  }
`;

const Button = styled.button<{ icon: string; isFavorite?: boolean }>`
  position: relative;
  margin: 0 12px 0 0;
  padding: 12px 16px 12px 42px;
  min-width: 80px;
  background-color: #fff;
  border-radius: 28px;
  box-shadow: ${SHADOW.basic};
  background-color: ${(props) => (props.isFavorite ? COLOR.main : "none")};
  color: ${(props) => (props.isFavorite ? "#fff" : "none")};
  font-size: 0.95rem;
  font-weight: ${(props) => (props.isFavorite ? "500" : "none")};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  transition: all 0.3s;
  &::after {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    left: 18px;
    top: 50%;
    background-image: url(${(props) => `/icons/${props.icon}.svg`});
    background-size: 18px;
    background-repeat: no-repeat;
    background-position: center;
    transform: translateY(-50%);
  }
  &:hover {
    box-shadow: ${SHADOW.hover};
  }
  @media (max-width: 840px) {
    margin: 0;
  }
`;

export default Banner;
