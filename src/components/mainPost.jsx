import CardDiv from "./styles/common/cardDiv";
import UserContent from "./common/userContent";
import OwnUserContent from "./common/ownUserContent";
import { useParams } from "react-router";
import SecondaryCardDiv from "./styles/common/secondaryCardDiv";
import PostReplies from "./common/postReplies";
import styled from "styled-components";
import useContentGetter from "../hooks/useContentGetter";
import UserContext from "../context/userContext";
import { useContext, useState, useEffect } from "react";
import perm from "./misc/permMap";
import useAxios from "axios-hooks";
import ReactionsContext from "../context/reactionsContext";
import PostTypeContext from "../context/postTypeContext";
import EditableField from "./common/input/editableField";
import Joi from "joi-browser";

const StyledTitle = styled(SecondaryCardDiv)`
  padding: 0;
  padding-left: 1rem;
  padding-right: 1rem;
  flex-grow: 0;
  word-wrap: break-word;
  word-break: break-all;
`;

const H2 = styled.h2`
  margin-right: auto;
`;

const PostTitle = ({ data, loading, error, postId, user, refetch }) => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    !loading && !error && !title && setTitle(data.title);
  }, [data, loading, error, title]);

  const schema = {
    title: Joi.string().min(4).max(150).required().label("Title"),
  };

  const [{ loading: editLoading }, executeEdit] = useAxios(
    {
      url: `/post/${postId}`,
      method: "PATCH",
    },
    { manual: true }
  );

  const handleEditSubmit = async (name, value) => {
    try {
      await executeEdit({ data: { [name]: value } });
    } catch (ex) {
      return "An unknown error has occured, please try again later";
    }
    setTimeout(refetch, 50);
  };

  return (
    <StyledTitle>
      {(user && user["user_id"]) === data["author_id"] ||
      (user && user["permission_level"]) > perm.normal ? (
        title && (
          <EditableField
            initialValueObj={{ title: title }}
            textComponent={H2}
            schema={schema}
            editLoading={editLoading}
            onEditSubmit={handleEditSubmit}
          />
        )
      ) : (
        <h2>{title}</h2>
      )}
    </StyledTitle>
  );
};

const StyledPostContainer = styled(SecondaryCardDiv).attrs({
  className: "slideIn",
})`
  padding: 0;
  margin: 0;
  animation-delay: 0.05s;
`;

const PostHead = ({ postId }) => {
  const { data, loading, error, refetch, ContentGetter } = useContentGetter({
    pageName: "post",
    link: `post/${postId}`,
    withNotFoundPage: true,
  });
  const { user } = useContext(UserContext);

  return (
    <ContentGetter>
      <PostTypeContext.Provider value="post">
        <PostTitle
          data={data}
          loading={loading}
          error={error}
          postId={postId}
          user={user}
          refetch={refetch}
        />
        <StyledPostContainer>
          {data &&
          ((user && user["user_id"]) === data["author_id"] ||
            (user && user["permission_level"]) > perm.normal) ? (
            <OwnUserContent post={data} />
          ) : (
            <UserContent post={data} />
          )}
        </StyledPostContainer>
      </PostTypeContext.Provider>
    </ContentGetter>
  );
};

const MainPost = () => {
  const { post_id: postId } = useParams();
  const { data: reactionsTypes } = useAxios("/reactions")[0];

  return (
    <CardDiv max-width="60rem" flex-direction="column">
      <ReactionsContext.Provider value={reactionsTypes}>
        <PostHead postId={postId} />
        <PostTypeContext.Provider value="reply">
          <PostReplies postId={postId} />
        </PostTypeContext.Provider>
      </ReactionsContext.Provider>
    </CardDiv>
  );
};

export default MainPost;
