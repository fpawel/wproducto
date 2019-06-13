import {action, observable, computed} from 'mobx'
const shoppingCartProductsKey = "wproducto.shoppingCartProducts";

export interface Product {
    id: number;
    name: string;
}


export interface CatalogueNode {
    name: string;
    id: number;
    nodes: CatalogueNode[];
}

class Catalogue {

    @observable nodes : CatalogueNode [] = [];

    @action
    setNodes(nodes: CatalogueNode[]) {
        this.nodes = nodes;
    }
}

class SelectedProductsState {
    @observable products: Product[] = [];

    @observable catalogue: CatalogueNode[] = [];

    @action
    setSelectedProducts(products: Product[]) {
        this.products = products;
    }
}

export type ShoppingCartProduct = Product & {count:number};

class ShoppingCart {
    @observable products: ShoppingCartProduct[] = restoreShoppingCartProducts();

    hasProductID(productID: number){
        for (let p of this.products) {
            if(p.id === productID){
                return true;
            }
        }
        return false;
    }
    @computed get count(){
        let result = 0;
        for (let p of this.products) {
            result += p.count;
        }
        return result;
    }

    productCount(productID: number){
        for (let p of this.products) {
            if(p.id === productID){
                return p.count;
            }
        }
        return 0;
    }

    @action
    removeProductID(productID: number) {
        this.products = this.products.filter((p) => {
            return p.id !== productID;
        });
        this.store();
    }

    @action
    reduceProductCount(productID: number) {
        for (let p of this.products) {
            if(p.id === productID){
                if (p.count > 1) {
                    p.count -= 1;
                } else {
                    this.products = this.products.filter((p) => {
                        return p.id !== productID;
                    });
                }
            }
        }
        this.store();
    }

    @action
    addProduct(product: Product) {
        for (let p of this.products) {
            if(p.id === product.id){
                p.count += 1;
                this.store();
                return;
            }
        }
        this.products.push({ count:1, ...product});
        this.store();
    }

    store() {
        localStorage.setItem(shoppingCartProductsKey, JSON.stringify(this.products));
    }
}


function restoreShoppingCartProducts() {
    let s = localStorage.getItem(shoppingCartProductsKey);
    if (s) {
        return < ShoppingCartProduct[] >JSON.parse(s);
    }
    return [];
}

export const shoppingCart = new ShoppingCart();

export const selectedProductsState = new SelectedProductsState();

export const catalogue = new Catalogue();