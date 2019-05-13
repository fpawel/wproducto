import React from "react";
import * as AppKey from "../AppKey";
import {
    Button, Form, Spinner, Row, Alert, Container, FormGroup, FormLabel, FormControl, Jumbotron, ButtonToolbar
} from 'react-bootstrap';
import { Link, Redirect } from "react-router-dom";
import {appState} from "../AppState"
import {observer} from "mobx-react";

interface State {
    name: string;
    email: string;
    pass: string;
    passAgain: string;
    error?: string;
    redirect?: string;
}


@observer
class RegisterButton extends React.Component<{onClick: () => void}, {}>{
    render(){
        return <Button variant="primary" type="submit"
                       className="float-right" onClick={this.props.onClick}
                       disabled={appState.rpcRequest==='Auth.Register'}>
            Регистрация
        </Button>;
    }
}

export default class Register extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            name: "",
            email: "",
            pass: "",
            passAgain: "",
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
            error: error,
        });
    }

    async handleClick() {
        this.setState({ error:undefined });

        let response = await appState.register(this.state);
        if (response.type === "result") {
            this.setState({
                redirect: "/profile",
            });
            return;
        }
        this.setError(response.error.message);
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        let { name, email, pass, passAgain, error } = this.state;

        return (
            <Jumbotron>

                <h1 style={{
                    fontSize: "34px",
                    fontWeight: "bold",
                }}
                > Регистрация </h1>
                <hr/>

                <Form style={{
                    margin: "0 auto",
                    maxWidth: "400px",
                    border: "3px solid lightsteelblue",
                    background: "lightcyan",
                    borderRadius: "15px",
                    padding: "40px",
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
                    <Form.Group as={Row} >
                        <ButtonToolbar>

                            <Button variant="link" onClick={
                                () => {
                                    appState.modal = "login";
                                }
                            }>
                                Уже зарегестрированы?
                            </Button>

                            <RegisterButton onClick={this.handleClick} />

                        </ButtonToolbar>
                    </Form.Group>
                </Form>

                { error ?
                    (
                        <Alert variant='danger' style={{ marginTop: "20px" }}>
                            {error}
                        </Alert>
                    ) : null
                }
            </Jumbotron>
        );
    }
}

function validateEmail(email: string) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}