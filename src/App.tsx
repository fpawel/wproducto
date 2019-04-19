import React, { Component } from "react";
import {
    HashRouter as Router,
    Route,
    Switch,
    Link,
    Redirect,
    RouteComponentProps,
    match,
    withRouter
} from "react-router-dom";
import "./App.css";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";
import {NavItem,  NavDropdown, DropdownButton,  Container, Jumbotron, Navbar, Nav} from "react-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import * as AppKey from "./AppKey";

function App() {
    console.log(process.env);
    return (
        <Router>
            <div>
                <Header />
                <Switch>
                    <Route exact path="/" component={Welcome} />
                    <Route path="/login" component={Login} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/register" component={Register} />
                    <Route path="/profile" component={Profile} />
                    <Route component={NoMatch} />
                </Switch>
            </div>
        </Router>
    );
}

function Logout() {
    localStorage.removeItem(AppKey.token);
    return (
        <Redirect to={"/#"} />
    )
}

function Welcome() {
    return (
            <Container>
                <Jumbotron>
                <h2>Здравствуйте</h2>
                <p>Добро пожаловать на наш сайт.</p>
                <p>
                    Пожалуйста, <Link to="/register">зарегистрируйтесь</Link>, чтобы регулярно получать скидки и бонусы
                    на депозит, а так же принять участие в наших розыгрышах.
                </p>
                <p>
                    Зарегестрированы? Проверьте свой <Link to="/profile">личный кабинет</Link>.
                </p>
                </Jumbotron>
            </Container>
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
                    {/*<Nav.Link href="#/login" activeclassname="active" eventKey="#/login" >Вход</Nav.Link>*/}
                    {/*<Nav.Link href="#/register" activeclassname="active" eventKey="#/register" >Регистрация</Nav.Link>*/}

                </Nav>
                <Nav activeKey={'#'+location.pathname} >
                    <NavDropdown id="basic-nav-dropdown"
                                 title={(<FontAwesomeIcon icon={ faUser }/>)}
                                 activeKey={'#'+location.pathname}
                    >

                        <NavDropdown.Item  href="#/login" >
                            Вход
                        </NavDropdown.Item>

                        <NavDropdown.Item  href="#/register" >
                            Регистрация
                        </NavDropdown.Item>

                        <NavDropdown.Divider />

                        <NavDropdown.Item href="#/profile" >
                            Личный кабинет
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#/logout" >
                            Выход
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar>
        </Container>
    );
});

export default App;
