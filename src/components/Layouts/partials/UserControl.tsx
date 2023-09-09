import React, { useState } from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { useAtom } from "jotai";
import { deleteCookie, getCookie } from "cookies-next";

import { activeAlert } from "../../../atoms/atoms";
import { UserIcon512 } from "../../../svg/HeaderIcons";

function UserControl() {
  const [showUser, setShowUser] = useState(false);
  const [, setAlertMessage] = useAtom(activeAlert);
  const cookie = getCookie("accessToken");

  const handleLogout = () => {
    deleteCookie("accessToken");
    deleteCookie("tokenAt");
    setShowUser(false);
    setAlertMessage("LOGOUT");
  };

  return (
    <User id="user-controller" aria-label="사용자 설정" onClick={() => setShowUser((prev) => !prev)}>
      <UserIcon512 width={32} />
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
    </User>
  );
}

const User = styled.button`
  position: relative;
  padding: 0;
`;
const UserBox = styled.ul`
  position: absolute;
  display: flex;
  justify-content: center;
  padding: 12px 16px;
  min-width: 148px;
  top: 50%;
  right: 36px;
  gap: 20px;
  transform: translateY(-50%);
  border-radius: 20px;
  background-color: #fff;
  font-size: 0.95rem;
  li {
    cursor: pointer;
  }
`;

export default UserControl;
