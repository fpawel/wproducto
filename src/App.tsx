import React from "react";
import {HashRouter as Router, Redirect, Route, Switch,} from "react-router-dom";
import "./App.css";
import Login from "./View/Login";
import Register from "./View/Register";
import {Profile} from "./View/Profile";
import {appState} from "./AppState";
import {observer} from "mobx-react";
import {Alert, Container, Jumbotron, } from "react-bootstrap";
import {AppNavBar} from "./View/AppNavBar";
import {clearApiKeyValue} from "./Def";
import {TreeView} from "./components/TreeView";
import {catalogue, selectedProductsState, CatalogueNode} from "./products-caregories";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {SelectedProducts} from "./View/SelectedProducts";
import {ShoppingCart} from "./View/ShoppingCart";
import {LoginModal} from "./View/LoginModal";
import {getApiKeyValue} from "./Def"

class App extends React.Component {
    async componentDidMount() {
        console.log(process.env);
        if(getApiKeyValue()){
            await appState.getUser();
        }
        let x = await appState.apiGetResponse("GET", "/catalogue", null);
        if (x.type === 'ok'){
            catalogue.setNodes(x.result);
        }
    }

    render() {
        return (
            <Router>
                <LoginModal />
                <AppNavBar />
                <div >
                    <Switch >
                        <Route exact path="/" component={ProductsCategories}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/logout" component={Logout}/>
                        <Route path="/register" component={Register}/>
                        <Route path="/profile" component={Profile}/>
                        <Route path="/shopping-cart" component={ShoppingCart}/>
                        <Route component={NoMatch}/>
                    </Switch>
                </div>
                <ConnectionError/>
            </Router>);
    }
}


async function onNodeChanged(x:any){
    if (x && x.tags){
        let uri = "/products?tags=" + encodeURI(x.tags.join());
        let r = await appState.apiGetResponse("GET", uri, null);
        if (r.type === "ok" ) {
            selectedProductsState.setSelectedProducts(r.result);
        }
    }
}

@observer
class ProductsCategories extends React.Component {
    render() {
        return <Container>
            <Row>
                <Col style={{verticalAlign: "top", paddingTop: "5px", paddingRight: "5px"}}
                     xl={4}
                     lg={4}
                     md={4}
                     xs={4}>
                    <TreeView data={catalogue.nodes}
                              onChangeSelectedNode={onNodeChanged}/>
                </Col>
                <Col style={{verticalAlign: "top", paddingTop: "5px"}}
                     xl={8}
                     lg={8}
                     md={8}
                     xs={8}>

                    <SelectedProducts />
                </Col>
            </Row>
        </Container>;
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
    clearApiKeyValue();
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
