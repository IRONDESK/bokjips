import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { COLOR } from "../../constants/style";
import { useRouter } from "next/router";
import { ArrowRightOutlineIcon } from "../../svg/ArrowIcons";

type Props = {
  nowPage: number;
  setNowPage?: () => void;
  empty: boolean;
  totalPages: number;
};

function Pagination({ nowPage, setNowPage, empty, totalPages }: Props) {
  const router = useRouter();
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
    if (empty) router.push({ query: { page: 1 } });
  }, [empty]);

  return (
    <PageList>
      {nowPage > 4 && (
        <PageButton numbering={false} onClick={() => router.push({ query: { page: totalPagesArr[0] } })}>
          이전
        </PageButton>
      )}
      {totalPagesArr.map((v) => (
        <PageButton
          key={v}
          numbering={true}
          onClick={() => router.push({ query: { page: v + 1 } })}
          isNowPage={v === nowPage}
        >
          {v + 1}
        </PageButton>
      ))}
      {totalPagesArr.length === 5 && totalPages > 5 ? (
        <PageButton numbering={false} onClick={() => router.push({ query: { page: totalPagesArr[4] + 2 } })}>
          <ArrowRightOutlineIcon width={20} />
        </PageButton>
      ) : null}
    </PageList>
  );
}

const PageList = styled.ul`
  display: flex;
  justify-content: center;
  margin: 20px 0 32px;
  gap: 10px;
`;
const PageButton = styled.li<{ numbering: boolean; isNowPage?: boolean }>`
  cursor: pointer;
  display: inline-flex;
  padding: 0;
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  background-color: ${({ isNowPage }) => (isNowPage ? COLOR.main : "transparent")};
  color: ${({ isNowPage }) => (isNowPage ? "#fff" : "none")};
  font-size: 1rem;
  font-weight: ${({ isNowPage }) => (isNowPage ? 800 : "none")};
  text-align: center;

  &:hover {
    background-color: ${({ numbering }) => (numbering ? COLOR.mainLight : "transparent")};
    svg {
      fill: ${COLOR.main};
    }
  }

  @media (max-width: 580px) {
    width: 36px;
    height: 36px;
    font-size: 1.1rem;
  }
`;

export default Pagination;
