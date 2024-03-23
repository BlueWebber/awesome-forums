import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.colors.dark};
  padding-left: 20;
  padding-right: 20;
  flex-grow: 1;
  align-items: stretch;
`;

const Ul = styled(Nav).attrs({
  as: "ul",
})`
  padding-left: 0;
  padding-right: 0;
  margin-left: 20px;
`;

const Li = styled.li`
  list-style-type: none;
  margin-left: 10px;
  margin-right: 10px;
`;

const StyledNavlink = styled(NavLink)`
  color: ${({ theme }) => theme.colors.secondaryText};

  &.active {
    color: ${({ theme }) => theme.colors.primaryText};
  }
`;

const NavBrand = styled(StyledNavlink)`
  font-size: 107%;
  margin-right: 10px;

  &.active {
    color: ${({ theme }) => theme.colors.secondaryText};
  }
`;

const NavBar = (props) => {
  return (
    <Nav>
      <Ul>
        <Li>
          <NavBrand to="/">Awesome Forums</NavBrand>
        </Li>
        <Li>
          <StyledNavlink to="/login">Login</StyledNavlink>
        </Li>
        <Li>
          <StyledNavlink to="/register">Register</StyledNavlink>
        </Li>
        <Li>
          <StyledNavlink to="/profile">Profile</StyledNavlink>
        </Li>
        <Li>
          <StyledNavlink to="/posts">Posts</StyledNavlink>
        </Li>
      </Ul>
    </Nav>
  );
};

export default NavBar;
