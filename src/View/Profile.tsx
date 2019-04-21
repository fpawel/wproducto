import React from "react";
import * as AppKey from "../AppKey";
import {Alert, Button, Col, Container, Form, FormControl, InputGroup, Jumbotron, Row} from 'react-bootstrap';
import {Link, Redirect} from "react-router-dom";
import {appState} from "../AppState";
import {observer} from "mobx-react";

const viewDescription = (text: string) =>
    (<label style={{fontWeight: "bold"}}>{text}</label>)
;

const viewExn = (exn:any) =>
    <Container>
        <Alert variant='danger' style={{marginTop: "20px"}}>
            <h2>Что-то пошло не так.</h2>
            <p>{exn.text}</p>
            <p>Попробуйте <Link to="/profile"> войти в личный кабинет </Link> ещё раз.
            </p>
        </Alert>
    </Container>;

const viewResult = (user: {name:string, email:string} ) =>
    <Container>
        <Jumbotron>
            <h1
                style={{
                    fontSize: "34px",
                    fontWeight: "bold",
                }}

            >{user.name} </h1>
            <hr/>

            {viewDescription('Сменить адрес электронной почты')}

            <InputGroup className="mb-3">
                <FormControl placeholder="Email" type="email" value={user.email} onChange={() => {}} />
                <InputGroup.Append>
                    <Button variant="outline-secondary">Отмена</Button>
                    <Button variant="outline-secondary">Сохранить</Button>
                </InputGroup.Append>
            </InputGroup>

            {viewDescription('Сменить пароль')}

            <Form>
                <Form.Group as={Row}>
                    <Col sm={3}>
                        <Form.Label>
                            Новый пароль
                        </Form.Label>
                    </Col>
                    <Col>
                        <Form.Control type="password" placeholder="новый пароль"/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Col sm={3}>
                        <Form.Label>
                            Подтверждение нового пароля
                        </Form.Label>
                    </Col>
                    <Col>
                        <Form.Control type="password" placeholder="новый пароль ещё раз"/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Col sm={3}>
                        <Form.Label>
                            Старый пароль
                        </Form.Label>
                    </Col>
                    <Col>
                        <Form.Control type="password" placeholder="старый пароль"/>
                    </Col>
                </Form.Group>
            </Form>


        </Jumbotron>

    </Container>;



@observer
class ProfileDecorated extends React.Component<{}, {email:string}> {

    constructor(props: {}) {
        super(props);
        this.state = { email: ""};
        if (appState.auth.type === 'user'){
            this.state = { email: appState.auth.email};
        }
    }

    render(){

        if (appState.auth.type === "guest") {
            return (
                <Redirect to="/login"/>
            );
        }
        const {email} = this.state;
        const emailChanged = email !== appState.auth.email;

        const handleInputEmail = (evt: any) => {
            this.setState({ email: evt.target.value });
        };
        const resetEmail = () => {
            if (appState.auth.type === "user") {
                this.setState({ email: appState.auth.email });
            }
        };


        return (
            <Container>
                <Jumbotron>
                    <h1
                        style={{
                            fontSize: "34px",
                            fontWeight: "bold",
                        }}

                    >{appState.auth.name} </h1>
                    <hr/>

                    {viewDescription('Сменить адрес электронной почты')}

                    <InputGroup className="mb-3">
                        <FormControl placeholder="Email" type="email" value={email} onChange={handleInputEmail} />

                        { emailChanged ?
                            <InputGroup.Append>
                                <Button variant="outline-secondary" onClick={resetEmail} >Отмена</Button>
                                <Button variant="outline-secondary">Сохранить</Button>
                            </InputGroup.Append>
                            : null
                        }

                    </InputGroup>

                    {viewDescription('Сменить пароль')}

                    <Form>
                        <Form.Group as={Row}>
                            <Col sm={3}>
                                <Form.Label>
                                    Новый пароль
                                </Form.Label>
                            </Col>
                            <Col>
                                <Form.Control type="password" placeholder="новый пароль"/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Col sm={3}>
                                <Form.Label>
                                    Подтверждение нового пароля
                                </Form.Label>
                            </Col>
                            <Col>
                                <Form.Control type="password" placeholder="новый пароль ещё раз"/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Col sm={3}>
                                <Form.Label>
                                    Старый пароль
                                </Form.Label>
                            </Col>
                            <Col>
                                <Form.Control type="password" placeholder="старый пароль"/>
                            </Col>
                        </Form.Group>
                    </Form>


                </Jumbotron>

            </Container>
        );
    }
}

export const Profile = ProfileDecorated;

