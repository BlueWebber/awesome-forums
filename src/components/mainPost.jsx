import CardDiv from "./styles/common/cardDiv";
import UserContent from "./common/userContent";
import { useParams } from "react-router";
import Spinner from "./common/spinner";
import ErrorBox from "./common/errorBox";
import SecondaryCardDiv from "./styles/common/secondaryCardDiv";
import PostReplies from "./common/postReplies";
import useAxios from "axios-hooks";
import { useState, useEffect } from "react";
import styled from "styled-components";

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
  const [{ data, loading, error }, refetch] = useAxios(`post/${postId}`);
  const [post, setPost] = useState({});

  useEffect(() => {
    !error && !loading && setPost(data);
  }, [data, loading, error]);

  const getContent = () => {
    if (error) {
      return (
        <SecondaryCardDiv>
          <ErrorBox refetch={refetch} failedAt="post" />
        </SecondaryCardDiv>
      );
    } else if (loading) {
      return (
        <SecondaryCardDiv>
          <Spinner />
        </SecondaryCardDiv>
      );
    } else if (post) {
      return (
        <>
          <StyledTitle>
            <h2>{post.title}</h2>
          </StyledTitle>
          <StyledPostContainer>
            <UserContent post={post} reactions_type="post_reactions" />
          </StyledPostContainer>
        </>
      );
    }
  };

  return (
    <CardDiv max-width="60rem" flex-direction="column" disabled={loading}>
      {getContent()}
      {!error && !loading && <PostReplies postId={postId} />}
    </CardDiv>
  );
};

export default MainPost;
