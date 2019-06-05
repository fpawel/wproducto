import {Product, recycleBin, selectedProductsState} from "../products-caregories";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import {Container, Jumbotron, Table} from "react-bootstrap";
import {faMinus, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {observer,} from "mobx-react";
import {Link} from "react-router-dom";

function productRow(p: Product, hasLevel5: boolean, hasInRecycleBin:boolean) {

    let productInRecycleBin = recycleBin.hasProductID(p.id);


    return (
        <tr key={p.id}>
            <td style={{padding: '0px'}}>
                <Button variant="link" onClick={() => recycleBin.addProduct(p)}>
                    <FontAwesomeIcon icon={faPlus}/>
                </Button>
            </td>

            <td style={{padding: '0px'}}>
                <Button variant="link" onClick={() => recycleBin.addProduct(p)}>
                    <FontAwesomeIcon icon={faPlus}/>
                </Button>

                {productInRecycleBin ?
                    <Button variant="link" onClick={() => recycleBin.reduceProductCount(p.id)}>
                        <FontAwesomeIcon icon={faMinus}/>
                    </Button> : null
                }


            </td>


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

            { hasInRecycleBin ?
                <td>
                    {productInRecycleBin ?
                        <Button variant="link" onClick={() => recycleBin.removeProductID(p.id)}>
                            <FontAwesomeIcon icon={faTrash}/>
                        </Button> : null
                    }
                </td> : null
            }


        </tr>
    );
}


@observer
class selectedProducts extends React.Component {

    render() {

        if (selectedProductsState.products.length === 0) {
            return <Welcome/>;
        }

        let hasLevel5 = false;

        for (let p of selectedProductsState.products) {
            if (p.level5.length > 0) {
                hasLevel5 = true;
                break;
            }
        }

        let hasInRecycleBin = false;

        for (let p of selectedProductsState.products) {
            if (recycleBin.hasProductID(p.id)) {
                hasInRecycleBin = true;
                break;
            }
        }


        return <div>
            <h2>Наши товары</h2>
            <Table striped bordered hover responsive>
                <tbody>
                {
                    selectedProductsState.products.map((p) => productRow(p, hasLevel5, hasInRecycleBin))
                }
                </tbody>
            </Table>
        </div>;
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