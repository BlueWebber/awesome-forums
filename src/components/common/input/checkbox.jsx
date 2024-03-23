import React from "react";

const InputCheckbox = (props) => {
  return (
    <div>
      <input
        type="checkbox"
        id={props.id}
        name={props.id}
        onChange={props.onChange}
        checked={props.value}
      />
      <label htmlFor={props.id}>{props.label + "..."}</label>
    </div>
  );
};

export default InputCheckbox;
