import React from "react";
import styled from "@emotion/styled";
import { COLOR } from "../../../constants/style";
import { useAtom } from "jotai";

import { activeAlert } from "../../../atoms/atoms";

function ServiceAlert() {
  const [alertMessage, setAlertMessage] = useAtom(activeAlert);
  const MESSAGE_VALUES: { [key: string]: string[] } = {
    LOGIN: ["main", "로그인되었습니다."],
    LOGOUT: ["report", "로그아웃되었습니다."],
    JOIN: ["main", "회원가입이 완료 되었습니다."],
    COMMENT_DEL: ["report", "댓글이 삭제되었습니다."],
    SERVER: ["report", "서버 오류가 발생했습니다. 잠시후 다시 시도해주세요."],
  };

  if (alertMessage !== "") {
    setTimeout(() => {
      setAlertMessage("");
    }, 2500);
  }

  return (
    <Container type={MESSAGE_VALUES[alertMessage][0]}>
      {MESSAGE_VALUES[alertMessage][1]}
    </Container>
  );
}

const Container = styled.div<{ type: string }>`
  padding: 20px 32px;
  background-color: ${(props) =>
    props.type === "main" ? COLOR.main : COLOR.report};
  color: #fff;
  font-weight: 600;
  @media (max-width: 840px) {
    padding: 20px;
  }
`;

export default ServiceAlert;
