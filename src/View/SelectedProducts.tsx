import {Product, shoppingCart, selectedProductsState} from "../products-caregories";
import React from "react";
import {Container, Jumbotron,  Table, } from "react-bootstrap";
import {faMinus, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {observer,} from "mobx-react";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "../App.css";

function productRow(p: Product) {


    let shoppingCartCount = shoppingCart.productCount(p.id);

    return (
        <tr key={p.id}>
            <td style={{width:"40px"}}>
                <Button variant="primary" size="sm" onClick={() => shoppingCart.addProduct(p)}>
                    <FontAwesomeIcon icon={faPlus}/>
                </Button>
            </td>
            <td style={{width:"20px"}}>

                <span style={{ visibility: shoppingCartCount === 0 ? 'hidden' : undefined}}>
                    {shoppingCartCount}
                </span>
            </td>
            <td style={{width:"40px"}}>

                <Button variant="primary" size="sm" onClick={() => shoppingCart.reduceProductCount(p.id)}
                        style={{visibility: shoppingCartCount === 0 ? 'hidden' : undefined}}>
                    <FontAwesomeIcon icon={faMinus}/>
                </Button>
            </td>
            <td style={{textAlign:'left', width:"100%"}}>
                {p.name}
            </td>

            <td style={{width:"40px"}}>
                <Button variant="primary" size="sm" onClick={() => shoppingCart.removeProductID(p.id)}
                        style={{marginLeft:'5px', visibility: shoppingCartCount === 0 ? 'hidden' : undefined}}>
                    <FontAwesomeIcon icon={faTrash}/>
                </Button>
            </td>
        </tr>
    );
}


@observer
class selectedProducts extends React.Component {

    render() {


        let products = selectedProductsState.products;

        if (products.length === 0) {
            return <Welcome/>;
        }

        return <Table size="sm" className="view-product-table">
            <caption style={{display: 'table-caption', textAlign: 'left', captionSide: 'top'}}>
                <h1>Наши товары</h1>
            </caption>
            <tbody>
            {
                products.map(productRow)
            }
            </tbody>
        </Table>;
    }
}

export const SelectedProducts = selectedProducts;

function Welcome() {
    return (
        <Container>
            <Jumbotron>
                <h2>Здравствуйте</h2>
                <p>Добро пожаловать на наш сайт.</p>
                <p>
                    Пожалуйста, <Link to="/register">зарегистрируйтесь</Link>, чтобы регулярно получать скидки и бонусы
                    на депозит, а так же принять участие в наших розыгрышах.
                </p>
                <p>
                    Зарегестрированы? Проверьте свой <Link to="/profile">личный кабинет</Link>.
                </p>
            </Jumbotron>
        </Container>
    );
}