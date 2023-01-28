import React, { useEffect, useState } from "react";
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
import { ServerURL } from "../api/ServerURL";
import { fetcher } from "../api/CompanyApi";

import CardList from "../components/Main/CardList";
import NoData from "../components/Layouts/NoData";
import Loading from "../components/Layouts/Loading";
import Pagination from "../components/Layouts/Pagination";
import { Title } from "../components/Layouts/partials/Title";

export default function Home() {
  const [sortParams, setSortParams] = useState("favorite");
  const [sortType, setSortType] = useState(true);
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
    nowFilter.length > 0 ||
    !sortType ||
    sortParams === "name";

  function createParams() {
    let params = [`greaterThan=${nowWageFilter}`];
    if (!!nowKeyFilter.keyword) params.push(`name=${nowKeyFilter.keyword}`);
    if (!!nowKeyFilter.industry)
      params.push(`classification=${nowKeyFilter.industry}`);
    if (nowPrimaryFilter.isCertified) params.push(`certified=true`);
    if (nowPrimaryFilter.inclusive) params.push(`inclusive=NO`);
    if (nowFilter.length > 0) params.push(`filter=${nowFilter.join(",")}`);
    if (!sortType || sortParams === "name")
      params.push(`sort=${sortParams},${sortType ? "ASC" : "DESC"}`);
    return params;
  }

  const { data, error } = useSWR(
    ServerURL +
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
        <Title />
        <ListTop>
          <p className="corp-length-count">
            {data?.totalElements || 0}개
            {isParams ? "의 검색 결과" : " 기업의 복지를 확인하세요"}
          </p>
          <ul className="corp-sort-type">
            <Sort
              isSorted={sortParams === "name"}
              onClick={() => {
                if (sortParams != "name") setSortParams("name");
                else {
                  setSortType((prev) => !prev);
                }
              }}
            >
              이름순 {sortParams === "name" ? (sortType ? "↑" : "↓") : ""}
            </Sort>
            <Sort
              isSorted={sortParams === "favorite"}
              onClick={() => {
                setSortParams("favorite");
                setSortType(true);
              }}
            >
              찜하기순
            </Sort>
          </ul>
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
  margin: 0 8px 12px;
  justify-content: space-between;
  font-size: 0.85rem;
  .corp-length-count {
    opacity: 0.8;
  }
`;

const Sort = styled.li<{ isSorted: boolean }>`
  cursor: pointer;
  display: inline-block;
  margin: 0 12px 0 0;
  opacity: ${(props) => (props.isSorted ? 1 : 0.6)};
  font-weight: ${(props) => (props.isSorted ? 600 : "none")};
  &:last-of-type {
    margin: 0;
  }
`;
