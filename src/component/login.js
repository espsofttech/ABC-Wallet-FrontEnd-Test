import React, { useEffect, useState } from 'react';
import Header from '../directive/header';
import Footer from '../directive/footer';
import config from '../config/config';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useHistory, NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import { browserName, browserVersion } from "react-device-detect";


const Login = (props) => {

    const history = useHistory()

    const [emailErrorLogin, setEmailErrorLogin] = useState(null)
    const [passwordErrorLogin, setPasswordErrorLogin] = useState(null)
    const [confirmicon, setconfirmIcon] = useState(0)
    const [ip, setip] = useState('')


    const [formData, setFormData] = useState({
        email: "",
        password: "",
        
    });
    const { email, password} = formData;

    //=======================================================  chage function =========================

    const onChangeLogin = (e) => {
        if (e.target.name === 'password') {
            setPasswordErrorLogin('');
        }

        if (e.target.name === 'email') {
            setEmailErrorLogin('');
        }

        setFormData({ ...formData, [e.target.name]: e.target.value }
        );
    }


    //========================================================  get IP  ===================================

    const getLocation = async(e) =>{
            axios.get(`https://ipapi.co/json/?__cf_chl_jschl_tk__=pmd_TjdfQUFNDtY8uWKDkPep3E7Aj6nEL124fHJeLOsu8Gc-1631799864-0-gqNtZGzNAhCjcnBszQh9`).then(result=>{

            setip(result.data.ip)
 
      })
    }

    //=======================================================  Onsubmit login API =========================


    const onSubmit = async (e) => {
        e.preventDefault();

        const newUser = {
            email,
            password,
            browser:browserName,
            ip:ip
        };
        if (formData.email === '') {
            setEmailErrorLogin('Email is required')
        }
        if (formData.password === '') {
            setPasswordErrorLogin('Password is required')

        }
        else {
            if (formData.password && formData.email) {
                try {
                    setPasswordErrorLogin('');
                    setEmailErrorLogin('');

                    await axios({
                        method: 'post',
                        url: `${config.apiUrl}login`,
                        data: newUser
                    }).then(response => {
                        if (response.data.success === true) {
                            // toast.success(response.data.msg)
                            Cookies.set('AbcWalletFrontLogin', JSON.stringify(response.data));
                            setFormData({ ...formData, email: '', password: '' })
                            setTimeout(() => {
                                window.location.href = config.baseUrl + 'Dashboard'
                                // history.push(config.baseUrl + 'Dashboard')
                            }, );
                        }
                    })
                } catch (err) {
                    toast.error(err.response.data.msg)
                }
            }

        }

    }

    //====================icon show hide password =====================//
    const showconfirmPassword = async (id) => {
        if (id === 0) {

            setconfirmIcon(1)
        }
        else if (id === 1) {

            setconfirmIcon(0)
        }
    }


    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        getLocation()
    }, [])

    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <div className="home-page">

                {/* Preloader */}
                <Header />

                {/* ##### Header Area Start ##### */}
                {/* Login Start */}
                <section className="login_section">
                    <div className="container px-4 py-5 mx-auto">
                        <div className="card card0">
                            <div className="d-flex flex-lg-row flex-column-reverse">
                                <div className="card card1">
                                    <div className="row justify-content-center my-auto">
                                        <div className="col-md-8 col-10 ">
                                            <form onSubmit={(e) => onSubmit(e)}>
                                                <div className="row justify-content-center px-3 mb-3"> <img id="logo" src="img/core-img/logo.jpeg" /> </div>
                                                <h3 className="mb-2 text-center heading" style={{ color: '#222' }}>Barteka Wallet</h3>
                                                <h6 className="msg-info" style={{ color: '#222' }}>Please login your account</h6>
                                                <div className="form-group"> <label className="form-control-label text-muted">Email</label> <input type="email" id="email" name="email" value={formData.email} onChange={onChangeLogin} placeholder="Email id" className="form-control" />
                                                    {emailErrorLogin && <span className="loginerrorcss">{emailErrorLogin}</span>}
                                                </div>
                                                <div className="form-group"> <label className="form-control-label text-muted">Password</label> <input type={confirmicon === 0 ? 'password' : 'text'} id="psw" name="password" onChange={onChangeLogin} placeholder="Password" value={formData.password} className="form-control" />
                                                    <span onClick={confirmicon === 0 ? (e) => showconfirmPassword(0) : (e) => showconfirmPassword(1)} className='eye-show-login'>

                                                        <i className={confirmicon === 0 ? 'fa fa-eye' : 'fa fa-eye-slash'}></i></span>
                                                    {passwordErrorLogin && <span className="loginerrorcss">{passwordErrorLogin}</span>}

                                                </div>
                                                <div className="row justify-content-center my-3 px-3"> <button type="submit" className="btn-block btn-color">Login</button> </div>
                                                <div className="row justify-content-center my-2"> <NavLink to={`${config.baseUrl}forgetpassword`}><small className="text-muted">Forgot Password?</small></NavLink> </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="bottom text-center mb-5">
                                        <NavLink to={`${config.baseUrl}Signup`} className="sm-text mx-auto mb-3">Don't have an account?<button className="btn btn-white ml-2">Create new</button></NavLink>
                                    </div>
                                </div>
                                <div className="card card2">
                                    <div className="my-auto mx-md-5 px-md-5 right">
                                        <h3 className="text-white">We are more than just a company</h3> <small className="text-white">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Login End */}
                {/* ########## All JS ########## */}
                <Footer hideFooterClass="HideFooter" />
            </div>
        </>
    );
}

export default Login;
















