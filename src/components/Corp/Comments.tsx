import React, { useCallback, useState } from "react";
import styled from "@emotion/styled";
import useSWR, { useSWRConfig } from "swr";
import { getCookie } from "cookies-next";
import { useAtom } from "jotai";

import { COLOR, SHADOW } from "../../constants/style";
import { CreateCommentData, fetcher, URL } from "../../api/CommentApi";
import { ICommentDataTypes } from "../../types/CommentData";
import { activeAlert } from "../../atoms/atoms";

interface ICommentPropsType {
  corpId: string;
}

function Comments({ corpId }: ICommentPropsType) {
  const [commentInput, setCommentInput] = useState("");
  const [, setAlertMessage] = useAtom(activeAlert);
  const { data, error } = useSWR<ICommentDataTypes[]>(
    `${URL}/comment/${corpId}`,
    fetcher
  );
  const { mutate } = useSWRConfig();
  const cookie = getCookie("accessToken") as string;

  const handleSubmitComment = (e: React.SyntheticEvent) => {
    e.preventDefault();
    CreateCommentData(corpId, { title: "", content: commentInput }, cookie)
      .then((res) => {
        mutate(`${URL}/comment/${corpId}`);
        setCommentInput("");
      })
      .catch((res) => {
        if (res?.response?.status === 401) {
          setAlertMessage("NOT_LOGIN");
        } else if (res?.response?.status === 500) {
          setAlertMessage("SERVER");
        }
      });
  };

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentInput(e.target.value);
  }, []);

  const dateConvert = (target: Date | undefined) => {
    return new Intl.DateTimeFormat("ko-KR", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(target || 0);
  };

  return (
    <Container>
      <h3>댓글</h3>
      <form>
        <input
          type="text"
          placeholder={
            cookie
              ? "최대 200자 입력할 수 있습니다."
              : "로그인 후 작성해주세요."
          }
          minLength={8}
          maxLength={200}
          value={commentInput}
          onChange={onChange}
          disabled={cookie ? false : true}
          style={{ cursor: cookie ? "auto" : "not-allowed" }}
        />
        <button type="submit" onClick={handleSubmitComment}></button>
      </form>
      <ul className="comment-list">
        {data && data?.length > 0 ? (
          data?.map((item) => (
            <CommentItem key={item.commentId} isMyComment={false}>
              {/* 내 댓글 여부는 추후 구현 시 처리 */}
              <p className="comment-content">
                <span className="comment-createby">
                  {item.createBy === "admin" ? "관리자" : item.createBy}
                </span>
                {item.content}
                <span className="comment-time">
                  {dateConvert(item.timestamp)}
                </span>
              </p>
              <p className="comment-button"></p>
            </CommentItem>
          ))
        ) : (
          <EmptyComment>
            댓글이 없습니다
            <br />
            <strong>이 회사의 첫 번째 댓글 주인공이 되어주세요</strong>
          </EmptyComment>
        )}
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
  margin: 36px 0 16px;
  .comment-createby {
    position: absolute;
    padding: 0 12px;
    width: 100%;
    top: -20px;
    right: 0;
    font-size: 0.85rem;
    font-weight: 500;
    text-align: ${(props) => (props.isMyComment ? "right" : "none")};
    opacity: 0.75;
  }
  .comment-content {
    position: relative;
    display: inline-block;
    padding: 12px 16px;
    background-color: ${(props) =>
      props.isMyComment ? COLOR.mainLight : "#dfdfdf"};
    border-radius: 20px;
    font-size: 0.9rem;
    text-align: ${(props) => (props.isMyComment ? "right" : "none")};
    line-height: 1.15rem;
    order: ${(props) => (props.isMyComment ? 2 : 1)};
  }
  .comment-time {
    display: block;
    margin: 2px 0 0;
    font-size: 0.8rem;
    letter-spacing: -0.3px;
    opacity: 0.45;
  }
  .comment-button {
    flex: 1;
    display: inline-block;
    opacity: 0.6;
    font-size: 0.8rem;
    text-align: ${(props) => (props.isMyComment ? "right" : "none")};
    order: ${(props) => (props.isMyComment ? 1 : 2)};
  }
`;

const EmptyComment = styled.div`
  margin: 32px 0 24px;
  text-align: center;
  font-size: 1rem;
  line-height: 1.55rem;
  strong {
    display: inline-block;
    margin: 8px 0 0;
    font-size: 1.1rem;
    font-weight: 500;
    word-break: keep-all;
  }
`;

export default Comments;
