import React from "react";
import {HashRouter as Router, Link, Redirect, Route, Switch,} from "react-router-dom";
import "./App.css";
import Login from "./View/Login";
import Register from "./View/Register";
import {Profile} from "./View/Profile";
import {appState} from "./AppState";
import {observer} from "mobx-react";
import {Alert, Container, Jumbotron, Table} from "react-bootstrap";

import * as AppKey from "./AppKey";
import {AppNavBar} from "./View/AppNavBar";

import {TreeView} from "./components/TreeView";
import {productsCategoriesTree, selectedProductsState} from "./products-caregories";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {SelectedProducts} from "./View/SelectedProducts";
import {RecycleBin} from "./View/RecycleBin";

class App extends React.Component {
    async componentDidMount() {
        await appState.fetchProfile();
        console.log(process.env);
    }

    render() {
        return (
            <Router>
                <Container>
                    <AppNavBar/>
                </Container>
                <Switch>
                    <Route exact path="/" component={ProductsCategories}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/profile" component={Profile}/>
                    <Route component={NoMatch}/>
                </Switch>
                <ConnectionError/>
            </Router>);
    }
}

function ProductsCategories() {
    return (
        <Container>
            <Row>
                <Col style={{verticalAlign: "top", paddingTop: "5px", paddingRight: "5px"}}
                     xl={4}
                     lg={4}
                     md={4}
                     xs={4}>
                    <TreeView data={productsCategoriesTree}
                              onChangeSelectedNode={(node) => selectedProductsState.setSelectedProducts(node)}/>
                </Col>
                <Col style={{verticalAlign: "top", paddingTop: "5px"}}
                     xl={8}
                     lg={8}
                     md={8}
                     xs={8}>
                    <RecycleBin />
                    <SelectedProducts />
                </Col>
            </Row>
        </Container>
    );
}

@observer
class ConnectionError extends React.Component {
    render() {
        if (!appState.connectionError) {
            return null;
        }

        return (
            <div>
                <div style={{
                    display: 'block',
                    height: '112px',
                    width: '100%',
                }}/>
                <div style={{
                    position: "fixed",
                    left: "0",
                    bottom: "0",
                    height: "112px",
                    width: "100%",
                }}>
                    <Container>
                        <Alert variant='danger' dismissible
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
    localStorage.removeItem(AppKey.tokenKey);
    appState.setAuth({type: 'guest'});
    return (
        <Redirect to={"/#"}/>
    )
}


function NoMatch(props: any) {
    return (
        <Container>
            <Jumbotron>
                No match for <code>{props.location.pathname}</code>
            </Jumbotron>
        </Container>
    );
}

export default App;
