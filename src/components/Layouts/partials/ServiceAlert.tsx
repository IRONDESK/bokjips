import React from "react";
import styled from "@emotion/styled";
import { COLOR } from "../../../constants/style";
import { useAtom } from "jotai";

import { activeAlert } from "../../../atoms/atoms";

function ServiceAlert() {
  const [alertMessage, setAlertMessage] = useAtom(activeAlert);
  const MESSAGE_VALUES: { [key: string]: string[] } = {
    LOGIN: ["main", "로그인되었습니다."],
    LOGOUT: ["main", "로그아웃되었습니다."],
    JOIN: ["main", "회원가입이 완료 되었습니다."],
    COMMENT_DEL: ["main", "댓글이 삭제되었습니다."],
    SERVER: ["report", "서버 오류가 발생했습니다. 잠시후 다시 시도해주세요."],
    NOT_LOGIN: ["report", "로그인 후 이용 가능한 서비스입니다."],
    BAD_JOIN_ID: ["report", "중복된 아이디가 존재합니다."],
    BAD_JOIN_EMAIL: ["report", "중복된 이메일이 존재합니다."],
    ADD_FAVORITE: ["main", "찜하기가 설정되었습니다."],
    UNFAVORITE: ["main", "찜하기가 해제되었습니다."],
  };

  if (alertMessage !== "") {
    setTimeout(() => {
      setAlertMessage("");
    }, 2000);
  }

  return (
    <Container type={MESSAGE_VALUES[alertMessage][0]}>
      {MESSAGE_VALUES[alertMessage][1]}
    </Container>
  );
}

const Container = styled.div<{ type: string }>`
  position: sticky;
  top: 0;
  padding: 20px 32px;
  background-color: ${(props) =>
    props.type === "main" ? COLOR.check : COLOR.report};
  color: #fff;
  font-weight: 600;
  z-index: 9;
  @media (max-width: 840px) {
    padding: 20px;
  }
`;

export default ServiceAlert;
