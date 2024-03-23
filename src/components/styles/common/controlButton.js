import Button from "./button";
import styled from "styled-components";

const ControlButton = styled(Button).attrs({
  empty: true,
})`
  border-radius: 50%;
  font-size: 20px;
  margin: 0;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryButton};
  }
`;

export default ControlButton;
