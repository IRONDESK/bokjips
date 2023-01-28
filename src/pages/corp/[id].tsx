import React from "react";
import styled from "@emotion/styled";
import useSWR from "swr";
import { GetServerSideProps } from "next";
import { getCookie } from "cookies-next";
import { useAtom } from "jotai";

import { SHADOW } from "../../constants/style";
import { verticalSplited } from "../../atoms/atoms";

import { Title } from "../../components/Layouts/partials/Title";
import Banner from "../../components/Corp/Banner";
import Detail from "../../components/Corp/Detail";
import Comments from "../../components/Corp/Comments";
import NoData from "../../components/Layouts/NoData";
import EditButtons from "../../components/Corp/EditButtons";
import Loading from "../../components/Layouts/Loading";

import { URL, swrFetcher } from "../../api/MyInfoApi";

interface ICorpPropsType {
  corpId?: string;
  companyName?: string;
}

function CorpId({ corpId, companyName }: ICorpPropsType) {
  const cookie = getCookie("accessToken") as string;
  const [isSplited, setIsSplited] = useAtom(verticalSplited);

  const { data: companyData, error: companyError } = useSWR(
    [`${URL}/${corpId}`, cookie],
    swrFetcher
  );
  const { data: roleData, error: roleError } = useSWR(
    [`${URL}/userRole`, cookie],
    swrFetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const dateConvert = (target: Date | undefined) => {
    return new Intl.DateTimeFormat("ko-KR", {
      dateStyle: "long",
      timeStyle: "medium",
    }).format(target || 0);
  };

  return (
    <>
      <Title title={companyName} />
      {!!(companyData && !companyError) ? (
        <Container isSplited={isSplited}>
          <SideOne>
            <Banner corpId={corpId as string} companyData={companyData} />
            <Detail
              wage={companyData?.wage}
              isInclusiveWage={companyData?.isInclusiveWage}
              workingConditions={companyData?.workingConditions}
              workSupport={companyData?.workSupport}
              offDutySupport={companyData?.offDutySupport}
              officeEnvironment={companyData?.officeEnvironment}
            />
            <UpdateAtText>
              이 회사의 복지 정보는 {dateConvert(companyData?.updateAt)}{" "}
              수정되었습니다.
            </UpdateAtText>
            {roleData?.roles === "ROLE_ADMIN" && (
              <EditButtons companyId={corpId as string} />
            )}
          </SideOne>
          <SideTwo isSplited={isSplited}>
            <Vertical
              type="button"
              id="vertical-active"
              aria-label="좌우 화면 분리 버튼"
              onClick={() => setIsSplited(!isSplited)}
            ></Vertical>
            <Comments corpId={corpId as string} />
          </SideTwo>
        </Container>
      ) : !!(!companyData && companyError) ? (
        <NoData code={companyError?.response?.status} />
      ) : (
        <Loading />
      )}
    </>
  );
}

const Container = styled.main<{ isSplited: boolean }>`
  padding: 0 24px;
  display: ${(props) => (props.isSplited ? "flex" : "block")};
  justify-content: space-between;
  @media (max-width: 1125px) {
    display: block;
  }
  @media (max-width: 580px) {
    padding: 0 8px 20px;
  }
`;
const SideOne = styled.section`
  flex: 1;
`;
const SideTwo = styled.section<{ isSplited: boolean }>`
  ${(props) =>
    !props.isSplited &&
    `
  margin: 36px 0 0;
  padding: 36px 0;
  border-top: 1px solid #c8c8c8;`}
  @media (min-width: 1125px) {
    ${(props) =>
      props.isSplited &&
      `
  position: sticky;
  top: 0;
  margin: 0 -24px 0 0;
  padding: 40px 0 0;
  width: 320px;
  height: 100vh;
  background-color: #ffffff;
  overflow-y: scroll;
  #vertical-active {
    margin-right: 24px;
  }
`}
  }

  @media (max-width: 1125px) {
    margin: 36px 0 0;
    padding: 36px 0;
    border-top: 1px solid #c8c8c8;
  }
`;

const UpdateAtText = styled.p`
  margin: 8px 0;
  font-size: 0.65rem;
  text-align: center;
  opacity: 0.5;
`;

const Vertical = styled.button`
  position: absolute;
  right: 0;
  margin: -12px 40px 0 0;
  padding: 20px;
  background-color: #fff;
  background-image: url("/icons/vertical_split.svg");
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 28px;
  transition: all 0.3s;
  box-shadow: ${SHADOW.basic};
  &:hover {
    box-shadow: ${SHADOW.hover};
  }
  @media (max-width: 1125px) {
    visibility: hidden;
    opacity: 0;
  }
`;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const [companyData] = await Promise.all([swrFetcher(`${URL}/${id}`, "")]);

  return {
    props: {
      corpId: id,
      companyName: companyData.name,
      fallback: {
        [`${URL}/${id}`]: companyData,
      },
    },
  };
};

export default CorpId;
