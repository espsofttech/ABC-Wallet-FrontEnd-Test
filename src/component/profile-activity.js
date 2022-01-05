import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { NavLink } from 'react-router-dom';
import config from '../config/config';
import InnerHeader from '../directive/innerHeader';
import InnerSidebar from '../directive/innerSidebar';
import InnerFooter from '../directive/innerfooter';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
const ProfileActivity = (props) => {

    const [loginData, setLoginData] = useState((!Cookies.get('AbcWalletFrontLogin')) ? [] : JSON.parse(Cookies.get('AbcWalletFrontLogin')))
    const [loginactivity, setloginactivity] = useState([])

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        getLoginActivity()
    }, [])

    //=======================================================  login activity API =========================

    const getLoginActivity = async (id) => {
        try {
            await axios({
                method: 'post',
                url: `${config.apiUrl}userloginactivity`,
                headers: { "Authorization": loginData.data.Token },
                data: { 'user_id': loginData.data.user_id }
            }).then(response => {
                if (response.data.success === true) {
                    setloginactivity(response.data.response);
                }
            })
        } catch (err) {
            toast.error(err.response?.data.msg)
        }
    }

    return (
        <>

            <Toaster
                position="top-right"
                reverseOrder={false}
            />


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
                                    <div className="nk-block-head">
                                        <div className="nk-block-head-content">
                                            <div className="nk-block-head-sub"><NavLink className="back-to" to={`${config.baseUrl}Profile`}><em className="icon ni ni-arrow-left" /><span>My Profile</span></NavLink></div>
                                            <h2 className="nk-block-title fw-normal">Login Activity</h2>
                                            <div className="nk-block-des">
                                                <p style={{ color: '#526484' }}>Here is your last 20 login activities log. <span className="text-soft"><em className="icon ni ni-info" data-toggle="tooltip" data-placement="right" title="activities log" /></span></p>
                                            </div>
                                        </div>
                                    </div>{/* nk-block-head */}
                                    <div className="nk-block">
                                        <div className="nk-block-title-group mb-3">
                                            <h6 className="nk-block-title title">Activity on your account</h6>
                                            {/* <a href="#" className="link link-danger">Clear log</a> */}
                                        </div>
                                        <div className="card card-bordered">
                                            <table className="table table-ulogs">
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th className="tb-col-os"><span className="overline-title">Browser <span className="d-sm-none">/ IP</span></span></th>
                                                        <th className="tb-col-ip"><span className="overline-title">IP</span></th>
                                                        <th className="tb-col-time"><span className="overline-title">Time</span></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                        {loginactivity.map(item => (
                                                    <tr>
                                                            <>
                                                                <td className="tb-col-os">{item.browser}</td>
                                                                <td className="tb-col-ip"><span className="sub-text">{item.ip}</span></td>
                                                                <td className="tb-col-time"><span className="sub-text">{item.activity_time}</span></td>
                                                            </>

                                                    </tr>
                                                        ))}

                                                </tbody>
                                            </table>{/* .table */}
                                        </div>{/* .card */}
                                    </div>{/* .nk-block */}
                                </div>
                            </div>
                        </div>



                      
                        <InnerFooter />
                     
                    </div>
                </div>
            </div>

        </>
    );
}

export default ProfileActivity;
















