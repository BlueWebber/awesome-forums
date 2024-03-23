import styled from "styled-components";
import StyledTooltip from "../../styles/common/tooltip";
import { useTheme } from "styled-components";

const WarningLabel = styled.label`
  color: ${({ theme }) => theme.colors.warningBorder};
  font-size: 0.9rem;
`;

const Error = ({ error, minified, tooltipError, tooltipId }) => {
  const theme = useTheme();

  return (
    <>
      {error && (
        <>
          {tooltipError ? (
            <StyledTooltip
              id={tooltipId}
              place="top"
              effect="solid"
              backgroundColor={theme.colors.warningBorder}
              delayShow={200}
              delayUpdate={200}
              event="focus"
            >
              {error}
            </StyledTooltip>
          ) : !minified ? (
            <div className="alert-div">
              <label>{error}</label>
            </div>
          ) : (
            <WarningLabel>{error}</WarningLabel>
          )}
        </>
      )}
    </>
  );
};

export default Error;
