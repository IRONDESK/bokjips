import styled from "@emotion/styled";
import React, { useRef } from "react";
import { COLOR } from "../../constants/style";

interface WelfareCardPropsType {
  index: number;
  watch: any;
  remove: any;
  register: any;
}

function WelfareCard({ index, watch, remove, register }: WelfareCardPropsType) {
  const iconValue = useRef();
  return (
    <Container>
      <TypeList>
        <label>
          <input
            type="radio"
            {...register(`welfares.${index}.type`)}
            value="근무 조건"
          />
          근무 조건
        </label>
        <label>
          <input
            type="radio"
            {...register(`welfares.${index}.type`)}
            value="근무 지원"
          />
          근무 지원
        </label>
        <label>
          <input
            type="radio"
            {...register(`welfares.${index}.type`)}
            value="근무 외 지원"
          />
          근무 외 지원
        </label>
        <label>
          <input
            type="radio"
            {...register(`welfares.${index}.type`)}
            value="사내 환경"
          />
          사내 환경
        </label>
      </TypeList>
      <IconWrap className="material-symbols-outlined">
        {watch(`welfares.${index}.icon`)}
      </IconWrap>
      <input
        type="text"
        ref={iconValue}
        {...register(`welfares.${index}.icon`)}
        placeholder="아이콘"
      />
      <input
        type="text"
        {...register(`welfares.${index}.title`)}
        placeholder="제목"
      />
      <input
        type="text"
        {...register(`welfares.${index}.content`)}
        placeholder="내용"
      />
      <div>
        <Delete
          className="material-symbols-outlined"
          onClick={() => {
            if (confirm("삭제하시겠습니까?")) remove(index);
          }}
        >
          delete
        </Delete>
      </div>
    </Container>
  );
}

const Container = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  input,
  select {
    padding: 4px 12px;
    font-size: 1rem;
  }
`;

const Delete = styled.button`
  float: right;
  width: 32px;
  height: 32px;
  background-color: ${COLOR.lightgray};
  border-radius: 100%;
  font-size: 1.25rem;
  &:hover {
    background-color: ${COLOR.report};
    color: #fff;
  }
`;

const TypeList = styled.div`
  margin: 0 0 8px;
  label {
    cursor: pointer;
    display: inline-block;
    margin: 0 4px 0 0;
    padding: 8px;
    background-color: #afafaf;
    border-radius: 8px;
    color: #fff;
    font-size: 0.95rem;
  }
  label:has(input:checked) {
    background-color: #555;
    font-weight: 500;
  }
  input {
    display: none;
  }
`;

const IconWrap = styled.div`
  position: absolute;
  right: 16px;
  top: 48px;
  width: 3rem;
  height: 3rem;
  overflow: hidden;
  font-size: 2.2rem;
`;

export default WelfareCard;
