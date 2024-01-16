import { DBField, writeDB } from "../dbController.js";
const setJSON = (data) => {
    writeDB(DBField.CART, data);
};
const cartResolvers = {
    Query: {
        cart: (_1, _2, { db }) => {
            return db.cart;
        },
    },
    Mutation: {
        addCart: (_, { id }, { db }) => {
            if (!id)
                throw Error("상품 ID가 필요합니다...");
            const targetProduct = db.products.find((item) => item.id === id);
            if (!targetProduct)
                throw new Error("상품이 없습니다...");
            let newItem;
            const findCartIndex = db.cart.findIndex((item) => item.id === id);
            if (findCartIndex) {
                newItem = Object.assign(Object.assign({}, db.cart[findCartIndex]), { amount: (db.cart[findCartIndex].amount || 0) + 1 });
                db.cart.splice(findCartIndex, 1, newItem);
                try {
                    setJSON(db.cart);
                }
                catch (err) {
                    console.log(err);
                }
            }
            else {
                newItem = {
                    id,
                    amount: 1,
                };
                db.cart.push(newItem);
                try {
                    setJSON(db.cart);
                }
                catch (err) {
                    console.log(err);
                }
            }
            return newItem;
        },
        updateCart: (_, { id, amount }, { db }) => {
            const findIndex = db.cart.findIndex((item) => item.id === id);
            if (findIndex === -1)
                throw new Error("없는 데이터입니다...");
            const newItem = {
                id,
                amount,
            };
            db.cart.splice(findIndex, 1, newItem);
            try {
                writeDB(DBField.CART, db.cart);
            }
            catch (err) {
                console.log(err);
            }
            return newItem;
        },
        deleteCart: (_, { id }, { db }) => {
            const findIndex = db.cart.findIndex((item) => item.id === id);
            if (findIndex === -1)
                throw new Error("없는 데이터입니다...");
            db.cart.splice(findIndex, 1);
            try {
                writeDB(DBField.CART, db.cart);
            }
            catch (err) {
                console.log(err);
            }
            return id;
        },
        executePayment: (_, { ids }, { db }) => {
            const newCartData = db.cart.filter((cartItem) => {
                !ids.includes(cartItem.id);
            });
            db.cart = newCartData;
            try {
                writeDB(DBField.CART, db.cart);
            }
            catch (err) {
                console.log(err);
            }
            return ids;
        },
    },
    CartItem: {
        product: (cartItem, _, { db }) => {
            return db.products.find((product) => product.id === cartItem.id);
        },
    },
};
export default cartResolvers;
