import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

export const DefaultPfp = styled(FontAwesomeIcon).attrs({
  icon: faUser,
})`
  font-size: ${(props) => props["display-size"]};
  grid-area: author;
  margin-bottom: 1rem;
  border-radius: 10px;
`;

export const UserPfp = styled(DefaultPfp).attrs({ as: "img" })`
  width: ${(props) => props["display-size"]};
  height: ${(props) => props["display-size"]};
`;

export const UserPfpEx = (props) => {
  return (
    <div>
      {props.src ? (
        <UserPfp src={props.src} display-size={props["display-size"]} />
      ) : (
        <DefaultPfp display-size={props["display-size"]} />
      )}
    </div>
  );
};
