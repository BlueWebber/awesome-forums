import { useState } from "react";
import Joi from "joi-browser";
import { Redirect } from "react-router-dom";

const useForm = ({ initialValues, onSubmit, schema }) => {
  const [values, setValues] = useState(initialValues);
  const errorsObj = {};
  Object.keys(initialValues).map((key) => (errorsObj[key] = ""));
  const [errors, setErrors] = useState(errorsObj);
  const [redirect, setRedirect] = useState(null);

  const handleChange = (event) => {
    const { target } = event;
    const { name } = target;
    let value;
    target.type === "checkbox"
      ? (value = target.checked)
      : (value = target.value);
    const draftErrors = { ...errors };
    const error = validateProperty(target);
    if (error) draftErrors[name] = error;
    else delete draftErrors[name];
    setValues({ ...values, [name]: value });
    setErrors(draftErrors);
  };

  const validateProperty = ({ name, value }) => {
    const input = { [name]: value };
    const newSchema = { [name]: schema[name] };
    const { error } = Joi.validate(input, newSchema);
    return error ? error.details[0].message : null;
  };

  const validateInput = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(values, schema, options);
    if (!error) return null;
    const draftErrors = {};
    error.details.map((item) => (draftErrors[item.path[0]] = item.message));
    return draftErrors;
  };

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    onSubmit(values);
  };

  return {
    values,
    errors,
    setValues,
    setErrors,
    handleChange,
    handleSubmit,
    submitDisabled: Boolean(validateInput()),
    redirect: () => (redirect ? <Redirect to={redirect} /> : <></>),
    setRedirect,
  };
};

export default useForm;
