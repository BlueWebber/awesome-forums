import "./App.css";
import { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import NotFound from "./components/notFound";
import RegisterForm from "./components/registerForm";
import Profile from "./components/profile";
import Posts from "./components/posts";
import { configure } from "axios-hooks";
import darkTheme, { lightTheme } from "./components/styles/theme";
import GlobalStyle from "./components/styles/global";
import styled, { ThemeProvider } from "styled-components";
import Axios from "axios";

const axios = Axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

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
          <Route path="/login" component={LoginForm} />
          <Route path="/profile/:user_id" component={Profile} />
          <Route path="/posts" component={Posts} />
          <Route path="/register" component={RegisterForm} />
          <Redirect from="/" exact to="/login" />
          <Route path="*" exact component={NotFound} />
        </Switch>
      </Main>
    </ThemeProvider>
  );
}

export default App;
