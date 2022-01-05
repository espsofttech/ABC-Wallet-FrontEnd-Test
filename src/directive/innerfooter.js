import React, { useEffect, useState } from 'react';
import Header from '../directive/header';
import Footer from '../directive/footer';
import { NavLink } from 'react-router-dom';
import config from '../config/config';
const InnerFooter = (props) => {

    useEffect(() => {
        // window.scrollTo({ top: 0, behavior: 'smooth' });

    }, [])

    return (
        <>

            <div className="nk-footer nk-footer-fluid">
                <div className="container-fluid">
                    <div className="nk-footer-wrap">
                        <div className="nk-footer-copyright"> © 2021 Barteka Wallet<a href="javascript:void(0)" />
                        </div>
                        <div className="nk-footer-links">
                            <ul className="nav nav-sm">
                                <li className="nav-item"><a className="nav-link" href="TermsandCondition">Terms</a></li>
                                <li className="nav-item"><a className="nav-link" href="PrivacyPolicy">Privacy</a></li>
                                <li className="nav-item"><a className="nav-link" href="javascript:void(0)">Help</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}

export default InnerFooter;