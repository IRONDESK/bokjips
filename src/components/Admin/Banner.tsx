import React from "react";
import styled from "@emotion/styled";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { JOB_TYPES } from "../../constants/job";
import { ICompanyDataTypes } from "../../types/CompanyData";

interface BannerPropsType {
  companyData?: ICompanyDataTypes;
  register: UseFormRegister<ICompanyDataTypes>;
}

function Banner({ companyData, register }: BannerPropsType) {
  return (
    <Container>
      <div className="form-banner-top">
        <img src="https://image.rocketpunch.com/company/5466/naver_logo.png?s=400x400&t=inside" />
        <input
          type="text"
          placeholder="회사명"
          autoFocus={true}
          {...register("name")}
        />
        <select {...register("classification")}>
          <option value="">전체산업</option>
          {JOB_TYPES.map((el) => (
            <option
              key={el.value}
              value={el.value}
              selected={companyData?.classification === el.name}
            >
              {el.name}
            </option>
          ))}
        </select>
        <label>
          <span>상장여부</span>
          <input
            type="checkbox"
            defaultChecked={companyData?.isPublicStock}
            placeholder=" "
            {...register("isPublicStock")}
          />
        </label>
        <select {...register("isInclusiveWage")}>
          <option value="Y">포괄임금</option>
          <option value="N">비포괄임금</option>
          <option value="NULL">알 수 없음</option>
        </select>
      </div>
      <div className="form-banner-bottom">
        <Label>
          <p>초봉</p>
          <input type="number" placeholder=" " {...register("wage")} />
        </Label>
        <Label>
          <p>웹사이트</p>
          <input type="text" placeholder=" " {...register("site")} />
        </Label>
        <Label>
          <p>채용정보</p>
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
    img {
      width: 48px;
      height: 48px;
      border-radius: 16px;
    }
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
  .form-banner-bottom {
    display: flex;
    width: 100%;
    gap: 24px;
  }
`;

const Label = styled.label`
  flex: 1;
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0 0 12px;
  transition: all 0.3s;
  p {
    flex: 0.85;
    color: #858585;
    transition: all 0.3s;
  }
  input {
    flex: 3;
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
