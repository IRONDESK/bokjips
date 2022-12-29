import React, { useState } from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/router";

import { COLOR, SHADOW } from "../../../constants/style";
import HeaderBar from "../../Navbar/HeaderBar";

function Header() {
  const router = useRouter();
  const path = router.pathname.split("/").slice(1);

  const cookie = getCookie("accessToken");
  const [showUser, setShowUser] = useState(false);

  const handleLogout = () => {
    deleteCookie("accessToken");
    router.reload();
  };

  return (
    <Container corp={path[0] === "corp"}>
      <Wrap id="header-logo">
        <Link href="/">
          <Logo>
            <strong>복지</strong>편살
          </Logo>
        </Link>
      </Wrap>
      <Wrap>{path[0] === "" ? <HeaderBar /> : null}</Wrap>
      <Wrap id="header-user">
        <User onClick={() => setShowUser(!showUser)}></User>
        {showUser &&
          (cookie ? (
            <UserBox>
              <li>
                <Link href="/user/info">내정보</Link>
              </li>
              <li onClick={handleLogout}>로그아웃</li>
            </UserBox>
          ) : (
            <UserBox>
              <li>
                <Link href="/user/login">로그인</Link>
              </li>
              <li>
                <Link href="/user/join">회원가입</Link>
              </li>
            </UserBox>
          ))}
      </Wrap>
    </Container>
  );
}

const Container = styled.header<{ corp: boolean }>`
  display: flex;
  height: 101.5px;
  padding: 24px 32px;
  justify-content: space-between;
  align-items: center;
  ${(props) => props.corp && `background-color:${COLOR.main};`}
  ${(props) => props.corp && `& h1 strong {color: #fff};`}
  ${(props) => props.corp && `& h1 {color: #fff};`}
  @media (max-width: 840px) {
    display: block;
    height: auto;
    #header-logo {
      margin: 4px 0 16px;
      width: 100%;
      text-align: center;
    }
    #header-user {
      position: absolute;
      top: 24px;
      right: 32px;
    }
  }
  @media (max-width: 580px) {
    padding: 24px 8px;
  }
`;
const Wrap = styled.div`
  position: relative;
  flex: 1;
  &:last-of-type {
    text-align: right;
  }
`;
const Logo = styled.h1`
  display: inline-block;
  font-family: "GangwonEdu";
  font-size: 2rem;
  strong {
    color: ${COLOR.main};
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
