import React from "react";
import styled from "@emotion/styled";
import Head from "next/head";
import { useForm } from "react-hook-form";

import { ICompanyWelfaresTypes } from "../../types/CompanyData";
import { WELFARE_TYPES } from "../../constants/job";
import WelfareList from "../../components/Admin/WelfareList";
import { Title } from "../../components/Layouts/partials/Title";
import { COLOR } from "../../constants/style";

function welfare() {
  const { register, handleSubmit, control, watch } =
    useForm<ICompanyWelfaresTypes>({
      defaultValues: {
        companyId: ",",
        workingConditions: [{ type: "근무 조건" }],
        workSupport: [{ type: "근무 지원" }],
        offDutySupport: [{ type: "근무 외 지원" }],
        officeEnvironment: [{ type: "사내 환경" }],
      },
    });

  const WELFARE_TYPES_ARR = [
    "workingConditions",
    "workSupport",
    "offDutySupport",
    "officeEnvironment",
  ];

  const onSubmit = (data: ICompanyWelfaresTypes) => {
    console.log(data);
  };

  return (
    <Container>
      <Title title={`복지 정보 작성`} />
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,300,0,200"
        />
      </Head>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {WELFARE_TYPES_ARR.map((item, idx) => (
          <>
            <h3>{WELFARE_TYPES[item]}</h3>
            <WelfareList
              key={idx}
              register={register}
              control={control}
              watch={watch}
              typeName={item}
            />
          </>
        ))}
        <Button type="submit">저장</Button>
      </Form>
    </Container>
  );
}

const Container = styled.main`
  padding: 0 24px;
  @media (max-width: 1125px) {
    display: block;
  }
  @media (max-width: 580px) {
    padding: 0 8px 20px;
  }
`;
const Form = styled.form`
  h3 {
    margin: 20px 0 8px;
    font-size: 1.35rem;
    font-weight: 600;
  }
`;

const Button = styled.button`
  width: 100%;
  margin: 24px 0;
  padding: 16px 20px;
  background-color: ${COLOR.main};
  border-radius: 12px;
  color: #fff;
  font-size: 1.1rem;
  &:hover {
    opacity: 0.8;
  }
`;

export default welfare;
