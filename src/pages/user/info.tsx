import React from "react";
import styled from "@emotion/styled";
import useSWR, { useSWRConfig } from "swr";
import Link from "next/link";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import { useAtom } from "jotai";

import { activeAlert } from "../../atoms/atoms";
import { fetcher, URL } from "../../api/MyInfoApi";
import { HandlerCompanyFavorite } from "../../api/CompanyApi";

import { COMPANY_TYPES_LITERAL } from "../../constants/job";
import { COLOR, SHADOW } from "../../constants/style";
import { ICompanyDataTypes } from "../../types/CompanyData";

interface IUserRolesType {
  username: string;
  roles: string;
}

function Info() {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const [, setAlertMessage] = useAtom(activeAlert);
  const cookie = getCookie("accessToken") as string;

  const USER_TYPE: { [key: string]: string } = {
    ROLE_USER: "일반회원",
    ROLE_ADMIN: "관리자",
  };

  const { data: roleData, error: roleError } = useSWR<IUserRolesType>(
    [`${URL}/userRole`, cookie],
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );
  const { data: favData, error: favError } = useSWR<ICompanyDataTypes[]>(
    [`${URL}/favorite`, cookie],
    fetcher
  );

  // 찜 해제
  const handlerFavorite = (companyId: string) => {
    HandlerCompanyFavorite(companyId as string, cookie)
      .then((res) => {
        mutate([`${URL}/favorite`, cookie]);
        // if (res.data.message === "성공") setAlertMessage("ADD_FAVORITE");
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

  if (roleData) {
    return (
      <Container>
        <Banner>
          <strong>안녕하세요, {roleData?.username} 님</strong>
          <ul>
            <li>{USER_TYPE[roleData?.roles]}</li>
            <li>
              {roleData?.roles === "ROLE_ADMIN" && (
                <button onClick={() => router.push("/adm/create")}>
                  회사작성
                </button>
              )}
              <button onClick={() => alert(`준비 중입니다.`)}>정보수정</button>
              <button onClick={() => alert(`준비 중입니다.`)}>탈퇴</button>
            </li>
          </ul>
        </Banner>
        <h2>내가 찜한 회사 ({favData?.length}개)</h2>
        {favData && favData?.length > 0 ? (
          <FavList>
            {favData?.map((item) => (
              <li key={item.companyId}>
                <Link href={`/corp/${item.companyId}`}>
                  <div className="fav-item-container">
                    <img src={item.logo} alt={item.name} />
                    <strong>{item.name}</strong>
                    <span>{COMPANY_TYPES_LITERAL[item.classification]}</span>
                  </div>
                </Link>
                <button onClick={() => handlerFavorite(item.companyId)}>
                  <span className="a11y-hidden">찜 해제</span>
                </button>
              </li>
            ))}
          </FavList>
        ) : (
          <Empty>
            <strong>찜한 회사가 없습니다</strong>
          </Empty>
        )}
      </Container>
    );
  } else if (!roleData && roleError) {
    router.push("/");
  }
}

const Container = styled.main`
  padding: 0 24px;
  h2 {
    margin: 24px 8px 12px;
    font-size: 1.15rem;
    font-weight: 500;
  }
`;
const Banner = styled.div`
  margin: 0 0 20px;
  padding: 28px;
  background-color: #d3d3d3;
  border-radius: 12px;
  strong {
    display: block;
    padding: 0 0 8px;
    font-weight: 600;
    font-size: 1.4rem;
    border-bottom: 1px solid #999;
  }
  ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 8px 0 0;
    li {
      font-size: 0.9rem;
      button {
        margin: 0 0 0 8px;
        padding: 2px 4px;
        background-color: #fff;
        border-radius: 4px;
        opacity: 0.65;
        font-size: 0.9rem;
        &:hover {
          font-weight: 600;
        }
      }
    }
  }
`;

const FavList = styled.ul`
  display: grid;
  margin: 0 0 32px;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  li {
    position: relative;
  }
  .fav-item-container {
    display: flex;
    align-items: center;
    margin: 0 16px 0 0;
    padding: 12px 24px 12px 16px;
    background-color: #fff;
    border-radius: 12px;
    gap: 12px;
    transition: all 0.3s;
    box-shadow: ${SHADOW.basic};
    img {
      width: 40px;
      height: 40px;
      border-radius: 100%;
      border: 1px solid ${COLOR.lightgray};
      object-fit: cover;
    }
    strong {
      font-size: 1.1rem;
      font-weight: 500;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    span {
      flex: 1;
      opacity: 0.8;
      font-size: 0.9rem;
      text-align: right;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    &:hover {
      box-shadow: ${SHADOW.hover};
    }
  }
  button {
    position: absolute;
    right: 0;
    top: 50%;
    width: 28px;
    height: 28px;
    padding: 3px 2px;
    transform: translateY(-50%);
    background-color: ${COLOR.main};
    border-radius: 100%;
    color: #fff;
    &::after {
      content: "close";
      font-size: 1.2rem;
      font-family: "Material Symbols Outlined";
    }
  }
  @media (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 690px) {
    gap: 12px;
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Empty = styled.div`
  margin: 32px 0 60px;
  text-align: center;
  font-size: 1rem;
  line-height: 1.55rem;
  strong {
    display: inline-block;
    margin: 8px 0 0;
    font-size: 1.1rem;
    font-weight: 500;
    word-break: keep-all;
  }
`;

export default Info;
