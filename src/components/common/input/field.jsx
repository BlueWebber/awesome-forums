import React from "react";

const InputField = (props) => {
  return (
    <div className="mb-3">
      <label htmlFor={props.id} className="form-label">
        {props.label}
      </label>
      <input
        type={props.type}
        className="form-control darkInput"
        id={props.id}
        name={props.id}
        onChange={props.onChange}
        value={props.value}
        placeholder={props.label + "..."}
      />
      {props.error && <div className="alert alert-custom">{props.error}</div>}
    </div>
  );
};

export default InputField;
