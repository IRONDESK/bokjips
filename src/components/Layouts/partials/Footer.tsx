import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";

function Footer() {
  return (
    <Container>
      <p>
        <strong>복지</strong>편살
      </p>
      <div>
        기업의 채용공고 및 사이트에 공개된 내용을 기반으로 작성된 내용입니다.
        <br />
        기업 및 기업의 복지 정보는 실제와 다르거나, 기업 내부 사정에 의해
        변경되었을 수 있습니다.
        <br />
        <br />
        <article className="footer-contact-wrap">
          최성원 Back-end | 손수철 Front-end + Design
          <ul>
            <li>
              <Link href="mailto:bokjips@gmail.com">
                <button className="material-symbols-outlined">email</button>
              </Link>
            </li>
            {/* <li><button className="material-symbols-outlined">code</button></li> */}
          </ul>
        </article>
      </div>
    </Container>
  );
}

const Container = styled.footer`
  padding: 40px 36px;
  background-color: #d8d8d8;
  opacity: 0.7;
  p {
    display: inline-block;
    font-family: "GangwonEdu";
    font-size: 1.85rem;
  }
  div {
    margin: 12px 0 0;
    font-size: 0.9rem;
    line-height: 1.6rem;
    word-break: keep-all;
  }
  .footer-contact-wrap {
    display: flex;
    justify-content: space-between;
    button {
      margin: 0 0 0 8px;
      padding: 0;
      width: 36px;
      height: 36px;
      border-radius: 100%;
      font-size: 1.25rem;
      text-align: center;
      &:hover {
        background-color: #000;
        color: #fff;
      }
    }
  }
  @media (max-width: 580px) {
    padding: 36px 20px;
    .footer-contact-wrap {
      flex-direction: column;
      gap: 16px;
      ul {
        text-align: right;
      }
    }
  }
`;

export default Footer;
