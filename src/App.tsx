import React, { Component } from "react";
import {
    HashRouter as Router,
    Route,
    Switch,
    Link,
    RouteComponentProps,
    match,
    withRouter
} from "react-router-dom";
import "./App.css";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";
import {Container, Jumbotron, Navbar, Nav} from "react-bootstrap";

function App() {
    console.log(process.env);
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

function NoMatch(props: any) {
    return (
        <div>
            <h3>
                No match for <code>{props.location.pathname}</code>
            </h3>
        </div>
    );
}

const Header = withRouter ( props => {
    const { location } = props;
    return (
        <Container>
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand href="#/">Producto</Navbar.Brand>
                <Nav className="mr-auto" activeKey={'#'+location.pathname}>
                    <Nav.Link href="#/login" activeclassname="active" eventKey="#/login" >Вход</Nav.Link>
                    <Nav.Link href="#/register" activeclassname="active" eventKey="#/register" >Регистрация</Nav.Link>
                    <Nav.Link href="#/profile" activeclassname="active" eventKey="#/profile" >Личный кабинет</Nav.Link>
                </Nav>
            </Navbar>
        </Container>
    );
});

export default App;
