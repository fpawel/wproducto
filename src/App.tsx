import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
    RouteComponentProps,
    match
} from "react-router-dom";
import "./App.css";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";
import {Container, Jumbotron} from "react-bootstrap";

function App() {
    return (
        <Router>
            <div>
                <Header />
                <Switch>
                    <Route exact path="/" component={Welcome} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/profile" component={Profile} />
                    <Route component={NoMatch} />
                </Switch>
            </div>
        </Router>
    );
}

function Welcome(props: any) {
    return (
        <Jumbotron>
            <Container>
                <h2>Здравствуйте</h2>
                <p>Добро пожаловать на наш сайт.</p>
                <p>
                    Пожалуйста, <Link to="/register">зарегистрируйтесь</Link>, чтобы регулярно получать скидки и бонусы
                    на депозит, а так же принять участие в наших розsгрышах.
                </p>
                <p>
                    Зарегестрированы? Проверьте свой <Link to="/profile">личный кабинет</Link>.
                </p>
            </Container>

        </Jumbotron>
    );
}

// function Topic({ match }: RouteComponentProps<{ id: string }>) {
//   return <h3>Requested Param: {match.params.id}</h3>;
// }

// function Topics({ match }: RouteComponentProps<{ id: string }>) {
//   return (
//     <div>
//       <h2>Topics</h2>

//       <ul>
//         <li>
//           <Link to={`${match.url}/components`}>Components</Link>
//         </li>
//         <li>
//           <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
//         </li>
//       </ul>

//       <Route path={`${match.path}/:id`} component={Topic} />
//       <Route
//         exact
//         path={match.path}
//         render={() => <h3>Please select a topic.</h3>}
//       />
//     </div>
//   );
// }

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
                <Link to="/">Добро пожаловать</Link>
            </li>
            <li>
                <Link to="/login">Вход</Link>
            </li>
            <li>
                <Link to="/register">Регистрация</Link>
            </li>
            <li>
                <Link to="/profile">Личный кабинет</Link>
            </li>
        </ul>
    );
}

export default App;
