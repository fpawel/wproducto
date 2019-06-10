import React from "react";
import {observer} from "mobx-react";
import {Alert, Button, FormControl, InputGroup, Modal, Spinner} from "react-bootstrap";
import {appState} from "../AppState";
import './LoginModal.css'


interface State {
    name: string;
    password: string;
    error?: string,
}



@observer
class LoginModalObserver extends React.Component<{}, State> {

    constructor(props: {}) {
        super(props);
        this.state = {
            name: "",
            password: "",
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleInputName = this.handleInputName.bind(this);
        this.handleInputPassword = this.handleInputPassword.bind(this);
        this.handleResetError = this.handleResetError.bind(this);
    }

    handleInputName(evt: any) {
        this.setState({name: evt.target.value});
    }

    handleInputPassword(evt: any) {
        this.setState({password: evt.target.value});
    }

    handleResetError() {
        this.setState({error: undefined});
    }


    async handleClick() {

        this.setState({error: undefined});
        try {
            const r = await appState.login(this.state);
            if (r.type === "ok") {
                await appState.getUser();
                appState.setModal(null);
                return
            }
            this.setState({ error: `${r.error.code}: ${r.error.message}` });
        } catch (e) {
            this.setState({ error: 'Нет связи', });
        }
    }

    render() {
        let {error, name, password,} = this.state;

        return (
            <Modal dialogClassName='login-modal-dialog' aria-labelledby="contained-modal-title-vcenter"
                   show={appState.modal === 'login'}
                   onHide={() => appState.setModal(null)}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Вход
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <h6>Имя пользователя или email:</h6>

                    <InputGroup size="sm">
                        <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm"
                                     type="input" placeholder="Имя пользователя или email"
                                     value={name}
                                     onChange={this.handleInputName}
                        />
                    </InputGroup>

                    <br/>

                    <h6>Пароль:</h6>

                    <InputGroup size="sm">
                        <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm"
                                     type="password" placeholder="Пароль"
                                     value={password}
                                     onChange={this.handleInputPassword}/>
                    </InputGroup>

                    {error ?
                        (
                            <Alert variant='danger' dismissible style={{marginTop: "10px"}}
                                   onClose={this.handleResetError}>
                                {error}
                            </Alert>
                        ) : null
                    }


                </Modal.Body>
                <Modal.Footer>
                    <div>
                        <Button variant="primary" type="submit"
                                disabled={appState.apiRequestPerforming}
                                className="float-right"
                                onClick={this.handleClick}
                        >
                            Вход

                            {appState.apiRequestPerforming ?
                                <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                /> : null}

                        </Button>

                    </div>


                </Modal.Footer>
            </Modal>
        );
    }
}

export const LoginModal = LoginModalObserver;