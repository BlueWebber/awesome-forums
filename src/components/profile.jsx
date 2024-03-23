import React from "react";
import { useParams } from "react-router";
import NotFound from "./notFound";
import CardDiv from "./styles/common/cardDiv";
import useContentGetter from "../hooks/useContentGetter";
import AuthorDetails from "./common/authorDetails";
import styled from "styled-components";
import perm from "./misc/permMap";

/*
const ContainerDiv = styled.div`
  display: flex;
  flex-direction: row;

  & > * {
    margin-right: 2rem;
  }
`;
*/

const ContainerDiv = styled.div`
  flex-grow: 1;
  display: grid;
  grid-template-columns: 140px auto;
  grid-template-rows: 20px auto;
  grid-template-areas:
    "preview-label info-table"
    "author info-table";
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

const Profile = () => {
  const { user_id } = useParams();
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
            <Label>Preview</Label>
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
                <Tr>
                  <td>E-mail:</td>
                  <td>{data.email}</td>
                </Tr>
                <Tr>
                  <td>Password:</td>
                  <td>*******</td>
                </Tr>
                <Tr>
                  <td>Join Date:</td>
                  <td>
                    <time dateTime={data.date}>{data.date}</time>
                  </td>
                </Tr>
                <tr>
                  <td>Type:</td>
                  <td>
                    {memberType === "normal"
                      ? "Member"
                      : memberType.charAt(0).toUpperCase() +
                        memberType.slice(1)}
                  </td>
                </tr>
              </tbody>
            </Table>
          </ContainerDiv>
        )}
      </ContentGetter>
    </CardDiv>
  );
};

export default Profile;
