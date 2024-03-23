import SecondaryCardDiv from "../styles/common/secondaryCardDiv";
// import ControlButton from "../styles/common/controlButton";
import RoundButton from "../styles/common/roundButton";
import { useState, useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import iconMap from "../misc/reactionIconsMap";
import StyledTooltip from "../styles/common/tooltip";
import getUniqueId from "../../utils/uniqueId";
import useContentGetter from "../../hooks/useContentGetter";
import useAxios from "axios-hooks";
import ReactionsContext from "../../context/reactionsContext";
import _ from "lodash";

const WrapperDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  justify-content: center;
  grid-area: post-reactions;
  place-self: end start;
`;

const Reaction = styled(SecondaryCardDiv)`
  display: flex;
  flex-direction: row;
  background-color: ${({ theme, active }) =>
    active ? theme.colors.primaryButton : "inherit"};
  border: 1px solid ${({ theme }) => theme.colors.greyBorder};
  transition: 0.15s ease-in-out;
  border-radius: 10px;
  margin: 0;
  padding: 5px;
  margin-right: 3px;
  pointer-events: ${({ clickable }) => (clickable ? "auto" : "none")};
  width: 40px;

  &:hover {
    background-color: ${({ theme, clickable }) =>
      clickable ? theme.colors.primaryButtonHover : "inherit"};
    cursor: ${({ clickable }) => (clickable ? "pointer" : "normal")};
  }

  & > *:hover {
    cursor: pointer;
  }
`;

const AddReactionButton = styled(RoundButton).attrs({
  displaySize: "35px",
  displayFontSize: "15px",
})`
  margin-right: 0.5rem;
  margin-left: 0.5rem;
`;

const ReactionsTooltipWrapper = styled.div`
  display: flex;
  flex-direction: row;
  transition: 0.2s ease-in-out;
`;

const IconWrapper = styled.div`
  width: 20px;
  margin-right: 6px;
  border-right: 1px solid ${({ theme }) => theme.colors.greyBorder};
`;

const ReactionAdderButton = styled(AddReactionButton)``;

const PostReactions = ({ postId, type, user, authorUsername }) => {
  const { data, loading, error, ContentGetter } = useContentGetter({
    link: `${type}/${postId}`,
    pageName: "post reactions",
    errorComponent: () => <label>Failed to load reactions</label>,
    noLoadingComponent: true,
  });

  const [reactions, setReactions] = useState({});
  const [userReaction, setUserReaction] = useState(null);
  const reactionsTypes = useContext(ReactionsContext);
  const tooltipRef = useRef();

  useEffect(() => {
    if (!loading && data) {
      setReactions(data["reactions"]);
      data["user_reaction"] && setUserReaction(data["user_reaction"]);
    }
  }, [data, loading, error]);

  const reqUrl =
    type === "post_reactions"
      ? `post_reactions/${postId}`
      : `reply_reactions/${postId}`;

  const executeAdd = useAxios(
    {
      url: reqUrl,
      method: "POST",
    },
    { manual: true }
  )[1];

  const executeRemove = useAxios(
    {
      url: reqUrl,
      method: "DELETE",
    },
    { manual: true }
  )[1];

  const executeEdit = useAxios(
    {
      url: reqUrl,
      method: "PUT",
    },
    { manual: true }
  )[1];

  const createMockReaction = (reactionTypeId) => {
    const mockReactionId = getUniqueId();
    const postIdStr = type === "post_reactions" ? "post_id" : "reply_id";
    const mockReaction = {
      reaction_id: mockReactionId,
      reaction_type_id: reactionTypeId,
      creator_id: user["user_id"],
      reaction_name: reactionsTypes.filter(
        (reaction) => reaction["reaction_id"] === reactionTypeId
      )[0]["reaction_name"],
      creator_username: user["username"],
    };
    mockReaction[postIdStr] = postId;
    return mockReaction;
  };

  const handleReaction = async (reactionTypeId) => {
    const targetReactionName = reactionsTypes.filter(
      (reaction) => reaction["reaction_id"] === reactionTypeId
    )[0]["reaction_name"];
    const draftReactions = _.cloneDeep(reactions);

    if (userReaction && userReaction["reaction_type_id"] === reactionTypeId) {
      draftReactions[targetReactionName] = draftReactions[
        targetReactionName
      ].filter((reaction) => reaction["creator_id"] !== user["user_id"]);
      setReactions(draftReactions);
      setUserReaction(null);
      await executeRemove();
      return;
    }

    const mockReaction = createMockReaction(reactionTypeId);
    if (!draftReactions[targetReactionName]) {
      draftReactions[targetReactionName] = [];
    }
    draftReactions[targetReactionName].push(mockReaction);

    if (!userReaction) {
      setUserReaction(mockReaction);
      setReactions(draftReactions);
      await executeAdd({ data: { reaction_type_id: reactionTypeId } });
      return;
    }

    const reactionName = userReaction["reaction_name"];
    draftReactions[reactionName] = draftReactions[reactionName].filter(
      (reaction) => reaction["creator_id"] !== user["user_id"]
    );
    setReactions(draftReactions);
    setUserReaction(createMockReaction(reactionTypeId));
    await executeEdit({ data: { reaction_type_id: reactionTypeId } });
  };

  const reactionsUuid = getUniqueId();
  const canReact = !!(
    user &&
    user["username"] &&
    !(user["username"] === authorUsername)
  );

  return (
    <WrapperDiv>
      <ContentGetter>
        {canReact && (
          <div>
            <AddReactionButton
              data-tip
              data-for={reactionsUuid}
              data-event="click"
            >
              <FontAwesomeIcon icon={faPlus} />
            </AddReactionButton>
            <StyledTooltip
              id={reactionsUuid}
              place="top"
              effect="solid"
              event="click"
              clickable={true}
              ref={tooltipRef}
            >
              <ReactionsTooltipWrapper>
                {reactionsTypes &&
                  reactionsTypes.map((reaction) => {
                    const reactionTipUuid = getUniqueId();
                    return (
                      <div key={reaction["reaction_id"]}>
                        <ReactionAdderButton
                          data-tip
                          data-for={reactionTipUuid}
                          onClick={() =>
                            handleReaction(reaction["reaction_id"])
                          }
                        >
                          <FontAwesomeIcon
                            icon={iconMap[reaction["reaction_name"]]}
                          />
                        </ReactionAdderButton>
                        <StyledTooltip
                          id={reactionTipUuid}
                          place="top"
                          effect="solid"
                          ref={tooltipRef}
                        >
                          <label>{reaction["reaction_name"]}</label>
                        </StyledTooltip>
                      </div>
                    );
                  })}
              </ReactionsTooltipWrapper>
            </StyledTooltip>
          </div>
        )}
        {reactions &&
          Object.keys(reactions).map((key) => {
            if (!reactions[key].length) return null;
            const uuid = getUniqueId();
            return (
              <div key={key}>
                <Reaction
                  data-tip
                  data-for={uuid}
                  onClick={() =>
                    handleReaction(reactions[key][0]["reaction_type_id"])
                  }
                  active={userReaction && userReaction["reaction_name"] === key}
                  clickable={canReact}
                >
                  <IconWrapper>
                    <FontAwesomeIcon icon={iconMap[key]} />
                  </IconWrapper>
                  <label>{reactions[key].length}</label>
                </Reaction>
                <StyledTooltip id={uuid} place="top" effect="solid">
                  <p>
                    <strong>{key[0].toUpperCase() + key.slice(1)}</strong>{" "}
                    <br />
                    {reactions[key].map(
                      (reaction, idx) =>
                        idx < 4 && (
                          <label key={reaction["reaction_id"]}>
                            {reaction["creator_username"]} <br />
                          </label>
                        )
                    )}
                    {reactions[key].length > 5 &&
                      `and ${reactions[key].length - 5} others`}
                  </p>
                </StyledTooltip>
              </div>
            );
          })}
      </ContentGetter>
    </WrapperDiv>
  );
};
export default PostReactions;
