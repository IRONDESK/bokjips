import React from "react";
import styled from "@emotion/styled";
import { useAtom } from "jotai";
import { selectedFilter, selectedModal, wageFilter } from "../../atoms/atoms";
import { COLOR, SHADOW } from "../../constants/style";

const welfareList = [
  { value: "wage", name: "비포괄임금" },
  { value: "restaurant", name: "사내식당" },
  { value: "housework", name: "재택근무" },
  { value: "device", name: "최신형장비" },
  { value: "stockoption", name: "스톡옵션" },
];

function FilterBar() {
  const [showFilter, setShowFilter] = useAtom(selectedModal);
  const [nowWageFilter, setNowWageFilter] = useAtom(wageFilter);
  const [nowFilter, setNowFilter] = useAtom(selectedFilter);

  const addFiltered = (
    e: React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    let target = (e.target as HTMLButtonElement).value;
    if (target) {
      if (!nowFilter.some((arr) => arr == target)) {
        setNowFilter([...nowFilter, target]);
      } else {
        setNowFilter(nowFilter.filter((value) => value !== target));
      }
    }
  };

  const setWageFiltered = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNowWageFilter(Number((e.target as HTMLInputElement).value));
  };

  return (
    <Container showFilter={showFilter}>
      <Wage wageValue={nowWageFilter}>
        <label htmlFor="header-basic-wage">초봉</label>
        <input
          type="number"
          id="header-basic-wage"
          min={0}
          step={100}
          value={+nowWageFilter}
          onChange={setWageFiltered}
        />
      </Wage>
      <div id="header-buttons" onClick={addFiltered}>
        {welfareList.map((el, idx) => (
          <Button key={idx} array={nowFilter} value={el.value}>
            {el.name}
          </Button>
        ))}
      </div>
    </Container>
  );
}

const itemStyle = `
background-color: #fff;
box-shadow: ${SHADOW.basic};
border-radius: 28px;
font-size: 0.85rem;
overflow: hidden;
`;

const Container = styled.section<{ showFilter: boolean }>`
  position: absolute;
  margin: 12px 0 0;
  padding: ${(props) => (props.showFilter ? "12px 16px" : "0")};
  left: 50%;
  width: ${(props) => (props.showFilter ? "100%" : "50%")};
  ${(props) => (props.showFilter ? "" : "height: 1%")};
  background-color: #fff;
  box-shadow: ${SHADOW.basic};
  border-radius: 28px;
  z-index: 2;
  opacity: ${(props) => (props.showFilter ? 1 : 0)};
  transition: all 0.3s;
  transform: translateX(-50%);
  overflow: hidden;
  #header-buttons {
    display: grid;
    height: ${(props) => (props.showFilter ? "100%" : "10px")};
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    transition: all 0.3s;
  }
`;

const Wage = styled.div<{ wageValue: number }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 8px;
  padding: 12px 16px;
  ${itemStyle}
  background-color: ${(props) => (props.wageValue > 0 ? COLOR.main : "none")};
  color: ${(props) => (props.wageValue > 0 ? "#fff" : "none")};
  font-weight: ${(props) => (props.wageValue > 0 ? "500" : "none")};
  label {
    flex: 1;
  }
  input {
    max-width: 50%;
    padding: 0 4px;
    background: transparent;
    text-align: right;
    color: ${(props) => (props.wageValue > 0 ? "#fff" : "none")};
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      display: none;
    }
  }
  &::after {
    content: "만원 이상";
    display: inline;
  }
`;

const Button = styled.button<{ array: string[]; value: string }>`
  min-width: 80px;
  ${itemStyle};
  padding: 12px;
  background-color: ${(props) =>
    props.array.some((arr) => arr == props.value) ? COLOR.main : "none"};
  color: ${(props) =>
    props.array.some((arr) => arr == props.value) ? "#fff" : "none"};
  font-weight: ${(props) =>
    props.array.some((arr) => arr == props.value) ? "500" : "none"};
  white-space: nowrap;

  &::before {
    content: "✓";
    margin: 0 4px 0 0;
    display: ${(props) =>
      props.array.some((arr) => arr == props.value) ? "inline-block" : "none"};
  }
`;

export default FilterBar;
