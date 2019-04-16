import React from "react";
import * as AppKey from "./AppKey";
import {
    Button, Form, Spinner, Row, Alert, Card, FormGroup, FormLabel, FormControl, Jumbotron, Container
} from 'react-bootstrap';
import { jsonrpc2 } from "./Api"
import { Link, Redirect } from "react-router-dom";



interface State {
    payload: {
        kind: "initialized";
        name: string;
        email: string;
    } | {
        kind: "initializing";
    } | {
        kind: "error";
        error: string;
    }
}

export default class Profile extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            payload: {
                kind: "initializing",
            },
        };
    }

    async componentDidMount() {
        try {
            let response = await jsonrpc2("Auth.Profile", [localStorage.getItem(AppKey.token)]);
            if (response.kind === "ok") {
                this.setState({
                    payload: {
                        kind: "initialized",
                        name: response.result.Name,
                        email: response.result.Email,
                    },
                });
                return;
            }
            this.setState({
                payload: {
                    kind: "error",
                    error: response.error.message,
                },
            });
        } catch (exn) {
            this.setState({
                payload: {
                    kind: "error",
                    error: "Подробности в консоли браузера.",
                },
            });
        }

    }


    render() {
        if (this.state.payload.kind === "initializing") {
            return (<main>
                <Spinner animation="border" />
            </main>);
        }

        if (this.state.payload.kind === "error") {
            return (<main>
                <Alert variant='danger' style={{ marginTop: "20px" }}>
                    <h2>Что-то пошло не так.</h2>
                    <p>{this.state.payload.error}</p>
                    <p>Попробуйте <Link to="/profile" > войти в личный кабинет </Link>  ещё раз.
                    </p>
                </Alert>
            </main>);
        }


        return (<main>
            <Jumbotron>
                <Container>
                    <h2>Личный кабинет</h2>
                    <h3>{this.state.payload.name}</h3>
                    <h4>{this.state.payload.email}</h4>
                </Container>

            </Jumbotron>

        </main>);
    }
}

