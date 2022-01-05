import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import config from '../config/config';
import InnerHeader from '../directive/innerHeader';
import InnerSidebar from '../directive/innerSidebar';
import InnerFooter from '../directive/innerfooter';
import toast, { Toaster } from 'react-hot-toast';
import Select from 'react-dropdown-select';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
const Withdraw = (props) => {

    const [loginData, setLoginData] = useState((!Cookies.get('AbcWalletFrontLogin')) ? [] : JSON.parse(Cookies.get('AbcWalletFrontLogin')))
    const [Countries, setCountries] = useState([]);
    const [TTDprice, setTTDprice] = useState('');
    const [currencyList, setcurrencyList] = useState([])
    const [setdata, setsetdata] = useState([])
    const [searchvalue, setSearchvalue] = useState({ buy_amount: '' })
    const [paymentMethod, setpaymentMethod] = useState('')
    const [visible, setvisible] = useState('')
    const [processingButton, setprocessingButton] = useState('')

    const [formData, setFormData] = useState({
        user_id: loginData.data.user_id,
        currency: "",
        amount: "",
        cardNumber: '',
        expMonth: '',
        expYear: '',
        cvc: ''
    });
    const [walletBalanceData, setwalletBalanceData] = useState([])

    const { user_id, currency, amount, cardNumber, expMonth, expYear, cvc } = formData;
    //=======================================================  getCurrency API =========================

    const getCurrencyList = async (id) => {
        try {
            await axios({
                method: 'get',
                url: `${config.apiUrl}getCurrency`,
                headers: { "Authorization": loginData.data.Token },
            }).then(response => {
                if (response.data.success === true) {

                    setTTDprice(response.data.ttd_price)
                    setcurrencyList(response.data.response);
                    let mainArr = [];
                    for (const x of response.data.response) {
                        var arr = {
                            label: <div><img src={`${config.imageUrl}${x.logo}`} height="30px" width="30px" />{x.name} {'(' + '' + x.symbol + '' + ')'}</div>,
                            value: x.id
                        }
                        mainArr.push(arr);
                        setvisible(1)

                    }
                    setCountries(mainArr);
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
    }


    //============================================  Fund transfer  ===================================================
    const withdrawFund = async (e) => {
        e.preventDefault()
        if (setdata[0].value === 1) {
            if (parseFloat(walletBalanceData[0].balance) < searchvalue.buy_amount) {
                toast.error('Insufficient amount for withdraw!')
                return false
            }
        }
        if (setdata[0].value === 2) {
            if (parseFloat(walletBalanceData[1].balance) < searchvalue.buy_amount) {
                toast.error('Insufficient amount for withdraw!')
                return false
            }
        }
        
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure you want to withdraw.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () =>
                    axios({
                        method: 'post',
                        url: `${config.apiUrl}withdrawCurrency`,
                        data: {
                            "user_id": loginData.data.user_id,
                            "currency_id": setdata[0].value,
                            "amount": searchvalue.buy_amount,
                            'usd_amount': setdata[0].value === 1 ? searchvalue.buy_amount : parseFloat(searchvalue.buy_amount / TTDprice)
                        }
                    }).then(response => {
                                setprocessingButton(1)
                                if (response.data.success === true) {
                                    setprocessingButton()
                
                                    toast.success(response.data.msg)
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

        // try {
        //     await axios({
        //         method: 'post',
        //         url: `${config.apiUrl}withdrawCurrency`,
        //         data: {
        //             "user_id": loginData.data.user_id,
        //             "currency_id": setdata[0].value,
        //             "amount": searchvalue.buy_amount,
        //             'usd_amount': setdata[0].value === 1 ? searchvalue.buy_amount : parseFloat(searchvalue.buy_amount / TTDprice)
        //         }
        //     }).then(response => {
        //         if (response.data.success === true) {
        //             setprocessingButton()

        //             toast.success(response.data.msg)
        //             setTimeout(() => {
        //                 window.location.reload()
        //             }, 200);
        //         }
        //     })
        // } catch (err) {
        //     toast.error(err.response.data.msg)
        // }


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
        getCurrencyList()
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
                                    <div className="buysell wide-xs m-auto">
                                        <div className="buysell-nav text-center">
                                            <ul className="nk-nav nav nav-tabs nav-tabs-s2">
                                                <li className="nav-item">
                                                    <a className="nav-link" href="javascript:void(0)">Withdraw Amount</a>
                                                </li>
                                            </ul>
                                        </div>{/* .buysell-nav */}
                                        <div className="buysell-title text-center">
                                            <h2 className="title">What do you want to Withdraw!</h2>
                                        </div>{/* .buysell-title */}
                                        <div className="buysell-block">
                                            <form onSubmit={(e) => withdrawFund(e)} className="buysell-form">
                                                <div className="buysell-field form-group">
                                                    <div className="form-label-group">
                                                        <label className="form-label">Choose what you want to get</label>
                                                    </div>
                                                    <Select options={Countries} onChange={e => onChangeDepositChange(e)} />
                                                </div>{/* .buysell-field */}
                                                <div className="buysell-field form-group">
                                                    <div className="form-label-group">
                                                        <label className="form-label" htmlFor="buysell-amount">Amount to Withdraw</label>
                                                    </div>
                                                    <div className="form-control-group">
                                                        <input type="text" className="form-control" value={searchvalue.buy_amount} name="buy_amount" id="site-name" onChange={handleChange} placeholder="Amount to Buy" />

                                                    </div>

                                                </div>{/* .buysell-field */}

                                                <div className="buysell-field form-action">
                                                    {processingButton === '' ?
                                                        <button type="submit" disabled={!searchvalue.buy_amount || !setdata.length > 0} className="btn btn-lg btn-block btn-primary">Continue to Withdraw</button> :
                                                        <button type="submit" disabled className="btn btn-lg btn-block btn-primary">Processing...</button>}
                                                    <br />

                                                </div>{/* .buysell-field */}
                                                {/* <div className="form-note text-base text-center">Note: our transfer fee included, <a href="javascript:void(0)">see our fees</a>.</div> */}
                                            </form>{/* .buysell-form */}
                                            <br />
                                            <br />

                                        </div>{/* .buysell-block */}
                                    </div>{/* .buysell */}
                                </div>
                            </div>
                        </div> {/* content @e */}
                        {/* footer @s */}
                        <InnerFooter />
                        {/* footer @e */}
                    </div>
                    {/* wrap @e */}
                </div>
                {/* main @e */}
            </div>


        </>
    );
}

export default Withdraw;