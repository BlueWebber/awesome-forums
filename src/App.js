import "./App.css";
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
import ProtectedRoute from "./components/protectedRoute";
import { configure } from "axios-hooks";
import darkTheme, { lightTheme } from "./components/styles/theme";
import GlobalStyle from "./components/styles/global";
import styled, { ThemeProvider } from "styled-components";
import Axios from "axios";
import config from "./config";

const axios = Axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

const authName = config.authTokenName;
axios.defaults.headers.common["x-auth-token"] =
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
          <ProtectedRoute path="/register" component={RegisterForm} />
          <Route path="/unauthorized" component={Unauthorized} />
          <Redirect from="/" exact to="/login" />
          <Route path="*" exact component={NotFound} />
        </Switch>
      </Main>
    </ThemeProvider>
  );
}

export default App;
