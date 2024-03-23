import UserContent from "./userContent";
import SecondaryCardDiv from "../styles/common/secondaryCardDiv";
import { useState, useRef } from "react";
import styled from "styled-components";
import Sorter from "./sorter";
import Paginator from "./paginator";
import { faNewspaper, faScroll } from "@fortawesome/free-solid-svg-icons";
import ContentGetter from "./contentGetter";
import ReplyEditor from "./replyEditor";

const StyledPostContainer = styled(SecondaryCardDiv)`
  padding: 0;
`;

const WrapperDiv = styled.div`
  opacity: ${(props) => (props["disabled"] ? 0.25 : 1)};
  pointer-events: ${(props) => (props["disabled"] ? "none" : "initial")};
  display: flex;
  flex-direction: column;
`;

const SorterDiv = styled.div`
  margin-top: 2rem;
`;

const HandlerDiv = styled.div.attrs({ className: "flex-stretch" })`
  text-align: center;
  margin-top: 1rem;
`;

const PostReplies = ({ postId }) => {
  const [sortClause, setSortClause] = useState("newest");
  const [currentPage, setCurrentPage] = useState(0);
  const scrollRef = useRef();
  const onSort = (key) => setSortClause(key);
  const onPagination = (index) => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => setCurrentPage(index), 200);
  };

  const renderData = ({ replies, number_of_pages }) => {
    return (
      <>
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
        {replies.map((reply, idx) => (
          <StyledPostContainer key={reply.reply_id} first={idx === 0}>
            <UserContent post={reply} reactions_type="reply_reactions" />
          </StyledPostContainer>
        ))}
        <div>
          {number_of_pages > 1 && (
            <Paginator
              numberOfPages={number_of_pages}
              handlePagination={onPagination}
              currentPage={currentPage}
              numberOfBoxes={9}
            />
          )}
        </div>
      </>
    );
  };

  return (
    <ContentGetter
      wrapper={(children, loading) => (
        <WrapperDiv disabled={loading}>{children}</WrapperDiv>
      )}
      pageName="post replies"
      renderFunc={renderData}
      link={`/post_replies/${postId}/${sortClause}/${currentPage}`}
      handlerComponents={{
        404: () => (
          <HandlerDiv>
            <label>This post has no replies yet</label>
            <ReplyEditor postId={postId} />
          </HandlerDiv>
        ),
      }}
    />
  );
};

export default PostReplies;
