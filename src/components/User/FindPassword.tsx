import React from "react";
import styled from "@emotion/styled";
import { UseFormRegister, UseFormWatch } from "react-hook-form";

import { JOB_TYPES } from "../../constants/job";
import { COLOR, SHADOW } from "../../constants/style";
import { IFindAccountDtosType } from "../../types/UserData";

interface IFindPasswordPropsType {
  register: UseFormRegister<IFindAccountDtosType>;
  watch: UseFormWatch<IFindAccountDtosType>;
}

function FindPassword({ register, watch }: IFindPasswordPropsType) {
  const selectedJob = watch("job");
  return (
    <>
      <Label>
        <p>아이디</p>
        <input type="text" placeholder=" " autoFocus={true} {...register("username")} required />
      </Label>
      <Label>
        <p>이메일</p>
        <input type="email" placeholder=" " {...register("email")} required />
      </Label>
      <Label job={selectedJob}>
        <p>직업</p>
        <select {...register("job")} required>
          <option value="">--- 직업 선택 ---</option>
          {JOB_TYPES.map((el) => (
            <option key={el.value} value={el.value}>
              {el.name}
            </option>
          ))}
        </select>
      </Label>

      <Label>
        <p>생년월일</p>
        <input type="date" placeholder=" " {...register("dateOfBirth")} required />
      </Label>
    </>
  );
}

const Label = styled.label<{ job?: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 0 24px;
  padding: 4px 28px;
  height: 96px;
  background-color: #fff;
  border-radius: 28px;
  color: #858585;
  transition: all 0.3s;
  p {
    transition: all 0.3s;
  }
  input,
  select {
    width: 0;
    height: 0;
    padding: 0;
    background-color: transparent;
    opacity: 0;
    font-size: 1px;
    transition: all 0.3s;
    border: none;
    outline: none;
    appearance: none;
  }
  .password-error-msg {
    position: absolute;
    opacity: 0;
  }
  &:has(input:focus),
  &:has(input:not(:placeholder-shown)),
  &:has(select:focus) ${(props) => (props.job === "" || !props.job ? "" : ", &:has(select)")} {
    box-shadow: ${SHADOW.basic};
    p {
      font-size: 0.85rem;
    }
    input,
    select {
      width: 100%;
      height: auto;
      padding: 8px 0 0;
      opacity: 1;
      font-size: 1.1rem;
    }
  }
  &:has(input:focus),
  &:has(select:focus) {
    box-shadow: ${SHADOW.hover};
    .password-error-msg {
      display: block;
      top: 24px;
      right: 24px;
      text-align: right;
      color: ${COLOR.report};
      font-size: 0.9rem;
      opacity: 0.6;
    }
  }
`;

export default FindPassword;
