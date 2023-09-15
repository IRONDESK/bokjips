import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { useAtom } from "jotai";
import { useRouter } from "next/router";

import ListTop from "./ListTop";
import Pagination from "../Layouts/Pagination";
import NoData from "../Layouts/NoData";
import CardList from "./CardList";
import Loading from "../Layouts/Loading";
import {
  keyFilter,
  mainSortAsc,
  mainSortType,
  primarySelectedFilter,
  selectedFilter,
  wageFilter,
} from "../../atoms/atoms";
import { ServerURL } from "../../api/ServerURL";
import { fetcher } from "../../api/CompanyApi";
import { ICompanyDataPageListTypes } from "../../types/CompanyData";

function MainList() {
  const router = useRouter();
  const nowPage = router.query.page ? Number(router.query.page) - 1 : 0;

  const [keywordTmp, setKeywordTmp] = useState<string>("");
  const [sortType] = useAtom(mainSortType);
  const [isSortAsc] = useAtom(mainSortAsc);

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
    !isSortAsc ||
    sortType === "name";

  function createParams() {
    let params = [`greaterThan=${nowWageFilter}`];
    if (!!keywordTmp) params.push(`name=${keywordTmp}`);
    if (!!nowKeyFilter.industry) params.push(`classification=${nowKeyFilter.industry}`);
    if (nowPrimaryFilter.isCertified) params.push(`certified=true`);
    if (nowPrimaryFilter.inclusive) params.push(`inclusive=NO`);
    if (nowFilter.length > 0) params.push(`filter=${nowFilter.join(",")}`);
    if (!isSortAsc || sortType === "name") params.push(`sort=${sortType},${isSortAsc ? "ASC" : "DESC"}`);
    return params;
  }

  const { data, error } = useSWR<ICompanyDataPageListTypes>(
    ServerURL + (isParams ? `/search?page=${nowPage}&${[...createParams()].join("&")}` : `/?page=${nowPage}`),
    fetcher
  );

  useEffect(() => {
    if (!!error) router.push({ query: { page: 1 } });
  }, [error]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      return setKeywordTmp(nowKeyFilter.keyword);
    }, 600);
    return () => clearTimeout(debounce);
  }, [nowKeyFilter]);

  if (data && data.content.length > 0) {
    return (
      <>
        <ListTop totalCorp={data?.totalElements} />
        {data?.content.length > 0 ? <CardList data={data} /> : <NoData />}
        <Pagination nowPage={nowPage} empty={data?.empty} totalPages={data?.totalPages} />
      </>
    );
  } else if (!data && !error) {
    return <Loading />;
  } else {
    return <NoData code={error?.code} />;
  }
}

export default MainList;
