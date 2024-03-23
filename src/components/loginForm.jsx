import React from "react";
import useForm from "../hooks/useForm";
import Joi from "joi-browser";
import InputField from "./common/input/field";
import InputCheckbox from "./common/input/checkbox";

const LoginForm = (props) => {
  const schema = {
    email: Joi.string().email().required().label("E-mail"),
    password: Joi.string().required().label("Password"),
    rememberUser: Joi.boolean(),
  };

  const { values, errors, handleChange, handleSubmit, submitDisabled } =
    useForm({
      initialValues: { email: "", password: "", rememberUser: false },
      onSubmit: (values) => {
        console.log(values);
      },
      schema,
    });

  return (
    <div className="container dark" style={{ padding: 20 }}>
      <form>
        <InputField
          type="email"
          error={errors["email"]}
          id="email"
          onChange={handleChange}
          value={values["email"]}
          label="E-mail"
        />
        <InputField
          type="password"
          error={errors["password"]}
          id="password"
          onChange={handleChange}
          value={values["password"]}
          label="Password"
        />
        <InputCheckbox
          id="rememberUser"
          label="Remember me"
          onChange={handleChange}
          value={values["rememberUser"]}
        />
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={submitDisabled}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
