import CardDiv from "./styles/common/cardDiv";
import UserContent from "./common/userContent";
import { useParams } from "react-router";
import SecondaryCardDiv from "./styles/common/secondaryCardDiv";
import PostReplies from "./common/postReplies";
import styled from "styled-components";
import ContentGetter from "./common/contentGetter";

const StyledTitle = styled(SecondaryCardDiv)`
  padding: 0;
  padding-left: 1rem;
  padding-right: 1rem;
  flex-grow: 0;
  word-wrap: break-word;
  word-break: break-all;
`;

const StyledPostContainer = styled(SecondaryCardDiv)`
  padding: 0;
  margin: 0;
`;

const MainPost = () => {
  const { post_id: postId } = useParams();

  const renderData = (post) => {
    return (
      <>
        <StyledTitle>
          <h2>{post.title}</h2>
        </StyledTitle>
        <StyledPostContainer>
          <UserContent post={post} reactions_type="post_reactions" />
        </StyledPostContainer>
        <PostReplies postId={postId} />
      </>
    );
  };

  return (
    <ContentGetter
      renderFunc={renderData}
      link={`post/${postId}`}
      pageName="post"
      wrapper={(children, loading) => (
        <CardDiv max-width="60rem" flex-direction="column" disabled={loading}>
          {children}
        </CardDiv>
      )}
    />
  );
};

export default MainPost;
