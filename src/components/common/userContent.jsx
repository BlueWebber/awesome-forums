import UserContentBase from "./userContentBase";

const UserContent = ({ post, reactions_type, reactionsTypes, idx }) => {
  return (
    <UserContentBase
      post={post}
      reactions_type={reactions_type}
      reactionsTypes={reactionsTypes}
    />
  );
};

export default UserContent;
