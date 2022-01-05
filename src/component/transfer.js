import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import config from '../config/config';
import InnerHeader from '../directive/innerHeader';
import InnerSidebar from '../directive/innerSidebar';
import InnerFooter from '../directive/innerfooter';
import toast, { Toaster } from 'react-hot-toast';
import ReactDatatable from '@ashvin27/react-datatable'
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Select from 'react-dropdown-select';
import { confirmAlert } from 'react-confirm-alert'; // Import

const Transfer = (props) => {

    const [loginData, setLoginData] = useState((!Cookies.get('AbcWalletFrontLogin')) ? [] : JSON.parse(Cookies.get('AbcWalletFrontLogin')))
    const [profileList, setprofileList] = useState('')
    const [currencyList, setcurrencyList] = useState([])
    const [Countries, setCountries] = useState([]);
    const [setdata, setsetdata] = useState([])
    const [searchvalue, setSearchvalue] = useState({ search: '', amount: '' })
    const [userList, setuserList] = useState([])
    const [userSelect, setuserSelect] = useState('')
    const [visible, setvisible] = useState('')
    const [user_list, setuser_list] = useState([])
    const [processingButton, setprocessingButton] = useState('')
    const [walletBalanceData, setwalletBalanceData] = useState([])

    const config1 = {
        page_size: 10,
        length_menu: [10, 20, 50],
        show_filter: true,
        show_pagination: true,
        pagination: 'advance',
        button: {
            excel: false,
            print: false
        }
    }

    const columns = [

        {
            text: "Details",
            cell: (item, i) => {
                return (
                    <>
                        <div className="nk-tb-col">
                            <div className="nk-tnx-type">

                                <div className=
                                    {item.transaction_status === 'Completed' ?
                                        "nk-tnx-type-icon bg-success-dim text-success" : item.transaction_status === 'Pending' ? 'nk-tnx-type-icon bg-warning-dim text-warning' : ''
                                    }
                                ><em className="icon ni ni-arrow-up-right" /></div>

                            </div>
                        </div>

                    </>
                );
            }
        },
        {
            text: "Source",
            cell: (item) => {
                return (
                    <div className="nk-tnx-type-text"><span className="tb-lead">{item.transaction_type}</span><span className="tb-date">{item.datetime}</span></div>
                );
            }

        },
        {
            text: "Order",
            cell: (item) => {
                return (
                    <div className="nk-tb-col tb-col-lg"><span className="tb-lead-sub">{item.order_no}</span><span

                        className=
                        {item.transaction_status === 'Completed' ?
                            "badge badge-dot badge-success" : item.transaction_status === 'Pending' ? 'badge badge-dot badge-warning' : ''
                        }
                    >{item.transaction_type2}</span></div>
                );
            }
        },



        {
            // key: "telent_status_name",
            text: "Amount",
            cell: (item) => {
                return (
                    <>
                        <div className="nk-tb-col text-right">
                            {/* <span className="tb-amount">{item.amount} <span>TTD</span></span> */}
                            <span className="tb-amount">{item.usd_amount} USD</span></div>
                    </>
                );
            }

        },

        {
            // key: "telent_status_name",
            text: "Balance",
            cell: (item) => {
                return (
                    <>
                        <div className="nk-tb-col text-right tb-col">
                            {/* <span className="tb-amount">{item.balance} <span>TTD</span></span> */}
                            <span className="tb-amount">{item.balance} USD</span></div>
                    </>
                );
            }

        },
        {
            // key: "telent_status_name",
            text: "Status",
            cell: (item) => {
                return (
                    <>
                        <div className="nk-tb-col nk-tb-col-status">
                            <div className="dot dot-success d-md-none" />

                            <span className=
                                {item.transaction_status === 'Completed' ?
                                    "badge badge-sm badge-dim badge-outline-success d-none d-md-inline-flex" : item.transaction_status === 'Pending' ? 'badge badge-sm badge-dim badge-outline-warning d-none d-md-inline-flex' : ''
                                }
                            >{item.transaction_status}</span>
                        </div>

                    </>
                );
            }

        },





    ];
    //=======================================================  transaction API =========================

    const transactionlistAPI = async (id) => {
        try {
            await axios({
                method: 'post',
                url: `${config.apiUrl}withdrawTransactionList`,
                headers: { "Authorization": loginData.data.Token },
                data: { user_id: loginData.data.user_id }
            }).then(response => {
                if (response.data.success === true) {
                    setuser_list(response.data.response);
                    setvisible(1)

                }
            })
        } catch (err) {
            // toast.error(err.response?.data.msg)
        }
    }

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

    //=======================================================  getCurrency API =========================

    const getCurrencyList = async (id) => {
        try {
            await axios({
                method: 'get',
                url: `${config.apiUrl}getCurrency`,
                headers: { "Authorization": loginData.data.Token },
            }).then(response => {
                if (response.data.success === true) {
                    setcurrencyList(response.data.response);
                    let mainArr = [];
                    for (const x of response.data.response) {
                        var arr = {
                            label: <div><img src={`${config.imageUrl}${x.logo}`} height="30px" width="30px" />{x.name} {'(' + '' + x.symbol + '' + ')'}</div>,
                            value: x.id
                        }
                        mainArr.push(arr);
                    }
                    setCountries(mainArr);
                    setvisible(1)

                }
            })
        } catch (err) {
            toast.error(err.response?.data.msg)
        }
    }

    //=======================================================  for select currency =========================

    const onChangeDepositChange = (id) => {
        
        setsetdata(id)
    }

    //=======================================================  chage function =========================

    const handleChange = (e) => {
        setSearchvalue({ ...searchvalue, [e.target.name]: e.target.value });
        // setTimeout(() => {

        getUserSearch(e.target.value)
        // }, );
    }

    //=======================================================  getCurrency API =========================

    const getUserSearch = async (id) => {


        try {
            await axios({
                method: 'post',
                url: `${config.apiUrl}userSearch`,
                headers: { "Authorization": loginData.data.Token },
                data: { 'search': id }
            }).then(response => {
                if (response.data.success === true) {
                    setuserList(response.data.response);

                }
            })
        } catch (err) {
            setuserList([])
            // toast.error(err.response?.data.msg)
        }
    }

    //====================================================  Seacrch and merged to input ==========================

    const searchData = (item) => {

        setuserSelect(item)
        setSearchvalue({ search: item.first_name + ' ' + item.last_name })
        setuserList([])
    }

    //============================================  Fund transfer  ===================================================
    const transferFund = async (e) => {
        e.preventDefault()
        if (setdata[0].value === 1) {
            if (parseFloat(walletBalanceData[0].balance) < searchvalue.amount) {
                toast.error('USD account balance is lower than entered amount')
                return false
            }
        }
        if (setdata[0].value === 2) {
            if (parseFloat(walletBalanceData[1].balance) < searchvalue.amount) {
                toast.error('TTD account balance is lower than entered amount')
                return false
            }
        }

        // setprocessingButton(1)

        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure you want to withdraw.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => axios({
                method: 'post',
                url: `${config.apiUrl}transferFund`,
                data: {
                    "user_id": loginData.data.user_id,
                    "to_user_id": userSelect.user_id,
                    "currency_id": setdata[0].value,
                    "amount": searchvalue.amount
                }
            }).then(response => {
        setprocessingButton()

                // setprocessingButton(2)
                if (response.data.success === true) {
                    toast.success(response.data.msg)
                    setprocessingButton()

                    setTimeout(() => {
                        window.location.reload()
                    }, 200);
                }
            })
        },
        {
            label: 'No',
            
        }
    ]
});
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

    useEffect(() => {
        // window.scrollTo({ top: 0, behavior: 'smooth' });
        getProfile()
        getCurrencyList()
        transactionlistAPI()
        getWalletAPI()

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
                                    <div className="nk-block nk-block-lg">
                                        <div className="nk-block-head">
                                            <div className="nk-block-head-content">
                                                <h4 className="title nk-block-title">{profileList.first_name ? profileList.first_name : 'Avatar'}</h4>
                                                <div className="nk-block-des">
                                                    <p>Transfer money between your Barteka Services.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card card-bordered">
                                            <div className="card-inner">
                                                <div className="card-head">
                                                    <h5 className="card-title">Transfer Money</h5>
                                                </div>
                                                <form onSubmit={(e) => transferFund(e)} className="gy-3">
                                                    <div className="row g-3 align-center">
                                                        <div className="col-lg-5">
                                                            <div className="form-group"><label className="form-label">Select currency</label>
                                                                {/* <span className="form-note">Current Balance $0.00</span> */}
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-7">
                                                            <div className="form-group">
                                                                <div className="form-control-wrap ">
                                                                    <Select options={Countries} onChange={e => onChangeDepositChange(e)} />

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row g-3 align-center">
                                                        <div className="col-lg-5">
                                                            <div className="form-group"><label className="form-label">Transfer To</label>
                                                                {/* <span className="form-note">New Balance $0.00</span> */}
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-7">
                                                            <div className="form-group">
                                                                <div className="form-control-wrap ">
                                                                    <input autoComplete="off" type="text" className="form-control"
                                                                        onChange={handleChange}
                                                                        value={searchvalue.search} placeholder="User Name" name="search"
                                                                    />
                                                                    <div className="search_panel" style={{ display: userList.length === 0 ? 'none' : 'block' }}>
                                                                        {userList.map(item => (
                                                                            <ul className="search_value" onClick={e => searchData(item)}>
                                                                                <li>
                                                                                    <a className="search_li" style={{ cursor: 'pointer' }}></a>{item.first_name} {item.last_name} cdvv{item.email}</li>
                                                                            </ul>
                                                                        ))}
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row g-3 align-center">
                                                        <div className="col-lg-5">
                                                            <div className="form-group"><label className="form-label" htmlFor="site-name">Transfer Money</label><span className="form-note">Transfer money between your Barteka Services.</span></div>
                                                        </div>
                                                        <div className="col-lg-7">
                                                            <div className="form-group">
                                                                <div className="form-control-wrap"><input type="text" className="form-control" value={searchvalue.amount} name="amount" id="site-name" onChange={handleChange} placeholder="Transfer Money" /></div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row g-3">
                                                        <div className="col-lg-7 offset-lg-5">
                                                            <div className="form-group mt-2">
                                                                {processingButton === '' ?
                                                                    <button type="submit" disabled={!searchvalue.search || !searchvalue.amount || !setdata.length >0} className="btn btn-lg btn-primary">Transfer</button> :
                                                                    <button type="submit" disabled className="btn btn-lg btn-primary">Processing...</button>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="nk-block nk-block-lg">
                                        <div className="row gy-gs">
                                            <div className="col-md-12">
                                                <div className="nk-content-body" data-select2-id={20}>
                                                    <div className="nk-block-head nk-block-head-sm">
                                                        <div className="nk-block-between g-3">
                                                            <div className="nk-block-head-content">
                                                                <h3 className="nk-block-title page-title">Transfer History</h3>

                                                            </div>
                                                            <div className="nk-block-head-content">
                                                                <div className="toggle-wrap nk-block-tools-toggle">
                                                                    <a href="#" className="btn btn-icon btn-trigger toggle-expand mr-n1" data-target="pageMenu"><em className="icon ni ni-menu-alt-r" /></a>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="nk-block">
                                                        <div className="card card-bordered card-stretch">
                                                            <div className="card-inner-group">

                                                                <div className="card-inner p-0">
                                                                    <div className="nk-tb-list nk-tb-tnx">

                                                                        <div className="transactionlist">
                                                                            <ReactDatatable
                                                                                config={config1}
                                                                                records={user_list}
                                                                                columns={columns}
                                                                            />
                                                                            <div className="nk-tb-col nk-tb-col-tools">
                                                                                <ul className="nk-tb-actions gx-2">
                                                                                    <li className="nk-tb-action-hidden"><a href="#" className="bg-white btn btn-sm btn-outline-light btn-icon" data-toggle="tooltip" data-placement="top" title data-original-title="Approve"><em className="icon ni ni-done" /></a></li>
                                                                                    <li className="nk-tb-action-hidden"><a href="#tranxDetails" data-toggle="modal" className="bg-white btn btn-sm btn-outline-light btn-icon btn-tooltip" title data-original-title="Details"><em className="icon ni ni-eye" /></a></li>
                                                                                    <li>
                                                                                        <div className="dropdown">
                                                                                            <a href="#" className="dropdown-toggle bg-white btn btn-sm btn-outline-light btn-icon" data-toggle="dropdown"><em className="icon ni ni-more-h" /></a>
                                                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                                                <ul className="link-list-opt">
                                                                                                    <li><a href="#"><em className="icon ni ni-done" /><span>Approve</span></a></li>
                                                                                                    <li><a href="#"><em className="icon ni ni-cross-round" /><span>Reject</span></a></li>
                                                                                                    <li><a href="#"><em className="icon ni ni-repeat" /><span>Check</span></a></li>
                                                                                                    <li><a href="#tranxDetails" data-toggle="modal"><em className="icon ni ni-eye" /><span>View Details</span></a></li>
                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>

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

export default Transfer;
















