import {shoppingCart, ShoppingCartProduct} from "../products-caregories";
import React from "react";
import {Container, Table} from "react-bootstrap";
import {faMinus, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {observer,} from "mobx-react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import {Redirect} from "react-router";


function productRow(p: ShoppingCartProduct, hasLevel5: boolean) {


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

                <span style={{width: '30px'}}>
                    {p.count}
                </span>


                <Button variant="primary" size="sm" onClick={() => shoppingCart.reduceProductCount(p.id)}>
                    <FontAwesomeIcon icon={faMinus}/>
                </Button>

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
        let hasLevel5 = false;
        for (let i = 0; i < shoppingCart.products.length; i++) {
            if (shoppingCart.products[i].level5.length > 0) {
                hasLevel5 = true;
                break;
            }
        }
        return <Container>
            <Table size="sm">
                <caption style={{display: 'table-caption', textAlign: 'left', captionSide: 'top'}}>
                    <h1>Ваша корзина</h1>
                </caption>
                <tbody>
                {
                    shoppingCart.products.map((p) => productRow(p, hasLevel5))
                }
                </tbody>
            </Table>
        </Container>;
    }
}

export const ShoppingCart = shoppingCartView;

