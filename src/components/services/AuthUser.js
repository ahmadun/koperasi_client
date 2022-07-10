import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';

export default function AuthUser(){
    const navigate = useNavigate();


    const getToken = () =>{
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken;
    }

    const getUser = () =>{
        const userString = sessionStorage.getItem('user');
        const user_detail = JSON.parse(userString);
        return user_detail;
    }



    const [token,setToken] = useState(getToken());
    const [user,setUser] = useState(getUser());

    const saveToken = (user,token) =>{
        sessionStorage.setItem('token',JSON.stringify(token));
        sessionStorage.setItem('user',JSON.stringify(user));

        setToken(token);
        setUser(user);
        navigate('/');
    }

    const logout = () => {
        sessionStorage.clear();
        navigate('/login');
    }

    const http=axios.create({

        baseURL: 'http://localhost:8000',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': `Bearer ${token}`,
        },
        withCredentials:true,
    });


    const toasts = (status,meessage) => {
        switch(status) {
            case 'error':
                toast.error(meessage, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
              break;
            default:
                toast.success(meessage, {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
          }
       
    }
    
    return {
        setToken:saveToken,
        token,
        user,
        getToken,
        http,
        logout,
        toasts
    }
}