import { useContext } from "react";
import {
  faNewspaper,
  faScroll,
  faSortAmountUp,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import UserContext from "../context/userContext";
import Post from "./common/post";
import usePostsNavigator from "../hooks/usePostsNavigator";

const CenterDiv = styled.div`
  text-align: center;
`;

const PostButton = styled.button`
  margin: 0;
  margin-left: 1rem;
  flex-grow: 0.1;
`;

const Posts = () => {
  const user = useContext(UserContext);

  const history = useHistory();

  const handlePostButtonClick = () => history.push("/new_post");
  const { postsNavigator: PostsNavigator, postsNavigatorProps } =
    usePostsNavigator({
      withSearch: true,
      actionButton: user
        ? () => (
            <PostButton onClick={handlePostButtonClick}>New post</PostButton>
          )
        : null,

      link: "posts",
      searchLink: "search_posts",
      pageName: "posts",
      postsKey: "posts",
      sortClauses: {
        newest: { icon: faNewspaper, name: "New" },
        oldest: { icon: faScroll, name: "Old" },
        most_replies: { icon: faSortAmountUp, name: "Most Replies" },
      },
      maxWidth: "60rem",
      noContentHandler: () => (
        <CenterDiv>
          <h1>No results were found</h1>
        </CenterDiv>
      ),
      mappingComponent: Post,
      idKey: "post_id",
      acceptEmptyData: true,
    });

  return <PostsNavigator {...postsNavigatorProps} />;
};

export default Posts;
