import styled from "@emotion/styled";
import React, { useRef } from "react";
import { useFieldArray } from "react-hook-form";
import { WELFARE_TYPES } from "../../constants/job";
import { COLOR } from "../../constants/style";

interface WelfareCardPropsType {
  register: any;
  control: any;
  watch: any;
  typeName: string;
}

function WelfareList({
  register,
  control,
  watch,
  typeName,
}: WelfareCardPropsType) {
  const { fields, append, prepend, remove } = useFieldArray({
    control,
    name: typeName,
  });

  return (
    <Container>
      {fields.map((item, index) => (
        <Card key={item.id}>
          <label>
            <input
              type="text"
              {...register(`${typeName}.${index}.type`)}
              disabled={true}
            />
          </label>

          <IconWrap className="material-symbols-outlined">
            {watch(`${typeName}.${index}.icon`)}
          </IconWrap>
          <input
            type="text"
            {...register(`${typeName}.${index}.icon`)}
            placeholder="아이콘"
          />
          <input
            type="text"
            {...register(`${typeName}.${index}.title`)}
            placeholder="제목"
          />
          <input
            type="text"
            {...register(`${typeName}.${index}.content`)}
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
        </Card>
      ))}
      <Button
        type="button"
        onClick={() =>
          append({
            type: WELFARE_TYPES[typeName],
            title: "",
            content: "",
            icon: "",
          })
        }
      >
        추가
      </Button>
    </Container>
  );
}

const Container = styled.ul`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
`;

const Card = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 12px;
  background-color: #fff;
  border-radius: 16px;
  label:first-of-type {
    display: none;
  }
  input,
  select {
    padding: 4px 12px;
    font-size: 0.95rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
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
  top: 12px;
  width: 3rem;
  height: 3rem;
  overflow: hidden;
  font-size: 2.2rem;
  text-align: right;
`;

export default WelfareList;
