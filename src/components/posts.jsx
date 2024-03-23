import Post from "./common/post";
import useAxios from "axios-hooks";

const Posts = () => {
  const [{ data, loading, error }, refetch] = useAxios("posts/newest/1/");

  const fetchContent = () => {
    if (error) return <button onClick={refetch}>Click me to refetch</button>;
    if (loading) return <h1>Loading...</h1>;
    return data["posts"].map((post) => <Post post={post} key={post.post_id} />);
  };

  return (
    <div className="container" style={{ maxHeight: 750 }}>
      <div className="col">{fetchContent()}</div>
    </div>
  );
};

export default Posts;
