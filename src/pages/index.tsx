import React from "react";
import styled from "@emotion/styled";
import useSWR from "swr";
import Link from "next/link";

import CorpCard from "../components/Main/CorpCard";
import { fetcher, URL } from "../api/CompanyApi";
import { ICompanyDataTypes } from "../types/CompanyData";

export default function Home() {
  const { data, error } = useSWR(URL, fetcher, { revalidateOnFocus: false });

  return (
    <Main>
      <CardList>
        {data?.map((value: ICompanyDataTypes, idx: number) => (
          <Link key={idx} href={`/corp/${value?.companyId}`}>
            <CorpCard
              companyId={value?.companyId}
              name={value?.name}
              classification={value?.classification}
              wage={value?.wage}
              isInclusiveWage={value?.isInclusiveWage}
              isPublicStock={value?.isPublicStock}
              numberOfEmployee={value?.numberOfEmployee}
              recruitmentSite={value?.recruitmentSite}
              site={value?.site}
              welfares={
                [
                  ...(value?.workingConditions || []).slice(0, 3),
                  ...(value?.offDutySupport || []).slice(0, 2),
                  ...(value?.officeEnvironment || []).slice(0, 2),
                ] || []
              }
              logo={value?.logo}
              isCertified={value.isCertified}
              favorite={value?.favorite}
            />
          </Link>
        ))}
      </CardList>
    </Main>
  );
}

const Main = styled.main`
  padding: 12px 24px 20px;
`;

const CardList = styled.section`
  display: grid;
  padding: 0 0 32px;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  grid-column: 1/3;
  @media (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 690px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
