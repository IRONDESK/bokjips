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
import { VerifiedIcon } from "../../svg/CardIcons";

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
        <img className="corp-logo-image" src={companyData?.logo} alt={companyData?.name} />
        <NameBox>
          <div className="corp-title">
            <h1 className="corp-name">{companyData?.name}</h1>
            <p className="verified-icon">{companyData?.isCertified === "true" && <VerifiedIcon width={24} />}</p>
          </div>
          <div className="corp-category">
            <span>{companyData?.isPublicStock ? "상장" : "비상장"}</span>
            <span>{COMPANY_TYPES_LITERAL[companyData?.classification]}</span>
          </div>
        </NameBox>
      </div>
      <div className="corp-buttons">
        <Button
          id="company-favorite-button"
          aria-label={`찜 등록 및 해제 버튼. ${companyData?.favorite || 0}명이 찜했습니다.`}
          icon={!!companyData?.isFavorite ? "heart_white_fill" : "heart"}
          isFavorite={!!companyData?.isFavorite}
          onClick={handlerFavorite}
        >
          {companyData?.favorite?.toLocaleString() || 0}
        </Button>
        <Button icon="site" aria-label="회사 사이트로 이동" onClick={() => router.push(companyData?.site || "")}>
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

const NameBox = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  .corp-title {
    display: flex;
    align-items: center;
    gap: 4px;
    .corp-name {
      font-weight: 600;
      font-size: 1.5rem;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .verified-icon {
      cursor: help;
      position: relative;
      display: inline-flex;
      align-items: center;
      &:hover::after {
        content: "회사 현직자가 확인한 복지 정보";
        position: absolute;
        display: inline-block;
        padding: 6px 8px;
        width: max-content;
        top: 30px;
        left: -4px;
        background-color: #fff;
        border: 1px solid ${COLOR.gray1};
        border-radius: 4px;
        color: ${COLOR.gray};
        font-size: 0.9rem;
        z-index: 1;
      }
      &:hover::before {
        content: "";
        position: absolute;
        width: 8px;
        height: 8px;
        top: 26px;
        left: 8px;
        background-color: #fff;
        border-top: 1px solid ${COLOR.gray1};
        border-left: 1px solid ${COLOR.gray1};
        transform: rotate(45deg);
        z-index: 2;
      }
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
  @media (max-width: 580px) {
    gap: 6px;
    flex-direction: column;
    align-items: flex-start;

    .corp-category {
      display: inline-flex;
      gap: 10px;
      span {
        margin: 0;
      }
    }
    .verified-icon {
      cursor: default !important;
      overflow: hidden;
      &:hover::before,
      &:hover::after {
        content: "";
        display: none;
      }
    }
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 -24px 16px;
  padding: 20px 32px;
  background-color: ${COLOR.lightgray};
  .corp-identified {
    display: flex;
    align-items: center;
    padding: 0 8px;
    gap: 12px;
    .corp-logo-image {
      float: left;
      width: 68px;
      height: 52px;
      border-radius: 8px;
      background-color: #000;
      object-fit: cover;
    }
  }
  @media (max-width: 840px) {
    margin: 0 -24px 16px;
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
    padding: 24px 12px 20px;
    margin: 0 -8px 16px;
    .corp-identified {
      padding: 0 12px 20px;
    }
  }
`;

const Button = styled.button<{ icon: string; isFavorite?: boolean }>`
  position: relative;
  margin: 0 12px 0 0;
  padding: 12px 14px 12px 38px;
  min-width: 72px;
  background-color: #fff;
  border-radius: 16px;
  border: 1px solid ${({ isFavorite }) => (isFavorite ? COLOR.mainDark : COLOR.lightgray)};
  background-color: ${({ isFavorite }) => (isFavorite ? COLOR.main : "none")};
  color: ${({ isFavorite }) => (isFavorite ? "#fff" : "none")};
  font-size: 0.9rem;
  font-weight: ${({ isFavorite }) => (isFavorite ? "500" : "none")};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  transition: all 0.3s;
  &::after {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    left: 13px;
    top: 50%;
    background-image: url(${(props) => `/icons/${props.icon}.svg`});
    background-size: 18px;
    background-repeat: no-repeat;
    background-position: center;
    transform: translateY(-50%);
  }
  &:hover {
    filter: brightness(1.1);
  }
  @media (max-width: 840px) {
    margin: 0;
  }
`;

export default Banner;
