"use client"
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {loadme} from '@/lib/actions/user';


const UserProvider = ({children}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadme());
    },[])
  return (children)
}

export default UserProvider