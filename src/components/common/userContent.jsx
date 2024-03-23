import UserContentBase from "./userContentBase";

const UserContent = ({ post, reactions_type, reactionsTypes, idx }) => {
  /*
  const postDate = moment.unix(post.date);

  const user = useContext(UserContext);

  return (
    <WrapperDiv delay={idx * 0.05}>
      <article>
        <MainDiv>
          <AuthorDetails post={post} />
          <PostDate dateTime={postDate.toISOString()}>
            {postDate.format("lll")}
          </PostDate>
          <PostDiv>
            <p>{post.body}</p>
          </PostDiv>
          <PostReactions
            type={reactions_type}
            postId={
              reactions_type === "post_reactions"
                ? post["post_id"]
                : post["reply_id"]
            }
            user={user}
            authorUsername={post["author_username"]}
            reactionsTypes={reactionsTypes}
          />
        </MainDiv>
      </article>
    </WrapperDiv>
  );
  */

  return (
    <UserContentBase
      post={post}
      reactions_type={reactions_type}
      reactionsTypes={reactionsTypes}
    />
  );
};

export default UserContent;
