import React from "react";
import styled from "@emotion/styled";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { COLOR } from "../../../constants/style";

interface IFindSuccessPropsType {
  id: string;
  type: "ID" | "PWD";
}

function Success({ id, type }: IFindSuccessPropsType) {
  const router = useRouter();
  const moveToLoginPage = (target: string) => {
    router.push(`/user/${target}`);
  };

  if (type && id) {
    return (
      <Container>
        <Message>
          {type === "ID" ? (
            <>
              입력하신 정보로
              <br />
              아이디를 찾았습니다.
            </>
          ) : (
            <>
              임시 비밀번호를
              <br />
              이메일로 발송했습니다.
            </>
          )}
        </Message>
        <Wrap>
          {type === "ID" ? "발견된 아이디" : "발송한 이메일"}
          <p>{id}</p>
        </Wrap>
        {type === "ID" && (
          <SubButton
            type="button"
            onClick={() => moveToLoginPage("find?type=PWD")}
          >
            비밀번호 찾기
          </SubButton>
        )}
        <Button type="button" onClick={() => moveToLoginPage("login")}>
          로그인
        </Button>
      </Container>
    );
  } else {
    router.push("/");
    return;
  }
}

const Container = styled.main`
  margin: 0 auto;
  max-width: 460px;
  min-height: 70vh;
  padding: 24px 24px 52px;
`;

const Message = styled.div`
  margin: 0 0 16px;
  padding: 8px;
  line-height: 2.4rem;
  font-size: 1.7rem;
  font-weight: 600;
`;

const Wrap = styled.article`
  margin: 0 0 32px;
  padding: 40px 28px;
  background-color: ${COLOR.lightgray};
  border-radius: 12px;
  text-align: center;
  white-space: pre-wrap;
  p {
    margin: 10px 0 0;
    padding: 10px 0 0;
    border-top: 1px solid #000;
    font-size: 1.25rem;
    font-weight: 500;
  }
`;

const SubButton = styled.button`
  margin: 0 0 20px;
  padding: 24px 0;
  width: 100%;
  background-color: #fff;
  border: 1px solid ${COLOR.main};
  color: ${COLOR.main};
  font-size: 1.15rem;
  border-radius: 12px;
  transition: all 0.3s;
  &:focus {
    outline: 2px solid #000;
  }
`;
const Button = styled.button`
  padding: 24px 0;
  width: 100%;
  background-color: ${COLOR.main};
  color: #fff;
  font-weight: 600;
  font-size: 1.15rem;
  border-radius: 12px;
  transition: all 0.3s;
  &:focus {
    outline: 2px solid #000;
  }
`;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id, type } = context.query;
  return {
    props: {
      id,
      type,
    },
  };
};

export default Success;
