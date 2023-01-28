import React from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import { useForm } from "react-hook-form";
import useSWR from "swr";

import { COLOR } from "../../constants/style";
import Banner from "../../components/Admin/Banner";
import { Title } from "../../components/Layouts/partials/Title";

import { ICompanyDataTypes } from "../../types/CompanyData";
import { ServerURL } from "../../api/ServerURL";
import { CreateCompanyData } from "../../api/CompanyApi";
import { swrFetcher } from "../../api/MyInfoApi";

function Create() {
  const router = useRouter();
  const { register, handleSubmit, watch } = useForm<ICompanyDataTypes>();
  const cookie = getCookie("accessToken") as string;

  const { data: roleData, error: roleError } = useSWR(
    [`${ServerURL}/userRole`, cookie],
    swrFetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const onSubmit = (data: ICompanyDataTypes) => {
    CreateCompanyData(data, cookie)
      .then((res) => {
        console.log(res.data);
        alert(
          `회사 정보가 등록되었습니다.\n상세 복지 정보 입력 페이지로 이동합니다.`
        );
        router.push(`/adm/welfare?id=${res.data.companyId}&type=create`);
      })
      .catch((res) => {
        console.log("err", res.data);
      });
  };

  if (roleData?.roles === "ROLE_ADMIN") {
    return (
      <Container>
        <Title title="새 회사 작성" />
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Banner watch={watch} register={register} />
          <Button type="submit">저장</Button>
        </Form>
      </Container>
    );
  } else {
    return <div>권한 없음</div>;
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

export default Create;
