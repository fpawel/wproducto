import React from "react";
import * as AppKey from "./AppKey";
import {
    Button, Form, Spinner, Row, Alert, Container, FormGroup, FormLabel, FormControl, Jumbotron
} from 'react-bootstrap';
import { jsonrpc2 } from "./helpers/Api"
import { Link, Redirect } from "react-router-dom";
import ModalInfo from "./components/ModalInfo"

interface State {
    name: string;
    email: string;
    pass: string;
    passAgain: string;
    request: boolean;
    error?: string;
    redirect?: string;
}

export default class Register extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            name: "",
            email: "",
            pass: "",
            passAgain: "",
            request: false,
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleInputName = this.handleInputName.bind(this);
        this.handleInputPassword = this.handleInputPassword.bind(this);
        this.handleInputPasswordAgain = this.handleInputPasswordAgain.bind(this);
        this.handleInputEmail = this.handleInputEmail.bind(this);
    }

    handleInputName(evt: any) {
        this.setState({ name: evt.target.value });
    }

    handleInputEmail(evt: any) {
        this.setState({ email: evt.target.value });
    }

    handleInputPassword(evt: any) {
        this.setState({ pass: evt.target.value });
    }
    handleInputPasswordAgain(evt: any) {
        this.setState({ passAgain: evt.target.value });
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
            let response = await jsonrpc2("Auth.Register", {
                name: this.state.name,
                pass: this.state.pass,
                email: this.state.email,
                role: "regular_user",
            });
            if (response.kind === "ok") {
                localStorage.setItem(AppKey.token, response.value);
                this.setState({
                    redirect: "/profile",
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

        let { name, email, pass, passAgain, error } = this.state;

        return (
            <Jumbotron>

                <Container >
                    {ModalInfo('Выполняется', this.state.request)}
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
                            <FormLabel>Имя пользователя</FormLabel>
                            <Form.Control type="name" placeholder="Имя пользователя"
                                          required onChange={this.handleInputName}
                                          value={name}
                            />
                        </Form.Group>

                        <Form.Group as={Row} >
                            <FormLabel>Адрес электронной почты</FormLabel>
                            <Form.Control type="email" placeholder="Имя пользователя или email"
                                          required onChange={this.handleInputEmail}
                                          value={email} />
                        </Form.Group>

                        <Form.Group as={Row} >
                            <FormLabel>Пароль</FormLabel>
                            <Form.Control type="password" placeholder="Пароль"
                                          value={pass}
                                          required onChange={this.handleInputPassword} />
                        </Form.Group>

                        <Form.Group as={Row} >
                            <FormLabel>Пароль ещё раз</FormLabel>
                            <Form.Control type="password" placeholder="Пароль ещё раз"
                                          isValid={passAgain.length > 0 && pass === passAgain}
                                          isInvalid={passAgain.length > 0 && pass !== passAgain}
                                          value={passAgain}
                                          required onChange={this.handleInputPasswordAgain} />

                            {pass !== passAgain ?
                                <FormControl.Feedback type="valid">
                                    повторно введённый пароль не совпадает с введённым первоначально"
                                </FormControl.Feedback>
                                : null
                            }
                        </Form.Group>


                        <Button variant="primary" type="submit"
                                onClick={this.handleClick}
                                className="float-right"
                                disabled={this.state.request || pass !== passAgain}>
                            Регистрация
                            {this.state.request ?
                                <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                /> : null}
                        </Button>
                        <Link to="/profile" >
                            Уже зарегестрированы?
                        </Link>

                        {!this.state.request && error ?
                            (
                                <Alert variant='danger' style={{ marginTop: "20px" }}>
                                    {error}
                                </Alert>
                            ) : null
                        }
                    </Form>
                </Container>
            </Jumbotron>


        );
    }
}

function validateEmail(email: string) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}