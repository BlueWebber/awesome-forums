import { useState, useEffect } from "react";
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
import { darkTheme, lightTheme } from "./components/styles/theme";
import GlobalStyle from "./components/styles/global";
import styled, { ThemeProvider } from "styled-components";
import axios from "./plugins/axios";
import UserContext from "./context/userContext";
import { getDecodedToken } from "./services/auth";
import { getSetting, setSetting } from "./services/settings";

configure({ axios });

const Main = styled.main`
  display: flex;
  flex-grow: 1;
  justify-content: center;
`;

function App() {
  const [currentTheme, setTheme] = useState(darkTheme);
  const [user, setUser] = useState(getDecodedToken);

  useEffect(() => {
    getSetting("theme").then((theme) => {
      return theme === "light" ? setTheme(lightTheme) : null;
    });
  }, []);

  const handleThemeChange = () => {
    if (currentTheme.status === "dark") {
      setSetting({ theme: "light" });
      setTheme(lightTheme);
    } else {
      setSetting({ theme: "dark" });
      setTheme(darkTheme);
    }
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <UserContext.Provider value={{ user, setUser }}>
        <GlobalStyle />
        <NavBar switchTheme={handleThemeChange} />
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
