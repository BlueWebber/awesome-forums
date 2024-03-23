import CardDiv from "./styles/common/cardDiv";
import Joi from "joi-browser";
import useAxios from "axios-hooks";
import useForm from "../hooks/useForm";
import InputField from "./common/input/field";
import InputCheckbox from "./common/input/checkbox";
import Spinner from "./common/spinner";
import Button from "./styles/common/button";
import perm from "./misc/permMap";
import TextArea from "./common/input/textarea";
import UserContext from "../context/userContext";
import { useContext } from "react";

const PostEditor = () => {
  const { user } = useContext(UserContext);
  const isMod = user["permission_level"] > perm.normal;

  const schema = {
    title: Joi.string().trim().min(4).max(150).required().label("Title"),
    body: Joi.string().trim().required().min(10).max(15000).label("Body"),
  };

  if (isMod) {
    schema.pinPost = Joi.boolean();
  }

  const [{ loading }, executePost] = useAxios(
    {
      url: "post",
      method: "POST",
    },
    { manual: true }
  );

  const doSubmit = async (values) => {
    values["pin_post"] = isMod ? values.pinPost : false;
    let result = null;
    try {
      result = await executePost({ data: values });
    } catch (ex) {
      setErrors({
        title: "An unknown error has occured, please try again later",
      });
      return;
    }
    setRedirect(`/post/${result.data["post_id"]}`);
  };

  const initialValues = { title: "", body: "" };
  if (isMod) initialValues.pinPost = false;

  const {
    values,
    errors,
    setErrors,
    handleChange,
    handleSubmit,
    submitDisabled,
    setRedirect,
    redirect: Redirect,
  } = useForm({
    initialValues,
    onSubmit: doSubmit,
    schema,
  });

  return (
    <CardDiv max-width="80rem" disabled={loading} direction="column">
      <Redirect />
      <form>
        <InputField
          type="text"
          error={errors["title"]}
          id="title"
          onChange={handleChange}
          value={values["title"]}
          label="Title"
        />
        <TextArea
          error={errors["body"]}
          id="body"
          onChange={handleChange}
          value={values["body"]}
          label="Body"
          height="25rem"
        />
        {isMod && (
          <InputCheckbox
            id="pinPost"
            label="Pin this post"
            onChange={handleChange}
            value={values["pinPost"]}
          />
        )}
        <Button
          type="submit"
          onClick={handleSubmit}
          disabled={submitDisabled}
          max-width="7rem"
        >
          Submit Post
        </Button>
      </form>
      {loading && <Spinner />}
    </CardDiv>
  );
};

export default PostEditor;
