import styled from "@emotion/styled";
import React, { useState } from "react";

interface DetailCardPropsType {
  icon: string;
  title: string;
  content?: string;
}

function DetailCard({ icon, title, content = "" }: DetailCardPropsType) {
  const [additionalCheck, setAdditionalCheck] = useState(false);
  const [contentFisrt, contentAdditional] = content.split("??");
  const MouseOverLeaveEvent = () => {
    setAdditionalCheck(!additionalCheck);
  };

  return (
    <Container>
      <Icon className="material-symbols-outlined">{icon}</Icon>
      <Text>
        <strong>{title}</strong>
        <p>
          {contentFisrt}
          {contentAdditional && (
            <i
              onMouseOver={MouseOverLeaveEvent}
              onMouseLeave={MouseOverLeaveEvent}
            ></i>
          )}
          {contentAdditional && (
            <span
              className={`additional-content ${
                additionalCheck ? "show" : "hide"
              }`}
            >
              {contentAdditional}
            </span>
          )}
        </p>
      </Text>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 222px;
  padding: 16px 20px;
  background-color: #fff;
  border-radius: 20px;
`;

const Icon = styled.i`
  font-size: 42px;
`;
const Text = styled.div`
  width: 100%;
  line-height: 1.25rem;
  strong {
    display: block;
    font-weight: 500;
  }
  p {
    color: #555;
    font-size: 0.9rem;
    i {
      cursor: help;
      display: inline-block;
      margin: 0 0 0 2px;
      width: 16px;
      height: 16px;
      background-image: url("/icons/question.svg");
      background-size: 16px;
      background-position: center;
      vertical-align: middle;
    }
  }
  .additional-content {
    position: absolute;
    display: inline-block;
    margin: 0 0 0 2px;
    padding: 2px 6px;
    background-color: #3a3a3a;
    border: 1px solid #1d1d1d;
    transition: all 0.3s;
    color: #fff;
    font-size: 0.85rem;
    text-align: center;
  }
  .hide {
    opacity: 0;
    transform: translateX(-8px) scale(0.8);
    z-index: -1;
  }
  .show {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
`;

export default DetailCard;
