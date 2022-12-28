import React from "react";
import styled from "@emotion/styled";
import Head from "next/head";
import { useForm } from "react-hook-form";

import { COLOR } from "../../constants/style";
import Banner from "../../components/Admin/Banner";
import { Title } from "../../components/Layouts/partials/Title";

import { ICompanyDataTypes } from "../../types/CompanyData";
import { CreateCompanyData } from "../../api/CompanyApi";

function Create() {
  const { register, handleSubmit, watch } = useForm<ICompanyDataTypes>({
    defaultValues: {
      name: "",
      classification: "",
      isPublicStock: false,
      isInclusiveWage: "Y",
      wage: undefined,
      site: "",
      recruitmentSite: "",
    },
  });

  const onSubmit = (data: ICompanyDataTypes) => {
    CreateCompanyData(data).then((res) => res.data);
  };

  return (
    <Container>
      <Title title="새 회사 작성" />
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,300,0,200"
        />
      </Head>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Banner watch={watch} register={register} />
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

export default Create;
