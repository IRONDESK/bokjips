import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { COLOR, SHADOW } from "../../constants/style";
import { Title } from "../../components/Layouts/partials/Title";
import { useForm } from "react-hook-form";
import { IUserDataTypes } from "../../types/UserData";

function Join() {
  const {
    register,
    handleSubmit,
    watch,
    setFocus,
    formState: { errors },
  } = useForm<IUserDataTypes>({ mode: "onChange" });
  const selectedJob = watch("job");
  useEffect(() => {
    setFocus("username");
  }, []);

  const onSubmit = (data: IUserDataTypes) => {
    console.log(data);
  };
  return (
    <Container>
      <Title title="회원가입" />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Message>
          복지편살과 함께
          <br />
          기업정보를 편하게 살펴보세요.
        </Message>
        <Label>
          <p>이메일</p>
          <input
            type="email"
            placeholder=" "
            autoFocus={true}
            {...register("username")}
            required
          />
        </Label>
        <Label>
          <p>비밀번호</p>
          <div>{errors?.password?.message}</div>
          <input
            type="password"
            placeholder=" "
            {...register("password", {
              pattern: {
                value: /(?=.*[!@#$%])[!@#$%]/,
                message: "특수문자 포함 필수",
              },
              minLength: { value: 10, message: "10자 이상 필수" },
              onChange: () => {},
            })}
            required
          />
        </Label>
        <Label>
          <p>닉네임</p>
          <input
            type="text"
            placeholder=" "
            {...register("nickname")}
            required
          />
        </Label>
        <Label job={selectedJob}>
          <p>직업</p>
          <select {...register("job")} required>
            <option value="">--- 직업 선택 ---</option>
            <option value="develop">개발</option>
            <option value="business">경영·전략</option>
            <option value="media">마케팅·미디어</option>
            <option value="design">디자인</option>
            <option value="sales">영업</option>
            <option value="service">고객서비스</option>
            <option value="hr">HR</option>
            <option value="engineer">엔지니어링</option>
            <option value="finance">금융</option>
            <option value="logistics">물류</option>
            <option value="manufacture">제조·생산</option>
            <option value="edu">교육</option>
            <option value="medical">의료·제약</option>
            <option value="food">식·음료</option>
            <option value="law">법률</option>
            <option value="construction">건설</option>
            <option value="public">공공·복지</option>
          </select>
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
const Label = styled.label<{ job?: string }>`
  position: relative;
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
  input,
  select {
    width: 0;
    height: 0;
    padding: 0;
    background-color: transparent;
    opacity: 0;
    font-size: 1px;
    transition: all 0.3s;
    border: none;
    outline: none;
    appearance: none;
  }
  div {
    display: none;
  }
  &:has(input:focus),
  &:has(input:not(:placeholder-shown)),
  &:has(select:focus)
    ${(props) => (props.job === "" || !props.job ? "" : ", &:has(select)")} {
    box-shadow: ${SHADOW.basic};
    p {
      font-size: 0.85rem;
    }
    input,
    select {
      width: 100%;
      height: auto;
      padding: 8px 0 0;
      opacity: 1;
      font-size: 1.1rem;
    }
  }
  &:has(input:focus),
  &:has(select:focus) {
    box-shadow: ${SHADOW.hover};
    div {
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      padding: 24px;
      text-align: right;
      color: ${COLOR.report};
      font-size: 0.95rem;
      opacity: 0.6;
    }
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

export default Join;
