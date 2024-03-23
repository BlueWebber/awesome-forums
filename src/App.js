import { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import NotFound from "./components/notFound";
import Unauthorized from "./components/unauthorized";
import RegisterForm from "./components/registerForm";
import Profile from "./components/profile";
import Posts from "./components/posts";
import MainPost from "./components/mainPost";
import PostEditor from "./components/postEditor";
import ProtectedRoute from "./components/protectedRoute";
import { configure } from "axios-hooks";
import darkTheme, { lightTheme } from "./components/styles/theme";
import GlobalStyle from "./components/styles/global";
import styled, { ThemeProvider } from "styled-components";
import Axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import UserContext from "./context/userContext";
import { getDecodedToken } from "./services/auth";
import config from "./config";

const axios = Axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true,
});

const refreshAuthLogic = (failedRequest) =>
  axios.get("/refresh").then((tokenRefreshResponse) => {
    localStorage.setItem(authName, tokenRefreshResponse.data);
    failedRequest.response.config.headers[authName] = tokenRefreshResponse.data;
    return Promise.resolve();
  });

createAuthRefreshInterceptor(axios, refreshAuthLogic);

const authName = config.authTokenName;
axios.defaults.headers.common[authName] =
  localStorage.getItem(authName) || sessionStorage.getItem(authName);

configure({ axios });

const Main = styled.main`
  display: flex;
  flex-grow: 1;
  justify-content: center;
`;

function App() {
  const [currentTheme, setTheme] = useState(darkTheme);

  return (
    <ThemeProvider theme={currentTheme}>
      <UserContext.Provider value={getDecodedToken()}>
        <GlobalStyle />
        <NavBar
          switchTheme={() =>
            currentTheme.status === "dark"
              ? setTheme(lightTheme)
              : setTheme(darkTheme)
          }
        />
        <Main>
          <Switch>
            <ProtectedRoute path="/login" component={LoginForm} />
            <ProtectedRoute
              path="/profile/:user_id"
              component={Profile}
              authType="true"
            />
            <Route path="/posts" component={Posts} />
            <Route path="/post/:post_id" component={MainPost} />
            <Route path="/new_post" component={PostEditor} />
            <ProtectedRoute path="/register" component={RegisterForm} />
            <Route path="/unauthorized" component={Unauthorized} />
            <Redirect from="/" exact to="/posts" />
            <Route path="*" exact component={NotFound} />
          </Switch>
        </Main>
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default App;
