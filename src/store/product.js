import Product from '@/apis/Product'
export const productModule = {
    state: {
        allProducts: [],
        productChart: []
    },

    mutations: {
        SET_PRODUCTS(state, payload) {
            state.allProducts = payload;
        },
        SET_PRODUCT_CHART(state, payload) {
            state.productChart = payload;
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
        },
        UPDATE_ADDITIONAL_STATUS(state, payload) {
            var index = state.allProducts.findIndex(obj => obj.id === payload.id);
            if(payload.type === 'New Release') {
            state.allProducts[index].isNewRelease = !payload.status
            }else {
            state.allProducts[index].isPopular = !payload.status
            }
        }
    },
    getters: {
        loadAllProducts(state) {
            return state.allProducts
        },
        getProductById: (state) => (id) => {
          console.log(state)
            return state.allProducts.find(product => product.id === id)
        },
        getProductChartData(state) {
            return state.productChart
        }
    },
    actions: {
        loadProducts({
                commit
            }

        ) {
            return Product.getAllProducts().then((response) => {
                commit('SET_PRODUCTS', response.data)
            }).then(() => {
                Product.getProductChartData().then((res) => {
                commit('SET_PRODUCT_CHART', res.data);
            })
            })
        },
        deleteProduct({

            commit,
            state
        }, id) {
            var index = state.allProducts.findIndex(element => element.id === id);
            commit('DELETE_ONE_PRODUCT', index)
        },

        updateProduct( payload) {
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
        updateAdditionalStatus({
            commit
        }, payload) {

            return new Promise((resolve, reject) => {
                 Product.updateAdditionalStatus(payload).then(res => {
                     if(res.status === 200) resolve(res.status);
                 }).then(() => {
                     commit('UPDATE_ADDITIONAL_STATUS', payload)
                 }).catch(err => reject(err));
            })
        
        },

    }
}
