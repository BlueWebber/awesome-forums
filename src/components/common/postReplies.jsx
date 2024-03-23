import UserContent from "./userContent";
import SecondaryCardDiv from "../styles/common/secondaryCardDiv";
import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Sorter from "./sorter";
import Paginator from "./paginator";
import { faNewspaper, faScroll } from "@fortawesome/free-solid-svg-icons";
import useContentGetter from "../../hooks/useContentGetter";
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
  const { data, error, loading, ContentGetter } = useContentGetter({
    pageName: "post replies",
    link: `/post_replies/${postId}/${sortClause}/${currentPage}`,
    handlerComponents: {
      404: () => (
        <HandlerDiv>
          <label>This post has no replies yet</label>
          <ReplyEditor postId={postId} afterSubmit={handleReplySubmit} />
        </HandlerDiv>
      ),
    },
  });
  const [replies, setReplies] = useState([]);
  useEffect(() => {
    !loading && !error && setReplies(data.replies);
  }, [data, loading, error, setReplies]);

  const onSort = (key) => setSortClause(key);
  const onPagination = (index) => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => setCurrentPage(index), 200);
  };
  const handleReplySubmit = (data) => {
    if (sortClause === "newest") {
      setReplies([data, ...replies]);
    } else {
      setReplies([...replies, data]);
    }
  };

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
        <ReplyEditor postId={postId} afterSubmit={handleReplySubmit} />
        {replies.map((reply, idx) => {
          return (
            <StyledPostContainer key={reply.reply_id} first={idx === 0}>
              <UserContent post={reply} reactions_type="reply_reactions" />
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
};

export default PostReplies;
