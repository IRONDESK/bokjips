import React, { useEffect } from "react";
import styled from "@emotion/styled";
import useSWR from "swr";
import { useAtom } from "jotai";

import {
  mainPagination,
  keyFilter,
  selectedFilter,
  primarySelectedFilter,
  wageFilter,
} from "../atoms/atoms";
import { fetcher, URL } from "../api/CompanyApi";

import CardList from "../components/Main/CardList";
import NoData from "../components/Layouts/NoData";
import Loading from "../components/Layouts/Loading";
import Pagination from "../components/Layouts/Pagination";
import { COLOR } from "../constants/style";

export default function Home() {
  const [nowMainPage, setNowMainPage] = useAtom(mainPagination);
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
    URL +
      (isParams
        ? `/search?page=${nowMainPage}&${[...createParams()].join("&")}`
        : `/?page=${nowMainPage}`),
    fetcher
  );

  useEffect(() => {
    if (!!error) setNowMainPage(() => 0);
  }, [error]);

  if (data && data.content.length > 0) {
    return (
      <Main>
        <ListTop>
          <p className="corp-length-count">
            {data?.totalElements || 0}개
            {isParams ? "의 검색 결과" : " 기업의 복지를 확인하세요"}
          </p>
          <p className="corp-optional-legend">
            <i></i> 현직자 확인
          </p>
        </ListTop>
        {data?.content.length > 0 ? <CardList data={data} /> : <NoData />}
        <Pagination
          nowPage={nowMainPage}
          setNowPage={setNowMainPage}
          empty={data?.empty}
          totalPages={data?.totalPages}
        />
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
`;

const ListTop = styled.div`
  display: flex;
  margin: -8px 8px 12px;
  justify-content: space-between;
  font-size: 0.85rem;
  .corp-length-count {
    opacity: 0.8;
  }
  .corp-optional-legend {
    color: ${COLOR.check};
    opacity: 0.6;
    i {
      display: inline-block;
      width: 14px;
      height: 14px;
      background-color: ${COLOR.check};
      border-radius: 100%;
      color: #fff;
      font-size: 0.7rem;
      font-weight: 500;
      line-height: 14px;
      text-align: center;
      &::after {
        content: "✓";
      }
    }
  }
`;
