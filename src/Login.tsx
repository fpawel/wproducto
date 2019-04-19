import React from "react";
import * as AppKey from "./AppKey";
import {Button, Form, Spinner, Row, Alert, Container, Jumbotron, FormGroup, FormLabel, Modal} from 'react-bootstrap';
import { jsonrpc2 } from "./helpers/Api"
import { Link, Redirect } from "react-router-dom";
import ModalInfo from "./components/ModalInfo"

interface State {
    name: string;
    pass: string;
    request: boolean;
    error?: string,
    redirect?: string,
}

export default class Login extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            name: "",
            pass: "",
            request: false,
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleInputName = this.handleInputName.bind(this);
        this.handleInputPassword = this.handleInputPassword.bind(this);
    }

    handleInputName(evt: any) {
        this.setState({ name: evt.target.value });
    }

    handleInputPassword(evt: any) {
        this.setState({ pass: evt.target.value });
    }

    setError(error: string) {
        this.setState({
            request: false,
            error: error,
        });
    }

    async handleClick() {

        this.setState({ request: true });

        try {
            let response = await jsonrpc2("Auth.Login", { name: this.state.name, pass: this.state.pass });
            if (response.kind === "ok") {
                localStorage.setItem(AppKey.token, response.value);
                this.setState({
                    redirect: "profile",
                });
                return;
            }
            this.setError(response.error);
        } catch (exn) {
            this.setError("Что-то пошло не так. Подробности в консоли браузера.");
        }
    }

    render() {

        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <Container>
                <Jumbotron>
                    {ModalInfo('Вход', this.state.request)}

                    <h1 style={{
                        fontSize: "34px",
                        fontWeight: "bold",
                    }}
                    > Вход </h1>
                    <hr/>

                    <Form style={{
                        margin: "100px auto 0 auto",
                        width: "50%",
                        maxWidth: "400px",
                        border: "3px solid lightsteelblue",
                        background: "lightcyan",
                        borderRadius: "15px",
                        padding: "40px 40px 20px 40px",
                    }}>
                        <Form.Group as={Row} >
                            <FormLabel>Имя или email</FormLabel>
                            <Form.Control type="input" placeholder="Имя пользователя или email"
                                          value={this.state.name}
                                          onChange={this.handleInputName} />
                        </Form.Group>

                        <Form.Group as={Row} >
                            <FormLabel>Пароль</FormLabel>
                            <Form.Control type="password" placeholder="Пароль"
                                          value={this.state.pass}
                                          onChange={this.handleInputPassword} />
                        </Form.Group>

                        <Button variant="primary" type="submit"
                                className="float-right" onClick={this.handleClick}
                                disabled={this.state.request}>
                            Вход
                            {this.state.request ?
                                <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                /> : null}
                        </Button>
                        <Link to="/register" >
                            Ещё не зарегестрированы?
                        </Link>

                        {!this.state.request && this.state.error ?
                            (
                                <Alert variant='danger' style={{ marginTop: "15px" }}>
                                    {this.state.error}
                                </Alert>
                            ) : null
                        }

                    </Form>
                </Jumbotron>
            </Container>


        );
    }
}

