import React from "react";
import styled from "@emotion/styled";
import { useAtom } from "jotai";
import {
  keyFilter,
  selectedFilter,
  selectedModal,
  wageFilter,
} from "../../atoms/atoms";

import { COLOR, SHADOW } from "../../constants/style";

function SearchList() {
  const [showFilter] = useAtom(selectedModal);
  const [key] = useAtom(keyFilter);
  const [wage] = useAtom(wageFilter);
  const [selected] = useAtom(selectedFilter);
  const isFiltered = !!(
    key.keyword ||
    key.industry ||
    wage > 0 ||
    selected.length > 0
  );

  return (
    <Container showFilter={showFilter} isFiltered={isFiltered}>
      <ul>
        <li>네이버</li>
        <li>네이버</li>
        <li>네이버</li>
      </ul>
    </Container>
  );
}

const Container = styled.section<{ showFilter: boolean; isFiltered: boolean }>`
  position: absolute;
  margin: ${(props) => (props.showFilter ? "184px 0 0" : "12px 0 0")};
  padding: ${(props) => (props.isFiltered ? "12px 16px" : "0")};
  left: 50%;
  width: ${(props) => (props.isFiltered ? "100%" : "0%")};
  background-color: #fff;
  box-shadow: ${SHADOW.basic};
  border-radius: 28px;
  z-index: 2;
  opacity: ${(props) => (props.isFiltered ? 1 : 0)};
  overflow: hidden;
  white-space: nowrap;
  transition: all 0.3s;
  transform: translateX(-50%);
  ul {
    white-space: nowrap;
    li {
      cursor: pointer;
      margin: 4px 0;
      ${(props) => (props.isFiltered ? "" : "height: 0")};
      padding: ${(props) => (props.isFiltered ? "16px" : "0 16px")};
      border-radius: 16px;
      transition: all 0.3s;
      &:hover {
        background-color: ${COLOR.main};
        color: #fff;
      }
    }
  }
  &:hover {
    box-shadow: ${SHADOW.hover};
  }
`;
export default SearchList;
