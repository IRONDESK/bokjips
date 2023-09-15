import styled from "@emotion/styled";
import React, { useState } from "react";
import { COLOR } from "../../constants/style";
import { useAtom } from "jotai";
import { mainSortAsc, mainSortType } from "../../atoms/atoms";

type Props = {
  totalCorp?: number;
};

function ListTop({ totalCorp }: Props) {
  const [sortType, setSortType] = useAtom(mainSortType);
  const [isSortAsc, setIsSortAsc] = useAtom(mainSortAsc);

  return (
    <Container>
      <p className="corp-length-count">{totalCorp || 0}개 기업의 복지 정보</p>
      <ul className="corp-sort-type">
        <Sort
          isSorted={sortType === "name"}
          onClick={() => {
            if (sortType != "name") setSortType("name");
            else {
              setIsSortAsc((prev) => !prev);
            }
          }}
        >
          회사명순 {sortType === "name" ? (isSortAsc ? "▲" : "▼") : ""}
        </Sort>
        <Sort
          isSorted={sortType === "favorite"}
          onClick={() => {
            setSortType("favorite");
            setIsSortAsc(true);
          }}
        >
          찜많은순
        </Sort>
      </ul>
    </Container>
  );
}

const Container = styled.div`
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
  background-color: ${({ isSorted }) => (isSorted ? COLOR.main : "#696969")};
  opacity: ${({ isSorted }) => (isSorted ? 1 : 0.45)};
  border-radius: 8px;
  color: #fff;
  font-size: 0.8rem;
  font-weight: 600;
`;

export default ListTop;
