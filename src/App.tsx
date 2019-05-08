import React from "react";
import {
    HashRouter as Router,
    Route,
    Switch,
    Link,
    Redirect,
} from "react-router-dom";
import "./App.css";
import Login from "./View/Login";
import Register from "./View/Register";
import {Profile} from "./View/Profile";
import {appState} from "./AppState";
import {observer} from "mobx-react";
import {
    Container,
    Jumbotron,
    Modal,
    Spinner,
    Alert
} from "react-bootstrap";

import * as AppKey from "./AppKey";
import {AppNavBar} from "./View/AppNavBar";
import TreeViewExample from "./View/TreeViewExample";

class App extends React.Component {
    async componentDidMount() {
        await appState.fetchProfile();
        console.log(process.env);
    }

    render() {
        return <Router>
            <div>
                <AppNavBar/>
                <Switch>
                    <Route exact path="/" component={Welcome}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/profile" component={Profile}/>
                    <Route component={NoMatch}/>
                </Switch>
                <ConnectionError/>
            </div>
        </Router>;
    }
}


@observer
class ConnectionError extends React.Component {
    render() {
        if (!appState.connectionError) {
            return null;
        }
        // return <Container>
        //     <Alert variant='danger' style={{marginTop: "15px"}} dismissible
        //            onClose={() => appState.setConnectionError(null)}
        //     >
        //         <h2>Что-то пошло не так.</h2>
        //         <p>{appState.connectionError}</p>
        //     </Alert>
        // </Container>;

        return (
            <div>
                <div style={{
                    display: 'block',
                    height: '112px',
                    width: '100%',
                }} />
                <div style={{
                    position: "fixed",
                    left: "0",
                    bottom: "0",
                    height: "112px",
                    width: "100%",
                }}>
                    <Container>
                        <Alert variant='danger'  dismissible
                               onClose={() => appState.setConnectionError(null)}
                        >
                            <h2>Что-то пошло не так.</h2>
                            <p>{appState.connectionError}</p>
                        </Alert>
                    </Container>
                </div>
            </div>
        );
    }
}


function Logout() {
    localStorage.removeItem(AppKey.token);
    appState.setAuth({type: 'guest'});
    return (
        <Redirect to={"/#"}/>
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
                <TreeViewExample />
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

function Footer({ children } : {children?: React.ReactNode}) {

    return (
        <div>
            <div style={{
                display: 'block',
                padding: '20px',
                height: '160px',
                width: '100%',
            }} />
            <div style={{
                backgroundColor: "#F8F8F8",
                borderTop: "1px solid #E7E7E7",
                textAlign: "center",
                padding: "20px",
                position: "fixed",
                left: "0",
                bottom: "0",
                height: "160px",
                width: "100%",
            }}>
                { children }
            </div>
        </div>
    );
}

export default App;
