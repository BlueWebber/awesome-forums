import { useState, useRef } from "react";
import Post from "./common/post";
import CardDiv from "./styles/common/cardDiv";
import Paginator from "./common/paginator";
import Sorter from "./common/sorter";
import {
  faNewspaper,
  faScroll,
  faSortAmountUp,
} from "@fortawesome/free-solid-svg-icons";
import Search from "./common/input/search";
import styled from "styled-components";
import ContentGetter from "./common/contentGetter";
import { useHistory } from "react-router-dom";

const CenterDiv = styled.div`
  text-align: center;
`;

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const PostButton = styled.button`
  margin: 0;
  margin-left: 1rem;
  flex-grow: 0.1;
`;

const Posts = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [sortClause, setCurrentSortClause] = useState("newest");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const scrollRef = useRef();
  const history = useHistory();

  const handlePostButtonClick = () => history.push("/new_post");

  const onPagination = (index) => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => setCurrentPage(index), 200);
  };

  const onSort = (key) => {
    setCurrentSortClause(key);
  };

  const onSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput === search) return;
    setCurrentPage(0);
    setSearch(searchInput);
  };

  const onSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const onSearchReset = () => {
    setSearchInput("");
    if (search) {
      setSearch("");
    }
  };

  const renderData = (data) => {
    const posts = data["posts"];
    return (
      <>
        <div>
          {data && (
            <Sorter
              clauses={{
                newest: { icon: faNewspaper, name: "New" },
                oldest: { icon: faScroll, name: "Old" },
                most_replies: { icon: faSortAmountUp, name: "Most Replies" },
              }}
              handleSort={onSort}
              currentClause={sortClause}
            />
          )}
        </div>
        {(data || search) && (
          <SearchWrapper>
            <Search
              label="Search posts"
              id="searchQuery"
              value={searchInput}
              onChange={onSearch}
              onSubmit={onSearchSubmit}
              onReset={onSearchReset}
            />
            <PostButton onClick={handlePostButtonClick}>New post</PostButton>
          </SearchWrapper>
        )}
        {posts && posts.length ? (
          posts.map((post) => (
            <Post post={post} search={search} key={post.post_id} />
          ))
        ) : (
          <CenterDiv>
            <h1>No results were found</h1>
          </CenterDiv>
        )}
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
      </>
    );
  };

  return (
    <ContentGetter
      wrapper={(children, loading) => (
        <CardDiv
          max-width="40rem"
          flex-direction="column"
          ref={scrollRef}
          disabled={loading}
        >
          {children}
        </CardDiv>
      )}
      pageName="posts"
      renderFunc={renderData}
      link={`${
        search ? `search_posts/${search}` : "posts"
      }/${sortClause}/${currentPage}/`}
    />
  );
};

export default Posts;
