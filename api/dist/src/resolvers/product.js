const productResolvers = {
    Query: {
        products: (_1, _2, { db }) => {
            return db.products;
        },
        product: (_, { id }, { db }) => {
            const found = db.products.find((product) => product.id === id);
            if (!found)
                return null;
            return found;
        },
    },
    Mutation: {},
};
export default productResolvers;
