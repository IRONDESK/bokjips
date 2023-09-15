import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import useSWR from "swr";

import { ServerURL } from "../../../api/ServerURL";
import { swrFetcher } from "../../../api/MyInfoApi";
import { activeAlert, keyFilter, selectedFilter, primarySelectedFilter, wageFilter } from "../../../atoms/atoms";

import ServiceAlert from "./ServiceAlert";
import HeaderBar from "../../Navbar/HeaderBar";
import FilterBar from "../../Navbar/FilterList";
import UserControl from "./UserControl";
import { BokjipsLogotype } from "../../../svg/BokjipsLogotype";

function Header() {
  const router = useRouter();
  const cookie = getCookie("accessToken");
  const tokenAt = getCookie("tokenAt");

  const [alertMessage, setAlertMessage] = useAtom(activeAlert);

  const [, setKeyFilter] = useAtom(keyFilter);
  const [, setWageFilter] = useAtom(wageFilter);
  const [, setPrimarySelectedFilter] = useAtom(primarySelectedFilter);
  const [, setSelectedFilter] = useAtom(selectedFilter);

  const { data: tokenCheck, error: tokenError } = useSWR([`${ServerURL}/check_token`, cookie], swrFetcher, {
    revalidateOnFocus: false,
    refreshInterval: cookie ? 100000 : 0,
    onErrorRetry: (error) => {
      if (error.status === 400) return;
    },
  });
  const path = router.pathname.split("/").slice(1);

  useEffect(() => {
    if (Number(new Date()) - Number(tokenAt) > 1700000 && cookie) {
      setAlertMessage("LOGOUT_EXPIRED_LESS");
    }
  }, [tokenCheck]);

  useEffect(() => {
    if (cookie && [400, 401].includes(tokenError?.response.status)) {
      setAlertMessage("LOGOUT_EXPIRED");
      deleteCookie("accessToken");
      deleteCookie("tokenAt");
      console.log("true");
    }
  }, [tokenError]);

  const handleResetValues = () => {
    setKeyFilter({ keyword: "", industry: "" });
    setWageFilter(0);
    setPrimarySelectedFilter({ isCertified: false, inclusive: false });
    setSelectedFilter([]);
  };

  return (
    <>
      {alertMessage !== "" && <ServiceAlert />}
      <Wrapper>
        <MenuItem>
          <div className="header-logo">
            <Link href="/" role="button" aria-label="복지편살 메인 페이지" onClick={handleResetValues}>
              <BokjipsLogotype width={100} height={32} />
            </Link>
          </div>
          {path[0] === "" && (
            <div className="header-filter">
              <HeaderBar />
            </div>
          )}
          <div className="header-user">
            <UserControl />
          </div>
        </MenuItem>
        {path[0] === "" && <FilterBar />}
      </Wrapper>
    </>
  );
}

const Wrapper = styled.header`
  position: sticky;
  display: flex;
  flex-direction: column;
  top: 0;
  padding: 12px 32px;
  background-color: #fff;
  box-shadow: 0 1px 5px 0 rgba(107, 119, 172, 0.2);
  z-index: 10;
  @media (max-width: 690px) {
    padding: 20px 24px 12px;
  }
`;

const MenuItem = styled.div`
  display: flex;
  width: 100%;
  min-height: 46px;
  align-items: center;
  justify-content: space-between;

  .header-filter {
    flex: 3;
  }
  .header-logo {
    flex: 1;
  }
  .header-user {
    display: flex;
    justify-content: flex-end;
    flex: 1;
  }

  @media (max-width: 690px) {
    min-height: 35px;
    gap: 16px 0;
    flex-wrap: wrap;
    .header-logo {
      flex: none;
    }
    .header-user {
      flex: none;
      width: 50%;
      display: flex;
      justify-content: flex-end;
    }
    .header-filter {
      flex: none;
      width: 100%;
      order: 3;
    }
  }
`;

export default Header;
