import {recycleBin, RecycleBinProduct} from "../products-caregories";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import {Table} from "react-bootstrap";
import {faMinus, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {observer,} from "mobx-react";

function productRow(p: RecycleBinProduct, hasLevel5: boolean) {
    return (
        <tr key={p.id}>
            <td style={{padding: '0px'}}>
                <Button variant="link" onClick={() => recycleBin.addProduct(p)}>
                    <FontAwesomeIcon icon={faPlus}/>
                </Button>
                <Button variant="link" onClick={() => recycleBin.reduceProductCount(p.id)}>
                    <FontAwesomeIcon icon={faMinus}/>
                </Button>
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
            <td>
                { `${p.count} штук` }
            </td>

            <td style={{padding: '0px'}}>
                <Button variant="link" onClick={() => recycleBin.removeProductID(p.id)}>
                    <FontAwesomeIcon icon={faTrash}/>
                </Button>
            </td>

        </tr>
    );
}


@observer
class recycleBinView extends React.Component {
    render() {
        if (recycleBin.products.length === 0) {
            return null;
        }
        let hasLevel5 = false;
        for (let i = 0; i < recycleBin.products.length; i++) {
            if (recycleBin.products[i].level5.length > 0) {
                hasLevel5 = true;
                break;
            }
        }
        return <div>
            <h2>Ваша корзина</h2>
            <Table striped bordered hover responsive>
                <tbody>
                {
                    recycleBin.products.map((p) => productRow(p, hasLevel5))
                }
                </tbody>
            </Table>
        </div>;
    }
}

export const RecycleBin = recycleBinView;

