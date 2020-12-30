<template>
  <CRow>
    <CCol
      sm="12"
      md="3"
    >
      <CCard>
        <CCardHeader class="d-flex justify-content-between align-items-center">
          <strong>Account Info</strong>
          <CButton
            color="primary"
            size="sm"
            class="edit_pc"
            @click="nameEditable = !nameEditable"
          >
            <CIcon name="cil-pencil"></CIcon>
          </CButton>
        </CCardHeader>
        <CCardBody class="d-flex justify-content-center">
          <img
            src="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
            alt=""
            class="profile_pic"
          >

        </CCardBody>
        <CCardFooter>
          <div class="account_info text-center">
            <h5
              class="font-weight-bold"
              v-if="!nameEditable"
            >{{username}}</h5>
            <CInput
              v-model="username"
              v-else
            />
            <p>Joined Since {{joined}}</p>
          </div>
          <CButton
            v-if="nameEditable"
            block
            color="primary"
            @click="changeName()"
          >
            <span v-if="!loading">Save</span>
            <CSpinner
              v-else
              color="light"
              size="sm"
            />
          </CButton>
        </CCardFooter>
      </CCard>
    </CCol>
    <CCol
      sm="12"
      md="9"
    >
      <CCard>
        <CCardHeader><strong>Change Password</strong></CCardHeader>
        <CCardBody>
          <CInput
            label="Current Password"
            v-model="current_password"
          />
          <CInput
            label="New Password"
            v-model="new_password"
          />
          <CInput
            label="Confirm Password"
            v-model="confirm_password"
          />
          <small
            class="text-danger"
            v-if="password_match_error"
          >Password confirmation does not match</small>
          <small
            class="text-success"
            v-if="password_match_success"
          >
            <CIcon name="cil-check" /> Password Match
          </small>
        </CCardBody>
        <CCardFooter>
          <CButton
            color="primary"
            block
            :disabled="loading"
            @click="changePassword()"
          >
            <span v-if="!loading">Save</span>
            <CSpinner
              v-else
              color="light"
              size="sm"
            />
          </CButton>
        </CCardFooter>
      </CCard>
      <SuccessAlert />
      <ErrorAlert />
    </CCol>
  </CRow>
</template>

<script>
import User from '@/apis/User'
import SuccessAlert from '@/components/alerts/SuccessAlert'
import ErrorAlert from '@/components/alerts/ErrorAlert'
import { EventBus } from '../../main'

export default {
  components: {
    SuccessAlert,
    ErrorAlert
  },
  data () {
    return {
      username: 'Loading ...',
      joined: 'Loading ...',
      password_match_error: false,
      password_match_success: false,
      new_password: '',
      confirm_password: '',
      current_password: '',
      loading: false,
      nameEditable: false,
    }
  },
  watch: {
    confirm_password (newVal, oldVal) {
      if (newVal == this.new_password) {
        this.password_match_error = false
        this.password_match_success = true
      } else {
        this.password_match_error = true
        this.password_match_success = false
      }
    },
  },
  methods: {
    changeName () {
      const payload = {
        name: this.username
      }
      User.changeName(payload).then(res => {
        if (res.status === 200) {
          this.username = payload.name
          this.nameEditable = false;
          EventBus.$emit('success', "Name Changed Successfully 🎉!")
        } else {
          EventBus.$emit('error_occur', "Error on changing name")
        }
      }).catch((err) => {
        EventBus.$emit('error_occur', err)
      })
    },
    formatDateInTime (date_time) {
      return new Date(date_time).toLocaleString()
    },
    changePassword () {


      const { confirm_password, current_password, new_password } = this;


      if (confirm_password == '' || current_password == '' || new_password == '') return;

      const payload = {
        confirm_password,
        current_password
      }
      //   console.log(payload)
      this.loading = true;
      User.changePassword(payload).then(res => {
        this.loading = false;
        if (res.status === 200) {
          EventBus.$emit('success', "Password Changed Successfully 🎉!")
          this.confirm_password = '';
          this.current_password = '';
          this.new_password = ''
        } else {

        }
      }).catch((err) => {
        EventBus.$emit('error_occur', "Wrong Current Password!")

      })
    }
  },
  created () {
    User.profile().then(({ data }) => {
      const { name, created_at } = data;
      this.username = name
      this.joined = this.formatDateInTime(created_at);
    })
  }
}
</script>

<style scoped>
.profile_pic {
  height: 100px;
  border-radius: 50%;
  width: 100px;
}
</style>