import React, { useEffect, useState } from 'react';
import InnerHeader from '../directive/innerHeader';
import InnerSidebar from '../directive/innerSidebar';
import InnerFooter from '../directive/innerfooter';
import Cookies from 'js-cookie';
import axios from 'axios';
import config from '../config/config';
import toast, { Toaster } from 'react-hot-toast';

const Profile = (props) => {

    const [loginData, setLoginData] = useState((!Cookies.get('AbcWalletFrontLogin')) ? [] : JSON.parse(Cookies.get('AbcWalletFrontLogin')))
    const [countryList, setcountryList] = useState([])
    const [stateList, setstateList] = useState([])
    const [cityList, setcityList] = useState([])
    const [profileList, setprofileList] = useState('')
    const [activestate, setactivestate] = useState(1)
    const [bankList, setbankList] = useState('')


    //=======================================================  chage function =========================

    const onChangeProfile = (e) => {

        setprofileList({ ...profileList, [e.target.name]: e.target.value }
        );
    }

    //==============================================  Change function for profile  ==========================

    const onChangeBank = (e) => {

        setbankList({ ...bankList, [e.target.name]: e.target.value }
        );
    }

    //=======================================================  getCountry login API =========================

    const getCountry = async () => {
        try {
            await axios({
                method: 'get',
                url: `${config.apiUrl}getcountries`,
                headers: { "Authorization": loginData.data.Token }
            }).then(response => {
                if (response.data.success === true) {
                    setcountryList(response.data.response)
                }
            })
        } catch (err) {
            toast.error(err.response.data.msg)
        }
    }

    //=======================================================  getState login API =========================

    const getState = async (id) => {
        try {
            await axios({
                method: 'post',
                url: `${config.apiUrl}getStates`,
                headers: { "Authorization": loginData.data.Token },
                data: { countryId: id }
            }).then(response => {
                if (response.data.success === true) {
                    setstateList(response.data.response)
                }
            })
        } catch (err) {
            toast.error(err.response.data.msg)
        }
    }

    //=======================================================  getCity login API =========================

    const getCity = async (id) => {
        try {
            await axios({
                method: 'post',
                url: `${config.apiUrl}getCities`,
                headers: { "Authorization": loginData.data.Token },
                data: { stateId: id }
            }).then(response => {
                if (response.data.success === true) {
                    setcityList(response.data.response)
                }
            })
        } catch (err) {
            toast.error(err.response.data.msg)
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
                    if (response.data.response.country_id) {
                        getState(response.data.response.country_id)
                    }
                    if (response.data.response.state_id) {
                        getCity(response.data.response.state_id)
                    }
                }
            })
        } catch (err) {
            toast.error(err.response.data.msg)
        }
    }

    //=======================================================  getBankDetail login API =========================

    const getBankDetail = async () => {
        try {
            await axios({
                method: 'post',
                url: `${config.apiUrl}getBankDetails`,
                headers: { "Authorization": loginData.data.Token },
                data: { id: loginData.data.user_id }
            }).then(response => {
                if (response.data.success === true) {
                    setbankList(response.data.response)
                }
            })
        } catch (err) {
            toast.error(err.response.data.msg)
        }
    }


    //==========================================  Update profile   ============================================

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios({
                method: 'post',
                url: `${config.apiUrl}updateProfilePic`,
                headers: { "Authorization": loginData.data.Token },
                data: profileList
            }).then(response => {
                if (response.data.success === true) {
                    setprofileList(response.data.response)
                    toast.success(response.data?.msg)
                    setTimeout(() => {
                        window.location.reload()
                    }, 1000);
                }
            })
        } catch (err) {
            toast.error(err.response.data?.msg)
        }
    }

    //==========================================  Update Bank Details   ============================================

    const onSubmitBank = async (e) => {
        e.preventDefault()
        try {
            await axios({
                method: 'post',
                url: `${config.apiUrl}updateBankDetails`,
                headers: { "Authorization": loginData.data.Token },
                data: bankList
            }).then(response => {
                if (response.data.success === true) {
                    setbankList(response.data.response)
                    toast.success(response.data?.msg)
                    setTimeout(() => {
                        window.location.reload()
                    }, 1000);
                }
            })
        } catch (err) {
            toast.error(err.response.data?.msg)
        }
    }

    //==========================================  State change =====================================

    const stateChange = async (id) => {
        if (id === 0) {
            setactivestate(1)
        }
        else if (id === 1) {
            setactivestate(0)
        }

    }




    useEffect(() => {
        // window.scrollTo({ top: 0, behavior: 'smooth' });
        getCountry()
        getProfile()
        getBankDetail()
    }, [])

    return (
        <>
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
                                    <div className="nk-block-head">
                                        <div className="nk-block-head-content">
                                            <div className="nk-block-head-sub"><span>Account Setting</span></div>
                                            <h2 className="nk-block-title fw-normal">My Profile</h2>
                                            <div className="nk-block-des">
                                                <p style={{ color: '#526484' }}>You have full control to manage your own account setting. <span className="text-primary"><em className="icon ni ni-info" data-toggle="tooltip" data-placement="right" title="Tooltip on right" /></span></p>
                                            </div>
                                        </div>
                                    </div>{/* .nk-block-head */}
                                    <ul className="nk-nav nav nav-tabs">
                                        <li className="nav-item">
                                            <a className={activestate === 0 ? "nav-link" : "nav-link active"} href="javascript:void(0)" onClick={e => stateChange(activestate)}>Personal</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className={activestate === 1 ? "nav-link" : "nav-link active"} href="javascript:void(0)" onClick={e => stateChange(activestate)}>Bank</a>
                                        </li>
                                        {/* <li class="nav-item">
                                      <a class="nav-link" href="javascript:void(0)">US Bank</a>
                                  </li>
                                  <li class="nav-item">
                                      <a class="nav-link" href="javascript:void(0)">Get Verified</a>
                                  </li> */}
                                    </ul>{/* .nk-menu */}
                                    {/* NK-Block @s */}

                                    {activestate === 1 ?
                                        <div className="nk-block">
                                            <div className="nk-block-head">
                                                <div className="nk-block-head-content">
                                                    <h5 className="nk-block-title">Personal Information</h5>
                                                    <div className="nk-block-des">
                                                        <p style={{color:'#526484'}}>Basic info, like your name and address, that you use on Barteka Platform.</p>
                                                    </div>
                                                </div>
                                            </div>{/* .nk-block-head */}
                                            <div className="nk-data data-list" style={{marginTop:'0px'}}>
                                                <div className="data-head">
                                                    <h6 className="overline-title">Basics</h6>
                                                </div>
                                                <div className="data-item" data-toggle="modal" data-target="#profile-edit">
                                                    <div className="data-col">
                                                        <span className="data-label">First Name</span>
                                                        <span className="data-value">{profileList?.first_name}</span>
                                                    </div>
                                                    <div className="data-col data-col-end"><span className="data-more"><em className="icon ni ni-forward-ios" /></span></div>
                                                </div>{/* .data-item */}
                                                <div className="data-item" data-toggle="modal" data-target="#profile-edit">
                                                    <div className="data-col">
                                                        <span className="data-label">Last Name</span>
                                                        <span className="data-value">{profileList?.last_name}</span>
                                                    </div>
                                                    <div className="data-col data-col-end"><span className="data-more"><em className="icon ni ni-forward-ios" /></span></div>
                                                </div>{/* .data-item */}
                                                <div className="data-item">
                                                    <div className="data-col">
                                                        <span className="data-label">Email</span>
                                                        <span className="data-value">{profileList?.email}</span>
                                                    </div>
                                                    <div className="data-col data-col-end"><span className="data-more disable"><em className="icon ni ni-lock-alt" /></span></div>
                                                </div>{/* .data-item */}
                                                <div className="data-item" data-toggle="modal" data-target="#profile-edit">
                                                    <div className="data-col">
                                                        <span className="data-label">Phone Number</span>
                                                        <span className="data-value text-soft">{profileList?.phone}</span>
                                                    </div>
                                                    <div className="data-col data-col-end"><span className="data-more"><em className="icon ni ni-forward-ios" /></span></div>
                                                </div>{/* .data-item */}
                                                <div className="data-item" data-toggle="modal" data-target="#profile-edit">
                                                    <div className="data-col">
                                                        <span className="data-label">Date of Birth</span>
                                                        <span className="data-value">{profileList?.dob}</span>
                                                    </div>
                                                    <div className="data-col data-col-end"><span className="data-more"><em className="icon ni ni-forward-ios" /></span></div>
                                                </div>{/* .data-item */}
                                                <div className="data-item" data-toggle="modal" data-target="#profile-edit" data-tab-target="#address">
                                                    <div className="data-col">
                                                        <span className="data-label">Address</span>
                                                        <span className="data-value">{profileList?.address1}</span>
                                                    </div>
                                                    <div className="data-col data-col-end"><span className="data-more"><em className="icon ni ni-forward-ios" /></span></div>
                                                </div>{/* .data-item */}
                                            </div>{/* .nk-data */}
                                            {/* .nk-data */}
                                        </div>

                                        :
                                        <div className="nk-block">
                                            <div className="nk-block-head">
                                                <div className="nk-block-head-content">
                                                    <h5 className="nk-block-title">Bank Information</h5>
                                                    <div className="nk-block-des">
                                                        <p style={{color:'#526484'}}>Basic info, like your name and address, that you use on Barteka Platform.</p>
                                                    </div>
                                                </div>
                                            </div>{/* .nk-block-head */}
                                            <div className="nk-data data-list" style={{marginTop:'0px'}}>
                                                <div className="data-head">
                                                    <h6 className="overline-title">Basics</h6>
                                                </div>
                                                <div className="data-item" data-toggle="modal" data-target="#bank-edit">
                                                    <div className="data-col">
                                                        <span className="data-label">Bank Name</span>
                                                        <span className="data-value">{bankList?.bank_name}</span>
                                                    </div>
                                                    <div className="data-col data-col-end"><span className="data-more"><em className="icon ni ni-forward-ios" /></span></div>
                                                </div>{/* .data-item */}
                                                <div className="data-item" data-toggle="modal" data-target="#bank-edit">
                                                    <div className="data-col">
                                                        <span className="data-label">Account Number</span>
                                                        <span className="data-value">{bankList?.account_no}</span>
                                                    </div>
                                                    <div className="data-col data-col-end"><span className="data-more"><em className="icon ni ni-forward-ios" /></span></div>
                                                </div>{/* .data-item */}

                                                <div className="data-item" data-toggle="modal" data-target="#bank-edit">
                                                    <div className="data-col">
                                                        <span className="data-label">Account Holder Name</span>
                                                        <span className="data-value">{bankList?.holder_name}</span>
                                                    </div>
                                                    <div className="data-col data-col-end"><span className="data-more"><em className="icon ni ni-forward-ios" /></span></div>
                                                </div>




                                            </div>{/* .nk-data */}
                                            {/* .nk-data */}
                                        </div>

                                    }


                                </div>
                            </div>
                        </div>  {/* content @e */}
                        {/* footer @s */}

                        {/* footer @e */}


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


            {/* //=========================       Profile dialogue        ==================== */}

            <div className="modal fade modal-profile" tabIndex={-1} role="dialog" id="profile-edit">
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                        <a className="close" data-dismiss="modal"><em className="icon ni ni-cross-sm" /></a>
                        <div className="modal-body modal-body-lg">
                            <h5 className="title">Update Profile</h5>
                            <ul className="nk-nav nav nav-tabs">
                                <li className="nav-item">
                                    <a className="nav-link active" data-toggle="tab" href="#personal">Personal</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" data-toggle="tab" href="#address">Address</a>
                                </li>
                            </ul>{/* .nav-tabs */}
                            <div className="tab-content">
                                <div className="tab-pane active" id="personal">
                                    <form onSubmit={(e) => onSubmit(e)}>
                                        <div className="row gy-4">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label" htmlFor="full-name">First Name</label>
                                                    <input type="text" className="form-control form-control-lg" id="full-name" name="first_name" onChange={onChangeProfile} value={profileList?.first_name} placeholder="Enter First name" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label" htmlFor="display-name">Last Name</label>
                                                    <input type="text" className="form-control form-control-lg" id="display-name" placeholder="Enter Last name" name="last_name" onChange={onChangeProfile} value={profileList?.last_name} />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label" htmlFor="phone-no">Phone Number</label>
                                                    <input type="text" className="form-control form-control-lg" id="phone-no"
                                                        name="phone" onChange={onChangeProfile} value={profileList?.phone} placeholder="Phone Number" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label" htmlFor="birth-day">Date of Birth</label>
                                                    <input type="date" className="form-control form-control-lg" id="birth-day" name="dob" onChange={onChangeProfile} value={profileList?.dob} placeholder="Enter your BirthDay" />
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2" style={{padding:'0px'}}>
                                                    <li>
                                                        <button type="submit" className="btn btn-md btn-primary">Update Profile</button>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:void(0)" data-dismiss="modal" className="link link-light">Cancel</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </form>
                                </div>{/* .tab-pane */}
                                <div className="tab-pane" id="address">
                                    <form onSubmit={(e) => onSubmit(e)}>
                                        <div className="row gy-4">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label" htmlFor="address-l1">Address Line 1</label>
                                                    <input type="text" className="form-control form-control-lg" id="address-l1" name="address1" placeholder="Address Line 1" onChange={onChangeProfile} value={profileList?.address1} />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label" htmlFor="address-l2">Address Line 2</label>
                                                    <input type="text" className="form-control form-control-lg" id="address-l2" name="address2" placeholder="Address Line 2" onChange={onChangeProfile} value={profileList?.address2} />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">Country</label>
                                                    <select className="form-control select-css" name="country_id" onChange={onChangeProfile} value={profileList?.country_id} onClick={e => getState(e.target.value)}>
                                                        <option >Select Country</option>
                                                        {countryList.map(item => (
                                                            <option value={item.country_id}>{item.name}</option>
                                                        ))}

                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">State</label>
                                                    <select className="form-control select-css" onChange={onChangeProfile} onClick={e => getCity(e.target.value)} name="state_id" value={profileList?.state_id}>
                                                        <option >Select State</option>
                                                        {stateList.map(item => (
                                                            <option value={item.state_id}>{item.name}</option>
                                                        ))}

                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label">City</label>
                                                    <select className="form-control select-css" name="city_id" onChange={onChangeProfile} value={profileList?.city_id}>
                                                        <option  >Select City</option>
                                                        {cityList.map(item => (
                                                            <option value={item.city_id}>{item.name}</option>
                                                        ))}

                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label" htmlFor="address-l2">Zip Code</label>
                                                    <input type="text" className="form-control form-control-lg" id="address-l2" name="pincode" onChange={onChangeProfile} placeholder="Zip Code" value={profileList?.pincode} />
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2" style={{padding:'0px'}}>
                                                    <li>
                                                        <button type="submit" className="btn btn-md btn-primary">Update Address</button>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:void(0)" data-dismiss="modal" className="link link-light">Cancel</a>
                                                    </li>
                                                </ul>
                                            </div>

                                        </div>
                                    </form>
                                </div>{/* .tab-pane */}
                            </div>{/* .tab-content */}
                        </div>{/* .modal-body */}
                    </div>{/* .modal-content */}
                </div>{/* .modal-dialog */}
            </div>


            {/* //==========================  Bank Dialogue   ================================= */}

            <div className="modal fade modal-profile" tabIndex={-1} role="dialog" id="bank-edit">
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                        <a className="close" data-dismiss="modal"><em className="icon ni ni-cross-sm" /></a>
                        <div className="modal-body modal-body-lg">
                            <h5 className="title">Update Bank Details</h5>

                            <div className="tab-content">
                                <div className="tab-pane active">
                                    <form onSubmit={(e) => onSubmitBank(e)}>
                                        <div className="row gy-4">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label" htmlFor="full-name">Bank Name</label>
                                                    <input type="text" className="form-control form-control-lg" id="full-name" name="bank_name" onChange={onChangeBank} value={bankList?.bank_name} placeholder="Enter Bank name" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label" htmlFor="display-name">Account Number</label>
                                                    <input type="text" className="form-control form-control-lg" id="display-name" placeholder="Enter Account Number" name="account_no" onChange={onChangeBank} value={bankList?.account_no} />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label className="form-label" htmlFor="phone-no">Account Holder Name</label>
                                                    <input type="text" className="form-control form-control-lg" id="phone-no"
                                                        name="holder_name" onChange={onChangeBank} value={bankList?.holder_name} placeholder="Account Holder Name" />
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2" style={{padding:'0px'}}>
                                                    <li>
                                                        <button type="submit" className="btn btn-md btn-primary">Update Profile</button>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:void(0)" data-dismiss="modal" className="link link-light">Cancel</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </form>
                                </div>{/* .tab-pane */}
                            </div>{/* .tab-content */}
                        </div>{/* .modal-body */}
                    </div>{/* .modal-content */}
                </div>{/* .modal-dialog */}
            </div>

        </>
    );
}

export default Profile;
















