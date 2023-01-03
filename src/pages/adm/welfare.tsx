import React, { useEffect } from "react";
import styled from "@emotion/styled";
import useSWR from "swr";
import { getCookie } from "cookies-next";
import { useForm } from "react-hook-form";

import { IWelfareDataTypes } from "../../types/CompanyData";

import WelfareList from "../../components/Admin/WelfareList";
import { Title } from "../../components/Layouts/partials/Title";
import { COLOR } from "../../constants/style";
import { CreateWelfaresData, URL } from "../../api/CompanyApi";
import { fetcher } from "../../api/MyInfoApi";
import { GetServerSideProps } from "next";

interface IWelfarePagePropsType {
  corpId: string;
  type: "create" | "edit";
}

function Welfare({ corpId, type }: IWelfarePagePropsType) {
  const cookie = getCookie("accessToken") as string;
  const { data: companyData, error } = useSWR(`${URL}/${corpId}`, fetcher, {
    revalidateOnFocus: false,
  });
  const { data: roleData, error: roleError } = useSWR(
    [`${URL}/userRole`, cookie],
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const { register, handleSubmit, control, watch, reset } = useForm<{
    value: IWelfareDataTypes[];
  }>();
  useEffect(() => {
    // RHF은 최초 렌더링시에만 초기값을 설정하므로
    // 값을 받아온 이후에 다시 렌더링하도록 reset props를 사용
    reset(
      type === "edit" && companyData
        ? {
            value: [
              ...companyData.workingConditions,
              ...companyData.workSupport,
              ...companyData.offDutySupport,
              ...companyData.officeEnvironment,
            ],
          }
        : { value: [{ companyId: corpId }] }
    );
  }, [companyData]);

  const onSubmit = (data: { value: IWelfareDataTypes[] }) => {
    CreateWelfaresData(corpId, data.value, cookie, type).then((res) =>
      console.log(res)
    );
  };

  if (roleData?.roles === "ROLE_ADMIN") {
    return (
      <Container>
        <Title title={`복지 정보 작성`} />
        <Form onSubmit={handleSubmit(onSubmit)}>
          <CorpName>
            {corpId} {type}
          </CorpName>

          <WelfareList
            register={register}
            control={control}
            watch={watch}
            corpId={corpId}
          />

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

const CorpName = styled.h2`
  font-size: 2rem;
  font-weight: 500;
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
  const { id, type } = context.query;

  return {
    props: {
      corpId: id,
      type,
    },
  };
};

export default Welfare;
