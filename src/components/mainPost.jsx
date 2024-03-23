import CardDiv from "./styles/common/cardDiv";
import UserContent from "./common/userContent";
import OwnUserContent from "./common/ownUserContent";
import { useParams } from "react-router";
import SecondaryCardDiv from "./styles/common/secondaryCardDiv";
import PostReplies from "./common/postReplies";
import styled from "styled-components";
import useContentGetter from "../hooks/useContentGetter";
import UserContext from "../context/userContext";
import { useContext } from "react";
import perm from "./misc/permMap";
import useAxios from "axios-hooks";
import ReactionsContext from "../context/reactionsContext";
import PostTypeContext from "../context/postTypeContext";

const StyledTitle = styled(SecondaryCardDiv)`
  padding: 0;
  padding-left: 1rem;
  padding-right: 1rem;
  flex-grow: 0;
  word-wrap: break-word;
  word-break: break-all;
`;

const StyledPostContainer = styled(SecondaryCardDiv).attrs({
  className: "slideIn",
})`
  padding: 0;
  margin: 0;
  animation-delay: 0.05s;
`;

const MainPost = () => {
  const { post_id: postId } = useParams();

  const { data, loading, ContentGetter } = useContentGetter({
    pageName: "post",
    link: `post/${postId}`,
    withNotFoundPage: true,
  });
  const { data: reactionsTypes } = useAxios("/reactions")[0];

  const { user } = useContext(UserContext);

  return (
    <CardDiv max-width="60rem" flex-direction="column" disabled={loading}>
      <ReactionsContext.Provider value={reactionsTypes}>
        <ContentGetter>
          <PostTypeContext.Provider value="post">
            <StyledTitle>
              <h2>{data && data["title"]}</h2>
            </StyledTitle>
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
          <PostTypeContext.Provider value="reply">
            <PostReplies postId={postId} />
          </PostTypeContext.Provider>
        </ContentGetter>
      </ReactionsContext.Provider>
    </CardDiv>
  );
};

export default MainPost;
