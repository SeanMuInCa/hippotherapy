import request from "@/utils/request.js";

const API = {
  ADD: "/newSession",
};

export const startNewSession = (data)=> request.post(API.ADD, data);