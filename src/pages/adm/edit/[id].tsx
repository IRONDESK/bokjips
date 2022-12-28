import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Head from "next/head";
import { GetServerSideProps } from "next";
import useSWR from "swr";
import { useForm } from "react-hook-form";

import { fetcher, URL } from "../../../api/CompanyApi";
import Banner from "../../../components/Admin/Banner";
import WelfareList from "../../../components/Admin/WelfareList";

import { ICompanyDataTypes } from "../../../types/CompanyData";
import { WELFARE_TYPES } from "../../../constants/job";
import { COLOR } from "../../../constants/style";
import { Title } from "../../../components/Layouts/partials/Title";

interface ICorpEditPropsType {
  corpId: string;
}

function Edit({ corpId }: ICorpEditPropsType) {
  const { data: companyData, error } = useSWR(`${URL}/${corpId}`, fetcher, {
    revalidateOnFocus: false,
  });
  const WELFARE_TYPES_ARR = [
    "workingConditions",
    "workSupport",
    "offDutySupport",
    "officeEnvironment",
  ];
  const { register, handleSubmit, control, watch, reset } =
    useForm<ICompanyDataTypes>({
      defaultValues: companyData,
    });

  useEffect(() => {
    // RHF은 최초 렌더링시에만 초기값을 설정하므로
    // 값을 받아온 이후에 다시 렌더링하도록 reset props를 사용
    reset(companyData);
  }, [companyData]);

  const onSubmit = (data: ICompanyDataTypes) => {
    console.log(data);
  };

  if (companyData) {
    return (
      <Container>
        <Title title={`회사 수정 - ${companyData?.name || ""}`} />
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,300,0,200"
          />
        </Head>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Banner companyData={companyData} watch={watch} register={register} />
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
  } else {
    return "Loading..";
  }
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  return {
    props: {
      corpId: id,
    },
  };
};

export default Edit;
