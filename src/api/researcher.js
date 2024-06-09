import request from "@/utils/request.js";

const API = {
  LOGIN: "/researchLogin",
  GET_DATA: '/getResearchData'
};

export const researcherLogin = async (userData) =>
  request.post(API.LOGIN, userData);

export const getResearchData = async () => request.get(API.GET_DATA, {responseType:'blob'});
