import SecondaryCardDiv from "../styles/common/secondaryCardDiv";
import useAxios from "axios-hooks";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import iconMap from "../misc/reactionIconsMap";
import StyledTooltip from "../styles/common/tooltip";
import getUniqueId from "../../utils/uniqueId";

const WrapperDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  justify-content: center;
  grid-area: post-reactions;
`;

const Reaction = styled(SecondaryCardDiv)`
  display: block;
  background-color: ${({ theme, active }) =>
    active ? theme.colors.primaryButton : theme.colors.main};
  border: 1px solid ${({ theme }) => theme.colors.greyBorder};
  transition: 0.15s ease-in-out;
  border-radius: 10px;
  margin: 0;
  padding: 5px;
  margin-right: 3px;

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.primaryButtonHover};
  }
`;

const StyledIcon = styled(FontAwesomeIcon)`
  margin-right: 0.5rem;
`;

const PostReactions = ({ postId, type }) => {
  const { data, loading, error } = useAxios(`${type}/${postId}`)[0];
  const [reactions, setReactions] = useState({});

  useEffect(() => {
    !error && !loading && setReactions(data);
  }, [data, loading, error]);

  const incrementReactionCount = (key) => {
    const draftReactions = { ...reactions };
    const draftReaction = [...draftReactions[key]];
    draftReaction.push("hi");
    draftReactions[key] = draftReaction;
    setReactions(draftReactions);
  };

  const getContent = () => {
    if (error) {
      return <label>Error loading reactions</label>;
    } else if (!loading && reactions) {
      return Object.keys(reactions).map((key) => {
        const uuid = getUniqueId();
        return (
          <>
            <Reaction
              key={key}
              data-tip
              data-for={uuid}
              onClick={() => incrementReactionCount(key)}
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
                      <>
                        {reaction["creator_username"]} <br />
                      </>
                    )
                )}
                {reactions[key].length > 5 &&
                  `and ${reactions[key].length - 5} others`}
              </p>
            </StyledTooltip>
          </>
        );
      });
    }
  };

  return <WrapperDiv>{getContent()}</WrapperDiv>;
};

export default PostReactions;
