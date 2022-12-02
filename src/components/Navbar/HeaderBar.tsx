import React, { useState } from "react";
import styled from "@emotion/styled";
import { SHADOW } from "../../constants/style";
import { useAtom } from "jotai";
import {
  keyFilter,
  selectedFilter,
  selectedModal,
  wageFilter,
} from "../../atoms/atoms";
import FilterList from "./FilterList";

function HeaderBar() {
  const [showFilter, setShowFilter] = useAtom(selectedModal);
  const [nowKeyFilter, setNowKeyFilter] = useAtom(keyFilter);
  const [nowWageFilter] = useAtom(wageFilter);
  const [nowFilter] = useAtom(selectedFilter);
  return (
    <>
      <Container>
        <Wrap id="header-keyword" icon="search">
          <input
            type="text"
            placeholder="회사명"
            value={nowKeyFilter.keyword}
            onChange={(e) =>
              setNowKeyFilter({
                ...nowKeyFilter,
                keyword: e.target.value,
              })
            }
          />
        </Wrap>
        <Wrap htmlFor="header-industry" icon="rocket">
          <select
            id="header-industry"
            value={nowKeyFilter.industry}
            onChange={(e) =>
              setNowKeyFilter({
                ...nowKeyFilter,
                industry: e.target.value,
              })
            }
          >
            <option value="">전체산업</option>
            <option>IT/테크</option>
            <option>유통</option>
            <option>서비스</option>
            <option>제조업</option>
            <option>금융</option>
          </select>
        </Wrap>
        <Wrap
          id="header-filter"
          style={{ filter: showFilter ? "invert(1)" : "none" }}
          icon="filtered"
          onClick={() => setShowFilter(!showFilter)}
        >
          <p>{nowFilter.length + (nowWageFilter > 0 ? 1 : 0)}개</p>
        </Wrap>
      </Container>
      <FilterList />
    </>
  );
}

const Container = styled.section`
  display: flex;
  justify-content: center;
  gap: 12px;
  @media (max-width: 580px) {
    flex-wrap: wrap;
  }
`;

const Wrap = styled.label<{ icon: string }>`
  ${(props) => props.icon === "filtered" && "cursor: pointer;"}
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 8px;
  width: ${(props) =>
    props.icon == "rocket"
      ? "152px"
      : props.icon == "filtered"
      ? "108px"
      : "60px"};
  height: 55px;
  background-color: #fff;
  box-shadow: ${SHADOW.basic};
  border-radius: 28px;
  transition: all 0.3s;
  &:has(input:focus),
  &:has(input:focus:not(:placeholder-shown)),
  &:has(input:not(:placeholder-shown)),
  &:hover {
    width: ${(props) =>
      props.icon == "rocket"
        ? "152px"
        : props.icon == "filtered"
        ? "108px"
        : "216px"};
  }
  &:has(input:not(:placeholder-shown)) {
    position: relative;
    width: 168px;
  }
  &::after {
    content: "";
    position: absolute;
    width: 24px;
    height: 24px;
    left: 18px;
    top: 16px;
    background-image: url(${(props) => `/icons/${props.icon}.svg`});
    background-size: 24px;
    background-position: center;
  }

  input,
  select,
  p {
    width: calc(100% - 40px);
    margin: 0 0 0 40px;
    padding: 0 12px 0 0;
    background: none;
    font-size: 1.1rem;
    z-index: 1;
    border: none;
    outline: none;
    overflow: hidden;
    text-overflow: ellipsis;
    &::placeholder {
      opacity: 0;
      transition: all 0.3s;
    }
    &:hover::placeholder,
    &:focus::placeholder {
      opacity: 1;
    }
  }
  &:hover {
    box-shadow: ${SHADOW.hover};
    input::placeholder {
      opacity: 1;
    }
  }
  &:has(input:focus),
  &:has(select:focus) {
    filter: invert(1);
  }
  @media (max-width: 580px) {
    &[id="header-keyword"] {
      &,
      &:has(input:focus),
      &:has(input:focus:not(:placeholder-shown)),
      &:has(input:not(:placeholder-shown)) {
        margin: 0 40px;
        width: 100%;
        input {
          width: 100%;
          &::placeholder {
            opacity: 1;
          }
        }
      }
    }
    &[for="header-industry"] {
      width: 152px;
    }
  }
`;

export default HeaderBar;