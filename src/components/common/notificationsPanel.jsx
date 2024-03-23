import styled from "styled-components";
import usePostsNavigator from "../../hooks/usePostsNavigator";
import Notification from "./notification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import StyledTooltip from "../styles/common/tooltip";
import Slider from "./input/slider";
import { getSettings, setSetting } from "../../services/settings";
import { useEffect, useState } from "react";

const CenterDiv = styled.div`
  text-align: center;
`;

const WrapperDiv = styled.div`
  text-align: center;
  width: 368px;
  height: 680px;
  vertical-align: middle;
  flex-grow: 0.9;
`;

const TitleDiv = styled.div`
  flex-grow: 0.1;
  border-bottom: 1px solid ${({ theme }) => theme.colors.greyBorder};
  font-size: 1.2rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: baseline;
`;

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const OptionsContainer = styled.div`
  display: grid;
  width: 300px;
  grid-template-columns: 20% auto;
  grid-template-rows: auto auto auto;
  grid-auto-flow: row;
  justify-items: center;
  position: relative;
  font-size: 120%;
`;

const Label = styled.label`
  justify-self: start;
`;

const OptionsButton = styled.button.attrs({ className: "option-button" })`
  flex-grow: 0;
  margin: 0 !important;
  padding: 0 !important;
  background-color: inherit !important;

  &:hover {
    background-color: inherit !important;
  }
`;

const NotificationSettingsPanel = () => {
  const [settings, setSettings] = useState({
    reply_notifications: false,
    post_notifications: false,
  });

  useEffect(() => {
    getSettings().then((newSettings) => {
      newSettings &&
        setSettings((s) => {
          return { ...s, ...newSettings };
        });
    });
  }, []);

  const handleChange = ({ target }) => {
    setSettings({ ...settings, [target.id]: target.checked });
    setSetting({ [target.id]: target.checked });
  };

  return (
    <OptionsContainer>
      <Slider
        isChecked={settings.post_notifications}
        handleChange={handleChange}
        id="post_notifications"
      />
      <Label>Post notifications</Label>
      <Slider
        isChecked={settings.reply_notifications}
        handleChange={handleChange}
        id="reply_notifications"
      />
      <Label>Reply notifications</Label>
    </OptionsContainer>
  );
};

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
      spinnerPos: "relative",
    });

  return (
    <ContainerDiv>
      <TitleDiv>
        <label>Notifications</label>
        <StyledTooltip
          id="notificationsOptionsTooltip"
          place="left"
          effect="solid"
          event="click"
          clickable={true}
          className="shadow-tooltip"
        >
          <NotificationSettingsPanel />
        </StyledTooltip>
        <OptionsButton data-tip data-for="notificationsOptionsTooltip">
          <FontAwesomeIcon icon={faCog} className="option-button-icon" />
        </OptionsButton>
      </TitleDiv>
      <PostsNavigator {...postsNavigatorProps} />
    </ContainerDiv>
  );
};

export default NotificationsPanel;
