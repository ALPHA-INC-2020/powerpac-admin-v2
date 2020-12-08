import Product from '@/apis/Product'
export const productModule = {
    state: {
        allProducts: []
    },

    mutations: {
        SET_PRODUCTS(state, payload) {
            state.allProducts = payload;
        },
        DELETE_ONE_PRODUCT(state, payload) {
            state.allProducts.splice(payload, 1);
        },
        ADD_ONE_PRODUCT(state, payload) {
            state.allProducts.push(payload);
        }
    },
    getters: {
        loadAllProducts(state) {
            return state.allProducts
        },
        getProductById: (state) => (id) => {
            return state.allProducts.find(product => product.id === id)
        }
    },
    actions: {
        loadProducts({
                commit
            }

        ) {
            return Product.getAllProducts().then((response) => {
                commit('SET_PRODUCTS', response.data)
            })
        },
        deleteProduct({

            commit,
            state
        }, id) {
            var index = state.allProducts.findIndex(element => element.id === id);
            commit('DELETE_ONE_PRODUCT', index)
        },

        updateProduct({
            commit
        }, payload) {
            return Product.updateProduct(payload.id, payload);
        },
        updateSale({
            commit
        }, payload) {
            return Product.updateSale(payload)
        },
        updatePopular({
            commit
        }, payload) {
            return Product.updatePopular(payload);
        },
        updateNewReleased({
            commit
        }, payload) {
            return Product.updateNewReleased(payload);
        }
    }
}