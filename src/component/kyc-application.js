import React, { useEffect, useState } from 'react';
import Header from '../directive/header';
import Footer from '../directive/footer';
import { NavLink } from 'react-router-dom';
import config from '../config/config';
import InnerHeader from '../directive/innerHeader';
import InnerSidebar from '../directive/innerSidebar';
import InnerFooter from '../directive/innerfooter';
const KycApplication = (props) => {

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });

    }, [])

    return (
        <>



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
                                    <div className="kyc-app wide-sm m-auto">
                                        <div className="nk-block-head nk-block-head-lg wide-xs mx-auto">
                                            <div className="nk-block-head-content text-center">
                                                <h2 className="nk-block-title fw-normal">KYC Verification</h2>
                                                <div className="nk-block-des">
                                                    <p style={{ color: '#526484' }}>To comply with regulation each participant will have to go through indentity verification (KYC/AML) to prevent fraud causes. </p>
                                                </div>
                                            </div>
                                        </div>{/* nk-block-head */}
                                        <div className="nk-block">
                                            <div className="card card-bordered">
                                                <div className="card-inner card-inner-lg">
                                                    <div className="nk-kyc-app p-sm-2 text-center">
                                                        <div className="nk-kyc-app-icon">
                                                            <em className="icon ni ni-files" />
                                                        </div>
                                                        <div className="nk-kyc-app-text mx-auto">
                                                            <p className="lead" style={{ color: '#526484' }}>You have not submitted your necessary documents to verify your identity. In order to purchase our tokens, please verify your identity.</p>
                                                        </div>
                                                        <div className="nk-kyc-app-action" >
                                                            <NavLink to={`${config.baseUrl}Kycform`} className="btn btn-lg btn-primary">Click here to complete your KYC</NavLink>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-center pt-4">
                                                <p style={{ color: '#526484' }}>If you have any question, please contact our support team <a href="mailto:info@softnio.com">info@softnio.com</a></p>
                                            </div>
                                        </div>{/* nk-block */}
                                    </div>{/* kyc-app */}
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

export default KycApplication;
















