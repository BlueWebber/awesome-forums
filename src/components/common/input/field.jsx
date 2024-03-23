import React from "react";
import styled from "styled-components";

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Input = styled.input`
  margin-bottom: ${(props) => (props["with-margin"] ? "1.1rem" : null)};
`;

const AlertDiv = styled.div`
  background-color: ${({ theme }) => theme.colors.warning};
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  padding-left: 0.5rem;
  margin-bottom: 1.1rem;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.warningBorder};
`;

const InputField = (props) => {
  return (
    <MainDiv>
      <label htmlFor={props.id} className="form-label">
        {props.label}
      </label>
      <Input
        type={props.type}
        id={props.id}
        name={props.id}
        onChange={props.onChange}
        value={props.value}
        placeholder={props.label + "..."}
        with-margin={!props.error}
      />
      {props.error && (
        <AlertDiv>
          <label>{props.error}</label>
        </AlertDiv>
      )}
    </MainDiv>
  );
};

export default InputField;
