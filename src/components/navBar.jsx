import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faBell } from "@fortawesome/free-solid-svg-icons";
import NavBarUser from "./common/navBarUser";
import UserContext from "../context/userContext";
import useAxios from "axios-hooks";
import StyledTooltip from "./styles/common/tooltip";
import NotificationsPanel from "./common/notificationsPanel";
import { ThemeContext } from "styled-components";

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.colors.nav};
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  flex-grow: 1;
  align-items: stretch;
  box-shadow: 0px 0px 7px 1px ${({ theme }) => theme.colors.shadowColor};

  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const Ul = styled(Nav).attrs({
  as: "ul",
})`
  padding-left: 0;
  padding-right: 0;
  margin-left: 1rem;
  box-shadow: none;
`;

const Li = styled.li`
  list-style-type: none;
  margin-left: 0.7rem;
  margin-right: 0.7rem;
`;

const StyledNavlink = styled(NavLink)`
  color: ${({ theme }) => theme.colors.secondaryText};

  &.active,
  &:hover {
    color: ${({ theme }) => theme.colors.primaryText};
  }
`;

const NavBrand = styled(StyledNavlink)`
  font-size: 107%;
  margin-right: 0.6rem;

  &.active {
    color: ${({ theme }) => theme.colors.secondaryText};
  }
`;

const OptionIcon = styled(FontAwesomeIcon)`
  font-size: 150%;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const OptionButton = styled.button`
  width: 1.6rem;
  height: 1.6rem;
  margin: 0;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  border-radius: 50%;
  border: 0;
  background-color: ${({ theme }) => theme.colors.dark};
  padding: 1rem;
  box-shadow: inset 0px 0px 8px 1px ${({ theme }) => theme.colors.shadowColor};

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.paginationHover};
    border: 0;
  }

  &:focus {
    box-shadow: 0px 0px 12px 1px ${({ theme }) => theme.colors.shadowColor};
  }
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  align-items: center;
  justify-content: center;
  align-content: center;
`;

const NotificationNumberDiv = styled.div`
  height: 20px;
  min-width: 20px;
  background-color: ${({ theme }) => theme.colors.dangerButton};
  border-radius: 50%;
  font-size: 15px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  position: absolute;
  top: 4px;
  right: 50px;
`;

const NotificationsPanelWrapepr = styled.div`
  width: 368px;
  height: 590px;
`;

const ZDiv = styled.div`
  z-index: 1001;
`;

const NavBar = (props) => {
  const { user } = useContext(UserContext);
  const theme = useContext(ThemeContext);
  const { data: notificationsData } = useAxios("/unread_notifications")[0];
  const [readNotifications, setReadNotifications] = useState(false);
  return (
    <Nav>
      <Ul>
        <Li>
          <NavBrand to="/">Awesome Forums</NavBrand>
        </Li>
        {!user && (
          <>
            <Li>
              <StyledNavlink to="/login">Login</StyledNavlink>
            </Li>
            <Li>
              <StyledNavlink to="/register">Register</StyledNavlink>
            </Li>
          </>
        )}
        <Li>
          <StyledNavlink to="/posts">Posts</StyledNavlink>
        </Li>
      </Ul>
      <OptionsContainer>
        {user && <NavBarUser user={user} />}
        {user && (
          <ZDiv>
            <StyledTooltip
              id="notificationsTooltip"
              place="bottom"
              effect="solid"
              event="click"
              clickable={true}
              offset={{ left: "120px" }}
              arrowColor="inherit"
              afterShow={() => setReadNotifications(true)}
            >
              <NotificationsPanelWrapepr>
                {readNotifications ? <NotificationsPanel /> : <></>}
              </NotificationsPanelWrapepr>
            </StyledTooltip>
            <OptionButton data-tip data-for="notificationsTooltip">
              <OptionIcon icon={faBell} />
              {!readNotifications &&
                notificationsData &&
                !!notificationsData["number_of_unread_notifications"] && (
                  <NotificationNumberDiv>
                    <label>
                      {notificationsData["number_of_unread_notifications"]}
                    </label>
                  </NotificationNumberDiv>
                )}
            </OptionButton>
          </ZDiv>
        )}
        <OptionButton onClick={props.switchTheme}>
          <OptionIcon icon={theme.status === "dark" ? faSun : faMoon} />
        </OptionButton>
      </OptionsContainer>
    </Nav>
  );
};

export default NavBar;
