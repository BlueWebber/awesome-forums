import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import NotFound from "./components/notFound";

function App() {
  return (
    <>
      <NavBar />
      <main
        className="container position-absolute top-50 start-50 translate-middle"
        style={{ padding: 30 }}
      >
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="*" exact component={NotFound} />
        </Switch>
      </main>
    </>
  );
}

export default App;
