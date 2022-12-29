import styled from "@emotion/styled";
import React from "react";
import { COLOR, SHADOW } from "../../constants/style";

function Comments() {
  const handleSubmitComment = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <Container>
      <h3>실시간 댓글</h3>
      <form>
        <input
          type="text"
          placeholder="내용을 입력하세요."
          minLength={10}
          maxLength={200}
        />
        <button type="submit" onClick={handleSubmitComment}></button>
      </form>
      <ul className="comment-list">
        <CommentItem isMyComment={true}>
          <p className="comment-content">
            Lorem ipsum dolor sit amet consectetur, unde?
          </p>
          <p className="comment-written">이름 22.11.20 20:11</p>
        </CommentItem>
        <CommentItem isMyComment={false}>
          <p className="comment-content">
            Lorem ipsum dolor sit amet consectetur, unde?
          </p>
          <p className="comment-written">이름 22.11.20 20:11</p>
        </CommentItem>
      </ul>
    </Container>
  );
}

const Container = styled.section`
  padding: 0 12px;
  h3 {
    padding: 0 12px;
    font-weight: 600;
    font-size: 1.3rem;
  }
  form {
    display: flex;
    align-items: center;
    margin: 24px 0 0;
    padding: 0 12px;
    background-color: #fff;
    border-radius: 20px;
    box-shadow: ${SHADOW.basic};
    transition: all 0.3s;
    input {
      flex: 1;
      margin: 0 0 0 8px;
      padding: 16px 0;
      font-size: 1rem;
    }
    button {
      padding: 4px 8px;
      border-radius: 12px;
      background-color: ${COLOR.lightgray};
      &:hover {
        background-color: #000;
        color: #fff;
      }
      &::after {
        content: "check";
        font-family: "Material Symbols Outlined";
        font-size: 1.35rem;
        font-weight: bold;
      }
    }
    &:hover,
    &:has(input:focus) {
      box-shadow: ${SHADOW.hover};
    }
  }
  .comment-list {
    margin: 20px 0 8px;
    padding: 0 8px;
    @media (max-width: 580px) {
      padding: 0;
    }
  }
`;

const CommentItem = styled.li<{ isMyComment: boolean }>`
  display: flex;
  gap: 8px;
  align-items: center;
  margin: 0 0 16px;
  .comment-content {
    display: inline-block;
    padding: 12px 16px;
    background-color: ${(props) =>
      props.isMyComment ? COLOR.mainLight : "#dfdfdf"};
    border-radius: 20px;
    font-size: 0.9rem;
    line-height: 1.15rem;
    order: ${(props) => (props.isMyComment ? 2 : 1)};
  }
  .comment-written {
    flex: 1;
    display: inline-block;
    opacity: 0.6;
    font-size: 0.8rem;
    text-align: ${(props) => (props.isMyComment ? "right" : "none")};
    order: ${(props) => (props.isMyComment ? 1 : 2)};
  }
`;

export default Comments;
