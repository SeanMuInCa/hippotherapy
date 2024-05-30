import { defineStore } from "pinia-for-react";

const useUserStore = defineStore({
  state() {
    return {
      username: "",
      password: "",
      userId: localStorage.getItem('userId') || '',
      role: localStorage.getItem("role") || "",
      isLogin: localStorage.getItem("isLogin") || false,
      shouldRefresh: true,
      data: {
        firstName: "John",
        lastName: "Doe",
        contactNumber: "306-123-4567",
        city: "Saskatoon",
        province: "SK",
        education: "PhD in Psychology",
        specialization: "Clinical Psychology",
        training: "CBT Training",
        expertise: "Anxiety",
        yearsOfExperience: "10",
        email: "example@example.com",
      },
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
