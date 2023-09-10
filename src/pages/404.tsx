import React from "react";
import styled from "@emotion/styled";

import Prohibit404Icon from "../svg/Prohibit404Icon";
import { COLOR } from "../constants/style";

function Page404() {
  return (
    <Container>
      <Icon>
        <Prohibit404Icon width={76} />
        <strong>404</strong>
      </Icon>
      <p>잘못된 페이지 접근입니다</p>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 300px);
  gap: 20px;
  word-break: keep-all;
  p {
    font-size: 1.2rem;
  }
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  strong {
    font-size: 6rem;
    font-weight: 800;
  }
  svg {
    fill: ${COLOR.main};
  }
`;

export default Page404;
