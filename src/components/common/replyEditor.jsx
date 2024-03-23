import SecondaryCardDiv from "../styles/common/secondaryCardDiv";
import Joi from "joi-browser";
import useAxios from "axios-hooks";
import useForm from "../../hooks/useForm";
import Spinner from "./spinner";
import Button from "../styles/common/button";
import TextArea from "./input/textarea";
import styled from "styled-components";

const WrapperDiv = styled(SecondaryCardDiv)`
  margin-top: 1rem;
`;

const ReplyEditor = ({ postId }) => {
  const schema = {
    body: Joi.string().required().min(10).max(15000).label("Body"),
  };

  const [{ loading }, executePost] = useAxios(
    {
      url: `post_replies/${postId}`,
      method: "POST",
    },
    { manual: true }
  );

  const doSubmit = async (values) => {
    try {
      await executePost({ data: values });
    } catch (ex) {
      setErrors({
        body: "An unknown error has occured, please try again later",
      });
      return;
    }
  };

  const {
    values,
    errors,
    setErrors,
    handleChange,
    handleSubmit,
    submitDisabled,
  } = useForm({
    initialValues: { body: "" },
    onSubmit: doSubmit,
    schema,
  });

  return (
    <WrapperDiv disabled={loading} direction="column">
      <form>
        <TextArea
          error={errors["body"]}
          id="body"
          onChange={handleChange}
          value={values["body"]}
          label="Leave a reply..."
          height="6rem"
          untitled
        />
        <Button
          type="submit"
          onClick={handleSubmit}
          disabled={submitDisabled}
          max-width="7rem"
        >
          Post reply
        </Button>
      </form>
      {loading && <Spinner />}
    </WrapperDiv>
  );
};

export default ReplyEditor;
