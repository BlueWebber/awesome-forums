import styled from "styled-components";

const Button = styled.button`
  max-width: ${(props) => (props["max-width"] ? props["max-width"] : null)};
  background-color: ${({ empty, color, theme }) =>
    empty
      ? "inherit"
      : color
      ? theme.colors[color]
      : theme.colors.primaryButton};

  color: ${({ empty, color, theme }) =>
    empty
      ? color
        ? theme.colors[color]
        : theme.colors.primaryButton
      : theme.colors.buttonText};
  border: 1px solid
    ${({ theme, color }) =>
      color ? theme.colors[color] : theme.colors.primaryButton};

  &:disabled {
    background-color: ${({ empty, theme }) =>
      empty ? "inherit" : theme.colors.secondaryButton};

    &:hover {
      background-color: ${({ theme }) => theme.colors.secondaryButton};
    }
  }

  &:hover {
    background-color: ${({ empty, theme, hoverColor }) =>
      empty
        ? "inherit"
        : hoverColor
        ? theme.colors[hoverColor]
        : theme.colors.primaryButtonHover};
    border: 1px solid
      ${({ theme, color, disabled }) =>
        disabled
          ? "inherit"
          : color
          ? theme.colors[color]
          : theme.colors.primaryButton};
  }

  &:focus {
    box-shadow: 0px 0px 7px 1px
      ${({ theme, color }) =>
        color ? theme.colors[color] : theme.colors.inputShadow};
  }
`;

export default Button;
