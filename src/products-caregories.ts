import {action, observable,} from 'mobx'
import './AppKey.ts'

const recycleBinProductsKey = "wproducto.recycleBinProducts";

class SelectedProductsState {
    @observable products: Product[] = restoreRecycleBinProducts();

    @action
    setSelectedProducts(anyNode: any) {
        let node = <Node>anyNode;
        if (node && node.type === "products") {
            this.products = node.products;
            return;
        }
        this.products = [];
    }
}

export type RecycleBinProduct = Product & {count:number};

class RecycleBin {
    @observable products: RecycleBinProduct[] = restoreRecycleBinProducts();

    hasProductID(productID: number){
        for (let p of this.products) {
            if(p.id === productID){
                return true;
            }
        }
        return false;
    }

    count(productID: number){
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
        localStorage.setItem(recycleBinProductsKey, JSON.stringify(this.products));
    }
}


function restoreRecycleBinProducts() {
    let s = localStorage.getItem(recycleBinProductsKey);
    if (s) {
        return <RecycleBinProduct[]>JSON.parse(s);
    }
    return [];
}

export const recycleBin = new RecycleBin();

export const selectedProductsState = new SelectedProductsState();

export interface Product {
    id: number;
    name: string;
    level4: string;
    level5: string;
    level6: string;
    level7: string;
    type: "product";
}

interface ProductsNode {
    name: string;
    id: number;
    level: number;
    type: "products";
    products: Product [];
}

interface CategoriesNode {
    name: string;
    id: number;
    level: number;
    type: "nodes";
    nodes: Node[];
}

type Node = CategoriesNode | ProductsNode | Product;

export const productsCategoriesTree: Node[] =
    [
        {
            "id": 1,
            "name": "Детское Питание и Напитки",
            "level": 0,
            type: "nodes",
            "nodes": [
                {
                    "id": 2,
                    "name": "Детские Соки и Напитки",
                    "level": 1,
                    type: "nodes",
                    "nodes": [
                        {
                            "id": 3,
                            "name": "Детские Соки",
                            "level": 2,
                            type: "products",
                            "products": [
                                {
                                    "id": 4,
                                    type: "product", "name": "ДП Сок дет Агуша мультифр 200мл МЮ 3Х 6Х",
                                    "level4": "АГУША",
                                    "level5": "МУЛЬТИФРУКТ",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 5,
                                    type: "product", "name": "ДП Сок дет Агуша яб-виш 200мл ТВАВ 3Х 6Х МЮ",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО И ВИШНЯ",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 6,
                                    type: "product", "name": "ДП Сок дет Агуша яб-виш 200мл х3 х9 ТВАВ МЮ",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО И ВИШНЯ",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 7,
                                    type: "product", "name": "ДП Сок дет Агуша Ябл-банан 200мл ТВА 3Х 6Х МЮ",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-БАНАН",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 8,
                                    type: "product", "name": "ДП Сок дет Агуша Ябл-шиповн 200мл ТBA 3Х 6Х МЮ",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-ШИПОВНИК",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 9,
                                    type: "product", "name": "ДП Сок дет с мяк Агуша мультифр 0% 1х27х200мл TBA",
                                    "level4": "АГУША",
                                    "level5": "МУЛЬТИФРУКТ",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 10,
                                    type: "product", "name": "ДП Сок дет с мяк Агуша ябл-груша 200мл х27 ТВАВ",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-ГРУША",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 11,
                                    type: "product", "name": "ДП Сок дет с мяк Агуша Яблоко 200мл ТВА 3Х 6Х МЮ",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 12,
                                    type: "product", "name": "ДП Сок дет. с мяк.Агуша Ябл-банан 1х15х500мл CBC",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-БАНАН",
                                    "level6": "КОМБИБЛОК КОМПАКТ",
                                    "level7": "500 мл"
                                },
                                {
                                    "id": 13,
                                    type: "product", "name": "ДП Сок детский осв Агуша Груша 150мл бут.ст 12Х",
                                    "level4": "АГУША",
                                    "level5": "ГРУША",
                                    "level6": "СТЕКЛЯННАЯ БУТЫЛКА",
                                    "level7": "150 мл"
                                },
                                {
                                    "id": 14,
                                    type: "product", "name": "ДП Сок осветл Агуша Груша 200мл TBAВ 3Х 6Х МЮ",
                                    "level4": "АГУША",
                                    "level5": "ГРУША",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 15,
                                    type: "product", "name": "ДП Сок с мяк Агуша ябл-пер 200мл TBA 3Х 6Х МЮ",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-ПЕРСИК",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 16,
                                    type: "product", "name": "Сок Агуша Груша Осв 150мл х12 СБт ДП",
                                    "level4": "АГУША",
                                    "level5": "ГРУША",
                                    "level6": "СТЕКЛЯННАЯ БУТЫЛКА",
                                    "level7": "150 мл"
                                },
                                {
                                    "id": 17,
                                    type: "product", "name": "Сок Агуша Груша Осв 150мл х12 СБт ДП",
                                    "level4": "АГУША",
                                    "level5": "ГРУША",
                                    "level6": "СТЕКЛЯННАЯ БУТЫЛКА",
                                    "level7": "150 мл"
                                },
                                {
                                    "id": 18,
                                    type: "product", "name": "Сок Агуша Груша Осв 200мл х27 БЗ ДП",
                                    "level4": "АГУША",
                                    "level5": "ГРУША",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 19,
                                    type: "product", "name": "Сок Агуша Груша Осв 200мл х27 БЗ ДП СГР",
                                    "level4": "АГУША",
                                    "level5": "ГРУША",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 20,
                                    type: "product", "name": "Сок Агуша Груша Осв 200мл х3 х9 МП БЗ ДП",
                                    "level4": "АГУША",
                                    "level5": "ГРУША",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 21,
                                    type: "product", "name": "Сок Агуша Груша Осв 200мл х3 х9 МП БЗ ДП",
                                    "level4": "АГУША",
                                    "level5": "ГРУША",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 22,
                                    type: "product", "name": "Сок Агуша Груша Осв 500г х15 КБК ДП",
                                    "level4": "АГУША",
                                    "level5": "ГРУША",
                                    "level6": "КОМБИБЛОК КОМПАКТ",
                                    "level7": "500 мл"
                                },
                                {
                                    "id": 23,
                                    type: "product", "name": "Сок Агуша Груша Осв 500мл х15 КБК ДП",
                                    "level4": "АГУША",
                                    "level5": "ГРУША",
                                    "level6": "КОМБИБЛОК КОМПАКТ",
                                    "level7": "500 мл"
                                },
                                {
                                    "id": 24,
                                    type: "product", "name": "Сок Агуша Груша Осв 500мл х3 х5 КБК МП ДП",
                                    "level4": "АГУША",
                                    "level5": "ГРУША",
                                    "level6": "КОМБИБЛОК КОМПАКТ",
                                    "level7": "500 мл"
                                },
                                {
                                    "id": 25,
                                    type: "product", "name": "Сок Агуша МультФр Мяк 200мл х 3 х 9 МП БЗ ДП",
                                    "level4": "АГУША",
                                    "level5": "МУЛЬТИФРУКТ",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 26,
                                    type: "product", "name": "Сок Агуша МультФр Мяк 200мл х27 БЗ ДП СГР",
                                    "level4": "АГУША",
                                    "level5": "МУЛЬТИФРУКТ",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 27,
                                    type: "product", "name": "Сок Агуша МультФр Мяк 500мл х3 х5 КБК МП ДП",
                                    "level4": "АГУША",
                                    "level5": "МУЛЬТИФРУКТ",
                                    "level6": "КОМБИБЛОК КОМПАКТ",
                                    "level7": "500 мл"
                                },
                                {
                                    "id": 28,
                                    type: "product", "name": "Сок Агуша Ябл Банан Мяк 200мл х27 БЗ ДП",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-БАНАН",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 29,
                                    type: "product", "name": "Сок Агуша Ябл Банан Мяк 200мл х27 БЗ ДП",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-БАНАН",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 30,
                                    type: "product", "name": "Сок Агуша Ябл Банан Мяк 200мл х27 БЗ ДП",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-БАНАН",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 31,
                                    type: "product", "name": "Сок Агуша Ябл Банан Мяк 200мл х27 БЗ ДП Промо",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-БАНАН",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 32,
                                    type: "product", "name": "Сок Агуша Ябл Банан Мяк 200мл х27 БЗ ДП СГР",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-БАНАН",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 33,
                                    type: "product", "name": "Сок Агуша Ябл Банан Мяк 200мл х3 х9 МП БЗ ДП",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-БАНАН",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 34,
                                    type: "product", "name": "Сок Агуша Ябл Банан Мяк 500мл х15 КБК ДП",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-БАНАН",
                                    "level6": "КОМБИБЛОК КОМПАКТ",
                                    "level7": "500 мл"
                                },
                                {
                                    "id": 35,
                                    type: "product", "name": "Сок Агуша Ябл Банан Мяк 500мл х3 х5 КБК МП ДП",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-БАНАН",
                                    "level6": "КОМБИБЛОК КОМПАКТ",
                                    "level7": "500 мл"
                                },
                                {
                                    "id": 36,
                                    type: "product", "name": "Сок Агуша Ябл Виноград Осв 200мл х27 БЗ ДП",
                                    "level4": "АГУША",
                                    "level5": "ВИНОГРАД И ЯБЛОКО",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 37,
                                    type: "product", "name": "Сок Агуша Ябл Виноград Осв 200мл х27 БЗ ДП",
                                    "level4": "АГУША",
                                    "level5": "ВИНОГРАД И ЯБЛОКО",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 38,
                                    type: "product", "name": "Сок Агуша Ябл Виноград Осв 200мл х27 БЗ ДП Промо",
                                    "level4": "АГУША",
                                    "level5": "ВИНОГРАД И ЯБЛОКО",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 39,
                                    type: "product", "name": "Сок Агуша Ябл Виноград Осв 200мл х27 БЗ ДП СГР",
                                    "level4": "АГУША",
                                    "level5": "ВИНОГРАД И ЯБЛОКО",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 40,
                                    type: "product", "name": "Сок Агуша Ябл Вишня Осв 200мл х27 БЗ ДП",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО И ВИШНЯ",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 41,
                                    type: "product", "name": "Сок Агуша Ябл Вишня Осв 200мл х27 БЗ ДП Промо",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО И ВИШНЯ",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 42,
                                    type: "product", "name": "Сок Агуша Ябл Вишня Осв 200мл х27 БЗ ДП СГР",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО И ВИШНЯ",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 43,
                                    type: "product", "name": "Сок Агуша Ябл Груша Осв 200мл х27 БЗ ДП СГР",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-ГРУША",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 44,
                                    type: "product", "name": "Сок Агуша Ябл Персик Мяк 200мл х 3 х 9 МП БЗ ДП",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-ПЕРСИК",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 45,
                                    type: "product", "name": "Сок Агуша Ябл Персик Мяк 200мл х 3 х 9 МП БЗ ДП",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-ПЕРСИК",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 46,
                                    type: "product", "name": "Сок Агуша Ябл Персик Мяк 200мл х27 БЗ ДП Промо",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-ПЕРСИК",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 47,
                                    type: "product", "name": "Сок Агуша Ябл Персик Мяк 200мл х27 БЗ ДП СГР",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-ПЕРСИК",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 48,
                                    type: "product", "name": "Сок Агуша Ябл Персик Мяк 500мл х15 КБК ДП",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-ПЕРСИК",
                                    "level6": "КОМБИБЛОК КОМПАКТ",
                                    "level7": "500 мл"
                                },
                                {
                                    "id": 49,
                                    type: "product", "name": "Сок Агуша Ябл Персик Мяк 500мл х15 КБК ДП Промо",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-ПЕРСИК",
                                    "level6": "КОМБИБЛОК КОМПАКТ",
                                    "level7": "500 мл"
                                },
                                {
                                    "id": 50,
                                    type: "product", "name": "Сок Агуша Ябл Шиповник 150мл х12 СБт ДП",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-ШИПОВНИК",
                                    "level6": "СТЕКЛЯННАЯ БУТЫЛКА",
                                    "level7": "150 мл"
                                },
                                {
                                    "id": 51,
                                    type: "product", "name": "Сок Агуша Ябл Шиповник 200мл х27 БЗ ДП Промо",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-ШИПОВНИК",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 52,
                                    type: "product", "name": "Сок Агуша Ябл Шиповник 200мл х27 БЗ ДП СГР",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-ШИПОВНИК",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 53,
                                    type: "product", "name": "Сок Агуша Ябл Шиповник 200мл х27 БЗ ДП СГР",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-ШИПОВНИК",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 54,
                                    type: "product", "name": "Сок Агуша Ябл Шиповник 200мл х3 х9 МП БЗ ДП",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-ШИПОВНИК",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 55,
                                    type: "product", "name": "Сок Агуша Яблоко Мяк 200мл х27 БЗ ДП",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 56,
                                    type: "product", "name": "Сок Агуша Яблоко Мяк 200мл х27 БЗ ДП",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 57,
                                    type: "product", "name": "Сок Агуша Яблоко Мяк 200мл х27 БЗ ДП",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 58,
                                    type: "product", "name": "Сок Агуша Яблоко Мяк 200мл х27 БЗ ДП СГР",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 59,
                                    type: "product", "name": "Сок Агуша Яблоко Мяк 200мл х3 х9 МП БЗ ДП",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 60,
                                    type: "product", "name": "Сок Агуша Яблоко Мяк 200мл х3 х9 МП БЗ ДП",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 61,
                                    type: "product", "name": "Сок Агуша Яблоко Осв 150мл х12 СБт ДП",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО",
                                    "level6": "СТЕКЛЯННАЯ БУТЫЛКА",
                                    "level7": "150 мл"
                                },
                                {
                                    "id": 62,
                                    type: "product", "name": "Сок Агуша Яблоко Осв 200мл х 3 х 9 МП БЗ ДП",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 63,
                                    type: "product", "name": "Сок Агуша Яблоко Осв 200мл х27 БЗ ДП",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 64,
                                    type: "product", "name": "Сок Агуша Яблоко Осв 200мл х27 БЗ ДП",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 65,
                                    type: "product", "name": "Сок Агуша Яблоко Осв 200мл х27 БЗ ДП",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 66,
                                    type: "product", "name": "Сок Агуша Яблоко Осв 200мл х27 БЗ ДП Промо",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 67,
                                    type: "product", "name": "Сок Агуша Яблоко Осв 500мл х15 КБК ДП Промо",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО",
                                    "level6": "КОМБИБЛОК КОМПАКТ",
                                    "level7": "500 мл"
                                },
                                {
                                    "id": 68,
                                    type: "product", "name": "Сок Агуша Яблоко Осв 500мл х3 х5 КБК МП ДП",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО",
                                    "level6": "КОМБИБЛОК КОМПАКТ",
                                    "level7": "500 мл"
                                },
                                {
                                    "id": 69,
                                    type: "product", "name": "Сок дет осв Агуша Яблоко 200мл ТВАВ 3Х 6Х МЮ",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 70,
                                    type: "product", "name": "Сок дет осветл Агуша яб 0% 1х12х150мл Бут ст",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО",
                                    "level6": "СТЕКЛЯННАЯ БУТЫЛКА",
                                    "level7": "150 мл"
                                },
                                {
                                    "id": 71,
                                    type: "product", "name": "Сок детс освет Агуша Груша 200мл 3Х 6Х TBAВ МЮ",
                                    "level4": "АГУША",
                                    "level5": "ГРУША",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 72,
                                    type: "product", "name": "Сок детс с мяк Агуша Яблоко-Абрикос 200мл х27 ТВАВ",
                                    "level4": "АГУША",
                                    "level5": "АБРИКОС-ЯБЛОКО",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 73,
                                    type: "product", "name": "ДП Сок Агуша Груша Осв 200мл TBAB 18Х",
                                    "level4": "АГУША",
                                    "level5": "ГРУША",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 74,
                                    type: "product", "name": "ДП Сок Агуша Ябл Груша Осв 200мл ТВАВ 18Х",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-ГРУША",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 75,
                                    type: "product", "name": "ДП Сок дет мяк Агуша ябл-груша 200мл ТВАВ 18Х",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-ГРУША",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 76,
                                    type: "product", "name": "ДП Сок дет осв Агуша ябл-виногр 200мл ТВАВ 18Х",
                                    "level4": "АГУША",
                                    "level5": "ВИНОГРАД И ЯБЛОКО",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 77,
                                    type: "product", "name": "ДП Сок дет с мяк Агуша ябл-банан 200мл ТВА 18Х",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-БАНАН",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 78,
                                    type: "product", "name": "ДП Сок детск освет Агуша Груша 500мл CbC 15Х",
                                    "level4": "АГУША",
                                    "level5": "ГРУША",
                                    "level6": "КОМБИБЛОК КОМПАКТ",
                                    "level7": "500 мл"
                                },
                                {
                                    "id": 79,
                                    type: "product", "name": "ДП Сок детск с мяк Агуша Яблоко 200мл ТВА 18Х",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 80,
                                    type: "product", "name": "ДП Сок осветл Агуша Яблоко 200мл TBAB 18Х",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 81,
                                    type: "product", "name": "ДП Сок с мяк Агуша Мультифрукт 200мл ТВАВ 18Х",
                                    "level4": "АГУША",
                                    "level5": "МУЛЬТИФРУКТ",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 82,
                                    type: "product", "name": "ДП Сок с мяк Агуша ябл-персик 200мл ТВАВ 18Х",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-ПЕРСИК",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 83,
                                    type: "product", "name": "Сок Агуша Груша Осв 200мл х27 БЗ ДП",
                                    "level4": "АГУША",
                                    "level5": "ГРУША",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 84,
                                    type: "product", "name": "Сок Агуша МультФр Мяк 500мл х15 КБК ДП",
                                    "level4": "АГУША",
                                    "level5": "МУЛЬТИФРУКТ",
                                    "level6": "КОМБИБЛОК КОМПАКТ",
                                    "level7": "500 мл"
                                },
                                {
                                    "id": 85,
                                    type: "product", "name": "Сок Агуша Ябл Банан Мяк 500мл х15 КБК ДП",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-БАНАН",
                                    "level6": "КОМБИБЛОК КОМПАКТ",
                                    "level7": "500 мл"
                                },
                                {
                                    "id": 86,
                                    type: "product", "name": "Сок Агуша Ябл Вишня Осв 200мл х27 БЗ ДП",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО И ВИШНЯ",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 87,
                                    type: "product", "name": "Сок Агуша Ябл Груша Осв 200мл х27 БЗ ДП",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-ГРУША",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 88,
                                    type: "product", "name": "Сок Агуша Ябл Персик Мяк 0.2л х27 БЗ ДП",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-ПЕРСИК",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 89,
                                    type: "product", "name": "Сок Агуша Ябл Персик Мяк 500мл х15 КБК ДП",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-ПЕРСИК",
                                    "level6": "КОМБИБЛОК КОМПАКТ",
                                    "level7": "500 мл"
                                },
                                {
                                    "id": 90,
                                    type: "product", "name": "Сок Агуша Ябл Шиповник 200мл х27 БЗ ДП",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-ШИПОВНИК",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 91,
                                    type: "product", "name": "Сок Агуша Яблоко Осв 500мл х15 КБК ДП",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО",
                                    "level6": "КОМБИБЛОК КОМПАКТ",
                                    "level7": "500 мл"
                                },
                                {
                                    "id": 92,
                                    type: "product", "name": "Сок дет Агуша яблоко-вишня 200мл ТВАВ 18Х",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО И ВИШНЯ",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 93,
                                    type: "product", "name": "Сок дет Агуша яблоко-шиповник 200мл ТВАВ 18Х",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-ШИПОВНИК",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 94,
                                    type: "product", "name": "Сок детс освет Агуша Груша 200мл ТВАВ 18Х",
                                    "level4": "АГУША",
                                    "level5": "ГРУША",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 95,
                                    type: "product", "name": "Сок детс с мяк Агуша Яблоко-Абрикос 200мл ТВАВ 18Х",
                                    "level4": "АГУША",
                                    "level5": "АБРИКОС-ЯБЛОКО",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 96,
                                    type: "product", "name": "Сок с мяк Агуша Ябл-груш для кормящ 500мл СЛ 24Х",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО И ГРУША С МЯКОТЬЮ",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "0,5 Л"
                                },
                                {
                                    "id": 97,
                                    type: "product", "name": "Сок с мяк Агуша Ябл-груш для кормящ 500мл х15 CbC",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-ГРУША",
                                    "level6": "КОМБИБЛОК КОМПАКТ",
                                    "level7": "500 мл"
                                },
                                {
                                    "id": 98,
                                    type: "product", "name": "Сок с мяк Агуша Яблоко для кормящ 500мл Sl 24Х",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО С МЯКОТЬЮ",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "0,5 Л"
                                },
                                {
                                    "id": 99,
                                    type: "product", "name": "Сок с мякот Агуша Яблоко для берем 500мл х15 CbC",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО",
                                    "level6": "КОМБИБЛОК КОМПАКТ",
                                    "level7": "500 мл"
                                },
                                {
                                    "id": 100,
                                    type: "product", "name": "Сок с мякот Агуша Яблоко для кормящ 500мл х15 CbC",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО",
                                    "level6": "КОМБИБЛОК КОМПАКТ",
                                    "level7": "500 мл"
                                },
                                {
                                    "id": 101,
                                    type: "product", "name": "Сок с мякотью Агуша Яблоко для берем 500мл Sl 24Х",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО С МЯКОТЬЮ",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "0,5 Л"
                                }
                            ]
                        },
                        {
                            "id": 102,
                            "name": "Компоты И Морсы",
                            "level": 2,
                            type: "products",
                            "products": [
                                {
                                    "id": 103,
                                    type: "product", "name": "Компот Агуша Я САМ! клуб-яб-ч.ряб 1х15х500мл CbC",
                                    "level4": "АГУША Я САМ",
                                    "level5": "ЯБЛОКО-КЛУБНИКА-РЯБИНА ЧЕРНОПЛОДНАЯ",
                                    "level6": "КОМБИБЛОК КОМПАКТ",
                                    "level7": "500 МЛ"
                                },
                                {
                                    "id": 104,
                                    type: "product", "name": "Морс Агуша Я САМ! яг сбор 0% 1х15х200мл CbC",
                                    "level4": "АГУША Я САМ",
                                    "level5": "ЯГОДЫ ЛЕСНЫЕ",
                                    "level6": "КОМБИБЛОК КОМПАКТ",
                                    "level7": "200 МЛ"
                                },
                                {
                                    "id": 105,
                                    type: "product", "name": "Морс Агуша Я САМ! Ягодный сбор 1х15х500мл CombiBC",
                                    "level4": "АГУША Я САМ",
                                    "level5": "ЯГОДЫ ЛЕСНЫЕ",
                                    "level6": "КОМБИБЛОК КОМПАКТ",
                                    "level7": "500 МЛ"
                                },
                                {
                                    "id": 106,
                                    type: "product", "name": "Морс Агуша Ягодный Сбор 200мл х3 х5 КБК МП ДП",
                                    "level4": "АГУША",
                                    "level5": "ЯГОДЫ ЛЕСНЫЕ",
                                    "level6": "КОМБИБЛОК КОМПАКТ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 107,
                                    type: "product", "name": "Морс Агуша Ягодный Сбор 500мл х3 х5 КБК МП ДП",
                                    "level4": "АГУША",
                                    "level5": "ЯГОДЫ ЛЕСНЫЕ",
                                    "level6": "КОМБИБЛОК КОМПАКТ",
                                    "level7": "500 мл"
                                },
                                {
                                    "id": 108,
                                    type: "product", "name": "Нап сокс Агуша КомпПр КлубЯблЧРяб200млх3х5КБК МПДП",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-КЛУБНИКА-РЯБИНА ЧЕРНОПЛОДНАЯ",
                                    "level6": "КОМБИБЛОК КОМПАКТ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 109,
                                    type: "product", "name": "Нап сокс Агуша КомпПр КлубЯблЧРяб500млх3х5КБК МПДП",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-КЛУБНИКА-РЯБИНА ЧЕРНОПЛОДНАЯ",
                                    "level6": "КОМБИБЛОК КОМПАКТ",
                                    "level7": "500 мл"
                                },
                                {
                                    "id": 110,
                                    type: "product", "name": "Нап сокс Агуша КомпПр ЯблКурИзюм 200млх3х5КБКМП ДП",
                                    "level4": "АГУША",
                                    "level5": "КУРАГА-ИЗЮМ-ЯБЛОКО",
                                    "level6": "КОМБИБЛОК КОМПАКТ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 111,
                                    type: "product", "name": "Нап сокс Агуша КомпПр ЯблКурИзюм 500мл х15 КБК ДП",
                                    "level4": "АГУША",
                                    "level5": "КУРАГА-ИЗЮМ-ЯБЛОКО",
                                    "level6": "КОМБИБЛОК КОМПАКТ",
                                    "level7": "500 мл"
                                },
                                {
                                    "id": 112,
                                    type: "product", "name": "Нап сокс Агуша КомпПр ЯблКурИзюм 500млх3х5КБКМПДП",
                                    "level4": "АГУША",
                                    "level5": "КУРАГА-ИЗЮМ-ЯБЛОКО",
                                    "level6": "КОМБИБЛОК КОМПАКТ",
                                    "level7": "500 мл"
                                },
                                {
                                    "id": 113,
                                    type: "product", "name": "Нап соксАгушаЯСамКомпПрЯблКлубЧРяб200млх3х5КБКМПДП",
                                    "level4": "АГУША Я САМ",
                                    "level5": "ЯБЛОКО-КЛУБНИКА-РЯБИНА ЧЕРНОПЛОДНАЯ",
                                    "level6": "КОМБИБЛОК КОМПАКТ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 114,
                                    type: "product", "name": "Напит сокосод Агуша кур-изюм-яб 0% 1х15х200мл CbC",
                                    "level4": "АГУША",
                                    "level5": "КУРАГА-ИЗЮМ-ЯБЛОКО",
                                    "level6": "КОМБИБЛОК КОМПАКТ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 115,
                                    type: "product", "name": "Морс Агуша Ягодный Сбор 200мл х15 КБК ДП",
                                    "level4": "АГУША",
                                    "level5": "ЯГОДЫ ЛЕСНЫЕ",
                                    "level6": "КОМБИБЛОК КОМПАКТ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 116,
                                    type: "product", "name": "Морс Агуша Ягодный Сбор 500мл х15 КБК ДП",
                                    "level4": "АГУША",
                                    "level5": "ЯГОДЫ ЛЕСНЫЕ",
                                    "level6": "КОМБИБЛОК КОМПАКТ",
                                    "level7": "500 мл"
                                },
                                {
                                    "id": 117,
                                    type: "product", "name": "Нап сокс Агуша КомпПр Клуб Ябл ЧРяб200мл х15КБК ДП",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-КЛУБНИКА-РЯБИНА ЧЕРНОПЛОДНАЯ",
                                    "level6": "КОМБИБЛОК КОМПАКТ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 118,
                                    type: "product", "name": "Нап сокс Агуша КомпПр КлубЯблЧРяб 500мл х15 КБК ДП",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-КЛУБНИКА-РЯБИНА ЧЕРНОПЛОДНАЯ",
                                    "level6": "КОМБИБЛОК КОМПАКТ",
                                    "level7": "500 мл"
                                },
                                {
                                    "id": 119,
                                    type: "product", "name": "Нап сокс Агуша КомпПр ЯблКурИзюм 200мл х15 КБК ДП",
                                    "level4": "АГУША",
                                    "level5": "КУРАГА-ИЗЮМ-ЯБЛОКО",
                                    "level6": "КОМБИБЛОК КОМПАКТ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 120,
                                    type: "product", "name": "Нап сокс Агуша КомпПр ЯблКурИзюм 500мл х15 КБК ДП",
                                    "level4": "АГУША",
                                    "level5": "КУРАГА-ИЗЮМ-ЯБЛОКО",
                                    "level6": "КОМБИБЛОК КОМПАКТ",
                                    "level7": "500 мл"
                                }
                            ]
                        },
                        {
                            "id": 121,
                            "name": "Сокосодержащие Напитки",
                            "level": 2, type: "products",
                            "products": [
                                {
                                    "id": 122,
                                    type: "product", "name": "ДП Вода и сок Агуша Яблоко 300мл х6 БП",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО",
                                    "level6": "ПЭТ",
                                    "level7": "300 мл"
                                },
                                {
                                    "id": 123,
                                    type: "product", "name": "ДП Вода и сок Агуша Ягоды сад 300мл х6 БП",
                                    "level4": "АГУША",
                                    "level5": "САДОВЫЕ ЯГОДЫ",
                                    "level6": "ПЭТ",
                                    "level7": "300 мл"
                                },
                                {
                                    "id": 124,
                                    type: "product", "name": "ДП НапСокосод Агуша Ябл-Виногр 300мл БП 6Х",
                                    "level4": "АГУША",
                                    "level5": "ВИНОГРАД И ЯБЛОКО",
                                    "level6": "ПЭТ",
                                    "level7": "300 МЛ"
                                },
                                {
                                    "id": 125,
                                    type: "product", "name": "ДП НапСокосод Агуша Ябл-Вишня 300мл БП 6Х",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО И ВИШНЯ",
                                    "level6": "ПЭТ",
                                    "level7": "300 МЛ"
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": 126,
                    "name": "Жидкие Молочные Десерты Дп",
                    "level": 1, type: "nodes",
                    "nodes": [
                        {
                            "id": 127,
                            "name": "Каши Жидкие",
                            "level": 2, type: "products",
                            "products": [
                                {
                                    "id": 128,
                                    type: "product",
                                    "name": "Каша мол рисов АгушаЗасып 2.7% 200мл TBAB 18Х",
                                    "level4": "АГУША",
                                    "level5": "РИС",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 МЛ"
                                },
                                {
                                    "id": 129,
                                    type: "product",
                                    "name": "Каша мол-греч Агуша Засыпайка 2.5% 200мл х18 TBAB",
                                    "level4": "АГУША",
                                    "level5": "ГРЕЧКА",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 130,
                                    type: "product", "name": "Каша мол-рис АгушаЗасып-ка ЯблГру2.7%200мл х18 TBA",
                                    "level4": "АГУША",
                                    "level5": "РИС, ЯБЛОКО, ГРУША",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 131,
                                    type: "product", "name": "КашаМол АгушЗасып ПшенТыкв 2.7%200мл TBA СГ150 18Х",
                                    "level4": "АГУША",
                                    "level5": "ПШЕНИЦА, ТЫКВА",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 МЛ"
                                },
                                {
                                    "id": 132,
                                    type: "product", "name": "КашаМол ОвсянМалин АгушаЗасып 2.5% 200мл TBAB 18Х",
                                    "level4": "АГУША",
                                    "level5": "ОВСЯНКА И МАЛИНА",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 МЛ"
                                },
                                {
                                    "id": 133,
                                    type: "product", "name": "КашаМол пшенич с тыкв АгушаЗасып 2.7%200мл TBA 18Х",
                                    "level4": "АГУША",
                                    "level5": "ПШЕНИЦА, ТЫКВА",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 МЛ"
                                },
                                {
                                    "id": 134,
                                    type: "product", "name": "КашаМолАгушЗасып РисЯблГру 2.7%200мл TBA СГ150 18Х",
                                    "level4": "АГУША",
                                    "level5": "РИС, ЯБЛОКО, ГРУША",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 135,
                                    type: "product", "name": "КашаМолАгушЗасыпОвсянМалин2.5% 200мл TBA СГ150 18Х",
                                    "level4": "АГУША",
                                    "level5": "ОВСЯНКА И МАЛИНА",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 МЛ"
                                },
                                {
                                    "id": 136,
                                    type: "product", "name": "КашаМолоч Агуша Гречка 2.5% 200мл ТВАВ СГ150 18Х",
                                    "level4": "АГУША",
                                    "level5": "ГРЕЧКА",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 137,
                                    type: "product", "name": "КашМол злак АгушаЗасып груш,бан 2.7%200мл TBA 18Х",
                                    "level4": "АГУША",
                                    "level5": "ЗЛАКИ, ГРУША, БАНАН",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 МЛ"
                                },
                                {
                                    "id": 138,
                                    type: "product", "name": "КашМолАгушЗасыпЗлакГрушБан 2.7%200мл TBA СГ150 18Х",
                                    "level4": "АГУША",
                                    "level5": "ЗЛАКИ, ГРУША, БАНАН",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 МЛ"
                                }
                            ]
                        },
                        {
                            "id": 139,
                            "name": "Молочный Коктейль Дп",
                            "level": 2, type: "products",
                            "products": [
                                {
                                    "id": 140,
                                    type: "product", "name": "ДП Кокт мол/зл Агуша Я САМ греч-мол 3%1х18х209г",
                                    "level4": "АГУША Я САМ",
                                    "level5": "ГРЕЧКА",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 МЛ"
                                },
                                {
                                    "id": 141,
                                    type: "product", "name": "ДП Кокт мол/зл Агуша Я САМ рис-яб-гр 1х18х209г",
                                    "level4": "АГУША Я САМ",
                                    "level5": "РИС, ЯБЛОКО, ГРУША",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 МЛ"
                                },
                                {
                                    "id": 142,
                                    type: "product", "name": "Кокт Мол Агуша Гречка Злак 3% 200мл х18 БЗ ДП",
                                    "level4": "АГУША",
                                    "level5": "ГРЕЧКА",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 143,
                                    type: "product", "name": "Кокт Мол Агуша Рис Ябл Груш 3% 200мл х18 БЗ ДП",
                                    "level4": "АГУША",
                                    "level5": "РИС, ЯБЛОКО, ГРУША",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 144,
                                    type: "product", "name": "Кокт Мол АгушаЯСам Ваниль 2.5% 200мл х18 БЗ ДП",
                                    "level4": "АГУША Я САМ",
                                    "level5": "ВАНИЛЬ",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 145,
                                    type: "product", "name": "Кокт Мол АгушаЯСам Какао 2.5% 200мл х18 БЗ ДП",
                                    "level4": "АГУША Я САМ",
                                    "level5": "КАКАО",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 146,
                                    type: "product", "name": "Кокт Мол АгушаЯСам Малина 2.5% 200мл х18 БЗ ДП",
                                    "level4": "АГУША Я САМ",
                                    "level5": "МАЛИНА",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 147,
                                    type: "product", "name": "Коктейль мол Агуша Я САМ! мал 2.5% 1х27х200мл ТВАВ",
                                    "level4": "АГУША Я САМ",
                                    "level5": "МАЛИНА",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 148,
                                    type: "product", "name": "Коктейль мол Агуша ЯСАМ! какао 2.5%1х27х200мл ТВАВ",
                                    "level4": "АГУША Я САМ",
                                    "level5": "КАКАО",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 149,
                                    type: "product", "name": "МолКокт Агуша Земляника 2.5% 200мл TBAВ 18Х",
                                    "level4": "АГУША",
                                    "level5": "ЗЕМЛЯНИКА",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 МЛ"
                                },
                                {
                                    "id": 150,
                                    type: "product", "name": "МолКокт Агуша Малина 2.5% 200мл TBAB 18Х",
                                    "level4": "АГУША",
                                    "level5": "МАЛИНА",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 МЛ"
                                },
                                {
                                    "id": 151,
                                    type: "product", "name": "МолКокт Агуша ЯгодыЛесн 2.5% 200мл TBAВ 18Х",
                                    "level4": "АГУША",
                                    "level5": "ЛЕСНЫЕ ЯГОДЫ",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 МЛ"
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": 152,
                    "name": "Жидкие Молочные Смеси",
                    "level": 1, type: "nodes",
                    "nodes": [
                        {
                            "id": 153,
                            "name": "Кисломолочная Детская Смесь",
                            "level": 2, type: "products",
                            "products": [
                                {
                                    "id": 154,
                                    type: "product", "name": "Смесь КислМол Агуша1 3.5% 204г х12 БЗ ДП",
                                    "level4": "АГУША",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "204 г"
                                },
                                {
                                    "id": 155,
                                    type: "product", "name": "Смесь КислМол Агуша2 3.4% 204г х12 БЗ ДП",
                                    "level4": "АГУША",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "204 г"
                                }
                            ]
                        },
                        {
                            "id": 156,
                            "name": "Смесь Молочная Сухая",
                            "level": 2, type: "products",
                            "products": [
                                {
                                    "id": 157,
                                    type: "product", "name": "Смесь сух мол Беллакт Оптима1+ 350г х21 КорФол",
                                    "level4": "БЕЛЛАКТ",
                                    "level5": "",
                                    "level6": "ПАЧКА",
                                    "level7": "350 Г"
                                },
                                {
                                    "id": 158,
                                    type: "product", "name": "Смесь сух мол Беллакт Оптима2+ 350г х21 КорФол",
                                    "level4": "БЕЛЛАКТ",
                                    "level5": "",
                                    "level6": "ПАЧКА",
                                    "level7": "350 Г"
                                }
                            ]
                        },
                        {
                            "id": 159,
                            "name": "Стерилизованная Детская Смесь",
                            "level": 2, type: "products",
                            "products": [
                                {
                                    "id": 160,
                                    type: "product", "name": "Смесь стерил с Преб Агуша1 3.4% 0.2л х18 БЗ ДП",
                                    "level4": "АГУША",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 161,
                                    type: "product", "name": "Смесь стерил с Преб Агуша2 3.1% 0.2л х18 БЗ ДП",
                                    "level4": "АГУША",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": 162,
                    "name": "Йогурты Дп",
                    "level": 1, type: "nodes",
                    "nodes": [
                        {
                            "id": 163,
                            "name": "Йогурт Вязкий Живой Дп",
                            "level": 2, type: "products",
                            "products": [
                                {
                                    "id": 164,
                                    type: "product", "name": "ДП Йогурт вязкий Агуша Злаки 2.7% 1х24x90г",
                                    "level4": "АГУША",
                                    "level5": "ЗЛАКИ",
                                    "level6": "ЖЕСТКИЙ ПЛАСТИКОВЫЙ СТАКАНЧИК",
                                    "level7": "90 Г"
                                },
                                {
                                    "id": 165,
                                    type: "product", "name": "Йогурт Агуша натуральный 3.1% 90г х6 МСТ",
                                    "level4": "АГУША",
                                    "level5": "",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "90 г"
                                },
                                {
                                    "id": 166,
                                    type: "product", "name": "Йогурт Фр АгушаЯСам кус ЯблГруш 2.5%110гх12 Ван ДП",
                                    "level4": "АГУША Я САМ",
                                    "level5": "ЯБЛОКО-ГРУША",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "110 г"
                                },
                                {
                                    "id": 167,
                                    type: "product", "name": "Йогурт Агуша Банан 2.7% 90г х24 Четв ДП",
                                    "level4": "АГУША",
                                    "level5": "БАНАН",
                                    "level6": "ЖЕСТКИЙ ПЛАСТИКОВЫЙ СТАКАНЧИК",
                                    "level7": "90 г"
                                },
                                {
                                    "id": 168,
                                    type: "product", "name": "Йогурт Агуша банан 2.7% 90г х6 МСТ",
                                    "level4": "АГУША",
                                    "level5": "БАНАН",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "90 г"
                                },
                                {
                                    "id": 169,
                                    type: "product", "name": "Йогурт Агуша Землян-Малин 2.7% 90г х6 МСТ",
                                    "level4": "АГУША",
                                    "level5": "ЗЕМЛЯНИКА-МАЛИНА",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "90 г"
                                },
                                {
                                    "id": 170,
                                    type: "product", "name": "Йогурт Агуша Малина Земл 2.7% 90г х24 Четв ДП",
                                    "level4": "АГУША",
                                    "level5": "ЗЕМЛЯНИКА-МАЛИНА",
                                    "level6": "ЖЕСТКИЙ ПЛАСТИКОВЫЙ СТАКАНЧИК",
                                    "level7": "90 г"
                                },
                                {
                                    "id": 171,
                                    type: "product", "name": "Йогурт АгушаЗасып ЯгЛесн-Мелисса 2.7% 90г мст 6Х",
                                    "level4": "АГУША",
                                    "level5": "ЯГОДЫ ЛЕСНЫЕ-МЕЛИССА",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "90 Г"
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": 172,
                    "name": "Йогурты Питьевые Дп",
                    "level": 1, type: "nodes",
                    "nodes": [
                        {
                            "id": 173,
                            "name": "Йогурт Питьевой Дп",
                            "level": 2, type: "products",
                            "products": [
                                {
                                    "id": 174,
                                    type: "product", "name": "ДП Йогурт фр АгушаЯСАМ! виш 2.7% 1х12х85г DoyPack",
                                    "level4": "АГУША Я САМ",
                                    "level5": "ВИШНЯ",
                                    "level6": "ДОЙ-ПАК",
                                    "level7": "85 Г"
                                },
                                {
                                    "id": 175,
                                    type: "product", "name": "Йогурт Агуша Чернослив 2.7% 200г х12 БП ДП",
                                    "level4": "АГУША",
                                    "level5": "ЧЕРНОСЛИВ",
                                    "level6": "ПЭТ",
                                    "level7": "200 г"
                                },
                                {
                                    "id": 176,
                                    type: "product", "name": "Йогурт пит Агуша Я САМ! Банан-Печенье 2.7%200г Бут",
                                    "level4": "АГУША Я САМ",
                                    "level5": "БАНАН, ПЕЧЕНЬЕ",
                                    "level6": "ПЭТ",
                                    "level7": "200 Г"
                                },
                                {
                                    "id": 177,
                                    type: "product", "name": "Йогурт Фрукт АгушаЯСам Малина 2.7% 200г х12 БП ДП",
                                    "level4": "АГУША Я САМ",
                                    "level5": "МАЛИНА",
                                    "level6": "ПЭТ",
                                    "level7": "200 г"
                                },
                                {
                                    "id": 178,
                                    type: "product", "name": "Йогурт Фрукт АгушаЯСам Ябл Бан 2.2% 200г х12 БП ДП",
                                    "level4": "АГУША Я САМ",
                                    "level5": "ЯБЛОКО-БАНАН",
                                    "level6": "ПЭТ",
                                    "level7": "200 г"
                                },
                                {
                                    "id": 179,
                                    type: "product", "name": "ДП Йог пит Агуша ябл-груш 2.7% 200г х4 БП",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-ГРУША",
                                    "level6": "ПЭТ",
                                    "level7": "200 г"
                                },
                                {
                                    "id": 180,
                                    type: "product", "name": "ДП Йогурт Агуша клуб-бан 2.7% 200г х4 БутПл",
                                    "level4": "АГУША",
                                    "level5": "КЛУБНИКА-БАНАН",
                                    "level6": "ПЭТ",
                                    "level7": "200 г"
                                },
                                {
                                    "id": 181,
                                    type: "product", "name": "Йогурт Агуша Засып-ка ЗелЯбл+Мелис 2.7% 200г БП 4Х",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО ЗЕЛЕНОЕ-МЕЛИССА",
                                    "level6": "ПЭТ",
                                    "level7": "200 г"
                                },
                                {
                                    "id": 182,
                                    type: "product", "name": "Йогурт Агуша Засып-ка ЗелЯбл+Мелис 2.7%200г БП 12Х",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО ЗЕЛЕНОЕ-МЕЛИССА",
                                    "level6": "ПЭТ",
                                    "level7": "200 г"
                                },
                                {
                                    "id": 183,
                                    type: "product", "name": "Йогурт Агуша Засып-ка ЗелЯбл+Мелис 2.7%200г БП 4Х",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО ЗЕЛЕНОЕ-МЕЛИССА",
                                    "level6": "ПЭТ",
                                    "level7": "200 г"
                                },
                                {
                                    "id": 184,
                                    type: "product", "name": "Йогурт Агуша Засып-ка ЗелЯбл+Мелис 2.7%200г х12 БП",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО ЗЕЛЕНОЕ-МЕЛИССА",
                                    "level6": "ПЭТ",
                                    "level7": "200 г"
                                },
                                {
                                    "id": 185,
                                    type: "product", "name": "Йогурт Агуша Злаки 2.7% 200г х12 БП ДП",
                                    "level4": "АГУША",
                                    "level5": "ЗЛАКИ",
                                    "level6": "ПЭТ",
                                    "level7": "200 г"
                                },
                                {
                                    "id": 186,
                                    type: "product", "name": "Йогурт Агуша Классич 3.1% 200г х12 БП ДП",
                                    "level4": "АГУША",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "200 г"
                                },
                                {
                                    "id": 187,
                                    type: "product", "name": "Йогурт Агуша Клуб Банан 2.7% 200г х12 БП ДП",
                                    "level4": "АГУША",
                                    "level5": "КЛУБНИКА-БАНАН",
                                    "level6": "ПЭТ",
                                    "level7": "200 г"
                                },
                                {
                                    "id": 188,
                                    type: "product", "name": "Йогурт Агуша Персик 2.7% 200г х12 БП ДП",
                                    "level4": "АГУША",
                                    "level5": "ПЕРСИК",
                                    "level6": "ПЭТ",
                                    "level7": "200 г"
                                },
                                {
                                    "id": 189,
                                    type: "product", "name": "Йогурт Агуша Яблоко Груша 2.7% 200г х12 БП ДП",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-ГРУША",
                                    "level6": "ПЭТ",
                                    "level7": "200 г"
                                },
                                {
                                    "id": 190,
                                    type: "product", "name": "Йогурт фр Агуша СевернЯгоды 2.7% 200г БП 12Х",
                                    "level4": "АГУША",
                                    "level5": "ЧЕРНИКА, БРУСНИКА, КЛЮКВА",
                                    "level6": "ПЭТ",
                                    "level7": "200 Г"
                                },
                                {
                                    "id": 191,
                                    type: "product", "name": "Йогурт фр Агуша СевернЯгоды 2.7% 200г БП 4Х",
                                    "level4": "АГУША",
                                    "level5": "ЧЕРНИКА, БРУСНИКА, КЛЮКВА",
                                    "level6": "ПЭТ",
                                    "level7": "200 Г"
                                },
                                {
                                    "id": 192,
                                    type: "product", "name": "Йогурт Фрукт АгушаЯСам Клуб Земл 2.2%200гх12 БП ДП",
                                    "level4": "АГУША Я САМ",
                                    "level5": "КЛУБНИКА-ЗЕМЛЯНИКА",
                                    "level6": "ПЭТ",
                                    "level7": "200 г"
                                },
                                {
                                    "id": 193,
                                    type: "product", "name": "Йогурт Фрукт АгушаЯСам Клуб Земл 2.2%200гх24 БП ДП",
                                    "level4": "АГУША Я САМ",
                                    "level5": "КЛУБНИКА-ЗЕМЛЯНИКА",
                                    "level6": "ПЭТ",
                                    "level7": "200 г"
                                },
                                {
                                    "id": 194,
                                    type: "product", "name": "Йогурт Фрукт АгушаЯСам Ябл Бан 2.2% 200г х24 БП ДП",
                                    "level4": "АГУША Я САМ",
                                    "level5": "ЯБЛОКО-БАНАН",
                                    "level6": "ПЭТ",
                                    "level7": "200 г"
                                },
                                {
                                    "id": 195,
                                    type: "product", "name": "Йогурт Фрукт АгушаЯСам ЯблГруш 2.7% 85гх12 ДойП ДП",
                                    "level4": "АГУША Я САМ",
                                    "level5": "ЯБЛОКО-ГРУША",
                                    "level6": "ДОЙ-ПАК",
                                    "level7": "85 г"
                                },
                                {
                                    "id": 196,
                                    type: "product", "name": "Йогурт Фрукт АгушаЯСам Яг Асcорт 2.6%85гх12ДойП ДП",
                                    "level4": "АГУША Я САМ",
                                    "level5": "ЯГОДЫ",
                                    "level6": "ДОЙ-ПАК",
                                    "level7": "85 г"
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": 197,
                    "name": "Кефир Дп",
                    "level": 1, type: "nodes",
                    "nodes": [
                        {
                            "id": 198,
                            "name": "Кефир Дп",
                            "level": 2, type: "products",
                            "products": [
                                {
                                    "id": 199,
                                    type: "product", "name": "Биокефир Агуша 3.2% 204г х12 БЗ ДП",
                                    "level4": "АГУША",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "204 г"
                                },
                                {
                                    "id": 200,
                                    type: "product", "name": "Биолакт Агуша 3.2% 200г х4 БутПл",
                                    "level4": "АГУША",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "200 г"
                                },
                                {
                                    "id": 201,
                                    type: "product", "name": "Кефир детский Агуша 2.5% 205г х5 TRTwCap",
                                    "level4": "АГУША",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "205 г"
                                },
                                {
                                    "id": 202,
                                    type: "product", "name": "Нап кисмол Агуша Биолакт 3.2% 200г х12 БП ДП",
                                    "level4": "АГУША",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "200 г"
                                },
                                {
                                    "id": 203,
                                    type: "product", "name": "ДП Биолакт Агуша 3.2% 200г БП СГ21 12Х",
                                    "level4": "АГУША",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "200 г"
                                },
                                {
                                    "id": 204,
                                    type: "product", "name": "ДП Биолакт Агуша 3.2% 200г БП СГ21 4Х",
                                    "level4": "АГУША",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "200 г"
                                },
                                {
                                    "id": 205,
                                    type: "product", "name": "ДП Биолакт Агуша 3.2% 200г х4 ПлБут",
                                    "level4": "АГУША",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "200 г"
                                },
                                {
                                    "id": 206,
                                    type: "product", "name": "Кефир Агуша 2.5% 205г РР 10Х",
                                    "level4": "АГУША",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "205 г"
                                },
                                {
                                    "id": 207,
                                    type: "product", "name": "Кефир Агуша 2.5% 205г х10 ТРТвК ДП",
                                    "level4": "АГУША",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "205 г"
                                },
                                {
                                    "id": 208,
                                    type: "product", "name": "Кефир Агуша 3.2% 204г х12 БЗ ДП",
                                    "level4": "АГУША",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "204 г"
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": 209,
                    "name": "Кисломолочные Продукты Дп",
                    "level": 1, type: "nodes",
                    "nodes": [
                        {
                            "id": 210,
                            "name": "Ряженка Дп",
                            "level": 2, type: "products",
                            "products": [
                                {
                                    "id": 211,
                                    type: "product", "name": "Ряженка Агуша 3.2% 200г БП 12Х",
                                    "level4": "АГУША",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "200 Г"
                                },
                                {
                                    "id": 212,
                                    type: "product", "name": "Ряженка Агуша Клубника 2.9% 200г БП 12Х",
                                    "level4": "АГУША",
                                    "level5": "КЛУБНИКА",
                                    "level6": "ПЭТ",
                                    "level7": "200 Г"
                                },
                                {
                                    "id": 213,
                                    type: "product", "name": "Ряженка Агуша 3.2% 200г БП СГ20 12Х",
                                    "level4": "АГУША",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "200 Г"
                                },
                                {
                                    "id": 214,
                                    type: "product", "name": "Ряженка Агуша 3.2% 200г БП СГ20 4Х",
                                    "level4": "АГУША",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "200 Г"
                                },
                                {
                                    "id": 215,
                                    type: "product", "name": "Ряженка Агуша Клубника 2.9% 200г БП СГ20 12Х",
                                    "level4": "АГУША",
                                    "level5": "КЛУБНИКА",
                                    "level6": "ПЭТ",
                                    "level7": "200 Г"
                                },
                                {
                                    "id": 216,
                                    type: "product", "name": "Ряженка Агуша Клубника 2.9% 200г БП СГ20 4Х",
                                    "level4": "АГУША",
                                    "level5": "КЛУБНИКА",
                                    "level6": "ПЭТ",
                                    "level7": "200 Г"
                                },
                                {
                                    "id": 217,
                                    type: "product", "name": "Ряженка Агуша Черника 2.9% 200г БП 12Х",
                                    "level4": "АГУША",
                                    "level5": "ЧЕРНИКА",
                                    "level6": "ПЭТ",
                                    "level7": "200 Г"
                                },
                                {
                                    "id": 218,
                                    type: "product", "name": "Ряженка Агуша Черника 2.9% 200г БП 4Х",
                                    "level4": "АГУША",
                                    "level5": "ЧЕРНИКА",
                                    "level6": "ПЭТ",
                                    "level7": "200 Г"
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": 219,
                    "name": "Молоко Дп",
                    "level": 1, type: "nodes",
                    "nodes": [
                        {
                            "id": 220,
                            "name": "Молоко Стерилизованное Дп",
                            "level": 2, type: "products",
                            "products": [
                                {
                                    "id": 221,
                                    type: "product", "name": "Молоко стерил Агуша Витам 2.5% 0.2л х18 БЗ ДП",
                                    "level4": "АГУША",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 222,
                                    type: "product", "name": "Молоко стерил Агуша Витам 2.5% 0.2л х18 БЗ ДП",
                                    "level4": "АГУША",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 223,
                                    type: "product", "name": "Молоко стерил Агуша Витам 2.5% 0.2л х18 БЗ ДП",
                                    "level4": "АГУША",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 224,
                                    type: "product", "name": "Молоко стерил Агуша Витам 3.2% 500г х15 СЛРК ДП",
                                    "level4": "АГУША",
                                    "level5": "",
                                    "level6": "КОМБИ ФИТ",
                                    "level7": "500 Г"
                                },
                                {
                                    "id": 225,
                                    type: "product", "name": "Молоко стерил Агуша Витам 3.2% 500мл х15 СЛРК ДП",
                                    "level4": "АГУША",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "500 МЛ"
                                },
                                {
                                    "id": 226,
                                    type: "product", "name": "Молоко стерил АгушаЯСам Иммун 2.5%500гх15СЛ ДП",
                                    "level4": "АГУША Я САМ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "500 Г"
                                },
                                {
                                    "id": 227,
                                    type: "product", "name": "МолУльтрДет с 3х лет Агуша3.2%925мл х12 TBASHC АКЦ",
                                    "level4": "АГУША",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "925 мл"
                                },
                                {
                                    "id": 228,
                                    type: "product", "name": "Мол ультр с 3лет Агуша с вит и йод 2.5% 1л х12 Сл",
                                    "level4": "АГУША",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "1 л"
                                },
                                {
                                    "id": 229,
                                    type: "product", "name": "Молоко стерил Агуша 4витам Йод 3.2% 0.2л х18 БЗ ДП",
                                    "level4": "АГУША",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 230,
                                    type: "product", "name": "Молоко стерил Агуша Витам 3.2% 500г х15 СЛРК ДП",
                                    "level4": "АГУША",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "500 г"
                                },
                                {
                                    "id": 231,
                                    type: "product", "name": "Молоко стерил Агуша для БерКорм 2.5% 1л х12 СЛ",
                                    "level4": "АГУША",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "1 л"
                                },
                                {
                                    "id": 232,
                                    type: "product", "name": "Молоко стерил Агуша Пребиот 2.5% 0.2л х18 БЗ ДП",
                                    "level4": "АГУША",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 233,
                                    type: "product", "name": "Молоко ультр д/д с 3лет Агуша 3.2%925мл х12 TBASHC",
                                    "level4": "АГУША",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "925 мл"
                                },
                                {
                                    "id": 234,
                                    type: "product",
                                    "name": "МолСтерДетАгуша витА,В1,В2,С+йод 2.5%200мл х18TBABод2.5%200мл х18 TBA",
                                    "level4": "АГУША",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": 235,
                    "name": "Мясные Пюре",
                    "level": 1, type: "nodes",
                    "nodes": [
                        {
                            "id": 236,
                            "name": "Мясные Пюре",
                            "level": 2, type: "products",
                            "products": [
                                {
                                    "id": 237,
                                    type: "product", "name": "ДП Пюре мяс Агуша Инд 5.5% 1x8x80г Стекло",
                                    "level4": "АГУША",
                                    "level5": "ИНДЕЙКА",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "80 г"
                                },
                                {
                                    "id": 238,
                                    type: "product", "name": "Пюре Мясное Агуша Говяд 6.2% 80г х2 х4 МП СБнДП",
                                    "level4": "АГУША",
                                    "level5": "ГОВЯДИНА",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "80 г"
                                },
                                {
                                    "id": 239,
                                    type: "product", "name": "Пюре Мясное Агуша Индейка 5.5% 80г х2 х4 МП СБн ДП",
                                    "level4": "АГУША",
                                    "level5": "ИНДЕЙКА",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "80 г"
                                },
                                {
                                    "id": 240,
                                    type: "product", "name": "Пюре Мясное Агуша ЦыпГовяд 7.7% 80г х8 СБн ДП",
                                    "level4": "АГУША",
                                    "level5": "ЦЫПЛЕНОК-ГОВЯДИНА",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "80 г"
                                },
                                {
                                    "id": 241,
                                    type: "product", "name": "Пюре Мясное Агуша ЦыпГовяд 7.7% 80гх2х4 МП СБн ДП",
                                    "level4": "АГУША",
                                    "level5": "ЦЫПЛЕНОК-ГОВЯДИНА",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "80 г"
                                },
                                {
                                    "id": 242,
                                    type: "product", "name": "Пюре Мясное Агуша Цыпленок 6% 80г х2 х4 МП СБн ДП",
                                    "level4": "АГУША",
                                    "level5": "ЦЫПЛЕНОК",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "80 г"
                                },
                                {
                                    "id": 243,
                                    type: "product", "name": "Пюре Мясное Агуша Цыпленок 6% 80г х8 СБн ДП",
                                    "level4": "АГУША",
                                    "level5": "ЦЫПЛЕНОК",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "80 г"
                                },
                                {
                                    "id": 244,
                                    type: "product", "name": "ДП Пюре мясное Агуша говяд 6.2% 1х8х100г Жесть",
                                    "level4": "АГУША",
                                    "level5": "ГОВЯДИНА",
                                    "level6": "БАНКА",
                                    "level7": "100 Г"
                                },
                                {
                                    "id": 245,
                                    type: "product", "name": "ДП Пюре мясное Агуша кролик 7% 1х8х100г Жесть",
                                    "level4": "АГУША",
                                    "level5": "КРОЛИК",
                                    "level6": "БАНКА",
                                    "level7": "100 Г"
                                },
                                {
                                    "id": 246,
                                    type: "product", "name": "ДП Пюре мясное Агуша цып 6% 1х8х100г Жесть",
                                    "level4": "АГУША",
                                    "level5": "ЦЫПЛЕНОК",
                                    "level6": "БАНКА",
                                    "level7": "100 Г"
                                },
                                {
                                    "id": 247,
                                    type: "product", "name": "Пюре Мясное Агуша Говяд 6.2% 80г х8 СБн ДП",
                                    "level4": "АГУША",
                                    "level5": "ГОВЯДИНА",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "80 г"
                                },
                                {
                                    "id": 248,
                                    type: "product", "name": "Пюре Мясное Агуша Индейка 5.5% 80г х8 СБн ДП",
                                    "level4": "АГУША",
                                    "level5": "ИНДЕЙКА",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "80 г"
                                },
                                {
                                    "id": 249,
                                    type: "product", "name": "Пюре Мясное Агуша Кролик 7% 80г х8 СБн ДП",
                                    "level4": "АГУША",
                                    "level5": "КРОЛИК",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "80 г"
                                },
                                {
                                    "id": 250,
                                    type: "product", "name": "Пюре Мясное Агуша ЦыпГовяд 7.7% 80г х8 СБн ДП",
                                    "level4": "АГУША",
                                    "level5": "ЦЫПЛЕНОК-ГОВЯДИНА",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "80 г"
                                },
                                {
                                    "id": 251,
                                    type: "product", "name": "Пюре Мясное Агуша Цыпленок 6% 80г х8 СБн ДП",
                                    "level4": "АГУША",
                                    "level5": "ЦЫПЛЕНОК",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "80 г"
                                }
                            ]
                        },
                        {
                            "id": 252,
                            "name": "Мясорастительное Пюре",
                            "level": 2, type: "products",
                            "products": [
                                {
                                    "id": 253,
                                    type: "product", "name": "ПюрМясРаст Агуша ГовядинаОвощи 2.7% 105г СБн 12Х",
                                    "level4": "АГУША",
                                    "level5": "ГОВЯДИНА ОВОЩИ",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "105 Г"
                                },
                                {
                                    "id": 254,
                                    type: "product", "name": "ПюрМясРаст Агуша ИдейкаОвощ 2.2% 105г СБн 12Х",
                                    "level4": "АГУША",
                                    "level5": "ИНДЕЙКА ОВОЩИ",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "105 Г"
                                },
                                {
                                    "id": 255,
                                    type: "product", "name": "ПюрМясРаст Агуша ЦыпленОвощ 2.6% 105г СБн 12Х",
                                    "level4": "АГУША",
                                    "level5": "ЦЫПЛЕНОК ОВОЩИ",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "105 Г"
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": 256,
                    "name": "Овощные Пюре",
                    "level": 1, type: "nodes",
                    "nodes": [
                        {
                            "id": 257,
                            "name": "Овощные Пюре",
                            "level": 2, type: "products",
                            "products": [
                                {
                                    "id": 258,
                                    type: "product", "name": "ВБД Пюре овощ Агуша Кабачок 80г СБн 8X",
                                    "level4": "АГУША",
                                    "level5": "КАБАЧОК",
                                    "level6": "Банка стекло",
                                    "level7": "80 Г"
                                },
                                {
                                    "id": 259,
                                    type: "product", "name": "Пюре Овощ Агуша Картоф Кабачок 80г х8 СБн ДП",
                                    "level4": "АГУША",
                                    "level5": "КАРТОФЕЛЬ-КАБАЧОК",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "80 г"
                                },
                                {
                                    "id": 260,
                                    type: "product", "name": "Пюре Овощ Агуша Цветн капуста 80г СБн 8Х",
                                    "level4": "АГУША",
                                    "level5": "КАПУСТА ЦВЕТНАЯ",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "80 г"
                                },
                                {
                                    "id": 261,
                                    type: "product", "name": "Пюре Овощн Агуша Брокколи 80г х8 СБн ДП",
                                    "level4": "АГУША",
                                    "level5": "БРОККОЛИ",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "80 г"
                                },
                                {
                                    "id": 262,
                                    type: "product", "name": "Пюре Овощн Агуша Морковь 105г СБн 12Х",
                                    "level4": "АГУША",
                                    "level5": "МОРКОВЬ",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "105 Г"
                                },
                                {
                                    "id": 263,
                                    type: "product", "name": "Пюре овощное Агуша Тыква 105г СБн 12Х",
                                    "level4": "АГУША",
                                    "level5": "ТЫКВА",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "105 Г"
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": 264,
                    "name": "Питьевая Вода Дп",
                    "level": 1, type: "nodes",
                    "nodes": [
                        {
                            "id": 265,
                            "name": "Питьевая Вода",
                            "level": 2, type: "products",
                            "products": [
                                {
                                    "id": 266,
                                    type: "product", "name": "Вода Питьевая Детская Агуша 0.33л х12 БП",
                                    "level4": "АГУША",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "330 мл"
                                },
                                {
                                    "id": 267,
                                    type: "product", "name": "Вода Питьевая Детская Агуша 1.5л х6 БП",
                                    "level4": "АГУША",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "1,5 л"
                                },
                                {
                                    "id": 268,
                                    type: "product", "name": "Вода Питьевая Детская Агуша 5л х4 БП ДП",
                                    "level4": "АГУША",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "5 л"
                                },
                                {
                                    "id": 269,
                                    type: "product", "name": "Вода питьевая \"Агуша\" 0% 5л БП",
                                    "level4": "АГУША",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "5 л"
                                },
                                {
                                    "id": 270,
                                    type: "product", "name": "Вода Питьевая Детская Агуша 0.33л х12 БП",
                                    "level4": "АГУША",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "330 мл"
                                },
                                {
                                    "id": 271,
                                    type: "product", "name": "Вода Питьевая Детская Агуша 1.5л х6 БП",
                                    "level4": "АГУША",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "1,5 л"
                                },
                                {
                                    "id": 272,
                                    type: "product", "name": "Вода Питьевая Детская Агуша 1.5л х6 БП",
                                    "level4": "АГУША",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "1,5 л"
                                },
                                {
                                    "id": 273,
                                    type: "product", "name": "Вода Питьевая Детская Агуша 5л х4 БП ДП",
                                    "level4": "АГУША",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "5 л"
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": 274,
                    "name": "Сухие Каши",
                    "level": 1, type: "nodes",
                    "nodes": [
                        {
                            "id": 275,
                            "name": "Сухие Каши",
                            "level": 2, type: "products",
                            "products": [
                                {
                                    "id": 276,
                                    type: "product", "name": "Каша Молоч Сух Агуша Овсян 200г х10 КФол ДП",
                                    "level4": "АГУША",
                                    "level5": "ОВСЯНКА",
                                    "level6": "КАРТОН",
                                    "level7": "200 г"
                                },
                                {
                                    "id": 277,
                                    type: "product", "name": "Каша Молоч Сух Агуша Рис 200г х10 КФол ДП",
                                    "level4": "АГУША",
                                    "level5": "РИС",
                                    "level6": "КАРТОН",
                                    "level7": "200 г"
                                },
                                {
                                    "id": 278,
                                    type: "product", "name": "Каша Молоч Сух Агуша Рис КукурБан 200г х10 КФолДП",
                                    "level4": "АГУША",
                                    "level5": "РИС, КУКУРУЗА, БАНАН",
                                    "level6": "КАРТОН",
                                    "level7": "200 г"
                                },
                                {
                                    "id": 279,
                                    type: "product", "name": "Каша сух безмол Агуша ГречЯблоко 200г КартФол 10Х",
                                    "level4": "АГУША",
                                    "level5": "ГРЕЧКА И ЯБЛОКО",
                                    "level6": "КАРТОН",
                                    "level7": "200 Г"
                                },
                                {
                                    "id": 280,
                                    type: "product", "name": "Каша сух мол Агуша Пшеница с тыкв 200г КартФол 10Х",
                                    "level4": "АГУША",
                                    "level5": "ПШЕНИЦА, ТЫКВА",
                                    "level6": "КАРТОН",
                                    "level7": "200 Г"
                                },
                                {
                                    "id": 281,
                                    type: "product", "name": "Каша сухая безмолоч Агуша Гречн 200г КартФол 10Х",
                                    "level4": "АГУША",
                                    "level5": "ГРЕЧКА",
                                    "level6": "КАРТОН",
                                    "level7": "200 Г"
                                },
                                {
                                    "id": 282,
                                    type: "product", "name": "Каша сухая молочн Агуша 5 злаков 200г КартФол 10Х",
                                    "level4": "АГУША",
                                    "level5": "ПШ,РИС,ГРЧК,ОВС,ККРЗ",
                                    "level6": "КАРТОН",
                                    "level7": "200 Г"
                                },
                                {
                                    "id": 283,
                                    type: "product", "name": "КашаСухаяМол Агуша Овсян 12%200г КартФол (стик)10Х",
                                    "level4": "АГУША",
                                    "level5": "ОВСЯНКА",
                                    "level6": "КАРТОН",
                                    "level7": "200 г"
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": 284,
                    "name": "Творог Дп",
                    "level": 1, type: "nodes",
                    "nodes": [
                        {
                            "id": 285,
                            "name": "Творог Мягкий Дп",
                            "level": 2, type: "products",
                            "products": [
                                {
                                    "id": 286,
                                    type: "product", "name": "ДП Биотворог с пребиот дет 4.2% 1х12х100г ван",
                                    "level4": "АГУША",
                                    "level5": "",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 287,
                                    type: "product", "name": "Творог Классический Агуша 4.5% 100г х12 Ван ДП",
                                    "level4": "АГУША",
                                    "level5": "",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 288,
                                    type: "product", "name": "Творог Классический Агуша 4.5% 100г х6 Ван ДП",
                                    "level4": "АГУША",
                                    "level5": "",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 289,
                                    type: "product", "name": "ДП Твор дет Агуша Кальц,витД, преби4.2%50г х12 ван",
                                    "level4": "АГУША",
                                    "level5": "",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "50 г"
                                },
                                {
                                    "id": 290,
                                    type: "product", "name": "Творог дет Агуша классич 4.5% 100г ванн НД 6Х",
                                    "level4": "АГУША",
                                    "level5": "",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 291,
                                    type: "product", "name": "Творог детск классич Агуша 4.5% 100г ванн 6Х",
                                    "level4": "АГУША",
                                    "level5": "",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 292,
                                    type: "product", "name": "Творог Классический Агуша 4.5% 50г х12 Ван ДП",
                                    "level4": "АГУША",
                                    "level5": "",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "50 г"
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": 293,
                    "name": "Творожные Десерты Дп",
                    "level": 1, type: "nodes",
                    "nodes": [
                        {
                            "id": 294,
                            "name": "Творог Фруктовый Дп",
                            "level": 2, type: "products",
                            "products": [
                                {
                                    "id": 295,
                                    type: "product", "name": "ДП Творог фрукт Агуша лесные яг 3.9% 1х12х100г Ван",
                                    "level4": "АГУША",
                                    "level5": "ЯГОДЫ ЛЕСНЫЕ",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 Г"
                                },
                                {
                                    "id": 296,
                                    type: "product", "name": "Твор фр АгушЗасып-ка КлубБан+Мелис 3.8%100г х6 ван",
                                    "level4": "АГУША",
                                    "level5": "КЛУБНИКА, БАНАН, МЕЛИССА",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 297,
                                    type: "product", "name": "Творог Фр АгушаЯСам Груш Перс 3.6% 100г х12 Ван ДП",
                                    "level4": "АГУША Я САМ",
                                    "level5": "ГРУША-ПЕРСИК",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 298,
                                    type: "product", "name": "Творог Фр АгушаЯСам кус Груш Перс 3.6%100гх12ВанДП",
                                    "level4": "АГУША Я САМ",
                                    "level5": "ГРУША-ПЕРСИК",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 299,
                                    type: "product", "name": "Творог Фр АгушаЯСам кус Клуб Земл 3.6%100гх12ВанДП",
                                    "level4": "АГУША Я САМ",
                                    "level5": "КЛУБНИКА-ЗЕМЛЯНИКА",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 300,
                                    type: "product", "name": "Творог фр АгушаЯСам с клуб-земл 3.6% 100г х12 ванн",
                                    "level4": "АГУША Я САМ",
                                    "level5": "КЛУБНИКА-ЗЕМЛЯНИКА",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 301,
                                    type: "product", "name": "Творог Фр Двусл АгушаЯСам КлубВан 3.8%100гх12ВанДП",
                                    "level4": "АГУША Я САМ",
                                    "level5": "КЛУБНИКА-ВАНИЛЬ",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 302,
                                    type: "product", "name": "Творог Фр Двусл АгушаЯСам КлубВан 3.8%100гх6ВанДП",
                                    "level4": "АГУША Я САМ",
                                    "level5": "КЛУБНИКА-ВАНИЛЬ",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 303,
                                    type: "product", "name": "Творог Фр ДвуслАгушаЯСам МалБанПеч3.8%100гх12ВанДП",
                                    "level4": "АГУША Я САМ",
                                    "level5": "МАЛИНА, БАНАН, ПЕЧЕНЬЕ",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 304,
                                    type: "product", "name": "Творог Фр ДвуслАгушаЯСам МалБанПеч3.8%100гх6ВанДП",
                                    "level4": "АГУША Я САМ",
                                    "level5": "МАЛИНА, БАНАН, ПЕЧЕНЬЕ",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 305,
                                    type: "product", "name": "Творог Фрукт Агуша Абр Мор 3.9% 100г х12 Ван ДП",
                                    "level4": "АГУША",
                                    "level5": "АБРИКОС-МОРКОВЬ",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 306,
                                    type: "product", "name": "Творог Фрукт Агуша Абр Мор 3.9% 100г х6 Ван ДП",
                                    "level4": "АГУША",
                                    "level5": "АБРИКОС-МОРКОВЬ",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 307,
                                    type: "product", "name": "Творог Фрукт Агуша Груша 3.9% 100г х12 Ван ДП",
                                    "level4": "АГУША",
                                    "level5": "ГРУША",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 308,
                                    type: "product", "name": "Творог Фрукт Агуша Груша 3.9% 100г х6 Ван ДП",
                                    "level4": "АГУША",
                                    "level5": "ГРУША",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 309,
                                    type: "product", "name": "Творог Фрукт Агуша Злаки 3.9% 100г х6 Ван ДП",
                                    "level4": "АГУША",
                                    "level5": "ЗЛАКИ",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 310,
                                    type: "product", "name": "Творог Фрукт Агуша МультФр 3.9% 100г х12 Ван ДП",
                                    "level4": "АГУША",
                                    "level5": "МУЛЬТИФРУКТ",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 311,
                                    type: "product", "name": "Творог Фрукт Агуша МультФр 3.9% 100г х6 Ван ДП",
                                    "level4": "АГУША",
                                    "level5": "МУЛЬТИФРУКТ",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 312,
                                    type: "product", "name": "Творог Фрукт Агуша Персик 3.9% 100г х6 Ван ДП",
                                    "level4": "АГУША",
                                    "level5": "ПЕРСИК",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 Г"
                                },
                                {
                                    "id": 313,
                                    type: "product", "name": "Творог Фрукт Агуша Черника 3.9% 100г х12 Ван ДП",
                                    "level4": "АГУША",
                                    "level5": "ЧЕРНИКА",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 314,
                                    type: "product", "name": "Творог Фрукт Агуша Черника 3.9% 100г х6 Ван ДП",
                                    "level4": "АГУША",
                                    "level5": "ЧЕРНИКА",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 315,
                                    type: "product", "name": "Творог Фрукт Агуша Ябл Банан 3.9% 100г х12 Ван ДП",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-БАНАН",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 316,
                                    type: "product", "name": "Творог Фрукт Агуша Ябл Банан 3.9% 100г х6 Ван ДП",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-БАНАН",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 317,
                                    type: "product", "name": "ДП Творог дет Агуша Злаки 3.9% 100г ванн 6Х",
                                    "level4": "АГУША",
                                    "level5": "ЗЛАКИ",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 318,
                                    type: "product", "name": "Твор фр Агуша МалЧернСморШипов 3.8% 100г ван 6Х",
                                    "level4": "АГУША",
                                    "level5": "МАЛИНА, ЧЕРНАЯ СМОРОДИНА, ШИПОВНИК",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 Г"
                                },
                                {
                                    "id": 319,
                                    type: "product", "name": "Твор фр АгушЗасып-ка КлубБан+Мелис 3.8%100г ван 6Х",
                                    "level4": "АГУША",
                                    "level5": "КЛУБНИКА, БАНАН, МЕЛИССА",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 320,
                                    type: "product", "name": "Твор фр АгушЗасып КлубБанМелис 3.8%100г ван НД 6Х",
                                    "level4": "АГУША",
                                    "level5": "КЛУБНИКА, БАНАН, МЕЛИССА",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 321,
                                    type: "product", "name": "ТворДвусл Агуша ЯСАМ! КлубВаниль 3.8% 100г ван 6Х",
                                    "level4": "АГУША Я САМ",
                                    "level5": "КЛУБНИКА-ВАНИЛЬ",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 322,
                                    type: "product", "name": "ТворДвусл АгушаЯСАМ! МалБанПечен 3.8% 100г ван 6Х",
                                    "level4": "АГУША Я САМ",
                                    "level5": "МАЛИНА, БАНАН, ПЕЧЕНЬЕ",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 323,
                                    type: "product", "name": "Творог фрук Агуша АбрикМорковь 3.9% 100г ван НД 6Х",
                                    "level4": "АГУША",
                                    "level5": "АБРИКОС-МОРКОВЬ",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 324,
                                    type: "product", "name": "Творог фрук Агуша Абрикос-Морковь 3.9% 100г ван 6Х",
                                    "level4": "АГУША",
                                    "level5": "АБРИКОС-МОРКОВЬ",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 325,
                                    type: "product", "name": "Творог фрук Агуша Мультифр 3.9% 100г ван НД 6Х",
                                    "level4": "АГУША",
                                    "level5": "МУЛЬТИФРУКТ",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 326,
                                    type: "product", "name": "Творог фрук Агуша Персик 3.9% 100г Ванн НД 6Х",
                                    "level4": "АГУША",
                                    "level5": "ПЕРСИК",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 Г"
                                },
                                {
                                    "id": 327,
                                    type: "product", "name": "Творог фрук Агуша Черника 3.9% 100г ванн НД 6Х",
                                    "level4": "АГУША",
                                    "level5": "ЧЕРНИКА",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 328,
                                    type: "product", "name": "Творог фрук Агуша ЯблокоБанан 3.9% 100г ван НД 6Х",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-БАНАН",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 329,
                                    type: "product", "name": "Творог фрукт Агуша Груша 3.9% 100г ван 6Х",
                                    "level4": "АГУША",
                                    "level5": "ГРУША",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 330,
                                    type: "product", "name": "Творог фрукт Агуша Груша 3.9% 100г ван НД 6Х",
                                    "level4": "АГУША",
                                    "level5": "ГРУША",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 331,
                                    type: "product", "name": "Творог фрукт Агуша Мультифрукт 3.9% 100г ван 6Х",
                                    "level4": "АГУША",
                                    "level5": "МУЛЬТИФРУКТ",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 332,
                                    type: "product", "name": "Творог фрукт Агуша Персик 3.9% 100г Ванн 6Х",
                                    "level4": "АГУША",
                                    "level5": "ПЕРСИК",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 Г"
                                },
                                {
                                    "id": 333,
                                    type: "product", "name": "Творог фрукт Агуша Черника 3.9% 100г ван 6Х",
                                    "level4": "АГУША",
                                    "level5": "ЧЕРНИКА",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 334,
                                    type: "product", "name": "Творог фрукт Агуша Яблоко-Банан 3.9% 100г ван 6Х",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-БАНАН",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": 335,
                    "name": "Фруктовые Пюре",
                    "level": 1, type: "nodes",
                    "nodes": [
                        {
                            "id": 336,
                            "name": "Пюре Фруктово-Зерновое",
                            "level": 2, type: "products",
                            "products": [
                                {
                                    "id": 337,
                                    type: "product", "name": "ПюреФрЗерн Агуша ЯблПерсОвсян 130г ПаучП 10X",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО, ПЕРСИК, ОВСЯНКА",
                                    "level6": "ДОЙ-ПАК",
                                    "level7": "130 Г"
                                },
                                {
                                    "id": 338,
                                    type: "product", "name": "ПюреФрЗернАгуша ЯблБанКлубнМультизл 130г ПаучП 10X",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО, БАНАН, КЛУБНИКА, ЗЛАКИ",
                                    "level6": "ДОЙ-ПАК",
                                    "level7": "130 Г"
                                },
                                {
                                    "id": 339,
                                    type: "product", "name": "ПюреФрЗернАгуша ЯблЧерникЗемлМультизл 90гПаучП 10X",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО, ЧЕРНИКА, ЗЕМЛЯНИКА, ЗЛАКИ",
                                    "level6": "ДОЙ-ПАК",
                                    "level7": "90 Г"
                                }
                            ]
                        },
                        {
                            "id": 340,
                            "name": "Пюре Фруктово-Овощное",
                            "level": 2, type: "products",
                            "products": [
                                {
                                    "id": 341,
                                    type: "product", "name": "ПюреФрОвощ Агуша ЯблГрушБрокколи 90г ПаучП 10X",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО, МАЛИНА, ШИПОВНИК",
                                    "level6": "ДОЙ-ПАК",
                                    "level7": "90 Г"
                                },
                                {
                                    "id": 342,
                                    type: "product", "name": "ПюреФрОвощ Агуша ЯблокМорковьАбрик 90г ПаучП 10Х",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО, МОРКОВЬ, АБРИКОС",
                                    "level6": "ДОЙ-ПАК",
                                    "level7": "90 Г"
                                },
                                {
                                    "id": 343,
                                    type: "product", "name": "ПюреФрОвощ Агуша ЯблТыкваПерсБанан 90г ПаучП 10Х",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО, ТЫКВА, ПЕРСИК, БАНАН",
                                    "level6": "ДОЙ-ПАК",
                                    "level7": "90 Г"
                                }
                            ]
                        },
                        {
                            "id": 344,
                            "name": "Фруктово-Молочные Пюре",
                            "level": 2, type: "products",
                            "products": [
                                {
                                    "id": 345,
                                    type: "product", "name": "Пюре Агуша Ябл Банан Сливки 200г х8 СБн ДП",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-БАНАН-СЛИВКИ",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "200 г"
                                },
                                {
                                    "id": 346,
                                    type: "product", "name": "Пюре Агуша Ябл Банан Сливки 200г х8 СБн ДП Промо",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-БАНАН-СЛИВКИ",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "200 г"
                                },
                                {
                                    "id": 347,
                                    type: "product", "name": "Пюре Агуша Ябл Сливки 200г х2 х4 МП СБн ДП",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-СЛИВКИ",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "200 г"
                                },
                                {
                                    "id": 348,
                                    type: "product", "name": "Пюре Агуша Ябл Сливки 200г х2 х4 МП СБн ДП",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-СЛИВКИ",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "200 г"
                                },
                                {
                                    "id": 349,
                                    type: "product", "name": "Пюре Агуша Ябл Сливки 200г х8 СБн ДП",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-СЛИВКИ",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "200 г"
                                },
                                {
                                    "id": 350,
                                    type: "product", "name": "Пюре Агуша Ябл Сливки 200г х8 СБн ДП Промо",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-СЛИВКИ",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "200 г"
                                },
                                {
                                    "id": 351,
                                    type: "product", "name": "Пюре Агуша Ябл Творог 115г х12 СБн ДП БЛР",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-ТВОРОГ",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "115 Г"
                                },
                                {
                                    "id": 352,
                                    type: "product", "name": "ДП Пюре фр Агуша ЯблКлубнТворог 90г PouchPack 10Х",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО, КЛУБНИКА, ТВОРОГ",
                                    "level6": "ДОЙ-ПАК",
                                    "level7": "90 Г"
                                },
                                {
                                    "id": 353,
                                    type: "product", "name": "ДП Пюре фр Агуша ЯблТворПеченье 90г PouchPack 10Х",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО, ПЕЧЕНЬЕ, ТВОРОГ",
                                    "level6": "ДОЙ-ПАК",
                                    "level7": "90 Г"
                                }
                            ]
                        },
                        {
                            "id": 354,
                            "name": "Фруктовые Пюре",
                            "level": 2, type: "products",
                            "products": [
                                {
                                    "id": 355,
                                    type: "product", "name": "ДП Пюре конс фр АгушаЯСАМ Бан 0% 1х10х90г Doy-pack",
                                    "level4": "АГУША Я САМ",
                                    "level5": "БАНАН",
                                    "level6": "ДОЙ-ПАК",
                                    "level7": "90 Г"
                                },
                                {
                                    "id": 356,
                                    type: "product", "name": "ДП Пюре конс фр АгушаЯСАМ яб-пер 0% 1х10х90г DoyР",
                                    "level4": "АГУША Я САМ",
                                    "level5": "ЯБЛОКО, ПЕРСИК",
                                    "level6": "ДОЙ-ПАК",
                                    "level7": "90 Г"
                                },
                                {
                                    "id": 357,
                                    type: "product", "name": "ДП Пюре фр Агуша Я САМ! груша 0% 1х10х90г Doy-pack",
                                    "level4": "АГУША Я САМ",
                                    "level5": "ГРУША",
                                    "level6": "ДОЙ-ПАК",
                                    "level7": "90 Г"
                                },
                                {
                                    "id": 358,
                                    type: "product", "name": "ДП Пюре фр Агуша ЯСАМ! ябл-бан-печ 1х10х90г ДойПак",
                                    "level4": "АГУША Я САМ",
                                    "level5": "ЯБЛОКО, БАНАН, ПЕЧЕНЬЕ",
                                    "level6": "ДОЙ-ПАК",
                                    "level7": "90 Г"
                                },
                                {
                                    "id": 359,
                                    type: "product", "name": "Пюре Фрукт Агуша Банан 90г х10 ДойП ДП",
                                    "level4": "АГУША",
                                    "level5": "БАНАН",
                                    "level6": "ДОЙ-ПАК",
                                    "level7": "90 г"
                                },
                                {
                                    "id": 360,
                                    type: "product", "name": "Пюре фрукт Агуша Груш-Ябл 6х2х115г Кластер",
                                    "level4": "АГУША",
                                    "level5": "ГРУША-ЯБЛОКО",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "115 г"
                                },
                                {
                                    "id": 361,
                                    type: "product", "name": "Пюре Фрукт Агуша Груша 115г х12 СБн ДП Промо",
                                    "level4": "АГУША",
                                    "level5": "ГРУША",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "115 г"
                                },
                                {
                                    "id": 362,
                                    type: "product", "name": "Пюре Фрукт Агуша Груша 115г х2 х6 МП СБн ДП",
                                    "level4": "АГУША",
                                    "level5": "ГРУША",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "115 г"
                                },
                                {
                                    "id": 363,
                                    type: "product", "name": "Пюре Фрукт Агуша Груша 200г х8 СБн ДП Промо",
                                    "level4": "АГУША",
                                    "level5": "ГРУША",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "200 г"
                                },
                                {
                                    "id": 364,
                                    type: "product", "name": "Пюре Фрукт Агуша Груша 90г х10 ДойП ДП",
                                    "level4": "АГУША",
                                    "level5": "ГРУША",
                                    "level6": "ДОЙ-ПАК",
                                    "level7": "90 г"
                                },
                                {
                                    "id": 365,
                                    type: "product", "name": "Пюре Фрукт Агуша Груша Ябл 115г х12 СБн ДП Промо",
                                    "level4": "АГУША",
                                    "level5": "ГРУША-ЯБЛОКО",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "115 г"
                                },
                                {
                                    "id": 366,
                                    type: "product", "name": "Пюре Фрукт Агуша Ябл Банан 115г х12 СБн ДП Промо",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-БАНАН",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "115 г"
                                },
                                {
                                    "id": 367,
                                    type: "product", "name": "Пюре Фрукт Агуша Ябл Банан 115г х2 х6 МП СБн ДП",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-БАНАН",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "115 г"
                                },
                                {
                                    "id": 368,
                                    type: "product", "name": "Пюре Фрукт Агуша Ябл Банан 200г х8 СБн ДП Промо",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-БАНАН",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "200 г"
                                },
                                {
                                    "id": 369,
                                    type: "product", "name": "Пюре Фрукт Агуша Ябл Груша 200г х8 СБн ДП Промо",
                                    "level4": "АГУША",
                                    "level5": "ГРУША-ЯБЛОКО",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "200 г"
                                },
                                {
                                    "id": 370,
                                    type: "product", "name": "Пюре Фрукт Агуша Ябл КусЯбл 105г х2 х6 МП СБн ДП",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "105 г"
                                },
                                {
                                    "id": 371,
                                    type: "product", "name": "Пюре Фрукт Агуша Ябл Персик 115г х12 СБн ДП Промо",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-ПЕРСИК",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "115 г"
                                },
                                {
                                    "id": 372,
                                    type: "product", "name": "Пюре Фрукт Агуша Ябл Персик 115г х2 х6 МП СБн ДП",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-ПЕРСИК",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "115 г"
                                },
                                {
                                    "id": 373,
                                    type: "product", "name": "Пюре Фрукт Агуша Ябл Персик 90г х10 ДойП ДП",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-ПЕРСИК",
                                    "level6": "ДОЙ-ПАК",
                                    "level7": "90 г"
                                },
                                {
                                    "id": 374,
                                    type: "product", "name": "Пюре Фрукт Агуша Ябл с КусЯбл 105гх12 СБн ДП Промо",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "105 г"
                                },
                                {
                                    "id": 375,
                                    type: "product", "name": "Пюре Фрукт Агуша ЯблГруш КусЯбл 105гх2х6 МП СБн ДП",
                                    "level4": "АГУША",
                                    "level5": "ГРУША-ЯБЛОКО",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "105 г"
                                },
                                {
                                    "id": 376,
                                    type: "product", "name": "Пюре Фрукт Агуша ЯблГруш с КусЯбл 105г х12 СБн ДП",
                                    "level4": "АГУША",
                                    "level5": "ГРУША-ЯБЛОКО",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "105 г"
                                },
                                {
                                    "id": 377,
                                    type: "product", "name": "Пюре Фрукт Агуша ЯблГрушБанПер 115гх12СБн ДП Промо",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО, ГРУША, БАНАН, ПЕРСИК",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "115 г"
                                },
                                {
                                    "id": 378,
                                    type: "product", "name": "Пюре Фрукт Агуша Яблоко 115г х12 СБн ДП Промо",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "115 г"
                                },
                                {
                                    "id": 379,
                                    type: "product", "name": "Пюре Фрукт Агуша Яблоко 115г х2 х6 МП СБн ДП",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "115 г"
                                },
                                {
                                    "id": 380,
                                    type: "product", "name": "Пюре Фрукт Агуша Яблоко 200г х2 х4 МП СБн ДП",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "200 г"
                                },
                                {
                                    "id": 381,
                                    type: "product", "name": "Пюре Фрукт Агуша Яблоко 200г х2 х4 МП СБн ДП",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "200 г"
                                },
                                {
                                    "id": 382,
                                    type: "product", "name": "Пюре Фрукт Агуша Яблоко 200г х8 СБн ДП Промо",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "200 г"
                                },
                                {
                                    "id": 383,
                                    type: "product", "name": "Пюре Фрукт Агуша Яблоко 90г х10 ДойП ДП",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО",
                                    "level6": "ДОЙ-ПАК",
                                    "level7": "90 г"
                                },
                                {
                                    "id": 384,
                                    type: "product", "name": "Пюре Фрукт Агуша Яблоко с КусЯбл 105г х12 СБн ДП",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "105 г"
                                },
                                {
                                    "id": 385,
                                    type: "product", "name": "Пюре Фрукт Агуша ЯблПерс КусЯбл 190гх2х4 МП СБн ДП",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-ПЕРСИК",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "190 г"
                                },
                                {
                                    "id": 386,
                                    type: "product", "name": "Пюре Фрукт Агуша ЯблПерс с КусЯбл190гх8СБн ДППромо",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-ПЕРСИК",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "190 г"
                                },
                                {
                                    "id": 387,
                                    type: "product", "name": "Пюре Фрукт Агуша ЯблПерсик с КусЯбл 190г х8 СБн ДП",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-ПЕРСИК",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "190 г"
                                },
                                {
                                    "id": 388,
                                    type: "product", "name": "Пюре Фрукт АгушаЯблГруш с КусЯбл105гх12СБн ДППромо",
                                    "level4": "АГУША",
                                    "level5": "ГРУША-ЯБЛОКО",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "105 г"
                                },
                                {
                                    "id": 389,
                                    type: "product", "name": "Пюре Фрукт АгушаЯСам МультФр 90г х10 ДойП ДП",
                                    "level4": "АГУША Я САМ",
                                    "level5": "МУЛЬТИФРУКТ",
                                    "level6": "ДОЙ-ПАК",
                                    "level7": "90 Г"
                                },
                                {
                                    "id": 390,
                                    type: "product", "name": "Пюре Фрукт АгушаЯСам Ябл Бан Печен 90гх10 ДойП ДП",
                                    "level4": "АГУША Я САМ",
                                    "level5": "ЯБЛОКО, БАНАН, ПЕЧЕНЬЕ",
                                    "level6": "ДОЙ-ПАК",
                                    "level7": "90 Г"
                                },
                                {
                                    "id": 391,
                                    type: "product", "name": "ДП Пюре фр Агуша Ябл-бан-печ 90г х10 пауч-пак",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО, БАНАН, ПЕЧЕНЬЕ",
                                    "level6": "ДОЙ-ПАК",
                                    "level7": "90 г"
                                },
                                {
                                    "id": 392,
                                    type: "product", "name": "ДП Пюре фр Агуша ЯблЕжевикаМал 90г PouchPack 10Х",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО, ЕЖЕВИКА, МАЛИНА",
                                    "level6": "ДОЙ-ПАК",
                                    "level7": "90 Г"
                                },
                                {
                                    "id": 393,
                                    type: "product", "name": "ДП Пюре фр Агуша ЯблКлубнМалина 90г PouchPack 10Х",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО, КЛУБНИКА, МАЛИНА",
                                    "level6": "ДОЙ-ПАК",
                                    "level7": "90 Г"
                                },
                                {
                                    "id": 394,
                                    type: "product", "name": "ДП Пюре фр Агуша ЯблМалШипов 90г PouchPack 10Х",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО, МАЛИНА, ШИПОВНИК",
                                    "level6": "ДОЙ-ПАК",
                                    "level7": "90 Г"
                                },
                                {
                                    "id": 395,
                                    type: "product", "name": "ДП Пюре фрукт Агуша Банан 90г х10 пауч-пак",
                                    "level4": "АГУША",
                                    "level5": "БАНАН",
                                    "level6": "ДОЙ-ПАК",
                                    "level7": "90 г"
                                },
                                {
                                    "id": 396,
                                    type: "product", "name": "ДП Пюре фрукт Агуша Груша 90г х10 пауч пак",
                                    "level4": "АГУША",
                                    "level5": "ГРУША",
                                    "level6": "ДОЙ-ПАК",
                                    "level7": "90 г"
                                },
                                {
                                    "id": 397,
                                    type: "product", "name": "ДП Пюре фрукт Агуша Мультифрукт 90г х10 пауч-пак",
                                    "level4": "АГУША",
                                    "level5": "МУЛЬТИФРУКТ",
                                    "level6": "ДОЙ-ПАК",
                                    "level7": "90 г"
                                },
                                {
                                    "id": 398,
                                    type: "product", "name": "ДП Пюре фрукт Агуша Ябл-персик 90г х10 пауч-пак",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-ПЕРСИК",
                                    "level6": "ДОЙ-ПАК",
                                    "level7": "90 г"
                                },
                                {
                                    "id": 399,
                                    type: "product", "name": "ДП Пюре фрукт Агуша Яблоко 90г пауч-пак IMA 10Х",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО",
                                    "level6": "ДОЙ-ПАК",
                                    "level7": "90 г"
                                },
                                {
                                    "id": 400,
                                    type: "product", "name": "ДП Пюре фрукт Агуша Яблоко 90г х10 пауч-пак",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО",
                                    "level6": "ДОЙ-ПАК",
                                    "level7": "90 г"
                                },
                                {
                                    "id": 401,
                                    type: "product", "name": "Пюре фрук Агуша Красн и черн.смород 115г х12 СБн",
                                    "level4": "АГУША",
                                    "level5": "СМОРОДИНА ЧЕРНАЯ-СМОРОДИНА КРАСНАЯ",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "115 Г"
                                },
                                {
                                    "id": 402,
                                    type: "product", "name": "Пюре Фрукт Агуша Груша 115г х12 СБн ДП",
                                    "level4": "АГУША",
                                    "level5": "ГРУША",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "115 г"
                                },
                                {
                                    "id": 403,
                                    type: "product", "name": "Пюре Фрукт Агуша Груша 200г х8 СБн ДП",
                                    "level4": "АГУША",
                                    "level5": "ГРУША",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "200 г"
                                },
                                {
                                    "id": 404,
                                    type: "product", "name": "Пюре Фрукт Агуша Груша Ябл 115г х12 СБн ДП",
                                    "level4": "АГУША",
                                    "level5": "ГРУША-ЯБЛОКО",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "115 г"
                                },
                                {
                                    "id": 405,
                                    type: "product", "name": "Пюре фрукт Агуша Ябл-Черника-Вишня 115г х12 СБн",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-ЧЕРНИКА-ВИШНЯ",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "115 Г"
                                },
                                {
                                    "id": 406,
                                    type: "product", "name": "Пюре Фрукт Агуша Ябл Банан 115г х12 СБн ДП",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-БАНАН",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "115 г"
                                },
                                {
                                    "id": 407,
                                    type: "product", "name": "Пюре Фрукт Агуша Ябл Банан 200г х8 СБн ДП",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-БАНАН",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "200 г"
                                },
                                {
                                    "id": 408,
                                    type: "product", "name": "Пюре Фрукт Агуша Ябл Груша 200г х8 СБн ДП",
                                    "level4": "АГУША",
                                    "level5": "ГРУША-ЯБЛОКО",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "200 г"
                                },
                                {
                                    "id": 409,
                                    type: "product", "name": "Пюре Фрукт Агуша Ябл Персик 115г х12 СБн ДП",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-ПЕРСИК",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "115 г"
                                },
                                {
                                    "id": 410,
                                    type: "product", "name": "Пюре Фрукт Агуша ЯблГрушБанПер 0% 115г х12 СБн ДП",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО, ГРУША, БАНАН, ПЕРСИК",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "115 г"
                                },
                                {
                                    "id": 411,
                                    type: "product", "name": "Пюре фрукт Агуша Яблоко-Абрикос 115г х12 СБн",
                                    "level4": "АГУША",
                                    "level5": "АБРИКОС-ЯБЛОКО",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "115 Г"
                                },
                                {
                                    "id": 412,
                                    type: "product", "name": "Пюре фрукт Агуша Яблоко-Груша-Перс 115г х12 СБн",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО-ГРУША-ПЕРСИК",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "115 Г"
                                },
                                {
                                    "id": 413,
                                    type: "product", "name": "Пюре Фрукт Агуша Яблоко 115г х12 СБн ДП",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "115 г"
                                },
                                {
                                    "id": 414,
                                    type: "product", "name": "Пюре Фрукт Агуша Яблоко 200г х8 СБн ДП",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО",
                                    "level6": "СТЕКЛЯННАЯ БАНКА",
                                    "level7": "200 г"
                                },
                                {
                                    "id": 415,
                                    type: "product", "name": "ПюреФр Агуша ЯблКлубЗемлКлюк 65мл TCASL 16Х",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО, КЛУБНИКА, ЗЕМЛЯНИКА, КЛЮКВА",
                                    "level6": "ТЕТРА КЛАССИК АСЕПТИК СЛИМ",
                                    "level7": "65 МЛ"
                                },
                                {
                                    "id": 416,
                                    type: "product", "name": "ПюреФр Агуша ЯблСморЧернЕжевика 65мл TCASL 16Х",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО, ЧЕРНАЯ СМОРОДИНА, ЕЖЕВИКА",
                                    "level6": "ТЕТРА КЛАССИК АСЕПТИК СЛИМ",
                                    "level7": "65 МЛ"
                                },
                                {
                                    "id": 417,
                                    type: "product", "name": "ПюреФр Агуша ЯблЧерникШиповн 65мл TCASL 16Х",
                                    "level4": "АГУША",
                                    "level5": "ЯБЛОКО, ЧЕРНИКА, ШИПОВНИК",
                                    "level6": "ТЕТРА КЛАССИК АСЕПТИК СЛИМ",
                                    "level7": "65 МЛ"
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "id": 418,
            "name": "Молочные Продукты",
            "level": 0, type: "nodes",
            "nodes": [
                {
                    "id": 419,
                    "name": "Жидкие Молочные Десерты",
                    "level": 1, type: "nodes",
                    "nodes": [
                        {
                            "id": 420,
                            "name": "Молочный Коктейль",
                            "level": 2, type: "products",
                            "products": [
                                {
                                    "id": 421,
                                    type: "product", "name": "Кокт Мол стерил Чудо Коллекц Глясе 0.1% 0.2лх27 СЛ",
                                    "level4": "ЧУДО",
                                    "level5": "ГЛЯСЕ",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "200 МЛ"
                                },
                                {
                                    "id": 422,
                                    type: "product", "name": "Кокт Мол стерил Чудо Коллекц Капуч 0.1% 0.2лх27 СЛ",
                                    "level4": "ЧУДО",
                                    "level5": "КАПУЧИНО",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "200 МЛ"
                                },
                                {
                                    "id": 423,
                                    type: "product", "name": "Кокт Мол стерил ЧудоДетки Клуб 3.2% 200млх27 БЗ ДП",
                                    "level4": "ЧУДО ДЕТКИ",
                                    "level5": "КЛУБНИКА",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 424,
                                    type: "product", "name": "Кокт Мол стерил ЧудоДетки Шок 2.5%200мл х27 БЗ ДП",
                                    "level4": "ЧУДО ДЕТКИ",
                                    "level5": "ШОКОЛАД",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 425,
                                    type: "product", "name": "Кокт Мол стерил ЧудоДетки Шок 2.5%900мл х12 ТБА ДП",
                                    "level4": "ЧУДО ДЕТКИ",
                                    "level5": "ШОКОЛАД",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "900 мл"
                                },
                                {
                                    "id": 426,
                                    type: "product", "name": "Коктейль аром Чудо ваниль 2% 1х12х950г",
                                    "level4": "ЧУДО",
                                    "level5": "ВАНИЛЬ",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 427,
                                    type: "product", "name": "Микс: КоктМол Чудо Клуб,Вани 2% 0.2л Слим (кор)",
                                    "level4": "ЧУДО",
                                    "level5": "АССОРТИ",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "200 МЛ"
                                },
                                {
                                    "id": 428,
                                    type: "product", "name": "Микс:КоктМолЧудоШокМолШокБелБанКар3% 0.2л СЛ (кор)",
                                    "level4": "ЧУДО",
                                    "level5": "АССОРТИ",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "200 МЛ"
                                },
                                {
                                    "id": 429,
                                    type: "product", "name": "Молоко аром Чудо бан-кар 2% 1х18х0.2л TBAS",
                                    "level4": "ЧУДО",
                                    "level5": "БАНАН-КАРАМЕЛЬ",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 430,
                                    type: "product", "name": "Молоко аром Чудо бан-кар 2% 1х27х0.2л TBAS",
                                    "level4": "ЧУДО",
                                    "level5": "БАНАН-КАРАМЕЛЬ",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 431,
                                    type: "product", "name": "Кокт мол стер Чудо банан-карам 2% 0.2л TBAS 27Х",
                                    "level4": "ЧУДО",
                                    "level5": "БАНАН-КАРАМЕЛЬ",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 432,
                                    type: "product", "name": "Кокт мол стер Чудо Ваниль 2% 0.2л TBASl 27Х",
                                    "level4": "ЧУДО",
                                    "level5": "ВАНИЛЬ",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 433,
                                    type: "product", "name": "Кокт мол стер Чудо Ваниль 2% 0.2л TBASl 27Х",
                                    "level4": "ЧУДО",
                                    "level5": "ВАНИЛЬ",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 434,
                                    type: "product", "name": "Кокт мол стер Чудо Клубника 2% 0.2л ТВАSl 27Х",
                                    "level4": "ЧУДО",
                                    "level5": "КЛУБНИКА",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 435,
                                    type: "product", "name": "Кокт мол стер ЧудоДетки Шокол 2.5% 200мл х18 TBA",
                                    "level4": "ЧУДО ДЕТКИ",
                                    "level5": "ШОКОЛАД",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 436,
                                    type: "product", "name": "Кокт Мол стерил Чудо Банан Карамель 2% 0.2л х27 СЛ",
                                    "level4": "ЧУДО",
                                    "level5": "БАНАН-КАРАМЕЛЬ",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 437,
                                    type: "product", "name": "Кокт Мол стерил Чудо Банан Карамель 2% 960г х12 СЛ",
                                    "level4": "ЧУДО",
                                    "level5": "БАНАН-КАРАМЕЛЬ",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "960 г"
                                },
                                {
                                    "id": 438,
                                    type: "product", "name": "Кокт Мол стерил Чудо Белый Шоколад 3% 0.2л х27 СЛ",
                                    "level4": "ЧУДО",
                                    "level5": "ШОКОЛАД БЕЛЫЙ",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 439,
                                    type: "product", "name": "Кокт Мол стерил Чудо Ваниль 2% 0.2л х27 СЛ",
                                    "level4": "ЧУДО",
                                    "level5": "ВАНИЛЬ",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 440,
                                    type: "product", "name": "Кокт Мол стерил Чудо Ваниль 2% 960г х12 СЛ",
                                    "level4": "ЧУДО",
                                    "level5": "ВАНИЛЬ",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "960 г"
                                },
                                {
                                    "id": 441,
                                    type: "product", "name": "Кокт Мол стерил Чудо взб Ваниль 5% 950г х12 СЛ",
                                    "level4": "ЧУДО",
                                    "level5": "ВАНИЛЬ",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 442,
                                    type: "product", "name": "Кокт Мол стерил Чудо взб Клуб 5% 950г х12 СЛ",
                                    "level4": "ЧУДО",
                                    "level5": "КЛУБНИКА",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 443,
                                    type: "product", "name": "Кокт Мол стерил Чудо Клуб 2% 0.2л х18 СЛ",
                                    "level4": "ЧУДО",
                                    "level5": "КЛУБНИКА",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 444,
                                    type: "product", "name": "Кокт Мол стерил Чудо Клуб 2% 0.2л х27 СЛ",
                                    "level4": "ЧУДО",
                                    "level5": "КЛУБНИКА",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 445,
                                    type: "product", "name": "Кокт Мол стерил Чудо Клуб 2% 950г х8 ПЭТ",
                                    "level4": "ЧУДО",
                                    "level5": "КЛУБНИКА",
                                    "level6": "ПЭТ",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 446,
                                    type: "product", "name": "Кокт Мол стерил Чудо Клуб 2% 960г х12 СЛ",
                                    "level4": "ЧУДО",
                                    "level5": "КЛУБНИКА",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "960 г"
                                },
                                {
                                    "id": 447,
                                    type: "product", "name": "Кокт Мол стерил Чудо Молоч Шоколад 3% 0.2л х27 СЛ",
                                    "level4": "ЧУДО",
                                    "level5": "ШОКОЛАД МОЛОЧНЫЙ",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 448,
                                    type: "product", "name": "Кокт Мол стерил Чудо Шоколад 2% 950г х8 ПЭТ",
                                    "level4": "ЧУДО",
                                    "level5": "ШОКОЛАД",
                                    "level6": "ПЭТ",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 449,
                                    type: "product", "name": "Кокт Мол стерил Чудо Шоколад 2% 960г х12 СЛ",
                                    "level4": "ЧУДО",
                                    "level5": "ШОКОЛАД",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "960 г"
                                },
                                {
                                    "id": 450,
                                    type: "product", "name": "Кокт Мол стерил Чудо Шоколад 3% 0.2л х27 СЛ",
                                    "level4": "ЧУДО",
                                    "level5": "ШОКОЛАД",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 451,
                                    type: "product", "name": "Кокт Мол стерил ЧудоДетки Клуб 3.2% 200млх18 БЗ ДП",
                                    "level4": "ЧУДО ДЕТКИ",
                                    "level5": "КЛУБНИКА",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 452,
                                    type: "product", "name": "Кокт Мол ультрап Чудо Ваниль 2% 270г х8 ПЭТ",
                                    "level4": "ЧУДО",
                                    "level5": "ВАНИЛЬ",
                                    "level6": "ПЭТ",
                                    "level7": "270 г"
                                },
                                {
                                    "id": 453,
                                    type: "product", "name": "Кокт Мол ультрап Чудо Клуб 2% 270г х8 ПЭТ",
                                    "level4": "ЧУДО",
                                    "level5": "КЛУБНИКА",
                                    "level6": "ПЭТ",
                                    "level7": "270 г"
                                },
                                {
                                    "id": 454,
                                    type: "product", "name": "Кокт Мол ультрап Чудо Шоколад 2% 270г х8 ПЭТ",
                                    "level4": "ЧУДО",
                                    "level5": "ШОКОЛАД",
                                    "level6": "ПЭТ",
                                    "level7": "270 г"
                                },
                                {
                                    "id": 455,
                                    type: "product", "name": "Кокт Мол ультрап ЧудоДетки Клуб 3.2% 255млх8ПЭТ ДП",
                                    "level4": "ЧУДО ДЕТКИ",
                                    "level5": "КЛУБНИКА",
                                    "level6": "ПЭТ",
                                    "level7": "260 мл"
                                },
                                {
                                    "id": 456,
                                    type: "product", "name": "Кокт Мол ультрап ЧудоДетки Шок 2.5% 255млх8 ПЭТ ДП",
                                    "level4": "ЧУДО ДЕТКИ",
                                    "level5": "ШОКОЛАД",
                                    "level6": "ПЭТ",
                                    "level7": "255 мл"
                                },
                                {
                                    "id": 457,
                                    type: "product", "name": "КоктМолоч Чудо МорожЯгодн 2% 960г TBASl 12Х",
                                    "level4": "ЧУДО",
                                    "level5": "ЯГОДНОЕ МОРОЖЕНОЕ",
                                    "level6": "ТЕТРА СЛИМ",
                                    "level7": "960 Г"
                                },
                                {
                                    "id": 458,
                                    type: "product", "name": "КоктМолоч Чудо МорожЯгодное 2% 200мл TBASl 27Х",
                                    "level4": "ЧУДО",
                                    "level5": "ЯГОДНОЕ МОРОЖЕНОЕ",
                                    "level6": "ТЕТРА СЛИМ",
                                    "level7": "200 МЛ"
                                },
                                {
                                    "id": 459,
                                    type: "product", "name": "КоктМолоч Чудо МорожЯгодное 2% 950г ПЭТ 8Х",
                                    "level4": "ЧУДО",
                                    "level5": "ЯГОДНОЕ МОРОЖЕНОЕ",
                                    "level6": "ПЭТ",
                                    "level7": "950 Г"
                                },
                                {
                                    "id": 460,
                                    type: "product", "name": "КоктМолСтер Чудо  Клубника 3.2% 200мл Base 18Х",
                                    "level4": "ЧУДО",
                                    "level5": "КЛУБНИКА",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 МЛ"
                                },
                                {
                                    "id": 461,
                                    type: "product", "name": "КоктМолСтер Чудо ПломбирВанил 2.5% 200мл ТВА 18Х",
                                    "level4": "ЧУДО",
                                    "level5": "ПЛОМБИР ВАНИЛЬНЫЙ",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 МЛ"
                                },
                                {
                                    "id": 462,
                                    type: "product", "name": "КоктМолСтер Чудо Шоколад 2.5% 200мл Base 18Х",
                                    "level4": "ЧУДО",
                                    "level5": "ШОКОЛАД",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 МЛ"
                                },
                                {
                                    "id": 463,
                                    type: "product", "name": "КоктМолСтер ЧудоДет ПеченьеБан 2.5%200мл ТБАБ 18Х",
                                    "level4": "ЧУДО ДЕТКИ",
                                    "level5": "БАНАН И ПЕЧЕНЬЕ",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 МЛ"
                                },
                                {
                                    "id": 464,
                                    type: "product", "name": "КоктМолСтер ЧудоДет ПломбВанильн 2.5% 200млТВА 18Х",
                                    "level4": "ЧУДО ДЕТКИ",
                                    "level5": "ПЛОМБИР ВАНИЛЬНЫЙ",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 МЛ"
                                },
                                {
                                    "id": 465,
                                    type: "product", "name": "Молоко аром Чудо ваниль 2% 1х18х0.2л TBAS",
                                    "level4": "ЧУДО",
                                    "level5": "ВАНИЛЬ",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 466,
                                    type: "product", "name": "Чудо молочное Шоколад 3% 1х6х950г ПЭТ",
                                    "level4": "ЧУДО",
                                    "level5": "ШОКОЛАД",
                                    "level6": "ПЭТ",
                                    "level7": "950 г"
                                }
                            ]
                        },
                        {
                            "id": 467,
                            "name": "Сок С Молоком",
                            "level": 2, type: "products",
                            "products": [
                                {
                                    "id": 468,
                                    type: "product", "name": "Нап сывмол Мажитель Party ПинаКол 0.04% 0.25лх24ПЗ",
                                    "level4": "МАЖИТЭЛЬ",
                                    "level5": "ПИНА-КОЛАДА",
                                    "level6": "ТЕТРА ПАК ПРИЗМА",
                                    "level7": "250 мл"
                                },
                                {
                                    "id": 469,
                                    type: "product", "name": "Нап сывмол Мажитель Party ПинаКол 0.05% 0.25лх24ПЗ",
                                    "level4": "МАЖИТЭЛЬ",
                                    "level5": "ПИНА-КОЛАДА",
                                    "level6": "ТЕТРА ПАК ПРИЗМА",
                                    "level7": "250 мл"
                                },
                                {
                                    "id": 470,
                                    type: "product", "name": "Нап сывмол Мажитель Party ПинаКол 0.05% 950гх12 КФ",
                                    "level4": "МАЖИТЭЛЬ",
                                    "level5": "ПИНА-КОЛАДА",
                                    "level6": "ТЕТРА ПАК СКУЭР",
                                    "level7": "950 Г"
                                },
                                {
                                    "id": 471,
                                    type: "product", "name": "Нап сывмол Мажитель Party Пинакол 0.04% 950гх12 КФ",
                                    "level4": "МАЖИТЭЛЬ",
                                    "level5": "ПИНА-КОЛАДА",
                                    "level6": "ТЕТРА ПАК ПРИЗМА",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 472,
                                    type: "product", "name": "Нап сывмол Мажитель Груша Манго 0.05% 950г х12 КФ",
                                    "level4": "МАЖИТЭЛЬ",
                                    "level5": "ГРУША-МАНГО",
                                    "level6": "ТЕТРА ПАК ПРИЗМА",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 473,
                                    type: "product", "name": "Нап сывмол Мажитель Клуб 0.05% 950г х12 КФ",
                                    "level4": "МАЖИТЭЛЬ",
                                    "level5": "КЛУБНИКА",
                                    "level6": "ТЕТРА ПАК ПРИЗМА",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 474,
                                    type: "product", "name": "Нап сывмол Мажитель МультФр 0.05% 950г х12 КФ",
                                    "level4": "МАЖИТЭЛЬ",
                                    "level5": "МУЛЬТИФРУКТ",
                                    "level6": "ТЕТРА ПАК ПРИЗМА",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 475,
                                    type: "product", "name": "Нап сывмол Мажитель Перс Марк 0.05% 950г х12 КФ",
                                    "level4": "МАЖИТЭЛЬ",
                                    "level5": "ПЕРСИК-МАРАКУЙЯ",
                                    "level6": "ТЕТРА ПАК ПРИЗМА",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 476,
                                    type: "product", "name": "Нап сывмол Мажитэль Клуб 0.05% 0.25л х24 ПЗ",
                                    "level4": "МАЖИТЭЛЬ",
                                    "level5": "КЛУБНИКА",
                                    "level6": "ТЕТРА ПАК ПРИЗМА",
                                    "level7": "250 мл"
                                },
                                {
                                    "id": 477,
                                    type: "product", "name": "Нап сывмол Мажитэль МультФр 0.05% 0.25л х24 ПЗ",
                                    "level4": "МАЖИТЭЛЬ",
                                    "level5": "МУЛЬТИФРУКТ",
                                    "level6": "ТЕТРА ПАК ПРИЗМА",
                                    "level7": "250 мл"
                                },
                                {
                                    "id": 478,
                                    type: "product", "name": "Нап сывмол Мажитэль Перс Марк 0.05% 0.25л х24 ПЗ",
                                    "level4": "МАЖИТЭЛЬ",
                                    "level5": "ПЕРСИК-МАРАКУЙЯ",
                                    "level6": "ТЕТРА ПАК ПРИЗМА",
                                    "level7": "250 мл"
                                },
                                {
                                    "id": 479,
                                    type: "product", "name": "НапСыворМол Мажитэль ЧерникЗемл 0.05% 950г CF 12Х",
                                    "level4": "МАЖИТЭЛЬ",
                                    "level5": "ЧЕРНИКА И ЗЕМЛЯНИКА",
                                    "level6": "ТЕТРА ПРИЗМА",
                                    "level7": "950 Г"
                                }
                            ]
                        },
                        {
                            "id": 480,
                            "name": "Сок С Сывороткой",
                            "level": 2, type: "products",
                            "products": [
                                {
                                    "id": 481,
                                    type: "product", "name": "НапитСыворот МажитJ7 Мультифрукт 0.04% 950г ПЭТ 8Х",
                                    "level4": "МАЖИТЭЛЬ ДЖЕЙ7",
                                    "level5": "СМЕСЬ ФРУКТОВ",
                                    "level6": "ПЭТ",
                                    "level7": "950 Г"
                                },
                                {
                                    "id": 482,
                                    type: "product", "name": "Нап сыв/сок МажитJ7 ГрейпфЛимАпел 0.04%950г ПЭТ 8Х",
                                    "level4": "МАЖИТЭЛЬ ДЖЕЙ7",
                                    "level5": "ГРЕЙПФРУТ, ЛИМОН, АПЕЛЬСИН",
                                    "level6": "ПЭТ",
                                    "level7": "950 Г"
                                },
                                {
                                    "id": 483,
                                    type: "product", "name": "Нап сывор Мажитель J7 Ананас Манго 0.03% 270гх8ПЭТ",
                                    "level4": "МАЖИТЭЛЬ ДЖЕЙ7",
                                    "level5": "АНАНАС, МАНГО",
                                    "level6": "ПЭТ",
                                    "level7": "270 Г"
                                },
                                {
                                    "id": 484,
                                    type: "product", "name": "Нап сывор Мажитель J7 Ананас Манго 0.03% 950гх8ПЭТ",
                                    "level4": "МАЖИТЭЛЬ ДЖЕЙ7",
                                    "level5": "АНАНАС, МАНГО",
                                    "level6": "ПЭТ",
                                    "level7": "950 Г"
                                },
                                {
                                    "id": 485,
                                    type: "product", "name": "Нап сывор Мажитель J7 Арбуз Дыня 0.03% 270г х8 ПЭТ",
                                    "level4": "МАЖИТЭЛЬ ДЖЕЙ7",
                                    "level5": "ДЫНЯ, АРБУЗ",
                                    "level6": "ПЭТ",
                                    "level7": "270 Г"
                                },
                                {
                                    "id": 486,
                                    type: "product", "name": "Нап сывор Мажитель J7 Арбуз Дыня 0.03% 950г х8 ПЭТ",
                                    "level4": "МАЖИТЭЛЬ ДЖЕЙ7",
                                    "level5": "ДЫНЯ, АРБУЗ",
                                    "level6": "ПЭТ",
                                    "level7": "950 Г"
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": 487,
                    "name": "Йогурты",
                    "level": 1, type: "nodes",
                    "nodes": [
                        {
                            "id": 488,
                            "name": "Йогурт Вязкий Живой",
                            "level": 2, type: "products",
                            "products": [
                                {
                                    "id": 489,
                                    type: "product", "name": "Биойг с нап БиоМакс ОтрубиЗлаки 2.6% 125г х24 Четв",
                                    "level4": "БИО-МАХ",
                                    "level5": "ОТРУБИ-ЗЛАКИ",
                                    "level6": "ЖЕСТКИЙ ПЛАСТИКОВЫЙ СТАКАНЧИК",
                                    "level7": "125 г"
                                },
                                {
                                    "id": 490,
                                    type: "product", "name": "Биойогурт Классич БиоМакс 3.2% 125г х24 Четв",
                                    "level4": "БИО-МАХ",
                                    "level5": "",
                                    "level6": "ЖЕСТКИЙ ПЛАСТИКОВЫЙ СТАКАНЧИК",
                                    "level7": "125 г"
                                },
                                {
                                    "id": 491,
                                    type: "product", "name": "Биойогурт фрук БиоМакс Клубника 2.6% 125г х24 Четв",
                                    "level4": "БИО-МАХ",
                                    "level5": "КЛУБНИКА",
                                    "level6": "ЖЕСТКИЙ ПЛАСТИКОВЫЙ СТАКАНЧИК",
                                    "level7": "125 г"
                                },
                                {
                                    "id": 492,
                                    type: "product", "name": "Биойогурт Фрукт БиоМакс Персик 2.5% 125г х24 Четв",
                                    "level4": "БИО-МАХ",
                                    "level5": "ПЕРСИК",
                                    "level6": "ЖЕСТКИЙ ПЛАСТИКОВЫЙ СТАКАНЧИК",
                                    "level7": "125 г"
                                },
                                {
                                    "id": 493,
                                    type: "product", "name": "Биойогурт Фрукт БиоМакс Черн 2.5% 125г х24 Четв",
                                    "level4": "БИО-МАХ",
                                    "level5": "ЧЕРНИКА",
                                    "level6": "ЖЕСТКИЙ ПЛАСТИКОВЫЙ СТАКАНЧИК",
                                    "level7": "125 г"
                                },
                                {
                                    "id": 494,
                                    type: "product", "name": "Биойогурт БиоМакс Отруби Злак 2.5% 115г х12 Ван",
                                    "level4": "БИО-МАХ",
                                    "level5": "ОТРУБИ-ЗЛАКИ",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "115 Г"
                                },
                                {
                                    "id": 495,
                                    type: "product", "name": "Биойогурт БиоМакс Отруби Злак 2.5%150г х12Ван",
                                    "level4": "БИО-МАХ",
                                    "level5": "ОТРУБИ-ЗЛАКИ",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "150 Г"
                                },
                                {
                                    "id": 496,
                                    type: "product", "name": "Биойогурт Натур БиоМакс 3.1% 115г х12 Ван",
                                    "level4": "БИО-МАХ",
                                    "level5": "",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "115 Г"
                                },
                                {
                                    "id": 497,
                                    type: "product", "name": "Биойогурт Натур БиоМакс 3.1% 115г х12 Ван +10%",
                                    "level4": "БИО-МАХ",
                                    "level5": "",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "127 Г"
                                },
                                {
                                    "id": 498,
                                    type: "product", "name": "Биойогурт фрук BioMax Лесн ягоды 2.6% 290г x8 МСТ",
                                    "level4": "БИО-МАХ",
                                    "level5": "ЯГОДЫ ЛЕСНЫЕ",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "290 г"
                                },
                                {
                                    "id": 499,
                                    type: "product", "name": "Биойогурт фрукт BioMax Вишня 2.6% 290г х8 МСТ",
                                    "level4": "БИО-МАХ",
                                    "level5": "ВИШНЯ",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "290 г"
                                },
                                {
                                    "id": 500,
                                    type: "product", "name": "Биойогурт Фрукт БиоМакс Клуб 2.5% 115г х12 Ван",
                                    "level4": "БИО-МАХ",
                                    "level5": "КЛУБНИКА",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "115 г"
                                },
                                {
                                    "id": 501,
                                    type: "product", "name": "Биойогурт Фрукт БиоМакс Клуб 2.5% 115г х12Ван +10%",
                                    "level4": "БИО-МАХ",
                                    "level5": "КЛУБНИКА",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "127 Г"
                                },
                                {
                                    "id": 502,
                                    type: "product", "name": "Биойогурт Фрукт БиоМакс Клуб 2.5% 150г х12 Ван",
                                    "level4": "БИО-МАХ",
                                    "level5": "КЛУБНИКА",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "150 Г"
                                },
                                {
                                    "id": 503,
                                    type: "product", "name": "Йог вяз Чудо Завтрак пер/мюс 2.5% 1х12х180г мст",
                                    "level4": "ЧУДО",
                                    "level5": "ПЕРСИК",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "180 Г"
                                },
                                {
                                    "id": 504,
                                    type: "product", "name": "Йогурт вязкий Фругурт Клубника 2.5% 1х16х250г ванн",
                                    "level4": "ФРУГУРТ",
                                    "level5": "КЛУБНИКА",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "250 Г"
                                },
                                {
                                    "id": 505,
                                    type: "product", "name": "Йогурт Класич Чудо 3.5% 125г х12 Ван",
                                    "level4": "ЧУДО",
                                    "level5": "",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "125 г"
                                },
                                {
                                    "id": 506,
                                    type: "product", "name": "Йогурт с фр на дне Чудо Садов фр 2.5% 125г х12 ван",
                                    "level4": "ЧУДО",
                                    "level5": "ГРУША, ЯБЛОКО, СМОРОДИНА ЧЕРНАЯ",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "125 г"
                                },
                                {
                                    "id": 507,
                                    type: "product", "name": "Йогурт Фрукт Чудо Ананас 2.5% 125г х12 Ван",
                                    "level4": "ЧУДО",
                                    "level5": "АНАНАС",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "125 г"
                                },
                                {
                                    "id": 508,
                                    type: "product", "name": "Йогурт Фрукт Чудо Виш 2.5% 125г х12 Ван",
                                    "level4": "ЧУДО",
                                    "level5": "ВИШНЯ",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "125 г"
                                },
                                {
                                    "id": 509,
                                    type: "product", "name": "Йогурт Фрукт Чудо Виш Череш 2.5% 315г х8 МСТ",
                                    "level4": "ЧУДО",
                                    "level5": "ВИШНЯ-ЧЕРЕШНЯ",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "315 г"
                                },
                                {
                                    "id": 510,
                                    type: "product", "name": "Йогурт Фрукт Чудо Клуб 2.5% 125г х12 Ван",
                                    "level4": "ЧУДО",
                                    "level5": "КЛУБНИКА",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "125 г"
                                },
                                {
                                    "id": 511,
                                    type: "product", "name": "Йогурт Фрукт Чудо Клуб Земл 2.5% 125г х24 Четв",
                                    "level4": "ЧУДО",
                                    "level5": "КЛУБНИКА-ЗЕМЛЯНИКА",
                                    "level6": "ЖЕСТКИЙ ПЛАСТИКОВЫЙ СТАКАНЧИК",
                                    "level7": "125 г"
                                },
                                {
                                    "id": 512,
                                    type: "product", "name": "Йогурт Фрукт Чудо Клуб Земл 2.5% 315г х8 МСТ",
                                    "level4": "ЧУДО",
                                    "level5": "КЛУБНИКА-ЗЕМЛЯНИКА",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "315 Г"
                                },
                                {
                                    "id": 513,
                                    type: "product", "name": "Йогурт Фрукт Чудо Перс Марк 2.5% 125г х24 Четв",
                                    "level4": "ЧУДО",
                                    "level5": "ПЕРСИК-МАРАКУЙЯ",
                                    "level6": "ЖЕСТКИЙ ПЛАСТИКОВЫЙ СТАКАНЧИК",
                                    "level7": "125 г"
                                },
                                {
                                    "id": 514,
                                    type: "product", "name": "Йогурт Фрукт Чудо Перс Марк 2.5% 315г х8 МСТ",
                                    "level4": "ЧУДО",
                                    "level5": "ПЕРСИК-МАРАКУЙЯ",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "315 Г"
                                },
                                {
                                    "id": 515,
                                    type: "product", "name": "Йогурт Фрукт Чудо Черника Мал 2.5% 125г х24 Четв",
                                    "level4": "ЧУДО",
                                    "level5": "ЧЕРНИКА-МАЛИНА",
                                    "level6": "ЖЕСТКИЙ ПЛАСТИКОВЫЙ СТАКАНЧИК",
                                    "level7": "125 г"
                                },
                                {
                                    "id": 516,
                                    type: "product", "name": "Йогурт Фрукт Чудо Черника Мал 2.5% 315г х8 МСТ",
                                    "level4": "ЧУДО",
                                    "level5": "ЧЕРНИКА-МАЛИНА",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "315 г"
                                },
                                {
                                    "id": 517,
                                    type: "product", "name": "Йогур с фр на дне Чудо Северн яг 2.5% 125г х12 ван",
                                    "level4": "ЧУДО",
                                    "level5": "БРУСНИКА, КЛЮКВА, МОРОШКА",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "125 г"
                                },
                                {
                                    "id": 518,
                                    type: "product", "name": "Йогурт BioMax classic 3.2% 125г х24 четв ул.пищ",
                                    "level4": "БИО-МАХ",
                                    "level5": "",
                                    "level6": "ЖЕСТКИЙ ПЛАСТИКОВЫЙ СТАКАНЧИК",
                                    "level7": "125 г"
                                },
                                {
                                    "id": 519,
                                    type: "product", "name": "Йогурт с фр на дне Чудо ВишЧереш 2.5% 125г ван 12Х",
                                    "level4": "ЧУДО",
                                    "level5": "ВИШНЯ-ЧЕРЕШНЯ",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "125 Г"
                                },
                                {
                                    "id": 520,
                                    type: "product", "name": "Йогурт Фрукт БТМ Вишня 2.5% 250г х16 Ван",
                                    "level4": "NON BRANDED",
                                    "level5": "ВИШНЯ",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "250 г"
                                },
                                {
                                    "id": 521,
                                    type: "product", "name": "Йогурт Фрукт БТМ Клуб 2.5% 250г х16 Ван",
                                    "level4": "NON BRANDED",
                                    "level5": "КЛУБНИКА",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "250 г"
                                },
                                {
                                    "id": 522,
                                    type: "product", "name": "Йогурт Фрукт БТМ Персик Марк 2.5% 250г х16 Ван",
                                    "level4": "NON BRANDED",
                                    "level5": "ПЕРСИК, МАРАКУЙЯ",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "250 Г"
                                },
                                {
                                    "id": 523,
                                    type: "product", "name": "Йогурт Фрукт БТМ Персик Марк 2.5% 250г х16 Ван",
                                    "level4": "NON BRANDED",
                                    "level5": "ПЕРСИК, МАРАКУЙЯ",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "250 Г"
                                },
                                {
                                    "id": 524,
                                    type: "product", "name": "Йогурт Фрукт БТМ Черника 2.5% 250г х16 Ван",
                                    "level4": "NON BRANDED",
                                    "level5": "ЧЕРНИКА",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "250 г"
                                },
                                {
                                    "id": 525,
                                    type: "product", "name": "Йогурт Фрукт БТМ Черника 2.5% 250г х16 Ван",
                                    "level4": "NON BRANDED",
                                    "level5": "ЧЕРНИКА",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "250 г"
                                },
                                {
                                    "id": 526,
                                    type: "product", "name": "Йогурт Фрукт на дне Чудо Клуб 2.5% 160г х12 МВан",
                                    "level4": "ЧУДО",
                                    "level5": "КЛУБНИКА",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "160 г"
                                },
                                {
                                    "id": 527,
                                    type: "product", "name": "Йогурт Фрукт на дне Чудо Перс Манг2,5%160гх12 МВан",
                                    "level4": "ЧУДО",
                                    "level5": "ПЕРСИК-МАНГО",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "160 г"
                                },
                                {
                                    "id": 528,
                                    type: "product", "name": "Йогурт Фрукт Чудо Виш Черешня 2.5% 290г х8 МСТ",
                                    "level4": "ЧУДО",
                                    "level5": "ВИШНЯ-ЧЕРЕШНЯ",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "290 г"
                                },
                                {
                                    "id": 529,
                                    type: "product", "name": "Йогурт Фрукт Чудо Клуб Джем 2.5% 125г х12 МВан",
                                    "level4": "ЧУДО",
                                    "level5": "КЛУБНИКА",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "125 г"
                                },
                                {
                                    "id": 530,
                                    type: "product", "name": "Йогурт Фрукт Чудо Клуб Земл 2.5% 290г х8 МСТ",
                                    "level4": "ЧУДО",
                                    "level5": "КЛУБНИКА-ЗЕМЛЯНИКА",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "290 г"
                                },
                                {
                                    "id": 531,
                                    type: "product", "name": "Йогурт Фрукт Чудо Перс Манго Дж 2.5% 125г х12 МВан",
                                    "level4": "ЧУДО",
                                    "level5": "ПЕРСИК-МАНГО",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "125 г"
                                },
                                {
                                    "id": 532,
                                    type: "product", "name": "Йогурт Фрукт Чудо Перс Марк 2.5% 290г х8 МСТ",
                                    "level4": "ЧУДО",
                                    "level5": "ПЕРСИК-МАРАКУЙЯ",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "290 г"
                                },
                                {
                                    "id": 533,
                                    type: "product", "name": "Йогурт Фрукт Чудо Черника Мал 2.5% 290г х8 МСТ",
                                    "level4": "ЧУДО",
                                    "level5": "ЧЕРНИКА-МАЛИНА",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "290 г"
                                },
                                {
                                    "id": 534,
                                    type: "product", "name": "Йогурт Чудо Ассорти 2.5% 290г х8 мст",
                                    "level4": "ЧУДО",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "290 г"
                                },
                                {
                                    "id": 535,
                                    type: "product", "name": "Йогурт Чудо Гавайсикй Микс 2.5% 290г МСТ СГ38 8Х",
                                    "level4": "ЧУДО",
                                    "level5": "АНАНАС, МАНГО, ЧИА",
                                    "level6": "МОНОСТАКАН ПРЕДФОРМОВАННЫЙ",
                                    "level7": "290 Г"
                                },
                                {
                                    "id": 536,
                                    type: "product", "name": "Йогурт Чудо Гавайский Микс 2.5% 290г МСТ 8Х",
                                    "level4": "ЧУДО",
                                    "level5": "АНАНАС, МАНГО, ЧИА",
                                    "level6": "МОНОСТАКАН ПРЕДФОРМОВАННЫЙ",
                                    "level7": "290 Г"
                                },
                                {
                                    "id": 537,
                                    type: "product", "name": "Йогурт ЧудоДет Пломбир с печеньем 2.7% 90г МСТ 6Х",
                                    "level4": "ЧУДО ДЕТКИ",
                                    "level5": "ПЛОМБИР И ПЕЧЕНЬЕ",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "90 Г"
                                },
                                {
                                    "id": 538,
                                    type: "product", "name": "Йогурт ЧудоДетки КлубнБананПеченье 2.7% 90г МСТ 6Х",
                                    "level4": "ЧУДО ДЕТКИ",
                                    "level5": "КЛУБНИКА, БАНАН, ПЕЧЕНЬЕ",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "90 Г"
                                },
                                {
                                    "id": 539,
                                    type: "product", "name": "ЙогурТермост ДвД Вишня 3% 150г МСТ 6Х",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "ВИШНЯ",
                                    "level6": "МОНОСТАКАН ПРЕДФОРМОВАННЫЙ",
                                    "level7": "150 Г"
                                },
                                {
                                    "id": 540,
                                    type: "product", "name": "ЙогурТермост ДвД Клубника 3% 150г МСТ 6Х",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "КЛУБНИКА",
                                    "level6": "МОНОСТАКАН ПРЕДФОРМОВАННЫЙ",
                                    "level7": "150 Г"
                                },
                                {
                                    "id": 541,
                                    type: "product", "name": "ЙогурТермост ДвД Натур 3.7% 150г МСТ 6Х",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН ПРЕДФОРМОВАННЫЙ",
                                    "level7": "150 Г"
                                },
                                {
                                    "id": 542,
                                    type: "product", "name": "ЙогурТермост ДвД Черника 3% 150г МСТ 6Х",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "ЧЕРНИКА",
                                    "level6": "МОНОСТАКАН ПРЕДФОРМОВАННЫЙ",
                                    "level7": "150 Г"
                                },
                                {
                                    "id": 543,
                                    type: "product", "name": "ЙогурТермост ДвД Яблоко 3% 150г МСТ 6Х",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "ЯБЛОКО",
                                    "level6": "МОНОСТАКАН ПРЕДФОРМОВАННЫЙ",
                                    "level7": "150 Г"
                                },
                                {
                                    "id": 544,
                                    type: "product", "name": "ЙогФрук Чудо ГолубБруснКняженик 2.5% 290г МСТ 8Х",
                                    "level4": "ЧУДО",
                                    "level5": "ГОЛУБИКА, БРУСНИКА, КНЯЖЕНИКА",
                                    "level6": "МОНОСТАКАН ПРЕДФОРМОВАННЫЙ",
                                    "level7": "290 Г"
                                }
                            ]
                        },
                        {
                            "id": 545,
                            "name": "Йогурт Вязкий Термизированный",
                            "level": 2, type: "products",
                            "products": [
                                {
                                    "id": 546,
                                    type: "product", "name": "Йогуртер Чудо виш-череш 5.1% 1х24х115г Четв",
                                    "level4": "ЧУДО",
                                    "level5": "ВИШНЯ-ЧЕРЕШНЯ",
                                    "level6": "ЖЕСТКИЙ ПЛАСТИКОВЫЙ СТАКАНЧИК",
                                    "level7": "115 Г"
                                },
                                {
                                    "id": 547,
                                    type: "product", "name": "Йогуртер Чудо лесные яг 5.1% 1х24х115г Четв",
                                    "level4": "ЧУДО",
                                    "level5": "ЯГОДЫ ЛЕСНЫЕ",
                                    "level6": "ЖЕСТКИЙ ПЛАСТИКОВЫЙ СТАКАНЧИК",
                                    "level7": "115 Г"
                                },
                                {
                                    "id": 548,
                                    type: "product", "name": "Прод Йогуртн пастер Чудо Клуб Земл 5.1%115гх24Четв",
                                    "level4": "ЧУДО",
                                    "level5": "КЛУБНИКА-ЗЕМЛЯНИКА",
                                    "level6": "ЖЕСТКИЙ ПЛАСТИКОВЫЙ СТАКАНЧИК",
                                    "level7": "115 г"
                                },
                                {
                                    "id": 549,
                                    type: "product", "name": "Прод Йогуртн пастер Чудо Перс Марк 5.1%115гх24Четв",
                                    "level4": "ЧУДО",
                                    "level5": "ПЕРСИК-МАРАКУЙЯ",
                                    "level6": "ЖЕСТКИЙ ПЛАСТИКОВЫЙ СТАКАНЧИК",
                                    "level7": "115 г"
                                },
                                {
                                    "id": 550,
                                    type: "product", "name": "Прод Йогуртн пастер Фругурт Клуб 2.5%100г х24 Четв",
                                    "level4": "ФРУГУРТ",
                                    "level5": "КЛУБНИКА",
                                    "level6": "ЖЕСТКИЙ ПЛАСТИКОВЫЙ СТАКАНЧИК",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 551,
                                    type: "product", "name": "Прод Йогуртн пастер Фругурт Перс 2.5%100г х24 Четв",
                                    "level4": "ФРУГУРТ",
                                    "level5": "ПЕРСИК",
                                    "level6": "ЖЕСТКИЙ ПЛАСТИКОВЫЙ СТАКАНЧИК",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 552,
                                    type: "product", "name": "Прод Йогуртн пастер Фругурт Черн 2.5% 100г х24Четв",
                                    "level4": "ФРУГУРТ",
                                    "level5": "ЧЕРНИКА",
                                    "level6": "ЖЕСТКИЙ ПЛАСТИКОВЫЙ СТАКАНЧИК",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 553,
                                    type: "product", "name": "Прод Йогуртн пастер Фругурт Черн 2.5%100г х24 Четв",
                                    "level4": "ФРУГУРТ",
                                    "level5": "ЧЕРНИКА",
                                    "level6": "ЖЕСТКИЙ ПЛАСТИКОВЫЙ СТАКАНЧИК",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 554,
                                    type: "product", "name": "Прод Йогуртн пастер Чудо Клуб Земл 2.5%115гх24Четв",
                                    "level4": "ЧУДО",
                                    "level5": "КЛУБНИКА-ЗЕМЛЯНИКА",
                                    "level6": "ЖЕСТКИЙ ПЛАСТИКОВЫЙ СТАКАНЧИК",
                                    "level7": "115 г"
                                },
                                {
                                    "id": 555,
                                    type: "product", "name": "Прод Йогуртн пастер Чудо Клуб Земл 5.1%115гх24Четв",
                                    "level4": "ЧУДО",
                                    "level5": "КЛУБНИКА-ЗЕМЛЯНИКА",
                                    "level6": "ЖЕСТКИЙ ПЛАСТИКОВЫЙ СТАКАНЧИК",
                                    "level7": "115 г"
                                },
                                {
                                    "id": 556,
                                    type: "product", "name": "Прод Йогуртн пастер Чудо Перс Манг 2.5%115гх24Четв",
                                    "level4": "ЧУДО",
                                    "level5": "ПЕРСИК-МАНГО",
                                    "level6": "ЖЕСТКИЙ ПЛАСТИКОВЫЙ СТАКАНЧИК",
                                    "level7": "115 г"
                                },
                                {
                                    "id": 557,
                                    type: "product", "name": "Прод Йогуртн Чудо Перс Марк 5.1% 115г х24 Четв",
                                    "level4": "ЧУДО",
                                    "level5": "ПЕРСИК-МАРАКУЙЯ",
                                    "level6": "ЖЕСТКИЙ ПЛАСТИКОВЫЙ СТАКАНЧИК",
                                    "level7": "115 г"
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": 558,
                    "name": "Йогурты Питьевые",
                    "level": 1, type: "nodes",
                    "nodes": [
                        {
                            "id": 559,
                            "name": "Йогурт Питьевой",
                            "level": 2, type: "products",
                            "products": [
                                {
                                    "id": 560,
                                    type: "product", "name": "Биойог пит кус фр Кунгурс Черника1.5%400г экол 20Х",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "ЧЕРНИКА",
                                    "level6": "КУВШИН ПАУЧ-ПАК",
                                    "level7": "400 Г"
                                },
                                {
                                    "id": 561,
                                    type: "product", "name": "Биойог пит с кус фр Кунгу Клубн 1.5% 400г экол 20Х",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "КЛУБНИКА",
                                    "level6": "КУВШИН ПАУЧ-ПАК",
                                    "level7": "400 Г"
                                },
                                {
                                    "id": 562,
                                    type: "product", "name": "Биойог пит с кус фр Кунгур ЛеснЯг1.5% 400г экол20Х",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "ЛЕСНЫЕ ЯГОДЫ",
                                    "level6": "КУВШИН ПАУЧ-ПАК",
                                    "level7": "400 Г"
                                },
                                {
                                    "id": 563,
                                    type: "product", "name": "Биойог пит с кус фр Кунгур Перс 1.5% 400г экол 20Х",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "ПЕРСИК",
                                    "level6": "КУВШИН ПАУЧ-ПАК",
                                    "level7": "400 Г"
                                },
                                {
                                    "id": 564,
                                    type: "product", "name": "Биойогурт BioMax Мюсли-5 злак 2.8% 270г х15 БП",
                                    "level4": "БИО-МАХ",
                                    "level5": "МЮСЛИ-ЗЛАКИ",
                                    "level6": "ПЭТ",
                                    "level7": "270 г"
                                },
                                {
                                    "id": 565,
                                    type: "product", "name": "Биойогурт BioMax Мюсли-5 злак 2.8% 270г х6 БП",
                                    "level4": "БИО-МАХ",
                                    "level5": "МЮСЛИ-ЗЛАКИ",
                                    "level6": "ПЭТ",
                                    "level7": "270 г"
                                },
                                {
                                    "id": 566,
                                    type: "product", "name": "Биойогурт BioMax Мюсли-5злак 2.8% 270г БП ГУ6 6Х",
                                    "level4": "БИО-МАХ",
                                    "level5": "МЮСЛИ-ЗЛАКИ",
                                    "level6": "ПЭТ",
                                    "level7": "270 г"
                                },
                                {
                                    "id": 567,
                                    type: "product", "name": "Биойогурт BioMax натур 3.1% 270г БП ГУ6",
                                    "level4": "БИО-МАХ",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "270 г"
                                },
                                {
                                    "id": 568,
                                    type: "product", "name": "Биойогурт BioMax натур 3.1% 270г х15 ПЭТ",
                                    "level4": "БИО-МАХ",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "270 г"
                                },
                                {
                                    "id": 569,
                                    type: "product", "name": "Биойогурт BioMax натур 3.1% 270г х6 ПЭТ",
                                    "level4": "БИО-МАХ",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "270 г"
                                },
                                {
                                    "id": 570,
                                    type: "product", "name": "Биойогурт Кунгурский 2.5% 450г ФП",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "ФИНПАК",
                                    "level7": "450 г"
                                },
                                {
                                    "id": 571,
                                    type: "product", "name": "Биойогурт фр BioMax ПерсикКурага 2.7% 270г х15 ПЭТ",
                                    "level4": "БИО-МАХ",
                                    "level5": "ПЕРСИК-КУРАГА",
                                    "level6": "ПЭТ",
                                    "level7": "270 г"
                                },
                                {
                                    "id": 572,
                                    type: "product", "name": "Биойогурт фр BioMax ПерсикКурага 2.7% 270г х6 ПЭТ",
                                    "level4": "БИО-МАХ",
                                    "level5": "ПЕРСИК-КУРАГА",
                                    "level6": "ПЭТ",
                                    "level7": "270 г"
                                },
                                {
                                    "id": 573,
                                    type: "product", "name": "Биойогурт фр BioMax Чернослив 2.7% 270г БП ГУ6 6Х",
                                    "level4": "БИО-МАХ",
                                    "level5": "ЧЕРНОСЛИВ",
                                    "level6": "ПЭТ",
                                    "level7": "270 г"
                                },
                                {
                                    "id": 574,
                                    type: "product", "name": "Биойогурт фрук BioMax Клубника 2.7% 270г БП ГУ6 6Х",
                                    "level4": "БИО-МАХ",
                                    "level5": "КЛУБНИКА",
                                    "level6": "ПЭТ",
                                    "level7": "270 г"
                                },
                                {
                                    "id": 575,
                                    type: "product", "name": "Биойогурт фрук BioMax Клубника 2.7% 270г х15 БП",
                                    "level4": "БИО-МАХ",
                                    "level5": "КЛУБНИКА",
                                    "level6": "ПЭТ",
                                    "level7": "270 г"
                                },
                                {
                                    "id": 576,
                                    type: "product", "name": "Биойогурт фрук BioMax Клубника 2.7% 270г х6 БП",
                                    "level4": "БИО-МАХ",
                                    "level5": "КЛУБНИКА",
                                    "level6": "ПЭТ",
                                    "level7": "270 г"
                                },
                                {
                                    "id": 577,
                                    type: "product", "name": "Биойогурт фрук BioMax Чернослив 2.7% 270г х15 БП",
                                    "level4": "БИО-МАХ",
                                    "level5": "ЧЕРНОСЛИВ",
                                    "level6": "ПЭТ",
                                    "level7": "270 г"
                                },
                                {
                                    "id": 578,
                                    type: "product", "name": "Биойогурт фрук BioMax Чернослив 2.7% 270г х6 БП",
                                    "level4": "БИО-МАХ",
                                    "level5": "ЧЕРНОСЛИВ",
                                    "level6": "ПЭТ",
                                    "level7": "270 г"
                                },
                                {
                                    "id": 579,
                                    type: "product", "name": "Биойогурт фрук BioMax Яблоко-Злаки 2.7% 270г х6 БП",
                                    "level4": "БИО-МАХ",
                                    "level5": "ЯБЛОКО-ЗЛАКИ",
                                    "level6": "ПЭТ",
                                    "level7": "270 г"
                                },
                                {
                                    "id": 580,
                                    type: "product", "name": "Биойогурт фрук BioMax ЯблокоЗлаки 2.7% 270г х15 БП",
                                    "level4": "БИО-МАХ",
                                    "level5": "ЯБЛОКО-ЗЛАКИ",
                                    "level6": "ПЭТ",
                                    "level7": "270 г"
                                },
                                {
                                    "id": 581,
                                    type: "product", "name": "Биойогурт Фрукт БиоМакс Мал ЧСмор 2.7% 290г х6 БП",
                                    "level4": "БИО-МАХ",
                                    "level5": "МАЛИНА-СМОРОДИНА ЧЕРНАЯ",
                                    "level6": "ПЭТ",
                                    "level7": "290 Г"
                                },
                                {
                                    "id": 582,
                                    type: "product", "name": "БиойогуртФр BioMax ПерсКурага 2.7% 270г БП ГУ6 6Х",
                                    "level4": "БИО-МАХ",
                                    "level5": "ПЕРСИК-КУРАГА",
                                    "level6": "ПЭТ",
                                    "level7": "270 г"
                                },
                                {
                                    "id": 583,
                                    type: "product", "name": "БиойогуртФр BioMax ЯблокоЗлаки 2.7% 270г БП ГУ6 6Х",
                                    "level4": "БИО-МАХ",
                                    "level5": "ЯБЛОКО-ЗЛАКИ",
                                    "level6": "ПЭТ",
                                    "level7": "270 г"
                                },
                                {
                                    "id": 584,
                                    type: "product", "name": "БиойогФр с кус фр Кунгурс Черника 1.5% 190г МСТ",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "ЧЕРНИКА",
                                    "level6": "МОНОСТАКАН ПРЕДФОРМОВАННЫЙ",
                                    "level7": "190 Г"
                                },
                                {
                                    "id": 585,
                                    type: "product", "name": "БиойогФр с кус фрук Кунгу Клубн 1.5% 190г МСТ 35Х",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "КЛУБНИКА",
                                    "level6": "МОНОСТАКАН ПРЕДФОРМОВАННЫЙ",
                                    "level7": "190 Г"
                                },
                                {
                                    "id": 586,
                                    type: "product", "name": "БиойогФр с кус фрук Кунгур ЛеснЯг 1.5% 190г МСТ",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "ЛЕСНЫЕ ЯГОДЫ",
                                    "level6": "МОНОСТАКАН ПРЕДФОРМОВАННЫЙ",
                                    "level7": "190 Г"
                                },
                                {
                                    "id": 587,
                                    type: "product", "name": "БиойогФр с кус фрук Кунгур Перс 1.5% 190г МСТ 35Х",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "ПЕРСИК",
                                    "level6": "МОНОСТАКАН ПРЕДФОРМОВАННЫЙ",
                                    "level7": "190 Г"
                                },
                                {
                                    "id": 588,
                                    type: "product", "name": "Биойогурт с бифбак БиоМакс Клуб 2.7% 300г х15 БП",
                                    "level4": "БИО-МАХ",
                                    "level5": "КЛУБНИКА",
                                    "level6": "ПЭТ",
                                    "level7": "300 г"
                                },
                                {
                                    "id": 589,
                                    type: "product", "name": "Биойогурт с бифбак БиоМакс Мюс 5злак 2.9%300гх6 БП",
                                    "level4": "БИО-МАХ",
                                    "level5": "МЮСЛИ-ЗЛАКИ",
                                    "level6": "ПЭТ",
                                    "level7": "300 МЛ"
                                },
                                {
                                    "id": 590,
                                    type: "product", "name": "Биойогурт с бифбак БиоМакс Натур 3.1% 300г х15 БП",
                                    "level4": "БИО-МАХ",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "300 г"
                                },
                                {
                                    "id": 591,
                                    type: "product", "name": "Биойогурт с бифбак БиоМакс Перс Кур 2.7% 300гх15БП",
                                    "level4": "БИО-МАХ",
                                    "level5": "ПЕРСИК-КУРАГА",
                                    "level6": "ПЭТ",
                                    "level7": "300 Г"
                                },
                                {
                                    "id": 592,
                                    type: "product", "name": "Биойогурт с бифбак БиоМакс Перс Кур 2.7% 300гх6 БП",
                                    "level4": "БИО-МАХ",
                                    "level5": "ПЕРСИК-КУРАГА",
                                    "level6": "ПЭТ",
                                    "level7": "300 Г"
                                },
                                {
                                    "id": 593,
                                    type: "product", "name": "Биойогурт с бифбак БиоМакс Чернсл 2.7% 300г х15 БП",
                                    "level4": "БИО-МАХ",
                                    "level5": "ЧЕРНОСЛИВ",
                                    "level6": "ПЭТ",
                                    "level7": "300 г"
                                },
                                {
                                    "id": 594,
                                    type: "product", "name": "Биойогурт с бифбак БиоМакс Ябл Злак 2.7% 300гх15БП",
                                    "level4": "БИО-МАХ",
                                    "level5": "ЯБЛОКО-ЗЛАКИ",
                                    "level6": "ПЭТ",
                                    "level7": "300 Г"
                                },
                                {
                                    "id": 595,
                                    type: "product", "name": "Биойогурт фр BioMax Мал-Смор.черн 2.7% 270г х15 БП",
                                    "level4": "БИО-МАХ",
                                    "level5": "МАЛИНА-СМОРОДИНА ЧЕРНАЯ",
                                    "level6": "ПЭТ",
                                    "level7": "270 г"
                                },
                                {
                                    "id": 596,
                                    type: "product", "name": "Биойогурт фр BioMax Мал-Смор.черн 2.7% 270г х6 ПЭТ",
                                    "level4": "БИО-МАХ",
                                    "level5": "МАЛИНА-СМОРОДИНА ЧЕРНАЯ",
                                    "level6": "ПЭТ",
                                    "level7": "270 г"
                                },
                                {
                                    "id": 597,
                                    type: "product", "name": "Биойогурт Фрукт БиоМакс Мал ЧСмор 2.7% 290г х15 БП",
                                    "level4": "БИО-МАХ",
                                    "level5": "МАЛИНА-СМОРОДИНА ЧЕРНАЯ",
                                    "level6": "ПЭТ",
                                    "level7": "290 Г"
                                },
                                {
                                    "id": 598,
                                    type: "product", "name": "Йог фр Чудо Северные ягоды 2.4% 290г x15 БП",
                                    "level4": "ЧУДО",
                                    "level5": "БРУСНИКА, ГОЛУБИКА, МОРОШКА",
                                    "level6": "ПЭТ",
                                    "level7": "290 г"
                                },
                                {
                                    "id": 599,
                                    type: "product", "name": "Йог фр Чудо Северные ягоды 2.4% 290г х6 БП",
                                    "level4": "ЧУДО",
                                    "level5": "БРУСНИКА, ГОЛУБИКА, МОРОШКА",
                                    "level6": "ПЭТ",
                                    "level7": "290 г"
                                },
                                {
                                    "id": 600,
                                    type: "product", "name": "Йогурт фр Чудо Груш-Ябл-ЧерСмород 2.4% 270г х15 БП",
                                    "level4": "ЧУДО",
                                    "level5": "ГРУША, ЯБЛОКО, СМОРОДИНА ЧЕРНАЯ",
                                    "level6": "ПЭТ",
                                    "level7": "270 г"
                                },
                                {
                                    "id": 601,
                                    type: "product", "name": "Йогурт фр Чудо Груш-Ябл-ЧерСмород 2.4% 270г х6 БП",
                                    "level4": "ЧУДО",
                                    "level5": "ГРУША, ЯБЛОКО, СМОРОДИНА ЧЕРНАЯ",
                                    "level6": "ПЭТ",
                                    "level7": "270 г"
                                },
                                {
                                    "id": 602,
                                    type: "product", "name": "Йогурт фр Чудо Клубн-Землян 2.4% 270г х6 БП Танд",
                                    "level4": "ЧУДО",
                                    "level5": "КЛУБНИКА-ЗЕМЛЯНИКА",
                                    "level6": "ПЭТ",
                                    "level7": "270 г"
                                },
                                {
                                    "id": 603,
                                    type: "product", "name": "Йогурт фр Чудо Персик-Абрик 2.4% 270г х6 БП Танд",
                                    "level4": "ЧУДО",
                                    "level5": "ПЕРСИК-АБРИКОС",
                                    "level6": "ПЭТ",
                                    "level7": "270 г"
                                },
                                {
                                    "id": 604,
                                    type: "product", "name": "Йогурт фр Чудо ПерсМангоДыня 2.4% 270г х6 БП Танд",
                                    "level4": "ЧУДО",
                                    "level5": "ПЕРСИК, МАНГО, ДЫНЯ",
                                    "level6": "ПЭТ",
                                    "level7": "270 г"
                                },
                                {
                                    "id": 605,
                                    type: "product", "name": "Йогурт фр Чудо Черника-Мал 2.4% 270г х6 БутПл Танд",
                                    "level4": "ЧУДО",
                                    "level5": "ЧЕРНИКА-МАЛИНА",
                                    "level6": "ПЭТ",
                                    "level7": "270 г"
                                },
                                {
                                    "id": 606,
                                    type: "product", "name": "Йогурт фр Чудо Черника-малина 2.4% 690г БП 8Х",
                                    "level4": "ЧУДО",
                                    "level5": "ЧЕРНИКА-МАЛИНА",
                                    "level6": "ПЭТ",
                                    "level7": "690г"
                                },
                                {
                                    "id": 607,
                                    type: "product", "name": "Йогурт Фругурт Клуб 2.5% 475г х10 ППак",
                                    "level4": "ФРУГУРТ",
                                    "level5": "КЛУБНИКА",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "475 г"
                                },
                                {
                                    "id": 608,
                                    type: "product", "name": "Йогурт Фругурт Персик 2.5% 475г х10 ППак",
                                    "level4": "ФРУГУРТ",
                                    "level5": "ПЕРСИК",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "475 г"
                                },
                                {
                                    "id": 609,
                                    type: "product", "name": "Йогурт Фрукт Чудо Анан Банан 2.4% 290г х15 БП",
                                    "level4": "ЧУДО",
                                    "level5": "АНАНАС-БАНАН",
                                    "level6": "ПЭТ",
                                    "level7": "290 г"
                                },
                                {
                                    "id": 610,
                                    type: "product", "name": "Йогурт Фрукт Чудо Анан Банан 2.4% 290г х6 БП",
                                    "level4": "ЧУДО",
                                    "level5": "АНАНАС-БАНАН",
                                    "level6": "ПЭТ",
                                    "level7": "290 г"
                                },
                                {
                                    "id": 611,
                                    type: "product", "name": "Йогурт Фрукт Чудо Виш Череш 2.4% 290г х15 БП",
                                    "level4": "ЧУДО",
                                    "level5": "ВИШНЯ-ЧЕРЕШНЯ",
                                    "level6": "ПЭТ",
                                    "level7": "290 г"
                                },
                                {
                                    "id": 612,
                                    type: "product", "name": "Йогурт Фрукт Чудо Виш Череш 2.4% 290г х6 БП",
                                    "level4": "ЧУДО",
                                    "level5": "ВИШНЯ-ЧЕРЕШНЯ",
                                    "level6": "ПЭТ",
                                    "level7": "290 г"
                                },
                                {
                                    "id": 613,
                                    type: "product", "name": "Йогурт Фрукт Чудо Виш Череш 2.4% 290г х6 ПЭТ ТА",
                                    "level4": "ЧУДО",
                                    "level5": "ВИШНЯ-ЧЕРЕШНЯ",
                                    "level6": "ПЭТ",
                                    "level7": "290 г"
                                },
                                {
                                    "id": 614,
                                    type: "product", "name": "Йогурт фрукт Чудо Вишня-Череш 2.4% 270г х6 БП Танд",
                                    "level4": "ЧУДО",
                                    "level5": "ВИШНЯ-ЧЕРЕШНЯ",
                                    "level6": "ПЭТ",
                                    "level7": "270 г"
                                },
                                {
                                    "id": 615,
                                    type: "product", "name": "Йогурт Фрукт Чудо Груш Чсмор Ябл 2.4% 290г х15 БП",
                                    "level4": "ЧУДО",
                                    "level5": "ГРУША, ЯБЛОКО, СМОРОДИНА ЧЕРНАЯ",
                                    "level6": "ПЭТ",
                                    "level7": "290 г"
                                },
                                {
                                    "id": 616,
                                    type: "product", "name": "Йогурт Фрукт Чудо Груш Чсмор Ябл 2.4% 290г х6 БП",
                                    "level4": "ЧУДО",
                                    "level5": "ГРУША, ЯБЛОКО, СМОРОДИНА ЧЕРНАЯ",
                                    "level6": "ПЭТ",
                                    "level7": "290 г"
                                },
                                {
                                    "id": 617,
                                    type: "product", "name": "Йогурт Фрукт Чудо Кив Марк Ап 2.4% 290г х6 БП",
                                    "level4": "ЧУДО",
                                    "level5": "КИВИ, АПЕЛЬСИН, МАРАКУЙЯ",
                                    "level6": "ПЭТ",
                                    "level7": "290 г"
                                },
                                {
                                    "id": 618,
                                    type: "product", "name": "Йогурт Фрукт Чудо Клуб Земл 2.4% 290г х15 БП",
                                    "level4": "ЧУДО",
                                    "level5": "КЛУБНИКА-ЗЕМЛЯНИКА",
                                    "level6": "ПЭТ",
                                    "level7": "290 г"
                                },
                                {
                                    "id": 619,
                                    type: "product", "name": "Йогурт Фрукт Чудо Клуб Земл 2.4% 290г х6 БП",
                                    "level4": "ЧУДО",
                                    "level5": "КЛУБНИКА-ЗЕМЛЯНИКА",
                                    "level6": "ПЭТ",
                                    "level7": "290 г"
                                },
                                {
                                    "id": 620,
                                    type: "product", "name": "Йогурт Фрукт Чудо Клуб Земл 2.4% 290г х6 ПЭТ ТА",
                                    "level4": "ЧУДО",
                                    "level5": "КЛУБНИКА-ЗЕМЛЯНИКА",
                                    "level6": "ПЭТ",
                                    "level7": "290 г"
                                },
                                {
                                    "id": 621,
                                    type: "product", "name": "Йогурт Фрукт Чудо Перс Манго Дын 2.4% 290г х15 БП",
                                    "level4": "ЧУДО",
                                    "level5": "ПЕРСИК, МАНГО, ДЫНЯ",
                                    "level6": "ПЭТ",
                                    "level7": "290 г"
                                },
                                {
                                    "id": 622,
                                    type: "product", "name": "Йогурт Фрукт Чудо Перс Манго Дын 2.4% 290г х6 БП",
                                    "level4": "ЧУДО",
                                    "level5": "ПЕРСИК, МАНГО, ДЫНЯ",
                                    "level6": "ПЭТ",
                                    "level7": "290 г"
                                },
                                {
                                    "id": 623,
                                    type: "product", "name": "Йогурт Фрукт Чудо Перс Манго Дын 2.4% 290гх6ПЭТ ТА",
                                    "level4": "ЧУДО",
                                    "level5": "ПЕРСИК, МАНГО, ДЫНЯ",
                                    "level6": "ПЭТ",
                                    "level7": "290 г"
                                },
                                {
                                    "id": 624,
                                    type: "product", "name": "Йогурт Фрукт Чудо Перс Манго Дын 2.4%290г х15 БП",
                                    "level4": "ЧУДО",
                                    "level5": "ПЕРСИК, МАНГО, ДЫНЯ",
                                    "level6": "ПЭТ",
                                    "level7": "290 г"
                                },
                                {
                                    "id": 625,
                                    type: "product", "name": "Йогурт Фрукт Чудо Персик Абр 2.4% 290г х15 БП",
                                    "level4": "ЧУДО",
                                    "level5": "ПЕРСИК-АБРИКОС",
                                    "level6": "ПЭТ",
                                    "level7": "290 г"
                                },
                                {
                                    "id": 626,
                                    type: "product", "name": "Йогурт Фрукт Чудо Персик Абр 2.4% 290г х6 БП",
                                    "level4": "ЧУДО",
                                    "level5": "ПЕРСИК-АБРИКОС",
                                    "level6": "ПЭТ",
                                    "level7": "290 г"
                                },
                                {
                                    "id": 627,
                                    type: "product", "name": "Йогурт Фрукт Чудо Персик Абр 2.4% 290г х6 ПЭТ ТА",
                                    "level4": "ЧУДО",
                                    "level5": "ПЕРСИК-АБРИКОС",
                                    "level6": "ПЭТ",
                                    "level7": "290 г"
                                },
                                {
                                    "id": 628,
                                    type: "product", "name": "Йогурт Фрукт Чудо Троп Микс 2.4% 290г х15 БП",
                                    "level4": "ЧУДО",
                                    "level5": "КИВИ, АПЕЛЬСИН, МАРАКУЙЯ",
                                    "level6": "ПЭТ",
                                    "level7": "290 г"
                                },
                                {
                                    "id": 629,
                                    type: "product", "name": "Йогурт Фрукт Чудо Черника Мал 2.4% 290г х15 БП",
                                    "level4": "ЧУДО",
                                    "level5": "ЧЕРНИКА-МАЛИНА",
                                    "level6": "ПЭТ",
                                    "level7": "290 г"
                                },
                                {
                                    "id": 630,
                                    type: "product", "name": "Йогурт Фрукт Чудо Черника Мал 2.4% 290г х6 БП",
                                    "level4": "ЧУДО",
                                    "level5": "ЧЕРНИКА-МАЛИНА",
                                    "level6": "ПЭТ",
                                    "level7": "290 г"
                                },
                                {
                                    "id": 631,
                                    type: "product", "name": "Йогурт Фрукт Чудо Черника Мал 2.4% 290г х6 ПЭТ ТА",
                                    "level4": "ЧУДО",
                                    "level5": "ЧЕРНИКА-МАЛИНА",
                                    "level6": "ПЭТ",
                                    "level7": "290 г"
                                },
                                {
                                    "id": 632,
                                    type: "product", "name": "Йогурт Чудо Коллекция Кокос Шейк 3% 270г х15 БП",
                                    "level4": "ЧУДО КОЛЛЕКЦИЯ",
                                    "level5": "КОКОСОВЫЙ",
                                    "level6": "ПЭТ",
                                    "level7": "270 г"
                                },
                                {
                                    "id": 633,
                                    type: "product", "name": "Йогурт Чудо Коллекция Кокос Шейк 3% 270г х6 БП",
                                    "level4": "ЧУДО КОЛЛЕКЦИЯ",
                                    "level5": "КОКОСОВЫЙ",
                                    "level6": "ПЭТ",
                                    "level7": "270 г"
                                },
                                {
                                    "id": 634,
                                    type: "product", "name": "Йогурт Чудо Коллекция Малин Фрап 2.5% 270г х15 БП",
                                    "level4": "ЧУДО КОЛЛЕКЦИЯ",
                                    "level5": "ФРАППЕ МАЛИНОВЫЙ",
                                    "level6": "ПЭТ",
                                    "level7": "270 г"
                                },
                                {
                                    "id": 635,
                                    type: "product", "name": "Йогурт Чудо Коллекция Малин Фрап 2.5% 270г х6 БП",
                                    "level4": "ЧУДО КОЛЛЕКЦИЯ",
                                    "level5": "ФРАППЕ МАЛИНОВЫЙ",
                                    "level6": "ПЭТ",
                                    "level7": "270 г"
                                },
                                {
                                    "id": 636,
                                    type: "product", "name": "Йогурт Чудо Коллекция Шок Страч 3.4% 270г х15 БП",
                                    "level4": "ЧУДО КОЛЛЕКЦИЯ",
                                    "level5": "ШОКОЛАДНАЯ СТРАЧАТЕЛЛА",
                                    "level6": "ПЭТ",
                                    "level7": "270 г"
                                },
                                {
                                    "id": 637,
                                    type: "product", "name": "Йогурт Чудо Коллекция Шок Страч 3.4% 270г х6 БП",
                                    "level4": "ЧУДО КОЛЛЕКЦИЯ",
                                    "level5": "ШОКОЛАДНАЯ СТРАЧАТЕЛЛА",
                                    "level6": "ПЭТ",
                                    "level7": "270 г"
                                },
                                {
                                    "id": 638,
                                    type: "product", "name": "Йог ЧудоДет ПломбирМалиновЧернич 2.7% 85г ДойП 12Х",
                                    "level4": "ЧУДО ДЕТКИ",
                                    "level5": "ПЛОМБИР МАЛИНА, ЧЕРНИКА",
                                    "level6": "ДОЙ-ПАК",
                                    "level7": "85 Г"
                                },
                                {
                                    "id": 639,
                                    type: "product", "name": "Йог ЧудоДет ТуттиФрут с печеньем 2.7% 85г ДойП 12Х",
                                    "level4": "ЧУДО ДЕТКИ",
                                    "level5": "ТУТТИ ФРУТТИ И ПЕЧЕНЬЕ",
                                    "level6": "ДОЙ-ПАК",
                                    "level7": "85 Г"
                                },
                                {
                                    "id": 640,
                                    type: "product", "name": "Йогурт пит PL Красн цена Абрик 2.5% 0.5кг х10 РР",
                                    "level4": "ЧАСТНАЯ МАРКА (КРАСНАЯ ЦЕНА)",
                                    "level5": "АБРИКОС",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "500 Г"
                                },
                                {
                                    "id": 641,
                                    type: "product", "name": "Йогурт пит PL Красн цена Клубн 2.5% 0.5кг х10 РР",
                                    "level4": "ЧАСТНАЯ МАРКА (КРАСНАЯ ЦЕНА)",
                                    "level5": "КЛУБНИКА",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "500 Г"
                                },
                                {
                                    "id": 642,
                                    type: "product", "name": "Йогурт пит Абрикос Каждый день 2.5% 0.5кг х10 РР",
                                    "level4": "ЧАСТНАЯ МАРКА (КАЖДЫЙ ДЕНЬ)",
                                    "level5": "АБРИКОС",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "500 Г"
                                },
                                {
                                    "id": 643,
                                    type: "product", "name": "Йогурт пит Ополье Абрик 2.5% 0.5кг х10 РР",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "АБРИКОС",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "500 г"
                                },
                                {
                                    "id": 644,
                                    type: "product", "name": "Йогурт пит Ополье Вишня 2.5% 0.5кг х10 РР",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "ВИШНЯ",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "500 г"
                                },
                                {
                                    "id": 645,
                                    type: "product", "name": "Йогурт пит Ополье Клубн 2.5% 0.5кг х10 РР",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "КЛУБНИКА",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "500 г"
                                },
                                {
                                    "id": 646,
                                    type: "product", "name": "Йогурт пит. Вишня Каждый день 2.5% 0.5кг х10 РР",
                                    "level4": "ЧАСТНАЯ МАРКА (КАЖДЫЙ ДЕНЬ)",
                                    "level5": "ВИШНЯ",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "500 Г"
                                },
                                {
                                    "id": 647,
                                    type: "product", "name": "Йогурт фр Чудо Ананас-Банан 2.4% 270г х15 БутПл",
                                    "level4": "ЧУДО",
                                    "level5": "АНАНАС-БАНАН",
                                    "level6": "ПЭТ",
                                    "level7": "270 г"
                                },
                                {
                                    "id": 648,
                                    type: "product", "name": "Йогурт фр Чудо Ананас-Банан 2.4% 270г х6 БутПл",
                                    "level4": "ЧУДО",
                                    "level5": "АНАНАС-БАНАН",
                                    "level6": "ПЭТ",
                                    "level7": "270 г"
                                },
                                {
                                    "id": 649,
                                    type: "product", "name": "Йогурт фр Чудо вишня-череш 2.4% 690г БП 8Х",
                                    "level4": "ЧУДО",
                                    "level5": "ВИШНЯ-ЧЕРЕШНЯ",
                                    "level6": "ПЭТ",
                                    "level7": "690 г"
                                },
                                {
                                    "id": 650,
                                    type: "product", "name": "Йогурт фр Чудо Малина-Ежевика 2.4% 270г БП 15Х",
                                    "level4": "ЧУДО",
                                    "level5": "МАЛИНА, ЕЖЕВИКА",
                                    "level6": "ПЭТ",
                                    "level7": "270 Г"
                                },
                                {
                                    "id": 651,
                                    type: "product", "name": "Йогурт фр Чудо Малина-Ежевика 2.4% 270г БП 6Х",
                                    "level4": "ЧУДО",
                                    "level5": "МАЛИНА, ЕЖЕВИКА",
                                    "level6": "ПЭТ",
                                    "level7": "270 Г"
                                },
                                {
                                    "id": 652,
                                    type: "product", "name": "Йогурт фр Чудо Черника-Малина 2.4% 270г х15 БутПл",
                                    "level4": "ЧУДО",
                                    "level5": "ЧЕРНИКА-МАЛИНА",
                                    "level6": "ПЭТ",
                                    "level7": "270 г"
                                },
                                {
                                    "id": 653,
                                    type: "product", "name": "Йогурт фр Чудо Черника-Малина 2.4% 270г х6 БутПл",
                                    "level4": "ЧУДО",
                                    "level5": "ЧЕРНИКА-МАЛИНА",
                                    "level6": "ПЭТ",
                                    "level7": "270 г"
                                },
                                {
                                    "id": 654,
                                    type: "product", "name": "Йогурт фр Чудо Ягодн мороженое 2.4% 270г БП 15Х",
                                    "level4": "ЧУДО",
                                    "level5": "ЯГОДЫ, МОРОЖЕНОЕ",
                                    "level6": "ПЭТ",
                                    "level7": "270 Г"
                                },
                                {
                                    "id": 655,
                                    type: "product", "name": "Йогурт фр Чудо Ягодн мороженое 2.4% 270г БП 6Х",
                                    "level4": "ЧУДО",
                                    "level5": "ЯГОДЫ, МОРОЖЕНОЕ",
                                    "level6": "ПЭТ",
                                    "level7": "270 Г"
                                },
                                {
                                    "id": 656,
                                    type: "product", "name": "Йогурт фр Чудо Ягодное мороженое 2.4% 690г БП 8Х",
                                    "level4": "ЧУДО",
                                    "level5": "ЯГОДЫ, МОРОЖЕНОЕ",
                                    "level6": "ПЭТ",
                                    "level7": "690 Г"
                                },
                                {
                                    "id": 657,
                                    type: "product", "name": "Йогурт Фрукт Чудо Виш Череш 2.4% 290г х15 ПЭТ",
                                    "level4": "ЧУДО",
                                    "level5": "ВИШНЯ-ЧЕРЕШНЯ",
                                    "level6": "ПЭТ",
                                    "level7": "290 г"
                                },
                                {
                                    "id": 658,
                                    type: "product", "name": "Йогурт фрукт Чудо Вишня-Череш 2.4% 270г х15  БП",
                                    "level4": "ЧУДО",
                                    "level5": "ВИШНЯ-ЧЕРЕШНЯ",
                                    "level6": "ПЭТ",
                                    "level7": "270 г"
                                },
                                {
                                    "id": 659,
                                    type: "product", "name": "Йогурт фрукт Чудо Вишня-Череш 2.4% 270г х6 БП",
                                    "level4": "ЧУДО",
                                    "level5": "ВИШНЯ-ЧЕРЕШНЯ",
                                    "level6": "ПЭТ",
                                    "level7": "270 г"
                                },
                                {
                                    "id": 660,
                                    type: "product", "name": "Йогурт фрукт Чудо Детки Клубника 2.2% 200г БП 4Х",
                                    "level4": "ЧУДО ДЕТКИ",
                                    "level5": "КЛУБНИКА",
                                    "level6": "ПЭТ",
                                    "level7": "200 г"
                                },
                                {
                                    "id": 661,
                                    type: "product", "name": "Йогурт фрукт Чудо Детки Ябл-Бан 2.2% 200г БП 4Х",
                                    "level4": "ЧУДО ДЕТКИ",
                                    "level5": "ЯБЛОКО-БАНАН",
                                    "level6": "ПЭТ",
                                    "level7": "200 г"
                                },
                                {
                                    "id": 662,
                                    type: "product", "name": "Йогурт фрукт Чудо Киви-Марак-Апел 2.4% 270г х15 БП",
                                    "level4": "ЧУДО",
                                    "level5": "КИВИ, АПЕЛЬСИН, МАРАКУЙЯ",
                                    "level6": "ПЭТ",
                                    "level7": "270 г"
                                },
                                {
                                    "id": 663,
                                    type: "product", "name": "Йогурт фрукт Чудо Киви-Марак-Апел 2.4% 270г х6 БП",
                                    "level4": "ЧУДО",
                                    "level5": "КИВИ, АПЕЛЬСИН, МАРАКУЙЯ",
                                    "level6": "ПЭТ",
                                    "level7": "270 г"
                                },
                                {
                                    "id": 664,
                                    type: "product", "name": "Йогурт Фрукт Чудо Клуб Земл 2.4% 290г х15 ПЭТ",
                                    "level4": "ЧУДО",
                                    "level5": "КЛУБНИКА-ЗЕМЛЯНИКА",
                                    "level6": "ПЭТ",
                                    "level7": "290 г"
                                },
                                {
                                    "id": 665,
                                    type: "product", "name": "Йогурт Фрукт Чудо Клуб Земл 2.4% 690г х8 БП",
                                    "level4": "ЧУДО",
                                    "level5": "КЛУБНИКА-ЗЕМЛЯНИКА",
                                    "level6": "ПЭТ",
                                    "level7": "690 г"
                                },
                                {
                                    "id": 666,
                                    type: "product", "name": "Йогурт фрукт Чудо Клубн-Землян 2.4% 270г х15 БП",
                                    "level4": "ЧУДО",
                                    "level5": "КЛУБНИКА-ЗЕМЛЯНИКА",
                                    "level6": "ПЭТ",
                                    "level7": "270 г"
                                },
                                {
                                    "id": 667,
                                    type: "product", "name": "Йогурт фрукт Чудо Клубн-Землян 2.4% 270г х6 БП",
                                    "level4": "ЧУДО",
                                    "level5": "КЛУБНИКА-ЗЕМЛЯНИКА",
                                    "level6": "ПЭТ",
                                    "level7": "270 г"
                                },
                                {
                                    "id": 668,
                                    type: "product", "name": "Йогурт фрукт Чудо Перс-Манго-Дыня 2.4% 270г х15 БП",
                                    "level4": "ЧУДО",
                                    "level5": "ПЕРСИК, МАНГО, ДЫНЯ",
                                    "level6": "ПЭТ",
                                    "level7": "270 г"
                                },
                                {
                                    "id": 669,
                                    type: "product", "name": "Йогурт фрукт Чудо Перс-Манго-Дыня 2.4% 270г х6 БП",
                                    "level4": "ЧУДО",
                                    "level5": "ПЕРСИК, МАНГО, ДЫНЯ",
                                    "level6": "ПЭТ",
                                    "level7": "270 г"
                                },
                                {
                                    "id": 670,
                                    type: "product", "name": "Йогурт фрукт Чудо Персик-Абрик 2.4% 270г х15 БП",
                                    "level4": "ЧУДО",
                                    "level5": "ПЕРСИК-АБРИКОС",
                                    "level6": "ПЭТ",
                                    "level7": "270 г"
                                },
                                {
                                    "id": 671,
                                    type: "product", "name": "Йогурт фрукт Чудо Персик-Абрик 2.4% 270г х6 БП",
                                    "level4": "ЧУДО",
                                    "level5": "ПЕРСИК-АБРИКОС",
                                    "level6": "ПЭТ",
                                    "level7": "270 г"
                                },
                                {
                                    "id": 672,
                                    type: "product", "name": "Йогурт Фрукт Чудо Персик Абр 2.4% 290г х15 ПЭТ",
                                    "level4": "ЧУДО",
                                    "level5": "ПЕРСИК-АБРИКОС",
                                    "level6": "ПЭТ",
                                    "level7": "290 г"
                                },
                                {
                                    "id": 673,
                                    type: "product", "name": "Йогурт Фрукт Чудо Персик Абр 2.4% 690г х8 БП",
                                    "level4": "ЧУДО",
                                    "level5": "ПЕРСИК-АБРИКОС",
                                    "level6": "ПЭТ",
                                    "level7": "690 г"
                                },
                                {
                                    "id": 674,
                                    type: "product", "name": "Йогурт фрукт Чудо Северные ягоды 2.4% 270г х15 БП",
                                    "level4": "ЧУДО",
                                    "level5": "БРУСНИКА, ГОЛУБИКА, МОРОШКА",
                                    "level6": "ПЭТ",
                                    "level7": "270 г"
                                },
                                {
                                    "id": 675,
                                    type: "product", "name": "Йогурт фрукт Чудо Северные ягоды 2.4% 270г х6 БП",
                                    "level4": "ЧУДО",
                                    "level5": "БРУСНИКА, ГОЛУБИКА, МОРОШКА",
                                    "level6": "ПЭТ",
                                    "level7": "270 г"
                                },
                                {
                                    "id": 676,
                                    type: "product", "name": "Йогурт Фрукт ЧудоДетки Клуб 2.2% 200г х12 БП ДП",
                                    "level4": "ЧУДО ДЕТКИ",
                                    "level5": "КЛУБНИКА",
                                    "level6": "ПЭТ",
                                    "level7": "200 г"
                                },
                                {
                                    "id": 677,
                                    type: "product", "name": "Йогурт Фрукт ЧудоДетки Клуб 2.2% 200г х24 БП ДП",
                                    "level4": "ЧУДО ДЕТКИ",
                                    "level5": "КЛУБНИКА",
                                    "level6": "ПЭТ",
                                    "level7": "200 г"
                                },
                                {
                                    "id": 678,
                                    type: "product", "name": "Йогурт Фрукт ЧудоДетки Клуб Мал 2.5% 85гх12ДойП ДП",
                                    "level4": "ЧУДО ДЕТКИ",
                                    "level5": "КЛУБНИКА-МАЛИНА",
                                    "level6": "ДОЙ-ПАК",
                                    "level7": "85 г"
                                },
                                {
                                    "id": 679,
                                    type: "product", "name": "Йогурт Фрукт ЧудоДетки МультФр 2.5% 85гх12 ДойП ДП",
                                    "level4": "ЧУДО ДЕТКИ",
                                    "level5": "МУЛЬТИФРУКТ",
                                    "level6": "ДОЙ-ПАК",
                                    "level7": "85 г"
                                },
                                {
                                    "id": 680,
                                    type: "product", "name": "Йогурт Фрукт ЧудоДетки Ябл Бан 2.2% 200г х12 БП ДП",
                                    "level4": "ЧУДО ДЕТКИ",
                                    "level5": "ЯБЛОКО-БАНАН",
                                    "level6": "ПЭТ",
                                    "level7": "200 г"
                                },
                                {
                                    "id": 681,
                                    type: "product", "name": "Йогурт Фрукт ЧудоДетки Ябл Бан 2.2% 200г х24 БП ДП",
                                    "level4": "ЧУДО ДЕТКИ",
                                    "level5": "ЯБЛОКО-БАНАН",
                                    "level6": "ПЭТ",
                                    "level7": "200 г"
                                },
                                {
                                    "id": 682,
                                    type: "product", "name": "Йогурт ЧудоДет Пломбир КлубнБанан 2.2% 200г БП 12Х",
                                    "level4": "ЧУДО ДЕТКИ",
                                    "level5": "ПЛОМБИР КЛУБНИКА, БАНАН",
                                    "level6": "ПЭТ",
                                    "level7": "200 Г"
                                },
                                {
                                    "id": 683,
                                    type: "product", "name": "Йогурт ЧудоДет Пломбир КлубнБанан 2.2% 200г БП 4Х",
                                    "level4": "ЧУДО ДЕТКИ",
                                    "level5": "ПЛОМБИР КЛУБНИКА, БАНАН",
                                    "level6": "ПЭТ",
                                    "level7": "200 Г"
                                },
                                {
                                    "id": 684,
                                    type: "product", "name": "ЙогуртФр Чудо Гавайский Микс 2.4% 270г БП 15Х",
                                    "level4": "ЧУДО",
                                    "level5": "АНАНАС, МАНГО, ЧИА",
                                    "level6": "ПЭТ",
                                    "level7": "270 Г"
                                },
                                {
                                    "id": 685,
                                    type: "product", "name": "ЙогуртФр Чудо Гавайский Микс 2.4% 270г БП 6Х",
                                    "level4": "ЧУДО",
                                    "level5": "АНАНАС, МАНГО, ЧИА",
                                    "level6": "ПЭТ",
                                    "level7": "270 Г"
                                },
                                {
                                    "id": 686,
                                    type: "product", "name": "ЙогФрук Чудо ГолубБруснКняженик 2.4% 270г БП 15Х",
                                    "level4": "ЧУДО",
                                    "level5": "ГОЛУБИКА, БРУСНИКА, КНЯЖЕНИКА",
                                    "level6": "ПЭТ",
                                    "level7": "270 Г"
                                },
                                {
                                    "id": 687,
                                    type: "product", "name": "ЙогФрук Чудо ГолубБруснКняженик 2.4% 270г БП 6Х",
                                    "level4": "ЧУДО",
                                    "level5": "ГОЛУБИКА, БРУСНИКА, КНЯЖЕНИКА",
                                    "level6": "ПЭТ",
                                    "level7": "270 Г"
                                },
                                {
                                    "id": 688,
                                    type: "product", "name": "МКК Биойогурт Кунгурский 1.5% 450г ФП",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "ФИНПАК",
                                    "level7": "450 г"
                                },
                                {
                                    "id": 689,
                                    type: "product", "name": "МКК Биойогурт пит Кунгурский Клубн 1.5% 450г ФП",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "КЛУБНИКА",
                                    "level6": "ФИНПАК",
                                    "level7": "450 г"
                                },
                                {
                                    "id": 690,
                                    type: "product", "name": "МКК Биойогурт пит Кунгурский Персик 1.5% 450г ФП",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "ПЕРСИК",
                                    "level6": "ФИНПАК",
                                    "level7": "450 г"
                                },
                                {
                                    "id": 691,
                                    type: "product", "name": "МКК Биойогурт пит Кунгурский Черника 1.5% 450г ФП",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "ЧЕРНИКА",
                                    "level6": "ФИНПАК",
                                    "level7": "450 г"
                                },
                                {
                                    "id": 692,
                                    type: "product", "name": "МКК Йогурт пит. Кунгурский Клубника 1.5% 450г ФП",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "КЛУБНИКА",
                                    "level6": "ФИНПАК",
                                    "level7": "450 г"
                                },
                                {
                                    "id": 693,
                                    type: "product", "name": "МКК Йогурт пит. Кунгурский Персик 1.5% 450г ФП",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "ПЕРСИК",
                                    "level6": "ФИНПАК",
                                    "level7": "450 г"
                                },
                                {
                                    "id": 694,
                                    type: "product", "name": "МКК Йогурт пит. Кунгурский Черника 1.5% 450г ФП",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "ЧЕРНИКА",
                                    "level6": "ФИНПАК",
                                    "level7": "450 г"
                                },
                                {
                                    "id": 695,
                                    type: "product", "name": "Напит кис-мол Фругурт Клубн 1.5% 475г х10 TRTwCap",
                                    "level4": "ФРУГУРТ",
                                    "level5": "КЛУБНИКА",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "475 г"
                                },
                                {
                                    "id": 696,
                                    type: "product", "name": "Напит кис-мол Фругурт Персик 1.5% 475г х10 TRTwCap",
                                    "level4": "ФРУГУРТ",
                                    "level5": "ПЕРСИК",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "475 г"
                                },
                                {
                                    "id": 697,
                                    type: "product", "name": "Напит кисмол Фругурт Персик 1.5% 475г х10 Ппак/ТР",
                                    "level4": "ФРУГУРТ",
                                    "level5": "ПЕРСИК",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "475 г"
                                },
                                {
                                    "id": 698,
                                    type: "product", "name": "Напиток кисмол Фругурт Клуб 1.5% 475г х10 Ппак/ТР",
                                    "level4": "ФРУГУРТ",
                                    "level5": "КЛУБНИКА",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "475 г"
                                },
                                {
                                    "id": 699,
                                    type: "product", "name": "Напиток кисмол Фругурт Клуб 1.5% 950г х10 ТР",
                                    "level4": "ФРУГУРТ",
                                    "level5": "КЛУБНИКА",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 700,
                                    type: "product", "name": "Напиток кисмол Фругурт Клуб 1.5% 950г х10 ТРТвК",
                                    "level4": "ФРУГУРТ",
                                    "level5": "КЛУБНИКА",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 701,
                                    type: "product", "name": "Напиток кисмол Фругурт Персик 1.5% 950г х10 ТР",
                                    "level4": "ФРУГУРТ",
                                    "level5": "ПЕРСИК",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 702,
                                    type: "product", "name": "Напиток кисмол Фругурт Персик 1.5% 950г х10 ТРТвК",
                                    "level4": "ФРУГУРТ",
                                    "level5": "ПЕРСИК",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 703,
                                    type: "product", "name": "ЮП Йогурт пит Клубника Каждый день 2.5% 0.5кг РР",
                                    "level4": "ЧАСТНАЯ МАРКА (КАЖДЫЙ ДЕНЬ)",
                                    "level5": "КЛУБНИКА",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "500 Г"
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": 704,
                    "name": "Кефир",
                    "level": 1, type: "nodes",
                    "nodes": [
                        {
                            "id": 705,
                            "name": "Кефир",
                            "level": 2, type: "products",
                            "products": [
                                {
                                    "id": 706,
                                    type: "product", "name": "Биокефир Витам БиоМакс 1% 1000г х12 СКСкК",
                                    "level4": "БИО-МАХ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СКУЭР",
                                    "level7": "1 кг"
                                },
                                {
                                    "id": 707,
                                    type: "product", "name": "Биокефир Кунгурский 2.5% 450г ФП",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "ФИНПАК",
                                    "level7": "450 г"
                                },
                                {
                                    "id": 708,
                                    type: "product", "name": "Биокефир с бифбак БиоМакс 2.5% 1000г х12 СКСкК",
                                    "level4": "БИО-МАХ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СКУЭР",
                                    "level7": "1 кг"
                                },
                                {
                                    "id": 709,
                                    type: "product", "name": "Биокефирный БиоМакс 2.5% 450г х12 ПЭТ",
                                    "level4": "БИО-МАХ",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "450 г"
                                },
                                {
                                    "id": 710,
                                    type: "product", "name": "Биокефирный БиоМакс 2.5% 950г х6 ПЭТ",
                                    "level4": "БИО-МАХ",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 711,
                                    type: "product", "name": "Биокефирный БиоМакс Кефирный 1% 450г х12 ПЭТ",
                                    "level4": "БИО-МАХ",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "450 г"
                                },
                                {
                                    "id": 712,
                                    type: "product", "name": "Биокефирный БиоМакс Кефирный 1% 950г х6 ПЭТ",
                                    "level4": "БИО-МАХ",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 713,
                                    type: "product", "name": "Биокефир БиоМакс 2.5% 475г х10 ППак",
                                    "level4": "БИО-МАХ",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "475 г"
                                },
                                {
                                    "id": 714,
                                    type: "product", "name": "Биокефир БиоМакс 2.5% 515г х12 СКСкК",
                                    "level4": "БИО-МАХ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СКУЭР",
                                    "level7": "515 г"
                                },
                                {
                                    "id": 715,
                                    type: "product", "name": "Биокефир БиоМакс 2.5% 950г х10 ППакК",
                                    "level4": "БИО-МАХ",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 716,
                                    type: "product", "name": "Биокефир с бифбак БиоМакс 2.5% 1000г х10 СКСкК",
                                    "level4": "БИО-МАХ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СКУЭР",
                                    "level7": "1 кг"
                                },
                                {
                                    "id": 717,
                                    type: "product", "name": "Биокефир с бифбак БиоМакс 2.5% 500г х10 СКСкК",
                                    "level4": "БИО-МАХ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СКУЭР",
                                    "level7": "500 г"
                                },
                                {
                                    "id": 718,
                                    type: "product", "name": "Биокефирный продукт Bio-Max 1% 950г х10 PP с крышк",
                                    "level4": "БИО-МАХ",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 719,
                                    type: "product", "name": "Биокефирный продукт BioMax 2.5% 475г х10 PP с крыш",
                                    "level4": "БИО-МАХ",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "475 г"
                                },
                                {
                                    "id": 720,
                                    type: "product", "name": "Биокефирный продукт BioMax 2.5% 950г х10 PP с крыш",
                                    "level4": "БИО-МАХ",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 721,
                                    type: "product", "name": "Кефир 1% 0.5кг РР Каждый день",
                                    "level4": "ЧАСТНАЯ МАРКА (КАЖДЫЙ ДЕНЬ)",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "500 Г"
                                },
                                {
                                    "id": 722,
                                    type: "product", "name": "Кефир 1% 1кг РР Каждый день",
                                    "level4": "ЧАСТНАЯ МАРКА (КАЖДЫЙ ДЕНЬ)",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "1 КГ"
                                },
                                {
                                    "id": 723,
                                    type: "product", "name": "Кефир PL Романов луг 2.5% 0.5кг х12 TBsq FC",
                                    "level4": "ЧАСТНАЯ МАРКА (РОМАНОВ ЛУГ)",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СКУЭР",
                                    "level7": "500 Г"
                                },
                                {
                                    "id": 724,
                                    type: "product", "name": "Кефир Веселый молочник 3.2% 950г х10 PurePкрыш",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 725,
                                    type: "product", "name": "Кефир ДВД 1% 475г х10 ППакК/ТРТвК",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "475 г"
                                },
                                {
                                    "id": 726,
                                    type: "product", "name": "Кефир ДВД 1% 475г х10 ТРТвК",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "475 г"
                                },
                                {
                                    "id": 727,
                                    type: "product", "name": "Кефир ДВД 2.5% 900г х6 ПЭТ",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "900 г"
                                },
                                {
                                    "id": 728,
                                    type: "product", "name": "Кефир ДВД 2.5% 950г х12 ППакК",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 729,
                                    type: "product", "name": "Кефир ДВД 3.2% 475г х10 ТРТвК",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "475 г"
                                },
                                {
                                    "id": 730,
                                    type: "product", "name": "Кефир ДВД 3.2% 950г х10 ППакК/ТРТвК",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 731,
                                    type: "product", "name": "Кефир ДВД 3.2% 950г х12 ППакК",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 732,
                                    type: "product", "name": "Кефир ДВД Отборный 4% 1000г х12 СКСкК",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СКУЭР",
                                    "level7": "1 кг"
                                },
                                {
                                    "id": 733,
                                    type: "product", "name": "Кефир КубБуренка 2.5% 1000г х10 СКСкК",
                                    "level4": "КУБАНСКАЯ БУРЕНКА",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СКУЭР",
                                    "level7": "1 кг"
                                },
                                {
                                    "id": 734,
                                    type: "product", "name": "Кефир Кунгурский 2.5% 1000г х20 ФП Цена Ниже",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "ФИНПАК",
                                    "level7": "1 кг"
                                },
                                {
                                    "id": 735,
                                    type: "product", "name": "Кефир Пермский 2.5% 900г ФП",
                                    "level4": "NON BRANDED",
                                    "level5": "",
                                    "level6": "ФИНПАК",
                                    "level7": "900 г"
                                },
                                {
                                    "id": 736,
                                    type: "product", "name": "Кефирный ДВД Клуб 2.1% 450г х12 ПЭТ",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "КЛУБНИКА",
                                    "level6": "ПЭТ",
                                    "level7": "450 Г"
                                },
                                {
                                    "id": 737,
                                    type: "product", "name": "Кефирный ДВД Черника Ежев 2.1% 450г х12 ПЭТ",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "ЧЕРНИКА, ЕЖЕВИКА",
                                    "level6": "ПЭТ",
                                    "level7": "450 Г"
                                },
                                {
                                    "id": 738,
                                    type: "product", "name": "Нап Кефирный ВесМол 1% 900г х6 ПЭТ",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "900 г"
                                },
                                {
                                    "id": 739,
                                    type: "product", "name": "Продукт Кефирный ДВД 1% 930г х6 ПЭТ",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "930 г"
                                },
                                {
                                    "id": 740,
                                    type: "product", "name": "Кефир \"Billa\" 1% 930г х6 ПЭТ",
                                    "level4": "ЧАСТНАЯ МАРКА (БИЛЛА)",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "930 Г"
                                },
                                {
                                    "id": 741,
                                    type: "product", "name": "Кефир \"Billa\" 3.2% 930г х6 ПЭТ",
                                    "level4": "ЧАСТНАЯ МАРКА (БИЛЛА)",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "930 Г"
                                },
                                {
                                    "id": 742,
                                    type: "product", "name": "Кефир Billa 3.2% 0.5кг TBsq FC 12Х",
                                    "level4": "ЧАСТНАЯ МАРКА (БИЛЛА)",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СКУЭР",
                                    "level7": "500 Г"
                                },
                                {
                                    "id": 743,
                                    type: "product", "name": "Кефир Веселый молочник 1% 900г х10 TRTwistCup",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "900 г"
                                },
                                {
                                    "id": 744,
                                    type: "product", "name": "Кефир ВесМол 1% 0.950кг х10 ТРТвК",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 745,
                                    type: "product", "name": "Кефир ВесМол 1% 950г х10 TР/ПпакК",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 746,
                                    type: "product", "name": "Кефир ВесМол 1% 950г х12 ППакК",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 747,
                                    type: "product", "name": "Кефир ВесМол 2.5% 475г PP с крышкой 10Х",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "475 г"
                                },
                                {
                                    "id": 748,
                                    type: "product", "name": "Кефир ВесМол 2.5% 475г х10 ППак",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "475 г"
                                },
                                {
                                    "id": 749,
                                    type: "product", "name": "Кефир ВесМол 2.5% 950г PP с крышкой 10Х",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 750,
                                    type: "product", "name": "Кефир ВесМол 2.5% 950г PurePack с крыш 10Х",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 751,
                                    type: "product", "name": "Кефир ВесМол 2.5% 950г х12 ППакК",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 752,
                                    type: "product", "name": "Кефир ВесМол 3.2% 950г PurePack с крыш 10Х",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 753,
                                    type: "product", "name": "Кефир ВесМол 3.2% 950г х12 ППакК",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 754,
                                    type: "product", "name": "Кефир ДВД 1% 1000г х10 ППакК",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "1 кг"
                                },
                                {
                                    "id": 755,
                                    type: "product", "name": "Кефир ДВД 1% 1000г х12 СКСкК",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СКУЭР",
                                    "level7": "1 кг"
                                },
                                {
                                    "id": 756,
                                    type: "product", "name": "Кефир ДВД 1% 430г х10 ТРТвК",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "430 г"
                                },
                                {
                                    "id": 757,
                                    type: "product", "name": "Кефир ДВД 1% 450г х12 ПЭТ",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "450 г"
                                },
                                {
                                    "id": 758,
                                    type: "product", "name": "Кефир ДВД 1% 515г х10 ППакК",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "515 г"
                                },
                                {
                                    "id": 759,
                                    type: "product", "name": "Кефир ДВД 1% 515г х12 СКСкК",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СКУЭР",
                                    "level7": "515 г"
                                },
                                {
                                    "id": 760,
                                    type: "product", "name": "Кефир ДВД 1% 900г х6 ПЭТ",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "900 г"
                                },
                                {
                                    "id": 761,
                                    type: "product", "name": "Кефир ДвД 1% 950г PP с крышкой 10Х",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 762,
                                    type: "product", "name": "Кефир ДВД 1% 950г PurePack с кр 10Х",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 763,
                                    type: "product", "name": "Кефир ДВД 1% 950г х12 ППакК",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 764,
                                    type: "product", "name": "Кефир ДВД 2.5% 1000г х10 ППак",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "1 кг"
                                },
                                {
                                    "id": 765,
                                    type: "product", "name": "Кефир ДВД 2.5% 1000г х12 СКСкК",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СКУЭР",
                                    "level7": "1 кг"
                                },
                                {
                                    "id": 766,
                                    type: "product", "name": "Кефир ДВД 2.5% 475г х10 ТРТвК",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "475 г"
                                },
                                {
                                    "id": 767,
                                    type: "product", "name": "Кефир ДВД 3.2% 1000г х12 СКСкК",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СКУЭР",
                                    "level7": "1 кг"
                                },
                                {
                                    "id": 768,
                                    type: "product", "name": "Кефир ДВД 3.2% 430г х10 ТРТвК",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "430 г"
                                },
                                {
                                    "id": 769,
                                    type: "product", "name": "Кефир ДВД 3.2% 475г PurePack с крыш 10Х",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "475 г"
                                },
                                {
                                    "id": 770,
                                    type: "product", "name": "Кефир ДВД 3.2% 475г х12 ППакК",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "475 г"
                                },
                                {
                                    "id": 771,
                                    type: "product", "name": "Кефир ДВД 3.2% 515г х12 СКСкК",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СКУЭР",
                                    "level7": "515 г"
                                },
                                {
                                    "id": 772,
                                    type: "product", "name": "Кефир ДВД 3.2% 900г х6 ПЭТ",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "900 г"
                                },
                                {
                                    "id": 773,
                                    type: "product", "name": "Кефир ДВД 3.2% 950г PurePack с кр 10Х",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 774,
                                    type: "product", "name": "Кефир Домик в деревне 1% 475г PP c крыш 10Х",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "475 г"
                                },
                                {
                                    "id": 775,
                                    type: "product", "name": "Кефир Домик в деревне 2.5% 950г PP с крыш 10Х",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 776,
                                    type: "product", "name": "Кефир Домик в деревне 2.5% 950г PPкр 10Х",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 777,
                                    type: "product", "name": "Кефир Кубанская буренка 2.5% 450г TB Sq 10Х",
                                    "level4": "КУБАНСКАЯ БУРЕНКА",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СКУЭР",
                                    "level7": "450 Г"
                                },
                                {
                                    "id": 778,
                                    type: "product", "name": "Кефир Кубанская Буренка 2.5% 800г ФП 12Х",
                                    "level4": "КУБАНСКАЯ БУРЕНКА",
                                    "level5": "",
                                    "level6": "ФИНПАК",
                                    "level7": "800 Г"
                                },
                                {
                                    "id": 779,
                                    type: "product", "name": "Кефир Кубанская Буренка 2.5% 900г х12 ФП ГОФР",
                                    "level4": "КУБАНСКАЯ БУРЕНКА",
                                    "level5": "",
                                    "level6": "ФИНПАК",
                                    "level7": "900 г"
                                },
                                {
                                    "id": 780,
                                    type: "product", "name": "Кефир Кубанская буренка 2.5% 950г TBSq 10Х",
                                    "level4": "КУБАНСКАЯ БУРЕНКА",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СКУЭР",
                                    "level7": "950 Г"
                                },
                                {
                                    "id": 781,
                                    type: "product", "name": "Кефир КубБуренка 1% 900г х6 ПЭТ",
                                    "level4": "КУБАНСКАЯ БУРЕНКА",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "900 г"
                                },
                                {
                                    "id": 782,
                                    type: "product", "name": "Кефир КубБуренка 2.5% 500г х10 СКСкК",
                                    "level4": "КУБАНСКАЯ БУРЕНКА",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СКУЭР",
                                    "level7": "500 г"
                                },
                                {
                                    "id": 783,
                                    type: "product", "name": "Кефир КубБуренка 2.5% 900г х18 ПлФП",
                                    "level4": "КУБАНСКАЯ БУРЕНКА",
                                    "level5": "",
                                    "level6": "ФИНПАК",
                                    "level7": "900 г"
                                },
                                {
                                    "id": 784,
                                    type: "product", "name": "Кефир КубБуренка 2.5% 900г х6 ПЭТ",
                                    "level4": "КУБАНСКАЯ БУРЕНКА",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "900 г"
                                },
                                {
                                    "id": 785,
                                    type: "product", "name": "Кефир Кунгурский 1% 190г МСТ 35Х",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН ПРЕДФОРМОВАННЫЙ",
                                    "level7": "190 Г"
                                },
                                {
                                    "id": 786,
                                    type: "product", "name": "Кефир Кунгурский 2.5% 190г МСТ 35Х",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН ПРЕДФОРМОВАННЫЙ",
                                    "level7": "190 Г"
                                },
                                {
                                    "id": 787,
                                    type: "product", "name": "Кефир Ополье 1% 1х12х1кг TBsq FC",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СКУЭР",
                                    "level7": "1 кг"
                                },
                                {
                                    "id": 788,
                                    type: "product", "name": "Кефир Ополье 1% 1х8х930мл ПЭТ",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "930 мл"
                                },
                                {
                                    "id": 789,
                                    type: "product", "name": "Кефир Ополье 3,2% 1х8х930мл ПЭТ",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "930 мл"
                                },
                                {
                                    "id": 790,
                                    type: "product", "name": "Кефир Ополье 3.2% 1кг TBsq FC",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СКУЭР",
                                    "level7": "1 кг"
                                },
                                {
                                    "id": 791,
                                    type: "product", "name": "Кефир Ополье 3.2% 1х12х0.5кг TBsq FC",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СКУЭР",
                                    "level7": "500 г"
                                },
                                {
                                    "id": 792,
                                    type: "product", "name": "Кефир Русское молоко 1% 900г х10 PP",
                                    "level4": "ЧАСТНАЯ МАРКА (РУССКОЕ МОЛОКО)",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "900 Г"
                                },
                                {
                                    "id": 793,
                                    type: "product", "name": "МКК Кефир 2,5% 900г ПЭТ",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "900 г"
                                },
                                {
                                    "id": 794,
                                    type: "product", "name": "МКК Кефир Кунгурский 1% 1000г ФП",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "ФИНПАК",
                                    "level7": "1 кг"
                                },
                                {
                                    "id": 795,
                                    type: "product", "name": "МКК Кефир Кунгурский 1% 500г x40 ФП",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "ФИНПАК",
                                    "level7": "500 г"
                                },
                                {
                                    "id": 796,
                                    type: "product", "name": "МКК Кефир Кунгурский 1% 900г ПЭТ",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "900 г"
                                },
                                {
                                    "id": 797,
                                    type: "product", "name": "МКК Кефир Кунгурский 2.5% 1000г ФП",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "ФИНПАК",
                                    "level7": "1 кг"
                                },
                                {
                                    "id": 798,
                                    type: "product", "name": "МКК Кефир Кунгурский 2.5% 500г ФП",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "ФИНПАК",
                                    "level7": "500 г"
                                },
                                {
                                    "id": 799,
                                    type: "product", "name": "МКК Кефир Кунгурский 2.5% 900г эколин",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "900 г"
                                },
                                {
                                    "id": 800,
                                    type: "product", "name": "ЮП Биокефир Лакомо 1% 0.5кг TBsq FC",
                                    "level4": "ЧАСТНАЯ МАРКА (ЛАКОМО)",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СКУЭР",
                                    "level7": "500 Г"
                                },
                                {
                                    "id": 801,
                                    type: "product", "name": "ЮП Биокефир Ополье 1% 0.5кг TBsq FC",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СКУЭР",
                                    "level7": "500 г"
                                },
                                {
                                    "id": 802,
                                    type: "product", "name": "ЮП Кефир 3.2% 0.5кг РР Каждый день",
                                    "level4": "ЧАСТНАЯ МАРКА (КАЖДЫЙ ДЕНЬ)",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "500 Г"
                                },
                                {
                                    "id": 803,
                                    type: "product", "name": "ЮП Кефир 3.2% 1кг РР Каждый день",
                                    "level4": "ЧАСТНАЯ МАРКА (КАЖДЫЙ ДЕНЬ)",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "1 КГ"
                                },
                                {
                                    "id": 804,
                                    type: "product", "name": "ЮП Кефир PL Лакомо 1% 1кг TBsq FC",
                                    "level4": "ЧАСТНАЯ МАРКА (ЛАКОМО)",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СКУЭР",
                                    "level7": "1 КГ"
                                },
                                {
                                    "id": 805,
                                    type: "product", "name": "ЮП Кефир PL Лакомо 3.2% 1кг TBsq FC",
                                    "level4": "ЧАСТНАЯ МАРКА (ЛАКОМО)",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СКУЭР",
                                    "level7": "1 КГ"
                                },
                                {
                                    "id": 806,
                                    type: "product", "name": "ЮП Кефир Ополье 3.2% 0.87кг х20 ФП",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "",
                                    "level6": "ФИНПАК",
                                    "level7": "870 г"
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": 807,
                    "name": "Кисломолочные Продукты",
                    "level": 1, type: "nodes",
                    "nodes": [
                        {
                            "id": 808,
                            "name": "Простокваша",
                            "level": 2, type: "products",
                            "products": [
                                {
                                    "id": 809,
                                    type: "product", "name": "Простокваша ДВД 3.2% 515г х12 СКСкК",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СКУЭР",
                                    "level7": "515 г"
                                },
                                {
                                    "id": 810,
                                    type: "product", "name": "Простокваша Ополье 3.2% 0.5кг РР",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "500 г"
                                },
                                {
                                    "id": 811,
                                    type: "product", "name": "Простокваша 3,2% TBSg 0,5кг Русское молоко",
                                    "level4": "ЧАСТНАЯ МАРКА (РУССКОЕ МОЛОКО)",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СКУЭР",
                                    "level7": "500 Г"
                                },
                                {
                                    "id": 812,
                                    type: "product", "name": "ЮП Простокваша Каждый день 3.2% 0.5кг РР",
                                    "level4": "ЧАСТНАЯ МАРКА (КАЖДЫЙ ДЕНЬ)",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "500 Г"
                                }
                            ]
                        },
                        {
                            "id": 813,
                            "name": "Прочие",
                            "level": 2, type: "products",
                            "products": [
                                {
                                    "id": 814,
                                    type: "product", "name": "МКК Сыворот мол пастер Кунгурск 0.1% 0.976л ФП",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "ФИНПАК",
                                    "level7": "0.976 Л"
                                }
                            ]
                        },
                        {
                            "id": 815,
                            "name": "Ряженка",
                            "level": 2, type: "products",
                            "products": [
                                {
                                    "id": 816,
                                    type: "product", "name": "Ряженка PL Романов луг 4% 0.5кг х12 TBsq FC",
                                    "level4": "ЧАСТНАЯ МАРКА (РОМАНОВ ЛУГ)",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СКУЭР",
                                    "level7": "500 Г"
                                },
                                {
                                    "id": 817,
                                    type: "product", "name": "Ряженка ДВД 3.2% 950г х10 ТР",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 818,
                                    type: "product", "name": "Ряженка Ополье 3.2% 1кг TBsqFC",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СКУЭР",
                                    "level7": "1 кг"
                                },
                                {
                                    "id": 819,
                                    type: "product", "name": "ЮП Ряженка PL Д 4% 0.5кг TBsq",
                                    "level4": "ЧАСТНАЯ МАРКА",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СКУЭР",
                                    "level7": "500 г"
                                },
                                {
                                    "id": 820,
                                    type: "product", "name": "МКК Ряженка Кунгурский 4% 500г ФП",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "ФИНПАК",
                                    "level7": "500 г"
                                },
                                {
                                    "id": 821,
                                    type: "product", "name": "МКК Ряженка Кунгурский 4% 900г ПЭТ",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "900 г"
                                },
                                {
                                    "id": 822,
                                    type: "product", "name": "Ряженка ВесМол 2.5% 475г х10 ППак/ТР",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "475 г"
                                },
                                {
                                    "id": 823,
                                    type: "product", "name": "Ряженка ДВД 2.5% 475г х10 TРТвК",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "475 г"
                                },
                                {
                                    "id": 824,
                                    type: "product", "name": "Ряженка ДВД 2.5% 950г х10 TРТвК",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 825,
                                    type: "product", "name": "Ряженка ДВД 3.2% 1000г х12 СКСкК",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СКУЭР",
                                    "level7": "1 кг"
                                },
                                {
                                    "id": 826,
                                    type: "product", "name": "Ряженка ДВД 3.2% 475г х10 TР/ППакК",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "475 г"
                                },
                                {
                                    "id": 827,
                                    type: "product", "name": "Ряженка ДВД 3.2% 515г х12 СКСкК",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СКУЭР",
                                    "level7": "515 г"
                                },
                                {
                                    "id": 828,
                                    type: "product", "name": "Ряженка ДВД 4% 900г х6 ПЭТ",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "900 г"
                                },
                                {
                                    "id": 829,
                                    type: "product", "name": "Ряженка Домик в дерене 4% 900г ПЭТ 6Х",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "900 г"
                                },
                                {
                                    "id": 830,
                                    type: "product", "name": "Ряженка Кунгурский 4% 190г МСТ 35Х",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН ПРЕДФОРМОВАННЫЙ",
                                    "level7": "190 Г"
                                },
                                {
                                    "id": 831,
                                    type: "product", "name": "Ряженка Ополье 3.2% 0.5кг TBsqFC",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СКУЭР",
                                    "level7": "500 г"
                                },
                                {
                                    "id": 832,
                                    type: "product", "name": "Ряженка Ополье 3.2% 900г ПЭТ 6Х",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "900 Г"
                                },
                                {
                                    "id": 833,
                                    type: "product", "name": "Ряженка Отборн КубБуренка 4% 0.475кг х10 TР",
                                    "level4": "КУБАНСКАЯ БУРЕНКА",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "475 г"
                                },
                                {
                                    "id": 834,
                                    type: "product", "name": "Ряженка Отборн КубБуренка 4% 0.950кг х10 TР",
                                    "level4": "КУБАНСКАЯ БУРЕНКА",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 835,
                                    type: "product", "name": "ЮП Ряженка  4% 0.5кг РР Каждый день",
                                    "level4": "ЧАСТНАЯ МАРКА (КАЖДЫЙ ДЕНЬ)",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "500 Г"
                                },
                                {
                                    "id": 836,
                                    type: "product", "name": "ЮП Ряженка PL Billa 3.2% 0.5кг TBsqFC",
                                    "level4": "ЧАСТНАЯ МАРКА",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СКУЭР",
                                    "level7": "500 г"
                                },
                                {
                                    "id": 837,
                                    type: "product", "name": "ЮП Ряженка PL Лакомо 3.2% 0.5кг  TBsqFC",
                                    "level4": "ЧАСТНАЯ МАРКА (ЛАКОМО)",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СКУЭР",
                                    "level7": "500 Г"
                                },
                                {
                                    "id": 838,
                                    type: "product", "name": "ЮП Ряженка PL Лакомо 3.2% 1кг  TBsqFC",
                                    "level4": "ЧАСТНАЯ МАРКА (ЛАКОМО)",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СКУЭР",
                                    "level7": "1 КГ"
                                },
                                {
                                    "id": 839,
                                    type: "product", "name": "ЮП Ряженка PL Русское молоко 3.2% 0.5кг TBsqFC",
                                    "level4": "ЧАСТНАЯ МАРКА (РУССКОЕ МОЛОКО)",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СКУЭР",
                                    "level7": "500 Г"
                                }
                            ]
                        },
                        {
                            "id": 840,
                            "name": "Снежок",
                            "level": 2, type: "products",
                            "products": [
                                {
                                    "id": 841,
                                    type: "product", "name": "Напит к/м Снежок ВесМол 2.5% 475г PPкр 12Х",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "475 г"
                                },
                                {
                                    "id": 842,
                                    type: "product", "name": "Прод кисмол ВесМол Снежок 2.5% 475г х10 Ппак/ТРТвК",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "475 г"
                                },
                                {
                                    "id": 843,
                                    type: "product", "name": "Прод кисмол ДВД Снежок 2.5% 475г х10 TРТвК/ППакК",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "475 г"
                                },
                                {
                                    "id": 844,
                                    type: "product", "name": "Продукт к/м Снежок ДвД 2.5% 475г РРкр 12Х",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "475 г"
                                },
                                {
                                    "id": 845,
                                    type: "product", "name": "Продукт кисмол КубБуренка Снежок 2.5%475гх10 ТРТвК",
                                    "level4": "КУБАНСКАЯ БУРЕНКА",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "475 г"
                                },
                                {
                                    "id": 846,
                                    type: "product", "name": "Снежок ВесМол 2.5% 475г PP с крышк 10Х",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "475 г"
                                },
                                {
                                    "id": 847,
                                    type: "product", "name": "Снежок Ополье 2.5% 0.5кг х10 РР",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "500 г"
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": 848,
                    "name": "Масло",
                    "level": 1, type: "nodes",
                    "nodes": [
                        {
                            "id": 849,
                            "name": "Масло Сливочное",
                            "level": 2, type: "products",
                            "products": [
                                {
                                    "id": 850,
                                    type: "product", "name": "Масло слив.Ополье 72.5% 0.2кг фольга",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "",
                                    "level6": "ФОЛЬГА",
                                    "level7": "200 г"
                                },
                                {
                                    "id": 851,
                                    type: "product", "name": "Масло слад-слив несол Кунгурс 72.5%180г х40 КашФол",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "ФОЛЬГА",
                                    "level7": "180 г"
                                },
                                {
                                    "id": 852,
                                    type: "product", "name": "Масло слив ДВД 72.5% 180г х20 КаширФол (120сут)",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ФОЛЬГА",
                                    "level7": "180 г"
                                },
                                {
                                    "id": 853,
                                    type: "product", "name": "Масло слив Каждый день 72.5% 200г х20 Кашир.фол",
                                    "level4": "ЧАСТНАЯ МАРКА (КАЖДЫЙ ДЕНЬ)",
                                    "level5": "",
                                    "level6": "ФОЛЬГА",
                                    "level7": "200 Г"
                                },
                                {
                                    "id": 854,
                                    type: "product", "name": "Масло Слив Крестьян КубБуренка 72.5% 180г х20 ФОЛ",
                                    "level4": "КУБАНСКАЯ БУРЕНКА",
                                    "level5": "",
                                    "level6": "ФОЛЬГА",
                                    "level7": "180 г"
                                },
                                {
                                    "id": 855,
                                    type: "product", "name": "Масло слив.Ополье 72.5% 0.25кг каш.фольга",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "",
                                    "level6": "ФОЛЬГА",
                                    "level7": "250 г"
                                },
                                {
                                    "id": 856,
                                    type: "product", "name": "Масло слив.Ополье 72.5% 0.2кг каш.фольга",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "",
                                    "level6": "ФОЛЬГА",
                                    "level7": "200 г"
                                },
                                {
                                    "id": 857,
                                    type: "product", "name": "Масло сливоч ДВД 72.5% 180г КаширФол 10Х",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ФОЛЬГА",
                                    "level7": "180 г"
                                },
                                {
                                    "id": 858,
                                    type: "product", "name": "Масло сливочное ВесМол 72.5% 180г КаширФол 10Х",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "ФОЛЬГА",
                                    "level7": "180 г"
                                },
                                {
                                    "id": 859,
                                    type: "product", "name": "Масло Сливочное ВесМол 72.5% 180г х20 ФОЛ",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "ФОЛЬГА",
                                    "level7": "180 г"
                                },
                                {
                                    "id": 860,
                                    type: "product", "name": "Масло Сливочное ДВД 72.5% 180г х20 ФОЛ",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ФОЛЬГА",
                                    "level7": "180 г"
                                },
                                {
                                    "id": 861,
                                    type: "product", "name": "Масло сливочное ДВД 82.5% 180г КаширФол 10Х",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ФОЛЬГА",
                                    "level7": "180 г"
                                },
                                {
                                    "id": 862,
                                    type: "product", "name": "Масло Сливочное ДВД 82.5% 180г х20 ФОЛ",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ФОЛЬГА",
                                    "level7": "180 г"
                                },
                                {
                                    "id": 863,
                                    type: "product", "name": "Масло сливочное Ополье 82.5% 180г кашир.фольга 20Х",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "",
                                    "level6": "ФОЛЬГА",
                                    "level7": "180 Г"
                                },
                                {
                                    "id": 864,
                                    type: "product", "name": "Масло трад слад-слив несол Кунгур 82.5%180г КашФол",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "ФОЛЬГА",
                                    "level7": "180 г"
                                },
                                {
                                    "id": 865,
                                    type: "product", "name": "МаслоСлив Каждый день 72.5% 180г КаширФольга 20Х",
                                    "level4": "ЧАСТНАЯ МАРКА (КАЖДЫЙ ДЕНЬ)",
                                    "level5": "",
                                    "level6": "ФОЛЬГА",
                                    "level7": "180 Г"
                                },
                                {
                                    "id": 866,
                                    type: "product", "name": "МКК Масло крест.слив.Кунгурский 72.5% 180г Каш.фол",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "ФОЛЬГА",
                                    "level7": "180 г"
                                },
                                {
                                    "id": 867,
                                    type: "product", "name": "МКК Масло слад-слив несол Кунгурс 82.5%180г КашФол",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "ФОЛЬГА",
                                    "level7": "180 г"
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": 868,
                    "name": "Молоко",
                    "level": 1, type: "nodes",
                    "nodes": [
                        {
                            "id": 869,
                            "name": "Молоко Пастеризованное",
                            "level": 2, type: "products",
                            "products": [
                                {
                                    "id": 870,
                                    type: "product", "name": "ВесМол МолокоПастер 2.5% 800г ФП 12Х",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "ФИНПАК",
                                    "level7": "800 Г"
                                },
                                {
                                    "id": 871,
                                    type: "product", "name": "Молоко Отборное пастер ВесМол 930мл х8 ПЭТ",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "930 мл"
                                },
                                {
                                    "id": 872,
                                    type: "product", "name": "Молоко отборное пастер Русское молоко 900мл х10 РР",
                                    "level4": "ЧАСТНАЯ МАРКА (РУССКОЕ МОЛОКО)",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "900 МЛ"
                                },
                                {
                                    "id": 873,
                                    type: "product", "name": "Молоко пастер ВесМол 2.5% 900г х10 ПлФП",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "ФИНПАК",
                                    "level7": "900 г"
                                },
                                {
                                    "id": 874,
                                    type: "product", "name": "Молоко пастер ВесМол 2.5% 930мл х8 ПЭТ",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "930 мл"
                                },
                                {
                                    "id": 875,
                                    type: "product", "name": "Молоко пастер ВесМол 3.2% 950г х10 ППакК/ТРТвК",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 876,
                                    type: "product", "name": "Молоко пастер ВесМолочн 3.2% 900г х12 ФП",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "ФИНПАК",
                                    "level7": "900 г"
                                },
                                {
                                    "id": 877,
                                    type: "product", "name": "Молоко пастер ДВД 2.5% 930мл х8 ПЭТ",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "930 мл"
                                },
                                {
                                    "id": 878,
                                    type: "product", "name": "Молоко пастер ДВД 3.2% 475г х10 ППакК",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "475 г"
                                },
                                {
                                    "id": 879,
                                    type: "product", "name": "Молоко пастер ДВД 3.2% 950г х10 ППакК",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 880,
                                    type: "product", "name": "Молоко пастер Домик в деревне 6% 930мл х6 ПЭТ",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "930 мл"
                                },
                                {
                                    "id": 881,
                                    type: "product", "name": "Молоко пастер КубБуренка 2.5% 900г х18 ПлФП",
                                    "level4": "КУБАНСКАЯ БУРЕНКА",
                                    "level5": "",
                                    "level6": "ФИНПАК",
                                    "level7": "900 г"
                                },
                                {
                                    "id": 882,
                                    type: "product", "name": "Молоко пастер Кунгурский 3,2% 0,9л ПЭТ",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "900 мл"
                                },
                                {
                                    "id": 883,
                                    type: "product", "name": "Молоко пастер отборн Кунгурский 3.7-4.5% 1л ФП",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "ФИНПАК",
                                    "level7": "1 л"
                                },
                                {
                                    "id": 884,
                                    type: "product", "name": "Молоко пастер Пермское 2.5% 0.876л ФП АКЦИЯ",
                                    "level4": "БЕЗ ТОРГОВОЙ МАРКИ",
                                    "level5": "",
                                    "level6": "ФИНПАК",
                                    "level7": "876 мл"
                                },
                                {
                                    "id": 885,
                                    type: "product", "name": "Молоко пастер. 2.5% 0,875л ФП",
                                    "level4": "БЕЗ ТОРГОВОЙ МАРКИ",
                                    "level5": "",
                                    "level6": "ФИНПАК",
                                    "level7": "0,875 Л"
                                },
                                {
                                    "id": 886,
                                    type: "product", "name": "Молоко пастер. Пермское 3.2% 0,9л ФП",
                                    "level4": "БЕЗ ТОРГОВОЙ МАРКИ",
                                    "level5": "",
                                    "level6": "ФИНПАК",
                                    "level7": "900 мл"
                                },
                                {
                                    "id": 887,
                                    type: "product", "name": "Молоко пастер.Кунгурский 2.5% 0,9л ПЭТ",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "900 мл"
                                },
                                {
                                    "id": 888,
                                    type: "product", "name": "Молоко пастер.Кунгурский 3.2% 1л ФП ЦЕНА НИЖЕ",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "ФИНПАК",
                                    "level7": "1 л"
                                },
                                {
                                    "id": 889,
                                    type: "product", "name": "Молоко Топл пастер ДВД 3.2% 950г х8 ПЭТ",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 890,
                                    type: "product", "name": "Молоко топлен Ополье 4% 1х12х1кг TBSq",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СКУЭР",
                                    "level7": "1 кг"
                                },
                                {
                                    "id": 891,
                                    type: "product", "name": "СМЗ Молоко пастер Ополье 3.2% 0.5л ФП",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "",
                                    "level6": "ФИНПАК",
                                    "level7": "500 МЛ"
                                },
                                {
                                    "id": 892,
                                    type: "product", "name": "СМЗ Молоко пастер Ополье 3.2% 1л ФП",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "",
                                    "level6": "ФИНПАК",
                                    "level7": "1 Л"
                                },
                                {
                                    "id": 893,
                                    type: "product", "name": "ЮП Молоко топлен Ополье 4% 1л TBSq",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СКУЭР",
                                    "level7": "1 кг"
                                },
                                {
                                    "id": 894,
                                    type: "product", "name": "МКК Молоко паст отбор Кунгурск 3.7-4.5%0.876л Экол",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "КУВШИН ПАУЧ-ПАК",
                                    "level7": "0,876 Л"
                                },
                                {
                                    "id": 895,
                                    type: "product", "name": "МКК Молоко паст отборн Кунгурск 3.7-4.5%0.876л ПЭТ",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "876 МЛ"
                                },
                                {
                                    "id": 896,
                                    type: "product", "name": "МКК Молоко пастер 2.5% 0,85л ФП АКЦИЯ 20Х",
                                    "level4": "БЕЗ ТОРГОВОЙ МАРКИ",
                                    "level5": "",
                                    "level6": "ФИНПАК",
                                    "level7": "0,85 Л"
                                },
                                {
                                    "id": 897,
                                    type: "product", "name": "МКК Молоко пастер Кунгурск 2.5% 0,9л ФП 20Х",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "ФИНПАК",
                                    "level7": "0,9 Л"
                                },
                                {
                                    "id": 898,
                                    type: "product", "name": "МКК Молоко пастер Кунгурск 3.2% 0,9л ФП 20Х",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "ФИНПАК",
                                    "level7": "0,9 Л"
                                },
                                {
                                    "id": 899,
                                    type: "product", "name": "МКК Молоко пастер Кунгурский 2.5% 0.875л Эколин",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "КУВШИН ПАУЧ-ПАК",
                                    "level7": "0,875 Л"
                                },
                                {
                                    "id": 900,
                                    type: "product", "name": "МКК Молоко пастер. 2.5% 0,827л ФП 20Х",
                                    "level4": "БЕЗ ТОРГОВОЙ МАРКИ",
                                    "level5": "",
                                    "level6": "ФИНПАК",
                                    "level7": "0,827 Л"
                                },
                                {
                                    "id": 901,
                                    type: "product", "name": "МКК Молоко пастер. 2.5% 0,827л ФП АКЦИЯ 20Х",
                                    "level4": "БЕЗ ТОРГОВОЙ МАРКИ",
                                    "level5": "",
                                    "level6": "ФИНПАК",
                                    "level7": "0,827 Л"
                                },
                                {
                                    "id": 902,
                                    type: "product", "name": "МКК Молоко пастер. 2.5% 0,875л ФП АКЦИЯ",
                                    "level4": "БЕЗ ТОРГОВОЙ МАРКИ",
                                    "level5": "",
                                    "level6": "ФИНПАК",
                                    "level7": "0,875 Л"
                                },
                                {
                                    "id": 903,
                                    type: "product", "name": "МКК Молоко пастер.Кунгурский 1.5% 0,875 л ФП 20Х",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "ФИНПАК",
                                    "level7": "900 г"
                                },
                                {
                                    "id": 904,
                                    type: "product", "name": "МКК Молоко пастер.Кунгурский 2.5% 0,875л х12 ПЭТ",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "0,875 Л"
                                },
                                {
                                    "id": 905,
                                    type: "product", "name": "МКК Молоко пастер.Кунгурский 2.5% 0.5л ФП",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "ФИНПАК",
                                    "level7": "500 мл"
                                },
                                {
                                    "id": 906,
                                    type: "product", "name": "МКК Молоко пастер.Кунгурский 2.5% 1л ФП",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "ФИНПАК",
                                    "level7": "1 л"
                                },
                                {
                                    "id": 907,
                                    type: "product", "name": "МКК Молоко пастер.Кунгурский 3.2% 0.5л ФП",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "ФИНПАК",
                                    "level7": "500 мл"
                                },
                                {
                                    "id": 908,
                                    type: "product", "name": "МКК Молоко пастер.Кунгурский 3.2% 1л ФП",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "ФИНПАК",
                                    "level7": "1 л"
                                },
                                {
                                    "id": 909,
                                    type: "product", "name": "МКК Молоко топленое Кунгурский 4% 0.5л ФП",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "ФИНПАК",
                                    "level7": "500 мл"
                                },
                                {
                                    "id": 910,
                                    type: "product", "name": "МКК Молоко топленое Кунгурский 4% 0.876л ПЭТ",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "876 МЛ"
                                },
                                {
                                    "id": 911,
                                    type: "product", "name": "МКК Молоко топленое Кунгурский 4% 0.9л ПЭТ",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "900 мл"
                                },
                                {
                                    "id": 912,
                                    type: "product", "name": "Молоко 2,5% ПЭТ 930мл Ополье",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "930 мл"
                                },
                                {
                                    "id": 913,
                                    type: "product", "name": "Молоко Отборное Billa 930мл х6 ПЭТ",
                                    "level4": "ЧАСТНАЯ МАРКА (БИЛЛА)",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "930 МЛ"
                                },
                                {
                                    "id": 914,
                                    type: "product", "name": "Молоко Отборное Ополье 1х8х930мл ПЭТ",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "930 мл"
                                },
                                {
                                    "id": 915,
                                    type: "product", "name": "Молоко Отборное пастер ВесМол 930мл х6 ПЭТ",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "930 мл"
                                },
                                {
                                    "id": 916,
                                    type: "product", "name": "Молоко Отборное пастер ДВД 1400мл х6 ПЭТ",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "1,4 л"
                                },
                                {
                                    "id": 917,
                                    type: "product", "name": "Молоко Отборное пастер ДВД 930мл х6 ПЭТ",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "930 мл"
                                },
                                {
                                    "id": 918,
                                    type: "product", "name": "Молоко Отборное пастер ДВД 930мл х6 ПЭТ КЗ",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "930 мл"
                                },
                                {
                                    "id": 919,
                                    type: "product", "name": "Молоко Отборное пастер КубБуренка 1400мл х6 ПЭТ",
                                    "level4": "КУБАНСКАЯ БУРЕНКА",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "1,4 л"
                                },
                                {
                                    "id": 920,
                                    type: "product", "name": "Молоко Отборное пастер КубБуренка 930мл х6 ПЭТ",
                                    "level4": "КУБАНСКАЯ БУРЕНКА",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "930 мл"
                                },
                                {
                                    "id": 921,
                                    type: "product", "name": "Молоко пастер ВесМол 2.5% 1л х10 ППак",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "1 л"
                                },
                                {
                                    "id": 922,
                                    type: "product", "name": "Молоко пастер ВесМол 2.5% 800г ФП 10Х",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "ФИНПАК",
                                    "level7": "800 Г"
                                },
                                {
                                    "id": 923,
                                    type: "product", "name": "Молоко пастер ВесМол 2.5% 900г х12 ПлФП",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "ФИНПАК",
                                    "level7": "900 г"
                                },
                                {
                                    "id": 924,
                                    type: "product", "name": "Молоко пастер ВесМол 2.5% 930мл х6 ПЭТ",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "930 мл"
                                },
                                {
                                    "id": 925,
                                    type: "product", "name": "Молоко пастер ВесМол 2.5% 950г х10 ППакК/ТРТвК",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 926,
                                    type: "product", "name": "Молоко пастер ВесМол 3.2% 900г х12 ПлФП",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "ФИНПАК",
                                    "level7": "900 г"
                                },
                                {
                                    "id": 927,
                                    type: "product", "name": "Молоко пастер ДВД 2.5% 1400мл х6 ПЭТ",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "1,4 л"
                                },
                                {
                                    "id": 928,
                                    type: "product", "name": "Молоко пастер ДВД 2.5% 930мл х6 ПЭТ",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "930 мл"
                                },
                                {
                                    "id": 929,
                                    type: "product", "name": "Молоко пастер ДВД 2.5% 930мл х6 ПЭТ КЗ",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "930 мл"
                                },
                                {
                                    "id": 930,
                                    type: "product", "name": "Молоко пастер Домик в дерев 2.5% 950г х10 РР",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 931,
                                    type: "product", "name": "Молоко пастер Домик в деревне 2.5% 1400мл х6 ПЭТ",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "1,4 л"
                                },
                                {
                                    "id": 932,
                                    type: "product", "name": "Молоко пастер Домик в деревне 6% 930мл х6 ПЭТ",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "930 мл"
                                },
                                {
                                    "id": 933,
                                    type: "product", "name": "Молоко пастер Кубанская Буренка 2.5% 800г ФП 12Х",
                                    "level4": "КУБАНСКАЯ БУРЕНКА",
                                    "level5": "",
                                    "level6": "ФИНПАК",
                                    "level7": "800 Г"
                                },
                                {
                                    "id": 934,
                                    type: "product", "name": "Молоко пастер КубанскБуренка 2.5% 900г х12 ФП ГОФР",
                                    "level4": "КУБАНСКАЯ БУРЕНКА",
                                    "level5": "",
                                    "level6": "ФИНПАК",
                                    "level7": "900 г"
                                },
                                {
                                    "id": 935,
                                    type: "product", "name": "Молоко пастер КубБуренка 2.5% 1400мл х6 ПЭТ",
                                    "level4": "КУБАНСКАЯ БУРЕНКА",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "1,4 л"
                                },
                                {
                                    "id": 936,
                                    type: "product", "name": "Молоко пастер КубБуренка 2.5% 930мл ПЭТ 6X",
                                    "level4": "КУБАНСКАЯ БУРЕНКА",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "930 мл"
                                },
                                {
                                    "id": 937,
                                    type: "product", "name": "Молоко пастер КубБуренка 2.5% 930мл х6 ПЭТ",
                                    "level4": "КУБАНСКАЯ БУРЕНКА",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "930 мл"
                                },
                                {
                                    "id": 938,
                                    type: "product", "name": "Молоко пастер Ополье 3.2% 1х20х0.5кг ФП",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "",
                                    "level6": "ФИНПАК",
                                    "level7": "500 МЛ"
                                },
                                {
                                    "id": 939,
                                    type: "product", "name": "Молоко Пастер Отборное Станция Молоч 930мл ПЭТ 6Х",
                                    "level4": "ЧАСТНАЯ МАРКА",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "930 мл"
                                },
                                {
                                    "id": 940,
                                    type: "product", "name": "Молоко пастериз Русское молоко 3.2% 900мл х10 РР",
                                    "level4": "ЧАСТНАЯ МАРКА (РУССКОЕ МОЛОКО)",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "900 МЛ"
                                },
                                {
                                    "id": 941,
                                    type: "product", "name": "Молоко пастериз Станция Молочная 2,5% 930мл ПЭТ 6Х",
                                    "level4": "ЧАСТНАЯ МАРКА",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "930 мл"
                                },
                                {
                                    "id": 942,
                                    type: "product", "name": "Молоко пастеризованное \"Billa\" 2,5% ПЭТ 930мл",
                                    "level4": "ЧАСТНАЯ МАРКА (БИЛЛА)",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "930 МЛ"
                                },
                                {
                                    "id": 943,
                                    type: "product", "name": "Молоко Топл пастер ДВД 3.2% 950г ПЭТ",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 944,
                                    type: "product", "name": "Молоко Топл пастер КубБуренка 3.2% 930мл х6 ПЭТ",
                                    "level4": "КУБАНСКАЯ БУРЕНКА",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "930 мл"
                                },
                                {
                                    "id": 945,
                                    type: "product", "name": "Молоко топленое Ополье 3.2% 930мл х6 ПЭТ",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "930 мл"
                                },
                                {
                                    "id": 946,
                                    type: "product", "name": "ЮП Молоко Отборное TBSq 1л Лакомо",
                                    "level4": "ЧАСТНАЯ МАРКА (ЛАКОМО)",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СКУЭР",
                                    "level7": "1 Л"
                                },
                                {
                                    "id": 947,
                                    type: "product", "name": "ЮП Молоко паст.Отборное Ополье 3.5-3.6% 1л TBsqFС",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СКУЭР",
                                    "level7": "1 кг"
                                },
                                {
                                    "id": 948,
                                    type: "product", "name": "ЮП Молоко пастер Ополье 3.2% 0.43л х20 ФинПак",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "",
                                    "level6": "ФИНПАК",
                                    "level7": "430 мл"
                                },
                                {
                                    "id": 949,
                                    type: "product", "name": "ЮП Молоко пастер Ополье 3.2% 0.87л x20 ФинПак",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "",
                                    "level6": "ФИНПАК",
                                    "level7": "870 мл"
                                },
                                {
                                    "id": 950,
                                    type: "product", "name": "ЮП Молоко пастер Ополье 3.2% 1кг  ФП",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "",
                                    "level6": "ФИНПАК",
                                    "level7": "1 Л"
                                }
                            ]
                        },
                        {
                            "id": 951,
                            "name": "Молоко Стерилизованное",
                            "level": 2, type: "products",
                            "products": [
                                {
                                    "id": 952,
                                    type: "product", "name": "Кокт Мол стерил ДВД Лес Яг 1.5% 950мл х12 TEA",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "ЯГОДЫ ЛЕСНЫЕ",
                                    "level6": "ТЕТРА ЭВЕРО АСЕПТИК",
                                    "level7": "950 МЛ"
                                },
                                {
                                    "id": 953,
                                    type: "product", "name": "Кокт Мол стерил ДВД Малина 1.5% 950мл х12 TEA",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "МАЛИНА",
                                    "level6": "ТЕТРА ЭВЕРО АСЕПТИК",
                                    "level7": "950 МЛ"
                                },
                                {
                                    "id": 954,
                                    type: "product", "name": "Молоко Отборное ультрап ДВД 950мл х12 ТЕА",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ЭВЕРО АСЕПТИК",
                                    "level7": "950 мл"
                                },
                                {
                                    "id": 955,
                                    type: "product", "name": "Молоко Отборное ультрап ДВД 950мл х12 ТЕА",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ЭВЕРО АСЕПТИК",
                                    "level7": "950 мл"
                                },
                                {
                                    "id": 956,
                                    type: "product", "name": "Молоко стер Дом в дер 3.2% 1х12х950г TBA 9 мес",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 957,
                                    type: "product", "name": "Молоко ультрап 33 Коровы 2.5% 950г х12 БЗ",
                                    "level4": "33 КОРОВЫ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 958,
                                    type: "product", "name": "Молоко ультрап 33 Коровы 2.5% 950г х12 БЗ 9 мес",
                                    "level4": "33 КОРОВЫ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 959,
                                    type: "product", "name": "Молоко ультрап 33 Коровы 3.2% 950г х12 БЗ 9 мес",
                                    "level4": "33 КОРОВЫ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 960,
                                    type: "product", "name": "Молоко ультрап Веселый молочник 3.2% 1х12х1л соц.к",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "1 л"
                                },
                                {
                                    "id": 961,
                                    type: "product", "name": "Молоко ультрап ВесМол 2.5% 950г х12 ТБА",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 962,
                                    type: "product", "name": "Молоко ультрап ВесМол 3.2% 1000г х12 БЗ",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "1 кг"
                                },
                                {
                                    "id": 963,
                                    type: "product", "name": "Молоко ультрап ВесМол 3.2% 950г х12 ТБА",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 964,
                                    type: "product", "name": "Молоко ультрап ДВД 0.5% 950г х12 СЛ",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 965,
                                    type: "product", "name": "Молоко ультрап ДВД 0.5% 950г х12 СЛ НД",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 966,
                                    type: "product", "name": "Молоко ультрап ДВД 0.5% 950мл х12 ТЕА",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ЭВЕРО АСЕПТИК",
                                    "level7": "950 мл"
                                },
                                {
                                    "id": 967,
                                    type: "product", "name": "Молоко ультрап ДВД 0.5% 950мл х12 ТЕА 9 мес",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ЭВЕРО АСЕПТИК",
                                    "level7": "950 мл"
                                },
                                {
                                    "id": 968,
                                    type: "product", "name": "Молоко ультрап ДВД 1.5% 950г х12 СЛ НД",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 969,
                                    type: "product", "name": "Молоко ультрап ДВД 2.5% 1450г х8 СЛ",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "1,45 кг"
                                },
                                {
                                    "id": 970,
                                    type: "product", "name": "Молоко ультрап ДВД 2.5% 900г х12 ТФА",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ФИНО АСЕПТИК",
                                    "level7": "900 г"
                                },
                                {
                                    "id": 971,
                                    type: "product", "name": "Молоко ультрап ДВД 2.5% 950г х12 СЛ",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 972,
                                    type: "product", "name": "Молоко ультрап ДВД 2.5% 950г х12 СЛ НД",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 973,
                                    type: "product", "name": "Молоко ультрап ДВД 2.5% 950мл х12 ТЕА",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ЭВЕРО АСЕПТИК",
                                    "level7": "950 мл"
                                },
                                {
                                    "id": 974,
                                    type: "product", "name": "Молоко ультрап ДВД 2.5% 950мл х12 ТЕА 9 мес",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ЭВЕРО АСЕПТИК",
                                    "level7": "950 мл"
                                },
                                {
                                    "id": 975,
                                    type: "product", "name": "Молоко ультрап ДВД 3.2% 1450г х8 СЛ",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "1,45 кг"
                                },
                                {
                                    "id": 976,
                                    type: "product", "name": "Молоко ультрап ДВД 3.2% 1450г х8 СЛ НД",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "1,45 кг"
                                },
                                {
                                    "id": 977,
                                    type: "product", "name": "Молоко ультрап ДВД 3.2% 900г х12 ТФА",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ФИНО АСЕПТИК",
                                    "level7": "900 г"
                                },
                                {
                                    "id": 978,
                                    type: "product", "name": "Молоко ультрап ДвД 3.2% 950г х12 TBA HeliCap 6мес",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 979,
                                    type: "product", "name": "Молоко ультрап ДВД 3.2% 950г х12 СЛ НД",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 980,
                                    type: "product", "name": "Молоко ультрап ДВД 3.2% 950г х12 СЛХК 9 мес",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 981,
                                    type: "product", "name": "Молоко ультрап ДВД 3.2% 950г х12 ТБА",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 982,
                                    type: "product", "name": "Молоко ультрап ДвД 3.2% для Капуч 950г TBAB 9м 12Х",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 983,
                                    type: "product", "name": "Молоко ультрап ДВД 3.5% 200мл х18 БЗ",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 984,
                                    type: "product", "name": "Молоко ультрап ДВД 3.5% 950г х12 СЛ НД",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 985,
                                    type: "product", "name": "Молоко ультрап ДВД 6% 950г х12 СЛ НД",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 986,
                                    type: "product", "name": "Молоко ультрап КубБуренка 0.5% 1кг х12 БЗ 9мес",
                                    "level4": "КУБАНСКАЯ БУРЕНКА",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "1 кг"
                                },
                                {
                                    "id": 987,
                                    type: "product", "name": "Молоко ультрап КубБуренка 1.5% 1кг х12 БЗ 9мес",
                                    "level4": "КУБАНСКАЯ БУРЕНКА",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "1 кг"
                                },
                                {
                                    "id": 988,
                                    type: "product", "name": "Молоко ультрап КубБуренка 2.5% 1450г х8 СЛ 9 мес",
                                    "level4": "КУБАНСКАЯ БУРЕНКА",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "1,45 кг"
                                },
                                {
                                    "id": 989,
                                    type: "product", "name": "Молоко ультрап КубБуренка 2.5% 1кг х12 БЗ 9 мес",
                                    "level4": "КУБАНСКАЯ БУРЕНКА",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "1 кг"
                                },
                                {
                                    "id": 990,
                                    type: "product", "name": "Молоко ультрап КубБуренка 3.2% 1450г х8 СЛ 9 мес",
                                    "level4": "КУБАНСКАЯ БУРЕНКА",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "1,45 кг"
                                },
                                {
                                    "id": 991,
                                    type: "product", "name": "Молоко ультрап КубБуренка 3.5% 0.2л х18 БЗ",
                                    "level4": "КУБАНСКАЯ БУРЕНКА",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 МЛ"
                                },
                                {
                                    "id": 992,
                                    type: "product", "name": "Молоко ультрап КубБуренка 6% 1кг х12 БЗ",
                                    "level4": "КУБАНСКАЯ БУРЕНКА",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "1 кг"
                                },
                                {
                                    "id": 993,
                                    type: "product", "name": "Молоко ультрап М 1.5% 950г х12 БЗ 9 мес",
                                    "level4": "М",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 994,
                                    type: "product", "name": "Молоко ультрап М 2.5% 950г х12 БЗ 9 мес",
                                    "level4": "М",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 995,
                                    type: "product", "name": "Молоко ультрап М 3.2% 1450г х8 СЛ 9 мес",
                                    "level4": "М",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "1,45 кг"
                                },
                                {
                                    "id": 996,
                                    type: "product", "name": "Молоко ультрап М 3.2% 900г х12 ТФА",
                                    "level4": "М",
                                    "level5": "",
                                    "level6": "ТЕТРА ФИНО АСЕПТИК",
                                    "level7": "900 г"
                                },
                                {
                                    "id": 997,
                                    type: "product", "name": "Молоко ультрап М 3.2% 950г х12 СЛ без крыш",
                                    "level4": "М",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 998,
                                    type: "product", "name": "Молоко ультрап Пастушок 3.2% 950г х12 БЗ",
                                    "level4": "ПАСТУШОК",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 999,
                                    type: "product", "name": "Молоко ультрап Пастушок 3.2% 950г х12 БЗ 9 мес",
                                    "level4": "ПАСТУШОК",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 1000,
                                    type: "product", "name": "Молоко ультрапаст 33 коровы 3.2% 950г х12 TBABase",
                                    "level4": "33 КОРОВЫ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 1001,
                                    type: "product", "name": "ПМ Молоко стер.3.2% 1л Кажд день ТВАВ",
                                    "level4": "ЧАСТНАЯ МАРКА (КАЖДЫЙ ДЕНЬ)",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "1 Л"
                                },
                                {
                                    "id": 1002,
                                    type: "product", "name": "Молоко стер Ополье 3.2% 1л TBAB",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СКУЭР",
                                    "level7": "1 л"
                                },
                                {
                                    "id": 1003,
                                    type: "product", "name": "Молоко стер. Ополье 1.5% 1л TBA с крыш",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СКУЭР",
                                    "level7": "1 л"
                                },
                                {
                                    "id": 1004,
                                    type: "product", "name": "Молоко стер. Ополье 2.5% 1х12х1л TBABRC",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СКУЭР",
                                    "level7": "1 л"
                                },
                                {
                                    "id": 1005,
                                    type: "product", "name": "Молоко стер.топленое PL Каждый день 3,2% 1л ТВА",
                                    "level4": "ЧАСТНАЯ МАРКА (КАЖДЫЙ ДЕНЬ)",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "1 Л"
                                },
                                {
                                    "id": 1006,
                                    type: "product", "name": "Молоко стерил Ополье 3.2% 1х12х1л TBAB с кр",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СКУЭР",
                                    "level7": "1 л"
                                },
                                {
                                    "id": 1007,
                                    type: "product", "name": "Молоко ультрап ВесМол 2.5% 1000г х12 БЗ 9 мес",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "1 кг"
                                },
                                {
                                    "id": 1008,
                                    type: "product", "name": "Молоко ультрап ВесМол 2.5% 1450г х8 СЛ 9 мес",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "1,45 кг"
                                },
                                {
                                    "id": 1009,
                                    type: "product", "name": "Молоко ультрап ВесМол 2.5% 1кг х12 БЗ",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "1 кг"
                                },
                                {
                                    "id": 1010,
                                    type: "product", "name": "Молоко ультрап ВесМол 2.5% 950г х12 БЗ 9 мес",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 1011,
                                    type: "product", "name": "Молоко ультрап ВесМол 3.2% 1000г х12 БЗ 9 мес",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "1 кг"
                                },
                                {
                                    "id": 1012,
                                    type: "product", "name": "Молоко ультрап ВесМол 3.2% 1450г х8 СЛ 9 мес",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "1,45 кг"
                                },
                                {
                                    "id": 1013,
                                    type: "product", "name": "Молоко ультрап ВесМол 3.2% 1л х12 БЗ Соц канал",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "1 л"
                                },
                                {
                                    "id": 1014,
                                    type: "product", "name": "Молоко ультрап ВесМол 3.2% 950г х12 БЗ 9 мес",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 1015,
                                    type: "product", "name": "Молоко ультрап ВМ 2.5% 950г х12 TBAS БЕЗ КРЫШ 9м",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 1016,
                                    type: "product", "name": "Молоко ультрап ДВД 0.5% 950г х12 СЛ 9 мес",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 1017,
                                    type: "product", "name": "Молоко ультрап ДВД 0.5% 950г х12 СЛХК 9 мес",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 1018,
                                    type: "product", "name": "Молоко ультрап ДВД 1.5% 950г х12 СЛХК 9 мес",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 1019,
                                    type: "product", "name": "Молоко ультрап ДВД 2.5% 1450г х8 СЛ 9 мес",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "1,45 кг"
                                },
                                {
                                    "id": 1020,
                                    type: "product", "name": "Молоко ультрап ДВД 2.5% 900г х12 ТФА 4 мес",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ФИНО АСЕПТИК",
                                    "level7": "900 г"
                                },
                                {
                                    "id": 1021,
                                    type: "product", "name": "Молоко ультрап ДВД 2.5% 950г TBA HeliCap 9мес 12Х",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 1022,
                                    type: "product", "name": "Молоко ультрап ДВД 2.5% 950г х12 СЛХК 9 мес",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 1023,
                                    type: "product", "name": "Молоко ультрап ДВД 2.5% 950г х12 ТВАSl рекап 9мес",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 1024,
                                    type: "product", "name": "Молоко ультрап ДВД 2.5%900г х12 ТФА 3 мес",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ФИНО АСЕПТИК",
                                    "level7": "900 г"
                                },
                                {
                                    "id": 1025,
                                    type: "product", "name": "Молоко ультрап ДВД 3.2% 1450г х8 СЛ 9 мес",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "1,45 кг"
                                },
                                {
                                    "id": 1026,
                                    type: "product", "name": "Молоко ультрап ДВД 3.2% 500г х15 СЛРК",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "500 г"
                                },
                                {
                                    "id": 1027,
                                    type: "product", "name": "Молоко ультрап ДВД 3.2% 900г х12 ТФА 3 мес",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ФИНО АСЕПТИК",
                                    "level7": "900 г"
                                },
                                {
                                    "id": 1028,
                                    type: "product", "name": "Молоко ультрап ДВД 3.2% 900г х12 ТФА 4 мес",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ФИНО АСЕПТИК",
                                    "level7": "900 г"
                                },
                                {
                                    "id": 1029,
                                    type: "product", "name": "Молоко ультрап ДВД 3.2% 950г х12 БЗ 9 мес",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 1030,
                                    type: "product", "name": "Молоко ультрап ДВД 3.2% 950г х12 БЗ для Капучино",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 1031,
                                    type: "product", "name": "Молоко ультрап ДВД 3.2% 950г х12 СЛХК 9 мес",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 1032,
                                    type: "product", "name": "Молоко ультрап ДВД 3.2%950г х12 СЛ 9 мес",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 1033,
                                    type: "product", "name": "Молоко ультрап ДвД 3.5% 200мл х18 ТВАB",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 1034,
                                    type: "product", "name": "Молоко ультрап ДВД 3.5% 950г х12 СЛХК 9 мес",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 1035,
                                    type: "product", "name": "Молоко ультрап ДВД 6% 950г х12 СЛХК",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 1036,
                                    type: "product", "name": "Молоко ультрап КубБур 0.5% 950г х12 TBASlHC",
                                    "level4": "КУБАНСКАЯ БУРЕНКА",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 1037,
                                    type: "product", "name": "Молоко ультрап КубБуренка 2.5% 1кг х12 БЗ",
                                    "level4": "КУБАНСКАЯ БУРЕНКА",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "1 кг"
                                },
                                {
                                    "id": 1038,
                                    type: "product", "name": "Молоко ультрап КубБуренка 3.5% 1кг х12 БЗ 9 мес",
                                    "level4": "КУБАНСКАЯ БУРЕНКА",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "1 кг"
                                },
                                {
                                    "id": 1039,
                                    type: "product", "name": "Молоко ультрап М 2.5% 900г х12 ТФА 3мес",
                                    "level4": "М",
                                    "level5": "",
                                    "level6": "ТЕТРА ФИНО АСЕПТИК",
                                    "level7": "900 г"
                                },
                                {
                                    "id": 1040,
                                    type: "product", "name": "Молоко ультрап М 2.5% 900г х12 ТФА 4 мес",
                                    "level4": "М",
                                    "level5": "",
                                    "level6": "ТЕТРА ФИНО АСЕПТИК",
                                    "level7": "900 г"
                                },
                                {
                                    "id": 1041,
                                    type: "product", "name": "Молоко ультрап М 3.2% 900г х12 ТФА 3мес",
                                    "level4": "М",
                                    "level5": "",
                                    "level6": "ТЕТРА ФИНО АСЕПТИК",
                                    "level7": "900 г"
                                },
                                {
                                    "id": 1042,
                                    type: "product", "name": "Молоко ультрап М 3.2% 900г х12 ТФА 4 мес",
                                    "level4": "М",
                                    "level5": "",
                                    "level6": "ТЕТРА ФИНО АСЕПТИК",
                                    "level7": "900 г"
                                },
                                {
                                    "id": 1043,
                                    type: "product", "name": "Молоко ультрап М 3.2% 950г х12 БЗ",
                                    "level4": "М",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 1044,
                                    type: "product", "name": "Молоко ультрап М 3.2% 950г х12 БЗ 9 мес",
                                    "level4": "М",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 1045,
                                    type: "product", "name": "Молоко ультрап Топленое ДВД 3.2% 950г х12 ТБА",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 1046,
                                    type: "product", "name": "Молоко ультрап ЧудоДетки Обог 3.2% 200мл х18 БЗ ДП",
                                    "level4": "ЧУДО ДЕТКИ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "200 мл"
                                },
                                {
                                    "id": 1047,
                                    type: "product", "name": "Молоко ультрапаст КубБур 1.5% 950г х12 TBASlHC",
                                    "level4": "КУБАНСКАЯ БУРЕНКА",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 1048,
                                    type: "product", "name": "Молоко ультрапаст КубБур 2.5% 950г х12 TBASlHC",
                                    "level4": "КУБАНСКАЯ БУРЕНКА",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 1049,
                                    type: "product", "name": "Молоко ультрапаст КубБур 3.5% 950г x12 ТВАSlHC",
                                    "level4": "КУБАНСКАЯ БУРЕНКА",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 1050,
                                    type: "product", "name": "Молоко ультрапаст КубБур 6% 950г х12 ТВАSlHC",
                                    "level4": "КУБАНСКАЯ БУРЕНКА",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СЛИМ",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 1051,
                                    type: "product", "name": "ЮП Молоко стер. PL Лакомо 1.5% 1л TBABRC",
                                    "level4": "ЧАСТНАЯ МАРКА (ЛАКОМО)",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "1 Л"
                                },
                                {
                                    "id": 1052,
                                    type: "product", "name": "ЮП Молоко стер. PL Лакомо 3.2% 1л TBABRC",
                                    "level4": "ЧАСТНАЯ МАРКА (ЛАКОМО)",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК БЕЙЗ",
                                    "level7": "1 Л"
                                }
                            ]
                        },
                        {
                            "id": 1053,
                            "name": "Прочие",
                            "level": 2, type: "products",
                            "products": [
                                {
                                    "id": 1054,
                                    type: "product", "name": "МКК Сыворот.мол.пастер Кунгурск 0.1% 1л ФП",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "ФИНПАК",
                                    "level7": "1 л"
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": 1055,
                    "name": "Прочие Молочные Десерты",
                    "level": 1, type: "nodes",
                    "nodes": [
                        {
                            "id": 1056,
                            "name": "Глазированные Сырки",
                            "level": 2, type: "products",
                            "products": [
                                {
                                    "id": 1057,
                                    type: "product", "name": "Сырок Гл зам мол жир Чудо БисквПеч 24.6% 40гх24 ПП",
                                    "level4": "ЧУДО",
                                    "level5": "БИСКВИТ",
                                    "level6": "ФЛОУПАК",
                                    "level7": "40 г"
                                },
                                {
                                    "id": 1058,
                                    type: "product", "name": "Сырок Гл зам мол жир Чудо Ваниль 25.6% 40г х24 ПП",
                                    "level4": "ЧУДО",
                                    "level5": "ВАНИЛЬ",
                                    "level6": "ФЛОУПАК",
                                    "level7": "40 г"
                                },
                                {
                                    "id": 1059,
                                    type: "product", "name": "Сырок Гл зам мол жир Чудо Ваниль 25.6% 40г х36 ПП",
                                    "level4": "ЧУДО",
                                    "level5": "ВАНИЛЬ",
                                    "level6": "ФЛОУПАК",
                                    "level7": "40 г"
                                },
                                {
                                    "id": 1060,
                                    type: "product", "name": "Сырок Гл зам мол жир Чудо Кокос 28.7% 40г х36 ПП",
                                    "level4": "ЧУДО",
                                    "level5": "КОКОС",
                                    "level6": "ФЛОУПАК",
                                    "level7": "40 г"
                                },
                                {
                                    "id": 1061,
                                    type: "product", "name": "Сырок Гл зам мол жир Чудо Шоколад 25.6% 40г х24 ПП",
                                    "level4": "ЧУДО",
                                    "level5": "ШОКОЛАД",
                                    "level6": "ФЛОУПАК",
                                    "level7": "40 г"
                                },
                                {
                                    "id": 1062,
                                    type: "product", "name": "Сырок Гл раст жир Чудо Кокос 23% 40г х36 ПП",
                                    "level4": "ЧУДО",
                                    "level5": "КОКОС",
                                    "level6": "ФЛОУПАК",
                                    "level7": "40 г"
                                },
                                {
                                    "id": 1063,
                                    type: "product", "name": "Сырок Гл Чудо Коллекц Ваниль 25% 50г х12 ПП",
                                    "level4": "ЧУДО КОЛЛЕКЦИЯ",
                                    "level5": "ВАНИЛЬ",
                                    "level6": "КАРТОН",
                                    "level7": "50 г"
                                },
                                {
                                    "id": 1064,
                                    type: "product", "name": "Сырок гл Чудо с печ биск 23% 1х24х40г",
                                    "level4": "ЧУДО",
                                    "level5": "БИСКВИТ",
                                    "level6": "ФЛОУПАК",
                                    "level7": "40 г"
                                },
                                {
                                    "id": 1065,
                                    type: "product", "name": "Сырок гл Чудо шок 23% 1х36х40г",
                                    "level4": "ЧУДО",
                                    "level5": "ШОКОЛАД",
                                    "level6": "ФЛОУПАК",
                                    "level7": "40 г"
                                },
                                {
                                    "id": 1066,
                                    type: "product", "name": "Сырок глазир Чудо Кокос 28.7% 45г х12 Карт,полипр",
                                    "level4": "ЧУДО",
                                    "level5": "КОКОС",
                                    "level6": "КАРТОН",
                                    "level7": "45 г"
                                },
                                {
                                    "id": 1067,
                                    type: "product", "name": "Сырок глазир Чудо Сгущенк 24.6% 45г х12 Карт,полип",
                                    "level4": "ЧУДО",
                                    "level5": "СГУЩЕНКА",
                                    "level6": "КАРТОН",
                                    "level7": "45 г"
                                },
                                {
                                    "id": 1068,
                                    type: "product", "name": "Сырок глазиров Чудо Ваниль 25% 45г х12 карт,полипр",
                                    "level4": "ЧУДО",
                                    "level5": "ВАНИЛЬ",
                                    "level6": "КАРТОН",
                                    "level7": "45 г"
                                },
                                {
                                    "id": 1069,
                                    type: "product", "name": "Сырок Гл зам мол жир Чудо Кокос 28.7% 40г х24 ПП",
                                    "level4": "ЧУДО",
                                    "level5": "КОКОС",
                                    "level6": "ФЛОУПАК",
                                    "level7": "40 г"
                                },
                                {
                                    "id": 1070,
                                    type: "product", "name": "Сырок Гл зам мол жир Чудо Шоколад 25.6% 40г х36 ПП",
                                    "level4": "ЧУДО",
                                    "level5": "ШОКОЛАД",
                                    "level6": "ФЛОУПАК",
                                    "level7": "40 г"
                                },
                                {
                                    "id": 1071,
                                    type: "product", "name": "Сырок глаз с печен Чудо бисквит 24.6% 40г х24 (НД)",
                                    "level4": "ЧУДО",
                                    "level5": "БИСКВИТ",
                                    "level6": "ФЛОУПАК",
                                    "level7": "40 г"
                                },
                                {
                                    "id": 1072,
                                    type: "product", "name": "Сырок глазир Ополье Ваниль 25.6% 40г полипр 12Х",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "ВАНИЛЬ",
                                    "level6": "ФЛОУПАК",
                                    "level7": "40 Г"
                                },
                                {
                                    "id": 1073,
                                    type: "product", "name": "Сырок глазир Ополье Кокос 28.7% 40г полипр 12Х",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "КОКОС",
                                    "level6": "ФЛОУПАК",
                                    "level7": "40 Г"
                                },
                                {
                                    "id": 1074,
                                    type: "product", "name": "Сырок глазир Ополье Шоколад 25.6% 40г полипр 12Х",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "ШОКОЛАД",
                                    "level6": "ФЛОУПАК",
                                    "level7": "40 Г"
                                },
                                {
                                    "id": 1075,
                                    type: "product", "name": "Сырок глазир Чудо Ваниль 25.6% 40г х24 полипр (НД)",
                                    "level4": "ЧУДО",
                                    "level5": "ВАНИЛЬ",
                                    "level6": "ФЛОУПАК",
                                    "level7": "40 г"
                                },
                                {
                                    "id": 1076,
                                    type: "product", "name": "Сырок глазир Чудо Ваниль 25.6% 40г х36 полипр (НД)",
                                    "level4": "ЧУДО",
                                    "level5": "ВАНИЛЬ",
                                    "level6": "ФЛОУПАК",
                                    "level7": "40 г"
                                },
                                {
                                    "id": 1077,
                                    type: "product", "name": "Сырок глазир Чудо Кокос 28.7% 40г х24 полипр (НД)",
                                    "level4": "ЧУДО",
                                    "level5": "КОКОС",
                                    "level6": "ФЛОУПАК",
                                    "level7": "40 г"
                                },
                                {
                                    "id": 1078,
                                    type: "product", "name": "Сырок глазир Чудо Кокос 28.7% 40г х36 полипр (НД)",
                                    "level4": "ЧУДО",
                                    "level5": "КОКОС",
                                    "level6": "ФЛОУПАК",
                                    "level7": "40 г"
                                },
                                {
                                    "id": 1079,
                                    type: "product", "name": "Сырок глазир Чудо Шоколад 25.6% 40г х24 полипр(НД)",
                                    "level4": "ЧУДО",
                                    "level5": "ШОКОЛАД",
                                    "level6": "ФЛОУПАК",
                                    "level7": "40 г"
                                },
                                {
                                    "id": 1080,
                                    type: "product", "name": "Сырок глазир Чудо Шоколад 25.6% 40г х36 полипр(НД)",
                                    "level4": "ЧУДО",
                                    "level5": "ШОКОЛАД",
                                    "level6": "ФЛОУПАК",
                                    "level7": "40 г"
                                }
                            ]
                        },
                        {
                            "id": 1081,
                            "name": "Охлажденные Снэки",
                            "level": 2, type: "products",
                            "products": [
                                {
                                    "id": 1082,
                                    type: "product", "name": "Пирож Бисквит Чудо Клубн глазир 25% 30г х24 ПП",
                                    "level4": "ЧУДО",
                                    "level5": "КЛУБНИКА",
                                    "level6": "ФЛОУПАК",
                                    "level7": "30 Г"
                                },
                                {
                                    "id": 1083,
                                    type: "product", "name": "Пирож Бисквит Чудо МолКрем 25% 28г х24 ПП",
                                    "level4": "ЧУДО",
                                    "level5": "",
                                    "level6": "ФЛОУПАК",
                                    "level7": "28 г"
                                },
                                {
                                    "id": 1084,
                                    type: "product", "name": "Пирож Бисквит Чудо МолКрем глазир 25% 30г х24 ПП",
                                    "level4": "ЧУДО",
                                    "level5": "",
                                    "level6": "ФЛОУПАК",
                                    "level7": "30 г"
                                }
                            ]
                        },
                        {
                            "id": 1085,
                            "name": "Пудинг",
                            "level": 2, type: "products",
                            "products": [
                                {
                                    "id": 1086,
                                    type: "product", "name": "Пудинг Мол Чудо Ваниль 3% 125г х24 Четв",
                                    "level4": "ЧУДО",
                                    "level5": "ВАНИЛЬ",
                                    "level6": "ЖЕСТКИЙ ПЛАСТИКОВЫЙ СТАКАНЧИК",
                                    "level7": "125 г"
                                },
                                {
                                    "id": 1087,
                                    type: "product", "name": "Пудинг Мол Чудо Карамель 3% 125г х24 Четв",
                                    "level4": "ЧУДО",
                                    "level5": "КАРАМЕЛЬ",
                                    "level6": "ЖЕСТКИЙ ПЛАСТИКОВЫЙ СТАКАНЧИК",
                                    "level7": "125 г"
                                },
                                {
                                    "id": 1088,
                                    type: "product", "name": "Пудинг Мол Чудо Шоколад 3.1% 125г х24 Четв",
                                    "level4": "ЧУДО",
                                    "level5": "ШОКОЛАД",
                                    "level6": "ЖЕСТКИЙ ПЛАСТИКОВЫЙ СТАКАНЧИК",
                                    "level7": "125 г"
                                },
                                {
                                    "id": 1089,
                                    type: "product", "name": "Пудинг Чудо ваниль 3% 1х24х125г",
                                    "level4": "ЧУДО",
                                    "level5": "ВАНИЛЬ",
                                    "level6": "ЖЕСТКИЙ ПЛАСТИКОВЫЙ СТАКАНЧИК",
                                    "level7": "125 г"
                                },
                                {
                                    "id": 1090,
                                    type: "product", "name": "Пудинг Чудо кар 3% 1х24х125г",
                                    "level4": "ЧУДО",
                                    "level5": "КАРАМЕЛЬ",
                                    "level6": "ЖЕСТКИЙ ПЛАСТИКОВЫЙ СТАКАНЧИК",
                                    "level7": "125 г"
                                },
                                {
                                    "id": 1091,
                                    type: "product", "name": "Пудинг Чудо шок 3% 1х24х125г",
                                    "level4": "ЧУДО",
                                    "level5": "ШОКОЛАД",
                                    "level6": "ЖЕСТКИЙ ПЛАСТИКОВЫЙ СТАКАНЧИК",
                                    "level7": "125 г"
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": 1092,
                    "name": "Сливки",
                    "level": 1, type: "nodes",
                    "nodes": [
                        {
                            "id": 1093,
                            "name": "Сливки Пастеризованные",
                            "level": 2, type: "products",
                            "products": [
                                {
                                    "id": 1094,
                                    type: "product", "name": "Сливки пастер. Кунгурский 10% 0.5л ФП",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "ФИНПАК",
                                    "level7": "500 мл"
                                },
                                {
                                    "id": 1095,
                                    type: "product", "name": "Сливоч коктей пастер ДвД ВанилКарам 10%270г х8 ПЭТ",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "ВАНИЛЬ-КАРАМЕЛЬ",
                                    "level6": "ПЭТ",
                                    "level7": "270 г"
                                },
                                {
                                    "id": 1096,
                                    type: "product", "name": "МКК Сливки пастер Кунгурский 10% 0.5л ФП",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "ФИНПАК",
                                    "level7": "0,489 Л"
                                },
                                {
                                    "id": 1097,
                                    type: "product", "name": "Сливки пастер Ополье 10% 0.5л TBSq",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СКУЭР",
                                    "level7": "500 мл"
                                },
                                {
                                    "id": 1098,
                                    type: "product", "name": "Сливки пастеризованные ДвД 10% 270г х8 ПЭТ",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "270 г"
                                }
                            ]
                        },
                        {
                            "id": 1099,
                            "name": "Сливки Стерилизованные",
                            "level": 2, type: "products",
                            "products": [
                                {
                                    "id": 1100,
                                    type: "product", "name": "Сливки стер Домик в деревне 10% 480г CombiFit 6Х",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "КОМБИ ФИТ",
                                    "level7": "480 г"
                                },
                                {
                                    "id": 1101,
                                    type: "product", "name": "Сливки стер Домик в деревне 20% 480г CombiFit 6Х",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "КОМБИ ФИТ",
                                    "level7": "480 г"
                                },
                                {
                                    "id": 1102,
                                    type: "product", "name": "Сливки стерил ДВД 10% 200г х21 СК",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СКУЭР",
                                    "level7": "200 г"
                                },
                                {
                                    "id": 1103,
                                    type: "product", "name": "Сливки стерил ДВД 10% 480г х12 КФ",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "КОМБИ ФИТ",
                                    "level7": "480 г"
                                },
                                {
                                    "id": 1104,
                                    type: "product", "name": "Сливки стерил ДВД 10% 750г х12 КФ",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "КОМБИ ФИТ",
                                    "level7": "750 г"
                                },
                                {
                                    "id": 1105,
                                    type: "product", "name": "Сливки стерил ДВД 20% 200г х21 СК",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СКУЭР",
                                    "level7": "200 г"
                                },
                                {
                                    "id": 1106,
                                    type: "product", "name": "Сливки стерил ДВД 20% 480г х12 КФ",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "КОМБИ ФИТ",
                                    "level7": "480 г"
                                },
                                {
                                    "id": 1107,
                                    type: "product", "name": "Сливки стерил ДВД 25% 480г х12 КФ",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "КОМБИ ФИТ",
                                    "level7": "480 г"
                                },
                                {
                                    "id": 1108,
                                    type: "product", "name": "Сливки стерил ДВД 33% 480г х12 КФ",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "КОМБИ ФИТ",
                                    "level7": "480 г"
                                },
                                {
                                    "id": 1109,
                                    type: "product", "name": "Сливки стерил Домик в деревне 10% 200г TBASq 10Х",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ТЕТРА ПАК СКУЭР",
                                    "level7": "200 г"
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": 1110,
                    "name": "Сметана",
                    "level": 1, type: "nodes",
                    "nodes": [
                        {
                            "id": 1111,
                            "name": "Творожные Продукты",
                            "level": 2, type: "products",
                            "products": [
                                {
                                    "id": 1112,
                                    type: "product", "name": "МКК Творожок Кунгурский 5% 10кг вес",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "Пластиковое ведерко",
                                    "level7": "10 кг"
                                }
                            ]
                        },
                        {
                            "id": 1113,
                            "name": "Сметана",
                            "level": 2, type: "products",
                            "products": [
                                {
                                    "id": 1114,
                                    type: "product", "name": "ВСметана Русское молоко 20% 250г х12 МСТ",
                                    "level4": "ЧАСТНАЯ МАРКА (РУССКОЕ МОЛОКО)",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН ПРЕДФОРМОВАННЫЙ",
                                    "level7": "250 Г"
                                },
                                {
                                    "id": 1115,
                                    type: "product", "name": "Сметана PL Русское молоко 20% 180г х12 МСТ",
                                    "level4": "ЧАСТНАЯ МАРКА (РУССКОЕ МОЛОКО)",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН ПРЕДФОРМОВАННЫЙ",
                                    "level7": "180 Г"
                                },
                                {
                                    "id": 1116,
                                    type: "product", "name": "Сметана БТМ 15% 950г х10 ППак",
                                    "level4": "NON BRANDED",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 1117,
                                    type: "product", "name": "Сметана БТМ 20% 950г х10 ППак",
                                    "level4": "NON BRANDED",
                                    "level5": "",
                                    "level6": "ТЕТРА РЕКС",
                                    "level7": "950 г"
                                },
                                {
                                    "id": 1118,
                                    type: "product", "name": "Сметана Веселый молочник 10% 330г х8 моност",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "330 г"
                                },
                                {
                                    "id": 1119,
                                    type: "product", "name": "Сметана Веселый молочник 20% 1х24х450г ФП",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "ФИНПАК",
                                    "level7": "450 г"
                                },
                                {
                                    "id": 1120,
                                    type: "product", "name": "Сметана ВесМол 10% 330г х12 МСТ",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "330 г"
                                },
                                {
                                    "id": 1121,
                                    type: "product", "name": "Сметана ВесМол 15% 180г х12 МСТ",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "180 г"
                                },
                                {
                                    "id": 1122,
                                    type: "product", "name": "Сметана ВесМол 15% 330г х12 МСТ",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "330 г"
                                },
                                {
                                    "id": 1123,
                                    type: "product", "name": "Сметана ВесМол 20% 180г х12 МСТ",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "180 г"
                                },
                                {
                                    "id": 1124,
                                    type: "product", "name": "Сметана ВесМол 20% 300г МСТ СГ20 8Х",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "300 Г"
                                },
                                {
                                    "id": 1125,
                                    type: "product", "name": "Сметана ВесМол 20% 330г х12 МСТ",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "330 г"
                                },
                                {
                                    "id": 1126,
                                    type: "product", "name": "Сметана ВесМол 20% 450г х12 ПлФП",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "ФИНПАК",
                                    "level7": "450 г"
                                },
                                {
                                    "id": 1127,
                                    type: "product", "name": "Сметана ДвД 10% 1х12х330г мст",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "330 г"
                                },
                                {
                                    "id": 1128,
                                    type: "product", "name": "Сметана ДВД 10% 330г х6 МСТ",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "330 г"
                                },
                                {
                                    "id": 1129,
                                    type: "product", "name": "Сметана ДВД 10% 330г х8 МСТ",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "330 г"
                                },
                                {
                                    "id": 1130,
                                    type: "product", "name": "Сметана ДВД 15% 180г МСТ (срок 25) 12Х",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "180 г"
                                },
                                {
                                    "id": 1131,
                                    type: "product", "name": "Сметана ДВД 15% 180г х12 МСТ срок 20",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "180 г"
                                },
                                {
                                    "id": 1132,
                                    type: "product", "name": "Сметана ДВД 15% 330г КартМСТ (срок25) 12Х",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "330 г"
                                },
                                {
                                    "id": 1133,
                                    type: "product", "name": "Сметана ДВД 15% 330г х12 МСТ",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "330 г"
                                },
                                {
                                    "id": 1134,
                                    type: "product", "name": "Сметана ДВД 15% 330г х12 МСТ срок",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "330 г"
                                },
                                {
                                    "id": 1135,
                                    type: "product", "name": "Сметана ДВД 15% 400г х8 МСТ",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "400 Г"
                                },
                                {
                                    "id": 1136,
                                    type: "product", "name": "Сметана ДВД 20% 180г х12 МСТ",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "180 г"
                                },
                                {
                                    "id": 1137,
                                    type: "product", "name": "Сметана ДВД 20% 180г х12 МСТ срок 25",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "180 г"
                                },
                                {
                                    "id": 1138,
                                    type: "product", "name": "Сметана ДВД 20% 330г х12 МСТ",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "330 г"
                                },
                                {
                                    "id": 1139,
                                    type: "product", "name": "Сметана ДВД 20% 330г х12 МСТ срок 25",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "330 г"
                                },
                                {
                                    "id": 1140,
                                    type: "product", "name": "Сметана ДВД 20% 400г х8 МСТ",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "400 Г"
                                },
                                {
                                    "id": 1141,
                                    type: "product", "name": "Сметана ДВД Отборн 25% 330г х12 МСТ",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "330 г"
                                },
                                {
                                    "id": 1142,
                                    type: "product", "name": "Сметана Домик в деревне 15% 300г МСТ СГ20 8Х",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "300 Г"
                                },
                                {
                                    "id": 1143,
                                    type: "product", "name": "Сметана Домик в деревне 20% 300г МСТ СГ20 8Х",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "300 Г"
                                },
                                {
                                    "id": 1144,
                                    type: "product", "name": "Сметана Домик в деревне 25% 1х12х180г м/ст",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "180 г"
                                },
                                {
                                    "id": 1145,
                                    type: "product", "name": "Сметана Домик в деревне 25% 300г МСТ 8Х",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "300 Г"
                                },
                                {
                                    "id": 1146,
                                    type: "product", "name": "Сметана Каждый день 15% 250г х12 МСТ",
                                    "level4": "ЧАСТНАЯ МАРКА (КАЖДЫЙ ДЕНЬ)",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН ПРЕДФОРМОВАННЫЙ",
                                    "level7": "250 Г"
                                },
                                {
                                    "id": 1147,
                                    type: "product", "name": "Сметана Каждый день 15% 500г х12 МСТ",
                                    "level4": "ЧАСТНАЯ МАРКА (КАЖДЫЙ ДЕНЬ)",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН ПРЕДФОРМОВАННЫЙ",
                                    "level7": "500 Г"
                                },
                                {
                                    "id": 1148,
                                    type: "product", "name": "Сметана Каждый день 20% 250г х12 МСТ",
                                    "level4": "ЧАСТНАЯ МАРКА (КАЖДЫЙ ДЕНЬ)",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН ПРЕДФОРМОВАННЫЙ",
                                    "level7": "250 Г"
                                },
                                {
                                    "id": 1149,
                                    type: "product", "name": "Сметана Каждый день 20% 500г х12 МСТ",
                                    "level4": "ЧАСТНАЯ МАРКА (КАЖДЫЙ ДЕНЬ)",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН ПРЕДФОРМОВАННЫЙ",
                                    "level7": "500 Г"
                                },
                                {
                                    "id": 1150,
                                    type: "product", "name": "Сметана КубБуренка 15% 330г х12 МСТ",
                                    "level4": "КУБАНСКАЯ БУРЕНКА",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "330 г"
                                },
                                {
                                    "id": 1151,
                                    type: "product", "name": "Сметана КубБуренка 20% 330г х12 МСТ",
                                    "level4": "КУБАНСКАЯ БУРЕНКА",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "330 г"
                                },
                                {
                                    "id": 1152,
                                    type: "product", "name": "Сметана КубБуренка 20% 400г х12 МСТ",
                                    "level4": "КУБАНСКАЯ БУРЕНКА",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "400 г"
                                },
                                {
                                    "id": 1153,
                                    type: "product", "name": "Сметана Лакомо 20% 250г х12 МСТ",
                                    "level4": "ЧАСТНАЯ МАРКА (ЛАКОМО)",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН ПРЕДФОРМОВАННЫЙ",
                                    "level7": "250 Г"
                                },
                                {
                                    "id": 1154,
                                    type: "product", "name": "Сметана Ополье 10% 330г х8 МСТ",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "330 г"
                                },
                                {
                                    "id": 1155,
                                    type: "product", "name": "Сметана Ополье 15% 180г х12 МСТ",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "180 г"
                                },
                                {
                                    "id": 1156,
                                    type: "product", "name": "Сметана Ополье 15% 330г х12 МСТ",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "330 г"
                                },
                                {
                                    "id": 1157,
                                    type: "product", "name": "Сметана Ополье 20% 180г х12 МСТ",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "180 г"
                                },
                                {
                                    "id": 1158,
                                    type: "product", "name": "Сметана Ополье 20% 330г х12 МСТ",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "330 г"
                                },
                                {
                                    "id": 1159,
                                    type: "product", "name": "Сметана Отборн КубБуренка 25% 330г х12 МСТ",
                                    "level4": "КУБАНСКАЯ БУРЕНКА",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "330 г"
                                },
                                {
                                    "id": 1160,
                                    type: "product", "name": "Сметана Русское молоко 15% 250г х12 МСТ",
                                    "level4": "ЧАСТНАЯ МАРКА (РУССКОЕ МОЛОКО)",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН ПРЕДФОРМОВАННЫЙ",
                                    "level7": "250 Г"
                                },
                                {
                                    "id": 1161,
                                    type: "product", "name": "МКК Сметана Кунгурский 15% 10кг весовая",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "Пластиковое ведерко",
                                    "level7": "10 кг"
                                },
                                {
                                    "id": 1162,
                                    type: "product", "name": "МКК Сметана Кунгурский 15% 180г моностакан",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "180 г"
                                },
                                {
                                    "id": 1163,
                                    type: "product", "name": "МКК Сметана Кунгурский 15% 250г ФП",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "ФИНПАК",
                                    "level7": "250 г"
                                },
                                {
                                    "id": 1164,
                                    type: "product", "name": "МКК Сметана Кунгурский 15% 400г +100г МСТ АКЦ 20Х",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "400 г"
                                },
                                {
                                    "id": 1165,
                                    type: "product", "name": "МКК Сметана Кунгурский 15% 400г моностакан",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "400 г"
                                },
                                {
                                    "id": 1166,
                                    type: "product", "name": "МКК Сметана Кунгурский 15% 450г ФП",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "ФИНПАК",
                                    "level7": "450 г"
                                },
                                {
                                    "id": 1167,
                                    type: "product", "name": "МКК Сметана Кунгурский 15% 5кг весовая",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "Пластиковое ведерко",
                                    "level7": "5 кг"
                                },
                                {
                                    "id": 1168,
                                    type: "product", "name": "МКК Сметана Кунгурский 20% 10кг весовая",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "Пластиковое ведерко",
                                    "level7": "10 кг"
                                },
                                {
                                    "id": 1169,
                                    type: "product", "name": "МКК Сметана Кунгурский 20% 180г мст",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "180 г"
                                },
                                {
                                    "id": 1170,
                                    type: "product", "name": "МКК Сметана Кунгурский 20% 250г ФП",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "ФИНПАК",
                                    "level7": "250 г"
                                },
                                {
                                    "id": 1171,
                                    type: "product", "name": "МКК Сметана Кунгурский 20% 400г +100г мст АКЦ 20Х",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "400 г"
                                },
                                {
                                    "id": 1172,
                                    type: "product", "name": "МКК Сметана Кунгурский 20% 400г мст",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "400 г"
                                },
                                {
                                    "id": 1173,
                                    type: "product", "name": "МКК Сметана Кунгурский 20% 450г ФП",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "ФИНПАК",
                                    "level7": "450 г"
                                },
                                {
                                    "id": 1174,
                                    type: "product", "name": "МКК Сметана Кунгурский 20% 5кг весовая",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "Пластиковое ведерко",
                                    "level7": "5 кг"
                                },
                                {
                                    "id": 1175,
                                    type: "product", "name": "Сметана PL Каждый день 15% 180г МСТ 8Х",
                                    "level4": "ЧАСТНАЯ МАРКА (КАЖДЫЙ ДЕНЬ)",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН ПРЕДФОРМОВАННЫЙ",
                                    "level7": "180 Г"
                                },
                                {
                                    "id": 1176,
                                    type: "product", "name": "Сметана PL Каждый день 15% 250г МСТ 8Х",
                                    "level4": "ЧАСТНАЯ МАРКА (КАЖДЫЙ ДЕНЬ)",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН ПРЕДФОРМОВАННЫЙ",
                                    "level7": "250 Г"
                                },
                                {
                                    "id": 1177,
                                    type: "product", "name": "Сметана PL Каждый день 15% 350г МСТ 8Х",
                                    "level4": "ЧАСТНАЯ МАРКА (КАЖДЫЙ ДЕНЬ)",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН ПРЕДФОРМОВАННЫЙ",
                                    "level7": "350 Г"
                                },
                                {
                                    "id": 1178,
                                    type: "product", "name": "Сметана PL Каждый день 15% 500г МСТ 8Х",
                                    "level4": "ЧАСТНАЯ МАРКА (КАЖДЫЙ ДЕНЬ)",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН ПРЕДФОРМОВАННЫЙ",
                                    "level7": "500 Г"
                                },
                                {
                                    "id": 1179,
                                    type: "product", "name": "Сметана PL Каждый день 20% 180г МСТ 8Х",
                                    "level4": "ЧАСТНАЯ МАРКА (КАЖДЫЙ ДЕНЬ)",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН ПРЕДФОРМОВАННЫЙ",
                                    "level7": "180 Г"
                                },
                                {
                                    "id": 1180,
                                    type: "product", "name": "Сметана PL Каждый день 20% 250г МСТ СГ25 8Х",
                                    "level4": "ЧАСТНАЯ МАРКА (КАЖДЫЙ ДЕНЬ)",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН ПРЕДФОРМОВАННЫЙ",
                                    "level7": "250 Г"
                                },
                                {
                                    "id": 1181,
                                    type: "product", "name": "Сметана PL Каждый день 20% 350г МСТ 8Х",
                                    "level4": "ЧАСТНАЯ МАРКА (КАЖДЫЙ ДЕНЬ)",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН ПРЕДФОРМОВАННЫЙ",
                                    "level7": "350 Г"
                                },
                                {
                                    "id": 1182,
                                    type: "product", "name": "Сметана PL Каждый день 20% 500г МСт СГ25 8Х",
                                    "level4": "ЧАСТНАЯ МАРКА (КАЖДЫЙ ДЕНЬ)",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН ПРЕДФОРМОВАННЫЙ",
                                    "level7": "500 Г"
                                },
                                {
                                    "id": 1183,
                                    type: "product", "name": "Сметана PL Лакомо 20% 250г МСТ СГ25 8Х",
                                    "level4": "ЧАСТНАЯ МАРКА (ЛАКОМО)",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН ПРЕДФОРМОВАННЫЙ",
                                    "level7": "250 Г"
                                },
                                {
                                    "id": 1184,
                                    type: "product", "name": "Сметана PL Русское молоко 20% 180г МСТ СГ25 8Х",
                                    "level4": "ЧАСТНАЯ МАРКА (РУССКОЕ МОЛОКО)",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН ПРЕДФОРМОВАННЫЙ",
                                    "level7": "180 Г"
                                },
                                {
                                    "id": 1185,
                                    type: "product", "name": "Сметана Веселый молочник 15% 180г МСТ 8Х",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "180 г"
                                },
                                {
                                    "id": 1186,
                                    type: "product", "name": "Сметана Веселый молочник 15% 180г МСТ 8Х",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "180 г"
                                },
                                {
                                    "id": 1187,
                                    type: "product", "name": "Сметана Веселый молочник 20% 180г мст",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "180 г"
                                },
                                {
                                    "id": 1188,
                                    type: "product", "name": "Сметана Веселый молочник 20% 180г МСТ 8Х",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "180 г"
                                },
                                {
                                    "id": 1189,
                                    type: "product", "name": "Сметана ВесМол 10% 300г МСТ 8Х",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "300 Г"
                                },
                                {
                                    "id": 1190,
                                    type: "product", "name": "Сметана ВесМол 15% 300г МСТ 8Х",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "300 Г"
                                },
                                {
                                    "id": 1191,
                                    type: "product", "name": "Сметана ВесМол 15% 300г МСТ СГ20 8Х",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "300 Г"
                                },
                                {
                                    "id": 1192,
                                    type: "product", "name": "Сметана ВесМол 15% 300г МСТ СГ21 8Х",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "300 Г"
                                },
                                {
                                    "id": 1193,
                                    type: "product", "name": "Сметана ВесМол 20% 0.25кг х40 ПлФП",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "ФИНПАК",
                                    "level7": "250 г"
                                },
                                {
                                    "id": 1194,
                                    type: "product", "name": "Сметана ВесМол 20% 300г МСТ 8Х",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "300 Г"
                                },
                                {
                                    "id": 1195,
                                    type: "product", "name": "Сметана ВесМол 20% 300г МСТ СГ21 8Х",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "300 Г"
                                },
                                {
                                    "id": 1196,
                                    type: "product", "name": "Сметана ВесМол 20% 450г х24 ПлФП",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "ФИНПАК",
                                    "level7": "450 г"
                                },
                                {
                                    "id": 1197,
                                    type: "product", "name": "Сметана ДВД 15% 180г МСТ (срок 25) 8Х",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "180 г"
                                },
                                {
                                    "id": 1198,
                                    type: "product", "name": "Сметана ДВД 15% 180г МСТ СГ30 8Х",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "180 г"
                                },
                                {
                                    "id": 1199,
                                    type: "product", "name": "Сметана ДвД 20% 180г МСТ СГ30 8Х",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "180 г"
                                },
                                {
                                    "id": 1200,
                                    type: "product", "name": "Сметана Домик в деревне 10% 300г МСТ 8Х",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "300 Г"
                                },
                                {
                                    "id": 1201,
                                    type: "product", "name": "Сметана Домик в деревне 10% 300г МСТ СГ25 8Х",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "300 Г"
                                },
                                {
                                    "id": 1202,
                                    type: "product", "name": "Сметана Домик в деревне 15% 180г МСТ 8Х",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "180 г"
                                },
                                {
                                    "id": 1203,
                                    type: "product", "name": "Сметана Домик в деревне 15% 300г МСТ 8Х",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "300 Г"
                                },
                                {
                                    "id": 1204,
                                    type: "product", "name": "Сметана Домик в деревне 15% 300г МСТ СГ21 8Х",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "300 Г"
                                },
                                {
                                    "id": 1205,
                                    type: "product", "name": "Сметана Домик в деревне 15% 300г МСТ СГ30 8Х",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "300 Г"
                                },
                                {
                                    "id": 1206,
                                    type: "product", "name": "Сметана Домик в деревне 20% 180г МСТ (срок25) 8Х",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "180 г"
                                },
                                {
                                    "id": 1207,
                                    type: "product", "name": "Сметана Домик в деревне 20% 300г МСТ 8Х",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "300 Г"
                                },
                                {
                                    "id": 1208,
                                    type: "product", "name": "Сметана Домик в деревне 20% 300г МСТ СГ21 8Х",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "300 Г"
                                },
                                {
                                    "id": 1209,
                                    type: "product", "name": "Сметана Домик в деревне 20% 300г МСТ СГ30 8Х",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "300 Г"
                                },
                                {
                                    "id": 1210,
                                    type: "product", "name": "Сметана Домик в деревне 25% 300г МСТ СГ25 8Х",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "300 Г"
                                },
                                {
                                    "id": 1211,
                                    type: "product", "name": "Сметана Домик в деревне Взбитая 14% 185г МСт 8Х",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "СЛАДКИЙ",
                                    "level6": "МОНОСТАКАН ПРЕДФОРМОВАННЫЙ",
                                    "level7": "185 G"
                                },
                                {
                                    "id": 1212,
                                    type: "product", "name": "Сметана Домик в деревне Сладкая 13.5% 300г МСТ 8Х",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "СЛАДКИЙ",
                                    "level6": "МОНОСТАКАН ПРЕДФОРМОВАННЫЙ",
                                    "level7": "300 Г"
                                },
                                {
                                    "id": 1213,
                                    type: "product", "name": "Сметана КубБур 15% 180г МСТ 8Х",
                                    "level4": "КУБАНСКАЯ БУРЕНКА",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "180 г"
                                },
                                {
                                    "id": 1214,
                                    type: "product", "name": "Сметана КубБур 15% 180г х12 МСТ",
                                    "level4": "КУБАНСКАЯ БУРЕНКА",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "180 г"
                                },
                                {
                                    "id": 1215,
                                    type: "product", "name": "Сметана КубБур 15% 300г МСТ 8Х",
                                    "level4": "КУБАНСКАЯ БУРЕНКА",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "300 Г"
                                },
                                {
                                    "id": 1216,
                                    type: "product", "name": "Сметана КубБур 20% 180г МСТ 8Х",
                                    "level4": "КУБАНСКАЯ БУРЕНКА",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "180 г"
                                },
                                {
                                    "id": 1217,
                                    type: "product", "name": "Сметана КубБур 20% 300г МСТ 8Х",
                                    "level4": "КУБАНСКАЯ БУРЕНКА",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "300 Г"
                                },
                                {
                                    "id": 1218,
                                    type: "product", "name": "Сметана КубБур 25% 300г МСТ 8Х",
                                    "level4": "КУБАНСКАЯ БУРЕНКА",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "300 Г"
                                },
                                {
                                    "id": 1219,
                                    type: "product", "name": "Сметана КубБур Взбитая 14% 185г МСт 8Х",
                                    "level4": "КУБАНСКАЯ БУРЕНКА",
                                    "level5": "СЛАДКИЙ",
                                    "level6": "МОНОСТАКАН ПРЕДФОРМОВАННЫЙ",
                                    "level7": "185 G"
                                },
                                {
                                    "id": 1220,
                                    type: "product", "name": "Сметана КубБур Сладкая 13.5% 300г МСТ 8Х",
                                    "level4": "КУБАНСКАЯ БУРЕНКА",
                                    "level5": "СЛАДКИЙ",
                                    "level6": "МОНОСТАКАН ПРЕДФОРМОВАННЫЙ",
                                    "level7": "300 Г"
                                },
                                {
                                    "id": 1221,
                                    type: "product", "name": "Сметана КубБуренка 20% 0.18кг х12 МСТ",
                                    "level4": "КУБАНСКАЯ БУРЕНКА",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "180 г"
                                },
                                {
                                    "id": 1222,
                                    type: "product", "name": "Сметана КубБуренка 20% 400г х8 ПлЧ",
                                    "level4": "КУБАНСКАЯ БУРЕНКА",
                                    "level5": "",
                                    "level6": "РУКАВНАЯ ОБОЛОЧКА",
                                    "level7": "400 г"
                                },
                                {
                                    "id": 1223,
                                    type: "product", "name": "Сметана Кунгурский 15% 450г ФП ЦЕНА НИЖЕ",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "ФИНПАК",
                                    "level7": "450 г"
                                },
                                {
                                    "id": 1224,
                                    type: "product", "name": "Сметана Кунгурский 20% 450г ФП ЦЕНА НИЖЕ",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "ФИНПАК",
                                    "level7": "450 г"
                                },
                                {
                                    "id": 1225,
                                    type: "product", "name": "Сметана Ополье 10% 300г МСТ 8Х",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "300 Г"
                                },
                                {
                                    "id": 1226,
                                    type: "product", "name": "Сметана Ополье 10% 300г МСТ СГ25 8Х",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "300 Г"
                                },
                                {
                                    "id": 1227,
                                    type: "product", "name": "Сметана Ополье 15% 180г мст 8Х",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "180 г"
                                },
                                {
                                    "id": 1228,
                                    type: "product", "name": "Сметана Ополье 15% 180г МСТ СГ25 8Х",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "180 г"
                                },
                                {
                                    "id": 1229,
                                    type: "product", "name": "Сметана Ополье 15% 300г МСТ 8Х",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "300 Г"
                                },
                                {
                                    "id": 1230,
                                    type: "product", "name": "Сметана Ополье 15% 300г МСТ СГ25 8Х",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "300 Г"
                                },
                                {
                                    "id": 1231,
                                    type: "product", "name": "Сметана Ополье 20% 180г мст 8Х",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "180 г"
                                },
                                {
                                    "id": 1232,
                                    type: "product", "name": "Сметана Ополье 20% 180г МСТ СГ25 8Х",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "180 г"
                                },
                                {
                                    "id": 1233,
                                    type: "product", "name": "Сметана Ополье 20% 250г х12 МСТ",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "250 г"
                                },
                                {
                                    "id": 1234,
                                    type: "product", "name": "Сметана Ополье 20% 300г МСТ 8Х",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "300 Г"
                                },
                                {
                                    "id": 1235,
                                    type: "product", "name": "Сметана Ополье 20% 300г МСТ СГ25 8Х",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "300 Г"
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": 1236,
                    "name": "Сыр",
                    "level": 1, type: "nodes",
                    "nodes": [
                        {
                            "id": 1237,
                            "name": "Белые Сыры",
                            "level": 2, type: "products",
                            "products": [
                                {
                                    "id": 1238,
                                    type: "product", "name": "Сыр Мяг ДВД Дерев свеж 45% 200г х12 МСТ",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН ПРЕДФОРМОВАННЫЙ",
                                    "level7": "200 Г"
                                },
                                {
                                    "id": 1239,
                                    type: "product", "name": "Сыр мягкий Деревенский свежий ДвД 45% 200г мст 6Х",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН ПРЕДФОРМОВАННЫЙ",
                                    "level7": "200 Г"
                                }
                            ]
                        },
                        {
                            "id": 1240,
                            "name": "Желтые Сыры",
                            "level": 2, type: "products",
                            "products": [
                                {
                                    "id": 1241,
                                    type: "product", "name": "Сыр Ламбер 50% 1/2 шар Вес КК 6 мес",
                                    "level4": "ЛАМБЕР",
                                    "level5": "",
                                    "level6": "ПЛЕНКА",
                                    "level7": "500 г"
                                },
                                {
                                    "id": 1242,
                                    type: "product", "name": "Сыр Ламбер 50% 1/2 шар Вес КК 6 мес",
                                    "level4": "ЛАМБЕР",
                                    "level5": "",
                                    "level6": "ПЛЕНКА",
                                    "level7": "1 кг"
                                },
                                {
                                    "id": 1243,
                                    type: "product", "name": "Сыр Ламбер 50% 1000г Вес КК",
                                    "level4": "ЛАМБЕР",
                                    "level5": "",
                                    "level6": "ПЛЕНКА",
                                    "level7": "1 кг"
                                },
                                {
                                    "id": 1244,
                                    type: "product", "name": "Сыр Ламбер 50% 1кг Вес КК 9 мес",
                                    "level4": "ЛАМБЕР",
                                    "level5": "",
                                    "level6": "ПЛЕНКА",
                                    "level7": "1 кг"
                                },
                                {
                                    "id": 1245,
                                    type: "product", "name": "Сыр Ламбер 50% 3гол Вес КК 9 мес ТА",
                                    "level4": "ЛАМБЕР",
                                    "level5": "",
                                    "level6": "ПЛЕНКА",
                                    "level7": "1 кг"
                                },
                                {
                                    "id": 1246,
                                    type: "product", "name": "Сыр Ламбер 50% 3гол Вес КК ТА",
                                    "level4": "ЛАМБЕР",
                                    "level5": "",
                                    "level6": "ПЛЕНКА",
                                    "level7": "1 кг"
                                },
                                {
                                    "id": 1247,
                                    type: "product", "name": "Сыр Ламбер 50% с конс 50% 1/2 шар Вес КК 6 мес",
                                    "level4": "ЛАМБЕР",
                                    "level5": "",
                                    "level6": "ПЛЕНКА",
                                    "level7": "500 г"
                                },
                                {
                                    "id": 1248,
                                    type: "product", "name": "Сыр Ламбер Сливочный 55% 1кг Вес КК",
                                    "level4": "ЛАМБЕР",
                                    "level5": "СЛИВКИ",
                                    "level6": "ПЛЕНКА",
                                    "level7": "1 кг"
                                },
                                {
                                    "id": 1249,
                                    type: "product", "name": "Сыр Ламбер Сливочный 55% 1кг Вес КК",
                                    "level4": "ЛАМБЕР",
                                    "level5": "СЛИВКИ",
                                    "level6": "ПЛЕНКА",
                                    "level7": "1 кг"
                                },
                                {
                                    "id": 1250,
                                    type: "product", "name": "Сыр Ламбер Тильзитер 50% 150г х12 ПлФП",
                                    "level4": "ЛАМБЕР",
                                    "level5": "",
                                    "level6": "ЛОТОК ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "150 Г"
                                },
                                {
                                    "id": 1251,
                                    type: "product", "name": "Сыр твердый Ламбер 50% 1кг вес 6 мес (X5)",
                                    "level4": "ЛАМБЕР",
                                    "level5": "",
                                    "level6": "ПЛЕНКА",
                                    "level7": "1 кг"
                                },
                                {
                                    "id": 1252,
                                    type: "product", "name": "Сыр твердый Ламбер 50% 1кг вес 9 мес (X5)",
                                    "level4": "ЛАМБЕР",
                                    "level5": "",
                                    "level6": "ПЛЕНКА",
                                    "level7": "1 кг"
                                },
                                {
                                    "id": 1253,
                                    type: "product", "name": "Сыр 50% 1кг Весовой прозр.пакет н/к (упк)",
                                    "level4": "NON BRANDED",
                                    "level5": "",
                                    "level6": "ПЛЕНКА",
                                    "level7": "1 КГ"
                                },
                                {
                                    "id": 1254,
                                    type: "product", "name": "Сыр 55% 1кг Весовой прозр.пакет н/к (упк)",
                                    "level4": "NON BRANDED",
                                    "level5": "СЛИВКИ",
                                    "level6": "завернутый",
                                    "level7": "1 КГ"
                                },
                                {
                                    "id": 1255,
                                    type: "product", "name": "Сыр Ламбер 50% 1/2 шара Вес КК",
                                    "level4": "ЛАМБЕР",
                                    "level5": "",
                                    "level6": "ПЛЕНКА",
                                    "level7": "500 г"
                                },
                                {
                                    "id": 1256,
                                    type: "product", "name": "Сыр Ламбер 50% 1/2 шара весов (Д) (кор)",
                                    "level4": "ЛАМБЕР",
                                    "level5": "",
                                    "level6": "ПЛЕНКА",
                                    "level7": "500 г"
                                },
                                {
                                    "id": 1257,
                                    type: "product", "name": "Сыр Ламбер 50% 1/2 шара весов (ШК/5)Короб",
                                    "level4": "ЛАМБЕР",
                                    "level5": "",
                                    "level6": "ПЛЕНКА",
                                    "level7": "500 г"
                                },
                                {
                                    "id": 1258,
                                    type: "product", "name": "Сыр Ламбер 50% 1000г вес 9мес для ПирПак (короб)",
                                    "level4": "ЛАМБЕР",
                                    "level5": "",
                                    "level6": "ПЛЕНКА",
                                    "level7": "1 кг"
                                },
                                {
                                    "id": 1259,
                                    type: "product", "name": "Сыр Ламбер 50% 1000г вес для ПирПак (короб)",
                                    "level4": "ЛАМБЕР",
                                    "level5": "",
                                    "level6": "ПЛЕНКА",
                                    "level7": "1 кг"
                                },
                                {
                                    "id": 1260,
                                    type: "product", "name": "Сыр Ламбер 50% 1000г Весовой СГ 210сут (короб)",
                                    "level4": "ЛАМБЕР",
                                    "level5": "",
                                    "level6": "ПЛЕНКА",
                                    "level7": "1 кг"
                                },
                                {
                                    "id": 1261,
                                    type: "product", "name": "Сыр Ламбер 50% 1кг Вес КК 9 мес",
                                    "level4": "ЛАМБЕР",
                                    "level5": "",
                                    "level6": "ПЛЕНКА",
                                    "level7": "1 кг"
                                },
                                {
                                    "id": 1262,
                                    type: "product", "name": "Сыр Ламбер 50% 230г х10 ПлФП",
                                    "level4": "ЛАМБЕР",
                                    "level5": "",
                                    "level6": "ПЛЕНКА",
                                    "level7": "230 г"
                                },
                                {
                                    "id": 1263,
                                    type: "product", "name": "Сыр Ламбер 50% 3гол Вес КК ТА",
                                    "level4": "ЛАМБЕР",
                                    "level5": "",
                                    "level6": "ПЛЕНКА",
                                    "level7": "1 кг"
                                },
                                {
                                    "id": 1264,
                                    type: "product", "name": "Сыр Ламбер 50% Вес КК 9 мес ТА",
                                    "level4": "ЛАМБЕР",
                                    "level5": "",
                                    "level6": "ПЛЕНКА",
                                    "level7": "1 кг"
                                },
                                {
                                    "id": 1265,
                                    type: "product", "name": "Сыр Ламбер Сливочный 55% Вес КК 2ШК",
                                    "level4": "ЛАМБЕР",
                                    "level5": "СЛИВКИ",
                                    "level6": "ПЛЕНКА",
                                    "level7": "1 кг"
                                },
                                {
                                    "id": 1266,
                                    type: "product", "name": "Сыр Ламбер Тильзитер 50% 150г нарезка 6Х",
                                    "level4": "ЛАМБЕР",
                                    "level5": "",
                                    "level6": "ЛОТОК ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "150 Г"
                                },
                                {
                                    "id": 1267,
                                    type: "product", "name": "Сыр Ламбер50%вес 3 гол в кор Танд СГ 210сут(короб)",
                                    "level4": "ЛАМБЕР",
                                    "level5": "",
                                    "level6": "ПЛЕНКА",
                                    "level7": "1 кг"
                                },
                                {
                                    "id": 1268,
                                    type: "product", "name": "Сыр твердый Ламбер 50% 1х1000г Весовой",
                                    "level4": "ЛАМБЕР",
                                    "level5": "",
                                    "level6": "ПЛЕНКА",
                                    "level7": "1 кг"
                                }
                            ]
                        },
                        {
                            "id": 1269,
                            "name": "Плавленые Сыры",
                            "level": 2, type: "products",
                            "products": [
                                {
                                    "id": 1270,
                                    type: "product", "name": "Сыр Плавл БТМ Сливочный Янтарь 60% 0.08кг х24 МСТ",
                                    "level4": "NON BRANDED",
                                    "level5": "СЛИВКИ",
                                    "level6": "МОНОСТАКАН ПРЕДФОРМОВАННЫЙ",
                                    "level7": "80 Г"
                                },
                                {
                                    "id": 1271,
                                    type: "product", "name": "Сыр Плавл ВесМол с Ветчиной 44.3% 0.4кг х8 Ван",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "ВЕТЧИНА",
                                    "level6": "ЛОТОК ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "400 Г"
                                },
                                {
                                    "id": 1272,
                                    type: "product", "name": "Сыр Плавл ВесМол с Ветчиной 44.3% 190г х8 Ван",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "ВЕТЧИНА",
                                    "level6": "ЛОТОК ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "190 Г"
                                },
                                {
                                    "id": 1273,
                                    type: "product", "name": "Сыр Плавл ВесМол с Грибами 44.5% 0.4кг х8 Ван",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "ГРИБЫ",
                                    "level6": "ЛОТОК ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "400 Г"
                                },
                                {
                                    "id": 1274,
                                    type: "product", "name": "Сыр Плавл ВесМол с Грибами 44.5% 190г х8 Ван",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "ГРИБЫ",
                                    "level6": "ЛОТОК ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "190 Г"
                                },
                                {
                                    "id": 1275,
                                    type: "product", "name": "Сыр Плавл ВесМол Сливочный 49% 0.4кг х8 Ван",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "СЛИВКИ",
                                    "level6": "ЛОТОК ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "400 Г"
                                },
                                {
                                    "id": 1276,
                                    type: "product", "name": "Сыр Плавл ВесМол Сливочный 49% 190г х8 Ван",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "СЛИВКИ",
                                    "level6": "ЛОТОК ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "190 Г"
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": 1277,
                    "name": "Творог",
                    "level": 1, type: "nodes",
                    "nodes": [
                        {
                            "id": 1278,
                            "name": "Творожные Продукты",
                            "level": 2, type: "products",
                            "products": [
                                {
                                    "id": 1279,
                                    type: "product", "name": "Продукт Творож ВесМол 1.8% 180г х10 Фло",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "ФЛОУПАК",
                                    "level7": "180 г"
                                },
                                {
                                    "id": 1280,
                                    type: "product", "name": "Продукт Творож ВесМол 5% 180г х10 Фло",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "ФЛОУПАК",
                                    "level7": "180 г"
                                }
                            ]
                        },
                        {
                            "id": 1281,
                            "name": "Творог Мягкий",
                            "level": 2, type: "products",
                            "products": [
                                {
                                    "id": 1282,
                                    type: "product", "name": "Творог ДВД 5.5% 250г х16 Ван",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "250 г"
                                },
                                {
                                    "id": 1283,
                                    type: "product", "name": "Творог ДВД Обезжирен 250г х16 Ван",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "250 г"
                                },
                                {
                                    "id": 1284,
                                    type: "product", "name": "Творог мягк Домик в дер 5.5% 200г х16 ванн",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "200 г"
                                },
                                {
                                    "id": 1285,
                                    type: "product", "name": "Творог мягк обезж Домик в дер 0.1% 200г х16 ванн",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "200 г"
                                },
                                {
                                    "id": 1286,
                                    type: "product", "name": "Творог мягк обезж Домик в дер 0.1% 290г х8 МСТ",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "290 г"
                                },
                                {
                                    "id": 1287,
                                    type: "product", "name": "Творог мягкий ДВД 0.1% 200г х16 ван Миниуп",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "200 г"
                                },
                                {
                                    "id": 1288,
                                    type: "product", "name": "Творог мягкий ДВД 5.5% 200г х16 ван Миниуп",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "200 г"
                                },
                                {
                                    "id": 1289,
                                    type: "product", "name": "МКК Творог мягкий Кунгурский 1% 300г мст",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "300 г"
                                },
                                {
                                    "id": 1290,
                                    type: "product", "name": "МКК Творог мягкий Кунгурский 1% 300г мст",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "300 г"
                                },
                                {
                                    "id": 1291,
                                    type: "product", "name": "МКК Творог мягкий Кунгурский 5% 300г мст",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "300 г"
                                },
                                {
                                    "id": 1292,
                                    type: "product", "name": "Творог Мяг ДВД 5.5% 180г х12 Ван",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "180 г"
                                },
                                {
                                    "id": 1293,
                                    type: "product", "name": "Творог Мяг ДВД Обезжир 180г х12 Ван",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "180 г"
                                },
                                {
                                    "id": 1294,
                                    type: "product", "name": "Творог мягк Домик в деревне 5.5% 180г ван ДП 12X",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "180 г"
                                },
                                {
                                    "id": 1295,
                                    type: "product", "name": "Творог мягкий ДВД 0.1% 170г ванн СГ23 8Х",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "170 г"
                                },
                                {
                                    "id": 1296,
                                    type: "product", "name": "Творог мягкий ДВД 0.1% 170г ванночка 8Х",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "170 г"
                                },
                                {
                                    "id": 1297,
                                    type: "product", "name": "Творог мягкий ДВД 0.1% 170г ванночка Х12",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "170 г"
                                },
                                {
                                    "id": 1298,
                                    type: "product", "name": "Творог мягкий ДВД 5.5% 170г ванн СГ23 8Х",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "170 г"
                                },
                                {
                                    "id": 1299,
                                    type: "product", "name": "Творог мягкий ДВД 5.5% 170г ванночка 12Х",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "170 г"
                                },
                                {
                                    "id": 1300,
                                    type: "product", "name": "Творог мягкий ДВД 5.5% 170г ванночка 8Х",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "170 г"
                                }
                            ]
                        },
                        {
                            "id": 1301,
                            "name": "Творог Рассыпчатый",
                            "level": 2, type: "products",
                            "products": [
                                {
                                    "id": 1302,
                                    type: "product", "name": "Творог рассыпч обезжир ДвД 0.2% 270г х6 пакет",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "мешок",
                                    "level7": "270 Г"
                                },
                                {
                                    "id": 1303,
                                    type: "product", "name": "Творог рассыпч.обезжир КубБур 0.2% 350г х6 пакет",
                                    "level4": "КУБАНСКАЯ БУРЕНКА",
                                    "level5": "",
                                    "level6": "ПАКЕТ",
                                    "level7": "350 Г"
                                },
                                {
                                    "id": 1304,
                                    type: "product", "name": "Творог рассыпчатый ДвД 9% 270г х6 пакет",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "мешок",
                                    "level7": "270 Г"
                                },
                                {
                                    "id": 1305,
                                    type: "product", "name": "Творог рассыпчатый КубБур 9% 350г х6 пакет",
                                    "level4": "КУБАНСКАЯ БУРЕНКА",
                                    "level5": "",
                                    "level6": "ПАКЕТ",
                                    "level7": "350 Г"
                                }
                            ]
                        },
                        {
                            "id": 1306,
                            "name": "Творог Традиционный",
                            "level": 2, type: "products",
                            "products": [
                                {
                                    "id": 1307,
                                    type: "product", "name": "ПМ Творог Ополье 0% 1х8х0.3кг вакуумн.упак.",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "300 г"
                                },
                                {
                                    "id": 1308,
                                    type: "product", "name": "Творог ДВД Дер Отбор 9% 170г х12 Ван",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "170 г"
                                },
                                {
                                    "id": 1309,
                                    type: "product", "name": "Творог ДВД Обезжир 170г х12 Ван",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "170 г"
                                },
                                {
                                    "id": 1310,
                                    type: "product", "name": "Творог КубБуренка Обезжир 170г х12 Ван",
                                    "level4": "КУБАНСКАЯ БУРЕНКА",
                                    "level5": "",
                                    "level6": "ЛОТОК ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "170 г"
                                },
                                {
                                    "id": 1311,
                                    type: "product", "name": "Творог КубБуренка Отборн 9% 170г х12 Ван",
                                    "level4": "КУБАНСКАЯ БУРЕНКА",
                                    "level5": "",
                                    "level6": "ЛОТОК ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "170 г"
                                },
                                {
                                    "id": 1312,
                                    type: "product", "name": "Творог Кунгурский 0.5% 100г Ванночка",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 1313,
                                    type: "product", "name": "Творог обезжирен Ополье 0.2% 170г х12 ванночка",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "",
                                    "level6": "ЛОТОК ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "170 г"
                                },
                                {
                                    "id": 1314,
                                    type: "product", "name": "Творог Ополье 5% 1х8х0.3кг вакуум.упак.",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "300 г"
                                },
                                {
                                    "id": 1315,
                                    type: "product", "name": "Творог Ополье 9% 170г х12 ванночка",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "",
                                    "level6": "ЛОТОК ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "170 г"
                                },
                                {
                                    "id": 1316,
                                    type: "product", "name": "Творог Ополье 9% 1х8х0.3кг вакуум.упак",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "300 г"
                                },
                                {
                                    "id": 1317,
                                    type: "product", "name": "Творог трад Веселый молочник 5% 1х10х180г флоуп",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "ФЛОУПАК",
                                    "level7": "180 г"
                                },
                                {
                                    "id": 1318,
                                    type: "product", "name": "МКК Творог Кунгурский 0.5% 400г пакет 20Х",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "ПАКЕТ",
                                    "level7": "500 Г"
                                },
                                {
                                    "id": 1319,
                                    type: "product", "name": "МКК Творог Кунгурский 5% 200г кашир.фольга",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "ФОЛЬГА",
                                    "level7": "200 г"
                                },
                                {
                                    "id": 1320,
                                    type: "product", "name": "МКК Творог обезжиренный Кунгурский 0% 500г весовой",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "ПАКЕТ",
                                    "level7": "500 Г"
                                },
                                {
                                    "id": 1321,
                                    type: "product", "name": "Творог Веселый молочник 0% 10х180г флоупак",
                                    "level4": "ВЕСЕЛЫЙ МОЛОЧНИК",
                                    "level5": "",
                                    "level6": "ФЛОУПАК",
                                    "level7": "180 г"
                                },
                                {
                                    "id": 1322,
                                    type: "product", "name": "Творог ДВД Дер Отбор 9% 340г х6 Ван",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "340 г"
                                },
                                {
                                    "id": 1323,
                                    type: "product", "name": "Творог ДВД Обезжир 340г х6 Ван",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "340 г"
                                },
                                {
                                    "id": 1324,
                                    type: "product", "name": "Творог Домик в деревне 9% 170г х6 ванн",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ЛОТОК ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "170 Г"
                                },
                                {
                                    "id": 1325,
                                    type: "product", "name": "Творог КубБуренка Обезжир 340г х6 Ван",
                                    "level4": "КУБАНСКАЯ БУРЕНКА",
                                    "level5": "",
                                    "level6": "ЛОТОК ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "340 г"
                                },
                                {
                                    "id": 1326,
                                    type: "product", "name": "Творог КубБуренка Отборн 9% 340г х6 Ван",
                                    "level4": "КУБАНСКАЯ БУРЕНКА",
                                    "level5": "",
                                    "level6": "ЛОТОК ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "340 г"
                                },
                                {
                                    "id": 1327,
                                    type: "product", "name": "Творог Кунгурский 0.5% 200г Ванночка",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "200 г"
                                },
                                {
                                    "id": 1328,
                                    type: "product", "name": "Творог Кунгурский 0.5% 300г Ванночка",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "300 г"
                                },
                                {
                                    "id": 1329,
                                    type: "product", "name": "Творог Кунгурский 5% весовой",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "ПАКЕТ",
                                    "level7": "500 Г"
                                },
                                {
                                    "id": 1330,
                                    type: "product", "name": "Творог Кунгурский 9% 300г х24 ванночка",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "300 г"
                                },
                                {
                                    "id": 1331,
                                    type: "product", "name": "Творог Кунгурский 9% 500г х20 весов",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "ПАКЕТ",
                                    "level7": "500 Г"
                                },
                                {
                                    "id": 1332,
                                    type: "product", "name": "Творог нежирный Кунгурский 0.5% 180г ДойПак 30Х",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "ДОЙ-ПАК",
                                    "level7": "180 Г"
                                },
                                {
                                    "id": 1333,
                                    type: "product", "name": "Творог нежирный Кунгурский 0.5% 500г ДойПак 16Х",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "ДОЙ-ПАК",
                                    "level7": "500 Г"
                                },
                                {
                                    "id": 1334,
                                    type: "product", "name": "Творог обезжир Кубанская буренка 0.2% 170г х6 ванн",
                                    "level4": "КУБАНСКАЯ БУРЕНКА",
                                    "level5": "",
                                    "level6": "ЛОТОК ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "170 г"
                                },
                                {
                                    "id": 1335,
                                    type: "product", "name": "Творог обезжирен Домик в деревне 0.2% 170г х6 ван",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ЛОТОК ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "170 Г"
                                },
                                {
                                    "id": 1336,
                                    type: "product", "name": "Творог обезжирен Ополье 0.2% 170г х6 ванночка",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "",
                                    "level6": "ЛОТОК ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "170 г"
                                },
                                {
                                    "id": 1337,
                                    type: "product", "name": "Творог обезжирен Ополье 0.2% 340г х6 ванночка",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "",
                                    "level6": "ЛОТОК ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "340 г"
                                },
                                {
                                    "id": 1338,
                                    type: "product", "name": "Творог Ополье 9% 170г х6 ванночка",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "",
                                    "level6": "ЛОТОК ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "170 г"
                                },
                                {
                                    "id": 1339,
                                    type: "product", "name": "Творог Ополье 9% 340г х6 ванночка",
                                    "level4": "ОПОЛЬЕ",
                                    "level5": "",
                                    "level6": "ЛОТОК ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "340 г"
                                },
                                {
                                    "id": 1340,
                                    type: "product", "name": "Творог отборн КубБур 9% 170г х6 ван",
                                    "level4": "КУБАНСКАЯ БУРЕНКА",
                                    "level5": "",
                                    "level6": "ЛОТОК ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "170 г"
                                },
                                {
                                    "id": 1341,
                                    type: "product", "name": "Творог традиц Домик в деревне 180г 0.2% флоуп 10Х",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ФЛОУПАК",
                                    "level7": "180 г"
                                },
                                {
                                    "id": 1342,
                                    type: "product", "name": "Творог традиц Кубанская буренка 0.2% 180г х10 флоуп",
                                    "level4": "КУБАНСКАЯ БУРЕНКА",
                                    "level5": "",
                                    "level6": "ФЛОУПАК",
                                    "level7": "180 г"
                                },
                                {
                                    "id": 1343,
                                    type: "product", "name": "Творог традиц Кубанская буренка 9% 180г х10 флоуп",
                                    "level4": "КУБАНСКАЯ БУРЕНКА",
                                    "level5": "",
                                    "level6": "ФЛОУПАК",
                                    "level7": "180 г"
                                },
                                {
                                    "id": 1344,
                                    type: "product", "name": "Творог традиц ХуторокСолнышк 0.2% 180г х10 флоуп",
                                    "level4": "ЧАСТНАЯ МАРКА (ХУТОРОК СОЛНЫШКИНО)",
                                    "level5": "",
                                    "level6": "ФЛОУПАК",
                                    "level7": "180 Г"
                                },
                                {
                                    "id": 1345,
                                    type: "product", "name": "Творог традиц ХуторокСолнышкино 9% 180г х10 флоуп",
                                    "level4": "ЧАСТНАЯ МАРКА (ХУТОРОК СОЛНЫШКИНО)",
                                    "level5": "",
                                    "level6": "ФЛОУПАК",
                                    "level7": "180 Г"
                                },
                                {
                                    "id": 1346,
                                    type: "product", "name": "Творог традици Домик в деревне 180г 5% флоуп 10Х",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "ФЛОУПАК",
                                    "level7": "180 г"
                                }
                            ]
                        },
                        {
                            "id": 1347,
                            "name": "Творог Традиционный Зерненный",
                            "level": 2, type: "products",
                            "products": [
                                {
                                    "id": 1348,
                                    type: "product", "name": "Творог зер Домик в деревне 5% 1х12х130г",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "130 г"
                                },
                                {
                                    "id": 1349,
                                    type: "product", "name": "Творог зер Домик в деревне 5% 1х12х350г",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "350 г"
                                },
                                {
                                    "id": 1350,
                                    type: "product", "name": "Прод Твор ДВД Твор Зерно в Слив 5%130г х12 МСТ",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "130 г"
                                },
                                {
                                    "id": 1351,
                                    type: "product", "name": "Прод Твор ДВД Твор Зерно в Слив 5%350г х12 МСТ",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "350 г"
                                }
                            ]
                        },
                        {
                            "id": 1352,
                            "name": "Творог Фруктовый",
                            "level": 2, type: "products",
                            "products": [
                                {
                                    "id": 1353,
                                    type: "product", "name": "МКК Творожок Кунгурский 5% 200г мст",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "200 г"
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": 1354,
                    "name": "Творожные Десерты",
                    "level": 1, type: "nodes",
                    "nodes": [
                        {
                            "id": 1355,
                            "name": "Творог Взбитый",
                            "level": 2, type: "products",
                            "products": [
                                {
                                    "id": 1356,
                                    type: "product", "name": "Дес.тв паст взб Чудо Экзотич фрук 4.2%100г х16 ван",
                                    "level4": "ЧУДО",
                                    "level5": "АНАНАС-КИВИ-МАНГО",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 Г"
                                },
                                {
                                    "id": 1357,
                                    type: "product", "name": "Десерт Твор паст взб Чудо Шок 5.2% 100гх16 Ван",
                                    "level4": "ЧУДО",
                                    "level5": "ШОКОЛАД",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 1358,
                                    type: "product", "name": "Десерт Твор паст взб ЧудоКол ШокСуфВиш4%100гх16Ван",
                                    "level4": "ЧУДО",
                                    "level5": "шоколад и вишневый",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 1359,
                                    type: "product", "name": "Десерт Твор паст взб ЧудоКол ШокСуфМал4%100гх16Ван",
                                    "level4": "ЧУДО",
                                    "level5": "МАЛИНА-ШОКОЛАД",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 1360,
                                    type: "product", "name": "Дес тв.паст взб Чудо Северн ягод 4.2% 100г х16 ван",
                                    "level4": "ЧУДО",
                                    "level5": "БРУСНИКА, КЛЮКВА, МОРОШКА",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 1361,
                                    type: "product", "name": "Десерт Твор паст взб Чудо Ананас 4.2%100гх16 Ван",
                                    "level4": "ЧУДО",
                                    "level5": "АНАНАС",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 1362,
                                    type: "product", "name": "Десерт Твор паст взб Чудо Виш Череш 4%100г х12 Ван",
                                    "level4": "ЧУДО",
                                    "level5": "ВИШНЯ-ЧЕРЕШНЯ",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 1363,
                                    type: "product", "name": "Десерт Твор паст взб Чудо Вишня 4.2% 100г х12 Ван",
                                    "level4": "ЧУДО",
                                    "level5": "ВИШНЯ",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 1364,
                                    type: "product", "name": "Десерт Твор паст взб Чудо Вишня 4.2% 100г х16 Ван",
                                    "level4": "ЧУДО",
                                    "level5": "ВИШНЯ",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 1365,
                                    type: "product", "name": "Десерт Твор паст взб Чудо ВишЧереш 4% 100гх16 Ван",
                                    "level4": "ЧУДО",
                                    "level5": "ВИШНЯ-ЧЕРЕШНЯ",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 1366,
                                    type: "product", "name": "Десерт Твор паст взб Чудо Киви Бан 4.2% 100гх16Ван",
                                    "level4": "ЧУДО",
                                    "level5": "БАНАН-КИВИ",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 1367,
                                    type: "product", "name": "Десерт Твор паст взб Чудо Киви Бан 4.2%100гх12 Ван",
                                    "level4": "ЧУДО",
                                    "level5": "БАНАН-КИВИ",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 1368,
                                    type: "product", "name": "Десерт Твор паст взб Чудо Клуб 4.2% 100г х12 Ван",
                                    "level4": "ЧУДО",
                                    "level5": "КЛУБНИКА",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 1369,
                                    type: "product", "name": "Десерт Твор паст взб Чудо Клуб 4.2% 100г х16 Ван",
                                    "level4": "ЧУДО",
                                    "level5": "КЛУБНИКА",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 1370,
                                    type: "product", "name": "Десерт Твор паст взб Чудо Клуб Земл 4% 100гх16 Ван",
                                    "level4": "ЧУДО",
                                    "level5": "КЛУБНИКА-ЗЕМЛЯНИКА",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 1371,
                                    type: "product", "name": "Десерт Твор паст взб Чудо Клуб Земл 4%100г х12 Ван",
                                    "level4": "ЧУДО",
                                    "level5": "КЛУБНИКА-ЗЕМЛЯНИКА",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 1372,
                                    type: "product", "name": "Десерт Твор паст взб Чудо Перс Груш4.2% 100гх12Ван",
                                    "level4": "ЧУДО",
                                    "level5": "ПЕРСИК-ГРУША",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 1373,
                                    type: "product", "name": "Десерт Твор паст взб Чудо Перс Груш4.2% 100гх16Ван",
                                    "level4": "ЧУДО",
                                    "level5": "ПЕРСИК-ГРУША",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 1374,
                                    type: "product", "name": "Десерт Твор паст взб Чудо ПерсМарк 4.2% 100гх16Ван",
                                    "level4": "ЧУДО",
                                    "level5": "ПЕРСИК-МАРАКУЙЯ",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 1375,
                                    type: "product", "name": "Десерт Твор паст взб Чудо Черника 4.2% 100г х16Ван",
                                    "level4": "ЧУДО",
                                    "level5": "ЧЕРНИКА",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 1376,
                                    type: "product", "name": "Десерт Твор паст взб Чудо Черника 4.2% 100гх12 Ван",
                                    "level4": "ЧУДО",
                                    "level5": "ЧЕРНИКА",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 1377,
                                    type: "product", "name": "ДесТворВзб Чудо Гавайский Микс 4.2% 100г ванн 16Х",
                                    "level4": "ЧУДО",
                                    "level5": "АНАНАС, МАНГО, ЧИА",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 Г"
                                },
                                {
                                    "id": 1378,
                                    type: "product", "name": "ДесТворВзб Чудо Клубн 5.8% 85г Ван 12Х",
                                    "level4": "ЧУДО",
                                    "level5": "КЛУБНИКА",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "85 Г"
                                },
                                {
                                    "id": 1379,
                                    type: "product", "name": "ДесТворВзб Чудо Персик 5.8% 85г Ван 12Х",
                                    "level4": "ЧУДО",
                                    "level5": "ПЕРСИК",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "85 Г"
                                },
                                {
                                    "id": 1380,
                                    type: "product", "name": "ДесТворВзб Чудо Черника 5.8% 85г Ван 12Х",
                                    "level4": "ЧУДО",
                                    "level5": "ЧЕРНИКА",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "85 Г"
                                },
                                {
                                    "id": 1381,
                                    type: "product", "name": "ДесТворВзб ЧудоГолубБруснКняжени 4.2% 100г Ван 16Х",
                                    "level4": "ЧУДО",
                                    "level5": "ГОЛУБИКА, БРУСНИКА, КНЯЖЕНИКА",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 Г"
                                },
                                {
                                    "id": 1382,
                                    type: "product", "name": "ДесТворВзбит Чудо МорожЯгодн 5.8% 85г ванн 12Х",
                                    "level4": "ЧУДО",
                                    "level5": "ЯГОДНОЕ МОРОЖЕНОЕ",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "85 Г"
                                },
                                {
                                    "id": 1383,
                                    type: "product", "name": "ДесТворВзбПаст Чудо МалЕжевика 4.2% 100г ван 16Х",
                                    "level4": "ЧУДО",
                                    "level5": "МАЛИНА, ЕЖЕВИКА",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 Г"
                                },
                                {
                                    "id": 1384,
                                    type: "product", "name": "Творог взб Чудо Ассорти 4-4.2% 100г Ванн",
                                    "level4": "ЧУДО",
                                    "level5": "",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 Г"
                                },
                                {
                                    "id": 1385,
                                    type: "product", "name": "Творог взбитый Чудо Яг ассорти 4.0% 100г сотруд",
                                    "level4": "ЧУДО",
                                    "level5": "",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 Г"
                                }
                            ]
                        },
                        {
                            "id": 1386,
                            "name": "Творог Мягкий",
                            "level": 2, type: "products",
                            "products": [
                                {
                                    "id": 1387,
                                    type: "product", "name": "МКК Творог мягкий Кунгурский 1% 130г мст",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "130 Г"
                                },
                                {
                                    "id": 1388,
                                    type: "product", "name": "МКК Творог мягкий Кунгурский 5% 130г мст",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "130 Г"
                                }
                            ]
                        },
                        {
                            "id": 1389,
                            "name": "Творог Фруктовый",
                            "level": 2, type: "products",
                            "products": [
                                {
                                    "id": 1390,
                                    type: "product", "name": "МКК Творожок Кунгурский 5% 500г мст",
                                    "level4": "КУНГУРСКИЙ",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "500 г"
                                },
                                {
                                    "id": 1391,
                                    type: "product", "name": "Прод Твор паст Чудо Клуб Земл 5.4%135г х12 ВанКрг",
                                    "level4": "ЧУДО",
                                    "level5": "КЛУБНИКА-ЗЕМЛЯНИКА",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "135 Г"
                                },
                                {
                                    "id": 1392,
                                    type: "product", "name": "Прод твор пастер Чудо-твор черн-мал 5.4% 1х12х135г",
                                    "level4": "ЧУДО",
                                    "level5": "ЧЕРНИКА, МАЛИНА",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "135 Г"
                                },
                                {
                                    "id": 1393,
                                    type: "product", "name": "Продукт Твор паст ЧудоКол ШокАп 5.5%135гх12 ВанК",
                                    "level4": "ЧУДО КОЛЛЕКЦИЯ",
                                    "level5": "ШОКОЛАД, АПЕЛЬСИН",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "135 Г"
                                },
                                {
                                    "id": 1394,
                                    type: "product", "name": "Продукт Твор паст ЧудоКол ШокКок 5.6%135гх12 ВанК",
                                    "level4": "ЧУДО КОЛЛЕКЦИЯ",
                                    "level5": "ШОКОЛАД, КОКОС",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "135 Г"
                                },
                                {
                                    "id": 1395,
                                    type: "product", "name": "Продукт Твор пастер Чудо Ван Шок 5.6% 315г х8 МСТ",
                                    "level4": "ЧУДО",
                                    "level5": "ВАНИЛЬ-ШОКОЛАД",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "315 Г"
                                },
                                {
                                    "id": 1396,
                                    type: "product", "name": "Продукт Твор пастер Чудо Виш Шок 5.6% 315г х8 МСТ",
                                    "level4": "ЧУДО",
                                    "level5": "шоколад и вишневый",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "315 Г"
                                },
                                {
                                    "id": 1397,
                                    type: "product", "name": "Продукт Твор пастер Чудо Киви 5.4% 135г х12 ВанК",
                                    "level4": "ЧУДО",
                                    "level5": "КИВИ",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "135 Г"
                                },
                                {
                                    "id": 1398,
                                    type: "product", "name": "Продукт Твор пастер Чудо Клуб Земл 5.4% 335гх8 МСТ",
                                    "level4": "ЧУДО",
                                    "level5": "КЛУБНИКА-ЗЕМЛЯНИКА",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "335 г"
                                },
                                {
                                    "id": 1399,
                                    type: "product", "name": "Продукт Твор пастер Чудо Курага 5.4% 290г х8 МСТ",
                                    "level4": "ЧУДО",
                                    "level5": "КУРАГА",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "290 г"
                                },
                                {
                                    "id": 1400,
                                    type: "product", "name": "Продукт Твор пастер Чудо Курага 5.4% 335г х8 МСТ",
                                    "level4": "ЧУДО",
                                    "level5": "КУРАГА",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "335 Г"
                                },
                                {
                                    "id": 1401,
                                    type: "product", "name": "Творог Фрукт ЧудоДетки Груш Перс 3,6%100гх12Ван ДП",
                                    "level4": "ЧУДО ДЕТКИ",
                                    "level5": "ГРУША-ПЕРСИК",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 1402,
                                    type: "product", "name": "Творог Фрукт ЧудоДетки Клуб 3,6% 100г х12 Ван ДП",
                                    "level4": "ЧУДО ДЕТКИ",
                                    "level5": "КЛУБНИКА",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 1403,
                                    type: "product", "name": "Паста мол с тв крем Чудо-тв дын-манг 5.4%1х16х125г",
                                    "level4": "ЧУДО",
                                    "level5": "ДЫНЯ, МАНГО",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "125 Г"
                                },
                                {
                                    "id": 1404,
                                    type: "product", "name": "Прод.творож с шоколадом Чудо АССОРТИ 5,6% 290г х8",
                                    "level4": "ЧУДО",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "290 г"
                                },
                                {
                                    "id": 1405,
                                    type: "product", "name": "Продукт Твор пастер Чудо Ван Шок 5.6% 290г х8 МСТ",
                                    "level4": "ЧУДО",
                                    "level5": "ВАНИЛЬ-ШОКОЛАД",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "290 г"
                                },
                                {
                                    "id": 1406,
                                    type: "product", "name": "Продукт Твор пастер Чудо Виш Шок 5.6% 290г х8 МСТ",
                                    "level4": "ЧУДО",
                                    "level5": "шоколад и вишневый",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "290 г"
                                },
                                {
                                    "id": 1407,
                                    type: "product", "name": "Продукт Твор пастер Чудо Клуб Земл 5.4%290гх8 МСТ",
                                    "level4": "ЧУДО",
                                    "level5": "КЛУБНИКА-ЗЕМЛЯНИКА",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "290 г"
                                },
                                {
                                    "id": 1408,
                                    type: "product", "name": "Продукт творожный Чудо АССОРТИ 5,4% 290г х8",
                                    "level4": "ЧУДО",
                                    "level5": "",
                                    "level6": "МОНОСТАКАН  ПРЕДФОРМОВАННЫЙ",
                                    "level7": "290 г"
                                },
                                {
                                    "id": 1409,
                                    type: "product", "name": "Твор фр ЧудоДет Вкусомаг МалЕжев 3.8% 100г Ван 6Х",
                                    "level4": "ЧУДО ДЕТКИ",
                                    "level5": "МАЛИНА, ЕЖЕВИКА",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 Г"
                                },
                                {
                                    "id": 1410,
                                    type: "product", "name": "Твор фр ЧудоДетки Вкусомаг ЯблБан 3.8% 100г Ван 6Х",
                                    "level4": "ЧУДО ДЕТКИ",
                                    "level5": "ЯБЛОКО-БАНАН",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 Г"
                                },
                                {
                                    "id": 1411,
                                    type: "product", "name": "ТворогФруктДвусл ДвД Вишня 4.6% 125г ванн 16Х",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "ВИШНЯ",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "125 Г"
                                },
                                {
                                    "id": 1412,
                                    type: "product", "name": "ТворогФруктДвусл ДвД Клубника 4.6% 125г ванн 16Х",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "КЛУБНИКА",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "125 Г"
                                },
                                {
                                    "id": 1413,
                                    type: "product", "name": "ТворогФруктДвусл ДвД Черника 4.6% 125г ванн 16Х",
                                    "level4": "ДОМИК В ДЕРЕВНЕ",
                                    "level5": "ЧЕРНИКА",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "125 Г"
                                },
                                {
                                    "id": 1414,
                                    type: "product", "name": "ТворФр ЧудоДет Вкусомаг КлубДыня 3.8% 100г Ван 6Х",
                                    "level4": "ЧУДО ДЕТКИ",
                                    "level5": "КЛУБНИКА И ДЫНЯ",
                                    "level6": "СТАКАН ТЕРМОФОРМОВАННЫЙ",
                                    "level7": "100 Г"
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": 1415,
                    "name": "Функциональные Продукты",
                    "level": 1, type: "nodes",
                    "nodes": [
                        {
                            "id": 1416,
                            "name": "Функциональные Напитки",
                            "level": 2, type: "products",
                            "products": [
                                {
                                    "id": 1417,
                                    type: "product", "name": "Нап к/м с сок Имунеле Землян 1.2% 100г х24 Клиника",
                                    "level4": "ИМУНЕЛЕ",
                                    "level5": "ЗЕМЛЯНИКА",
                                    "level6": "ПЭТ",
                                    "level7": "100 Г"
                                },
                                {
                                    "id": 1418,
                                    type: "product", "name": "Нап к/м с сок Имунеле Мали-морош 1.2% 100г х48 БП",
                                    "level4": "ИМУНЕЛЕ",
                                    "level5": "МАЛИНА-МОРОШКА",
                                    "level6": "ПЭТ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 1419,
                                    type: "product", "name": "Нап к/м с сок Имунеле Мультиф 1.2% 100г х24 Клиник",
                                    "level4": "ИМУНЕЛЕ",
                                    "level5": "МУЛЬТИФРУКТ",
                                    "level6": "ПЭТ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 1420,
                                    type: "product", "name": "Нап к/м с сок Имунеле Черни 1,2% 100г х24 Клиник",
                                    "level4": "ИМУНЕЛЕ",
                                    "level5": "ЧЕРНИКА",
                                    "level6": "ПЭТ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 1421,
                                    type: "product", "name": "Нап к/м с сок Имунеле Черник 1,2% 24х100г БП (2х4)",
                                    "level4": "ИМУНЕЛЕ",
                                    "level5": "ЧЕРНИКА",
                                    "level6": "ПЭТ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 1422,
                                    type: "product", "name": "Нап к/м фр Имунеле forKids ЯблБан 1.5% 100г х48 БП",
                                    "level4": "ИМУНЕЛЕ FOR KIDS",
                                    "level5": "ЯБЛОКО, БАНАН",
                                    "level6": "ПЭТ",
                                    "level7": "100 Г"
                                },
                                {
                                    "id": 1423,
                                    type: "product", "name": "Нап кисмол Имунеле Брусника Шипов 1.2% 100г х24 БП100г",
                                    "level4": "ИМУНЕЛЕ",
                                    "level5": "БРУСНИКА-ШИПОВНИК",
                                    "level6": "ПЭТ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 1424,
                                    type: "product", "name": "Нап кисмол Имунеле Брусника Шипов 1.2% 100гх48БП",
                                    "level4": "ИМУНЕЛЕ",
                                    "level5": "БРУСНИКА-ШИПОВНИК",
                                    "level6": "ПЭТ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 1425,
                                    type: "product", "name": "Нап кисмол Имунеле Гранат 1.2% 100г х48 БП",
                                    "level4": "ИМУНЕЛЕ",
                                    "level5": "ГРАНАТ",
                                    "level6": "ПЭТ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 1426,
                                    type: "product", "name": "Нап кисмол Имунеле ГрецОрех 1.2% 200гх24 БП",
                                    "level4": "ИМУНЕЛЕ FOR MEN",
                                    "level5": "ГРЕЦКИЙ ОРЕХ",
                                    "level6": "ПЭТ",
                                    "level7": "200 Г"
                                },
                                {
                                    "id": 1427,
                                    type: "product", "name": "Нап кисмол Имунеле Землян 1.2% 100г х12 БП",
                                    "level4": "ИМУНЕЛЕ",
                                    "level5": "ЗЕМЛЯНИКА",
                                    "level6": "ПЭТ",
                                    "level7": "100 Г"
                                },
                                {
                                    "id": 1428,
                                    type: "product", "name": "Нап кисмол Имунеле Землян 1.2% 100г х24 БП",
                                    "level4": "ИМУНЕЛЕ",
                                    "level5": "ЗЕМЛЯНИКА",
                                    "level6": "ПЭТ",
                                    "level7": "100 Г"
                                },
                                {
                                    "id": 1429,
                                    type: "product", "name": "Нап кисмол Имунеле Землян 1.2% 100г х48 БП",
                                    "level4": "ИМУНЕЛЕ",
                                    "level5": "ЗЕМЛЯНИКА",
                                    "level6": "ПЭТ",
                                    "level7": "100 Г"
                                },
                                {
                                    "id": 1430,
                                    type: "product", "name": "Нап кисмол Имунеле Классич 1.2% 100г х24 БП",
                                    "level4": "ИМУНЕЛЕ",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 1431,
                                    type: "product", "name": "Нап кисмол Имунеле Классич 1.2% 100г х48 БП",
                                    "level4": "ИМУНЕЛЕ",
                                    "level5": "",
                                    "level6": "ПЭТ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 1432,
                                    type: "product", "name": "Нап кисмол Имунеле Кокос 1.2% 200г х24 БП",
                                    "level4": "ИМУНЕЛЕ FOR MEN",
                                    "level5": "КОКОСОВЫЙ",
                                    "level6": "ПЭТ",
                                    "level7": "200 Г"
                                },
                                {
                                    "id": 1433,
                                    type: "product", "name": "Нап кисмол Имунеле Кофе 1.2% 200г х24 БП",
                                    "level4": "ИМУНЕЛЕ FOR MEN",
                                    "level5": "КОФЕ",
                                    "level6": "ПЭТ",
                                    "level7": "200 Г"
                                },
                                {
                                    "id": 1434,
                                    type: "product", "name": "Нап кисмол Имунеле ЛесЯг 1.2% 100г х12 БП",
                                    "level4": "ИМУНЕЛЕ",
                                    "level5": "ЯГОДЫ ЛЕСНЫЕ",
                                    "level6": "ПЭТ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 1435,
                                    type: "product", "name": "Нап кисмол Имунеле ЛесЯг 1.2% 100г х48 БП",
                                    "level4": "ИМУНЕЛЕ",
                                    "level5": "ЯГОДЫ ЛЕСНЫЕ",
                                    "level6": "ПЭТ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 1436,
                                    type: "product", "name": "Нап кисмол Имунеле МультФр 1.2% 100г х12 БП",
                                    "level4": "ИМУНЕЛЕ",
                                    "level5": "МУЛЬТИФРУКТ",
                                    "level6": "ПЭТ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 1437,
                                    type: "product", "name": "Нап кисмол Имунеле МультФр 1.2% 100г х48 БП",
                                    "level4": "ИМУНЕЛЕ",
                                    "level5": "МУЛЬТИФРУКТ",
                                    "level6": "ПЭТ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 1438,
                                    type: "product", "name": "Нап кисмол Имунеле Черника 1.2% 100г х12 БП",
                                    "level4": "ИМУНЕЛЕ",
                                    "level5": "ЧЕРНИКА",
                                    "level6": "ПЭТ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 1439,
                                    type: "product", "name": "Нап кисмол Имунеле Черника 1.2% 100г х48 БП",
                                    "level4": "ИМУНЕЛЕ",
                                    "level5": "ЧЕРНИКА",
                                    "level6": "ПЭТ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 1440,
                                    type: "product", "name": "Нап кисмол Имунеле Чсмор КрСмор 1.2%100г х24 БП",
                                    "level4": "ИМУНЕЛЕ",
                                    "level5": "СМОРОДИНА ЧЕРНАЯ-СМОРОДИНА КРАСНАЯ",
                                    "level6": "ПЭТ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 1441,
                                    type: "product", "name": "Нап кисмол Имунеле Чсмор КрСмор 1.2%100гх48 БП",
                                    "level4": "ИМУНЕЛЕ",
                                    "level5": "СМОРОДИНА ЧЕРНАЯ-СМОРОДИНА КРАСНАЯ",
                                    "level6": "ПЭТ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 1442,
                                    type: "product", "name": "Нап кисмол сок Имунеле forKids ТутФр1.5%100гх12 БП",
                                    "level4": "ИМУНЕЛЕ FOR KIDS",
                                    "level5": "ТУТТИ-ФРУТТИ",
                                    "level6": "ПЭТ",
                                    "level7": "100 Г"
                                },
                                {
                                    "id": 1443,
                                    type: "product", "name": "Нап кисмол сок Имунеле forKids ТутФр1.5%100гх48 БП",
                                    "level4": "ИМУНЕЛЕ FOR KIDS",
                                    "level5": "ТУТТИ-ФРУТТИ",
                                    "level6": "ПЭТ",
                                    "level7": "100 Г"
                                },
                                {
                                    "id": 1444,
                                    type: "product", "name": "Нап кисмол сок Имунеле forKids ЯгБум1.5%100гх48 БП",
                                    "level4": "ИМУНЕЛЕ FOR KIDS",
                                    "level5": "КЛЮКВА, ЕЖЕВИКА",
                                    "level6": "ПЭТ",
                                    "level7": "100 Г"
                                },
                                {
                                    "id": 1445,
                                    type: "product", "name": "Нап кисмол сок ИмунелеforKids МалПл 1.5%100гх12 БП",
                                    "level4": "ИМУНЕЛЕ FOR KIDS",
                                    "level5": "МАЛИНА, ПЛОМБИР",
                                    "level6": "ПЭТ",
                                    "level7": "100 Г"
                                },
                                {
                                    "id": 1446,
                                    type: "product", "name": "Нап кисмол сок ИмунелеforKids МалПл 1.5%100гх48 БП",
                                    "level4": "ИМУНЕЛЕ FOR KIDS",
                                    "level5": "МАЛИНА, ПЛОМБИР",
                                    "level6": "ПЭТ",
                                    "level7": "100 Г"
                                },
                                {
                                    "id": 1447,
                                    type: "product", "name": "Напит к/м с сок Имунеле Крас виногр 200г х24 БП",
                                    "level4": "ИМУНЕЛЕ FOR MEN",
                                    "level5": "ВИНОГРАД КРАСНЫЙ",
                                    "level6": "ПЭТ",
                                    "level7": "200 Г"
                                },
                                {
                                    "id": 1448,
                                    type: "product", "name": "Имунеле СилаФрук НапКисМол КлубнБан 1% 100г БП 24Х",
                                    "level4": "ИМУНЕЛЕ",
                                    "level5": "КЛУБНИКА И БАНАН",
                                    "level6": "ПЭТ",
                                    "level7": "100 Г"
                                },
                                {
                                    "id": 1449,
                                    type: "product", "name": "Имунеле СилаФрук НапКисМол Манго 1% 100г БП 24Х",
                                    "level4": "ИМУНЕЛЕ",
                                    "level5": "МАНГО",
                                    "level6": "ПЭТ",
                                    "level7": "100 Г"
                                },
                                {
                                    "id": 1450,
                                    type: "product", "name": "Имунеле СилаФрук НапКисМол Персик 1%100г БП 24Х",
                                    "level4": "ИМУНЕЛЕ",
                                    "level5": "ПЕРСИК",
                                    "level6": "ПЭТ",
                                    "level7": "100 Г"
                                },
                                {
                                    "id": 1451,
                                    type: "product", "name": "Нап к/м с сок Имунеле Мал-морошка 1.2% 100г х24 БП",
                                    "level4": "ИМУНЕЛЕ",
                                    "level5": "МАЛИНА-МОРОШКА",
                                    "level6": "ПЭТ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 1452,
                                    type: "product", "name": "Нап к/м фр Имунеле Kids Ябл-Бан 1.5% 100г х24 БП",
                                    "level4": "ИМУНЕЛЕ FOR KIDS",
                                    "level5": "ЯБЛОКО, БАНАН",
                                    "level6": "ПЭТ",
                                    "level7": "100 Г"
                                },
                                {
                                    "id": 1453,
                                    type: "product", "name": "Нап к/м фр Имунеле СилаФрук ЯБлоко 1% 100г БП 24Х",
                                    "level4": "ИМУНЕЛЕ",
                                    "level5": "ЯБЛОКО",
                                    "level6": "ПЭТ",
                                    "level7": "100 Г"
                                },
                                {
                                    "id": 1454,
                                    type: "product", "name": "Нап кисмол Имунеле Гранат 1.2% 100г х24 БП",
                                    "level4": "ИМУНЕЛЕ",
                                    "level5": "ГРАНАТ",
                                    "level6": "ПЭТ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 1455,
                                    type: "product", "name": "Нап кисмол Имунеле Землян 1.2% 100г х24 БП",
                                    "level4": "ИМУНЕЛЕ",
                                    "level5": "ЗЕМЛЯНИКА",
                                    "level6": "ПЭТ",
                                    "level7": "100 Г"
                                },
                                {
                                    "id": 1456,
                                    type: "product", "name": "Нап кисмол Имунеле ЛесЯг 1.2% 100г х24 БП",
                                    "level4": "ИМУНЕЛЕ",
                                    "level5": "ЯГОДЫ ЛЕСНЫЕ",
                                    "level6": "ПЭТ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 1457,
                                    type: "product", "name": "Нап кисмол Имунеле МультФр 1.2% 100г х24 БП",
                                    "level4": "ИМУНЕЛЕ",
                                    "level5": "МУЛЬТИФРУКТ",
                                    "level6": "ПЭТ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 1458,
                                    type: "product", "name": "Нап кисмол Имунеле Черника 1.2% 100г х24 БП",
                                    "level4": "ИМУНЕЛЕ",
                                    "level5": "ЧЕРНИКА",
                                    "level6": "ПЭТ",
                                    "level7": "100 г"
                                },
                                {
                                    "id": 1459,
                                    type: "product", "name": "Нап КисМол с сок Имунеле Кофе 1.2% 100г БП 24Х",
                                    "level4": "ИМУНЕЛЕ",
                                    "level5": "КОФЕ",
                                    "level6": "ПЭТ",
                                    "level7": "100 Г"
                                },
                                {
                                    "id": 1460,
                                    type: "product", "name": "Нап кисмол сок Имунеле forKids ТутФр1.5%100гх24 БП",
                                    "level4": "ИМУНЕЛЕ FOR KIDS",
                                    "level5": "ТУТТИ-ФРУТТИ",
                                    "level6": "ПЭТ",
                                    "level7": "100 Г"
                                },
                                {
                                    "id": 1461,
                                    type: "product", "name": "Нап кисмол сок Имунеле forKids ЯгБум1.5%100гх24 БП",
                                    "level4": "ИМУНЕЛЕ FOR KIDS",
                                    "level5": "КЛЮКВА, ЕЖЕВИКА",
                                    "level6": "ПЭТ",
                                    "level7": "100 Г"
                                },
                                {
                                    "id": 1462,
                                    type: "product", "name": "Нап кисмол сок ИмунелеforKids МалПл 1.5%100гх24 БП",
                                    "level4": "ИМУНЕЛЕ FOR KIDS",
                                    "level5": "МАЛИНА, ПЛОМБИР",
                                    "level6": "ПЭТ",
                                    "level7": "100 Г"
                                },
                                {
                                    "id": 1463,
                                    type: "product", "name": "Напиток к/м Имунеле Neo виш 1.2% 1х48х6х100г",
                                    "level4": "ИМУНЕЛЕ",
                                    "level5": "ВИШНЯ",
                                    "level6": "ПЭТ",
                                    "level7": "100 Г"
                                },
                                {
                                    "id": 1464,
                                    type: "product", "name": "Напиток к/м Имунеле Neo гран-виш 1.2% 1х8х6х100г",
                                    "level4": "ИМУНЕЛЕ",
                                    "level5": "ГРАНАТ, ВИШНЯ",
                                    "level6": "ПЭТ",
                                    "level7": "100 Г"
                                },
                                {
                                    "id": 1465,
                                    type: "product", "name": "НапКисМол сок Имунеле СибирИммунит1.2% 100г БП 24Х",
                                    "level4": "ИМУНЕЛЕ",
                                    "level5": "КЛЮКВА, МОРОШКА, ЖИМОЛОСТЬ",
                                    "level6": "ПЭТ",
                                    "level7": "100 Г"
                                },
                                {
                                    "id": 1466,
                                    type: "product", "name": "НапКисМолСок Имунеле ПерсМангДыня 1.2%100г БП 24Х",
                                    "level4": "ИМУНЕЛЕ",
                                    "level5": "ПЕРСИК, МАНГО, ДЫНЯ",
                                    "level6": "ПЭТ",
                                    "level7": "100 Г"
                                },
                                {
                                    "id": 1467,
                                    type: "product", "name": "НапКисМолФр ИмунелеKids ВолшебЛес 1.5% 100г БП 24Х",
                                    "level4": "ИМУНЕЛЕ FOR KIDS",
                                    "level5": "ЗЕМЛЯНИКА, ЧЕРНИКА, БРУСНИКА",
                                    "level6": "ПЭТ",
                                    "level7": "100 Г"
                                },
                                {
                                    "id": 1468,
                                    type: "product", "name": "НапКисМолФр ИмунелеKids КлубнМорож 1.5%100г БП 24Х",
                                    "level4": "ИМУНЕЛЕ FOR KIDS",
                                    "level5": "КЛУБНИКА МОРОЖЕНОЕ",
                                    "level6": "ПЭТ",
                                    "level7": "100 Г"
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "id": 1469,
            "name": "Негазированные Напитки",
            "level": 0, type: "nodes",
            "nodes": [
                {
                    "id": 1470,
                    "name": "Соки Охлажденные",
                    "level": 1, type: "nodes",
                    "nodes": [
                        {
                            "id": 1471,
                            "name": "Соки Охлажденные",
                            "level": 2, type: "products",
                            "products": [
                                {
                                    "id": 1472,
                                    type: "product", "name": "ПродПит с мяк J7 БанВишЯблВиногр 0.3л ПЭТ 6Х",
                                    "level4": "ДЖЕЙ7",
                                    "level5": "БАНАН, ВИШНЯ, ЯБЛОКО, ВИНОГРАД",
                                    "level6": "ПЭТ",
                                    "level7": "0,3 Л"
                                },
                                {
                                    "id": 1473,
                                    type: "product", "name": "ПродПит с мяк J7 БанВишЯблВиногр 0.7л ПЭТ 6Х",
                                    "level4": "ДЖЕЙ7",
                                    "level5": "БАНАН, ВИШНЯ, ЯБЛОКО, ВИНОГРАД",
                                    "level6": "ПЭТ",
                                    "level7": "0,7 Л"
                                },
                                {
                                    "id": 1474,
                                    type: "product", "name": "ПродПит с мяк J7 ПерсЯблМанг 0.3л ПЭТ 6Х",
                                    "level4": "ДЖЕЙ7",
                                    "level5": "МАНГО, ПЕРСИК, ЯБЛОКО",
                                    "level6": "ПЭТ",
                                    "level7": "0,3 Л"
                                },
                                {
                                    "id": 1475,
                                    type: "product", "name": "ПродПит с мяк J7 Яблоко 0.3л ПЭТ 6Х",
                                    "level4": "ДЖЕЙ7",
                                    "level5": "ЯБЛОКО",
                                    "level6": "ПЭТ",
                                    "level7": "0,3 Л"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ];