import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import { getCookie } from "cookies-next";
import { useAtom } from "jotai";

import { JOB_TYPES } from "../../../constants/job";
import { COLOR, SHADOW } from "../../../constants/style";
import { AccountInfoEdit, fetcher, URL } from "../../../api/MyInfoApi";
import { IUserAccountSettingDataTypes } from "../../../types/UserData";
import { Title } from "../../../components/Layouts/partials/Title";
import { activeAlert } from "../../../atoms/atoms";

function Setting() {
  const token = getCookie("accessToken") as string;
  const router = useRouter();
  const [, setAlertMessage] = useAtom(activeAlert);
  const [isVisiblePwd, setIsVisiblePwd] = useState<boolean>(false);
  const [isChangePwd, setIsChangePwd] = useState<boolean>(false);
  const { data: accountData, error: accountError } = useSWR(
    [`${URL}/account/info`, token],
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const {
    register,
    unregister,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<IUserAccountSettingDataTypes>({ mode: "onChange" });

  const selectedJob = watch("job");
  const passwordValue = watch("password");

  const onSubmit = (data: IUserAccountSettingDataTypes) => {
    console.log(data);
    AccountInfoEdit(data, token)
      .then((res) => {
        setAlertMessage("EDIT_ACCOUNT_INFO");
        router.push("/");
      })
      .catch((res) => {
        if (res?.response?.status === 500) {
          setAlertMessage("SERVER");
        } else if (res?.response?.status === 401) {
          setAlertMessage("NOT_LOGIN");
        } else if (res?.response?.status === 400) {
          setAlertMessage("BAD_ACCOUNT_INFO");
        }
      });
  };

  useEffect(() => {
    reset({
      username: accountData?.username,
      email: accountData?.email,
      job: accountData?.job,
    });
  }, [accountData]);

  const showChangePwdBox = () => {
    if (isChangePwd) unregister("password");
    setIsChangePwd((prev) => !prev);
  };
  if (!accountError) {
    return (
      <Container>
        <Title title="개인정보 수정" />
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Message>
            이메일이나 비밀번호, 직업을
            <br />
            수정할 수 있습니다.
          </Message>
          <Label>
            <p>아이디</p>
            <span className="password-error-msg">수정불가</span>
            <input
              type="text"
              placeholder=" "
              autoFocus={true}
              {...register("username")}
              required
              disabled
            />
          </Label>
          <Label>
            <p>본인 확인을 위한 현재 비밀번호</p>
            <span className="password-error-msg">
              {errors?.password?.message}
            </span>
            <VisibilityPwd
              isVisiblePwd={isVisiblePwd}
              isValue={!!passwordValue}
              onClick={() => setIsVisiblePwd((prev) => !prev)}
            ></VisibilityPwd>
            <input
              type={isVisiblePwd ? "text" : "password"}
              placeholder=" "
              {...register("originPassword")}
              required
            />
          </Label>
          <button
            id="form-changePwd-button"
            type="button"
            onClick={showChangePwdBox}
          >
            비밀번호 변경
          </button>
          {isChangePwd && (
            <Label>
              <p>새 비밀번호</p>
              <span className="password-error-msg">
                {errors?.password?.message}
              </span>
              <VisibilityPwd
                isVisiblePwd={isVisiblePwd}
                isValue={!!passwordValue}
                onClick={() => setIsVisiblePwd((prev) => !prev)}
              ></VisibilityPwd>
              <input
                type={isVisiblePwd ? "text" : "password"}
                placeholder=" "
                minLength={10}
                {...register("password", {
                  pattern: {
                    value: /(?=.*[!@#$%~])[!@#$%~]/,
                    message: "특수문자 포함 필수",
                  },
                  minLength: { value: 10, message: "10자 이상 필수" },
                  onChange: () => {},
                })}
                required
              />
            </Label>
          )}
          <Label>
            <p>이메일</p>
            <input
              type="email"
              placeholder=" "
              {...register("email")}
              required
            />
          </Label>
          <Label job={selectedJob}>
            <p>직업</p>
            <select {...register("job")} required>
              <option value="">--- 직업 선택 ---</option>
              {JOB_TYPES.map((el) => (
                <option key={el.value} value={el.value}>
                  {el.name}
                </option>
              ))}
            </select>
          </Label>
          <Button type="submit">로그인</Button>
        </Form>
      </Container>
    );
  } else if (accountError?.response.data.status === 401) {
    router.push("/");
  }
}

const Container = styled.main`
  padding: 24px 24px 52px;
`;

const Form = styled.form`
  margin: 0 auto;
  max-width: 460px;
  #form-changePwd-button {
    display: block;
    margin: 0 auto 20px;
    padding: 8px 16px;
    border-radius: 8px;
    background-color: #999;
    color: #fff;
    opacity: 0.8;
    &:hover {
      opacity: 1;
    }
  }
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
  .password-error-msg {
    position: absolute;
    transition: opacity 0.3s;
    opacity: 0;
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
    .password-error-msg {
      display: block;
      top: 24px;
      right: 24px;
      text-align: right;
      color: ${COLOR.report};
      font-size: 0.9rem;
      opacity: 0.6;
    }
  }
`;

const VisibilityPwd = styled.i<{ isVisiblePwd: boolean; isValue: boolean }>`
  position: absolute;
  opacity: ${(props) => (props.isValue ? "1" : "0")};
  right: 28px;
  bottom: 20px;
  width: 2rem;
  height: 2rem;
  background-image: ${(props) =>
    `url(/icons/eye_visibility${props.isVisiblePwd ? "_off" : ""}.svg)`};
  background-repeat: no-repeat;
  background-position: center;
  transition: opacity 0.3s;
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

export default Setting;
