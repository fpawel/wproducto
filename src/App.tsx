import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route, Switch,
  Link,
  RouteComponentProps,
  match
} from "react-router-dom";
import "./App.css";
import Login from "./Login";
import Register from "./Register";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/topics" component={Topics} />
          <Route component={NoMatch} />
        </Switch>


      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function Topic({ match }: RouteComponentProps<{ id: string }>) {
  return <h3>Requested Param: {match.params.id}</h3>;
}

function Topics({ match }: RouteComponentProps<{ id: string }>) {
  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul>

      <Route path={`${match.path}/:id`} component={Topic} />
      <Route
        exact
        path={match.path}
        render={() => <h3>Please select a topic.</h3>}
      />
    </div>
  );
}

function NoMatch(props: any) {
  return (
    <div>
      <h3>
        No match for <code>{props.location.pathname}</code>
      </h3>
    </div>
  );
}

function Header() {
  return (
    <ul>
      <li>
        <Link to="/">Домой</Link>
      </li>
      <li>
        <Link to="/login">Вход</Link>
      </li>
      <li>
        <Link to="/register">Регистрация</Link>
      </li>
      <li>
        <Link to="/topics">Topics</Link>
      </li>
    </ul>
  );
}

export default App;
