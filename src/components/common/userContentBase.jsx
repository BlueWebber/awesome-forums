import AuthorDetails from "./authorDetails";
import PostReactions from "./postReactions";
import UserContext from "../../context/userContext";
import PostTypeContext from "../../context/postTypeContext";
import { useContext } from "react";
import moment from "moment";
import TextArea from "./input/textarea";
import styled from "styled-components";
import SecondaryCardDiv from "../styles/common/secondaryCardDiv";

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

  @media only screen and (max-width: 600px) {
    grid-template-areas:
      "author author post-date"
      "post post post"
      "post-reactions post-reactions post-controls";

    grid-template-columns: auto auto 100px;
    grid-template-rows: auto auto 50px;
  }
`;

const WrapperDiv = styled(SecondaryCardDiv)`
  padding-bottom: 0.2rem;
`;

const UserContentBase = ({
  post,
  isEditting,
  edittingValue,
  handleChange,
  edittingError,
  loading,
  editLoading,
  children,
}) => {
  const postDate = moment.unix(post.date);
  const { user } = useContext(UserContext);
  const postType = useContext(PostTypeContext);

  return (
    <WrapperDiv disabled={loading || editLoading}>
      <article>
        <MainDiv with-date-margin={isEditting}>
          <AuthorDetails post={post} />
          <PostDate dateTime={postDate.toISOString()}>
            {postDate.format("lll")}
          </PostDate>
          <PostDiv>
            {isEditting ? (
              <TextArea
                id="body"
                value={edittingValue}
                onChange={handleChange}
                error={edittingError}
                label="Body"
                untitled
                secondary-error
                autoFocus={true}
              />
            ) : (
              <p>{post.body}</p>
            )}
          </PostDiv>
          {children}
          {!isEditting && (
            <PostReactions
              type={postType === "post" ? "post_reactions" : "reply_reactions"}
              postId={postType === "post" ? post["post_id"] : post["reply_id"]}
              user={user}
              authorUsername={post["author_username"]}
            />
          )}
        </MainDiv>
      </article>
    </WrapperDiv>
  );
};

export default UserContentBase;
