import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import config from '../config/config';
import InnerHeader from '../directive/innerHeader';
import InnerSidebar from '../directive/innerSidebar';
import InnerFooter from '../directive/innerfooter';
import Cookies from 'js-cookie';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
const Deposit = (props) => {

    const [loginData, setLoginData] = useState((!Cookies.get('AbcWalletFrontLogin')) ? [] : JSON.parse(Cookies.get('AbcWalletFrontLogin')))
    const [currencyList, setcurrencyList] = useState([])
    const [setdata, setsetdata] = useState([])
    const [visible, setvisible] = useState('')
    const [TTDprice, setTTDprice] = useState('');
    const [Countries, setCountries] = useState([]);
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
    //=======================================================  chage function =========================

    const onChangeDeposit = (e) => {

        setFormData({ ...formData, [e.target.name]: e.target.value }
        );
    }

    //=======================================================  for select currency =========================

    const onChangeDepositChange = (id) => {
        // console.log(id.label.props.children[3]);
        setsetdata(id)
    }

    //========================================  Onsubmit pe hold API ========================

    const onSubmit = async (e) => {
        e.preventDefault();

        // const newUser = {
        //     currency: setdata,
        //     amount,
        // };
        // console.log(formData, setdata.value, setdata.label.props.children[3]);

        // if (formData.email === '') {
        //     setEmailErrorLogin('Email is required')
        // }
        // if (formData.password === '') {
        //     setPasswordErrorLogin('Password is required')

        // }
        // else {
        //     if (formData.password && formData.email) {
        // try {
        //     // setPasswordErrorLogin('');
        //     // setEmailErrorLogin('');
        //     console.log(newUser);
        //     await axios({
        //         method: 'post',
        //         url: `${config.apiUrl}stripePayment`,
        //         data: newUser
        //     }).then(response => {
        //         if (response.data.success === true) {
        //             // toast.success(response.data.msg)

        //         }
        //     })
        // } catch (err) {
        //     // toast.error(err.response.data.msg)
        // }
        //     }

        // }

    }


    //========================================  Onsubmit API ========================

    const onSubmitAPI = async (e) => {

        e.preventDefault();
        setprocessingButton(1)
        const newUser = {
            user_id,
            currency: 'usd',
            amount,
            cardNumber,
            expMonth,
            expYear,
            cvc
        };


        // if (formData.email === '') {
        //     setEmailErrorLogin('Email is required')
        // }
        // if (formData.password === '') {
        //     setPasswordErrorLogin('Password is required')

        // }
        // else {
        //     if (formData.password && formData.email) {
        try {
            // setPasswordErrorLogin('');
            // setEmailErrorLogin('');

            await axios({
                method: 'post',
                url: `${config.apiUrl}stripePayment`,
                data: newUser
            }).then(response => {
                if (response.data.success === true) {
                    depositAPI()
                    // toast.success(response.data.msg)

                }
            })
        } catch (err) {
            // toast.error(err.response.data.msg)
        }
        //     }

        // }

    }


    //========================================  Onsubmit API ========================

    const depositAPI = async () => {

        const newUser = {
            user_id,
            currency_id: 1,
            amount,
        };
        setprocessingButton(1)

        try {

            await axios({
                method: 'post',
                url: `${config.apiUrl}depositFund`,
                data: newUser
            }).then(response => {
                if (response.data.success === true) {
                    toast.success(response.data.msg)
                    setprocessingButton('')

                    setTimeout(() => {
                        window.location.reload()
                    }, 200);

                }
            })
        } catch (err) {
            // toast.error(err.response.data.msg)
        }


    }


    useEffect(() => {
        // window.scrollTo({ top: 0, behavior: 'smooth' });
        getCurrencyList()
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
                                    <div className="buysell wide-xs m-auto">
                                        <div className="buysell-nav text-center">
                                            <ul className="nk-nav nav nav-tabs nav-tabs-s2">
                                                {/* <li className="nav-item">
                                                    <a className="nav-link" href="html/crypto/buy-sell.html">Buy Coin</a>
                                                </li> */}
                                            </ul>
                                        </div>{/* .buysell-nav */}
                                        <div className="buysell-title text-center">
                                            <h2 className="title">What do you want to deposit!</h2>
                                        </div>{/* .buysell-title */}
                                        <div className="buysell-block">
                                            <form onSubmit={(e) => onSubmit(e)} className="buysell-form">
                                                <div className="buysell-field form-group">
                                                    <div className="form-label-group">
                                                        <label className="form-label">Choose what you want to get</label>
                                                    </div>
                                                    <input type="hidden" defaultValue="btc" name="bs-currency" id="buysell-choose-currency" />
                                                    <select className="form-control" onChange={e => onChangeDepositChange(e)}>
                                                        <option value="1">United State Dollar(USD)</option>
                                                    </select>
                                                    {/* <Select options={Countries} onChange={e => onChangeDepositChange(e)} /> */}
                                                </div>{/* .buysell-field */}
                                                <div className="buysell-field form-group">
                                                    <div className="form-label-group">
                                                        <label className="form-label" htmlFor="buysell-amount">Amount to Deposit</label>
                                                    </div>
                                                    <div className="form-control-group">
                                                        <input type="text" name="amount" value={formData.amount} onChange={onChangeDeposit} className="form-control" id="buysell-amount" placeholder="Amount to Deposit" />

                                                    </div>
                                                    {/* <div className="form-note-group">
                                                        <span className="buysell-min form-note-alt">Minimum: 10.00 USD</span>
                                                        <span className="buysell-rate form-note-alt">1 USD = 0.000016 TTD</span>
                                                    </div> */}
                                                </div>{/* .buysell-field */}
                                                <div className="buysell-field form-group">
                                                    <div className="form-label-group">
                                                        <label className="form-label">Payment Method</label>
                                                    </div>
                                                    <div className="form-pm-group">
                                                        <ul className="buysell-pm-list">
                                                            {/* <li className="buysell-pm-item">
                                                                <input className="buysell-pm-control" type="radio" name="bs-method" id="pm-paypal" />
                                                                <label className="buysell-pm-label" htmlFor="pm-paypal">
                                                                    <span className="pm-name">Stripe</span>
                                                                    <span className="pm-icon"><em className="icon ni ni-stripe-alt" /></span>
                                                                </label>
                                                            </li> */}

                                                            <li className="buysell-pm-item">
                                                                <input className="buysell-pm-control" checked type="radio" name="bs-method" id="pm-card" />
                                                                <label className="buysell-pm-label" htmlFor="pm-card">
                                                                    <span className="pm-name">Credit/Debit Card</span>
                                                                    <span className="pm-icon"><em className="icon ni ni-cc-alt-fill" /></span>
                                                                </label>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>{/* .buysell-field */}
                                                <div className="buysell-field form-action">
                                                    <button disabled={!amount} type="submit" className="btn btn-lg btn-block btn-primary" data-toggle="modal" data-target="#buy-coin">Continue to Deposit</button>
                                                </div>{/* .buysell-field */}
                                                <div className="form-note text-base text-center">Note: our transfer fee included, <a href="javascript:void(0)">see our fees</a>.</div>
                                            </form>{/* .buysell-form */}
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
            {/* app-root @e */}
            {/* JavaScript */}



            <div>
                <div className="modal fade" tabIndex={-1} role="dialog" id="buy-coin">
                    <div className="modal-dialog modal-dialog-centered modal-md" role="document">
                        <div className="modal-content">
                            <a href="javascript:void(0)" className="close" data-dismiss="modal"><em className="icon ni ni-cross-sm" /></a>
                            <div className="modal-body modal-body-lg">
                                <div className="nk-block-head nk-block-head-xs text-center">
                                    <h5 className="nk-block-title">Confirm Deposit</h5>
                                    <div className="nk-block-text">
                                        {/* <div className="caption-text">You are about to get <strong>0.5968</strong> BTC for <strong>500.00</strong> USD*</div>
                                        <span className="sub-text-sm">Exchange rate: 1 BTC = 9,804.00 USD</span> */}
                                    </div>
                                </div>
                                <div className="nk-block">
                                    <div className="buysell-overview">
                                        <ul className="buysell-overview-list">
                                            <li className="buysell-overview-item">
                                                <span className="pm-title">Pay with</span>
                                                <span className="pm-currency"><em className="icon ni ni-stripe-alt" /> <span>Stripe</span></span>
                                            </li>
                                            <li className="buysell-overview-item">
                                                <span className="pm-title">Total</span>
                                                <span className="pm-currency">{formData.amount} {setdata.label?.props?.children[3]}</span>
                                            </li>
                                        </ul>
                                        {/* <div className="sub-text-sm">* Our transaction fee are included. <a href="javascript:void(0)">See transaction fee</a></div> */}
                                        <h5 className="nk-block-title">Please provide card details</h5>
                                    </div>
                                    <form onSubmit={(e) => onSubmitAPI(e)}>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <label>Card Number<span className="astrick"> *</span> </label>
                                                <input type="text" onKeyPress={(event) => {
                                                    if (!/^[0-9\b]+$/.test(event.key)) {
                                                        event.preventDefault();
                                                    }
                                                }} maxLength="16" name="cardNumber" value={formData.cardNumber} onChange={onChangeDeposit} className="form-control card_number" placeholder="Card Number" />
                                            </div>


                                        </div>

                                        <div className="row">

                                            <div className="col-md-4">
                                                <label>Expiry Month<span className="astrick"> *</span></label>
                                                <input type="date" onKeyPress={(event) => {
                                                    if (!/^[0-9\b]+$/.test(event.key)) {
                                                        event.preventDefault();
                                                    }
                                                }} maxLength="2" name="expMonth" value={formData.expMonth} onChange={onChangeDeposit} className="form-control card_number" placeholder="Expiry Month" />
                                            </div>
                                            <div className="col-md-4">
                                                <label>Expiry Year<span className="astrick"> *</span></label>
                                                <input type="date" onKeyPress={(event) => {
                                                    if (!/^[0-9\b]+$/.test(event.key)) {
                                                        event.preventDefault();
                                                    }
                                                }} maxLength="4" name="expYear" value={formData.expYear} onChange={onChangeDeposit} className="form-control card_number" placeholder="Expiry Year" />
                                            </div>
                                            <div className="col-md-4">
                                                <label>Cvv<span className="astrick"> *</span></label>
                                                <input type="text" onKeyPress={(event) => {
                                                    if (!/^[0-9\b]+$/.test(event.key)) {
                                                        event.preventDefault();
                                                    }
                                                }} maxLength="3" name="cvc" value={formData.cvc} onChange={onChangeDeposit} className="form-control card_number" placeholder="CVC" />
                                            </div>
                                        </div>
                                        <div className="buysell-field form-action text-center">
                                            <div>
                                                {processingButton === '' ?
                                                    <button type="submit" disabled={!cardNumber || !expMonth || !expYear || !cvc} className="btn btn-primary btn-lg" >Confirm</button> :
                                                    <button type="submit" disabled className="btn btn-primary btn-lg" >Processing...</button>
                                                }

                                            </div>
                                            <div className="pt-3">
                                                <a href="javascript:void(0)" data-dismiss="modal" className="link link-danger">Cancel</a>
                                            </div>
                                        </div>


                                    </form>



                                </div>{/* .nk-block */}
                            </div>{/* .modal-body */}
                        </div>{/* .modal-content */}
                    </div>{/* .modla-dialog */}
                </div>{/* .modal */}
                {/* @@ Confirm Coin Modal @e */}
                <div className="modal fade" tabIndex={-1} role="dialog" id="confirm-coin">
                    <div className="modal-dialog modal-dialog-centered modal-md" role="document">
                        <div className="modal-content">
                            <a href="javascript:void(0)" className="close" data-dismiss="modal"><em className="icon ni ni-cross-sm" /></a>
                            <div className="modal-body modal-body-lg text-center">
                                <div className="nk-modal">
                                    <em className="nk-modal-icon icon icon-circle icon-circle-xxl ni ni-check bg-success" />
                                    <h4 className="nk-modal-title">Successfully sent payment!</h4>
                                    <div className="nk-modal-text">
                                        <p className="caption-text">You’ve successfully bought <strong>0.5968</strong> BTC for <strong>200.00</strong> USD.</p>
                                        <p className="sub-text-sm">Learn when you reciveve bitcoin in your wallet. <a href="javascript:void(0)"> Click here</a></p>
                                    </div>
                                    <div className="nk-modal-action-lg">
                                        <ul className="btn-group gx-4">
                                            <li><a href="html/crypto/buy-sell.html" className="btn btn-lg btn-mw btn-primary">Return</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>{/* .modal-body */}
                            <div className="modal-footer bg-lighter">
                                <div className="text-center w-100">
                                    <p>Earn upto $25 for each friend your refer! <a href="javascript:void(0)">Invite friends</a></p>
                                </div>
                            </div>
                        </div>{/* .modal-content */}
                    </div>{/* .modla-dialog */}
                </div>{/* .modal */}
            </div>



        </>
    );
}

export default Deposit;