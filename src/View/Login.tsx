import React from "react";
import * as AppKey from "../Def";
import {Button, ButtonProps, Form, Spinner, Row, Alert, Container, Jumbotron,  FormLabel, OverlayTrigger } from 'react-bootstrap';
import { Link, Redirect } from "react-router-dom";
import {appState} from "../AppState"
import {observer} from "mobx-react";

interface State {
    name: string;
    password: string;
    error?: string,
    redirect?: string,
}

type ButtonOnClickHandler = () => void;

@observer
class LoginButton extends React.Component< {onClick: ButtonOnClickHandler}, {}>{
    render(){
        return <Button variant="primary" type="submit"
                       className="float-right" onClick={this.props.onClick}
                       disabled={appState.apiRequestPerforming} >

            {appState.apiRequestPerforming ?
                <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                /> : null}
            Вход
        </Button>;
    }
}

export default class Login extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            name: "",
            password: "",
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleInputName = this.handleInputName.bind(this);
        this.handleInputPassword = this.handleInputPassword.bind(this);
    }

    handleInputName(evt: any) {
        this.setState({ name: evt.target.value });
    }

    handleInputPassword(evt: any) {
        this.setState({ password: evt.target.value });
    }



    async handleClick() {

        this.setState({ error:undefined });

        if (await appState.login(this.state)) {
            await appState.getUser();
            this.setState({
                redirect: "/profile",
            });
        }
        this.setState({ error: "что-то пошло не так", });
    }

    render() {
        const {error, redirect} = this.state
        if (redirect) {
            return <Redirect to={redirect} />
        }

        return (
            <Container>
                <Jumbotron>

                    <h1 style={{
                        fontSize: "34px",
                        fontWeight: "bold",
                    }}
                    > Вход </h1>
                    <hr/>

                    <Form style={{
                        margin: "10px auto",
                        maxWidth: "400px",
                        border: "3px solid lightsteelblue",
                        background: "lightcyan",
                        borderRadius: "15px",
                        padding: "40px",
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
                                          value={this.state.password}
                                          onChange={this.handleInputPassword} />
                        </Form.Group>

                        <LoginButton onClick={this.handleClick} />


                        <Link to="/register" >
                            Ещё не зарегестрированы?
                        </Link>
                    </Form>

                    { error ?
                        (
                            <Alert variant='danger' style={{ marginTop: "20px" }}>
                                {error}
                            </Alert>
                        ) : null
                    }


                </Jumbotron>
            </Container>
        );
    }
}

