<template>
  <div class="d-flex align-items-center min-vh-100">
    <CContainer fluid>
      <CRow class="justify-content-center">
        <CCol md="6">
          <CCard class="mx-4 mb-0">
            <CCardBody class="p-4">
              <CForm>
                <h1>Register</h1>
                <p class="text-muted">Create your account</p>
                <CInput
                  placeholder="Username"
                  autocomplete="username"
                  v-model="form.name"
                >
                  <template #prepend-content>
                    <CIcon name="cil-user" />
                  </template>
                </CInput>
                <CInput
                  type="email"
                  placeholder="Email"
                  autocomplete="email"
                  prepend="@"
                  v-model="form.email"
                />
                <CInput
                  placeholder="Password"
                  type="password"
                  autocomplete="new-password"
                  v-model="form.password"
                >
                  <template #prepend-content>
                    <CIcon name="cil-lock-locked" />
                  </template>
                </CInput>
                <CInput
                  placeholder="Repeat password"
                  type="password"
                  autocomplete="new-password"
                  class="mb-4"
                  v-model="form.password_confirmation"
                >
                  <template #prepend-content>
                    <CIcon name="cil-lock-locked" />
                  </template>
                </CInput>
                <CInput
                  placeholder="Register Pass Code"
                  autocomplete="off"
                  class="mb-4"
                  v-model="form.passcode"
                >
                  <template #prepend-content>
                    <CIcon name="cil-lock-locked" />
                  </template>
                </CInput>
                <CButton
                  :color="loading? 'secondary' : 'success' "
                  block
                  @click="register()"
                  :disabled="loading"
                >
                  <CSpinner
                    color="info"
                    v-if="loading"
                    size="sm"
                  />
                  <span v-else>Create Account</span>
                </CButton>
                <small
                  class="text-danger"
                  v-for="(err, i) in errors.email"
                  :key="i"
                >{{err}}</small>
                <small
                  class="text-danger"
                  v-if="errStatus"
                >{{errStatus}}</small>

                <p
                  class="text-center mt-3 text-grey "
                  style="text-decoration: none;"
                >

                  <router-link :to="{name: 'Login'}">Already have an account? Login</router-link>
                </p>
              </CForm>
            </CCardBody>

          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import User from "@/apis/User.js";

export default {
  name: "Register",
  data () {
    return {
      loading: false,
      form: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        passcode: ''
      },
      errors: [],
      errStatus: ''
    };
  },

  methods: {
    register () {
      const { name, email, password, password_confirmation, passcode } = this.form;
      if (name == '' || email == '' || password == '' || password_confirmation == '' || passcode == '') {
        return;
      }
      this.loading = true
      User.register(this.form)
        .then((response) => {
          this.loading = false;

          if (response.status === 200) {
            this.$router.push({ name: "Login" });
          } else {
            this.errStatus = 'There is an error on registration'
          }

        })
        .catch(error => {
          this.loading = false;
          if (error.response.status === 422) {
            this.errStatus = ''
            this.errors = error.response.data.errors;
          }

          if (error.response.status === 405) {
            this.errors = []
            this.errStatus = error.response.data.message
          }
        });
    }
  }
};

</script>


