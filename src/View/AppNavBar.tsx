import {observer} from "mobx-react";
import React from "react";
import {appState} from "../AppState";
import {shoppingCart} from "../products-caregories";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {withRouter} from "react-router";
import {Badge, Nav, Navbar, NavDropdown} from "react-bootstrap";

export const AppNavBar = withRouter(props => {
    const {location} = props;
    return <Navbar bg="primary" variant="dark" sticky="top" fixed="top" >
        <Navbar.Brand href="#/">Producto</Navbar.Brand>
        <Nav className="mr-auto" activeKey={'#' + location.pathname}>
            {/*<Nav.Link href="#/login" activeclassname="active" eventKey="#/login" >Вход</Nav.Link>*/}
            {/*<Nav.Link href="#/register" activeclassname="active" eventKey="#/register" >Регистрация</Nav.Link>*/}
        </Nav>
        <Nav activeKey={'#' + location.pathname} style={{marginRight:"10px"}}>
            <ShoppingCartNav />
            <UserMenu/>
        </Nav>
    </Navbar>;
});

const viewDropDownUserMenuItem = (name?:string) => <span>
        <FontAwesomeIcon icon={faUser} style={{marginRight: "5px"}}/>
        {name ? name : null}
    </span>;

const userMenu = (name: string) => {
    return <NavDropdown id="basic-nav-dropdown" alignRight title={viewDropDownUserMenuItem(name)}  >
        <NavDropdown.Item href="#/profile">
            Личный кабинет
        </NavDropdown.Item>
        <NavDropdown.Item href="#/logout">
            Выход
        </NavDropdown.Item>
    </NavDropdown>
};


const guestMenu = <NavDropdown id="dropdown-menu-align-right" alignRight title={ viewDropDownUserMenuItem()} >
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

@observer
class ShoppingCartNav extends React.Component {
    render() {
        if (shoppingCart.count === 0)
            return null;
        return <Nav className="mr-auto">
            <Nav.Link href="#shopping-cart">
                <FontAwesomeIcon icon={faShoppingCart} style={{marginRight: "5px"}}/>
                <Badge pill variant="secondary">{shoppingCart.count}</Badge>
            </Nav.Link>
        </Nav>;
    }
}