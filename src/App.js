import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import NotFound from "./components/notFound";
import RegisterForm from "./components/registerForm";
import Profile from "./components/profile";
import Posts from "./components/posts";
import { configure } from "axios-hooks";
import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://localhost:5000/",
});

configure({ axios });

function App() {
  return (
    <>
      <NavBar />
      <main className="d-flex justify-content-center" style={{ padding: 30 }}>
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/profile/:user_id" component={Profile} />
          <Route path="/posts" component={Posts} />
          <Route path="/register" component={RegisterForm} />
          <Redirect from="/" exact to="/login" />
          <Route path="*" exact component={NotFound} />
        </Switch>
      </main>
    </>
  );
}

export default App;
