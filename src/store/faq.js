import FAQ from '@/apis/Faq.js'

export const faqModule = {
    state : {
        allFaqs: []
    },
    mutations: {
        SET_FAQS(state, payload) {
            state.allFaqs = payload.data;
        },
        ADD_ONE_RECORD(state, payload) {
            state.allFaqs.unshift(payload)
        },
        DELETE_ONE_FAQ(state,index){
            console.log(index);
            state.allFaqs.splice(index, 1);
            console.log(state.allFaqs)
        }
    },
    actions: {
        loadAllFaqs({commit}) {
            return new Promise((resolve, reject) => {
                FAQ.getAllFAQs().then(res => {
                    if(res.status === 200) {
                        resolve(res.status)
                        commit('SET_FAQS', res.data);
                    }else{
                        reject(res.status)
                    }
                }).catch(e => {
                    reject(e);
                })
            })
        }
    },
    getters: {
        getAllFaqs(state) {
            return state.allFaqs;
        }
    }
}