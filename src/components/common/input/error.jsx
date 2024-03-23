import styled from "styled-components";
import StyledTooltip from "../../styles/common/tooltip";
import { useTheme } from "styled-components";

const WarningLabel = styled.label`
  color: ${({ theme }) => theme.colors.warningBorder};
  font-size: 0.9rem;
`;

const WarningDiv = styled.div.attrs({ className: "alert-div" })`
  display: ${({ invisible }) => (invisible ? "none" : "flex")};
  transition: 0.15 ease-in-out;
`;

const Error = ({ error, minified, tooltipError, tooltipId, invisible }) => {
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
            <WarningDiv invisible={invisible}>
              <label>{error}</label>
            </WarningDiv>
          ) : (
            <WarningLabel>{error}</WarningLabel>
          )}
        </>
      )}
    </>
  );
};

export default Error;
