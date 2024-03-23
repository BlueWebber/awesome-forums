import { useState, useRef, useEffect } from "react";
import Post from "./common/post";
import useAxios from "axios-hooks";
import CardDiv from "./styles/common/cardDiv";
import Paginator from "./common/paginator";
import Spinner from "./common/spinner";
import ErrorBox from "./common/errorBox";
import Sorter from "./common/sorter";
import {
  faNewspaper,
  faScroll,
  faSortAmountUp,
} from "@fortawesome/free-solid-svg-icons";
import Search from "./common/input/search";
import styled from "styled-components";

const CenterDiv = styled.div`
  text-align: center;
`;

const Posts = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [sortClause, setCurrentSortClause] = useState("newest");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [{ data, loading, error }, refetch] = useAxios(
    `${
      search ? `search_posts/${search}` : "posts"
    }/${sortClause}/${currentPage}/`
  );
  const [posts, setPosts] = useState([]);

  const scrollRef = useRef();

  useEffect(() => {
    if (!loading && !error) {
      setPosts(data["posts"]);
    }
  }, [data, loading, error]);

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

  const getContent = () => {
    if (error) {
      return <ErrorBox refetch={refetch} failedAt="posts" />;
    } else if (loading) {
      if (posts && posts.length) {
        return (
          <>
            {posts.map((post) => (
              <Post post={post} key={post.post_id} />
            ))}
            ;
            <Spinner />
          </>
        );
      }
      return <Spinner />;
    } else if (posts && posts.length) {
      return posts.map((post) => (
        <Post post={post} search={search} key={post.post_id} />
      ));
    } else {
      return (
        <CenterDiv>
          <h1>No results were found</h1>
        </CenterDiv>
      );
    }
  };

  return (
    <CardDiv
      max-width="40rem"
      flex-direction="column"
      ref={scrollRef}
      disabled={loading}
    >
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
        <Search
          label="Search posts"
          id="searchQuery"
          value={searchInput}
          onChange={onSearch}
          onSubmit={onSearchSubmit}
          onReset={onSearchReset}
        />
      )}
      {getContent()}
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
    </CardDiv>
  );
};

export default Posts;
