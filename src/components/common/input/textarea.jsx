import React from "react";
import styled from "styled-components";

const Textarea = styled.textarea`
  margin-bottom: ${(props) => (props["with-margin"] ? "1.1rem" : null)};
  height: ${({ height }) => height};
`;

const TextArea = (props) => {
  return (
    <div className="flex-stretch">
      {!props.untitled && (
        <label htmlFor={props.id} className="form-label">
          {props.label}
        </label>
      )}
      <Textarea
        id={props.id}
        name={props.id}
        onChange={props.onChange}
        value={props.value}
        placeholder={props.label + "..."}
        with-margin={!props.error}
        height={props.height}
      />
      {props.error && (
        <div className="alert-div">
          <label>{props.error}</label>
        </div>
      )}
    </div>
  );
};
export default TextArea;
