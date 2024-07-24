import request from "@/utils/request.js";

const API = {
  REG: "/register",
  LOGIN: "/login",
  GET_INFO: "/therapistDetails/",
  UPDATE_INFO: "/updatetherapist/",
  FORGET_PASSWORD: "/forgotPassword",
};
export const registerApi = (userData) => request.post(API.REG, userData);
export const loginApi = (userData) => request.post(API.LOGIN, userData);

export const getInfo = async (therapistId) =>
  request.get(API.GET_INFO + therapistId);

export const updateInfo = async (therapistInfo) =>
  request.put(API.UPDATE_INFO, therapistInfo);

export const forgetPassword = async (data) =>
  request.post(API.FORGET_PASSWORD, data);
