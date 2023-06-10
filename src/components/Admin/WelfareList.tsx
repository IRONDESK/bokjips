import React from "react";
import styled from "@emotion/styled";
import { Control, FieldValues, useFieldArray, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import Flicking from "@egjs/react-flicking";

import "@egjs/react-flicking/dist/flicking.css";
import { COLOR } from "../../constants/style";
import { WELFARES_ICONS } from "../../constants/welfares";

interface WelfareCardPropsType {
  register: UseFormRegister<FieldValues>;
  control: Control<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  corpId: string;
}

function WelfareList({ register, control, watch, setValue, corpId }: WelfareCardPropsType) {
  const { fields, append, prepend, remove } = useFieldArray({
    control,
    name: "value",
  });

  const setIconName = (e: React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement>, index: number) => {
    let target = (e.target as HTMLButtonElement).value;
    if (target) setValue(`value.${index}.icon`, target);
  };

  return (
    <Container>
      {fields.map((item, index) => (
        <Card key={item.id}>
          <label>
            <input type="text" {...register(`value.${index}.companyId`)} disabled={true} style={{ display: "none" }} />
          </label>
          <WorkingRadios>
            <label>
              조건
              <input {...register(`value.${index}.type`)} type="radio" value="근무 조건" />
            </label>
            <label>
              지원
              <input {...register(`value.${index}.type`)} type="radio" value="근무 지원" />
            </label>
            <label>
              근무외
              <input {...register(`value.${index}.type`)} type="radio" value="근무 외 지원" />
            </label>
            <label>
              환경
              <input {...register(`value.${index}.type`)} type="radio" value="사내 환경" />
            </label>
          </WorkingRadios>

          <IconWrap className="material-symbols-outlined">{watch(`value.${index}.icon`)}</IconWrap>
          <input type="text" {...register(`value.${index}.icon`)} placeholder="아이콘" />
          <IconList onClick={(e) => setIconName(e, index)}>
            <Flicking align="prev" bound={true} inputType={["touch", "mouse"]}>
              <span>아이콘 모음</span>
              {WELFARES_ICONS.map((item) => (
                <button value={item.value} type="button">
                  {item.name}
                </button>
              ))}
            </Flicking>
          </IconList>
          <input type="text" {...register(`value.${index}.title`)} placeholder="제목" />
          <input type="text" {...register(`value.${index}.content`)} placeholder="내용" />
          <div>
            <Delete
              type="button"
              className="material-symbols-outlined"
              onClick={() => {
                if (confirm("삭제하시겠습니까?")) remove(index);
              }}
            >
              delete
            </Delete>
          </div>
        </Card>
      ))}
      <Button
        type="button"
        onClick={() =>
          append({
            type: "",
            title: "",
            content: "",
            icon: "",
            companyId: corpId,
          })
        }
      >
        추가
      </Button>
    </Container>
  );
}

const Container = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  @media (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 690px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Card = styled.li`
  max-width: calc((100vw - 100px) / 3);
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  background-color: #fff;
  border-radius: 16px;
  input {
    padding: 6px 4px;
    font-size: 0.95rem;
    border: 1px solid #ececec;
  }
  @media (max-width: 960px) {
    max-width: calc((100vw - 60px) / 2);
  }
  @media (max-width: 690px) {
    max-width: calc((100vw - 40px));
    flex: 1;
    input {
      padding: 8px;
      font-size: 1rem;
    }
  }
`;

const WorkingRadios = styled.div`
  display: flex;
  padding: 0 2px;
  gap: 12px;
  label {
    flex: 1;
    cursor: pointer;
    padding: 8px 0;
    border: 2px solid #000;
    border-radius: 8px;
    color: #000;
    text-align: center;
    opacity: 0.4;
  }
  label:has(input:checked) {
    background-color: #000;
    color: #fff;
    font-weight: 600;
    opacity: 1;
  }
  input {
    display: none;
  }
  @media (max-width: 580px) {
    label {
      padding: 8px 2px;
      font-size: 1rem;
    }
  }
`;

const Delete = styled.button`
  float: right;
  padding: 0;
  width: 36px;
  height: 36px;
  background-color: ${COLOR.lightgray};
  border-radius: 100%;
  font-size: 1.25rem;
  &:hover {
    background-color: ${COLOR.report};
    color: #fff;
  }
`;

const IconList = styled.div`
  padding: 0 12px 0 0;
  transition: all 0.3s;
  overflow: hidden;
  .flicking-viewport {
    overflow: visible;
  }
  .flicking-camera {
    align-items: center;
  }
  span {
    padding: 0 4px 0 8px;
    font-size: 0.9rem;
    opacity: 0.6;
  }
  button {
    margin: 0 4px;
    padding: 8px;
    background-color: #ececec;
    border-radius: 4px;
    font-size: 0.9rem;
    &:hover {
      background-color: ${COLOR.main};
      color: #fff;
    }
    @media (max-width: 580px) {
      padding: 12px 8px;
      font-size: 0.95rem;
    }
  }
`;

const Button = styled.button`
  width: 3rem;
  height: 3rem;
  background-color: silver;
  border-radius: 100%;
  color: #fff;
  font-size: 0.95rem;
  &:hover {
    opacity: 0.8;
  }
`;

const IconWrap = styled.div`
  position: absolute;
  right: 12px;
  top: 60px;
  width: 3rem;
  height: 3rem;
  overflow: hidden;
  font-size: 2.5rem;
  text-align: right;
  @media (max-width: 580px) {
    top: 64px;
    font-size: 3rem;
  }
`;

export default WelfareList;
