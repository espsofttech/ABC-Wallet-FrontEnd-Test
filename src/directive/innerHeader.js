import React, { useEffect, useState } from 'react';
import config from '../config/config';
import Cookies from 'js-cookie';
import { NavLink, useHistory } from 'react-router-dom';
import axios from 'axios';
const InnerHeader = (props) => {
  const history = useHistory()

  const [loginData, setLoginData] = useState((!Cookies.get('AbcWalletFrontLogin')) ? [] : JSON.parse(Cookies.get('AbcWalletFrontLogin')))
  const [profileList, setprofileList] = useState('')
  const [walletBalanceData, setwalletBalanceData] = useState([])

  //=======================================================  getProfile login API =========================

  const getProfile = async () => {
    try {
      await axios({
        method: 'post',
        url: `${config.apiUrl}getProfilePic`,
        headers: { "Authorization": loginData.data.Token },
        data: { id: loginData.data.user_id }
      }).then(response => {
        if (response.data.success === true) {
          setprofileList(response.data.response)
        }
      })
    } catch (err) {

    }
  }
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
      // toast.error(err.response?.data.msg)
    }
  }


  useEffect(() => {
    // window.scrollTo({ top: 0, behavior: 'smooth' });
    getProfile()
    getWalletAPI()
  }, [])

  //==========================================  Click to logout  ======================================

  const signout = async (e) => {
    Cookies.remove('AbcWalletFrontLogin')
    setTimeout(() => {
      history.push(config.baseUrl)
    });
  }

  const loading = () => {
    setTimeout(() => {
      window.location.reload()
    }, 100);
  }

  return (
    <>
      <div className="nk-header nk-header-fluid nk-header-fixed is-light">
        <div className="container-fluid">
          <div className="nk-header-wrap">
            <div className="nk-menu-trigger d-xl-none ml-n1">
              <a href="#" className="nk-nav-toggle nk-quick-nav-icon" data-target="sidebarMenu"><em className="icon ni ni-menu" /></a>
            </div>
            <div className="nk-header-brand d-xl-none">
              <a href="html/crypto/index.html" className="logo-link">
                <img className="logo-light logo-img" src="user-dashboard/images/logo.png" srcSet="./images/logo2x.png 2x" alt="logo" />
                <img className="logo-dark logo-img" src="user-dashboard/images/logo.jpeg" srcSet="./images/logo-dark2x.png 2x" alt="logo-dark" />
                <span className="nio-version">Crypto</span>
              </a>
            </div>
            {/* <div className="nk-header-news d-none d-xl-block">
              <div className="nk-news-list">
                <a className="nk-news-item" href="#">
                  <div className="nk-news-icon">
                    <em className="icon ni ni-card-view" />
                  </div>
                  <div className="nk-news-text">
                    <p>Setup Guide <span> Account # 4682313105</span></p>
                    <em className="icon ni ni-external" />
                  </div>
                </a>
              </div>
            </div> */}
            <div className="nk-header-tools">
              <ul className="nk-quick-nav">
                <li className="dropdown user-dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                    <div className="user-toggle">
                      <div className="user-avatar sm">
                        <em className="icon ni ni-user-alt" />
                      </div>
                      <div className="user-info d-none d-md-block">
                        <div className="user-status user-status-unverified">Unverified</div>
                        <div className="user-name dropdown-indicator">{profileList.first_name ? profileList.first_name : 'Avatar'}</div>
                      </div>
                    </div>
                  </a>
                  <div className="dropdown-menu dropdown-menu-md dropdown-menu-right dropdown-menu-s1">
                    <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
                      <div className="user-card">
                        <div className="user-avatar sm">
                          <em className="icon ni ni-user-alt" />
                        </div>
                        <div className="user-info">
                          <span className="lead-text">{profileList.first_name ? profileList.first_name : 'Avatar'}</span>
                          <span className="sub-text">{loginData.data.user_email}</span>
                        </div>
                      </div>
                    </div>
                    <div className="dropdown-inner user-account-info">
                      <h6 className="overline-title-alt">ABC WALLET Account</h6>
                      <div className="user-balance">{walletBalanceData[0]?.balance} <small className="currency currency-btc">USD</small></div>
                      <div className="user-balance-sub"><span>{walletBalanceData[1]?.balance} <span className="currency currency-btc">TTD</span></span></div>
                      <NavLink to={`${config.baseUrl}Withdraw`} className="link"><span>Withdraw Funds</span> <em className="icon ni ni-wallet-out" /></NavLink>
                    </div>
                    <div className="dropdown-inner">
                      <ul className="link-list">
                        <li><NavLink onClick={loading} to={`${config.baseUrl}Profile`}><em className="icon ni ni-user-alt" /><span>View Profile</span></NavLink></li>
                        <li><NavLink onClick={loading} to={`${config.baseUrl}Account`}><em className="icon ni ni-setting-alt" /><span>Account Setting</span></NavLink></li>
                        <li><NavLink onClick={loading} to={`${config.baseUrl}ProfileActivity`}><em className="icon ni ni-activity-alt" /><span>Login Activity</span></NavLink></li>
                        {/* <li><a href="html/crypto/contact-us.html"><em className="icon ni ni-setting-alt" /><span>Contact Us</span></a></li> */}
                      </ul>
                    </div>
                    <div className="dropdown-inner">
                      <ul className="link-list">
                        <li><a href="javascript:void(0);" onClick={signout}><em className="icon ni ni-signout" /><span>Sign out</span></a></li>
                      </ul>
                    </div>
                  </div>
                </li>
                {/* <li className="dropdown notification-dropdown mr-n1">
                  <a href="#" className="dropdown-toggle nk-quick-nav-icon" data-toggle="dropdown">
                    <div className="icon-status icon-status-info"><em className="icon ni ni-bell" /></div>
                  </a>
                  <div className="dropdown-menu dropdown-menu-xl dropdown-menu-right dropdown-menu-s1">
                    <div className="dropdown-head">
                      <span className="sub-title nk-dropdown-title">Notifications</span>
                      <a href="#">Mark All as Read</a>
                    </div>
                    <div className="dropdown-body">
                      <div className="nk-notification">
                        <div className="nk-notification-item dropdown-inner">
                          <div className="nk-notification-icon">
                            <em className="icon icon-circle bg-warning-dim ni ni-curve-down-right" />
                          </div>
                          <div className="nk-notification-content">
                            <div className="nk-notification-text">You have requested to <span>Widthdrawl</span></div>
                            <div className="nk-notification-time">2 hrs ago</div>
                          </div>
                        </div>
                        <div className="nk-notification-item dropdown-inner">
                          <div className="nk-notification-icon">
                            <em className="icon icon-circle bg-success-dim ni ni-curve-down-left" />
                          </div>
                          <div className="nk-notification-content">
                            <div className="nk-notification-text">Your <span>Deposit Order</span> is placed</div>
                            <div className="nk-notification-time">2 hrs ago</div>
                          </div>
                        </div>
                        <div className="nk-notification-item dropdown-inner">
                          <div className="nk-notification-icon">
                            <em className="icon icon-circle bg-warning-dim ni ni-curve-down-right" />
                          </div>
                          <div className="nk-notification-content">
                            <div className="nk-notification-text">You have requested to <span>Widthdrawl</span></div>
                            <div className="nk-notification-time">2 hrs ago</div>
                          </div>
                        </div>
                        <div className="nk-notification-item dropdown-inner">
                          <div className="nk-notification-icon">
                            <em className="icon icon-circle bg-success-dim ni ni-curve-down-left" />
                          </div>
                          <div className="nk-notification-content">
                            <div className="nk-notification-text">Your <span>Deposit Order</span> is placed</div>
                            <div className="nk-notification-time">2 hrs ago</div>
                          </div>
                        </div>
                        <div className="nk-notification-item dropdown-inner">
                          <div className="nk-notification-icon">
                            <em className="icon icon-circle bg-warning-dim ni ni-curve-down-right" />
                          </div>
                          <div className="nk-notification-content">
                            <div className="nk-notification-text">You have requested to <span>Widthdrawl</span></div>
                            <div className="nk-notification-time">2 hrs ago</div>
                          </div>
                        </div>
                        <div className="nk-notification-item dropdown-inner">
                          <div className="nk-notification-icon">
                            <em className="icon icon-circle bg-success-dim ni ni-curve-down-left" />
                          </div>
                          <div className="nk-notification-content">
                            <div className="nk-notification-text">Your <span>Deposit Order</span> is placed</div>
                            <div className="nk-notification-time">2 hrs ago</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="dropdown-foot center">
                      <a href="#">View All</a>
                    </div>
                  </div>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </div>


    </>
  );
}

export default InnerHeader;
















