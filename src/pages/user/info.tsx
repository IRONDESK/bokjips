import React from "react";
import styled from "@emotion/styled";
import useSWR from "swr";
import Link from "next/link";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";

import { COMPANY_TYPES_LITERAL } from "../../constants/job";
import { fetcher, URL } from "../../api/MyInfoApi";
import { ICompanyDataTypes } from "../../types/CompanyData";
import { SHADOW } from "../../constants/style";

interface IUserRolesType {
  username: string;
  roles: string;
}

function Info() {
  const router = useRouter();
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

  if (roleData) {
    return (
      <Container>
        <Banner>
          <strong>안녕하세요, {roleData?.username} 님</strong>
          <ul>
            <li>{USER_TYPE[roleData?.roles]}</li>
            <li>
              <button>정보수정</button>
              <button>탈퇴</button>
            </li>
          </ul>
        </Banner>
        <h2>내가 찜한 회사</h2>
        {favData && favData?.length > 0 ? (
          <FavList>
            {favData?.map((item) => (
              <Link href={`/corp/${item.companyId}`} key={item.companyId}>
                <li>
                  <img src={item.logo} alt={item.name} />
                  <strong>{item.name}</strong>
                  <span>{COMPANY_TYPES_LITERAL[item.classification]}</span>
                </li>
              </Link>
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
    margin: 8px 0 0;
    li {
      font-size: 0.9rem;
      button {
        opacity: 0.65;
      }
    }
  }
`;

const FavList = styled.ul`
  display: grid;
  margin: 0 0 32px;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  li {
    display: flex;
    align-items: center;
    padding: 12px 20px;
    background-color: #fff;
    border-radius: 12px;
    gap: 12px;
    transition: all 0.3s;
    box-shadow: ${SHADOW.basic};
    img {
      width: 40px;
      border-radius: 100%;
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
