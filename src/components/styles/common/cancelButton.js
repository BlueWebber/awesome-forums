import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const InputIcon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.colors.secondaryText};
  transition: 0.15s ease-in-out;
  padding: ${({ inner }) => (inner ? null : "0.5rem")};
`;

const DeleteButton = styled.button`
  background-color: inherit;
  flex-grow: 0;
  border: 0;
  margin: 0;
  box-shadow: none;
  color: ${({ theme }) => theme.colors.secondaryText};
  transition: 0.15s ease-in-out;
  padding: ${({ inner }) => (inner ? null : "0.5rem")};
  position: ${({ top }) => (top ? "absolute" : "initial")};
  top: ${({ top }) => (top ? "5px" : "initial")};
  right: ${({ top }) => (top ? "5px" : "initial")};
  z-index: 1;

  &:hover {
    & > * {
      color: ${({ theme }) => theme.colors.primaryText};
    }
    cursor: pointer;
    background-color: inherit;
    outline: 0;
    border: 0;
    color: ${({ theme }) => theme.colors.secondaryText};
  }

  &:focus {
    box-shadow: none;
  }
`;

const CancelButton = ({ type, top, onClick }) => {
  const typeProp = type ? { type } : {};
  return (
    <DeleteButton {...typeProp} top={top} onClick={onClick}>
      <InputIcon icon={faTimes} />
    </DeleteButton>
  );
};

export default CancelButton;
