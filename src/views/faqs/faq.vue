<template>
  <CRow>
    <CCol
      sm="12"
      md="8"
    >
      <CCard>
        <CCardHeader>FAQS</CCardHeader>
        <CCardBody>
          <accordion
            v-for="(faq,index) in getAllFaqs"
            :key="index"
          >
            <div slot="header">{{faq.question}}

            </div>
            <div class="d-flex justify-content-between">{{faq.answer}}
              <CButton @click="deleteFAQ(index)">
                <CIcon
                  name="cil-trash"
                  color="red"
                ></CIcon>
              </CButton>
            </div>
          </accordion>
        </CCardBody>
      </CCard>
    </CCol>
    <CCol
      sm="12"
      md="4"
    >
      <CCard>
        <CCardHeader>
          <strong>Create New FAQ</strong>
        </CCardHeader>
        <CCardBody>
          <CTextarea
            label="Question"
            v-model="form.question"
          ></CTextarea>
          <CTextarea
            label="Answer"
            v-model="form.answer"
          ></CTextarea>
          <CButton
            block
            color="success"
            :disabled="loading"
            @click="createNewFaq()"
          >
            <span v-if="!loading">Create</span>
            <CSpinner
              v-else
              color="light"
              size="sm"
            />
          </CButton>
        </CCardBody>
      </CCard>
    </CCol>

  </CRow>
</template>

<script>
import FAQ from '@/apis/Faq.js'
import store from '@/store/index.js'
import { mapGetters } from 'vuex'
import Accordion from '@/components/Accordion'
import faqMixin from '@/mixins/faqMixin'

export default {
  components: {
    Accordion
  },
  mixins: [faqMixin],
  data () {
    return {
      loading: false,
      form: {
        question: '',
        answer: ''
      },
      FAQ
    }
  },
  created () {
    if (store.state['faqModule'].allFaqs.length == 0) {
      store.dispatch('loadAllFaqs').then(() => {
        this.loading = false;
      })
    }

    this.loading = false;
  },
  computed: {
    ...mapGetters(['getAllFaqs'])
  }
}
</script>

<style>
</style>