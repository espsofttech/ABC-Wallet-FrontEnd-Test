import React, { useEffect, useState } from 'react';
import Header from '../directive/header';
import Footer from '../directive/footer';
import { useHistory, NavLink, useParams } from 'react-router-dom';
import config from '../config/config';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Resetpassword = (props) => {
    const { token } = useParams()
    const history = useHistory()

    const [passerr, setPasserr] = useState('')
    const [passwordErrorLogin, setPasswordErrorLogin] = useState(null)
    const [password2ErrorLogin, setPassword2ErrorLogin] = useState(null)
    const [confirmicon, setconfirmIcon] = useState(0)
    const [confirmicon1, setconfirmIcon1] = useState(0)


    const [formData, setFormData] = useState({
        password: "",
        password2: ''
    });
    const { password, password2 } = formData;

    //======================Validation ========================//

    var validatePassword = () => {
        console.log(formData);
        var p = formData.password
        let errors = [];
        if (p.length < 8) {
            errors.push("Your password must be at least 8 characters");
        }
        if (p.search(/[a-z]/i) < 0) {
            errors.push("Your password must contain at least one letter.");
        }
        if (p.search(/[0-9]/) < 0) {
            errors.push("Your password must contain at least one digit.");
        }
        if (errors.length > 0) {
            setPasserr(errors.join("\n"))
            return false;
        }
        setPasserr('')
        return true;
    }


    //=======================================================  chage function =========================

    const onChangeLogin = (e) => {
        if (e.target.name === 'password') {
            setPasswordErrorLogin('');
        }

        if (e.target.name === 'password2') {
            setPassword2ErrorLogin('');
        }
        setFormData({ ...formData, [e.target.name]: e.target.value }
        );
    }

    //=======================================================  Onsubmit login API =========================


    const onSubmit = async (e) => {
        e.preventDefault();

        const newUser = {
            password,
            password2
        };

        if (formData.password === '') {
            setPasswordErrorLogin('Password is required')

        }
        if (formData.password2 === '') {
            setPassword2ErrorLogin('Confirm Password is required')
        }

        if (formData.password !== formData.password2) {
            setPassword2ErrorLogin('Password is not match')
        }

        else if (formData.password !== '') {
            const isValid = validatePassword()
            if (!isValid) {
            }
            else {
                if (formData.password && formData.password2) {
                    try {
                        setPasswordErrorLogin('');
                        setPassword2ErrorLogin('')
                        setPasserr('')

                        await axios({
                            method: 'post',
                            url: `${config.apiUrl}resetpassword/` + token,
                            data: newUser
                        }).then(response => {
                            if (response.data.success === true) {
                                toast.success(response.data.msg)
                                setFormData({ ...formData, password: '', password2: '' })
                                setTimeout(() => {
                                    history.push(config.baseUrl + 'Login')
                                },200);
                            }
                        })
                    } catch (err) {
                        toast.error(err.response.data.msg)
                    }
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

    //====================icon show hide password =====================//
    const showconfirmPassword1 = async (id) => {
        if (id === 0) {

            setconfirmIcon1(1)
        }
        else if (id === 1) {

            setconfirmIcon1(0)
        }
    }


    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });

    }, [])

    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <Header />

            {/* ##### Header Area Start ##### */}
            {/* signup Start */}

            <section className="login_section">
                <div className="container px-4 py-5 mx-auto">
                    <div className="card card0">
                        <div className="d-flex flex-lg-row flex-column-reverse">
                            <div className="card card1">
                                <div className="row justify-content-center my-auto">
                                    <div className="col-md-8 col-10 ">
                                        <form onSubmit={(e) => onSubmit(e)}>
                                            <div className="row justify-content-center px-3 mb-3"> <img id="logo" src="img/core-img/logo.jpeg" /> </div>
                                            <h3 className="mb-2 text-center heading" style={{ color: '#222' }}>ABC Wallet</h3>
                                            <h6 className="msg-info" style={{ color: '#222' }}>Please Create your account</h6>

                                            <div className="form-group"> <label className="form-control-label text-muted">Password</label> <input type={confirmicon === 0 ? 'password' : 'text'} id="psw" name="password" onChange={onChangeLogin} placeholder="Password" value={formData.password} className="form-control" />
                                                <span onClick={confirmicon === 0 ? (e) => showconfirmPassword(0) : (e) => showconfirmPassword(1)} className='eye-show-login'>

                                                    <i className={confirmicon === 0 ? 'fa fa-eye' : 'fa fa-eye-slash'}></i></span>
                                                {passerr.length > 0 ? <div><span className="loginerrorcss">{passerr}</span></div> : ''}

                                                {passwordErrorLogin && <span className="loginerrorcss">{passwordErrorLogin}</span>}
                                            </div>

                                            <div className="form-group"> <label className="form-control-label text-muted">Confirm Password</label> <input type={confirmicon1 === 0 ? 'password' : 'text'} id="psw" name="password2" onChange={onChangeLogin} value={formData.password2} placeholder="Confirm Password" className="form-control" />
                                                <span onClick={confirmicon1 === 0 ? (e) => showconfirmPassword1(0) : (e) => showconfirmPassword1(1)} className='eye-show-login'>

                                                    <i className={confirmicon1 === 0 ? 'fa fa-eye' : 'fa fa-eye-slash'}></i></span>
                                                {password2ErrorLogin && <span className="loginerrorcss">{password2ErrorLogin}</span>}
                                                {/* {passerr.length > 0 ? <div><span className="loginerrorcss">{passerr}</span></div> : ''} */}


                                            </div>
                                            <div className="row justify-content-center my-3 px-3"> <button className="btn-block btn-color" type="submit">Change Password</button> </div>
                                        </form>
                                        {/*  <div class="row justify-content-center my-2"> <a href="#"><small class="text-muted">Forgot Password?</small></a> </div> */}
                                    </div>

                                </div>
                                <div className="bottom text-center mb-5">
                                    <NavLink to={`${config.baseUrl}Login`} className="sm-text mx-auto mb-3">Have an account?<button className="btn btn-white ml-2">Login</button></NavLink>
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

            {/* ########## All JS ########## */}
            <Footer hideFooterClass="HideFooter" />

        </>
    );
}

export default Resetpassword;