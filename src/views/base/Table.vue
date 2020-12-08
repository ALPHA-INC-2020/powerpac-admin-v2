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
          <template #status="{item}">
            <td>
              <CBadge :color="getBadge(item.order_status)">{{item.order_status}}</CBadge>
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
                <CDropdownItem v-show="edit">edit</CDropdownItem>
                <CDropdownItem v-show="statusUpdate">update sale</CDropdownItem>
                <CDropdownItem
                  @click="openModal(item)"
                  class="text-danger"
                  v-show="deleteExist"
                >delete</CDropdownItem>
                <CDropdownDivider v-show='newRelease'></CDropdownDivider>
                <CDropdownItem v-show="newRelease">add to new release</CDropdownItem>
                <CDropdownItem v-show="popular">add to popular product</CDropdownItem>
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
        >Delete</CButton>
      </template>
    </CModal>
  </div>
</template>

<script>
import { EventBus } from '../../main'
import SuccessAlert from '@/components/alerts/SuccessAlert'
import ErrorAlert from '@/components/alerts/ErrorAlert'
export default {
  components: {
    SuccessAlert,
    ErrorAlert
  },
  name: 'Table',
  props: {
    deleteAction: {
      action: {
        type: 'String'
      },
      apiObj: {
        type: Object
      }

    },
    titleButton:
    {
      exist: {
        type: Boolean,
        default: false
      },
      link: {
        type: String,
      },
      buttonText: {
        type: String,
        default: 'Create New'
      }

    }
    ,
    deleteExist: {
      type: Boolean,
      default: false
    },
    statusUpdate: {
      type: Boolean,
      default: false
    },
    edit: {
      type: Boolean,
      default: false
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
      type: Array,
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
      deleteModal: false,
      deleteId: '',
      deleteSuccessMsg: 'Delete Success!',
      deleteErrorMsg: 'Error On Delete. Try Again!'
    }
  },
  methods: {
    deleteItem () {
      const { action, apiObj } = this.deleteAction;
      this.$store.dispatch(action, this.deleteId);

      apiObj[action](this.deleteId).then(response => {
        if (response.status == 200) {
          this.deleteModal = false;
          EventBus.$emit('success', this.deleteSuccessMsg)
        } else {
          this.deleteModal = false;
          EventBus.$emit('error_occur', this.deleteErrorMsg)

        }
      });

    },
    openModal (item) {
      this.deleteId = item.id
      this.deleteModal = true
    },
    getBadge (status) {
      return status === 'complete' ? 'success'
        : status === 'confirm' ? 'primary'
          : status === 'pending' ? 'warning'
            : status === 'cancel' ? 'danger' : 'primary'
    },
    getSale (status) {
      return status === 'preorder' ? 'primary' : status === 'onsale' ? 'success' : status === 'outstock' ? 'danger' : 'primary'
    }
  }
}
</script>
