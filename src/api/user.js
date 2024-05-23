import request from '@/utils/request.js';

const API = {
    REG : '/register',
    LOGIN: '/login'
};
export const registerApi = (userData)=> request.post(API.REG, userData);
export const loginApi = (userData)=> request.post(API.LOGIN, userData);