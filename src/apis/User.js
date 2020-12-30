import Api from "./Api";

export default {
  register(form) {
    return Api().post("/register", form);
  },

  login(form) {
    return Api().post("/login", form);
  },

  logout() {
    return Api().post("/logout");
  },

  auth() {
    return Api().get("/user");
  },
  profile() {
    return Api().get('/get/profile')
  },
  changePassword(payload) {
    return Api().post('/change/password', payload)
  },
  changeName(payload) {
    return Api().post('/change/name', payload);
  }
};
