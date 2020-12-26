<template>
  <div class="c-app flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm>
                  <h1>Login</h1>
                  <p class="text-muted">Sign In to your account</p>
                  <CInput
                    placeholder="Email"
                    autocomplete="email"
                    v-model="form.email"
                  >
                    <template #prepend-content>
                      <CIcon name="cil-user" />
                    </template>
                  </CInput>
                  <CInput
                    placeholder="Password"
                    type="password"
                    autocomplete="curent-password"
                    v-model="form.password"
                  >
                    <template #prepend-content>
                      <CIcon name="cil-lock-locked" />
                    </template>
                  </CInput>
                  <CRow>
                    <CCol
                      col="6"
                      class="text-left"
                    >
                      <CButton
                        color="primary"
                        class="px-4"
                        @click="login()"
                        :disabled="loading"
                      >
                        <span v-if="!loading">Login</span>
                        <CSpinner
                          v-else
                          color="light"
                          size="sm"
                        />
                      </CButton>

                    </CCol>
                    <CCol
                      col="6"
                      class="text-right"
                    >
                      <CButton
                        color="link"
                        class="px-0"
                      >Forgot password?</CButton>
                      <CButton
                        color="link"
                        class="d-lg-none"
                        @click="go2Register()"
                      >Register now!</CButton>
                    </CCol>
                  </CRow>
                  <small
                    v-for="(error, i) in errors.email"
                    :key="i"
                    class="text-danger"
                  >
                    {{error}}
                  </small>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard
              color="primary"
              text-color="white"
              class="text-center py-5 d-md-down-none"
              body-wrapper
            >
              <CCardBody>
                <h2>Sign up</h2>
                <p>Powerpac အတွက် admin panel ဖြစ်ပါတယ်။ ကိုယ်ပိုင်အချက်အလက်များ အသုံးပြုပြီး ဝင်ရောက်အသုံးပြုနိုင်ပါတယ်။</p>
                <CButton
                  color="light"
                  variant="outline"
                  size="lg"
                  @click="go2Register()"
                >
                  Register Now!
                </CButton>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import User from '@/apis/User.js'

export default {
  name: 'Login',
  data () {
    return {
      form: {
        email: "",
        password: ""
      },
      errors: [],
      loading: false
    };
  },

  methods: {
    login () {
      const { email, password } = this.form;
      if (email == '' || password == '') {
        return;
      }
      this.loading = true
      User.login(this.form)
        .then(response => {

          if (response.status === 200) {
            this.$store.commit("LOGIN", true);
            localStorage.setItem("token", response.data);
            this.$router.push({ name: "Dashboard" });
            this.loading = false;

          }
        })
        .catch(error => {
          this.loading = false;
          if (error.response.status === 422) {
            this.errors = error.response.data.errors;
          }
        });
    },
    go2Register () {
      this.$router.push({ name: "Register" })
    }
  }
}
</script>
