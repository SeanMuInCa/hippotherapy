import request from "@/utils/request.js";

const API = {
  LOGIN: "/researchLogin",
};

export const researcherLogin = async (userData) =>
  request.post(API.LOGIN, userData);
