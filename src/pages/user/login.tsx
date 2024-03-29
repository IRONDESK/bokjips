import React from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAtom } from "jotai";

import { COLOR, SHADOW } from "../../constants/style";
import { Title } from "../../components/Layouts/partials/Title";

import { IUserLoginDataTypes } from "../../types/UserData";
import { MemberLogin } from "../../api/MemberApi";
import { activeAlert } from "../../atoms/atoms";

function Login() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<IUserLoginDataTypes>();
  const [, setAlertMessage] = useAtom(activeAlert);

  const onSubmitHandler: SubmitHandler<IUserLoginDataTypes> = (data) => {
    MemberLogin(data)
      .then((res) => {
        setCookie("accessToken", res.headers.authorization);
        setCookie("tokenAt", Number(new Date()));
        router.push("/");
        setAlertMessage("LOGIN");
      })
      .catch((res) => {
        if (res?.response?.data?.error === "Unauthorized") {
          setAlertMessage("LOGIN_ERR");
        } else {
          setAlertMessage("SERVER");
        }
      });
  };

  return (
    <Container>
      <Title title="로그인" />
      <Form onSubmit={handleSubmit(onSubmitHandler)}>
        <Message>
          복잡한 복지 정보,
          <br />
          편하게 살펴보세요.
        </Message>
        <Label>
          <p>아이디</p>
          <input
            type="text"
            placeholder=" "
            autoFocus={true}
            {...register("username")}
            required
          />
        </Label>
        <Label>
          <p>비밀번호</p>
          <input
            type="password"
            placeholder=" "
            {...register("password")}
            required
          />
        </Label>
        <Button type="submit">로그인</Button>
        <Find>
          <Link href="/user/find">아이디 및 비밀번호 찾기</Link>
        </Find>
      </Form>
    </Container>
  );
}

const Container = styled.main`
  padding: 24px 24px 52px;
`;

const Form = styled.form`
  margin: 0 auto;
  max-width: 460px;
  .login-error-msg {
    margin: 0 0 8px;
    color: ${COLOR.report};
    font-size: 1rem;
  }
`;
const Message = styled.p`
  margin: 0 0 16px;
  padding: 8px;
  font-size: 1.7rem;
  font-weight: 600;
  line-height: 2.4rem;
`;
const Label = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 0 24px;
  padding: 4px 28px;
  height: 96px;
  background-color: #fff;
  border-radius: 28px;
  color: #858585;
  transition: all 0.3s;
  p {
    transition: all 0.3s;
  }
  input {
    width: 0;
    height: 0;
    padding: 0;
    background-color: transparent;
    opacity: 0;
    font-size: 1px;
    transition: all 0.3s;
  }
  &:has(input:focus),
  &:has(input:not(:placeholder-shown)) {
    box-shadow: ${SHADOW.basic};
    p {
      font-size: 0.85rem;
    }
    input {
      width: 100%;
      height: auto;
      padding: 8px 0 0;
      opacity: 1;
      font-size: 1.1rem;
    }
  }
  &:has(input:focus) {
    box-shadow: ${SHADOW.hover};
  }
`;

const Find = styled.p`
  margin: 20px 0 0;
  text-align: center;
  font-size: 0.95rem;
  opacity: 0.6;
  &:hover {
    opacity: 1;
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

export default Login;
