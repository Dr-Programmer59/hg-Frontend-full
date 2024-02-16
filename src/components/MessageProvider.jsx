"use client"
import { ClearError, ClearMessage } from '@/lib/ActionType';
import React, { useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const MessageProvider = ({ children }) => {
    const {message,error} = useSelector(store => store.userReducer);
    const dispatch = useDispatch();


    useLayoutEffect(() => {
        console.log(message,error)
        if(error){
            toast.success(error);
            dispatch({type: ClearError})
        }

        if(message){
            toast.success(message);
            dispatch({type: ClearMessage})
        }
    },[message,error])
    return (children)
}

export default MessageProvider