import PostControls from "./postControls";
import perm from "../misc/permMap";
import { useState, useContext } from "react";
import useForm from "../../hooks/useForm";
import Joi from "joi-browser";
import useAxios from "axios-hooks";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/userContext";
import PostTypeContext from "../../context/postTypeContext";
import UserContentBase from "./userContentBase";

const OwnUserContent = ({ post, onReplyDelete }) => {
  const [isEditting, setIsEditting] = useState(false);
  const history = useHistory();
  const schema = {
    body: Joi.string().required().min(10).max(15000).label("Body"),
  };
  const postType = useContext(PostTypeContext);

  const reqUrl =
    postType === "post"
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
    if (postType === "post") {
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
    resetInput,
  } = useForm({
    initialValues: { body: post.body },
    onSubmit: editSubmit,
    schema,
  });

  const { user } = useContext(UserContext);

  return (
    <UserContentBase
      post={post}
      isEditting={isEditting}
      edittingValue={values["body"]}
      handleChange={handleChange}
      edittingError={errors["body"]}
      loading={loading}
      editLoading={editLoading}
    >
      {((user && post["author_id"] === user["user_id"]) ||
        (user && user["permission_level"] > perm.normal)) && (
        <PostControls
          controlsType={postType}
          onEdit={() => setIsEditting(true)}
          onDelete={deleteSubmit}
          onEditCancel={() => {
            setIsEditting(false);
            resetInput();
          }}
          onEditConfirm={handleSubmit}
          editConfirmDisabled={submitDisabled}
          isEditting={isEditting}
        />
      )}
    </UserContentBase>
  );
};

export default OwnUserContent;
