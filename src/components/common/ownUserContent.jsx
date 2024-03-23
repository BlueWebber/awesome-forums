import SecondaryCardDiv from "../styles/common/secondaryCardDiv";
import styled from "styled-components";
import AuthorDetails from "./authorDetails";
import PostReactions from "./postReactions";
import PostControls from "./postControls";
import perm from "../misc/permMap";
import { useState, useContext } from "react";
import useForm from "../../hooks/useForm";
import TextArea from "./input/textarea";
import Joi from "joi-browser";
import useAxios from "axios-hooks";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/userContext";

const PostDiv = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: flex-start;
  align-content: flex-start;
  grid-area: post;
  word-wrap: break-word;
  word-break: break-all;
  place-self: stretch stretch;
  align-items: stretch;
  justify-items: stretch;
  justify-content: stretch;
  align-content: stretch;
`;

const PostDate = styled.time`
  grid-area: post-date;
  color: ${({ theme }) => theme.colors.secondaryText};
  font-size: 0.9rem;
`;

const MainDiv = styled.div`
  flex-grow: 1;
  display: grid;
  grid-template-columns: 140px auto 40px;
  grid-template-rows: ${(props) =>
      props["with-date-margin"] ? "25px" : "10px"} auto 50px;
  grid-template-areas:
    "author post-date post-date"
    "author post post"
    "author post-reactions post-controls";
  place-items: start start;
  place-content: start stretch;
`;

const WrapperDiv = styled(SecondaryCardDiv)`
  padding-bottom: 0.2rem;
`;

const OwnUserContent = ({
  post,
  reactions_type,
  onReplyDelete,
  reactionsTypes,
}) => {
  const [isEditting, setIsEditting] = useState(false);
  const history = useHistory();
  const schema = {
    body: Joi.string().required().min(10).max(15000).label("Body"),
  };

  const reqUrl =
    reactions_type === "post_reactions"
      ? `post/${post.post_id}`
      : `post_reply/${post.reply_id}`;

  const [{ editLoading }, executeEdit] = useAxios(
    {
      url: reqUrl,
      method: "PATCH",
    },
    { manual: true }
  );

  const [{ loading }, executeDelete] = useAxios(
    {
      url: reqUrl,
      method: "DELETE",
    },
    { manual: true }
  );

  const editSubmit = async (values) => {
    post.body = values["body"];
    setIsEditting(false);

    try {
      await executeEdit({ data: values });
    } catch (ex) {
      setIsEditting(true);
      setErrors({
        body: "An unknown error has occured, please try again later",
      });
    }
  };

  const deleteSubmit = async () => {
    await executeDelete(null);
    if (reactions_type === "post_reactions") {
      history.replace("/posts");
    } else {
      onReplyDelete(post["reply_id"]);
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
    initialValues: { body: post.body },
    onSubmit: editSubmit,
    schema,
  });

  const user = useContext(UserContext);
  const postDate = new Date(post.date);

  return (
    <WrapperDiv disabled={loading || editLoading}>
      <article>
        <MainDiv with-date-margin={isEditting}>
          <AuthorDetails post={post} />
          <PostDate dateTime={postDate.toISOString()}>
            {postDate.toDateString()}
          </PostDate>
          <PostDiv>
            {isEditting ? (
              <TextArea
                id="body"
                value={values["body"]}
                onChange={handleChange}
                error={errors["body"]}
                label="Body"
                untitled
                secondary-error
              />
            ) : (
              <p>{post.body}</p>
            )}
          </PostDiv>
          {((user && post["author_id"] === user["user_id"]) ||
            (user && user["permission_level"] > perm.normal)) && (
            <PostControls
              controlsType={
                reactions_type === "post_reactions" ? "post" : "reply"
              }
              onEdit={() => setIsEditting(true)}
              onDelete={deleteSubmit}
              onEditCancel={() => setIsEditting(false)}
              onEditConfirm={handleSubmit}
              editConfirmDisabled={submitDisabled}
              isEditting={isEditting}
            />
          )}
          {!isEditting && (
            <PostReactions
              type={reactions_type}
              postId={
                reactions_type === "post_reactions"
                  ? post["post_id"]
                  : post["reply_id"]
              }
              user={user}
              authorUsername={post["author_username"]}
              reactionsTypes={reactionsTypes}
            />
          )}
        </MainDiv>
      </article>
    </WrapperDiv>
  );
};

export default OwnUserContent;
