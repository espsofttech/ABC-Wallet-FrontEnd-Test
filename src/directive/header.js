import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import config from '../config/config';
import Cookies from 'js-cookie';
const Header = (props) => {

    const [loginData, setLoginData] = useState((!Cookies.get('AbcWalletFrontLogin')) ? [] : JSON.parse(Cookies.get('AbcWalletFrontLogin')))


    const homeScroll = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }


    const executeScroll = () => {
        const section = document.querySelector('#buy');
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    const servicesScroll = () => {
        setTimeout(() => {

            const section = document.querySelector('#services');
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    const teamScroll = () => {
        setTimeout(() => {
            const section = document.querySelector('#team');
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    const contactScroll = () => {
        const section = document.querySelector('#contact');
        section.scrollIntoView({ behavior: 'smooth' });
    }

//==========================================  Click to logout  ======================================

const signout = async (e) => {
    Cookies.remove('AbcWalletFrontLogin')
    setTimeout(() => {
        window.location.href = `${config.baseUrl}`
    });
  }



    return (
        <>
        
            <header className="header-area fadeInDown" data-wow-delay="0.2s">
                <div className="classy-nav-container light breakpoint-off">
                    <div className="container">
                        {/* Classy Menu */}
                        <nav className="classy-navbar light justify-content-between" id="dreamNav">
                            {/* Logo */}
                            <NavLink className="nav-brand light" onClick={homeScroll} to={`${config.baseUrl}`}><img src="img/core-img/logo.jpeg" alt="logo" /></NavLink>
                            {/* Navbar Toggler */}
                            <div className="classy-navbar-toggler demo">
                                <span className="navbarToggler"><span /><span /><span /></span>
                            </div>
                            {/* Menu */}
                            <div className="classy-menu">
                                {/* close btn */}
                                <div className="classycloseIcon">
                                    <div className="cross-wrap"><span className="top" /><span className="bottom" /></div>
                                </div>
                                {/* Nav Start */}
                                <div className="classynav login-header">
                                    <ul id="nav" style={{marginTop:'15px'}}>
                                        <li><NavLink to={`${config.baseUrl}`} onClick={homeScroll}>Home</NavLink></li>
                                        <li><NavLink to={`${config.baseUrl}Aboutwallet`}>About Wallet</NavLink></li>
                                        <li><NavLink to={`${config.baseUrl}`} onClick={executeScroll}>Buy</NavLink></li>
                                        <li><NavLink to={`${config.baseUrl}`} onClick={servicesScroll}>Services</NavLink></li>
                                        <li><NavLink to={`${config.baseUrl}`} onClick={teamScroll}>team</NavLink></li>
                                        <li><NavLink to={`${config.baseUrl}`} onClick={contactScroll}>Contact Us</NavLink></li>
                                    </ul>
                                    {/* Button */}
                                    {loginData.length === 0 ?
                                    <NavLink to={`${config.baseUrl}Login`} className="btn login-btn ml-50">Log in</NavLink>:
                                    <>
                                    <NavLink to={`${config.baseUrl}Dashboard`} className="btn login-btn ml-50">Dashboard</NavLink>
                                    <NavLink to="#" onClick={signout} className="btn login-btn ml-50">Log Out</NavLink>

                                    </>
                                    
                                }

                                </div>
                                {/* Nav End */}
                            </div>
                        </nav>
                    </div>
                </div>
            </header>
            {/* ##### Header Area End ##### */}
            {/* ##### Welcome Area Start ##### */}

        </>
    );
}

export default Header;


