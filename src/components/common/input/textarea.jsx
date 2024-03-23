import React from "react";
import styled from "styled-components";
import Error from "./error";

const Textarea = styled.textarea`
  margin-bottom: ${(props) => (props["with-margin"] ? "1.1rem" : null)};
  height: ${({ height }) => (height ? height : "100%")};
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  place-self: stretch stretch;
  align-self: stretch stretch;
  width: 98%;
`;

const WrapperDiv = styled.div`
  flex-grow: 1;
  align-content: stretch;
  justify-content: stretch;
  align-items: stretch;
  justify-items: stretch;
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
      <Error error={props.error} minified={props["secondary-error"]} />
    </WrapperDiv>
  );
};
export default TextArea;
