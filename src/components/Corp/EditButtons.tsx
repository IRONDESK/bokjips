import React from "react";
import styled from "@emotion/styled";
import { COLOR } from "../../constants/style";
import Link from "next/link";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import axios from "axios";
import { useAtom } from "jotai";

import { DeleteCompanyData, URL } from "../../api/CompanyApi";
import { activeAlert } from "../../atoms/atoms";

function EditButtons({ companyId }: { companyId: string }) {
  const router = useRouter();
  const [, setAlertMessage] = useAtom(activeAlert);
  const cookie = getCookie("accessToken") as string;
  const onDelete = () => {
    const delConfirm = confirm(
      `회사 정보를 삭제하시겠습니까?\n삭제된 정보는 복구되지 않습니다.`
    );
    if (delConfirm) {
      DeleteCompanyData(companyId, cookie)
        .then((res) => {
          setAlertMessage("DEL_COMPANY");
          router.push("/");
        })
        .catch((res) => {
          if (res?.response?.status === 500) {
            setAlertMessage("SERVER");
          } else if (res?.response?.status === 401) {
            setAlertMessage("NOT_LOGIN");
          }
        });
    }
  };

  return (
    <UL>
      <li>
        <Link href={`/adm/edit/${companyId}`}>기본수정</Link>
      </li>
      <li>
        <Link href={`/adm/welfare?id=${companyId}&type=edit`}>복지수정</Link>
      </li>
      <li onClick={onDelete}>삭제</li>
    </UL>
  );
}

const UL = styled.ul`
  text-align: right;
  li {
    cursor: pointer;
    display: inline-block;
    margin: 0 0 0 12px;
    padding: 8px 12px;
    background-color: ${COLOR.main};
    border-radius: 7px;
    color: #fff;
    font-size: 0.95rem;
    line-height: 1rem;
    text-align: center;
  }
`;

export default EditButtons;
