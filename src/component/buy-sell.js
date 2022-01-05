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

const Buysell = (props) => {

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
    console.log(e);
    setFormData({ ...formData, [e.target.name]: e.target.value }
    );
  }
  //=======================================================  for select currency =========================

  const onChangeDepositChange = (id) => {

    setsetdata(id)
  }

  //======================================================  payment method select  ==========================

  const paymentMethodClick = async (id) => {

    setpaymentMethod(id)
  }

  //=======================================================  chage function =========================

  const handleChange = (e) => {
    setSearchvalue({ ...searchvalue, [e.target.name]: e.target.value });
  }


  //========================================  Onsubmit API ========================
  const onSubmitAPI = async (e) => {

    e.preventDefault();

    const newUser = {
      user_id,
      currency: 'usd',
      amount:
        setdata[0]?.value === 1 ? searchvalue.buy_amount :
          parseFloat(1 / (TTDprice) * (searchvalue.buy_amount ? searchvalue.buy_amount : 1)).toFixed(2),
      cardNumber,
      expMonth,
      expYear,
      cvc
    };
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to complete this Payment..',
      buttons: [
        {
          label: 'Yes',
          onClick: () =>
            axios({
              method: 'post',
              url: `${config.apiUrl}stripePayment`,
              data: newUser
            }).then(response => {
              if (response.data.success === true) {
                transferFund()

              }
            })
        },
          {
          label: 'No',

        }
      ]
    });
  }

  //============================================  Fund transfer  ===================================================
  const transferFund = async (e) => {

    if (e) {
      e.preventDefault()
    }
    if (paymentMethod != 1 && formData.cardNumber === '') {
      return false
    }
    setprocessingButton(1)

    try {
      await axios({
        method: 'post',
        url: `${config.apiUrl}buyCurrency`,
        data: {
          "user_id": loginData.data.user_id,
          "buy_currency_id": setdata[0].value,
          "buy_amount": searchvalue.buy_amount,
          "payment_method_id": paymentMethod,
          "wallet_currency_id": paymentMethod === 1 ? setdata[0].value === 1 ? 2 : 1 : 0,
          "wallet_amount": setdata[0]?.value === 1 ? TTDprice * searchvalue.buy_amount :
            parseFloat(1 / (TTDprice) * (searchvalue.buy_amount ? searchvalue.buy_amount : 1)).toFixed(2)
          ,
        }
      }).then(response => {
        if (response.data.success === true) {
          toast.success(response.data.msg)
          setprocessingButton()

          setTimeout(() => {
            window.location.reload()
          }, 200);
        }
      })
    } catch (err) {
      toast.error(err.response.data.msg)
    }


  }

  useEffect(() => {
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
                          <a className="nav-link" href="html/crypto/buy-sell.html">Buy Coin</a>
                        </li>
                      </ul>
                    </div>{/* .buysell-nav */}
                    <div className="buysell-title text-center">
                      <h2 className="title">What do you want to buy!</h2>
                    </div>{/* .buysell-title */}
                    <div className="buysell-block">
                      <form onSubmit={(e) => transferFund(e)} className="buysell-form">
                        <div className="buysell-field form-group">
                          <div className="form-label-group">
                            <label className="form-label">Choose what you want to get</label>
                          </div>
                          <Select options={Countries} onChange={e => onChangeDepositChange(e)} />
                        </div>{/* .buysell-field */}
                        <div className="buysell-field form-group">
                          <div className="form-label-group">
                            <label className="form-label" htmlFor="buysell-amount">Amount to Buy</label>
                          </div>
                          <div className="form-control-group">
                            <input type="text" className="form-control" value={searchvalue.buy_amount} name="buy_amount" id="site-name" onChange={handleChange} placeholder="Amount to Buy" />

                          </div>
                          <div className="form-note-group">
                            <span className="buysell-min form-note-alt"></span>
                            {setdata[0]?.value === 1 ?
                              <span className="buysell-rate form-note-alt">{searchvalue.buy_amount ? searchvalue.buy_amount : 1} USD = {TTDprice * (searchvalue.buy_amount ? searchvalue.buy_amount : 1)} TTD</span> :
                              <span className="buysell-rate form-note-alt">{searchvalue.buy_amount ? searchvalue.buy_amount : 1} TTD = {parseFloat(1 / (TTDprice) * (searchvalue.buy_amount ? searchvalue.buy_amount : 1)).toFixed(2)} USD</span>
                            }

                          </div>
                        </div>{/* .buysell-field */}
                        <div className="buysell-field form-group">
                          <div className="form-label-group">
                            <label className="form-label">Payment Method</label>
                          </div>
                          <div className="form-pm-group">
                            <ul className="buysell-pm-list">
                              <li className="buysell-pm-item">
                                <input className="buysell-pm-control" onClick={e => paymentMethodClick(1)} type="radio" name="bs-method" id="pm-paypal" />
                                <label className="buysell-pm-label" htmlFor="pm-paypal">
                                  <span className="pm-name">Wallet</span>
                                  <span className="pm-icon"><em className="icon ni ni-cc-alt-fill" /></span>
                                </label>
                              </li>

                              <li className="buysell-pm-item">
                                <input className="buysell-pm-control" onClick={e => paymentMethodClick(2)} type="radio" name="bs-method" id="pm-card" />
                                <label className="buysell-pm-label" htmlFor="pm-card">
                                  <span className="pm-name">Credit / Debit Card</span>
                                  <span className="pm-icon"><em className="icon ni ni-cc-alt-fill" /></span>
                                </label>
                              </li>
                            </ul>
                          </div>
                        </div>{/* .buysell-field */}
                        <div className="buysell-field form-action">
                          {paymentMethod === 1 ?
                            processingButton === '' ?
                              <button type="submit" disabled={!setdata.length > 0 || !searchvalue.buy_amount || !paymentMethod} className="btn btn-lg btn-block btn-primary">Continue to Buy</button>
                              :
                              <button type="submit" disabled className="btn btn-lg btn-block btn-primary">Processing...</button>
                            :
                            <button type="submit" data-toggle="modal" disabled={!setdata.length > 0 || !searchvalue.buy_amount || !paymentMethod} data-target="#buy-coin" className="btn btn-lg btn-block btn-primary">Continue to Buy</button>
                          }



                        </div>{/* .buysell-field */}
                        {/* <div className="form-note text-base text-center">Note: our transfer fee included, <a href="javascript:void(0)">see our fees</a>.</div> */}
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
      <div className="modal fade" tabIndex={-1} role="dialog" id="buy-coin">
        <div className="modal-dialog modal-dialog-centered modal-md" role="document">
          <div className="modal-content">
            <a href="javascript:void(0)" className="close" data-dismiss="modal"><em className="icon ni ni-cross-sm" /></a>
            <div className="modal-body modal-body-lg">
              <div className="nk-block-head nk-block-head-xs text-center">
                <h5 className="nk-block-title">Confirm Buy</h5>
                <div className="nk-block-text">
                  {/* <div className="caption-text">You are about to get <strong>0.5968</strong> BTC for <strong>500.00</strong> USD*</div>
                                        <span className="sub-text-sm">Exchange rate: 1 BTC = 9,804.00 USD</span> */}
                </div>
              </div>
              <div className="nk-block">
                <div className="buysell-overview">

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

                    <div className="col-md-5">
                      <label>Expiry Month<span className="astrick"> *</span></label>
                      <input type="date" onKeyPress={(event) => {
                        if (!/^[0-9\b]+$/.test(event.key)) {
                          event.preventDefault();
                        }
                      }} maxLength="2" name="expMonth" value={formData.expMonth} onChange={onChangeDeposit} className="form-control card_number" placeholder="Expiry Month" />
                    </div>
                    <div className="col-md-5">
                      <label>Expiry Year<span className="astrick"> *</span></label>
                      <input type="date" onKeyPress={(event) => {
                        if (!/^[0-9\b]+$/.test(event.key)) {
                          event.preventDefault();
                        }
                      }} maxLength="4" name="expYear" value={formData.expYear} onChange={onChangeDeposit} className="form-control card_number" placeholder="Expiry Year" />
                    </div>
                    <div className="col-md-2">
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
                      <button type="submit" disabled={!cardNumber || !expMonth || !expYear || !cvc} className="btn btn-primary btn-lg" >Confirm</button>
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


    </>
  );
}

export default Buysell;