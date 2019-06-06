import {Product, recycleBin, selectedProductsState} from "../products-caregories";
import React from "react";
import {Container, Jumbotron,  Table, } from "react-bootstrap";
import {faMinus, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {observer,} from "mobx-react";
import {Link} from "react-router-dom";
import {btnProd,} from "./help";

function productRow(p: Product, hasLevel5: boolean, hasInRecycleBin: boolean) {

    let productInRecycleBin = recycleBin.hasProductID(p.id);

    let count = 0;
    if (hasInRecycleBin) {
        count = recycleBin.count(p.id);
    }


    const btn = btnProd(p.id);

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

            {hasInRecycleBin ?
                <td>
                    {count === 0 ? null : `${count} штук`}
                </td> : null
            }

            <td style={{padding: '0px', verticalAlign: 'center', textAlign: 'center'}}>

                {btn("добавить единицу товара",
                    "tooltip-add-product",
                    faPlus,
                    () => recycleBin.addProduct(p))}

                {productInRecycleBin ?
                    btn("удалить единицу товара",
                        "tooltip-reduce-product",
                        faMinus,
                        () => recycleBin.reduceProductCount(p.id))
                    : null
                }
                {productInRecycleBin ?
                    btn("удалить товар из корзины",
                        "tooltip-delete-product",
                        faTrash,
                        () => recycleBin.removeProductID(p.id))
                    : null
                }
            </td>
        </tr>
    );
}


@observer
class selectedProducts extends React.Component {

    render() {


        let products = selectedProductsState.products;

        if (products.length === 0) {
            return recycleBin.products.length === 0 ? <Welcome/> : null;
        }


        let hasInRecycleBin = false;
        for (let p of selectedProductsState.products) {
            if (recycleBin.hasProductID(p.id)) {
                hasInRecycleBin = true;
                break;
            }
        }


        let hasLevel5 = false;
        for (let p of products) {
            if (p.level5.length > 0) {
                hasLevel5 = true;
                break;
            }
        }

        return <Table bordered>
            <caption style={{display: 'table-caption', textAlign: 'left', captionSide: 'top'}}>
                <h1>Наши товары</h1>
            </caption>
            <tbody>
            {
                products.map((p) => productRow(p, hasLevel5, hasInRecycleBin))
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