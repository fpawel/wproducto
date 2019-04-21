import React from "react";
import {observer} from "mobx-react";
import {
    Modal,
    Button,
    Spinner,
    Container,
    Jumbotron,
    Form,
    Popover,
    OverlayTrigger,
    Alert,
    InputGroup,
    FormControl, Overlay
} from "react-bootstrap";
import {appState} from "../AppState";
import {Redirect} from "react-router";
import {Link} from "react-router-dom";
import './LoginModal.css'



interface State {
    name: string;
    pass: string;
    error?: string,
}

@observer
class LoginModalObserver extends React.Component<{}, State> {

    constructor(props: {}) {
        super(props);
        this.state = {
            name: "",
            pass: "",
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleInputName = this.handleInputName.bind(this);
        this.handleInputPassword = this.handleInputPassword.bind(this);
        this.handleResetError = this.handleResetError.bind(this);
    }

    handleInputName(evt: any) {
        this.setState({ name: evt.target.value });
    }

    handleInputPassword(evt: any) {
        this.setState({ pass: evt.target.value });
    }

    handleResetError() {
        this.setState({ error: undefined });
    }



    async handleClick() {

        this.setState({ error:undefined });
        try {
            const response = await appState.login(this.state);
            if (response.type === "error") {
                this.setState({
                    error: response.error.message,
                });
            } else {
                appState.setModal(null);
            }
        } catch (e) {
            this.setState({
                error: 'Нет связи',
            });

        }
    }

    render(){
        let {error, name, pass,} = this.state;

        return (
            <Modal dialogClassName='width-400px' aria-labelledby="contained-modal-title-vcenter"
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

                    <br />

                    <h6>Пароль:</h6>

                    <InputGroup size="sm">
                        <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm"
                                     type="password" placeholder="Пароль"
                                     value={pass}
                                     onChange={this.handleInputPassword} />
                    </InputGroup>

                    { error ?
                        (
                            <Alert variant='danger' dismissible style={{ marginTop: "10px" }} onClose={this.handleResetError}>
                                {error}
                            </Alert>
                        ) : null
                    }



                </Modal.Body>
                <Modal.Footer>
                    <div>
                        <Button variant="primary" type="submit"
                                disabled={appState.rpcRequest === 'Auth.Login'}
                                className="float-right"
                                onClick={this.handleClick}
                        >
                            Вход

                        </Button>

                    </div>


                </Modal.Footer>
            </Modal>
        );
    }
}

export const LoginModal = LoginModalObserver;