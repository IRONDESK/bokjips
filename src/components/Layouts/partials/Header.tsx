import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import useSWR from "swr";

import { COLOR, SHADOW } from "../../../constants/style";
import { swrFetcher, URL } from "../../../api/MyInfoApi";
import {
  mainPagination,
  activeAlert,
  keyFilter,
  selectedFilter,
  primarySelectedFilter,
  wageFilter,
} from "../../../atoms/atoms";

import HeaderBar from "../../Navbar/HeaderBar";
import ServiceAlert from "./ServiceAlert";

function Header() {
  const router = useRouter();
  const cookie = getCookie("accessToken");
  const tokenAt = getCookie("tokenAt");
  const [showUser, setShowUser] = useState(false);

  const [alertMessage, setAlertMessage] = useAtom(activeAlert);

  const [, setNowMainPage] = useAtom(mainPagination);
  const [, setKeyFilter] = useAtom(keyFilter);
  const [, setWageFilter] = useAtom(wageFilter);
  const [, setPrimarySelectedFilter] = useAtom(primarySelectedFilter);
  const [, setSelectedFilter] = useAtom(selectedFilter);

  const { data: tokenCheck, error: tokenError } = useSWR(
    [`${URL}/check_token`, cookie],
    swrFetcher,
    {
      revalidateOnFocus: false,
      refreshInterval: cookie ? 100000 : 0,
    }
  );
  const path = router.pathname.split("/").slice(1);

  useEffect(() => {
    if (Number(new Date()) - Number(tokenAt) > 1700000 && cookie) {
      setAlertMessage("LOGOUT_EXPIRED_LESS");
    }
  }, [tokenCheck]);

  useEffect(() => {
    if (cookie && [400, 401].includes(tokenError?.response.status)) {
      setAlertMessage("LOGOUT_EXPIRED");
      deleteCookie("accessToken");
      deleteCookie("tokenAt");
      console.log("true");
    }
  }, [tokenError]);

  const handleLogout = () => {
    deleteCookie("accessToken");
    deleteCookie("tokenAt");
    setShowUser(false);
    setAlertMessage("LOGOUT");
  };

  const handleResetValues = () => {
    setNowMainPage(0);
    setKeyFilter({ keyword: "", industry: "" });
    setWageFilter(0);
    setPrimarySelectedFilter({ isCertified: false, inclusive: false });
    setSelectedFilter([]);
  };

  return (
    <>
      {alertMessage !== "" && <ServiceAlert />}
      <Container corp={path[0] === "corp"}>
        <Wrap id="header-logo">
          <Link
            href="/"
            role="button"
            aria-label="복지편살 메인 페이지"
            onClick={handleResetValues}
          >
            <Logo corp={path[0] === "corp"} />
          </Link>
        </Wrap>
        <Wrap id="searchfilter-bar">
          {path[0] === "" ? <HeaderBar /> : null}
        </Wrap>
        <Wrap id="header-user">
          <User
            id="user-controller"
            aria-label="사용자 설정"
            onClick={() => setShowUser(!showUser)}
          ></User>
          {showUser &&
            (cookie ? (
              <UserBox>
                <li onClick={() => setShowUser(false)}>
                  <Link href="/user/info">내정보</Link>
                </li>
                <li onClick={handleLogout}>로그아웃</li>
              </UserBox>
            ) : (
              <UserBox>
                <li onClick={() => setShowUser(false)}>
                  <Link href="/user/login">로그인</Link>
                </li>
                <li onClick={() => setShowUser(false)}>
                  <Link href="/user/join">회원가입</Link>
                </li>
              </UserBox>
            ))}
        </Wrap>
      </Container>
    </>
  );
}

const Container = styled.header<{ corp: boolean }>`
  position: relative;
  display: flex;
  height: 101.5px;
  padding: 24px 32px;
  justify-content: space-between;
  align-items: center;
  ${(props) => props.corp && `background-color:${COLOR.main};`}
  ${(props) => props.corp && `& h1 strong {color: #fff};`}
  ${(props) => props.corp && `& h1 {color: #fff};`}
  #searchfilter-bar {
    flex: 2.2;
  }
  @media (max-width: 840px) {
    display: block;
    padding: 20px 32px 24px;
    height: auto;
    #header-logo {
      margin: ${(props) => (props.corp ? 0 : " 4px 0 16px")};
      width: 100%;
      text-align: center;
    }
    #header-user {
      position: absolute;
      top: 34px;
      right: 32px;
    }
  }
  @media (max-width: 580px) {
    padding: 20px 8px 24px;
  }
`;
const Wrap = styled.div`
  position: relative;
  flex: 1;
  &:last-of-type {
    text-align: right;
  }
`;
const Logo = styled.div<{ corp: boolean }>`
  display: inline-block;
  width: 120px;
  height: 50px;
  background-image: ${(props) =>
    props.corp
      ? `url("/logo/bokjips_logotype.svg")`
      : `url("/logo/bokjips_logotype_color.svg")`};
  background-size: 120px;
  background-repeat: no-repeat;
  background-position: center;
  ${(props) => props.corp && ` filter: invert(1);`}
  @media (max-width: 840px) {
    margin: 0 auto;
  }
`;

const User = styled.button`
  width: 24px;
  height: 24px;
  background-image: url("/icons/face.svg");
  background-size: 24px;
  background-position: center;
`;
const UserBox = styled.ul`
  position: absolute;
  display: flex;
  justify-content: center;
  padding: 12px 16px;
  min-width: 148px;
  top: 50%;
  right: 36px;
  gap: 12px;
  transform: translateY(-50%);
  border-radius: 20px;
  background-color: #fff;
  box-shadow: ${SHADOW.basic};
  font-size: 0.95rem;
  li {
    cursor: pointer;
  }
`;

export default Header;
