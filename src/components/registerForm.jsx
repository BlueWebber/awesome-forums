import React from "react";
import useForm from "../hooks/useForm";
import Joi from "joi-browser";
import InputField from "./common/input/field";
import CardDiv from "./styles/common/cardDiv";
import Button from "./styles/common/button";
import Spinner from "./common/spinner";
import useAxios from "axios-hooks";
import * as auth from "../services/auth";

const RegisterForm = (props) => {
  const schema = {
    email: Joi.string()
      .email({ minDomainAtoms: 2 })
      .min(3)
      .max(355)
      .required()
      .label("E-mail"),
    username: Joi.string().min(4).max(26).required().label("Username"),
    password: Joi.string().min(4).max(1000).required().label("Password"),
  };

  const [{ loading }, executePost] = useAxios(
    {
      url: "users",
      method: "POST",
    },
    { manual: true }
  );

  const doSubmit = async (values) => {
    let val = null;
    try {
      val = await executePost({ data: values });
    } catch (ex) {
      if (ex.response && ex.response.status === 409) {
        const message = ex.response.data.message;
        message.startsWith("Username")
          ? setErrors({ username: message })
          : setErrors({ email: message });
      } else {
        setErrors({
          email: "An unknown error has occured, please try again later",
        });
      }
      return;
    }
    auth.setToken(val.data.token, true);
    const { state } = props.location;
    window.location = state ? state.from.pathname : "/posts";
  };

  const {
    values,
    errors,
    setErrors,
    handleChange,
    handleSubmit,
    submitDisabled,
  } = useForm({
    initialValues: { email: "", password: "", username: "" },
    onSubmit: doSubmit,
    schema,
  });

  return (
    <CardDiv max-width="40rem" disabled={loading}>
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
      {loading && <Spinner />}
    </CardDiv>
  );
};

export default RegisterForm;
