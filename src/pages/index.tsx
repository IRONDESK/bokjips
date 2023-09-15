import React from "react";
import styled from "@emotion/styled";

import { Title } from "../components/Layouts/partials/Title";
import MainList from "../components/Main/MainList";

export default function Home() {
  return (
    <Container>
      <Title />
      <MainList />
    </Container>
  );
}

const Container = styled.main`
  padding: 12px 20px 20px;
`;
