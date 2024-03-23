import React, { useState, useContext } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import NotFound from "./notFound";
import CardDiv from "./styles/common/cardDiv";
import Button from "./styles/common/button";
import useContentGetter from "../hooks/useContentGetter";
import AuthorDetails from "./common/authorDetails";
import styled from "styled-components";
import perm from "./misc/permMap";
import useAxios from "axios-hooks";
import Spinner from "./common/spinner";
import { wipeToken } from "../services/auth";
import UserContext from "../context/userContext";

const ContainerDiv = styled.div`
  flex-grow: 1;
  display: grid;
  grid-template-columns: 140px auto;
  grid-template-rows: 20px auto;
  grid-template-areas:
    "preview-label info-table"
    "author info-table"
    "logout logout";
  row-gap: 0.2rem;
  place-items: stretch stretch;
  place-content: stretch stretch;
`;

const Table = styled.table`
  text-align: left;
  border-collapse: collapse;
  flex-grow: 1;
  grid-area: info-table;
`;

const Label = styled.label`
  grid-area: preview-label;
  margin-right: 10px;
`;

const Tr = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.greyBorder};
`;

const EmailRevealButton = styled.button`
  margin: 0;
  height: 1.5rem;
`;

const LogoutDiv = styled.div`
  grid-area: logout;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Profile = () => {
  const { user_id } = useParams();
  const [emailRevealed, setEmailRevealed] = useState(false);
  const history = useHistory();
  const { setUser } = useContext(UserContext);

  const { loading, data, ContentGetter } = useContentGetter({
    link: `users/${user_id}`,
    pageName: "user profile",
    handlerComponents: {
      404: NotFound,
    },
  });
  const memberType =
    data &&
    Object.keys(perm).find((key) => perm[key] === data.permission_level);

  const [{ loading: logoutLoading, error: logoutError }, executeLogout] =
    useAxios(
      {
        url: "/logout",
        method: "GET",
      },
      { manual: true }
    );

  const isOwn = data && data["is_own"];
  const handleLogout = async () => {
    try {
      await executeLogout();
    } catch (ex) {
      return;
    }
    wipeToken();
    setUser(null);
    history.replace("/posts");
  };

  return (
    <CardDiv
      max-width="40rem"
      flex-direction="column"
      disabled={loading}
      center-text
    >
      <ContentGetter>
        {data && (
          <ContainerDiv>
            {isOwn && <Label>Preview</Label>}
            <AuthorDetails
              post={{
                author_username: data.username,
                author_id: data.user_id,
                author_pfp_link: data.pfp_link,
                author_number_of_posts: data.number_of_posts,
                author_reputation: data.reputation,
              }}
            />
            <Table>
              <tbody>
                <Tr>
                  <td>Username:</td>
                  <td>{data.username}</td>
                </Tr>
                {isOwn && (
                  <>
                    <Tr>
                      <td>E-mail:</td>
                      <td>
                        {emailRevealed ? (
                          data.email
                        ) : (
                          <EmailRevealButton
                            onClick={() => setEmailRevealed(true)}
                          >
                            Reveal E-mail
                          </EmailRevealButton>
                        )}
                      </td>
                    </Tr>
                    <Tr>
                      <td>Password:</td>
                      <td>*******</td>
                    </Tr>
                  </>
                )}
                <Tr>
                  <td>Join Date:</td>
                  <td>
                    <time dateTime={data.date}>{data.date}</time>
                  </td>
                </Tr>
                <Tr>
                  <td>Type:</td>
                  <td>
                    {memberType === "normal"
                      ? "Member"
                      : memberType.charAt(0).toUpperCase() +
                        memberType.slice(1)}
                  </td>
                </Tr>
              </tbody>
            </Table>
            {isOwn && (
              <LogoutDiv>
                {logoutError ? (
                  <label>
                    An unknown error has occured, please try again later
                  </label>
                ) : logoutLoading ? (
                  <Spinner />
                ) : (
                  <Button
                    color="dangerButton"
                    hoverColor="dangerButtonHover"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                )}
              </LogoutDiv>
            )}
          </ContainerDiv>
        )}
      </ContentGetter>
    </CardDiv>
  );
};

export default Profile;
