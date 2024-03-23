import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import * as auth from "../services/auth";
import NavBarUser from "./common/navBarUser";

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.colors.dark};
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  flex-grow: 1;
  align-items: stretch;
  box-shadow: 0px 0px 7px 1px ${({ theme }) => theme.colors.shadowColor};
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

  &.active {
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

const ThemeIcon = styled(FontAwesomeIcon).attrs({
  icon: faSun,
})`
  font-size: 150%;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ThemeButton = styled.button`
  width: 1.6rem;
  height: 1.6rem;
  margin: 0;
  border-radius: 50%;
  border: 0;
  position: absolute;
  top: 0.8rem;
  right: 1rem;
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

const NavBar = (props) => {
  return (
    <Nav>
      <Ul>
        <Li>
          <NavBrand to="/">Awesome Forums</NavBrand>
        </Li>
        {!auth.getToken() && (
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
      {auth.getToken() && <NavBarUser user={auth.getDecodedToken()} />}
      <ThemeButton onClick={props.switchTheme}>
        <ThemeIcon />
      </ThemeButton>
    </Nav>
  );
};

export default NavBar;
