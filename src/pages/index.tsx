import Head from "next/head";
import styled from "@emotion/styled";
import CorpCard from "../components/Main/CorpCard";

export default function Home() {
  return (
    <Main>
      <CardList>
        <CorpCard />
        <CorpCard />
        <CorpCard />
        <CorpCard />
        <CorpCard />
      </CardList>
    </Main>
  );
}

const Main = styled.main`
  padding: 12px 24px 20px;
`;

const CardList = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  grid-column: 1/3;
  @media (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 690px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
