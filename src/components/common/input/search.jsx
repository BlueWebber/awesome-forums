import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

const Input = styled.input`
  margin: 0 !important;
  border: none !important;
  box-shadow: none !important;
  flex-grow: 1;
`;

const SubmitButton = styled.button.attrs({ type: "submit" })`
  visibility: hidden;
  position: absolute;
`;

const WrapperForm = styled.input`
  flex-direction: row;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.primaryText};
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.secondaryText};
  transition: 0.15s ease-in-out;
  &:focus-within {
    box-shadow: 0px 0px 10px 1px ${({ theme }) => theme.colors.inputShadow};
  }
`;

const InputIcon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.colors.secondaryText};
  transition: 0.15s ease-in-out;
  padding: ${({ inner }) => (inner ? null : "0.5rem")};
`;

const DeleteButton = styled(InputIcon).attrs({ as: "button", type: "button" })`
  background-color: inherit;
  flex-grow: 0;
  border: 0;
  margin: 0;
  box-shadow: none;

  &:hover {
    & > * {
      color: ${({ theme }) => theme.colors.primaryText};
    }
    cursor: pointer;
    background-color: inherit;
  }

  &:focus {
    box-shadow: none;
  }
`;

const Search = (props) => {
  return (
    <WrapperForm onSubmit={props.onSubmit} as="form">
      <Input
        type="text"
        id={props.id}
        name={props.id}
        onChange={props.onChange}
        value={props.value}
        placeholder={props.label + "..."}
        disabled={props.disabled}
      />
      {props.value ? (
        <DeleteButton onClick={props.onReset}>
          <InputIcon inner="true" icon={faTimes} />
        </DeleteButton>
      ) : (
        <InputIcon icon={faSearch} />
      )}
      <SubmitButton />
    </WrapperForm>
  );
};

export default Search;
