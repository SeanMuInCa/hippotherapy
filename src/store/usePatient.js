import { defineStore } from "pinia-for-react";
import avatar from "../utils/getAvatar";
import { getPatientList } from "@/api/patient.js";
/**
 * patients' store
 * patients' data
 */
const usePatientStore = defineStore({
  state() {
    return {
      // data: [
      //   {
      //     id: 0,
      //     firstName: "John",
      //     lastName: "Doe",
      //     emailId: "abc@abc.com",
      //     language: "english",
      //     contactNumber: "1231234567",
      //     gender: "male",
      //     location: "sk",
      //     medicalHistory: "medicalHistory",
      //     diagnosis: "diagnosis",
      //     dateOfBirth: "2022-01-01",
      //     guardianFirstName: "guardianFirstName.name",
      //     avatar: avatar(),
      //     therapistId: 1,
      //   },
      //   {
      //     id: 1,
      //     firstName: "Jane",
      //     lastName: "Doe",
      //     emailId: "abc@abc.com",
      //     language: "english",
      //     contactNumber: "1231234567",
      //     gender: "male",
      //     location: "sk",
      //     medicalHistory: "medicalHistory",
      //     diagnosis: "diagnosis",
      //     dateOfBirth: "2022-02-01",
      //     guardianFirstName: "guardianFirstName.name",
      //     therapistId: 1,
      //     avatar: avatar(),
      //   },
      //   {
      //     id: 2,
      //     firstName: "Zhenghua",
      //     lastName: "Mu",
      //     emailId: "abc@abc.com",
      //     language: "english",
      //     contactNumber: "1231234567",
      //     gender: "male",
      //     location: "sk",
      //     medicalHistory: "medicalHistory",
      //     diagnosis: "diagnosis",
      //     dateOfBirth: "2022-03-01",
      //     guardianFirstName: "guardianFirstName.name",
      //     avatar: avatar(),
      //     therapistId: 1,
      //   },
      //   {
      //     id: 3,
      //     firstName: "Dipti",
      //     lastName: "Rani",
      //     emailId: "abc@abc.com",
      //     language: "english",
      //     contactNumber: "1231234567",
      //     gender: "male",
      //     location: "sk",
      //     medicalHistory: "medicalHistory",
      //     diagnosis: "diagnosis",
      //     dateOfBirth: "2022-04-01",
      //     guardianFirstName: "guardianFirstName.name",
      //     avatar: avatar(),
      //     therapistId: 1,
      //   },
      // ],
      selected: "",
      data: [],
    };
  },
  actions: {
    async getList(therapistId) {
      const data = await getPatientList(therapistId);
      console.log("data", data);
    },
  },
});

export default usePatientStore;
