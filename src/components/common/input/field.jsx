import React from "react";
import styled from "styled-components";
import Error from "./error";
import ReactTooltip from "react-tooltip";
import { useEffect, useRef } from "react";

const Input = styled.input`
  margin-bottom: ${(props) =>
    !props.noMargin ? (props["with-margin"] ? "1.1rem" : null) : null};
  flex-grow: ${({ grow }) => (grow ? 1 : "initial")};
`;

const StyledDiv = styled.div`
  display: flex;
  flex-grow: ${({ grow }) => (grow ? 1 : "initial")};
  justify-content: stretch;
`;

const InputField = ({
  id,
  type,
  label,
  error,
  value,
  onChange,
  withTitle = true,
  minifiedError,
  tooltipError,
  grow = false,
  noMargin = false,
}) => {
  const tooltipRef = useRef();

  useEffect(() => {
    if (tooltipError && error) {
      ReactTooltip.rebuild();
      ReactTooltip.show(tooltipRef.current);
    }
  }, [error, tooltipError]);

  const tooltipProps = tooltipError
    ? {
        "data-tip": id + "_tooltip",
        "data-for": id + "_tooltip",
        ref: tooltipRef,
      }
    : {};

  return (
    <StyledDiv className="flex-stretch" grow={grow}>
      {withTitle && (
        <label htmlFor={id} className="form-label">
          {label}
        </label>
      )}
      <Input
        type={type}
        id={id}
        name={id}
        onChange={onChange}
        value={value}
        placeholder={label + "..."}
        with-margin={!error}
        noMargin={noMargin}
        {...tooltipProps}
      />
      <Error
        error={error}
        minified={minifiedError}
        tooltipError={tooltipError}
        tooltipId={id + "_tooltip"}
      />
    </StyledDiv>
  );
};

export default InputField;
