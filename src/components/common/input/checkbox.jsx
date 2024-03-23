import React from "react";

const InputCheckbox = (props) => {
  return (
    <div className="mb-3 form-check">
      <input
        type="checkbox"
        className="form-check-input"
        id={props.id}
        name={props.id}
        onChange={props.onChange}
        checked={props.value}
      />
      <label className="form-check-label" htmlFor={props.id}>
        {props.label + "..."}
      </label>
    </div>
  );
};

export default InputCheckbox;
