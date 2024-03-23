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
  margin-top: 1.7rem;
`;

const HandlerDiv = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
`;

const PostReplies = ({ postId, reactionsTypes }) => {
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
    idKey: "reply_id",
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
    handlerComponents: {
      404: () => (
        <HandlerDiv>
          <label>This post has no replies yet</label>
          <ReplyEditor
            postId={postId}
            afterSubmit={handleReplySubmit}
            user={user}
          />
        </HandlerDiv>
      ),
    },
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
