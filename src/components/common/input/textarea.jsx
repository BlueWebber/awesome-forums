import React from "react";
import styled from "styled-components";

const Textarea = styled.textarea`
  margin-bottom: ${(props) => (props["with-margin"] ? "1.1rem" : null)};
  height: ${({ height }) => (height ? height : "100%")};
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  place-self: stretch stretch;
  align-self: stretch stretch;
  width: 100%;
`;

const WrapperDiv = styled.div`
  flex-grow: 1;
  align-content: stretch;
  justify-content: stretch;
  align-items: stretch;
  justify-items: stretch;
  margin-right: 0.5rem;
`;

const WarningLabel = styled.label`
  color: ${({ theme }) => theme.colors.warning};
  font-size: 0.9rem;
`;

const TextArea = (props) => {
  return (
    <WrapperDiv>
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
      {props.error &&
        (!props["secondary-error"] ? (
          <div className="alert-div">
            <label>{props.error}</label>
          </div>
        ) : (
          <WarningLabel style={{ color: "red" }}>{props.error}</WarningLabel>
        ))}
    </WrapperDiv>
  );
};
export default TextArea;
