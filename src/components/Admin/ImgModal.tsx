import React from "react";
import styled from "@emotion/styled";
import { SHADOW } from "../../constants/style";

interface IImgModalPropsType {
  children: any;
  isShowImgModal: boolean;
  setIsShowImgModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function ImgModal({
  children,
  isShowImgModal,
  setIsShowImgModal,
}: IImgModalPropsType) {
  return (
    <>
      <Modal ImgModal={isShowImgModal}>{children}</Modal>
      {isShowImgModal && (
        <BackDrop onClick={() => setIsShowImgModal((prev) => !prev)}></BackDrop>
      )}
    </>
  );
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
  z-index: 2;
`;

const BackDrop = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.05);
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  user-select: none;
  z-index: 1;
`;

export default ImgModal;
