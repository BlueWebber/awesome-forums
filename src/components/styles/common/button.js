import styled from "styled-components";

const Button = styled.button`
  max-width: ${(props) => (props["max-width"] ? props["max-width"] : null)};
  background-color: ${({ empty, theme }) =>
    empty ? "inherit" : theme.colors.primaryButton};

  &:disabled {
    background-color: ${({ empty, theme }) =>
      empty ? "inherit" : theme.colors.secondaryButton};

    &:hover {
      background-color: ${({ theme }) => theme.colors.secondaryButton};
    }
  }

  &:hover {
    background-color: ${({ empty, theme }) =>
      empty ? "inherit" : theme.colors.primaryButtonHover};
  }
`;

export default Button;
