import React from "react";
import * as AppKey from "./AppKey";
import {
    Button, Form, Spinner, Row, Alert, Card, FormGroup, FormLabel, FormControl
} from 'react-bootstrap';
import { jsonrpc2 } from "./Api"
import { Link, Redirect } from "react-router-dom";



interface State {
    name: string;
    email: string;
    pass: string;
    passAgain: string;
    request: boolean;
    error?: string
    redirectTo?: string,
}

export default class Profile extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            name: "",
            email: "",
            pass: "",
            error: "",
            passAgain: "",
            request: false,
        };
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
                localStorage.setItem(AppKey.token, response.result);
                this.setState({
                    redirectTo: "/profile",
                });
                return;
            }
            this.setError(response.error.message);
        } catch (exn) {
            this.setError("Что-то пошло не так. Подробности в консоли браузера.");
        }
    }

    render() {
        if (this.state.redirectTo) {
            return <Redirect to={this.state.redirectTo} />
        }

        let { name, email, pass, passAgain, error } = this.state;

        return (

            <main >
                <div>

                    <Form style={{
                        margin: "0 auto",
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
                </div>
            </main>
        );
    }
}

function validateEmail(email: string) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}