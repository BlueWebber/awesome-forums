import SecondaryCardDiv from "../styles/common/secondaryCardDiv";
import Joi from "joi-browser";
import useAxios from "axios-hooks";
import useForm from "../../hooks/useForm";
import Spinner from "./spinner";
import Button from "../styles/common/button";
import TextArea from "./input/textarea";
import styled from "styled-components";
import { Link } from "react-router-dom";

const WrapperDiv = styled(SecondaryCardDiv)`
  margin-top: 1rem;
  text-align: start;
`;

const StyledLabel = styled.label`
  color: ${({ theme }) => theme.colors.secondaryText};
`;

const ReplyEditor = ({ postId, afterSubmit, user }) => {
  const schema = {
    body: Joi.string().trim().required().min(10).max(15000).label("Reply"),
  };

  const [{ loading }, executePost] = useAxios(
    {
      url: `post_replies/${postId}`,
      method: "POST",
    },
    { manual: true }
  );

  const doSubmit = async (values) => {
    let resp = null;
    try {
      resp = await executePost({ data: values });
    } catch (ex) {
      setErrors({
        body: "An unknown error has occured, please try again later",
      });
      return;
    }
    setValues({ body: "" });
    console.log(resp.data);
    afterSubmit(resp.data);
  };

  const {
    values,
    errors,
    setErrors,
    handleChange,
    handleSubmit,
    submitDisabled,
    setValues,
  } = useForm({
    initialValues: { body: "" },
    onSubmit: doSubmit,
    schema,
  });

  return (
    <WrapperDiv disabled={loading} direction="row">
      <StyledLabel>
        Leave a reply as{" "}
        <Link to={`/profile/${user["user_id"]}`} className="post-link">
          {user["username"]}
        </Link>
      </StyledLabel>
      <form>
        <TextArea
          error={errors["body"]}
          id="body"
          onChange={handleChange}
          value={values["body"]}
          label="Leave a reply."
          height="6rem"
          untitled
          ignoreEmpty={true}
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
