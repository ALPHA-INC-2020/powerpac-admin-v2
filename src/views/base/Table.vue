<template>

  <div>
    <SuccessAlert />
    <ErrorAlert />
    <CCard>
      <CCardHeader>
        <slot name="header">
          <CRow class="d-flex justify-content-between">
            <div class="ml-3 h4">
              {{caption}}
            </div>
            <CButton
              :to="{name: titleButton.link}"
              class="mr-3"
              color="primary"
              shape="pill"
              v-show="titleButton.exist"
            >
              <CIcon name="cil-plus" />&nbsp;{{titleButton.buttonText}}
            </CButton>

          </CRow>

        </slot>
      </CCardHeader>
      <CCardBody>
        <CDataTable
          items-per-page-select
          table-filter
          :hover="hover"
          :striped="striped"
          :bordered="bordered"
          :small="small"
          :fixed="fixed"
          :items="items"
          :fields="fields"
          :items-per-page="small ? 10 : 5"
          :dark="dark"
          pagination
        >
          <template #productName="{item}">
            <td>
              <p>{{item.productName}}</p>
            </td>
          </template>
          <template #status="{item}">
            <td>
              <CBadge :color="getBadge(item.order_status)">{{item.order_status}}</CBadge>
            </td>
          </template>
          <template
            #additional="{item}"
            v-if="additional"
          >
            <td>
              <CBadge
                color="success"
                v-show="item.isNewRelease"
              >new release</CBadge>
              <CBadge
                color="success"
                v-show="item.isPopular"
              >trending now</CBadge>
              <CBadge
                color="secondary"
                v-show="!item.isNewRelease && !item.isPopular"
              >none</CBadge>

            </td>
          </template>
          <template #sale="{item}">
            <td>
              <CBadge :color="getSale(item.sale)">{{item.sale}}</CBadge>
            </td>
          </template>
          <template #imageURLs="{item}">
            <td>
              <CImg
                :src="item.imageURLs[0]"
                block
                class="mb-2"
                width="30px"
                height="30px"
                shape="rounded"
              />
            </td>
          </template>
          <template #actions="{item}">
            <td>

              <CDropdown
                color="primary"
                toggler-text="action"
                class="m-2"
                size="sm"
                :caret="false"
              >
                <template #toggler-content>
                  <CIcon name="cil-settings" />
                </template>

                <CDropdownItem @click="go2Edit(item.id)">edit</CDropdownItem>
                <CDropdownItem
                  v-show="statusUpdate"
                  @click="openStatusModal(item)"
                >update status</CDropdownItem>
                <CDropdownItem
                  @click="openModal(item)"
                  class="text-danger"
                  v-show="deleteExist"
                >delete</CDropdownItem>
                <CDropdownDivider v-show='newRelease'></CDropdownDivider>
                <CDropdownItem
                  v-show="newRelease"
                  :class="item.isNewRelease? 'text-danger': 'text-success'"
                  @click="callAdditionalConfirmBox(item.id, item.isNewRelease, 'New Release')"
                >{{item.isNewRelease? 'remove from new release': 'add to new release'}}</CDropdownItem>
                <CDropdownItem
                  v-show="popular"
                  :class="item.isPopular? 'text-danger': 'text-success'"
                  @click="callAdditionalConfirmBox(item.id, item.isPopular, 'Trending Now')"
                >{{item.isPopular? 'remove from trending now': 'add to trending now'}}</CDropdownItem>
              </CDropdown>
            </td>
          </template>
        </CDataTable>
      </CCardBody>

    </CCard>
    <CModal
      :show.sync="deleteModal"
      :no-close-on-backdrop="true"
      :centered="true"
      title="Warning!"
      size="sm"
      color="warning"
    >
      Are you sure to delete?
      <template #header>
        <h6 class="modal-title">Warning!</h6>
        <CButtonClose
          @click="deleteModal = false"
          class="text-white"
        />
      </template>
      <template #footer>
        <CButton
          @click="deleteModal = false"
          color="success"
        >Cancel</CButton>
        <CButton
          @click="deleteItem()"
          color="danger"
          :disabled="deleteButtonLoading"
        >
          <span v-if="!deleteButtonLoading">Delete</span>
          <CSpinner
            v-else
            color="light"
            size="sm"
          />
        </CButton>
      </template>
    </CModal>
    <CModal
      :show.sync="statusUpdateModal"
      :no-close-on-backdrop="true"
      :centered="true"
      title="Warning!"
      size="sm"
      color="warning"
    >

      <CListGroup
        v-for="(item,index) in statusOptions"
        :key="index"
      >
        <CListGroupItem
          @click="status = item.value"
          class="list-gp my-2"
        >
          <div class="d-flex justify-content-around align-items-center">
            <input
              type="radio"
              :id="'status'+ item.value"
              name="status"
              v-model="status"
              :value="item.value"
            >
            <label :for="'status'+item.value">{{item.text}}</label>
          </div>

        </CListGroupItem>
      </CListGroup>

      <template #header>
        <h6 class="modal-title">Change Status</h6>
        <CButtonClose
          @click="statusUpdateModal = false"
          class="text-white"
        />
      </template>
      <template #footer>
        <CButton
          @click="statusUpdateModal = false"
          color="danger"
        >Cancel</CButton>
        <CButton
          @click="updateSale()"
          color="success"
        >Update</CButton>
      </template>
    </CModal>

    <AdditionalStatusDialog />

  </div>

</template>

<script>

import { EventBus } from '../../main'
import actionMixin from '@/mixins/actionMixin'
import SuccessAlert from '@/components/alerts/SuccessAlert'
import ErrorAlert from '@/components/alerts/ErrorAlert'
import AdditionalStatusDialog from '@/components/dialogs/AdditionalStatusDialog'
export default {
  components: {
    SuccessAlert,
    ErrorAlert,
    AdditionalStatusDialog
  },
  mixins: [actionMixin],
  name: 'Table',
  props: {
    additional: {
      type: Boolean,
      default: false
    },
    statusOptions: {
      type: Array,
      required: true
    },
    updateAction: {
      action: {
        type: 'String'
      }
    },
    deleteAction: {
      action: {
        type: 'String'
      },
      apiObj: {
        type: Object
      }
    },
    titleButton: {
      exist: {
        type: Boolean,
        default: false
      },
      link: {
        type: String
      },
      buttonText: {
        type: String,
        default: 'Create New'
      }
    },
    deleteExist: {
      type: Boolean,
      default: false
    },
    statusUpdate: {
      type: Boolean,
      default: false
    },
    edit: {
      exist: {
        type: Boolean,
        default: false
      },
      route: {
        type: String
      }
    },
    newRelease: {
      type: Boolean,
      default: false
    },
    popular: {
      type: Boolean,
      default: false
    },
    items: Array,
    fields: {
      type: Array
    },
    caption: {
      type: String,
      default: 'Table'
    },
    hover: Boolean,
    striped: Boolean,
    bordered: Boolean,
    small: Boolean,
    fixed: Boolean,
    dark: Boolean
  },
  data () {
    return {
      status: '',
      deleteModal: false,
      statusUpdateModal: false,
      deleteButtonLoading: false,
      deleteId: '',
      deleteSuccessMsg: 'Delete Success!',
      deleteErrorMsg: 'Error On Delete. Try Again!',
      statusId: ''
    }
  },
  methods: {
    go2Edit (id) {
      const { route } = this.edit
      this.$router.push({ name: route, params: { id: id } })
    },
    updateSale () {
      let payload = {
        id: this.statusId,
        status: this.status
      }

      const { action } = this.updateAction
      this.$store
        .dispatch(action, payload)
        .then(status => {
          if (status === 200) {
            this.statusUpdateModal = false
            EventBus.$emit('success', 'Success Update!')
          } else {
            this.statusUpdateModal = false
            EventBus.$emit('error_occur', 'error')
          }
        })
        .catch(err => {
          this.statusUpdateModal = false
          EventBus.$emit('error_occur', err)
        })
    },
    deleteItem () {
      const { action, apiObj } = this.deleteAction
      this.$store.dispatch(action, this.deleteId)
      this.deleteButtonLoading = true
      apiObj[action](this.deleteId).then(response => {
        if (response.status == 200) {
          this.deleteButtonLoading = false
          this.deleteModal = false
          EventBus.$emit('success', this.deleteSuccessMsg)
        } else {
          this.deleteModal = false
          EventBus.$emit('error_occur', this.deleteErrorMsg)
        }
      })
    },
    openModal (item) {
      this.deleteId = item.id
      this.deleteModal = true
    },
    openStatusModal (item) {
      this.statusId = item.id
      this.statusUpdateModal = true
    },
    getBadge (status) {
      return status === 'complete'
        ? 'success'
        : status === 'confirm'
          ? 'primary'
          : status === 'pending'
            ? 'warning'
            : status === 'cancel'
              ? 'danger'
              : 'primary'
    },
    getSale (status) {
      return status === 'preorder'
        ? 'primary'
        : status === 'onsale'
          ? 'success'
          : status === 'outstock'
            ? 'danger'
            : 'primary'
    }
  }
}

</script>


<style scoped>
.list-gp {
  cursor: pointer;
}
</style>
