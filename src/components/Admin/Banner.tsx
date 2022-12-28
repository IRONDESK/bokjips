import React, { useState } from "react";
import styled from "@emotion/styled";
import { FieldValues, UseFormRegister, UseFormWatch } from "react-hook-form";
import { COMPANY_TYPES } from "../../constants/job";
import { ICompanyDataTypes } from "../../types/CompanyData";
import { SHADOW } from "../../constants/style";

interface BannerPropsType {
  companyData?: ICompanyDataTypes;
  watch: UseFormWatch<ICompanyDataTypes>;
  register: UseFormRegister<ICompanyDataTypes>;
}

function IMG_Modal({
  children,
  ImgModal,
}: {
  children: any;
  ImgModal: boolean;
}) {
  return <Modal ImgModal={ImgModal}>{children}</Modal>;
}
const Modal = styled.div<{ ImgModal: boolean }>`
  position: absolute;
  top: 44px;
  left: 44px;
  width: ${(props) => (props.ImgModal ? "360px" : "0")};
  height: ${(props) => (props.ImgModal ? "100px" : "0")};
  background-color: #fff;
  z-index: 1;
  border-radius: 20px;
  box-shadow: ${SHADOW.basic};
  transition: all 0.3s;
  overflow: hidden;
  input {
    width: 100%;
    box-shadow: ${SHADOW.basic};
  }
  p {
    margin: 16px 0 0;
    opacity: 0.8;
    font-size: 0.95rem;
    text-align: center;
  }
`;

function Banner({ companyData, watch, register }: BannerPropsType) {
  const [ImgModal, setImgModal] = useState(false);
  return (
    <Container>
      <div className="form-banner-top">
        <LogoInsert>
          <IMG_Modal ImgModal={ImgModal}>
            <input type="text" placeholder="URL" {...register("logo")} />
            <p>로고 이미지의 URL을 입력해주세요.</p>
          </IMG_Modal>
          <img onClick={() => setImgModal(!ImgModal)} src={watch("logo")} />
        </LogoInsert>
        <input
          type="text"
          placeholder="회사명"
          autoFocus={true}
          required
          {...register("name")}
        />
        <select {...register("classification")}>
          <option value="">전체산업</option>
          {COMPANY_TYPES.map((el) => (
            <option key={el.value} value={el.value}>
              {el.name}
            </option>
          ))}
        </select>
        <div className="form-banner-top-mobile">
          <label>
            <span>상장여부</span>
            <input
              type="checkbox"
              defaultChecked={companyData?.isPublicStock}
              placeholder=" "
              {...register("isPublicStock")}
            />
          </label>
          <label>
            <span>현직인증</span>
            <input
              type="checkbox"
              defaultChecked={companyData?.isCertified}
              placeholder=" "
              {...register("isCertified")}
            />
          </label>
          <select {...register("isInclusiveWage")}>
            <option value="Y">포괄임금</option>
            <option value="N">비포괄임금</option>
            <option value="NULL">알 수 없음</option>
          </select>
        </div>
      </div>
      <div className="form-banner-bottom">
        <Label>
          <p>직원수(명)</p>
          <input
            type="number"
            placeholder=" "
            {...register("numberOfEmployee")}
          />
        </Label>
        <Label>
          <p>초봉(만원)</p>
          <input type="number" placeholder=" " {...register("wage")} />
        </Label>
        <Label>
          <p>웹사이트</p>
          <input type="text" placeholder=" " required {...register("site")} />
        </Label>
        <Label>
          <p>채용사이트</p>
          <input type="text" placeholder=" " {...register("recruitmentSite")} />
        </Label>
      </div>
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  margin: 0 auto 32px;
  padding: 0 40px;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  .form-banner-top {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    input[type="text"] {
      flex: 1;
      height: 48px;
      padding: 4px 20px;
      background-color: #fff;
      border-radius: 16px;
      font-size: 1rem;
    }
    select {
      padding: 0 16px;
      height: 48px;
      border-radius: 16px;
      font-size: 1rem;
    }
  }
  .form-banner-top-mobile {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
  }
  .form-banner-bottom {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
    gap: 24px;
  }
  @media (max-width: 860px) {
    .form-banner-top {
      flex-wrap: wrap;
    }
  }
  @media (max-width: 690px) {
    padding: 0 20px;
    .form-banner-bottom {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
  }
`;

const LogoInsert = styled.div`
  position: relative;
  img {
    cursor: pointer;
    width: 48px;
    height: 48px;
    border-radius: 12px;
    object-fit: cover;
  }
`;

const Label = styled.label`
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0 0 12px;
  transition: all 0.3s;
  p {
    flex: 0.9;
    color: #858585;
    transition: all 0.3s;
  }
  input {
    flex: 2.5;
    height: auto;
    padding: 0 0 4px;
    background-color: transparent;
    border-bottom: 2px solid #858585;
    font-size: 1rem;
  }
  &:has(input:focus),
  &:has(input:not(:placeholder-shown)) {
    p {
      color: #000;
    }
    input {
      border-bottom: 2px solid black;
    }
  }
`;

export default Banner;
