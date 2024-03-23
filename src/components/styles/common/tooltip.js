import ReactTooltip from "react-tooltip";
import styled from "styled-components";

const StyledTooltip = styled(ReactTooltip)`
  padding-top: 0;
  padding-bottom: 0;

  &.type-dark.place-top {
    padding: 0.5rem;
    background-color: ${({ theme }) => theme.colors.tooltip};
    opacity: 0.9;
    box-shadow: 0 0 5px 0 ${({ theme }) => theme.colors.shadowColor};

    &:after {
      border-top-color: ${({ theme }) => theme.colors.tooltip};
    }
  }
`;

export default StyledTooltip;
