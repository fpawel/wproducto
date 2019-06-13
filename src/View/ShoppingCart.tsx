import {shoppingCart, ShoppingCartProduct} from "../products-caregories";
import React from "react";
import {Container, Table} from "react-bootstrap";
import {faMinus, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {observer,} from "mobx-react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import {Redirect} from "react-router";
import "../App.css";


function productRow(p: ShoppingCartProduct) {


    return (
        <tr key={p.id}>
            <td style={{width:"40px"}}>
                <Button variant="primary" size="sm" onClick={() => shoppingCart.addProduct(p)}>
                    <FontAwesomeIcon icon={faPlus}/>
                </Button>
            </td>
            <td>
                {p.count}
            </td>
            <td style={{width:"40px"}}>
                <Button variant="primary" size="sm" onClick={() => shoppingCart.reduceProductCount(p.id)}>
                    <FontAwesomeIcon icon={faMinus}/>
                </Button>
            </td>
            <td style={{textAlign:'left', width:"100%"}}>
                {p.name}
            </td>

            <td style={{width:"40px"}}>
                <Button variant="primary" size="sm" onClick={() => shoppingCart.removeProductID(p.id)}
                        style={{marginLeft:'5px'}}>
                    <FontAwesomeIcon icon={faTrash}/>
                </Button>
            </td>

        </tr>
    );
}


@observer
class shoppingCartView extends React.Component {
    render() {
        if (shoppingCart.count === 0) {
            return <Redirect to="/"/>;
        }

        return <Container>
            <Table size="sm" className="view-product-table">
                <caption style={{display: 'table-caption', textAlign: 'left', captionSide: 'top'}}>
                    <h1>Ваша корзина</h1>
                </caption>
                <tbody>
                {
                    shoppingCart.products.map(productRow)
                }
                </tbody>
            </Table>
        </Container>;
    }
}

export const ShoppingCart = shoppingCartView;

