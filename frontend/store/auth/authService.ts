import axiosClient from '../../api/axiosClient' ;
import type { SigninPayload, SigninResponse, SignupPayload, SignupResponse } from './auth.types';

export const authService = {
    signup: async (data: SignupPayload): Promise<SignupResponse> =>{
        const res = await axiosClient.post("/auth/signup", data);
        return res.data;
    },

    signin : async (data: SigninPayload): Promise<SigninResponse> =>{
        const res = await axiosClient.post("/auth/signin", data);
        return res.data;
    },

    signout: async (): Promise<{message: string}> =>{
        const res = await axiosClient.post("/auth/signout");
        return res.data;
    },
};