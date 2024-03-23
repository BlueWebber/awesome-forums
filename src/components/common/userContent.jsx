import SecondaryCardDiv from "../styles/common/secondaryCardDiv";
import styled from "styled-components";
import AuthorDetails from "./authorDetails";
import PostReactions from "./postReactions";

const PostDiv = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: flex-start;
  align-content: flex-start;
  grid-area: post;
  word-wrap: break-word;
  word-break: break-all;
`;

const PostDate = styled.time`
  grid-area: post-date;
  color: ${({ theme }) => theme.colors.secondaryText};
  font-size: 0.9rem;
`;

const MainDiv = styled.div`
  flex-grow: 1;
  display: grid;
  grid-template-columns: 140px auto;
  grid-template-rows: 10px auto 22px;
  grid-template-areas:
    "author post-date"
    "author post"
    "author post-reactions";
  place-items: start start;
  place-content: start start;
`;

const UserContent = ({ post, reactions_type }) => {
  const postDate = new Date(post.date);
  return (
    <SecondaryCardDiv>
      <article>
        <MainDiv>
          <AuthorDetails post={post} />
          <PostDate dateTime={postDate.toISOString()}>
            {postDate.toDateString()}
          </PostDate>
          <PostDiv>
            <p>{post.body}</p>
          </PostDiv>
          <PostReactions
            type={reactions_type}
            postId={
              reactions_type === "post_reactions"
                ? post["post_id"]
                : post["reply_id"]
            }
          />
        </MainDiv>
      </article>
    </SecondaryCardDiv>
  );
};

export default UserContent;
