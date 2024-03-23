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

const StyledPostContainer = styled(SecondaryCardDiv).attrs({
  className: "slideIn",
})`
  padding: 0;
  animation-delay: ${(props) => props.delay}s;
  z-index: ${(props) => props.zIndex};
`;

const WrapperDiv = styled.div`
  opacity: ${(props) => (props["disabled"] ? 0.25 : 1)};
  pointer-events: ${(props) => (props["disabled"] ? "none" : "initial")};
  display: flex;
  flex-direction: column;
  margin-top: 1.7rem;
`;

const HandlerDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  text-align: center;
`;

const PostReplies = ({ postId }) => {
  const { user } = useContext(UserContext);

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
    idKey: "reply_id",
    noErrorHandling: true,
    sortClauses: {
      newest: { icon: faNewspaper, name: "New" },
      oldest: { icon: faScroll, name: "Old" },
    },
    mappingComponent: ({ post: reply, idx }) => (
      <StyledPostContainer delay={idx * 0.05} zIndex={1000 - idx}>
        {(user && user["user_id"] === reply["author_id"]) ||
        (user && user["permission_level"] > perm.normal) ? (
          <OwnUserContent post={reply} onReplyDelete={handleReplyDelete} />
        ) : (
          <UserContent post={reply} />
        )}
      </StyledPostContainer>
    ),
    noLoadingComponent: true,
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
      <HandlerDiv>
        {(!postsData["replies"] || !postsData["replies"].length) && (
          <label>This post has no replies yet.</label>
        )}
        {user && (
          <ReplyEditor
            postId={postId}
            afterSubmit={handleReplySubmit}
            user={user}
          />
        )}
      </HandlerDiv>
    </PostsNavigator>
  );
};

export default PostReplies;
