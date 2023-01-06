import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { COLOR } from "../../constants/style";

interface IPaginationType {
  nowPage: number;
  setNowPage: any;
  empty: boolean;
  totalPages: number;
}

function Pagination({
  nowPage,
  setNowPage,
  empty,
  totalPages,
}: IPaginationType) {
  const totalPagesArr = Array.from(
    {
      length:
        totalPages < 5
          ? totalPages
          : Math.floor(nowPage / 5) === Math.floor(totalPages / 5)
          ? totalPages - Math.floor(totalPages / 5) * 5
          : 5,
    },
    (_, i) => i + Math.floor(nowPage / 5) * 5
  );

  useEffect(() => {
    if (empty) setNowPage(0);
  }, [empty]);

  return (
    <PageList>
      {nowPage > 4 && (
        <PageButton onClick={() => setNowPage(totalPagesArr[0] - 1)}>
          이전
        </PageButton>
      )}
      {totalPagesArr.map((v) => (
        <PageButton
          key={v}
          onClick={() => setNowPage(v)}
          isNowPage={v === nowPage}
        >
          {v + 1}
        </PageButton>
      ))}
      {totalPagesArr.length === 5 && totalPages > 5 ? (
        <PageButton onClick={() => setNowPage(totalPagesArr[4] + 1)}>
          다음
        </PageButton>
      ) : null}
    </PageList>
  );
}

const PageList = styled.ul`
  margin: 0 auto 20px;
  max-width: 300px;
  text-align: center;
  @media (max-width: 580px) {
    margin: 0 -24px;
    max-width: 100vw;
  }
`;
const PageButton = styled.li<{ isNowPage?: boolean }>`
  cursor: pointer;
  display: inline-block;
  padding: 0 8px;
  border-right: 1px solid #999;
  font-size: 0.9rem;
  font-weight: ${(props) => (props.isNowPage ? 600 : "none")};
  line-height: 1.65rem;
  &:hover {
    background-color: ${COLOR.mainLight};
  }
  &:last-of-type {
    border: none;
  }
  @media (max-width: 580px) {
    padding: 0 12px;
    font-size: 1rem;
    line-height: 1.6rem;
  }
`;

export default Pagination;
