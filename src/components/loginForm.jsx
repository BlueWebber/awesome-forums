import React from "react";
import useForm from "../hooks/useForm";
import Joi from "joi-browser";
import InputField from "./common/input/field";
import InputCheckbox from "./common/input/checkbox";
import CardDiv from "./styles/common/cardDiv";
import Button from "./styles/common/button";
import useAxios from "axios-hooks";
import Spinner from "./common/spinner";
import * as auth from "../services/auth";

const LoginForm = (props) => {
  const schema = {
    email: Joi.string()
      .email({ minDomainAtoms: 2 })
      .min(3)
      .max(355)
      .required()
      .label("E-mail"),
    password: Joi.string().required().min(4).max(26).label("Password"),
    rememberUser: Joi.boolean(),
  };

  const [{ loading }, executePost] = useAxios(
    {
      url: "auth",
      method: "POST",
    },
    { manual: true }
  );

  const doSubmit = async (values) => {
    try {
      const val = await executePost({ data: values });
      auth.setToken(val.data, values["rememberUser"]);
    } catch (ex) {
      ex.response && ex.response.status === 401
        ? setErrors({ email: ex.response.data.message })
        : setErrors({
            email: "An unknown error has occured, please try again later",
          });
    }
    console.log(auth.getDecodedToken());
  };

  const {
    values,
    errors,
    setErrors,
    handleChange,
    handleSubmit,
    submitDisabled,
  } = useForm({
    initialValues: { email: "", password: "", rememberUser: false },
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
        <Button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={submitDisabled}
          max-width="5rem"
        >
          Login
        </Button>
      </form>
      {loading && <Spinner />}
    </CardDiv>
  );
};

export default LoginForm;
