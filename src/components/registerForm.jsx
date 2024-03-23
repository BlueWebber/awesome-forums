import React from "react";
import useForm from "../hooks/useForm";
import Joi from "joi-browser";
import InputField from "./common/input/field";
import CardDiv from "./styles/common/cardDiv";
import Button from "./styles/common/button";

const RegisterForm = (props) => {
  const schema = {
    email: Joi.string().email().required().label("E-mail"),
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  const { values, errors, handleChange, handleSubmit, submitDisabled } =
    useForm({
      initialValues: { email: "", password: "", username: "" },
      onSubmit: (values) => {
        console.log(values);
      },
      schema,
    });

  return (
    <CardDiv max-width="40rem">
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
          type="text"
          id="username"
          error={errors["username"]}
          onChange={handleChange}
          value={values["username"]}
          label="Username"
        />
        <InputField
          type="password"
          error={errors["password"]}
          id="password"
          onChange={handleChange}
          value={values["password"]}
          label="Password"
        />
        <Button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={submitDisabled}
          max-width="5rem"
        >
          Register
        </Button>
      </form>
    </CardDiv>
  );
};

export default RegisterForm;
