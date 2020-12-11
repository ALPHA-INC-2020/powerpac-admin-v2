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
        },
        UPDATE_SALE(state, payload) {
            var index = state.allProducts.findIndex(obj => obj.id === payload.id);
            state.allProducts[index].sale = payload.status;
        }
    },
    getters: {
        loadAllProducts(state) {
            return state.allProducts
        },
        getProductById: (state) => (id) => {
          console.log(state)
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
            return new Promise((resolve, reject) => {
                Product.updateSale(payload).then(res => {
                    if (res.status === 200)  resolve(res.status);
                }).then(() => {
                    commit('UPDATE_SALE', payload)
                }).catch(err => reject(err))
            })
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
