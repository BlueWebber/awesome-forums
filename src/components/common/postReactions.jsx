import SecondaryCardDiv from "../styles/common/secondaryCardDiv";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "../styles/common/button";
import iconMap from "../misc/reactionIconsMap";
import StyledTooltip from "../styles/common/tooltip";
import getUniqueId from "../../utils/uniqueId";
import useContentGetter from "../../hooks/useContentGetter";
import useAxios from "axios-hooks";

const WrapperDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  justify-content: center;
  grid-area: post-reactions;
  place-self: end start;
`;

const Reaction = styled(SecondaryCardDiv)`
  display: block;
  background-color: ${({ theme, active }) =>
    active ? theme.colors.primaryButton : "inherit"};
  border: 1px solid ${({ theme }) => theme.colors.greyBorder};
  transition: 0.15s ease-in-out;
  border-radius: 10px;
  margin: 0;
  padding: 5px;
  margin-right: 3px;
  pointer-events: ${({ clickable }) => (clickable ? "auto" : "none")};

  &:hover {
    background-color: ${({ theme, clickable }) =>
      clickable ? theme.colors.primaryButtonHover : "inherit"};
    cursor: ${({ clickable }) => (clickable ? "pointer" : "normal")};
  }

  & > *:hover {
    cursor: pointer;
  }
`;

const StyledIcon = styled(FontAwesomeIcon)`
  margin-right: 0.5rem;
`;

const AddReactionButton = styled(Button).attrs({
  empty: true,
})`
  border-radius: 50%;
  font-size: 20px;
  margin: 0;
  margin-right: 1rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryButton};
  }

  & > * {
    margin-top: 2px;
    margin-left: 1px;
  }
`;

const ReactionsTooltipWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const ReactionAdderButton = styled(AddReactionButton)`
  font-size: 15px;
  padding: ${({ reactionKey }) =>
    reactionKey === "informative" ? "5px 11px 25px 11px" : null};
`;

const PostReactions = ({
  postId,
  type,
  username,
  userId,
  authorUsername,
  reactionsTypes,
}) => {
  const { data, loading, error, ContentGetter } = useContentGetter({
    link: `${type}/${postId}`,
    pageName: "post reactions",
    errorComponent: () => <label>Failed to load reactions</label>,
    noLoadingComponent: true,
  });

  const [reactions, setReactions] = useState({});
  const [userReactionKey, setUserReactionKey] = useState("");
  const tooltipRef = useRef();

  useEffect(() => {
    !error && !loading && setReactions(data);
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

  const getReactionTypeByKey = (key) =>
    reactionsTypes.filter((reaction) => reaction["reaction_name"] === key)[0];

  const addReaction = async (key) => {
    checkUsernameInReactions();
    if (userReactionKey && userReactionKey !== key) return editReaction(key);
    const targetReaction = getReactionTypeByKey(key);
    const newReactionObject = {
      reaction_id: getUniqueId(),
      reaction_type_id: targetReaction["reaction_id"],
      post_id: postId,
      creator_id: userId,
      reaction_name: key,
      creator_username: username,
    };
    const draftReactions = { ...reactions };
    const draftReaction = [...draftReactions[key]];
    draftReaction.push(newReactionObject);
    draftReactions[key] = draftReaction;
    setReactions(draftReactions);
    await executeAdd({
      data: { reaction_type_id: targetReaction["reaction_id"] },
    });
  };

  const removeReaction = (key) => {
    checkUsernameInReactions();
    const draftReactions = { ...reactions };
    draftReactions[key] = draftReactions[key].filter(
      (reaction) =>
        reaction["reaction_name"] !== key && reaction["creator_id"] !== userId
    );
    setReactions(draftReactions);
    executeRemove();
  };

  const editReaction = (key) => {
    checkUsernameInReactions();
    if (!userReactionKey) return addReaction(key);
    const targetReaction = getReactionTypeByKey(key);
    const draftReactions = { ...reactions };
    const draftReaction = draftReactions[key].filter(
      (reaction) =>
        reaction["reaction_name"] !== key && reaction["creator_id"] !== userId
    );
    const newReactionObject = {
      reaction_id: getUniqueId(),
      reaction_type_id: targetReaction["reaction_id"],
      post_id: postId,
      creator_id: userId,
      reaction_name: key,
      creator_username: username,
    };
    draftReactions.push(newReactionObject);
    draftReactions[key] = draftReaction;
    setReactions(draftReactions);
    executeEdit({ data: { reaction_type_id: targetReaction["reaction_id"] } });
  };

  const uuid = getUniqueId();
  const reactionsUuid = getUniqueId();

  const checkUsernameInReactions = () => {
    if (!Object.keys(reactions).length) return false;
    for (const reactionKey of Object.keys(reactions)) {
      for (const reaction of reactions[reactionKey]) {
        if (reaction["creator_username"] === username) {
          setUserReactionKey(reactionKey);
          return true;
        }
      }
    }
    return false;
  };

  const reactionsAllowed = useState(
    username && username !== authorUsername && !checkUsernameInReactions()
  )[0];

  return (
    <WrapperDiv>
      <ContentGetter>
        {reactionsAllowed && (
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
                {Object.keys(iconMap).map((key) => {
                  const reactionTipUuid = getUniqueId();
                  return (
                    <div>
                      <ReactionAdderButton
                        key={key}
                        reactionKey={key}
                        data-tip
                        data-for={reactionTipUuid}
                        onClick={() => addReaction(key)}
                      >
                        <FontAwesomeIcon icon={iconMap[key]} />
                      </ReactionAdderButton>
                      <StyledTooltip
                        id={reactionTipUuid}
                        place="top"
                        effect="solid"
                        ref={tooltipRef}
                      >
                        <label>{key}</label>
                      </StyledTooltip>
                    </div>
                  );
                })}
              </ReactionsTooltipWrapper>
            </StyledTooltip>
          </div>
        )}
        {Object.keys(reactions).map((key) => {
          if (!reactions[key].length) return null;
          return (
            <div key={key}>
              <Reaction
                data-tip
                data-for={uuid}
                onClick={() => {
                  userReactionKey === key
                    ? removeReaction(key)
                    : addReaction(key);
                }}
                active={userReactionKey === key}
                clickable={true}
              >
                <StyledIcon icon={iconMap[key]} />
                <label>{reactions[key].length}</label>
              </Reaction>
              <StyledTooltip id={uuid} place="top" effect="solid">
                <p>
                  <strong>{key[0].toUpperCase() + key.slice(1)}</strong> <br />
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
