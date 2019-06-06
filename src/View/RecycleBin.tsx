import {recycleBin, RecycleBinProduct} from "../products-caregories";
import React from "react";
import {Table} from "react-bootstrap";
import {faMinus, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {observer,} from "mobx-react";
import {btnProd,} from "./help";

function productRow(p: RecycleBinProduct, hasLevel5: boolean) {

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
            <td>
                {`${p.count} штук`}
            </td>

            <td style={{padding: '0px', verticalAlign: 'center', textAlign: 'center'}}>
                {btn("добавить единицу товара",
                    "tooltip-add-recycle-bin-product",
                    faPlus,
                    () => recycleBin.addProduct(p))}

                {btn("удалить единицу товара",
                    "tooltip-reduce-recycle-bin-product",
                    faMinus,
                    () => recycleBin.reduceProductCount(p.id))}

                {btn("удалить товар из корзины",
                    "tooltip-delete-recycle-bin-product",
                    faTrash,
                    () => recycleBin.removeProductID(p.id))}

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
        return <Table bordered>
            <caption style={{display: 'table-caption', textAlign: 'left', captionSide: 'top'}}>
                <h1>Ваша корзина</h1>
            </caption>
            <tbody>
            {
                recycleBin.products.map((p) => productRow(p, hasLevel5))
            }
            </tbody>
        </Table>;
    }
}

export const RecycleBin = recycleBinView;

