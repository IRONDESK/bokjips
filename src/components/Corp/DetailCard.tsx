import styled from "@emotion/styled";
import React, { useState } from "react";

interface DetailCardPropsType {
  icon: string;
  title: string;
  content?: string;
}

function DetailCard({ icon, title, content }: DetailCardPropsType) {
  const [additionalCheck, setAdditionalCheck] = useState(false);
  const additional = content?.indexOf("??") !== -1 && content?.split("??")[1];
  const MouseOverLeaveEvent = () => {
    setAdditionalCheck(!additionalCheck);
  };

  return (
    <Container>
      <Icon className="material-symbols-outlined">{icon}</Icon>
      <Text>
        <strong>{title}</strong>
        <span>
          {content?.indexOf("??") !== -1 ? content?.split("??")[0] : content}
          {additional && (
            <i
              onMouseOver={MouseOverLeaveEvent}
              onMouseLeave={MouseOverLeaveEvent}
            ></i>
          )}
          {additional && (
            <p className={`additional-${additionalCheck ? "show" : "hide"}`}>
              {additional}
            </p>
          )}
        </span>
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
  position: relative;
  width: 100%;
  line-height: 1.25rem;
  strong {
    display: block;
    font-weight: 500;
  }
  span {
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
    p {
      position: absolute;
      display: inline-block;
      padding: 2px;
      min-width: 115%;
      background-color: #fff;
      border: 1px solid #dddddd;
      transition: all 0.3s;
      font-size: 0.85rem;
      text-align: center;
    }
  }
  .additional-hide {
    opacity: 0;
    transform: scale(0.8);
  }
  .additional-show {
    opacity: 1;
    transform: scale(1);
  }
`;

export default DetailCard;
