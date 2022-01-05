import React, { useEffect, useState } from 'react';
import Header from '../directive/header';
import Footer from '../directive/footer';
import { NavLink } from 'react-router-dom';
import config from '../config/config';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
const Forgetpassword = (props) => {

  const [emailErrorLogin, setEmailErrorLogin] = useState(null)


  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  //=======================================================  chage function =========================

  const onChangeLogin = (e) => {

    if (e.target.name === 'email') {
      setEmailErrorLogin('');
    }

    setFormData({ ...formData, [e.target.name]: e.target.value }
    );
  }


  //=======================================================  Onsubmit login API =========================


  const onSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      email,
    };
    if (formData.email === '') {
      setEmailErrorLogin('Email is required')
    }

    else {
      if (formData.email) {
        try {
          setEmailErrorLogin('');

          await axios({
            method: 'post',
            url: `${config.apiUrl}forgot`,
            data: newUser
          }).then(response => {
            if (response.data.success === true) {
              toast.success(response.data.msg)
              setFormData({ ...formData, email: '' })
            }
          })
        } catch (err) {
          toast.error(err.response.data.msg)
        }
      }

    }

  }


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

  }, [])

  return (
    <>

      {/* Preloader */}
      <Header />
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
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
                      <h3 className="mb-2 text-center heading">Forgot Password</h3>
                      {/* <h6 class="msg-info">Forgot Password</h6> */}
                      <div className="form-group"> <label className="form-control-label text-muted">Email</label> <input type="email" id="email" name="email" value={formData.email} onChange={onChangeLogin} placeholder="Email id" className="form-control" />
                        {emailErrorLogin && <span className="loginerrorcss">{emailErrorLogin}</span>}

                      </div>
                      <div className="row justify-content-center my-3 px-3"> <button type="submit" className="btn-block btn-color">Reset Password</button> </div>

                      <div className="bottom text-center mb-5">
                        <NavLink to={`${config.baseUrl}Login`} className="sm-text mx-auto mb-3">Have an account?<button className="btn btn-white ml-2">Login</button></NavLink>
                      </div>
                    </form>
                  </div>
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

export default Forgetpassword;
















