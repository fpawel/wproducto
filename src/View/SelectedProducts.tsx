import {Product, shoppingCart, selectedProductsState} from "../products-caregories";
import React from "react";
import {Container, Jumbotron,  Table, } from "react-bootstrap";
import {faMinus, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {observer,} from "mobx-react";
import {Link} from "react-router-dom";
import {btnProd,} from "./help";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function productRow(p: Product, hasLevel5: boolean) {


    let shoppingCartCount = shoppingCart.productCount(p.id);

    return (
        <tr key={p.id}>
            <td>
                {p.level4}
            </td>
            {hasLevel5 ? <td> {p.level5} </td> : null}
            <td>
                {p.level6}
            </td>
            <td>
                {p.level7}
            </td>
            <td>
                {p.name}
            </td>

            <td style={{display: "flex", verticalAlign:"center", textAlign:"center"}}>

                <Button variant="primary" size="sm" onClick={() => shoppingCart.addProduct(p)}>
                    <FontAwesomeIcon icon={faPlus}/>
                </Button>

                <span style={{width: '30px', visibility: shoppingCartCount === 0 ? 'hidden' : undefined}}>
                        {shoppingCartCount}
                    </span>


                <Button variant="primary" size="sm" onClick={() => shoppingCart.reduceProductCount(p.id)}
                        style={{visibility: shoppingCartCount === 0 ? 'hidden' : undefined}}>
                    <FontAwesomeIcon icon={faMinus}/>
                </Button>

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

        let hasLevel5 = false;
        for (let p of products) {
            if (p.level5.length > 0) {
                hasLevel5 = true;
                break;
            }
        }

        return <Table size="sm">
            <caption style={{display: 'table-caption', textAlign: 'left', captionSide: 'top'}}>
                <h1>Наши товары</h1>
            </caption>
            <tbody>
            {
                products.map((p) => productRow(p, hasLevel5))
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