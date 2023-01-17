import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useAtom } from "jotai";

import { COLOR } from "../../../constants/style";
import { Title } from "../../../components/Layouts/partials/Title";
import FindId from "../../../components/User/FindId";
import FindPassword from "../../../components/User/FindPassword";

import { activeAlert } from "../../../atoms/atoms";
import { FindIdAccount, ResetPasswordAccount } from "../../../api/MyInfoApi";
import { IFindAccountDtosType } from "../../../types/UserData";

function Find() {
  const router = useRouter();
  const [toggleToFind, setToggleToFind] = useState(true);
  const [, setAlertMessage] = useAtom(activeAlert);
  const { register, handleSubmit, watch } = useForm<IFindAccountDtosType>();

  const onSubmit = (data: IFindAccountDtosType) => {
    if (toggleToFind) {
      FindIdAccount(data)
        .then((res) => {
          router.push(`/user/find/success?id=${res.data.username}&type=ID`);
        })
        .catch((res) => {
          if (res?.response?.status === 400) {
            setAlertMessage("FIND_NODATA");
          } else if (res?.response?.status === 500) {
            setAlertMessage("SERVER");
          }
        });
    } else {
      ResetPasswordAccount(data)
        .then((res) =>
          router.push(`/user/find/success?id=${data.email}&type=PWD`)
        )
        .catch((res) => {
          if (res?.response?.status === 400) {
            setAlertMessage("FIND_NODATA");
          } else if (res?.response?.status === 500) {
            setAlertMessage("SERVER");
          }
        });
    }
  };

  useEffect(() => {
    if (router.query.type === "PWD") setToggleToFind(false);
  }, []);

  return (
    <Container>
      <Title title="아이디 및 비밀번호 찾기" />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Message>
          잃어버린 정보를 선택하세요
          <br />
          <Toggle
            type="button"
            nowPlace={toggleToFind}
            onClick={() => setToggleToFind(true)}
          >
            {toggleToFind && "✓ "}아이디
          </Toggle>
          <Toggle
            type="button"
            nowPlace={!toggleToFind}
            onClick={() => setToggleToFind(false)}
          >
            {!toggleToFind && "✓ "}비밀번호
          </Toggle>
        </Message>
        {toggleToFind ? (
          <FindId register={register} watch={watch} />
        ) : (
          <FindPassword register={register} watch={watch} />
        )}
        <Button type="submit">찾기</Button>
      </Form>
    </Container>
  );
}

const Container = styled.main`
  min-height: 70vh;
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
const Message = styled.div`
  margin: 0 0 16px;
  padding: 8px;
  line-height: 2.4rem;
  font-size: 1.7rem;
  font-weight: 600;
`;
const Toggle = styled.button<{ nowPlace: boolean }>`
  margin: 0 16px 0 0;
  padding: 0;
  font-size: 1.5rem;
  font-weight: ${(props) => (props.nowPlace ? 600 : 300)};
  opacity: ${(props) => (props.nowPlace ? 1 : 0.6)};
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

export default Find;
