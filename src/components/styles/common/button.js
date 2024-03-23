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
      : theme.colors.primaryText};
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
  }
`;

export default Button;
