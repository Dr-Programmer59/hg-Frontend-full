import axios from 'axios'
import { ForgotUserFai, ForgotUserReq, ForgotUserSuc, LoadUserFai, LoadUserReq, LoadUserSuc, LoginUserFai, LoginUserReq, LoginUserSuc, LogoutUserFai, LogoutUserReq, LogoutUserSuc, PrayingFai, PrayingReq, PrayingSuc, RegisterUserFai, RegisterUserReq, RegisterUserSuc, ResterUserFai, ResterUserSuc, UpdateUserFai, UpdateUserReq, UpdateUserSuc } from '../ActionType';

const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1`,
    withCredentials: true
});

export const login = (email,password) => async (dispatch) => {
    try {
        dispatch({
            type: LoginUserReq,
        })

        const {data} = await api.post('/login',{email,password});
        dispatch({
            type: LoginUserSuc,...data
        })
    } catch (error) {
        dispatch({
            type: LoginUserFai,
            message: error?.response?.data?.message
        })
    }
}


export const register = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: RegisterUserReq,
        })

        const {data} = await api.post('/register',formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        dispatch({
            type: RegisterUserSuc,...data
        })
    } catch (error) {
        dispatch({
            type: RegisterUserFai,
            message: error?.response?.data?.message
        })
    }
}

export const loadme = () => async (dispatch) => {
    try {
        dispatch({
            type: LoadUserReq,
        })

        const {data} = await api.get('/me');
        dispatch({
            type: LoadUserSuc,...data
        })
    } catch (error) {
        dispatch({
            type: LoadUserFai
        })
    }
}


export const logout = () => async (dispatch) => {
    try {
        dispatch({
            type: LogoutUserReq,
        })

        const {data} = await api.get('/logout');
        dispatch({
            type: LogoutUserSuc,...data
        })
    } catch (error) {
        dispatch({
            type: LogoutUserFai,
            message: error?.response?.data?.message
        })
    }
}

export const forgot = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: ForgotUserReq,
        })

        const {data} = await api.post('/forgot-password',formData);
        dispatch({
            type: ForgotUserSuc,...data
        })
    } catch (error) {
        dispatch({
            type: ForgotUserFai,
            message: error?.response?.data?.message
        })
    }
}

export const reset = (token,formData) => async (dispatch) => {
    try {
        dispatch({
            type: RegisterUserReq,
        })

        const {data} = await api.put(`/reset-password/${token}`,formData);
        dispatch({
            type: ResterUserSuc,...data
        })
    } catch (error) {
        dispatch({
            type: ResterUserFai,
            message: error?.response?.data?.message
        })
    }
}


export const updateUser = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: UpdateUserReq,
        })

        const {data} = await api.put('/user/update',formData);
        dispatch({
            type: UpdateUserSuc,...data
        })
    } catch (error) {
        dispatch({
            type: UpdateUserFai,
            message: error?.response?.data?.message
        })
    }
}


export const PrayingRequest = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: PrayingReq,
        })

        const {data} = await api.post('/pray-request',formData,{
            headers: {
                'Content-Type': 'application/json'
            }
        });
        dispatch({
            type: PrayingSuc,...data
        })
    } catch (error) {
        dispatch({
            type: PrayingFai,
            message: error?.response?.data?.message
        })
    }
}


export const getChannels = async  (query) => {
    try {
        const {data} = await api.get(`/channels?channelName=${query}`);
        return data?.channels
    } catch (error) {
        return []
    }
}
export const getSingleChannels = async  (_id) => {
    try {
        const {data} = await api.get(`/channels/${_id}`);
        return data?.channel
    } catch (error) {
        return {}
    }
}