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

                <Container>
                    <Switch>
                        <Route exact path="/" component={ProductsCategories}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/logout" component={Logout}/>
                        <Route path="/register" component={Register}/>
                        <Route path="/profile" component={Profile}/>
                        <Route component={NoMatch}/>
                    </Switch>
                </Container>

                <Container>
                    <ConnectionError/>
                </Container>

            </Router>);
    }
}

function ProductsCategories() {
    return (
        <table>
            <tbody>
            <tr>
                <td style={{width: "300px", verticalAlign: "top", paddingTop:"5px", paddingRight:"5px"}}>
                    <TreeView data={productsCategoriesTree}
                              onChangeSelectedNode={(node) => selectedProductsState.setSelectedProducts(node)}/>
                </td>
                <td style={{verticalAlign: "top", paddingTop:"5px"}}>
                    <ProductsList />
                </td>
            </tr>
            </tbody>
        </table>
    );
}

@observer
class ProductsList extends React.Component {
    render() {
        if (selectedProductsState.products.length === 0) {
            return <Welcome/>;
        }
        let hasLevel5 = false;
        for (let i = 0; i < selectedProductsState.products.length; i++) {
            if (selectedProductsState.products[i].level5.length > 0) {
                hasLevel5 = true;
                break;
            }
        }
        return (
            <Table striped bordered hover responsive  >
                <tbody>
                {
                    selectedProductsState.products.map((p) =>
                        (
                            <tr key={p.id}>
                                <td>
                                    {p.level4}
                                </td>

                                { hasLevel5 ? <td> {p.level5} </td> : null }

                                <td>
                                    {p.level6}
                                </td>
                                <td>
                                    {p.level7}
                                </td>
                                <td>
                                    {p.name2}
                                </td>
                            </tr>
                        )
                    )
                }

                </tbody>
            </Table>
        );
    }
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
    localStorage.removeItem(AppKey.token);
    appState.setAuth({type: 'guest'});
    return (
        <Redirect to={"/#"}/>
    )
}

function Welcome() {
    return (
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

function Footer({children}: { children?: React.ReactNode }) {

    return (
        <div>
            <div style={{
                display: 'block',
                padding: '20px',
                height: '160px',
                width: '100%',
            }}/>
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
                {children}
            </div>
        </div>
    );
}

export default App;
