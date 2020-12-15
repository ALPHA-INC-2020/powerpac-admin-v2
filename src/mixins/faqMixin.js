import FAQ from '@/apis/Faq.js'
import store from '../store';
export default {
    methods: {
        createNewFaq() {
            FAQ.uploadFAQ(this.form).then(res => {
                if(res.status === 200) {
                    this.loading = false;
                    const {data} = res.data; 
                    store.commit('ADD_ONE_RECORD', data)
                }
            }).then(() => {
                this.form.question = '';
                this.form.answer = '';
            })
        },
        deleteFAQ(id) {
            // FAQ.deleteFAQ(id).then(res=> {
            //     if(res.status === 200){
                    store.commit('DELETE_ONE_FAQ', id);
                }
            // })
        }
    
}