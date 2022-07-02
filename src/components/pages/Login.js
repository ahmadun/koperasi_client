import axios from 'axios'
import React, { useState,useContext  } from 'react'
import AuthUser from '../services/AuthUser'
import { AuthContext } from '../../App';


function Login() {

    const {http,setToken} = AuthUser();
    const { dispatch } = useContext(AuthContext)
    const [nik,setNik] = useState();
    const [password,setPassword] = useState();

    async function postLogin(e){
        
     

     
        http.get('/sanctum/csrf-cookie').then(response => {
            http.post('api/auth/login',{
                nik:nik,
                password:password
            }).then((res)=>{
                dispatch({
                    type: "LOGIN",
                    payload: res.data
                })

                setToken(res.data.nik,res.data.token);
        
                
            })
        });
      
    
    }


    return (
        <div className="hold-transition login-page">
            <div className="login-box">
                <div className="card card-outline card-primary">
                    <div className="card-header text-center">
                        <a href="../../index2.html" className="h1"><b>Admin</b>LTE</a>
                    </div>
                    <div className="card-body">
                        <p className="login-box-msg">Sign in to start your session</p>
                        <form onSubmit={postLogin}>
                            <div className="input-group mb-3">
                                <input type="text" onChange={e=>setNik(e.target.value)} className="form-control" placeholder="NIK" />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="password" onChange={e=>setPassword(e.target.value)} className="form-control" placeholder="Password" />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-8">
                              
                                </div>
                                <div className="col-4">
                                    <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                                </div>
                            </div>
                        </form>
                       
                        <p className="mb-1">
                            <a href="forgot-password.html">I forgot my password</a>
                        </p>
                        <p className="mb-0">
                            <a href="register.html" className="text-center">Register a new membership</a>
                        </p>
                    </div>
                </div>
            </div></div>

    )
}

export default Login