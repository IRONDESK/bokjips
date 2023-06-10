import React from "react";
import styled from "@emotion/styled";
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import { useAtom } from "jotai";

import { selectedFilter, primarySelectedFilter, selectedModal, wageFilter } from "../../atoms/atoms";
import { WELFARES_FILTER_LIST } from "../../constants/welfares";
import { COLOR, SHADOW } from "../../constants/style";

function FilterBar() {
  const [showFilter, setShowFilter] = useAtom(selectedModal);
  const [nowWageFilter, setNowWageFilter] = useAtom(wageFilter);
  const [nowPrimaryFilter, setPrimaryNowFilter] = useAtom(primarySelectedFilter);
  const [nowFilter, setNowFilter] = useAtom(selectedFilter);

  const addFiltered = (e: React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement>) => {
    let target = (e.target as HTMLButtonElement).value;
    if (target) {
      if (!nowFilter.some((arr) => arr == target)) {
        setNowFilter((prev) => [...prev, target]);
      } else {
        setNowFilter((prev) => prev.filter((value) => value !== target));
      }
    }
  };

  const setWageFiltered = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNowWageFilter(Number((e.target as HTMLInputElement).value));
  };

  return (
    <>
      <Container showFilter={showFilter}>
        <div className="filter-list-top">
          <Wage wageValue={nowWageFilter}>
            <label htmlFor="header-basic-wage">
              <input
                type="number"
                id="header-basic-wage"
                min={0}
                step={100}
                value={+nowWageFilter}
                onChange={setWageFiltered}
              />
              <span className="input-wage-unit">만원↑</span>
            </label>
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
            비포괄
          </Button>
        </div>
        <Buttons showFilter={showFilter} onClick={addFiltered}>
          {/* <Flicking align="prev" bound={true} inputType={["touch", "mouse"]}> */}
          {WELFARES_FILTER_LIST.map((el, idx) => (
            <Button key={idx} value={el.value} isSelected={nowFilter.some((arr) => arr === el.value)}>
              {el.name}
            </Button>
          ))}
          {/* </Flicking> */}
        </Buttons>
      </Container>
      {showFilter && <BackDrop onClick={() => setShowFilter(false)} />}
    </>
  );
}

const itemStyle = `
min-width: 79px;
  background-color: #fff;
  box-shadow: ${SHADOW.basic};
  border-radius: 20px;
  font-size: 0.8rem;
`;

const Container = styled.section<{ showFilter: boolean }>`
  visibility: ${(props) => (props.showFilter ? "visible" : "hidden")};
  position: absolute;
  margin: 12px 0 0;
  padding: ${(props) => (props.showFilter ? "16px" : "0")};
  left: 50%;
  width: 93%;
  background-color: #fff;
  box-shadow: ${SHADOW.basic};
  border-radius: 28px;
  z-index: 3;
  opacity: ${(props) => (props.showFilter ? 1 : 0)};
  transition: all 0.3s;
  transform: translateX(-50%);
  overflow: hidden;
  .filter-list-top {
    display: grid;
    margin: 0 0 16px;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    transition: all 0.3s;
  }
  button {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;

const Wage = styled.div<{ wageValue: number }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  grid-column: 1 / 3;
  ${itemStyle}
  background-color: ${(props) => (props.wageValue > 0 ? COLOR.mainLight : "none")};
  color: ${(props) => (props.wageValue > 0 ? "#000" : "#1f1f1f")};
  font-weight: ${(props) => (props.wageValue > 0 ? "600" : "none")};
  border: 1px solid ${(props) => (props.wageValue > 0 ? COLOR.main : "transparent")};
  label {
    display: inline-flex;
    align-items: center;
  }
  input {
    width: 100%;
    background: transparent;
    font-size: 0.8rem;
    text-align: right;
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      display: none;
    }
  }
  .input-wage-unit {
    display: inline-block;
    margin: 0 0 0 3px;
    white-space: nowrap;
  }
  &::before {
    content: "초봉";
    opacity: 0.85;
    font-weight: 500;
    white-space: nowrap;
  }
`;

const Buttons = styled.div<{ showFilter: boolean }>`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  transition: all 0.3s;
`;

const Button = styled.button<{ isSelected: boolean }>`
  ${itemStyle};
  padding: 8px 12px;
  background-color: ${(props) => (props.isSelected ? COLOR.mainLight : "none")};
  color: ${(props) => (props.isSelected ? "#000" : "#1f1f1f")};
  font-weight: ${(props) => (props.isSelected ? "600" : "none")};
  border: 1px solid ${(props) => (props.isSelected ? COLOR.main : "transparent")};
`;

const BackDrop = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.05);
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  user-select: none;
  z-index: 2;
`;

export default FilterBar;
