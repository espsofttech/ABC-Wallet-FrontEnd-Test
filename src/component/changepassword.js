import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import config from '../config/config';
import InnerHeader from '../directive/innerHeader';
import InnerSidebar from '../directive/innerSidebar';
import InnerFooter from '../directive/innerfooter';
import Cookies from 'js-cookie';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Line } from "react-chartjs-2";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Changepassword = (props) => {
    const [loginData, setLoginData] = useState((!Cookies.get('AbcWalletFrontLogin')) ? [] : JSON.parse(Cookies.get('AbcWalletFrontLogin')))
    const [visible, setvisible] = useState('')

    const [currentPasswordError, setcurrentPasswordError] = useState(null)
    const [passwordError, setpasswordError] = useState(null)
    const [password2Error, setpassword2Error] = useState(null)
    const [changepassForm, setchangepassForm] = useState(false)

    const [passalrt, setpassAlert] = useState(false)
    const [passerr, setPasserr] = useState('')
    //=======================  For pASSWORD icons  =====================================

    const [formData, setFormData] = useState({
        currentPassword: "",
        password: "",
        password2: "",
        email: loginData.data?.user_email
    });
    const { currentPassword, password, password2, email } = formData;
    //========================================  onchange Password  ====================================
    const onChange = (e) => {
        if (e.target.name == 'currentPassword') {
            setcurrentPasswordError('');
        }
        if (e.target.name == 'password') {
            setpasswordError('');
        }
        if (e.target.name == 'password2') {
            setpassword2Error('');
        }
        setFormData({ ...formData, [e.target.name]: e.target.value }
        );
    }

    //========================================  validation of Password  ====================================

    var validatePassword = () => {

        var p = formData.password
        let errors = [];
        if (p.length < 8) {
            errors.push("Your password must be at least 8 characters");
            if (formData.currentPassword === '') {
                setcurrentPasswordError('Current Password is required');
            }
            if (formData.password2 === '') {
                setpassword2Error('Confirm Password is required');
            }
            if (formData.password !== formData.password2) {
                setpassAlert(true)
            } else {
                setpassAlert(false)
            }
        }
        if (p.search(/[a-z]/i) < 0) {
            errors.push("Your password must contain at least one letter.");
            if (formData.currentPassword === '') {
                setcurrentPasswordError('Current Password is required');
            }
            if (formData.password2 === '') {
                setpassword2Error('Confirm Password is required');
            }
            if (formData.password !== formData.password2) {
                setpassAlert(true)
            } else {
                setpassAlert(false)
            }
        }
        if (p.search(/[0-9]/) < 0) {
            errors.push("Your password must contain at least one digit.");
            if (formData.currentPassword === '') {
                setcurrentPasswordError('Current Password is required');
            }
            if (formData.password2 === '') {
                setpassword2Error('Confirm Password is required');
            }
            if (formData.password !== formData.password2) {
                setpassAlert(true)
            } else {
                setpassAlert(false)
            }
        }
        if (errors.length > 0) {
            //alert(errors.join("\n"));
            setPasserr(errors.join("\n"))
            return false;
        }




        setPasserr('')
        return true;
    }

    //========================================  Submit of Password  ====================================

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validatePassword()
        if (!isValid) {
        }

        else {

            const newUser = {
                currentPassword,
                password,
                password2,
                email: loginData.data?.user_email,
                id: loginData?.data?.user_id,
            };

            if (formData.currentPassword && formData.password && formData.password2) {
                setpassAlert(false)
                setcurrentPasswordError('');
                setpasswordError('');
                setpassword2Error('');

                const res = await axios({
                    method: 'post',
                    url: `${config.apiUrl}changepassword`,
                    headers: { "Authorization": loginData.Token },
                    data: newUser

                })
                    .then(response => {
                        if (response.data.success === true) {
                            toast.success(response.data.msg)
                            setFormData({ currentPassword: '', password: '', password2: '' })
                            setchangepassForm(false)

                        }
                        else if (response.data.success === false) {
                            toast.error(response.data.msg)
                        }
                    })
                    .catch(err => {

                        toast.error(err.response?.data?.msg)

                    })
            }
        }
    }



    useEffect(() => {
        // window.scrollTo({ top: 0, behavior: 'smooth' });
        setvisible(1)

    }, [])

    return (
        <>

            {visible === '' ?
                <div className="loaderCss">
                    <Loader

                        className="mainloaderCss"
                        type={config.loaderType}
                        color="#00BFFF"
                        height={100}
                        width={100}
                        timeout={300000} //3 secs
                    />
                </div> : ''
            }


            <div className="nk-app-root">
                {/* main @s */}
                <div className="nk-main ">
                    {/* sidebar @s */}
                    <InnerSidebar />
                    {/* sidebar @e */}
                    {/* wrap @s */}
                    <div className="nk-wrap ">
                        {/* main header @s */}

                        <InnerHeader />

                        {/* main header @e */}
                        {/* content @s */}

                        <div className="nk-content nk-content-fluid innerData">
                            <div className="container-xl wide-lg">
                                <div className="nk-content-body">
                                    <div className="container">
                                        <div className="contact-parent">

                                            <div className="contact-child child2">
                                                <div className="inside-contact">
                                                    <form onSubmit={(e) => handleSubmit(e)}>
                                                        <h2>Change Password</h2>
                                                        <h3>
                                                            <span id="confirm">
                                                            </span></h3>
                                                        <p style={{ color: '#526484' }}>Old Password *</p>
                                                        <input id="txt_name" type="password" onChange={onChange} value={currentPassword} name="currentPassword" />
                                                        {currentPasswordError && <span className="errorcss">{currentPasswordError}</span>}

                                                        <p style={{ color: '#526484' }}>New Password *</p>
                                                        <input id="txt_email" type="password" onChange={onChange} value={password} name="password" />
                                                        {passerr.length > 0 ? <div><span className='errorcss'>{passerr}</span></div> : ''}

                                                        <p style={{ color: '#526484' }}>Confirm Password *</p>
                                                        <input id="txt_phone" type="password" onChange={onChange} value={password2} name="password2" />
                                                        {passalrt === true ? <div><span className='errorcss'>Did not match Passwords</span></div> :
                                                            password2Error && <span className="errorcss">{password2Error}</span>

                                                        }
                                                        <button  id="btn_send" type="submit">Change Password</button>
                                                        {/* <input type="submit" id="btn_send" defaultValue="SEND" /> */}
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* content @e */}
                        {/* footer @s */}
                        <InnerFooter />
                        {/* footer @e */}
                    </div>
                    {/* wrap @e */}
                </div>
                {/* main @e */}
            </div>
            {/* app-root @e */}
            {/* JavaScript */}


        </>
    );
}

export default Changepassword;
















