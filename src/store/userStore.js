import { defineStore } from "pinia-for-react";

const useUserStore = defineStore({
  state() {
    return {
      username: "",
      password: "",
      role: "",
      isLogin: false,
    };
  },
  actions: {
    register() {},
    login() {},
    logout() {},
    setLoginStatus(value) {
      console.log("store");
      const state = this.$getState();
      this.$setState({ ...state, isLogin: value });
    },
  },
});

export default useUserStore;
