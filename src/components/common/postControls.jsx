import { faPen, faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StyledTooltip from "../styles/common/tooltip";
import styled from "styled-components";
import getUniqueId from "../../utils/uniqueId";
import Button from "../styles/common/button";
import { useRef } from "react";
import ReactTooltip from "react-tooltip";
import RoundButton from "../styles/common/roundButton";

const DeleteButton = styled(RoundButton).attrs({
  color: "dangerButton",
  hoverColor: "dangerButtonHover",
  displaySize: "33px",
  childrenHoverColor: "primaryText",
  childrenColor: "dangerButton",
  displayFontSize: "16px",
})`
  margin-left: 10px;
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

const PostControls = ({
  onEdit,
  onDelete,
  onEditCancel,
  onEditConfirm,
  editConfirmDisabled,
  controlsType,
  isEditting,
}) => {
  const tooltipRef = useRef();
  const uuid = getUniqueId();

  const hideTooltips = () => {
    tooltipRef.current.tooltipRef = null;
    ReactTooltip.hide();
  };

  return (
    <WrapperDiv>
      <RoundButton
        disabled={editConfirmDisabled}
        onClick={() => (isEditting ? onEditConfirm() : onEdit())}
        displaySize="33px"
        displayFontSize="18px"
      >
        <FontAwesomeIcon icon={isEditting ? faCheck : faPen} />
      </RoundButton>
      <div>
        <DeleteButton data-tip data-for={uuid} data-event="click">
          <FontAwesomeIcon icon={faTimes} />
        </DeleteButton>
        <StyledTooltip
          id={uuid}
          place="left"
          effect="solid"
          event="click"
          clickable={true}
          delayHide={0}
          ref={tooltipRef}
        >
          <OptionMenu>
            <label className="prompt-label">
              {isEditting
                ? "Are you sure you want to discord changes?"
                : `Are you sure you want to delete this ${controlsType}?`}
            </label>
            <Button
              onClick={() => {
                hideTooltips();
                isEditting ? onEditCancel() : onDelete();
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
