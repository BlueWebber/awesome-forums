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
import UserContext from "./context/userContext";
import { getDecodedToken, setToken } from "./services/auth";
import config from "./config";

const configureAxios = () => {
  const axios = Axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    withCredentials: true,
  });

  const authName = config.authTokenName;

  /*
  const refreshAuthLogic = (failedRequest) =>
    axios.get("/refresh").then((tokenRefreshResponse) => {
      failedRequest.response.config.headers[authName] =
        tokenRefreshResponse.data;
      setToken(tokenRefreshResponse.data, localStorage.getItem("rememberUser"));
      axios.defaults.headers.common[authName] = tokenRefreshResponse.data;
      return Promise.resolve();
    });

  createAuthRefreshInterceptor(axios, refreshAuthLogic, {
    pauseInstanceWhileRefreshing: true,
  });
  */

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error.response ? error.response.status : null;

      if (status === 401) {
        return axios
          .post("/refresh")
          .then((response) => {
            error.config.headers[authName] = response.data;
            setToken(response.data, "local");
            axios.defaults.headers.common[authName] = response.data;
            return axios.request(error.config);
          })
          .catch((err) => err);
      }

      return Promise.reject(error);
    }
  );

  axios.defaults.headers.common[authName] =
    localStorage.getItem(authName) || sessionStorage.getItem(authName);

  configure({ axios });
};

configureAxios();

const Main = styled.main`
  display: flex;
  flex-grow: 1;
  justify-content: center;
`;

function App() {
  const [currentTheme, setTheme] = useState(darkTheme);
  const [user, setUser] = useState(getDecodedToken);

  return (
    <ThemeProvider theme={currentTheme}>
      <UserContext.Provider value={{ user, setUser }}>
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
