import { useContext } from "react";
import {
  faNewspaper,
  faScroll,
  faSortAmountUp,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import UserContext from "../context/userContext";
import Post from "./common/post";
import usePostsNavigator from "../hooks/usePostsNavigator";
import { Link } from "react-router-dom";

const CenterDiv = styled.div`
  text-align: center;
`;

const PostButton = styled.button`
  margin: 0;
  margin-left: 1rem;
  flex-grow: 0.1;
`;

const Posts = () => {
  const { user } = useContext(UserContext);

  const { postsNavigator: PostsNavigator, postsNavigatorProps } =
    usePostsNavigator({
      withSearch: true,
      actionButton: user
        ? () => (
            <Link to="/new_post">
              <PostButton>New post</PostButton>
            </Link>
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
