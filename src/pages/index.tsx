import React from "react";
import styled from "@emotion/styled";
import useSWR from "swr";
import Link from "next/link";
import { useAtom } from "jotai";

import {
  keyFilter,
  selectedFilter,
  primarySelectedFilter,
  wageFilter,
} from "../atoms/atoms";
import { ICompanyDataTypes } from "../types/CompanyData";
import { fetcher, URL } from "../api/CompanyApi";

import CorpCard from "../components/Main/CorpCard";
import NoData from "../components/Layouts/NoData";
import Loading from "../components/Layouts/Loading";

export default function Home() {
  const [nowKeyFilter] = useAtom(keyFilter);
  const [nowWageFilter] = useAtom(wageFilter);
  const [nowPrimaryFilter] = useAtom(primarySelectedFilter);
  const [nowFilter] = useAtom(selectedFilter);

  let isParams =
    !!nowKeyFilter.keyword ||
    !!nowKeyFilter.industry ||
    nowPrimaryFilter.inclusive ||
    nowPrimaryFilter.isCertified ||
    nowWageFilter > 0 ||
    nowFilter.length > 0;

  function createParams() {
    let params = [`greaterThan=${nowWageFilter}`];
    if (!!nowKeyFilter.keyword) params.push(`name=${nowKeyFilter.keyword}`);
    if (!!nowKeyFilter.industry)
      params.push(`classification=${nowKeyFilter.industry}`);
    if (nowPrimaryFilter.isCertified) params.push(`certified=true`);
    if (nowPrimaryFilter.inclusive) params.push(`inclusive=NO`);
    if (nowFilter.length > 0) params.push(`filter=${nowFilter.join(",")}`);
    return params;
  }

  const { data, error } = useSWR(
    URL + (isParams ? `/search?${[...createParams()].join("&")}` : ""),
    fetcher
  );

  if (data && data.length > 0) {
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
                      ...(value?.officeEnvironment || []).slice(0, 3),
                      ...(value?.workSupport || []).slice(0, 2),
                      ...(value?.offDutySupport || []).slice(0, 5),
                    ].slice(0, 7) || []
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
  } else if (!data && !error) {
    return <Loading />;
  } else {
    return <NoData code={error?.code} />;
  }
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
