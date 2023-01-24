import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import useSWR, { useSWRConfig } from "swr";
import { GetServerSideProps } from "next";
import { getCookie } from "cookies-next";
import { useAtom } from "jotai";
import { useRouter } from "next/router";

import { activeAlert, verticalSplited } from "../../atoms/atoms";

import { COLOR, SHADOW } from "../../constants/style";
import { Title } from "../../components/Layouts/partials/Title";
import Detail from "../../components/Corp/Detail";
import Comments from "../../components/Corp/Comments";
import NoData from "../../components/Layouts/NoData";
import EditButtons from "../../components/Corp/EditButtons";
import Loading from "../../components/Layouts/Loading";

import { ICompanyDataTypes } from "../../types/CompanyData";
import { COMPANY_TYPES_LITERAL } from "../../constants/job";
import { HandlerCompanyFavorite, URL } from "../../api/CompanyApi";
import { fetcher } from "../../api/MyInfoApi";

interface ICorpPropsType {
  corpId?: string;
  corpData: ICompanyDataTypes;
}

function CorpId({ corpId }: ICorpPropsType) {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const cookie = getCookie("accessToken") as string;
  const [, setAlertMessage] = useAtom(activeAlert);

  const [isSplited, setIsSplited] = useAtom(verticalSplited);
  const { data, error } = useSWR([`${URL}/${corpId}`, cookie], fetcher);
  const { data: roleData, error: roleError } = useSWR(
    [`${URL}/userRole`, cookie],
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const dateConvert = (target: Date | undefined) => {
    return new Intl.DateTimeFormat("ko-KR", {
      dateStyle: "long",
      timeStyle: "medium",
    }).format(target || 0);
  };

  const handlerFavorite = () => {
    HandlerCompanyFavorite(corpId as string, cookie)
      .then((res) => {
        mutate([`${URL}/${corpId}`, cookie]);
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
    <>
      <Title title={data?.name} />
      {!!(data && !error) ? (
        <Container isSplited={isSplited}>
          <SideOne>
            <Banner>
              <div className="corp-identified">
                <img src={data?.logo} alt={data?.name} />
                <div>
                  <h1 id="corp-name">{data?.name}</h1>
                  {data?.isCertified === "true" && (
                    <i>
                      <span className="a11y-hidden">현직자 검증 정보</span>
                    </i>
                  )}
                </div>
                <span className="corp-category">
                  <span>{data?.isPublicStock ? "상장" : "비상장"}</span>
                  <span>{COMPANY_TYPES_LITERAL[data?.classification]}</span>
                </span>
              </div>
              <div className="corp-buttons">
                <Button
                  id="company-favorite-button"
                  aria-label={`찜 등록 및 해제 버튼. ${
                    data?.favorite || 0
                  }명이 찜했습니다.`}
                  icon={!!data?.isFavorite ? "heart_white_fill" : "heart"}
                  isFavorite={!!data?.isFavorite}
                  onClick={handlerFavorite}
                >
                  {data?.favorite?.toLocaleString() || 0}
                </Button>
                <Button
                  icon="site"
                  aria-label="회사 사이트로 이동"
                  onClick={() => router.push(data?.site || "")}
                >
                  사이트
                </Button>
                <Button
                  icon="recruit"
                  aria-label="회사 채용 페이지로 이동"
                  onClick={() => router.push(data?.recruitmentSite || "")}
                >
                  채용정보
                </Button>
              </div>
            </Banner>
            <Detail
              wage={data?.wage}
              isInclusiveWage={data?.isInclusiveWage}
              workingConditions={data?.workingConditions}
              workSupport={data?.workSupport}
              offDutySupport={data?.offDutySupport}
              officeEnvironment={data?.officeEnvironment}
            />
            <UpdateAtText>
              이 회사의 복지 정보는 {dateConvert(data?.updateAt)}{" "}
              수정되었습니다.
            </UpdateAtText>
            {roleData?.roles === "ROLE_ADMIN" && (
              <EditButtons companyId={corpId as string} />
            )}
          </SideOne>
          <SideTwo isSplited={isSplited}>
            <Vertical
              type="button"
              id="vertical-active"
              aria-label="좌우 화면 분리 버튼"
              onClick={() => setIsSplited(!isSplited)}
            ></Vertical>
            <Comments corpId={corpId as string} />
          </SideTwo>
        </Container>
      ) : !!(!data && error) ? (
        <NoData code={error?.response?.status} />
      ) : (
        <Loading />
      )}
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

const UpdateAtText = styled.p`
  margin: 8px 0;
  font-size: 0.65rem;
  text-align: center;
  opacity: 0.5;
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
    visibility: hidden;
    opacity: 0;
  }
`;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  return {
    props: {
      corpId: id,
    },
  };
};

export default CorpId;
