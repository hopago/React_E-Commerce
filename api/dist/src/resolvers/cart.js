const cartResolvers = {
    Query: {
        cart: (_1, _2, { db }) => {
            return db.cart;
        },
    },
    Mutation: {
        addCart: (_, { id }, { db }) => {
            var _a;
            const newCartData = [...db.cart];
            const findIndex = db.products.findIndex((item) => item.id === id);
            const targetProduct = db.products.find((item) => item.id === id);
            if (findIndex === -1)
                throw new Error("카트 정보가 없습니다...");
            if (!targetProduct)
                throw new Error("상품이 없습니다...");
            const newItem = {
                id,
                product: Object.assign({}, targetProduct),
                amount: (((_a = newCartData[findIndex]) === null || _a === void 0 ? void 0 : _a.amount) || 0) + 1,
            };
            newCartData[findIndex] = newItem;
            db.cart = newCartData;
            return newItem;
        },
        updateCart: (_, { id, amount }, { db }) => {
            const newCart = [...db.cart];
            const findIndex = newCart.findIndex((item) => item.id === id);
            if (!findIndex)
                throw new Error("없는 데이터입니다...");
            const newItem = Object.assign(Object.assign({}, newCart[findIndex]), { amount });
            newCart[findIndex] = newItem;
            db.cart = newCart;
            return newItem;
        },
        deleteCart: (_, { id }, { db }) => {
            const newData = [...db.cart];
            const findIndex = db.cart.findIndex((item) => item.id === id);
            if (!findIndex)
                throw new Error("없는 데이터입니다...");
            delete newData[findIndex];
            db.cart = newData;
            return id;
        },
        executePayment: (_, { ids }, { db }) => {
            const newCartData = db.cart.filter((cartItem) => {
                !ids.includes(cartItem.id);
            });
            db.cart = newCartData;
            return ids;
        },
    },
    CartItem: {
        product: (cartItem, _, { db }) => {
            console.log(cartItem);
            return db.products.find(product => product.id === cartItem.id);
        },
    },
};
export default cartResolvers;
