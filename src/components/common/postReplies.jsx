import UserContent from "./userContent";
import OwnUserContent from "./ownUserContent";
import SecondaryCardDiv from "../styles/common/secondaryCardDiv";
import { useContext } from "react";
import styled from "styled-components";
import { faNewspaper, faScroll } from "@fortawesome/free-solid-svg-icons";
import ReplyEditor from "./replyEditor";
import UserContext from "../../context/userContext";
import perm from "../misc/permMap";
import usePostsNavigator from "../../hooks/usePostsNavigator";

const StyledPostContainer = styled(SecondaryCardDiv)`
  padding: 0;
`;

const WrapperDiv = styled.div`
  opacity: ${(props) => (props["disabled"] ? 0.25 : 1)};
  pointer-events: ${(props) => (props["disabled"] ? "none" : "initial")};
  display: flex;
  flex-direction: column;
`;

const PostReplies = ({ postId, reactionsTypes }) => {
  /*
  return (
    <WrapperDiv disabled={loading}>
      <ContentGetter>
        <SorterDiv ref={scrollRef}>
          <Sorter
            clauses={{
              newest: { icon: faNewspaper, name: "New" },
              oldest: { icon: faScroll, name: "Old" },
            }}
            handleSort={onSort}
            currentClause={sortClause}
          />
        </SorterDiv>
        {user && (
          <ReplyEditor
            postId={postId}
            afterSubmit={handleReplySubmit}
            user={user}
          />
        )}
        {replies.map((reply, idx) => {
          return (
            <StyledPostContainer key={reply.reply_id} first={idx === 0}>
              {data &&
              (user["user_id"] === reply["author_id"] ||
                user["permission_level"] > perm.normal) ? (
                <OwnUserContent
                  post={reply}
                  reactions_type="reply_reactions"
                  onReplyDelete={handleReplyDelete}
                  reactionsTypes={reactionsTypes}
                />
              ) : (
                <UserContent
                  post={reply}
                  reactions_type="reply_reactions"
                  reactionsTypes={reactionsTypes}
                />
              )}
            </StyledPostContainer>
          );
        })}
        <div>
          {data && data["number_of_pages"] > 1 && (
            <Paginator
              numberOfPages={data["number_of_pages"]}
              handlePagination={onPagination}
              currentPage={currentPage}
              numberOfBoxes={9}
            />
          )}
        </div>
      </ContentGetter>
    </WrapperDiv>
  );
  */
  const user = useContext(UserContext);

  const {
    postsNavigator: PostsNavigator,
    postsNavigatorProps,
    sortClause,
    postsData,
    setPostsData,
  } = usePostsNavigator({
    wrapperComponent: WrapperDiv,
    withSearch: false,
    link: `post_replies/${postId}`,
    pageName: "replies",
    postsKey: "replies",
    sortClauses: {
      newest: { icon: faNewspaper, name: "New" },
      oldest: { icon: faScroll, name: "Old" },
    },
    mappingComponent: ({ post: reply, idx }) => (
      <StyledPostContainer first={idx === 0}>
        {user["user_id"] === reply["author_id"] ||
        user["permission_level"] > perm.normal ? (
          <OwnUserContent
            post={reply}
            reactions_type="reply_reactions"
            onReplyDelete={handleReplyDelete}
            reactionsTypes={reactionsTypes}
          />
        ) : (
          <UserContent
            post={reply}
            reactions_type="reply_reactions"
            reactionsTypes={reactionsTypes}
          />
        )}
      </StyledPostContainer>
    ),
  });

  const handleReplySubmit = (data) => {
    if (sortClause === "newest") {
      setPostsData({
        number_of_pages: postsData["number_of_pages"],
        replies: [data, ...postsData["replies"]],
      });
    } else {
      setPostsData({
        number_of_pages: postsData["number_of_pages"],
        replies: [...postsData["replies"], data],
      });
    }
  };
  const handleReplyDelete = (replyId) => {
    setPostsData({
      number_of_pages: postsData["number_of_pages"],
      replies: postsData["replies"].filter(
        (reply) => reply["reply_id"] !== replyId
      ),
    });
  };

  return (
    <PostsNavigator {...postsNavigatorProps}>
      {user && (
        <ReplyEditor
          postId={postId}
          afterSubmit={handleReplySubmit}
          user={user}
        />
      )}
    </PostsNavigator>
  );
};

export default PostReplies;
