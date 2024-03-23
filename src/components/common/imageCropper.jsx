import React, { useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import styled from "styled-components";
import CancelButton from "../styles/common/cancelButton";

const WrapperDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1001;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContainerDiv = styled.div`
  background-color: ${({ theme }) => theme.colors.dark};
  padding: 1rem;
  padding-top: 1.5rem;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1005;
`;

const CropperDiv = styled.div`
  padding-top: 1rem;
`;

const ImageCropper = ({ defaultSrc, onCancel, onSubmit }) => {
  const [cropper, setCropper] = useState();

  const getCropData = () => {
    return cropper && cropper.getCroppedCanvas().toDataURL();
  };

  const handleExit = (event) => {
    if (event.target === event.currentTarget) {
      onCancel();
    }
  };

  return (
    <WrapperDiv onClick={handleExit}>
      <ContainerDiv>
        <CancelButton top={true} onClick={onCancel} />
        <CropperDiv>
          <Cropper
            style={{ maxWidth: "90vw", maxHeight: "70vh" }}
            aspectRatio={1}
            src={defaultSrc}
            viewMode={1}
            minCropBoxHeight={128}
            minCropBoxWidth={128}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false}
            guides={true}
            onInitialized={(instance) => {
              setCropper(instance);
            }}
            movable={false}
          />
        </CropperDiv>
        <button onClick={() => onSubmit(getCropData())}>Submit</button>
      </ContainerDiv>
    </WrapperDiv>
  );
};

export default ImageCropper;
