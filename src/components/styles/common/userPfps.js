import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faImages } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useRef, useState } from "react";
import ImageCropper from "../../common/imageCropper";

export const DefaultPfp = styled(FontAwesomeIcon).attrs({
  icon: faUser,
})`
  font-size: ${(props) => props["display-size"]};
  grid-area: author;
  margin-bottom: 1rem;
  border-radius: 10px;
`;

export const UserPfp = styled(DefaultPfp).attrs({ as: "img" })`
  width: ${(props) => props["display-size"]};
  height: ${(props) => props["display-size"]};
`;

export const UserPfpEx = (props) => {
  return (
    <div>
      {props.src ? (
        <UserPfp src={props.src} display-size={props["display-size"]} />
      ) : (
        <DefaultPfp display-size={props["display-size"]} />
      )}
    </div>
  );
};

const HiddenInput = styled.input`
  display: none;
`;

const InputWrapper = styled.div`
  position: relative;

  &:hover {
    cursor: pointer;
  }
`;

const AddPfpIcon = styled(FontAwesomeIcon).attrs({ icon: faImages })`
  position: absolute;
  top: 0;
  right: 0;
  &:hover {
    cursor: pointer;
  }
  color: ${({ theme }) => theme.colors.buttonText};
`;

export const UserPfpInput = (props) => {
  const inputRef = useRef();
  const [currentPfp, setCurrentPfp] = useState(props.src);
  const [isCropping, setIsCropping] = useState(false);

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleChange = async () => {
    inputRef.current.files[0].type === "image/gif"
      ? handleSubmit(await getBase64(inputRef.current.files[0]))
      : setIsCropping(true);
  };

  const handleSubmit = async (src) => {
    setIsCropping(false);
    setCurrentPfp(src);
    inputRef.current.value = "";
    props.onEditSubmit(src);
  };

  const handleCancel = () => {
    setIsCropping(false);
    inputRef.current.value = "";
  };

  return (
    <>
      <InputWrapper onClick={() => inputRef.current.click()}>
        <AddPfpIcon />
        <UserPfpEx {...{ ...props, src: currentPfp }} />
        <HiddenInput
          type="file"
          id="avatarSelector"
          accept="image/png, image/jpeg, image/jpg, image/gif"
          ref={inputRef}
          onChange={handleChange}
        />
      </InputWrapper>
      {isCropping && (
        <ImageCropper
          defaultSrc={URL.createObjectURL(inputRef.current.files[0])}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
};
