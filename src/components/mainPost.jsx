import CardDiv from "./styles/common/cardDiv";
import UserContent from "./common/userContent";
import { useParams } from "react-router";
import SecondaryCardDiv from "./styles/common/secondaryCardDiv";
import PostReplies from "./common/postReplies";
import styled from "styled-components";
import useContentGetter from "../hooks/useContentGetter";

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

  const { data, loading, ContentGetter } = useContentGetter({
    pageName: "post",
    link: `post/${postId}`,
  });

  return (
    <CardDiv max-width="60rem" flex-direction="column" disabled={loading}>
      <ContentGetter>
        <StyledTitle>
          <h2>{data && data["title"]}</h2>
        </StyledTitle>
        <StyledPostContainer>
          <UserContent post={data} reactions_type="post_reactions" />
        </StyledPostContainer>
        <PostReplies postId={postId} />
      </ContentGetter>
    </CardDiv>
  );
};

export default MainPost;
