import React, { useEffect } from "react";
import styled from "@emotion/styled";
import useSWR from "swr";
import { GetServerSideProps } from "next";
import { getCookie } from "cookies-next";
import { useForm } from "react-hook-form";
import { useAtom } from "jotai";
import { useRouter } from "next/router";

import { IWelfareDataTypes } from "../../types/CompanyData";

import { COLOR } from "../../constants/style";
import { activeAlert } from "../../atoms/atoms";
import { ServerURL } from "../../api/ServerURL";
import { CreateWelfaresData } from "../../api/CompanyApi";
import { swrFetcher } from "../../api/MyInfoApi";

import WelfareList from "../../components/Admin/WelfareList";
import { Title } from "../../components/Layouts/partials/Title";

interface IWelfarePagePropsType {
  corpId: string;
  type: "create" | "edit";
}

function Welfare({ corpId, type }: IWelfarePagePropsType) {
  const [, setAlertMessage] = useAtom(activeAlert);
  const cookie = getCookie("accessToken") as string;
  const router = useRouter();
  const { data: companyData, error } = useSWR(`${URL}/${corpId}`, swrFetcher, {
    revalidateOnFocus: false,
  });
  const { data: roleData, error: roleError } = useSWR(
    [`${ServerURL}/userRole`, cookie],
    swrFetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const { register, handleSubmit, control, watch, reset, setValue } = useForm<{
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
    CreateWelfaresData(corpId, data.value, cookie, type)
      .then((res) => {
        router.push(`/corp/${corpId}`);
        if (type === "create") setAlertMessage("SAVE_WELFARE");
        else if (type === "edit") setAlertMessage("EDIT_WELFARE");
      })
      .catch((res) => {
        if ([401, 400, 405].includes(res?.response?.status)) {
          setAlertMessage("NOT_LOGIN");
        } else if (res?.response?.status === 500) {
          setAlertMessage("SERVER");
        }
      });
  };

  const checkKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.code === "Enter") e.preventDefault();
  };

  if (roleData?.roles === "ROLE_ADMIN") {
    return (
      <Container>
        <Title title={`복지 정보 작성`} />
        <Form
          onSubmit={handleSubmit(onSubmit)}
          onKeyDown={(e) => checkKeyDown(e)}
        >
          <CorpName>
            {companyData?.name} <span>{type.toUpperCase()}</span>
          </CorpName>

          <WelfareList
            register={register}
            control={control}
            watch={watch}
            setValue={setValue}
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
  margin: 0 0 16px;
  font-size: 2rem;
  font-weight: 500;
  span {
    padding: 2px 4px;
    background-color: #000;
    border-radius: 4px;
    vertical-align: middle;
    color: #fff;
    font-size: 0.85rem;
    opacity: 0.7;
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
  const { id, type } = context.query;

  return {
    props: {
      corpId: id,
      type,
    },
  };
};

export default Welfare;
