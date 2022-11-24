import React from "react";
import styled from "@emotion/styled";
import { COLOR, SHADOW } from "../../constants/style";
import { Title } from "../../components/Layouts/partials/Title";

function Login() {
  return (
    <Container>
      <Title title="로그인" />
      <Form>
        <Message>
          복잡한 복지 정보,
          <br />
          편하게 살펴보세요.
        </Message>
        <Label>
          <p>이메일</p>
          <input type="email" placeholder=" " autoFocus={true} required />
        </Label>
        <Label>
          <p>비밀번호</p>
          <input type="password" placeholder=" " required />
        </Label>
        <Button type="submit">로그인</Button>
      </Form>
    </Container>
  );
}

const Container = styled.main`
  padding: 24px;
`;

const Form = styled.form`
  margin: 0 auto;
  max-width: 460px;
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
