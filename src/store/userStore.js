import { defineStore } from "pinia-for-react";
/**
 * store of user's
 */
const useUserStore = defineStore({
  state() {
    return {
      username: "",
      password: "",
      userId: localStorage.getItem("userId") || "",
      role: localStorage.getItem("role") || "",
      isLogin: localStorage.getItem("isLogin") || false,
      shouldRefresh: true,
      data: JSON.parse(localStorage.getItem("therapist")) || {},
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
