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
                <ConnectionError/>
                <Switch>
                    <Route exact path="/" component={Welcome}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/profile" component={Profile}/>
                    <Route component={NoMatch}/>
                </Switch>
            </div>
        </Router>;
    }
}

// @observer
// class ModalPopupFetch extends React.Component {
//     render() {
//         return <Modal
//             size="sm"
//             aria-labelledby="contained-modal-title-vcenter"
//             centered
//             show={appState.request}
//             onHide={function () {
//             }}
//         >
//             <Modal.Body>
//                 <Spinner animation="border" style={{marginRight: "10px"}}/>
//                 <span style={{
//                     marginLeft: "10px",
//                     fontSize: "large",
//                 }}>{'Загрузка'}</span>
//             </Modal.Body>
//         </Modal>;
//     }
// }


@observer
class ConnectionError extends React.Component {
    render() {
        if (!appState.connectionError) {
            return null;
        }
        return <Container>
            <Alert variant='danger' style={{marginTop: "15px"}}>
                <h2>Что-то пошло не так.</h2>
                <p>{appState.connectionError}</p>
            </Alert>
        </Container>
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

export default App;
