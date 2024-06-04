import request from "@/utils/request.js";

const API = {
  REG: "/register",
  LOGIN: "/login",
  GET_INFO: "/therapistDetails/",
  UPDATE_INFO: "/updatetherapist/",
};
export const registerApi = (userData) => request.post(API.REG, userData);
export const loginApi = (userData) => request.post(API.LOGIN, userData);

export const getInfo = async (therapistId) =>
  request.get(API.GET_INFO + therapistId);

export const updateInfo = async (therapistId, therapistInfo) =>
  request.put(API.UPDATE_INFO + therapistId, therapistInfo);
