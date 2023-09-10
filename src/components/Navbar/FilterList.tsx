import React from "react";
import styled from "@emotion/styled";
import { useAtom } from "jotai";

import { selectedFilter, primarySelectedFilter, selectedModal, wageFilter } from "../../atoms/atoms";
import { WELFARES_FILTER_LIST } from "../../constants/welfares";
import { COLOR } from "../../constants/style";
import CheckIcon from "../../svg/CheckIcon";
import { MoneyIcon } from "../../svg/CardIcons";
import { ArrowUpIcon, ArrowUpLineIcon } from "../../svg/ArrowIcons";

function FilterBar() {
  const [showFilter, setShowFilter] = useAtom(selectedModal);
  const [nowWageFilter, setNowWageFilter] = useAtom(wageFilter);
  const [nowPrimaryFilter, setPrimaryNowFilter] = useAtom(primarySelectedFilter);
  const [nowFilter, setNowFilter] = useAtom(selectedFilter);

  const addFiltered = (target: string) => {
    if (!nowFilter.some((arr) => arr == target)) {
      setNowFilter((prev) => [...prev, target]);
    } else {
      setNowFilter((prev) => prev.filter((value) => value !== target));
    }
  };

  const setWageFiltered = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNowWageFilter(Number((e.target as HTMLInputElement).value));
  };

  return (
    <>
      <Container showFilter={showFilter}>
        <Wage as="div" isSelected={nowWageFilter > 0}>
          <MoneyIcon className="filter-money-icon" width={20} />
          <input
            type="number"
            pattern="[0–9]*"
            inputMode="decimal"
            id="header-basic-wage"
            min={0}
            step={100}
            value={nowWageFilter === 0 ? "" : nowWageFilter}
            onChange={setWageFiltered}
            placeholder="초봉"
          />
          <span className="input-wage-unit">
            만원
            <ArrowUpLineIcon className="filter-wage-up-icon" width={16} />
          </span>
        </Wage>
        <Button
          isSelected={nowPrimaryFilter?.isCertified}
          onClick={() =>
            setPrimaryNowFilter((prev) => {
              return { ...prev, isCertified: !prev.isCertified };
            })
          }
          value="isCertified"
        >
          <CheckIcon width={16} />
          현직인증
        </Button>
        <Button
          isSelected={nowPrimaryFilter?.inclusive}
          onClick={() =>
            setPrimaryNowFilter((prev) => {
              return { ...prev, inclusive: !prev.inclusive };
            })
          }
          value="inclusive"
        >
          <CheckIcon width={16} />
          비포괄임금
        </Button>
        {WELFARES_FILTER_LIST.map((el, idx) => (
          <Button
            key={idx}
            onClick={() => addFiltered(el.value)}
            isSelected={nowFilter.some((arr) => arr === el.value)}
          >
            <CheckIcon width={16} />
            {el.name}
          </Button>
        ))}
      </Container>
      {showFilter && (
        <CloseButton type="button" onClick={() => setShowFilter((prev) => !prev)}>
          <ArrowUpIcon width={22} />
        </CloseButton>
      )}
    </>
  );
}

const Container = styled.section<{ showFilter: boolean }>`
  display: flex;
  flex-wrap: wrap;
  visibility: ${({ showFilter }) => (showFilter ? "visible" : "hidden")};
  width: 100%;
  margin: ${({ showFilter }) => (showFilter ? "16px 0 0" : "0")};
  padding: ${({ showFilter }) => (showFilter ? "16px 0 6px" : "0")};
  height: ${({ showFilter }) => (showFilter ? "auto" : "0")};
  opacity: ${({ showFilter }) => (showFilter ? 1 : 0)};
  border-top: 1px solid ${COLOR.lightgray};
  transition: all 0.3s;
  overflow: hidden;
  gap: 8px;
  transition: all 0.3s;

  button {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;

const Button = styled.button<{ isSelected: boolean }>`
  display: inline-flex;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  background-color: ${({ isSelected }) => (isSelected ? COLOR.mainLight1 : COLOR.lightgray1)};
  border: 1px solid ${({ isSelected }) => (isSelected ? COLOR.mainLight : "transparent")};
  border-radius: 24px;
  color: ${({ isSelected }) => (isSelected ? COLOR.mainDark : COLOR.gray)};
  font-size: 0.85rem;
  font-weight: ${({ isSelected }) => (isSelected ? "600" : "none")};

  svg {
    margin: -2px 2px -2px -2px;
    display: ${({ isSelected }) => (isSelected ? "inline-block" : "none")};
    fill: ${COLOR.mainDark};
  }
  .filter-money-icon {
    display: inline-block;
    fill: ${({ isSelected }) => (isSelected ? COLOR.main : COLOR.gray)};
  }
`;

const Wage = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  label {
    display: inline-flex;
    align-items: center;
  }
  input {
    width: 56px;
    background: transparent;
    color: ${({ isSelected }) => (isSelected ? COLOR.mainDark : COLOR.gray)};
    text-align: right;
    font-size: 0.8rem;
    font-weight: ${({ isSelected }) => (isSelected ? "600" : "auto")};
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      display: none;
    }
  }
  .input-wage-unit {
    display: inline-flex;
    align-items: center;
    margin: 0 0 0 3px;
    white-space: nowrap;
  }
  .filter-wage-up-icon {
    display: inline-block;
    margin-right: -4px;
    fill: ${({ isSelected }) => (isSelected ? COLOR.mainDark : COLOR.gray)};
  }
`;

const CloseButton = styled.button`
  margin: 0 auto -12px;
  width: 90px;
  svg {
    fill: ${COLOR.gray1};
  }
`;

export default FilterBar;
