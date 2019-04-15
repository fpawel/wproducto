import React from "react";
import * as AppKey from "./AppKey";
import {Button, Form, Col, Alert, Card} from 'react-bootstrap';


interface State {
    name: string;
    pass: string;
    request: boolean;
    error?: string
}

function getFromLocalStorage(key: string): string {
    let v = localStorage.getItem(key);
    if (v) {
        return v;
    }
    return "";
}

export default class Login extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            name: getFromLocalStorage(AppKey.username),
            pass: getFromLocalStorage(AppKey.password),
            request: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleInputName = this.handleInputName.bind(this);
        this.handleInputPassword = this.handleInputPassword.bind(this);
    }

    handleInputName(evt: any) {
        this.setState({name: evt.target.value});
    }

    handleInputPassword(evt: any) {
        this.setState({pass: evt.target.value});
    }

    handleClick() {
        const request = JSON.stringify({
            jsonrpc: "2.0",
            method: "Auth.Login",
            params: {name: this.state.name, pass: this.state.pass},
            id: 0
        });

        this.setState({request: true});

        fetch("http://localhost:3001/rpc", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: request
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }

                throw new Error(`${response.status}: ${response.statusText}`);
            })
            .then(response => {
                if (typeof response.result === "string") {
                    localStorage.setItem(AppKey.username, this.state.name);
                    localStorage.setItem(AppKey.password, this.state.pass);
                    localStorage.setItem(AppKey.token, response.result);
                    window.location.href = "/profile";
                    return;
                }
                if (typeof response.error.message === "string") {
                    this.setState({error: response.error.message, request: false});
                    return;
                }
                if (typeof response.error === "string") {
                    throw new Error(response.error);
                }

                throw new Error(JSON.stringify(response));
            })
            .catch(error => {
                this.setState({
                    request: false,
                    error: "Что-то пошло не так. Подробности в консоли браузера."
                });
                console.log(error);
            });
    }

    render() {
        return (
            <main>
                <Card>
                    <Card.Header>
                        Вход
                    </Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Row>
                                <Col>
                                    <Form.Label>Имя или email</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Label>Пароль</Form.Label>
                                </Col>

                                <Col>

                                </Col>


                            </Form.Row>


                            <Form.Row>
                                <Col>
                                    <Form.Control type="email" placeholder="Имя пользователя или email"
                                                  onChange={this.handleInputName}/>
                                </Col>
                                <Col>
                                    <Form.Control type="password" placeholder="Пароль"
                                                  onChange={this.handleInputPassword}/>
                                </Col>

                                <Col>
                                    <Button variant="primary" type="submit" onClick={this.handleClick}
                                            disabled={this.state.request}>
                                        Вход
                                    </Button>
                                </Col>

                            </Form.Row>

                            <Form.Row>
                                <Col>
                                    <Button variant="link">

                                        Уже зарегестрированы?
                                    </Button>

                                </Col>

                            </Form.Row>


                        </Form>


                    </Card.Body>

                </Card>

                {this.state.error ?
                    (
                        <Alert variant='danger'>
                            {this.state.error}
                        </Alert>
                    ) : null
                }


            </main>


        );
    }
}

