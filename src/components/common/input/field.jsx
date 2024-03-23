import React from "react";
import styled from "styled-components";

const Input = styled.input`
  margin-bottom: ${(props) => (props["with-margin"] ? "1.1rem" : null)};
`;

const InputField = (props) => {
  return (
    <div className="flex-stretch">
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
        <div className="alert-div">
          <label>{props.error}</label>
        </div>
      )}
    </div>
  );
};

export default InputField;
