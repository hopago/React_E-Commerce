import { resolve } from "path";
import fs from 'fs';
export var DBField;
(function (DBField) {
    DBField["CART"] = "cart";
    DBField["PRODUCTS"] = "products";
})(DBField || (DBField = {}));
const basePath = resolve();
const fileNames = {
    [DBField.CART]: resolve(basePath, "src/db/cart.json"),
    [DBField.PRODUCTS]: resolve(basePath, "src/db/products.json"),
};
export const readDB = (target) => {
    try {
        return JSON.parse(fs.readFileSync(fileNames[target], "utf-8"));
    }
    catch (err) {
        console.log(err);
    }
};
export const writeDB = (target, data) => {
    try {
        fs.writeFileSync(fileNames[target], JSON.stringify(data));
    }
    catch (err) {
        console.log(err);
    }
};
