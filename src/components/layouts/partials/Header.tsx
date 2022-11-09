import React from "react";
import styled from "@emotion/styled";
import { COLOR } from "../../../constants/style";
import SearchBar from "../../SearchBar";

function Header() {
  return (
    <Container>
      <Logo>
        <strong>복지</strong>편살
      </Logo>
      <SearchBar />
      <User></User>
    </Container>
  );
}

const Container = styled.header`
  display: flex;
  padding: 24px;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  font-family: "GangwonEdu";
  font-size: 2rem;
  strong {
    color: ${COLOR.main};
  }
`;

const User = styled.button`
  width: 24px;
  height: 24px;
  background-image: url("/icons/face.svg");
  background-size: 24px;
  background-position: center;
`;

export default Header;
