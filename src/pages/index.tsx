import React from "react";
import styled from "@emotion/styled";
import useSWR from "swr";
import Link from "next/link";
import { useAtom } from "jotai";

import { keyFilter, selectedFilter, wageFilter } from "../atoms/atoms";
import { ICompanyDataTypes } from "../types/CompanyData";
import { fetcher, URL } from "../api/CompanyApi";

import CorpCard from "../components/Main/CorpCard";
import NoData from "../components/Layouts/NoData";

export default function Home() {
  const [nowKeyFilter] = useAtom(keyFilter);
  const [nowWageFilter] = useAtom(wageFilter);
  const [nowFilter] = useAtom(selectedFilter);

  let isParams =
    !!nowKeyFilter.keyword ||
    // !!nowKeyFilter.industry ||
    nowWageFilter > 0;
  // nowFilter.length > 0;

  function createParams() {
    let params = [];
    if (!!nowKeyFilter.keyword) params.push(`name=${nowKeyFilter.keyword}`);
    // if (!!nowKeyFilter.industry) yield `industry=${ nowKeyFilter.industry}`
    if (nowWageFilter > 0) params.push(`greaterThan=${nowWageFilter}`);
    // if (nowFilter) yield `filter=${nowFilter}`
    return params;
  }

  const { data, error } = useSWR(
    URL + (isParams ? `/search/${[...createParams()].join("&")}` : ""),
    fetcher,
    { revalidateOnFocus: false }
  );

  return (
    <Main>
      <p className="corp-length-count">
        {data?.length || 0}개
        {isParams ? "의 검색 결과" : " 기업의 복지를 확인하세요"}
      </p>
      {data?.length > 0 ? (
        <CardList>
          {data?.map((value: ICompanyDataTypes, idx: number) => (
            <Link key={idx} href={`/corp/${value?.companyId}`}>
              <CorpCard
                companyId={value?.companyId}
                name={value?.name}
                logo={value?.logo}
                classification={value?.classification}
                wage={value?.wage}
                isInclusiveWage={value?.isInclusiveWage}
                isPublicStock={value?.isPublicStock}
                numberOfEmployee={value?.numberOfEmployee}
                welfares={
                  [
                    ...(value?.workingConditions || []).slice(0, 3),
                    ...(value?.offDutySupport || []).slice(0, 2),
                    ...(value?.officeEnvironment || []).slice(0, 2),
                  ] || []
                }
                isCertified={value.isCertified}
                favorite={value?.favorite}
              />
            </Link>
          ))}
        </CardList>
      ) : (
        <NoData />
      )}
    </Main>
  );
}

const Main = styled.main`
  padding: 12px 24px 20px;
  .corp-length-count {
    margin: -2px 8px 8px;
    font-size: 0.9rem;
    letter-spacing: -0.35px;
    opacity: 0.8;
  }
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
