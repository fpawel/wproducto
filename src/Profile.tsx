import React from "react";
import * as AppKey from "./AppKey";
import {Alert, Button, Col, Container, Form, FormControl, InputGroup, Jumbotron, Row} from 'react-bootstrap';
import {Link, Redirect} from "react-router-dom";
import {RPC} from "./components/RPC"

const viewDescription = (text: string) =>
    (<label style={{fontWeight: "bold"}}>{text}</label>)
;

export default function Profile() {


    return (<RPC
        method="Auth.Profile"
        params={[localStorage.getItem(AppKey.token)]}
        view={(result) => {
            if (result.kind === "exception") {
                return (
                    <Container>
                        <Alert variant='danger' style={{marginTop: "20px"}}>
                            <h2>Что-то пошло не так.</h2>
                            <p>{result.exn.text}</p>
                            <p>Попробуйте <Link to="/profile"> войти в личный кабинет </Link> ещё раз.
                            </p>
                        </Alert>
                    </Container>

                );
            }
            if (result.kind === "error") {
                return (
                    <Redirect to="/login"/>
                );
            }

            return (

                <Jumbotron>
                    <Container
                        style={{
                            margin: "100px auto 0 auto",
                            width: "50%",
                            maxWidth: "600px",

                        }}
                    >
                        <h2
                            style={{
                                fontSize: "24px",
                                fontWeight: "bold",
                            }}

                        >{result.value.Name} </h2>
                        <hr/>

                        {viewDescription('Сменить адрес электронной почты')}

                        <InputGroup className="mb-3">
                            <FormControl placeholder="Email" type="email" value={result.value.Email}/>
                            <InputGroup.Append>
                                <Button variant="outline-secondary">Выполнить</Button>
                            </InputGroup.Append>
                        </InputGroup>

                        {viewDescription('Сменить пароль')}

                        <Form>
                            <Form.Group as={Row}>
                                <Col  >
                                    <Form.Label>
                                        Новый пароль
                                    </Form.Label>
                                </Col>
                                <Col >
                                    <Form.Control type="password" placeholder="новый пароль"/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Col >
                                </Col>
                                <Col >
                                    <Form.Control type="password" placeholder="новый пароль ещё раз"/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Col >
                                    <Form.Label>
                                        Старый пароль
                                    </Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control type="password" placeholder="старый пароль"/>
                                </Col>
                            </Form.Group>
                        </Form>


                        <Button variant="secondary" size="lg"
                                onClick={() => {
                                    localStorage.removeItem(AppKey.token);
                                    window.location.hash = '#/login/';
                                }}>
                            Выход
                        </Button>


                    </Container>

                </Jumbotron>
            );

        }}
    />);
}
