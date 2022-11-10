import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "@emotion/styled";

import { COLOR, SHADOW } from "../../../constants/style";
import SearchBar from "../../SearchBar";

function Header() {
  const [showUser, setShowUser] = useState(false);
  const router = useRouter();
  const path = router.pathname.split("/").slice(1);

  return (
    <Container>
      <Wrap>
        <Logo>
          <Link href="/">
            <strong>복지</strong>편살
          </Link>
        </Logo>
      </Wrap>
      <Wrap>
        {path[0] === "user" ? (
          <div className="none-searchbar"></div>
        ) : (
          <SearchBar />
        )}
      </Wrap>
      <Wrap>
        <User onClick={() => setShowUser(!showUser)}></User>
        {showUser && (
          <UserBox>
            <li>
              <Link href="/user/login">로그인</Link>
            </li>
            <li>
              <Link href="/user/join">회원가입</Link>
            </li>
          </UserBox>
        )}
      </Wrap>
    </Container>
  );
}

const Container = styled.header`
  display: flex;
  padding: 24px 32px;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 840px) {
    display: block;
    div:first-of-type {
      margin: 4px 0 16px;
      width: 100%;
      text-align: center;
    }
    div:last-of-type {
      position: absolute;
      top: 24px;
      right: 32px;
    }
  }
  @media (max-width: 580px) {
    padding: 24px 8px;
    div:nth-of-type(2) {
      transform: scale(0.8);
    }
  }
`;
const Wrap = styled.div`
  position: relative;
  flex: 1;
  &:last-of-type {
    text-align: right;
  }
  .none-searchbar {
    height: 53.5px;
  }
`;
const Logo = styled.h1`
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
  width: 144px;
  top: 50%;
  right: 36px;
  gap: 12px;
  transform: translateY(-50%);
  border-radius: 20px;
  background-color: #fff;
  box-shadow: ${SHADOW.basic};
  font-size: 0.95rem;
`;

export default Header;
