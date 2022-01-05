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

const Dashboard = (props) => {
  const [loginData, setLoginData] = useState((!Cookies.get('AbcWalletFrontLogin')) ? [] : JSON.parse(Cookies.get('AbcWalletFrontLogin')))
  const [visible, setvisible] = useState('')
  const [transactionList, settransactionList] = useState([])
  const [walletBalanceData, setwalletBalanceData] = useState([])
  const [profileList, setprofileList] = useState('')

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "USD",
        data: [33, 53, 85, 41, 44, 65],
        fill: false,
        borderColor: "rgba(75,192,192,1)"
      },
      {
        label: "TTD",
        data: [33, 25, 35, 51, 54, 76],
        fill: false,
        borderColor: "#742774"
      }
    ]
  };

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
          setvisible(1)

        }
      })
    } catch (err) {

    }
  }

  //=======================================================  transaction API =========================

  const transactionlistAPI = async (id) => {
    try {
      await axios({
        method: 'post',
        url: `${config.apiUrl}transactionlist`,
        headers: { "Authorization": loginData.data.Token },
        data: { user_id: loginData.data.user_id }
      }).then(response => {
        if (response.data.success === true) {
          settransactionList(response.data.response);
          setvisible(1)
        }
      })
    } catch (err) {
      // toast.error(err.response?.data.msg)
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
          setvisible(1)

        }
      })
    } catch (err) {
      toast.error(err.response?.data.msg)
    }
  }


  const loading = () => {
    setTimeout(() => {
        window.location.reload()
    }, 100);
}


  useEffect(() => {
    // window.scrollTo({ top: 0, behavior: 'smooth' });
    transactionlistAPI()
    getWalletAPI()
    getProfile()
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
                  <div className="nk-block-head">
                    <div className="nk-block-head-sub"><span>Welcome!</span>
                    </div>


                    <div className="nk-block-between-md g-4">
                      <div className="nk-block-head-content">
                        <h2 className="nk-block-title fw-normal">{profileList.first_name ? profileList.first_name : 'Avatar'}</h2>
                        <div className="nk-block-des">
                          <p>At a glance summary of your account. Have fun!</p>
                        </div>
                      </div>{/* .nk-block-head-content */}
                      <div className="nk-block-head-content">
                        <ul className="nk-block-tools gx-3">
                          <li><Link to={`${config.baseUrl}Deposit`} onClick={loading} className="btn btn-primary" style={{ lineHeight: 'initial' }}><span>Deposit</span> <em style={{ fontSize: 'inherit' }} className="icon ni ni-arrow-long-right" /></Link></li>
                          <li><Link to={`${config.baseUrl}Withdraw`} onClick={loading} style={{ lineHeight: 'initial' }} className="btn btn-white btn-light"><span>Withdraw</span> <em style={{ fontSize: 'inherit' }} className="icon ni ni-arrow-long-right d-none d-sm-inline-block" /></Link></li>
                          {/* <li className="opt-menu-md dropdown">
                            <a href="#" className="btn btn-white btn-light btn-icon" data-toggle="dropdown"><em className="icon ni ni-setting" /></a>
                            <div className="dropdown-menu dropdown-menu-right">
                              <ul className="link-list-opt no-bdr">
                                <li><a href="#"><em className="icon ni ni-coin-alt" /><span>Curreny Settings</span></a></li>
                                <li><a href="#"><em className="icon ni ni-notify" /><span>Push Notification</span></a></li>
                              </ul>
                            </div>
                          </li> */}
                        </ul>
                      </div>{/* .nk-block-head-content */}
                    </div>{/* .nk-block-between */}
                  </div>{/* .nk-block-head */}
                  <div className="nk-block">
                    <div className="row gy-gs">
                      <div className="col-lg-6 col-xl-6">
                        <div className="nk-block">
                          <div className="nk-block-head-xs">
                            <div className="nk-block-head-content">
                              <h5 className="nk-block-title title">TTD Balance</h5>
                            </div>
                          </div>{/* .nk-block-head */}
                          <div className="nk-block">
                            <div className="card card-bordered text-light is-dark h-100">
                              <div className="card-inner">
                                <div className="nk-wg7">
                                  {/* <div className="nk-wg7-stats">
                                    <div className="nk-wg7-title">Available balance in TTD</div>
                                    <div className="number-lg amount">79,80.950</div>
                                  </div> */}
                                  <div className="nk-wg7-stats-group">
                                    <div className="nk-wg7-stats w-50">
                                      <div className="nk-wg7-title">Available balance in TTD</div>
                                      <div className="number-lg">{walletBalanceData[1]?.balance}</div>
                                    </div>
                                    <div className="nk-wg7-stats w-50">
                                      <div className="nk-wg7-title">Transactions</div>
                                      <div className="number-lg">{walletBalanceData[1]?.trx_count}</div>
                                    </div>
                                  </div>

                                </div>{/* .nk-wg7 */}
                              </div>{/* .card-inner */}
                            </div>{/* .card */}
                          </div>{/* .nk-block */}
                        </div>{/* .nk-block */}
                      </div>{/* .col */}
                      <div className="col-lg-6 col-xl-6">
                        <div className="nk-block">
                          <div className="nk-block-head-xs">
                            <div className="nk-block-head-content">
                              <h5 className="nk-block-title title">USD Balance</h5>
                            </div>
                          </div>{/* .nk-block-head */}
                          <div className="nk-block">
                            <div className="card card-bordered text-light is-dark h-100">
                              <div className="card-inner">
                                <div className="nk-wg7">
                                  {/* <div className="nk-wg7-stats">
                                    <div className="nk-wg7-title">Available balance in USD</div>
                                    <div className="number-lg amount">179,850.950</div>
                                  </div> */}
                                  <div className="nk-wg7-stats-group">
                                    <div className="nk-wg7-stats w-50">
                                      <div className="nk-wg7-title">Available balance in USD</div>
                                      <div className="number-lg">{walletBalanceData[0]?.balance}</div>
                                    </div>
                                    <div className="nk-wg7-stats w-50">
                                      <div className="nk-wg7-title">Transactions</div>
                                      <div className="number-lg">{walletBalanceData[0]?.trx_count}</div>
                                    </div>
                                  </div>
                                  {/* <div className="nk-wg7-foot">
                                    <span className="nk-wg7-note">Last activity at <span>19 Nov, 2021</span></span>
                                  </div> */}
                                </div>{/* .nk-wg7 */}
                              </div>{/* .card-inner */}
                            </div>{/* .card */}
                          </div>{/* .nk-block */}
                        </div>{/* .nk-block */}
                      </div>{/* .col */}


                      <div className="col-lg-12 col-xl-12">
                        <div className="card card-bordered h-100">
                          <div className="card-inner">
                            <div className="card-title-group align-start mb-3">
                              <div className="card-title">
                                <h6 className="title"> Transaction History</h6>
                                {/* <p>In last 15 days buy and sells overview. <a href="#" className="link link-sm">Detailed Stats</a></p> */}
                              </div>

                            </div>
                            <Line width={440} height={200} data={data} style={{ display: 'block', width: '440px', height: '258px' }} />
                            {/* .card-title-group */}

                            {/* .nk-order-ovwg */}
                          </div>
                          {/* .card-inner */}
                        </div>
                      </div>{/* .col */}
                    </div>
                  </div>
                  <div className="nk-block nk-block-lg">
                    <div className="row gy-gs">
                      <div className="col-md-12">
                        <div className="nk-content-body" data-select2-id={20}>
                          <div className="nk-block-head nk-block-head-sm">
                            <div className="nk-block-between g-3">
                              <div className="nk-block-head-content">
                                <h3 className="nk-block-title page-title"> Transaction History</h3>

                              </div>
                              <div className="nk-block-head-content">
                                <div className="toggle-wrap nk-block-tools-toggle">
                                  <a href="#" className="btn btn-icon btn-trigger toggle-expand mr-n1" data-target="pageMenu"><em className="icon ni ni-menu-alt-r" /></a>

                                </div>
                              </div>
                            </div>
                          </div>

                          {transactionList.length === 0 ? <h4 className="text-center">No Transaction Found</h4> :
                            <div className="nk-block">
                              <div className="card card-bordered card-stretch">
                                <div className="card-inner-group">
                                  <div className="card-inner" data-select2-id={19}>
                                    <div className="card-title-group" data-select2-id={18}>
                                      <div className="card-title">
                                        <h5 className="title">All Transaction</h5>
                                      </div>
                                      <div className="card-tools mr-n1" data-select2-id={17}>
                                        <ul className="btn-toolbar gx-1" data-select2-id={16}>

                                          <li className="btn-toolbar-sep" />

                                          <li>

                                          </li>
                                        </ul>
                                      </div>
                                      <div className="card-search search-wrap" data-search="search">
                                        <div className="search-content"><a href="#" className="search-back btn btn-icon toggle-search" data-target="search"><em className="icon ni ni-arrow-left" /></a><input type="text" className="form-control border-transparent form-focus-none" placeholder="Quick search by transaction" /><button className="search-submit btn btn-icon"><em className="icon ni ni-search" /></button></div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="card-inner p-0">
                                    <div className="nk-tb-list nk-tb-tnx">
                                      <div className="nk-tb-item nk-tb-head">
                                        <div className="nk-tb-col"><span>Details</span></div>
                                        <div className="nk-tb-col tb-col-xxl"><span>Source</span></div>
                                        <div className="nk-tb-col tb-col-lg"><span>Order</span></div>
                                        <div className="nk-tb-col text-right"><span>Amount</span></div>
                                        <div className="nk-tb-col text-right tb-col-sm"><span>Balance</span></div>
                                        <div className="nk-tb-col nk-tb-col-status"><span className="sub-text d-none d-md-block">Status</span></div>
                                        <div className="nk-tb-col nk-tb-col-tools" />
                                      </div>

                                      {transactionList.map((item, i) => (
                                        (i < 10) ?
                                          <div className="nk-tb-item">

                                            <div className="nk-tb-col">
                                              <div className="nk-tnx-type">

                                                <div className=
                                                  {item.transaction_status === 'Completed' ?
                                                    "nk-tnx-type-icon bg-success-dim text-success" : item.transaction_status === 'Pending' ? 'nk-tnx-type-icon bg-warning-dim text-warning' : ''
                                                  }
                                                ><em className="icon ni ni-arrow-up-right" /></div>
                                                <div className="nk-tnx-type-text"><span className="tb-lead">{item.transaction_type}</span><span className="tb-date">{item.datetime}</span></div>
                                              </div>
                                            </div>
                                            <div className="nk-tb-col tb-col-xxl"><span className="tb-lead-sub">Using PayPal Account</span><span className="tb-sub">mypay*****com</span></div>
                                            <div className="nk-tb-col tb-col-lg"><span className="tb-lead-sub">{item.order_no}</span><span

                                              className=
                                              {item.transaction_status === 'Completed' ?
                                                "badge badge-dot badge-success" : item.transaction_status === 'Pending' ? 'badge badge-dot badge-warning' : ''
                                              }
                                            >{item.transaction_type2}</span></div>
                                            <div className="nk-tb-col text-right">
                                              {/* <span className="tb-amount">{item.amount} <span>TTD</span></span> */}
                                              <span className="tb-amount">{item.usd_amount} USD</span></div>
                                            <div className="nk-tb-col text-right tb-col">
                                              {/* <span className="tb-amount">{item.balance} <span>TTD</span></span> */}
                                              <span className="tb-amount">{item.balance} USD</span></div>
                                            <div className="nk-tb-col nk-tb-col-status">
                                              <div className="dot dot-success d-md-none" />

                                              <span className=
                                                {item.transaction_status === 'Completed' ?
                                                  "badge badge-sm badge-dim badge-outline-success d-none d-md-inline-flex" : item.transaction_status === 'Pending' ? 'badge badge-sm badge-dim badge-outline-warning d-none d-md-inline-flex' : ''
                                                }
                                              >{item.transaction_status}</span>
                                            </div>

                                          </div> : ''
                                      ))}
                                    </div>
                                  </div>

                                </div>
                              </div>
                            </div>}
                        </div>
                      </div>{/* .col */}
                    </div>{/* .row */}
                  </div>{/* .nk-block */}
                  <div className="nk-block">
                    <div className="card card-bordered">
                      <div className="card-inner card-inner-lg">
                        <div className="align-center flex-wrap flex-md-nowrap g-4">
                          <div className="nk-block-image w-120px flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 118">
                              <path d="M8.916,94.745C-.318,79.153-2.164,58.569,2.382,40.578,7.155,21.69,19.045,9.451,35.162,4.32,46.609.676,58.716.331,70.456,1.845,84.683,3.68,99.57,8.694,108.892,21.408c10.03,13.679,12.071,34.71,10.747,52.054-1.173,15.359-7.441,27.489-19.231,34.494-10.689,6.351-22.92,8.733-34.715,10.331-16.181,2.192-34.195-.336-47.6-12.281A47.243,47.243,0,0,1,8.916,94.745Z" transform="translate(0 -1)" fill="#f6faff" />
                              <rect x={18} y={32} width={84} height={50} rx={4} ry={4} fill="#fff" />
                              <rect x={26} y={44} width={20} height={12} rx={1} ry={1} fill="#e5effe" />
                              <rect x={50} y={44} width={20} height={12} rx={1} ry={1} fill="#e5effe" />
                              <rect x={74} y={44} width={20} height={12} rx={1} ry={1} fill="#e5effe" />
                              <rect x={38} y={60} width={20} height={12} rx={1} ry={1} fill="#e5effe" />
                              <rect x={62} y={60} width={20} height={12} rx={1} ry={1} fill="#e5effe" />
                              <path d="M98,32H22a5.006,5.006,0,0,0-5,5V79a5.006,5.006,0,0,0,5,5H52v8H45a2,2,0,0,0-2,2v4a2,2,0,0,0,2,2H73a2,2,0,0,0,2-2V94a2,2,0,0,0-2-2H66V84H98a5.006,5.006,0,0,0,5-5V37A5.006,5.006,0,0,0,98,32ZM73,94v4H45V94Zm-9-2H54V84H64Zm37-13a3,3,0,0,1-3,3H22a3,3,0,0,1-3-3V37a3,3,0,0,1,3-3H98a3,3,0,0,1,3,3Z" transform="translate(0 -1)" fill="#798bff" />
                              <path d="M61.444,41H40.111L33,48.143V19.7A3.632,3.632,0,0,1,36.556,16H61.444A3.632,3.632,0,0,1,65,19.7V37.3A3.632,3.632,0,0,1,61.444,41Z" transform="translate(0 -1)" fill="#6576ff" />
                              <path d="M61.444,41H40.111L33,48.143V19.7A3.632,3.632,0,0,1,36.556,16H61.444A3.632,3.632,0,0,1,65,19.7V37.3A3.632,3.632,0,0,1,61.444,41Z" transform="translate(0 -1)" fill="none" stroke="#6576ff" strokeMiterlimit={10} strokeWidth={2} />
                              <line x1={40} y1={22} x2={57} y2={22} fill="none" stroke="#fffffe" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                              <line x1={40} y1={27} x2={57} y2={27} fill="none" stroke="#fffffe" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                              <line x1={40} y1={32} x2={50} y2={32} fill="none" stroke="#fffffe" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                              <line x1="30.5" y1="87.5" x2="30.5" y2="91.5" fill="none" stroke="#9cabff" strokeLinecap="round" strokeLinejoin="round" />
                              <line x1="28.5" y1="89.5" x2="32.5" y2="89.5" fill="none" stroke="#9cabff" strokeLinecap="round" strokeLinejoin="round" />
                              <line x1="79.5" y1="22.5" x2="79.5" y2="26.5" fill="none" stroke="#9cabff" strokeLinecap="round" strokeLinejoin="round" />
                              <line x1="77.5" y1="24.5" x2="81.5" y2="24.5" fill="none" stroke="#9cabff" strokeLinecap="round" strokeLinejoin="round" />
                              <circle cx="90.5" cy="97.5" r={3} fill="none" stroke="#9cabff" strokeMiterlimit={10} />
                              <circle cx={24} cy={23} r="2.5" fill="none" stroke="#9cabff" strokeMiterlimit={10} /></svg>
                          </div>
                          <div className="nk-block-content">
                            <div className="nk-block-content-head px-lg-4">
                              <h5>We’re here to help you!</h5>
                              <p className="text-soft">Ask a question or file a support ticket, manage request, report an issues. Our team support team will get back to you by email.</p>
                            </div>
                          </div>
                          <div className="nk-block-content flex-shrink-0">
                            <a href="#" className="btn btn-lg btn-outline-primary">Get Support Now</a>
                          </div>
                        </div>
                      </div>{/* .card-inner */}
                    </div>{/* .card */}
                  </div>{/* .nk-block */}
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

export default Dashboard;
















