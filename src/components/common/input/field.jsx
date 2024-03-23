import React from "react";
import styled from "styled-components";

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const StyledField = styled.input`
  outline: 0;
  font-size: 1rem;
  margin-top: 0.4rem;
  color: ${({ theme }) => theme.colors.primaryText};
  margin-bottom: 1.1rem;
  height: 2rem;
  padding-left: 0.5rem;
  background-color: inherit;
  border: 1px solid ${({ theme }) => theme.colors.secondaryText};
  border-radius: 5px;
  transition: 0.2s ease-in-out;

  &:focus {
    box-shadow: 0px 0px 10px 1px rgba(86, 86, 255, 0.5);
  }
`;

const InputField = (props) => {
  return (
    <MainDiv>
      <label htmlFor={props.id} className="form-label">
        {props.label}
      </label>
      <StyledField
        type={props.type}
        className="form-control darkInput"
        id={props.id}
        name={props.id}
        onChange={props.onChange}
        value={props.value}
        placeholder={props.label + "..."}
      />
      {props.error && <div className="alert alert-custom">{props.error}</div>}
    </MainDiv>
  );
};

export default InputField;
