import React, {
  useState,
  useContext,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import NotFound from "./notFound";
import CardDiv from "./styles/common/cardDiv";
import Button from "./styles/common/button";
import AuthorDetails from "./common/authorDetails";
import styled from "styled-components";
import perm from "./misc/permMap";
import useAxios from "axios-hooks";
import Spinner from "./common/spinner";
import { wipeToken, setToken, getDecodedToken } from "../services/auth";
import UserContext from "../context/userContext";
import EditableField from "./common/input/editableField";
import Joi from "joi-browser";
import ErrorBox from "./common/errorBox";
import { clearSettings } from "../services/settings";

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
  height: 3rem;
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

const MemoAuthorDetails = ({
  username,
  id,
  pfpLink,
  numberOfPosts,
  reputation,
  onEditSubmit,
}) =>
  useMemo(
    () => (
      <AuthorDetails
        post={{
          author_username: username,
          author_id: id,
          author_pfp_link: pfpLink,
          author_number_of_posts: numberOfPosts,
          author_reputation: reputation,
        }}
        editable={true}
        onEditSubmit={onEditSubmit}
      />
    ),
    [onEditSubmit, username, id, pfpLink, numberOfPosts, reputation]
  );

const TrComp = ({
  label,
  name,
  value,
  isOwn,
  userId,
  schema,
  setUser,
  refetch,
  dataLabel,
  type,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [{ loading: editLoading }, executeEdit] = useAxios(
    {
      url: `/users/${userId}`,
      method: "PATCH",
    },
    { manual: true }
  );

  const handleEditSubmit = async (submitName, value) => {
    let newData = null;
    try {
      newData = await executeEdit({ data: { [submitName]: value } });
    } catch (ex) {
      if (ex.response && ex.response.status === 409) {
        return ex.response.data.message;
      }
      return "An unknown error has occured, please try again later";
    }
    setIsEditing(false);
    setToken(newData.data.token, "local");
    setUser(getDecodedToken());
    refetch();
  };

  return (
    <Tr>
      {!isEditing && <td>{label}</td>}
      <td colSpan={isEditing ? 2 : 1}>
        {isOwn ? (
          <EditableField
            initialValueObj={{ [name]: value }}
            schema={schema}
            onEditSubmit={handleEditSubmit}
            onEdit={() => setIsEditing(true)}
            onEditCancel={() => setIsEditing(false)}
            editLoading={editLoading}
            label={dataLabel}
            type={type}
          />
        ) : (
          value || dataLabel
        )}
      </td>
    </Tr>
  );
};

const Profile = ({ data, userId, refetch }) => {
  const [emailRevealed, setEmailRevealed] = useState(false);
  const history = useHistory();
  const { setUser } = useContext(UserContext);

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

  const executeEdit = useAxios(
    {
      url: `/users/${userId}`,
      method: "PATCH",
    },
    { manual: true }
  )[1];

  const isOwn = data && data["is_own"];
  const handleLogout = async () => {
    try {
      await executeLogout();
    } catch (ex) {
      return;
    }
    wipeToken();
    clearSettings();
    setUser(null);
    history.replace("/posts");
  };

  const handlePfpEditSubmit = useCallback(
    async (b64) => {
      const newData = await executeEdit({
        data: {
          pfp_base64: b64.replace(
            /^data:image\/(png|jpg|gif|jpeg);base64,/,
            ""
          ),
        },
      });
      setToken(newData.data.token, "local");
      setUser(getDecodedToken());
      refetch();
    },
    [executeEdit, refetch, setUser]
  );

  const schema = {
    email: Joi.string()
      .email({ minDomainAtoms: 2 })
      .min(3)
      .max(355)
      .required()
      .label("E-mail"),
    username: Joi.string()
      .alphanum()
      .min(4)
      .max(26)
      .required()
      .label("Username"),
    password: Joi.string().min(4).max(1000).required().label("Password"),
  };

  return (
    <>
      {data && (
        <ContainerDiv>
          {isOwn && <Label>Preview</Label>}
          <MemoAuthorDetails
            username={data.username}
            id={data.user_id}
            pfpLink={data.pfp_link}
            numberOfPosts={data.number_of_posts}
            reputation={data.reputation}
            editable={isOwn}
            onEditSubmit={handlePfpEditSubmit}
          />
          <Table>
            <tbody>
              <TrComp
                label="Username:"
                name="username"
                value={data.username}
                isOwn={isOwn}
                userId={userId}
                schema={schema}
                setUser={setUser}
                refetch={refetch}
              />
              {isOwn && (
                <>
                  {emailRevealed ? (
                    <TrComp
                      label="E-mail:"
                      name="email"
                      value={data.email}
                      isOwn={true}
                      userId={userId}
                      schema={schema}
                      setUser={setUser}
                      refetch={refetch}
                    />
                  ) : (
                    <Tr>
                      <td>E-mail:</td>
                      <td>
                        <EmailRevealButton
                          onClick={() => setEmailRevealed(true)}
                        >
                          Reveal E-mail
                        </EmailRevealButton>
                      </td>
                    </Tr>
                  )}
                  <TrComp
                    label="Password:"
                    name="password"
                    dataLabel="********"
                    type="password"
                    isOwn={true}
                    userId={userId}
                    schema={schema}
                    setUser={setUser}
                    refetch={refetch}
                  />
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
                    : memberType.charAt(0).toUpperCase() + memberType.slice(1)}
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
                <Spinner position="relative" />
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
    </>
  );
};

const ProfileWrapper = () => {
  const { user_id } = useParams();
  const [{ data: initialData, loading, error }, refetch] = useAxios(
    `users/${user_id}`
  );
  const [data, setData] = useState(initialData);
  useEffect(() => {
    !loading && !error && setData(initialData);
  }, [loading, error, initialData, data]);

  return (
    <CardDiv
      max-width="40rem"
      flex-direction="column"
      disabled={!data && loading}
      center-text
    >
      {loading && !data && <Spinner />}
      {error &&
        (error.response?.status !== 404 ? (
          <ErrorBox refetch={refetch} failedAt="user profile" />
        ) : (
          <NotFound />
        ))}
      <Profile
        data={data}
        setData={setData}
        refetch={refetch}
        userId={user_id}
      />
    </CardDiv>
  );
};

export default ProfileWrapper;
