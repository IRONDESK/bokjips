import React from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { COLOR } from "../../constants/style";

function Loading() {
  return (
    <Container>
      <Loader />
    </Container>
  );
}

const SpinnerAnimation = keyframes`
  0%,
  100% {
    box-shadow: 0em -2.6em 0em 0em ${COLOR.main}, 1.8em -1.8em 0 0em rgba(${COLOR.mainRGB}, 0.2), 2.5em 0em 0 0em rgba(${COLOR.mainRGB}, 0.2), 1.75em 1.75em 0 0em rgba(${COLOR.mainRGB}, 0.2), 0em 2.5em 0 0em rgba(${COLOR.mainRGB}, 0.2), -1.8em 1.8em 0 0em rgba(${COLOR.mainRGB}, 0.2), -2.6em 0em 0 0em rgba(${COLOR.mainRGB}, 0.5), -1.8em -1.8em 0 0em rgba(${COLOR.mainRGB}, 0.7);
  }
  12.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(${COLOR.mainRGB}, 0.7), 1.8em -1.8em 0 0em ${COLOR.main}, 2.5em 0em 0 0em rgba(${COLOR.mainRGB}, 0.2), 1.75em 1.75em 0 0em rgba(${COLOR.mainRGB}, 0.2), 0em 2.5em 0 0em rgba(${COLOR.mainRGB}, 0.2), -1.8em 1.8em 0 0em rgba(${COLOR.mainRGB}, 0.2), -2.6em 0em 0 0em rgba(${COLOR.mainRGB}, 0.2), -1.8em -1.8em 0 0em rgba(${COLOR.mainRGB}, 0.5);
  }
  25% {
    box-shadow: 0em -2.6em 0em 0em rgba(${COLOR.mainRGB}, 0.5), 1.8em -1.8em 0 0em rgba(${COLOR.mainRGB}, 0.7), 2.5em 0em 0 0em ${COLOR.main}, 1.75em 1.75em 0 0em rgba(${COLOR.mainRGB}, 0.2), 0em 2.5em 0 0em rgba(${COLOR.mainRGB}, 0.2), -1.8em 1.8em 0 0em rgba(${COLOR.mainRGB}, 0.2), -2.6em 0em 0 0em rgba(${COLOR.mainRGB}, 0.2), -1.8em -1.8em 0 0em rgba(${COLOR.mainRGB}, 0.2);
  }
  37.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(${COLOR.mainRGB}, 0.2), 1.8em -1.8em 0 0em rgba(${COLOR.mainRGB}, 0.5), 2.5em 0em 0 0em rgba(${COLOR.mainRGB}, 0.7), 1.75em 1.75em 0 0em ${COLOR.main}, 0em 2.5em 0 0em rgba(${COLOR.mainRGB}, 0.2), -1.8em 1.8em 0 0em rgba(${COLOR.mainRGB}, 0.2), -2.6em 0em 0 0em rgba(${COLOR.mainRGB}, 0.2), -1.8em -1.8em 0 0em rgba(${COLOR.mainRGB}, 0.2);
  }
  50% {
    box-shadow: 0em -2.6em 0em 0em rgba(${COLOR.mainRGB}, 0.2), 1.8em -1.8em 0 0em rgba(${COLOR.mainRGB}, 0.2), 2.5em 0em 0 0em rgba(${COLOR.mainRGB}, 0.5), 1.75em 1.75em 0 0em rgba(${COLOR.mainRGB}, 0.7), 0em 2.5em 0 0em ${COLOR.main}, -1.8em 1.8em 0 0em rgba(${COLOR.mainRGB}, 0.2), -2.6em 0em 0 0em rgba(${COLOR.mainRGB}, 0.2), -1.8em -1.8em 0 0em rgba(${COLOR.mainRGB}, 0.2);
  }
  62.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(${COLOR.mainRGB}, 0.2), 1.8em -1.8em 0 0em rgba(${COLOR.mainRGB}, 0.2), 2.5em 0em 0 0em rgba(${COLOR.mainRGB}, 0.2), 1.75em 1.75em 0 0em rgba(${COLOR.mainRGB}, 0.5), 0em 2.5em 0 0em rgba(${COLOR.mainRGB}, 0.7), -1.8em 1.8em 0 0em ${COLOR.main}, -2.6em 0em 0 0em rgba(${COLOR.mainRGB}, 0.2), -1.8em -1.8em 0 0em rgba(${COLOR.mainRGB}, 0.2);
  }
  75% {
    box-shadow: 0em -2.6em 0em 0em rgba(${COLOR.mainRGB}, 0.2), 1.8em -1.8em 0 0em rgba(${COLOR.mainRGB}, 0.2), 2.5em 0em 0 0em rgba(${COLOR.mainRGB}, 0.2), 1.75em 1.75em 0 0em rgba(${COLOR.mainRGB}, 0.2), 0em 2.5em 0 0em rgba(${COLOR.mainRGB}, 0.5), -1.8em 1.8em 0 0em rgba(${COLOR.mainRGB}, 0.7), -2.6em 0em 0 0em ${COLOR.main}, -1.8em -1.8em 0 0em rgba(${COLOR.mainRGB}, 0.2);
  }
  87.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(${COLOR.mainRGB}, 0.2), 1.8em -1.8em 0 0em rgba(${COLOR.mainRGB}, 0.2), 2.5em 0em 0 0em rgba(${COLOR.mainRGB}, 0.2), 1.75em 1.75em 0 0em rgba(${COLOR.mainRGB}, 0.2), 0em 2.5em 0 0em rgba(${COLOR.mainRGB}, 0.2), -1.8em 1.8em 0 0em rgba(${COLOR.mainRGB}, 0.5), -2.6em 0em 0 0em rgba(${COLOR.mainRGB}, 0.7), -1.8em -1.8em 0 0em ${COLOR.main};
}
`;

const Container = styled.section`
  display: flex;
  align-items: center;
  height: calc(100vh - 300px);
`;

const Loader = styled.div`
  margin: 100px auto;
  font-size: 25px;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  position: relative;
  text-indent: -9999em;
  animation: ${SpinnerAnimation} 1.1s infinite ease;
  transform: translateZ(0) scale(0.7);
`;

export default Loading;
