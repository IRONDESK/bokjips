import React from "react";
import styled from "@emotion/styled";

function SearchBar() {
  return (
    <Container>
      <Wrap icon="search">
        <input type="text" placeholder="회사명" />
      </Wrap>
      <Wrap icon="rocket">
        <select>
          <option>전체산업</option>
          <option>IT/테크</option>
          <option>유통</option>
          <option>서비스</option>
          <option>제조업</option>
          <option>금융</option>
        </select>
      </Wrap>
      <Wrap icon="filtered">
        <p>0개</p>
      </Wrap>
    </Container>
  );
}

const Container = styled.ul`
  display: flex;
  gap: 12px;
`;

const Wrap = styled.li<{ icon: string }>`
  position: relative;
  display: flex;
  align-items: center;
  padding: 16px 8px;
  width: ${(props) =>
    props.icon == "rocket"
      ? "152px"
      : props.icon == "filtered"
      ? "108px"
      : "60px"};
  background-color: #fff;
  box-shadow: 0 0 24px 8px rgba(0, 0, 0, 0.05);
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
    background-image: url(${(props) => `icons/${props.icon}.svg`});
    background-size: 24px;
    background-position: center;
  }

  input,
  select,
  p {
    width: calc(100%-40px);
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
    input::placeholder {
      opacity: 1;
    }
  }
`;

export default SearchBar;
