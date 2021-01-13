<template>
  <div>
    <CRow>
      <CCol sm="12">
        <CTableWrapper
          :items="allMessages"
          hover
          striped
          bordered
          small
          fixed
          deleteExist
          statusUpdate
          newRelease
          :edit="{exist: true, route: 'updateProduct'}"
          popular
          caption="Contact Messages"
          :fields=" ['id', 'name', 'phone_number', 'email','content','created_at', 'actions']"
          :additional="true"
          :emailReply="true"

        />
      </CCol>
    </CRow>

  </div>
</template>

<script>
import Message from '@/apis/Message'
import CTableWrapper from '../base/Table.vue'

export default {
    components: {
        CTableWrapper
    },
    data() {
        return {
            isLoading: false,
            hasError: false,
            allMessages: []
        }
    },
    created() {
        Message.getAllMessages().then(({data}) => {
            const {response_data} = data;

            this.allMessages = response_data
            
        })
    },
    methods: {
        setLoading() {
            this.isLoading = false;
        },
        setError() {
            this.hasError = false;
        }
    }
}
</script>