import styled from "styled-components";
import usePostsNavigator from "../../hooks/usePostsNavigator";
import Notification from "./notification";

const CenterDiv = styled.div`
  text-align: center;
`;

const WrapperDiv = styled.div`
  text-align: center;
  width: 368px;
  height: 590px;
  vertical-align: middle;
`;

const NotificationsPanel = () => {
  const { postsNavigator: PostsNavigator, postsNavigatorProps } =
    usePostsNavigator({
      link: "notifications",
      pageName: "notifications",
      postsKey: "notifications",
      noContentHandler: () => (
        <CenterDiv>
          <p>You have no notifications yet.</p>
        </CenterDiv>
      ),
      wrapperComponent: WrapperDiv,
      mappingComponent: Notification,
      idKey: "notification_id",
      acceptEmptyData: true,
      withSort: false,
    });

  return <PostsNavigator {...postsNavigatorProps} />;
};

export default NotificationsPanel;
