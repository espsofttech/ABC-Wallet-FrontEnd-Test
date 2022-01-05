import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import config from '../config/config';
import Cookies from 'js-cookie';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
const InnerSidebar = (props) => {
    const [loginData, setLoginData] = useState((!Cookies.get('AbcWalletFrontLogin')) ? [] : JSON.parse(Cookies.get('AbcWalletFrontLogin')))

    const [sidebarOpen, setsidebarOpen] = useState(1)
    const [walletBalanceData, setwalletBalanceData] = useState([])

    //=======================================================  Get walletBalance API =========================

    const getWalletAPI = async (id) => {
        try {
            await axios({
                method: 'post',
                url: `${config.apiUrl}getWalletBalance`,
                headers: { "Authorization": loginData.data.Token },
                data: { user_id: loginData.data.user_id }
            }).then(response => {
                if (response.data.success === true) {
                    setwalletBalanceData(response.data.data);

                }
            })
        } catch (err) {
            toast.error(err.response?.data.msg)
        }
    }

    useEffect(() => {
        // window.scrollTo({ top: 0, behavior: 'smooth' });
        getWalletAPI()
    }, [])

    //=============================  For manage sidebar =================================

    const openSidebar = (id) => {
        if (id === 1) {
            setsidebarOpen(2)
        }
        else if (id === 2) {
            setsidebarOpen(1)
        }

    }

    const loading = () => {
        setTimeout(() => {
            window.location.reload()
        }, 100);
    }

    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <div className="nk-sidebar nk-sidebar-fat nk-sidebar-fixed" data-content="sidebarMenu">
                <div className="nk-sidebar-element nk-sidebar-head">
                    <div className="nk-sidebar-brand">
                        <NavLink to={`${config.baseUrl}`} className="logo-link nk-sidebar-logo">
                            <img className="logo-light logo-img" src="user-dashboard/images/logo.jpeg" srcSet="./images/logo2x.png 2x" alt="logo" />
                        </NavLink>
                    </div>
                    <div className="nk-menu-trigger mr-n2">
                        <a href="javascript:void(0)" className="nk-nav-toggle nk-quick-nav-icon d-xl-none" data-target="sidebarMenu"><em className="icon ni ni-arrow-left" /></a>
                    </div>
                </div>{/* .nk-sidebar-element */}
                <div className="nk-sidebar-element">
                    <div className="nk-sidebar-body" data-simplebar>
                        <div className="nk-sidebar-content">
                            <div className="nk-sidebar-widget d-none d-xl-block">
                                <div className="user-account-info between-center">
                                    <div className="user-account-main">
                                        <h6 className="overline-title-alt">Available Balance</h6>
                                        <div className="user-balance">{walletBalanceData[1]?.balance} <small className="currency currency-btc">TTD</small></div>
                                        <div className="user-balance-alt">{walletBalanceData[0]?.balance} <span className="currency currency-btc">USD</span></div>
                                    </div>

                                </div>

                                <div className="user-account-actions">
                                    <ul className="g-3">
                                        <li><Link to={`${config.baseUrl}Deposit`} className="btn btn-lg btn-primary"><span>Deposit</span></Link></li>
                                        <li><Link to={`${config.baseUrl}Withdraw`} className="btn btn-lg btn-warning"><span>Withdraw</span></Link></li>
                                    </ul>
                                </div>
                            </div>{/* .nk-sidebar-widget */}
                            <div className="nk-sidebar-widget nk-sidebar-widget-full d-xl-none pt-0">
                                <a className="nk-profile-toggle toggle-expand" data-target="sidebarProfile" href="#">
                                    <div className="user-card-wrap">
                                        <div className="user-card">
                                            <div className="user-avatar">
                                                <span>AB</span>
                                            </div>
                                            <div className="user-info">
                                                <span className="lead-text">Abu Bin Ishtiyak</span>
                                                <span className="sub-text">info@softnio.com</span>
                                            </div>
                                            <div className="user-action">
                                                <em className="icon ni ni-chevron-down" />
                                            </div>
                                        </div>
                                    </div>
                                </a>
                                <div className="nk-profile-content toggle-expand-content" data-content="sidebarProfile">
                                    <div className="user-account-info between-center">
                                        <div className="user-account-main">
                                            <h6 className="overline-title-alt">Available Balance</h6>
                                            <div className="user-balance">2.014095 <small className="currency currency-btc">BTC</small></div>
                                            <div className="user-balance-alt">18,934.84 <span className="currency currency-btc">BTC</span></div>
                                        </div>
                                        <a href="javascript:void(0)" className="btn btn-icon btn-light"><em className="icon ni ni-line-chart" /></a>
                                    </div>
                                    <ul className="user-account-data">
                                        <li>
                                            <div className="user-account-label">
                                                <span className="sub-text">Profits (7d)</span>
                                            </div>
                                            <div className="user-account-value">
                                                <span className="lead-text">+ 0.0526 <span className="currency currency-btc">BTC</span></span>
                                                <span className="text-success ml-2">3.1% <em className="icon ni ni-arrow-long-up" /></span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="user-account-label">
                                                <span className="sub-text">Deposit in orders</span>
                                            </div>
                                            <div className="user-account-value">
                                                <span className="sub-text text-base">0.005400 <span className="currency currency-btc">BTC</span></span>
                                            </div>
                                        </li>
                                    </ul>
                                    <ul className="user-account-links">
                                        <li><a href="javascript:void(0)" className="link"><span>Withdraw Funds</span> <em className="icon ni ni-wallet-out" /></a></li>
                                        <li><a href="javascript:void(0)" className="link"><span>Deposit Funds</span> <em className="icon ni ni-wallet-in" /></a></li> <li><a href="javascript:void(0)" className="link"><span>Deposit Funds</span> <em className="icon ni ni-wallet-in" /></a></li>
                                    </ul>
                                    <ul className="link-list">
                                        <li><a href="html/crypto/profile.html"><em className="icon ni ni-user-alt" /><span>View Profile</span></a></li>
                                        <li><a href="html/crypto/accounts.html"><em className="icon ni ni-setting-alt" /><span>Account Setting</span></a></li>
                                        <li><a href="html/crypto/contact-us.html"><em className="icon ni ni-setting-alt" /><span>Contact Us</span></a></li>
                                        <li><a href="html/crypto/profile-activity.html"><em className="icon ni ni-activity-alt" /><span>Login Activity</span></a></li>
                                    </ul>
                                    <ul className="link-list">
                                        <li><a href="javascript:void(0)"><em className="icon ni ni-signout" /><span>Sign out</span></a></li>
                                    </ul>
                                </div>
                            </div>{/* .nk-sidebar-widget */}
                            <div className="nk-sidebar-menu">
                                {/* Menu */}
                                <ul className="nk-menu">
                                    <li className="nk-menu-heading">
                                        <h6 className="overline-title">Menu</h6>
                                    </li>
                                    <li className="nk-menu-item">
                                        <NavLink  to={`${config.baseUrl}Dashboard`} className="nk-menu-link">
                                            <span className="nk-menu-icon"><em className="icon ni ni-dashboard" /></span>
                                            <span className="nk-menu-text">Dashboard</span>
                                        </NavLink>
                                    </li>
                                    <li className={sidebarOpen === 1 ? "nk-menu-item has-sub" : "nk-menu-item has-sub active"} onClick={e => openSidebar(sidebarOpen)}>
                                        <a href="javascript:void(0)" className="nk-menu-link nk-menu-toggle">
                                            <span className="nk-menu-icon"><em className="icon ni ni-wallet-alt" /></span>
                                            <span className="nk-menu-text">Wallets</span>
                                        </a>
                                        <ul className="nk-menu-sub" style={{ display: sidebarOpen === 1 ? 'none' : 'block' }}>
                                            <li className="nk-menu-item">
                                                <NavLink to={`${config.baseUrl}Deposit`} onClick={loading} className="nk-menu-link">
                                                    <span className="nk-menu-text">Deposit</span>
                                                </NavLink>
                                            </li>
                                            <li className="nk-menu-item">
                                                <NavLink to={`${config.baseUrl}Transfer`} onClick={loading} className="nk-menu-link">
                                                    <span className="nk-menu-text">Transfer</span>
                                                </NavLink>
                                            </li>
                                            <li className="nk-menu-item">
                                                <NavLink to={`${config.baseUrl}Withdraw`} onClick={loading} className="nk-menu-link">
                                                    <span className="nk-menu-text">Withdraw</span>
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </li>
                                    {/*   <li class="nk-menu-item has-sub">
                            <a href="javascript:void(0)" class="nk-menu-link nk-menu-toggle">
                                <span class="nk-menu-icon"><em class="icon ni ni-wallet-alt"></em></span>
                                <span class="nk-menu-text">Payments</span>
                            </a>
                            <ul class="nk-menu-sub">
                                <li class="nk-menu-item">
                                    <a href="javascript:void(0)" class="nk-menu-link">
                                        <span class="nk-menu-text">Peer to Peer</span>
                                    </a>
                                </li>
                                <li class="nk-menu-item">
                                    <a href="javascript:void(0)" target="_blank" class="nk-menu-link">
                                        <span class="nk-menu-text">Peer to Peer History</span>
                                    </a>
                                </li>
                                <li class="nk-menu-item">
                                    <a href="javascript:void(0)" target="_blank" class="nk-menu-link">
                                        <span class="nk-menu-text">Manage Cards</span>
                                    </a>
                                </li>
                            </ul>
                        </li> */}
                                    {/* <li className="nk-menu-item">
                                        <NavLink onClick={loading} to={`${config.baseUrl}Account`} className="nk-menu-link">
                                            <span className="nk-menu-icon"><em className="icon ni ni-user-c" /></span>
                                            <span className="nk-menu-text">My Account</span>
                                        </NavLink>
                                    </li> */}
                                    <li className="nk-menu-item">
                                        <NavLink  to={`${config.baseUrl}Buysell`} className="nk-menu-link">
                                            <span className="nk-menu-icon"><em className="icon ni ni-coins" /></span>
                                            <span className="nk-menu-text">Buy</span>
                                        </NavLink>
                                    </li>
                                    <li className="nk-menu-item">
                                        <NavLink  to={`${config.baseUrl}Transaction`} className="nk-menu-link">
                                            <span className="nk-menu-icon"><em className="icon ni ni-repeat" /></span>
                                            <span className="nk-menu-text">Transaction</span>
                                        </NavLink>
                                    </li>
                                    <li className="nk-menu-item">
                                        <NavLink  to={`${config.baseUrl}Profile`} className="nk-menu-link">
                                            <span className="nk-menu-icon"><em className="icon ni ni-account-setting" /></span>
                                            <span className="nk-menu-text">My Profile</span>
                                        </NavLink>
                                    </li>
                                    <li className="nk-menu-item">
                                        <NavLink  to={`${config.baseUrl}KycApplication`} className="nk-menu-link">
                                            <span className="nk-menu-icon"><em className="icon ni ni-file-text" /></span>
                                            <span className="nk-menu-text">KYC Application</span>
                                        </NavLink>
                                    </li>
                                    <li className="nk-menu-item">
                                        <NavLink  to={`${config.baseUrl}Changepassword`} className="nk-menu-link">
                                            <span className="nk-menu-icon"><em className="icon ni ni-file-text" /></span>
                                            <span className="nk-menu-text">Change Password</span>
                                        </NavLink>
                                    </li>
                                </ul>{/* .nk-menu */}
                            </div>{/* .nk-sidebar-menu */}
                            {/* <div className="nk-sidebar-footer">
                                <ul className="nk-menu nk-menu-footer">
                                    <li className="nk-menu-item">
                                        <a href="javascript:void(0)" className="nk-menu-link">
                                            <span className="nk-menu-icon"><em className="icon ni ni-help-alt" /></span>
                                            <span className="nk-menu-text">Support</span>
                                        </a>
                                    </li>
                                    <li className="nk-menu-item ml-auto">
                                        <div className="dropup">
                                            <a href="javascript:void(0)" className="nk-menu-link dropdown-indicator has-indicator" data-toggle="dropdown" data-offset="0,10">
                                                <span className="nk-menu-icon"><em className="icon ni ni-globe" /></span>
                                                <span className="nk-menu-text">English</span>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                                                <ul className="language-list">
                                                    <li>
                                                        <a href="javascript:void(0)" className="language-item">
                                                            <img src="user-dashboard/images/flags/english.png" alt="" className="language-flag" />
                                                            <span className="language-name">English</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:void(0)" className="language-item">
                                                            <img src="user-dashboard/images/flags/spanish.png" alt="" className="language-flag" />
                                                            <span className="language-name">Español</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:void(0)" className="language-item">
                                                            <img src="user-dashboard/images/flags/french.png" alt="" className="language-flag" />
                                                            <span className="language-name">Français</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:void(0)" className="language-item">
                                                            <img src="user-dashboard/images/flags/turkey.png" alt="" className="language-flag" />
                                                            <span className="language-name">Türkçe</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div> */}
                        </div>{/* .nk-sidebar-contnet */}
                    </div>{/* .nk-sidebar-body */}
                </div>{/* .nk-sidebar-element */}
            </div>



        </>
    );
}

export default InnerSidebar;