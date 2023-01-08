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
        <PageButton
          numbering={false}
          onClick={() => setNowPage(totalPagesArr[0] - 1)}
        >
          이전
        </PageButton>
      )}
      {totalPagesArr.map((v) => (
        <PageButton
          key={v}
          numbering={true}
          onClick={() => setNowPage(v)}
          isNowPage={v === nowPage}
        >
          {v + 1}
        </PageButton>
      ))}
      {totalPagesArr.length === 5 && totalPages > 5 ? (
        <PageButton
          numbering={false}
          onClick={() => setNowPage(totalPagesArr[4] + 1)}
        >
          다음
        </PageButton>
      ) : null}
    </PageList>
  );
}

const PageList = styled.ul`
  margin: 0 auto 20px;
  max-width: 320px;
  text-align: center;
  @media (max-width: 580px) {
    margin: 0 -24px;
    max-width: 100vw;
  }
`;
const PageButton = styled.li<{ numbering: boolean; isNowPage?: boolean }>`
  cursor: pointer;
  display: inline-block;
  margin: 0 10px 0 0;
  padding: 0;
  width: ${(props) => (props.numbering ? "32px" : "48px")};
  height: 32px;
  background-color: ${(props) =>
    props.isNowPage ? COLOR.main : props.numbering ? "none" : "#fff"};
  border: ${(props) =>
    props.numbering ? "1px solid transparent" : "1px solid #DADDE0"};
  border-radius: 4px;
  color: ${(props) => (props.isNowPage ? "#fff" : "none")};
  font-size: ${(props) => (props.numbering ? "0.9rem" : "0.85rem")};
  font-weight: ${(props) => (props.isNowPage ? 600 : "none")};
  text-align: center;
  line-height: 32px;
  &:hover {
    background-color: ${(props) =>
      props.numbering ? COLOR.mainLight : "#F7F9FA"};
  }
  &:last-of-type {
    margin: 0;
  }
  @media (max-width: 580px) {
    font-size: ${(props) => (props.numbering ? "1rem" : "0.85rem")};
  }
`;

export default Pagination;
