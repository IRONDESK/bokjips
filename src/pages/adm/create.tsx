import React, { useState } from "react";
import styled from "@emotion/styled";
import { useForm, useFieldArray } from "react-hook-form";

import Banner from "../../components/Admin/Banner";
import WelfareCard from "../../components/Admin/WelfareCard";
import { ICompanyDataTypes } from "../../types/CompanyData";
import { COLOR } from "../../constants/style";
import { Title } from "../../components/Layouts/partials/Title";
import Head from "next/head";

function Create() {
  const { register, handleSubmit, control, watch, setValue } =
    useForm<ICompanyDataTypes>({
      defaultValues: {
        name: "",
        classification: "",
        isPublicStock: false,
        isInclusiveWage: "Y",
        wage: undefined,
        site: "",
        recruitmentSite: "",
        welfares: [
          {
            type: "",
            title: "",
            content: "",
            icon: "",
          },
        ],
      },
    });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "welfares",
    }
  );

  const onSubmit = (data: ICompanyDataTypes) => {
    console.log(data);
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
        <Banner register={register} />
        <WelfareList>
          {fields.map((field, index) => (
            <WelfareCard
              key={field.id}
              index={index}
              watch={watch}
              remove={remove}
              register={register}
            />
          ))}
        </WelfareList>
        <Button
          type="button"
          onClick={() =>
            append({
              type: "",
              title: "",
              content: "",
              icon: "",
            })
          }
        >
          추가
        </Button>
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
const Form = styled.form``;

const WelfareList = styled.ul`
  display: flex;
  gap: 12px;
  li {
    padding: 12px 16px;
    background-color: #fff;
    border-radius: 16px;
  }
`;

const Button = styled.button`
  padding: 12px 20px;
  background-color: ${COLOR.main};
  border-radius: 12px;
  color: #fff;
  font-size: 1.1rem;
`;

export default Create;
