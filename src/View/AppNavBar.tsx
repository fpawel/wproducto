import {observer} from "mobx-react";
import React from "react";
import {Container, Modal, Nav, Navbar, NavDropdown } from "react-bootstrap";
import {appState} from "../AppState";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {withRouter} from "react-router";
import {LoginModal} from './LoginModal';

export const AppNavBar = withRouter(props => {
    const {location} = props;
    return (
        <Container>
            <LoginModal />
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand href="#/">Producto</Navbar.Brand>
                <Nav className="mr-auto" activeKey={'#' + location.pathname}>
                    {/*<Nav.Link href="#/login" activeclassname="active" eventKey="#/login" >Вход</Nav.Link>*/}
                    {/*<Nav.Link href="#/register" activeclassname="active" eventKey="#/register" >Регистрация</Nav.Link>*/}

                </Nav>
                <Nav activeKey={'#' + location.pathname}>
                    <UserMenu/>
                </Nav>
            </Navbar>
        </Container>
    );
});

const viewDropDownUserMenuItem = (name?:string) => <span>
        <FontAwesomeIcon icon={faUser} style={{marginRight: "5px"}}/>
        {name ? name : null}
    </span>;

const userMenu = (name: string) => {
    return <NavDropdown id="basic-nav-dropdown" title={viewDropDownUserMenuItem(name)} >
        <NavDropdown.Item href="#/profile">
            Личный кабинет
        </NavDropdown.Item>
        <NavDropdown.Item href="#/logout">
            Выход
        </NavDropdown.Item>
    </NavDropdown>
};


const guestMenu = <NavDropdown id="basic-nav-dropdown" title={ viewDropDownUserMenuItem()} >
    <NavDropdown.Item onClick = {() => appState.setModal('login')} >
        Вход
    </NavDropdown.Item>
    <NavDropdown.Item href="#/register">
        Регистрация
    </NavDropdown.Item>
</NavDropdown>;

@observer
class UserMenu extends React.Component {
    render() {
        if (appState.auth.type === 'user' )
            return userMenu(appState.auth.name);
        return guestMenu;
    }
}

