import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import NotFound from "./components/notFound";
import RegisterForm from "./components/registerForm";
import Profile from "./components/profile";
import Posts from "./components/posts";
import { configure } from "axios-hooks";
import theme from "./components/styles/theme";
import GlobalStyle from "./components/styles/global";
import styled, { ThemeProvider } from "styled-components";
import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://localhost:5000/",
});

configure({ axios });

const Main = styled.main`
  display: flex;
  flex-grow: 1;
  padding: 30;
  justify-content: center;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <NavBar />
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
