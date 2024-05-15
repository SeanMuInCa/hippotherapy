import { defineStore } from "pinia-for-react";

const usePatientStore = defineStore({
  state() {
    return {
      data: [
        {
          id: 0,
          fName: "aaa0",
          lName: "bbb",
          email: "abc@abc.com",
          language: "english",
          number: "1231234567",
          gender: "male",
          location: "sk",
          history: "history",
          diagnosis: "diagnosis",
        },
        {
          id: 1,
          fName: "ccc",
          lName: "ddd",
          email: "abc@abc.com",
          language: "english",
          number: "1231234567",
          gender: "male",
          location: "sk",
          history: "history",
          diagnosis: "diagnosis",
        },
        {
          id: 2,
          fName: "eee",
          lName: "fff",
          email: "abc@abc.com",
          language: "english",
          number: "1231234567",
          gender: "male",
          location: "sk",
          history: "history",
          diagnosis: "diagnosis",
        },
        {
          id: 3,
          fName: "ggg",
          lName: "hhh",
          email: "abc@abc.com",
          language: "english",
          number: "1231234567",
          gender: "male",
          location: "sk",
          history: "history",
          diagnosis: "diagnosis",
        },
      ],
      selected: "",
    };
  },
  actions: {},
});

export default usePatientStore;
