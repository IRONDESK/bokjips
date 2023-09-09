import React from "react";
import styled from "@emotion/styled";
import { useAtom } from "jotai";

import { COLOR, SHADOW } from "../../constants/style";
import { keyFilter, primarySelectedFilter, selectedFilter, selectedModal, wageFilter } from "../../atoms/atoms";
import FilterList from "./FilterList";
import { COMPANY_TYPES } from "../../constants/job";
import { FilterIcon512, RocketIcon512, SearchIcon512 } from "../../svg/HeaderIcons";

function HeaderBar() {
  const [, setShowFilter] = useAtom(selectedModal);
  const [nowKeyFilter, setNowKeyFilter] = useAtom(keyFilter);
  const [nowWageFilter] = useAtom(wageFilter);
  const [nowPrimaryFilter] = useAtom(primarySelectedFilter);
  const [nowFilter] = useAtom(selectedFilter);

  const FILTER_COUNT =
    nowFilter.length +
    (nowWageFilter > 0 ? 1 : 0) +
    (nowPrimaryFilter.inclusive ? 1 : 0) +
    (nowPrimaryFilter.isCertified ? 1 : 0);

  return (
    <Container>
      <Wrap as="label" isValid={nowKeyFilter.keyword !== ""}>
        <SearchIcon512 width={20} />
        <input
          id="header-keyword"
          type="text"
          placeholder="회사명으로 찾기"
          role="search"
          value={nowKeyFilter.keyword}
          onChange={(e) =>
            setNowKeyFilter((prev) => {
              return { ...prev, keyword: e.target.value };
            })
          }
        />
      </Wrap>
      <Wrap isValid={nowKeyFilter.industry !== ""}>
        <RocketIcon512 width={20} />
        <select
          id="header-industry"
          value={nowKeyFilter.industry}
          onChange={(e) =>
            setNowKeyFilter((prev) => {
              return { ...prev, industry: e.target.value };
            })
          }
        >
          <option value="">전체산업</option>
          {COMPANY_TYPES.map((el) => (
            <option key={el.value} value={el.value}>
              {el.name}
            </option>
          ))}
        </select>
      </Wrap>
      <FilterWrap isValid={FILTER_COUNT > 0} onClick={() => setShowFilter((prev) => !prev)}>
        <FilterIcon512 width={22} />
        <button type="button">
          {FILTER_COUNT}개<span className="a11y-hidden">의 필터</span>
        </button>
      </FilterWrap>
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  justify-content: center;
  @media (max-width: 690px) {
    margin: 0 -8px;
    padding: 0 0 8px;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 12px 8px;
    label {
      margin: 0;
      width: 100%;
    }
  }
`;

const Wrap = styled.div<{ isValid: boolean }>`
  cursor: pointer;
  display: flex;
  gap: 8px;
  padding: 4px 8px;
  margin-right: 8px;
  justify-content: center;
  align-items: center;
  border-right: 1px solid ${COLOR.gray1};
  @media (max-width: 690px) {
    padding: 0px 8px;
    border-right: none;
  }

  svg {
    fill: ${({ isValid }) => (isValid ? COLOR.main : COLOR.gray1)};
  }

  &:hover,
  &:has(input:focus) {
    svg {
      fill: ${({ isValid }) => (isValid ? COLOR.main : COLOR.gray)};
    }
  }

  input {
    width: 0;
    @media (max-width: 690px) {
      width: 100%;
      transition: none;
    }
    &:focus,
    &:not(:placeholder-shown) {
      width: 132px;
      @media (max-width: 690px) {
        width: 100%;
      }
    }
    transition: width 0.3s;
  }

  input,
  button {
    padding: 8px 0px 8px 5px;
  }
  select {
    padding: 8px 0;
  }

  input,
  select,
  button {
    color: ${({ isValid }) => (isValid ? "#000" : COLOR.gray)};
    font-size: 0.95rem;
    font-weight: ${({ isValid }) => (isValid ? 600 : 400)};
  }
`;

const FilterWrap = styled(Wrap)`
  margin-right: 0;
  border-right: none;
`;

export default HeaderBar;
