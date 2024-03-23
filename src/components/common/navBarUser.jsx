import styled from "styled-components";
import SecondaryCardDiv from "../styles/common/secondaryCardDiv";
import { DefaultPfp } from "../styles/common/userPfps";
import { Link } from "react-router-dom";

const UserContainer = styled(SecondaryCardDiv)`
  flex-direction: row;
  flex-grow: 0;
  padding: 0;
  padding: 0.5rem 0.5rem 0.3rem 0.5rem;
  border-radius: 10px;
  transition: 0.15s ease-in-out;
  margin-right: 2rem;

  & > *:hover {
    cursor: pointer;
  }

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.paginationHover};
  }
`;

const StyledDefaultPfp = styled(DefaultPfp)`
  margin: 0;
  margin-right: 1rem;
  padding: 0;
  border-radius: 7px;
  font-size: 28px;
`;

const StyledUserPfp = styled(StyledDefaultPfp).attrs({ as: "img" })`
  height: 28px;
  width: 28px;
`;

const StyledLabel = styled.label`
  color: ${({ theme }) => theme.colors.secondaryText};
`;

const NavBarUser = ({ user }) => {
  return (
    <Link to={`/profile/${user["user_id"]}`}>
      <UserContainer>
        {user["pfp_link"] ? (
          <StyledUserPfp src={user["pfp_link"]} display-size="28px" />
        ) : (
          <StyledDefaultPfp disply-size="28px" />
        )}
        <StyledLabel>{user.username}</StyledLabel>
      </UserContainer>
    </Link>
  );
};

export default NavBarUser;
