import SecondaryCardDiv from "../styles/common/secondaryCardDiv";
import styled from "styled-components";
import AuthorDetails from "./authorDetails";
import PostReactions from "./postReactions";
import UserContext from "../../context/userContext";
import { useContext } from "react";

const PostDiv = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: flex-start;
  align-content: flex-start;
  grid-area: post;
  word-wrap: break-word;
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

const UserContent = ({ post, reactions_type, reactionsTypes }) => {
  const postDate = new Date(post.date);

  const user = useContext(UserContext);

  return (
    <WrapperDiv>
      <article>
        <MainDiv with-date-margin="true">
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
            user={user}
            authorUsername={post["author_username"]}
            reactionsTypes={reactionsTypes}
          />
        </MainDiv>
      </article>
    </WrapperDiv>
  );
};

export default UserContent;
