import React from "react";
import * as AppKey from "./AppKey";
import {Alert, Button, Col, Container, Form, FormControl, InputGroup, Jumbotron, Row} from 'react-bootstrap';
import {Link, Redirect} from "react-router-dom";
import {withRPC} from "./components/RPC"
import {func} from "prop-types";

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

const viewResult = (value:any) =>
    <Container>
        <Jumbotron>
            <h1
                style={{
                    fontSize: "34px",
                    fontWeight: "bold",
                }}

            >{value.Name} </h1>
            <hr/>

            {viewDescription('Сменить адрес электронной почты')}

            <InputGroup className="mb-3">
                <FormControl placeholder="Email" type="email" value={value.Email}/>
                <InputGroup.Append>
                    <Button variant="outline-secondary">Выполнить</Button>
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


            <Button variant="secondary" size="lg"
                    onClick={() => {
                        localStorage.removeItem(AppKey.token);
                        window.location.hash = '#/login/';
                    }}>
                Выход
            </Button>
        </Jumbotron>

    </Container>;

export default function Profile() {
    return withRPC("Auth.Profile", [localStorage.getItem(AppKey.token)], ({rpcResult}) => {
        if (rpcResult.kind === "exception") {
            return viewExn(rpcResult.exn);
        }
        if (rpcResult.kind === "error") {
            return (
                <Redirect to="/login"/>
            );
        }

        return viewResult(rpcResult.value);
    })

};

