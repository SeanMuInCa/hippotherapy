import { defineStore } from "pinia-for-react";
import avatar from "../utils/getAvatar";
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
          birth: "2022-01-01",
          parent: "parent.name",
          avatar:avatar()
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
          birth: "2022-02-01",
          parent: "parent.name",
          avatar:avatar()
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
          birth: "2022-03-01",
          parent: "parent.name",
          avatar:avatar()
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
          birth: "2022-04-01",
          parent: "parent.name",
          avatar:avatar()
        },
      ],
      selected: "",
    };
  },
  actions: {},
});

export default usePatientStore;
