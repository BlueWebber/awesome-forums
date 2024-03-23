import { faPen, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StyledTooltip from "../styles/common/tooltip";
import styled from "styled-components";
import getUniqueId from "../../utils/uniqueId";
import Button from "../styles/common/button";
import { useRef } from "react";
import ReactTooltip from "react-tooltip";

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

const DeleteButton = styled(Button).attrs({
  color: "dangerButton",
  hoverColor: "dangerButtonHover",
  empty: true,
})`
  padding: 7px 9px 7px 10px !important;
  margin: 0;
  width: 33px;
  height: 33px;
  margin-left: 10px;
  border-radius: 50%;
  flex-direction: column;

  &:hover {
    background-color: ${({ theme }) => theme.colors.dangerButtonHover};
    & > * {
      color: ${({ theme }) => theme.colors.primaryText};
    }
  }
`;

const DeleteIcon = styled(FontAwesomeIcon).attrs({ icon: faTimes })`
  color: ${({ theme }) => theme.colors.dangerButton};
  transition: 0.15 ease-in-out;
  padding-top: 3px;
`;

const WrapperDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  justify-content: center;
  grid-area: post-controls;
  place-self: end end;
`;

const OptionMenu = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto auto;
  grid-template-areas:
    "option-label option-label"
    "yes-option no-option";
  place-items: center center;
  place-content: start stretch;

  & > .prompt-label {
    grid-area: option-label;
  }
  & > .prompt-yes {
    grid-area: yes-option;
  }
  & > .prompt-no {
    grid-area: no-option;
  }
`;

const PostControls = ({ onEdit, onDelete }) => {
  const tooltipRef = useRef();
  const uuid = getUniqueId();

  const hideTooltips = () => {
    tooltipRef.current.tooltipRef = null;
    ReactTooltip.hide();
  };

  return (
    <WrapperDiv>
      <ControlButton onClick={() => onEdit()}>
        <FontAwesomeIcon icon={faPen} />
      </ControlButton>
      <div>
        <DeleteButton data-tip data-for={uuid} data-event="click">
          <DeleteIcon />
        </DeleteButton>
        <StyledTooltip
          id={uuid}
          place="left"
          effect="solid"
          event="click"
          clickable="true"
          delayHide={0}
          ref={tooltipRef}
        >
          <OptionMenu>
            <label className="prompt-label">
              Are you sure you want to delete this post?
            </label>
            <Button
              onClick={() => {
                hideTooltips();
                onDelete();
              }}
              className="prompt-yes"
              color="dangerButton"
              hoverColor="dangerButtonHover"
            >
              Yes
            </Button>
            <button className="prompt-no" onClick={hideTooltips}>
              No
            </button>
          </OptionMenu>
        </StyledTooltip>
      </div>
    </WrapperDiv>
  );
};

export default PostControls;
