import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import useSWR from "swr";
import { useAtom } from "jotai";

import { mainPagination, keyFilter, selectedFilter, primarySelectedFilter, wageFilter } from "../atoms/atoms";
import { ServerURL } from "../api/ServerURL";
import { fetcher } from "../api/CompanyApi";

import CardList from "../components/Main/CardList";
import NoData from "../components/Layouts/NoData";
import Loading from "../components/Layouts/Loading";
import Pagination from "../components/Layouts/Pagination";
import { Title } from "../components/Layouts/partials/Title";
import { COLOR } from "../constants/style";

export default function Home() {
  const [keywordTmp, setKeywordTmp] = useState<string>("");
  const [sortParams, setSortParams] = useState<string>("favorite");
  const [sortType, setSortType] = useState<boolean>(true);

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
    if (!!keywordTmp) params.push(`name=${keywordTmp}`);
    if (!!nowKeyFilter.industry) params.push(`classification=${nowKeyFilter.industry}`);
    if (nowPrimaryFilter.isCertified) params.push(`certified=true`);
    if (nowPrimaryFilter.inclusive) params.push(`inclusive=NO`);
    if (nowFilter.length > 0) params.push(`filter=${nowFilter.join(",")}`);
    if (!sortType || sortParams === "name") params.push(`sort=${sortParams},${sortType ? "ASC" : "DESC"}`);
    return params;
  }

  const { data, error } = useSWR(
    ServerURL + (isParams ? `/search?page=${nowMainPage}&${[...createParams()].join("&")}` : `/?page=${nowMainPage}`),
    fetcher
  );

  useEffect(() => {
    if (!!error) setNowMainPage(() => 0);
  }, [error]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      return setKeywordTmp(nowKeyFilter.keyword);
    }, 600);
    return () => clearTimeout(debounce);
  }, [nowKeyFilter]);

  if (data && data.content.length > 0) {
    return (
      <Container>
        <Title />
        <ListTop>
          <p className="corp-length-count">{data?.totalElements || 0}개 기업의 복지 정보</p>
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
              회사명순 {sortParams === "name" ? (sortType ? "▲" : "▼") : ""}
            </Sort>
            <Sort
              isSorted={sortParams === "favorite"}
              onClick={() => {
                setSortParams("favorite");
                setSortType(true);
              }}
            >
              찜많은순
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
      </Container>
    );
  } else if (!data && !error) {
    return <Loading />;
  } else {
    return <NoData code={error?.code} />;
  }
}

const Container = styled.main`
  padding: 12px 20px 20px;
`;

const ListTop = styled.div`
  display: flex;
  margin: 0 8px 12px;
  justify-content: space-between;
  font-size: 0.9rem;
  .corp-length-count {
    display: inline-flex;
    align-items: center;
    opacity: 0.8;
  }
  .corp-sort-type {
    display: flex;
    gap: 8px;
  }
`;

const Sort = styled.li<{ isSorted: boolean }>`
  cursor: pointer;
  display: inline-block;
  padding: 6px 10px;
  background-color: ${(props) => (props.isSorted ? COLOR.main : "#696969")};
  opacity: ${(props) => (props.isSorted ? 1 : 0.45)};
  border-radius: 8px;
  color: #fff;
  font-size: 0.8rem;
  font-weight: 600;
`;
