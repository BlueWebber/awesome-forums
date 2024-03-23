import Button from "./button";
import styled from "styled-components";

const RoundButton = styled(Button).attrs({
  empty: true,
})`
  border-radius: 50%;
  font-size: ${(props) =>
    props["displayFontSize"] ? props["displayFontSize"] : props["displaySize"]};
  margin: 0;
  width: ${(props) => props["displaySize"]};
  height: ${(props) => props["displaySize"]};
  display: inline-block;
  text-align: center;
  vertical-align: middle;

  & > * {
    transition: 0.15 ease-in-out;
    color: ${({ theme, childrenColor }) =>
      childrenColor ? theme.colors[childrenColor] : theme.colors.primaryText};
  }

  &:hover {
    background-color: ${({ theme, hoverColor, disabled }) =>
      !disabled
        ? hoverColor
          ? theme.colors[hoverColor]
          : theme.colors.primaryButtonHover
        : "inherit"} !important;

    & > * {
      color: ${({ theme, childrenHoverColor }) =>
        childrenHoverColor
          ? theme.colors[childrenHoverColor]
          : theme.colors.buttonText};
    }
  }
`;

export default RoundButton;
