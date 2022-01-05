import React, { useEffect, useState } from 'react';
import config from '../config/config';
import InnerHeader from '../directive/innerHeader';
import InnerSidebar from '../directive/innerSidebar';
import InnerFooter from '../directive/innerfooter';
import axios from 'axios';
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';

const Kycform = (props) => {


    const [loginData, setLoginData] = useState((!Cookies.get('AbcWalletFrontLogin')) ? [] : JSON.parse(Cookies.get('AbcWalletFrontLogin')))
    const [countryList, setcountryList] = useState([])
    const [stateList, setstateList] = useState([])
    const [cityList, setcityList] = useState([])
    const [documentList, setdocumentList] = useState([])
    const [profileList, setprofileList] = useState('')
    const [image_file, setimage_file] = useState(null)
    const [image_preview, setimage_preview] = useState('')
    const [image_file1, setimage_file1] = useState(null)
    const [image_preview1, setimage_preview1] = useState('')
    const [documentSelect, setdocumentSelect] = useState(1)


    //=======================================================  chage function =========================

    const onChangeProfile = (e) => {

        setprofileList({ ...profileList, [e.target.name]: e.target.value }
        );
    }


    //================================================  Update Front Card API integrate  =============
    const handleImageFront = (e) => {
        let image_as_base64 = URL.createObjectURL(e.target.files[0])
        let image_as_files = e.target.files[0];
        setimage_preview(image_as_base64)
        setimage_file(image_as_files)
    }

    //================================================  Update Back Part API integrate  =============
    const handleImageBack = (e) => {
        let image_as_base64 = URL.createObjectURL(e.target.files[0])
        let image_as_files = e.target.files[0];
        setimage_preview1(image_as_base64)
        setimage_file1(image_as_files)
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

    //=======================================================  getDocuments login API =========================

    const getDocuments = async (id) => {
        try {
            await axios({
                method: 'get',
                url: `${config.apiUrl}getKycDocument`,
                headers: { "Authorization": loginData.data.Token },
            }).then(response => {
                if (response.data.success === true) {
                    setdocumentList(response.data.response)
                }
            })
        } catch (err) {
            toast.error(err.response.data.msg)
        }
    }

    //====================================================   document Id get ================================

    const documentClick = (id) => {
        // console.log(id);
        if (id === 1) {
            profileList.kyc_document_id = 1
        }
        else if (id === 2) {

            profileList.kyc_document_id = 2
        }
        else if (id === 3) {

            profileList.kyc_document_id = 3
        }
        setdocumentSelect(id)
    }

    //==========================================  Update profile   ============================================

    const onSubmit = async (e) => {
        e.preventDefault()
        let formData = new FormData();
        formData.append('email', profileList.email);
        formData.append('first_name', profileList.first_name);
        formData.append('last_name', profileList.last_name);
        formData.append('phone', profileList.phone);
        formData.append('dob', profileList.dob);
        formData.append('address1', profileList.address1);
        formData.append('address2', profileList.address2);
        formData.append('country_id', profileList.country_id);
        formData.append('state_id', profileList.state_id);
        formData.append('city_id', profileList.city_id);
        formData.append('pincode', profileList.pincode);
        formData.append('kyc_document_id', documentSelect);
        formData.append('kyc_image_front', image_file);
        formData.append('kyc_image_back', image_file1);
        formData.append('id', profileList.user_id);

        try {
            await axios({
                method: 'post',
                url: `${config.apiUrl}updateKycForm`,
                headers: { "Authorization": loginData.data.Token },
                data: formData
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

    useEffect(() => {
        getDocuments()
        getCountry()
        getProfile()

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
                                    <div className="kyc-app wide-sm m-auto">
                                        <div className="nk-block-head nk-block-head-lg wide-xs mx-auto">
                                            <div className="nk-block-head-content text-center">
                                                <h2 className="nk-block-title fw-normal">Begin your ID-Verification</h2>
                                                <div className="nk-block-des">
                                                    <p className="kyc-color">To comply with regulation each participant will have to go through indentity verification (KYC/AML) to prevent fraud causes. </p>
                                                </div>
                                            </div>
                                        </div>{/* nk-block-head */}
                                        <div className="nk-block">
                                            <div className="card card-bordered">
                                                <div className="nk-kycfm">
                                                    <form onSubmit={(e) => onSubmit(e)}>
                                                        <div className="nk-kycfm-head">
                                                            <div className="nk-kycfm-count">01</div>
                                                            <div className="nk-kycfm-title">
                                                                <h5 className="title">Personal Details</h5>
                                                                <p className="sub-title kyc-color">Your simple personal information required for identification</p>
                                                            </div>
                                                        </div>{/* .nk-kycfm-head */}
                                                        <div className="nk-kycfm-content">
                                                            <div className="nk-kycfm-note">
                                                                <em className="icon ni ni-info-fill" data-toggle="tooltip" data-placement="right" title="Tooltip on right" />
                                                                <p className="kyc-color">Please type carefully and fill out the form with your personal details. Your can’t edit these details once you submitted the form.</p>
                                                            </div>
                                                            <div className="row g-4">
                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <div className="form-label-group">
                                                                            <label className="form-label">First Name <span className="text-danger">*</span></label>
                                                                        </div>
                                                                        <div className="form-control-group">
                                                                            <input type="text" name="first_name" onChange={onChangeProfile} placeholder="First Name" value={profileList?.first_name} className="form-control form-control-lg" />
                                                                        </div>
                                                                    </div>
                                                                </div>{/* .col */}
                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <div className="form-label-group">
                                                                            <label className="form-label">Last Name <span className="text-danger">*</span></label>
                                                                        </div>
                                                                        <div className="form-control-group">
                                                                            <input type="text" placeholder="Last Name" name="last_name" onChange={onChangeProfile} value={profileList?.last_name} className="form-control form-control-lg" />
                                                                        </div>
                                                                    </div>
                                                                </div>{/* .col */}
                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <div className="form-label-group">
                                                                            <label className="form-label">Email Address <span className="text-danger">*</span></label>
                                                                        </div>
                                                                        <div className="form-control-group">
                                                                            <input type="text" name="email" placeholder="Email Address" onChange={onChangeProfile} value={profileList?.email} className="form-control form-control-lg" />
                                                                        </div>
                                                                    </div>
                                                                </div>{/* .col */}
                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <div className="form-label-group">
                                                                            <label className="form-label">Phone Number <span className="text-danger">*</span></label>
                                                                        </div>
                                                                        <div className="form-control-group">
                                                                            <input type="text" name="phone" placeholder="Phone Number" onChange={onChangeProfile} value={profileList?.phone} className="form-control form-control-lg" />
                                                                        </div>
                                                                    </div>
                                                                </div>{/* .col */}
                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <div className="form-label-group">
                                                                            <label className="form-label">Date of Birth <span className="text-danger">*</span></label>
                                                                        </div>
                                                                        <div className="form-control-group">
                                                                            <input type="text" name="dob" onChange={onChangeProfile} value={profileList?.dob} className="form-control form-control-lg date-picker-alt" />
                                                                        </div>
                                                                    </div>
                                                                </div>{/* .col */}

                                                            </div>{/* .row */}
                                                        </div>{/* .nk-kycfm-content */}
                                                        <div className="nk-kycfm-head">
                                                            <div className="nk-kycfm-count">02</div>
                                                            <div className="nk-kycfm-title">
                                                                <h5 className="title">Your Address</h5>
                                                                <p className="sub-title kyc-color">Your simple personal information required for identification</p>
                                                            </div>
                                                        </div>{/* .nk-kycfm-head */}
                                                        <div className="nk-kycfm-content">
                                                            <div className="nk-kycfm-note">
                                                                <em className="icon ni ni-info-fill" data-toggle="tooltip" data-placement="right" title="Tooltip on right" />
                                                                <p className="kyc-color">Your can’t edit these details once you submitted the form.</p>
                                                            </div>
                                                            <div className="row g-4">
                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <div className="form-label-group">
                                                                            <label className="form-label">Address Line 1 <span className="text-danger">*</span></label>
                                                                        </div>
                                                                        <div className="form-control-group">
                                                                            <input type="text" placeholder="Address Line 1" name="address1" onChange={onChangeProfile} value={profileList?.address1} className="form-control form-control-lg" />
                                                                        </div>
                                                                    </div>
                                                                </div>{/* .col */}
                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <div className="form-label-group">
                                                                            <label className="form-label">Address Line 2</label>
                                                                        </div>
                                                                        <div className="form-control-group">
                                                                            <input type="text" name="address2" placeholder="Address Line 2" onChange={onChangeProfile} value={profileList?.address2} className="form-control form-control-lg" />
                                                                        </div>
                                                                    </div>
                                                                </div>{/* .col */}
                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <div className="form-label-group">
                                                                            <label className="form-label">Country <span className="text-danger">*</span></label>
                                                                        </div>
                                                                        <div className="form-control-group">
                                                                            <select className="form-control select-css" name="country_id" onChange={onChangeProfile} value={profileList?.country_id} onClick={e => getState(e.target.value)}>
                                                                                <option >Select Country</option>
                                                                                {countryList.map(item => (
                                                                                    <option value={item.country_id}>{item.name}</option>
                                                                                ))}

                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>{/* .col */}
                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <div className="form-label-group">
                                                                            <label className="form-label">State <span className="text-danger">*</span></label>
                                                                        </div>
                                                                        <div className="form-control-group">
                                                                            <select className="form-control select-css" onChange={onChangeProfile} onClick={e => getCity(e.target.value)} name="state_id" value={profileList?.state_id}>
                                                                                <option >Select State</option>
                                                                                {stateList.map(item => (
                                                                                    <option value={item.state_id}>{item.name}</option>
                                                                                ))}

                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>{/* .col */}
                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <div className="form-label-group">
                                                                            <label className="form-label">City <span className="text-danger">*</span></label>
                                                                        </div>
                                                                        <div className="form-control-group">
                                                                            <select className="form-control select-css" name="city_id" onChange={onChangeProfile} value={profileList?.city_id}>
                                                                                <option  >Select City</option>
                                                                                {cityList.map(item => (
                                                                                    <option value={item.city_id}>{item.name}</option>
                                                                                ))}

                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>{/* .col */}
                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <div className="form-label-group">
                                                                            <label className="form-label">Zip Code <span className="text-danger">*</span></label>
                                                                        </div>
                                                                        <div className="form-control-group">
                                                                            <input type="text" name="pincode" onChange={onChangeProfile} value={profileList?.pincode} placeholder="Zip Code" className="form-control form-control-lg" />
                                                                        </div>
                                                                    </div>
                                                                </div>{/* .col */}
                                                            </div>{/* .row */}
                                                        </div>{/* .nk-kycfm-content */}
                                                        <div className="nk-kycfm-head">
                                                            <div className="nk-kycfm-count">03</div>
                                                            <div className="nk-kycfm-title">
                                                                <h5 className="title">Document Upload</h5>
                                                                <p className="sub-title kyc-color">To verify your identity, please upload any of your document.</p>
                                                            </div>
                                                        </div>{/* .nk-kycfm-head */}
                                                        <div className="nk-kycfm-content">
                                                            <div className="nk-kycfm-note">
                                                                <em className="icon ni ni-info-fill" data-toggle="tooltip" data-placement="right" title="Tooltip on right" />
                                                                <p className="kyc-color">In order to complete, please upload any of the following personal document.</p>
                                                            </div>
                                                            <ul className="nk-kycfm-control-list g-3">
                                                                {console.log(profileList?.kyc_document_id)}
                                                                <li className="nk-kycfm-control-item">
                                                                    <input className={profileList?.kyc_document_id === 1 ? "nk-kycfm-control activeData" : "nk-kycfm-control"} type="radio" name="id-proof" id="passport" data-title="Passport" checked={profileList?.kyc_document_id === 1 ? true : false} onClick={e => documentClick(documentList[0]?.id)} />
                                                                    <label className="nk-kycfm-label" htmlFor="passport">
                                                                        <span className="nk-kycfm-label-icon" >
                                                                            <div className="label-icon">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 71.9904 75.9285">
                                                                                    <path fill="currentColor" d="M27.14,23.73A15.55,15.55,0,1,0,42.57,39.4v-.12A15.5,15.5,0,0,0,27.14,23.73Zm11.42,9.72H33a25.55,25.55,0,0,0-2.21-6.53A12.89,12.89,0,0,1,38.56,33.45ZM31,39.28a26.9929,26.9929,0,0,1-.2,3.24H23.49a26.0021,26.0021,0,0,1,0-6.48H30.8A29.3354,29.3354,0,0,1,31,39.28ZM26.77,26.36h.75a21.7394,21.7394,0,0,1,2.85,7.09H23.91A21.7583,21.7583,0,0,1,26.77,26.36Zm-3.28.56a25.1381,25.1381,0,0,0-2.2,6.53H15.72a12.88,12.88,0,0,1,7.78-6.53ZM14.28,39.28A13.2013,13.2013,0,0,1,14.74,36H20.9a29.25,29.25,0,0,0,0,6.48H14.74A13.1271,13.1271,0,0,1,14.28,39.28Zm1.44,5.83h5.57a25.9082,25.9082,0,0,0,2.2,6.53A12.89,12.89,0,0,1,15.72,45.11ZM27.51,52.2h-.74a21.7372,21.7372,0,0,1-2.85-7.09h6.44A21.52,21.52,0,0,1,27.51,52.2Zm3.28-.56A25.1413,25.1413,0,0,0,33,45.11h5.57a12.84,12.84,0,0,1-7.77,6.53Zm2.59-9.12a28.4606,28.4606,0,0,0,0-6.48h6.15a11.7,11.7,0,0,1,0,6.48ZM14.29,62.6H40v2.6H14.28V62.61ZM56.57,49l1.33-5,2.48.67-1.33,5Zm-6,22.52L55.24,54l2.48.67L53.06,72.14Zm21.6-61.24-29.8-8a5.13,5.13,0,0,0-6.29,3.61h0L33.39,16H6.57A2.58,2.58,0,0,0,4,18.55V70.38A2.57,2.57,0,0,0,6.52,73L6.57,73h29.7l17.95,4.85a5.12,5.12,0,0,0,6.28-3.6v-.06L75.8,16.61a5.18,5.18,0,0,0-3.6066-6.3763L72.18,10.23ZM6.57,70.38V18.55H45.14a2.57,2.57,0,0,1,2.57,2.57V67.79a2.57,2.57,0,0,1-2.55,2.59H6.57ZM73.34,15.91,58,73.48a2.59,2.59,0,0,1-2.48,1.93,2.5192,2.5192,0,0,1-.67-.09l-9-2.42a5.15,5.15,0,0,0,4.37-5.11V47.24l1.32.36,1.33-5-2.49-.67-.16.62V21.94l2.62.71,3.05,10,2.13.57L57.88,24l3.76,1,1.65,3,1.42.39-.25-4.09,2.24-3.42-1.41-.39L62.4,22.15l-3.76-1,4.76-7.92-2.13-.57-7.6,7.14-4-1.08A5.1,5.1,0,0,0,45.14,16H36.05l2.51-9.45a2.57,2.57,0,0,1,3.12-1.84h0l29.81,8.05a2.56,2.56,0,0,1,1.56,1.21A2.65,2.65,0,0,1,73.34,15.91ZM56.57,39.59l.66-2.5,2.44.65L59,40.24Zm4.88,1.31.66-2.51,2.44.66-.65,2.5Zm-9.76-2.61.66-2.51,2.45.66-.66,2.5Z" transform="translate(-3.9995 -2.101)" /></svg>
                                                                            </div>
                                                                        </span>
                                                                        <span className="nk-kycfm-label-text">{documentList[0]?.name}</span>
                                                                    </label>
                                                                </li>{/* .nk-kycfm-control-item */}
                                                                <li className="nk-kycfm-control-item">
                                                                    <input className={profileList?.kyc_document_id === 2 ? "nk-kycfm-control activeData" : "nk-kycfm-control"} type="radio" name="id-proof" checked={profileList?.kyc_document_id === 2 ? true : false} id="national-id" data-title="National ID" onClick={e => documentClick(documentList[1]?.id)} />
                                                                    <label className="nk-kycfm-label" htmlFor="national-id">
                                                                        <span className="nk-kycfm-label-icon">
                                                                            <div className="label-icon">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76 63.0105">
                                                                                    <path fill="currentColor" d="M76,18.79,56.53,9.56a6.19,6.19,0,0,0-5.19,0l-19.5,9.23a3.35,3.35,0,0,0-1.9,2.55H8.33A6.26,6.26,0,0,0,2,27.51v38.3A6.27,6.27,0,0,0,8.33,72H71.67A6.27,6.27,0,0,0,78,65.81v-44A3.37,3.37,0,0,0,76,18.79Zm-.56,47a3.77,3.77,0,0,1-3.8,3.71H8.33a3.77,3.77,0,0,1-3.8-3.71V27.51a3.75,3.75,0,0,1,3.7993-3.7H29.87v9.34A34.49,34.49,0,0,0,44,60.41l7.51,5.8a4.11,4.11,0,0,0,4.94,0l7.51-5.8A36.5307,36.5307,0,0,0,75.47,45.62V65.81Zm0-32.66a32.09,32.09,0,0,1-13.1,25.34l-7.51,5.8a1.5,1.5,0,0,1-1.8,0l-7.51-5.8A32.05,32.05,0,0,1,32.4,33.15V21.83A.91.91,0,0,1,33,21l19.5-9.23a3.51,3.51,0,0,1,3,0L74.92,21a.91.91,0,0,1,.55.82V33.15ZM53.87,21.43a12.47,12.47,0,0,0-12.6,12.31,12.62,12.62,0,0,0,25.23,0,12.46,12.46,0,0,0-12.6178-12.3l-.0122,0Zm0,22.14A9.83,9.83,0,1,1,64,33.78a10,10,0,0,1-10.1,9.79Zm3.31-13.22-5.32,5.19-1.18-1.15a1.29,1.29,0,0,0-1.79,0,1.2,1.2,0,0,0-.013,1.697l.013.013h0l2.08,2a1.27,1.27,0,0,0,1.79,0L59,32.09a1.22,1.22,0,0,0,0-1.72h0a1.29,1.29,0,0,0-1.8,0ZM29.87,57.16h-20a1.24,1.24,0,1,0,0,2.47h20a1.24,1.24,0,0,0,0-2.47ZM19.73,62.1H9.89a1.24,1.24,0,0,0,0,2.48h9.84a1.24,1.24,0,0,0,0-2.48Zm8.66-14.28h0L24,45.71a.36.36,0,0,1-.22-.34V44.16a1.878,1.878,0,0,1,.18-.24,10.9991,10.9991,0,0,0,1.35-2.48,2.53,2.53,0,0,0,1.23-2.16V37.51a2.61,2.61,0,0,0-.46-1.43V34a4.69,4.69,0,0,0-1.15-3.43,6.68,6.68,0,0,0-5.19-1.85,6.67,6.67,0,0,0-5.18,1.85A4.61,4.61,0,0,0,13.4,34v2a2.46,2.46,0,0,0-.46,1.43v1.78a2.49,2.49,0,0,0,.78,1.81,10.148,10.148,0,0,0,1.52,3v1.2a.36.36,0,0,1-.21.33l-4.1,2.15A4.79,4.79,0,0,0,8.33,52v1.43a1.26,1.26,0,0,0,.37.88,1.33,1.33,0,0,0,.9.36H29.87a1.31,1.31,0,0,0,.9-.36,1.26,1.26,0,0,0,.37-.88V52.11A4.76,4.76,0,0,0,28.39,47.82Zm.21,4.4H10.87V52a2.27,2.27,0,0,1,1.25-2l4.12-2.16a2.85,2.85,0,0,0,1.54-2.5V43.72a1.3,1.3,0,0,0-.3-.8,7.39,7.39,0,0,1-1.4-2.8,1.53,1.53,0,0,0-.6-.83V37.46a1.22,1.22,0,0,0,.43-.92v-2.7a2.17,2.17,0,0,1,.53-1.58,4.38,4.38,0,0,1,3.28-1,4.43,4.43,0,0,1,3.26,1,2.22,2.22,0,0,1,.55,1.6.8552.8552,0,0,0,0,.16v2.56a1.36,1.36,0,0,0,.46,1l-.08,1.86a1.23,1.23,0,0,0-.84.8,8.5819,8.5819,0,0,1-1.19,2.31c-.1.14-.22.28-.33.41a1.22,1.22,0,0,0-.33.82v1.66A2.86,2.86,0,0,0,22.86,48l4.41,2a2.28,2.28,0,0,1,1.33,2.07v.15Z" transform="translate(-2 -8.9898)" /></svg>
                                                                            </div>
                                                                        </span>
                                                                        <span className="nk-kycfm-label-text">{documentList[1]?.name}</span>
                                                                    </label>
                                                                </li>{/* .nk-kycfm-control-item */}
                                                                <li className="nk-kycfm-control-item">
                                                                    <input className={profileList?.kyc_document_id === 3 ? "nk-kycfm-control activeData" : "nk-kycfm-control"} type="radio" name="id-proof" checked={profileList?.kyc_document_id === 3 ? true : false} id="driver-licence" data-title="Driving License" onClick={e => documentClick(documentList[2]?.id)} />
                                                                    <label className="nk-kycfm-label" htmlFor="driver-licence">
                                                                        <span className="nk-kycfm-label-icon">
                                                                            <div className="label-icon">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76 76.1">
                                                                                    <path fill="currentColor" d="M70.5,2H9.9A7.9167,7.9167,0,0,0,2,9.9V51.5A7.49,7.49,0,0,0,9.5,59H31.6a1.538,1.538,0,0,0,1.5-1.5A1.4727,1.4727,0,0,0,31.6,56H9.7A4.6946,4.6946,0,0,1,5,51.3V15H75V46.9a1.5,1.5,0,1,0,3,0V10.1C78,5.6,74.7,2,70.5,2ZM75,11H5V9.5A4.6115,4.6115,0,0,1,9.8,5H70.3a4.6115,4.6115,0,0,1,4.8,4.5V11ZM64.3,29.5a4.1408,4.1408,0,0,1-1.5,2.9.9593.9593,0,0,0-.3,1L63,35a.9879.9879,0,0,0,.7.7l3.9,1a2.0749,2.0749,0,0,1,1,.6.972.972,0,0,0,1.4-.1h0a.9663.9663,0,0,0-.1-1.4h0a5.7028,5.7028,0,0,0-2.2-1.1l-3-.8-.1-.5a7.08,7.08,0,0,0,1.6-3.1,1.8059,1.8059,0,0,0,1-1.4l.2-1.7a1.8411,1.8411,0,0,0-.8-1.8l.1-1.1.2-.2a2.5846,2.5846,0,0,0,.1-3.4,4.3847,4.3847,0,0,0-3.8-1.8,7.2965,7.2965,0,0,0-3.5.9c-4.1.1-4.6,2.4-4.6,4,0,.3.1.9.1,1.5-.1.1-.3.2-.4.3a1.9638,1.9638,0,0,0-.5,1.5l.2,1.7a2.0944,2.0944,0,0,0,1.1,1.5,6.1046,6.1046,0,0,0,1.5,3l-.1.6-3,.8A5.4636,5.4636,0,0,0,49.9,40a.9448.9448,0,0,0,1,1H65a1,1,0,0,0,0-2H52.1a3.1116,3.1116,0,0,1,2.5-2.3l3.6-.9a.9879.9879,0,0,0,.7-.7l.4-1.7a.8065.8065,0,0,0-.3-.9,4.6858,4.6858,0,0,1-1.4-2.9.8949.8949,0,0,0-1-.8l-.3-1.6a.9448.9448,0,0,0,1-1v-.1a19.0913,19.0913,0,0,1-.2-2c0-1,0-2,2.9-2a1.4213,1.4213,0,0,0,.6-.2,4.1045,4.1045,0,0,1,2.6-.7,2.1984,2.1984,0,0,1,2.1.9c.4.6.2.8.1.9l-.4.2a.9078.9078,0,0,0-.3.7L64.6,26a.7787.7787,0,0,0,.7.9h.2l-.1,1.6A1.0278,1.0278,0,0,0,64.3,29.5ZM34.1,27a1.538,1.538,0,0,0,1.5-1.5A1.4727,1.4727,0,0,0,34.1,24h-6a1.5,1.5,0,0,0,0,3ZM12.8,37h21a1.5,1.5,0,0,0,0-3h-21a1.538,1.538,0,0,0-1.5,1.5A1.4727,1.4727,0,0,0,12.8,37Zm-.4-10h9a1.5,1.5,0,0,0,0-3h-9a1.5,1.5,0,1,0,0,3ZM74.9,55a2.0059,2.0059,0,0,0-2-2h-.2a7.0756,7.0756,0,0,0-3.1,1c-1.4-3-3.8-5.6-5.4-6.4-1.1-.6-4.9-1.2-8.3-1.2s-7.1.6-8.2,1.2c-1.7.8-4,3.4-5.4,6.4a6.6831,6.6831,0,0,0-3.1-1,2.2959,2.2959,0,0,0-1.4.4A2.0876,2.0876,0,0,0,37,55a5.5585,5.5585,0,0,0,2,4c.2.1.3.2.5.3a16.4687,16.4687,0,0,0-1,5.8c0,2.1.2,5.8,1.5,7.7v2.4a2.9483,2.9483,0,0,0,2.8,2.9h3.4A2.8616,2.8616,0,0,0,49,75.3h0v-1a27.5212,27.5212,0,0,0,7,1,27.5212,27.5212,0,0,0,7-1v1a2.7754,2.7754,0,0,0,2.7,2.8H69a2.8183,2.8183,0,0,0,2.9-2.8h0V72.9c1.2-1.9,1.4-5.5,1.4-7.7a16.0869,16.0869,0,0,0-1-5.8.8643.8643,0,0,0,.6-.3A5.7634,5.7634,0,0,0,74.9,55ZM49.3,50.1a22.2387,22.2387,0,0,1,6.8-.8,30.84,30.84,0,0,1,6.8.8c1.1.5,3.6,3.4,4.6,6.5-2.7.4-9.1,1.2-11.5,1.2s-8.7-.9-11.4-1.2C45.7,53.5,48.2,50.7,49.3,50.1Zm-8.1,6.6c-.1-.2-.3-.3-.4-.5a2.1859,2.1859,0,0,1,.5.3c0,.1,0,.1-.1.2ZM46.1,75H43V74h3v1.1Zm23,0H66V74h3v1.1Zm.4-5H66.9a6.7381,6.7381,0,0,0-2.6.9h0a32.0084,32.0084,0,0,1-8.2,1.4,42.62,42.62,0,0,1-7.6-1.5,6.1538,6.1538,0,0,0-1.9-.2l-4,.4a19.5493,19.5493,0,0,1-.8-5.9,6.15,6.15,0,0,1,.1-1.4c1.9.1,4.2.7,4.2,1.4a1.52,1.52,0,0,0,1.4,1.5h0c.8,0,1.5-1.4,1.5-1.4v-.7c0-3.4-4.7-4-6.5-4.1.2-.5.4-1,.6-1.4h0c.4.1,9.8,1.4,13,1.4S68.7,59.1,69,59h0c.2.5.4.9.6,1.4-1.8.1-6.4.7-6.4,4.1a1.4036,1.4036,0,0,0,2.8,0v-.1c0-.7,2.2-1.3,4.2-1.4a6.602,6.602,0,0,1,.1,1.4A17.2549,17.2549,0,0,1,69.5,70Zm1.6-13.3c0-.1-.1-.1-.1-.2l.5-.3A2.1813,2.1813,0,0,1,71.1,56.7ZM59.2,64h-6a1.5,1.5,0,0,0,0,3h6a1.5,1.5,0,0,0,0-3Z" transform="translate(-2 -2)" /></svg>
                                                                            </div>
                                                                        </span>
                                                                        <span className="nk-kycfm-label-text">{documentList[2]?.name}</span>
                                                                    </label>
                                                                </li>{/* .nk-kycfm-control-item */}
                                                            </ul>{/* .nk-kycfm-control-list */}
                                                            <h6 className="title">To avoid delays when verifying account, Please make sure bellow:</h6>
                                                            <ul className="list list-sm list-checked">
                                                                <li>Chosen credential must not be expaired.</li>
                                                                <li>Document should be good condition and clearly visible.</li>
                                                                <li>Make sure that there is no light glare on the card.</li>
                                                            </ul>
                                                            <div className="nk-kycfm-upload">
                                                                <h6 className="title nk-kycfm-upload-title">Upload Here Your Front Copy</h6>
                                                                <div className="row align-items-center">
                                                                    <div className="col-sm-8">
                                                                        <div className="nk-kycfm-upload-box">
                                                                            <input type="file" accept=".png,.jpg,.jpeg" onChange={handleImageFront} className="document_upload" />
                                                                            {image_preview === '' ?
                                                                                !profileList.kyc_image_front || profileList.kyc_image_front === '0'
                                                                                    ?
                                                                                    '' :
                                                                                    <img className="image-kycpreview" src={`${config.imageUrl}${profileList.kyc_image_front}`} alt /> :
                                                                                <img className="image-auth" src={image_preview} />
                                                                            }
                                                                            <div className="dz-message1" style={{ padding: image_preview === '' ? '' : '68px' }}>
                                                                                {image_preview === '' ?
                                                                                    <button className="btn btn-primary">SELECT</button>

                                                                                    : ''}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-sm-4 d-none d-sm-block">
                                                                        <div className="mx-md-4">
                                                                            <img src="user-dashboard/images/icons/id-front.svg" alt="ID Front" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>{/* nk-kycfm-upload */}
                                                            <div className="nk-kycfm-upload">
                                                                <h6 className="title nk-kycfm-upload-title">Upload Here Your Back Copy</h6>
                                                                <div className="row align-items-center">
                                                                    <div className="col-sm-8">
                                                                        <div className="nk-kycfm-upload-box">
                                                                            <div className="nk-kycfm-upload-box">
                                                                                <input type="file" accept=".png,.jpg,.jpeg" onChange={handleImageBack} className="document_upload" />
                                                                                {image_preview1 === '' ?
                                                                                    !profileList?.kyc_image_back || profileList?.kyc_image_back === '0'
                                                                                        ?
                                                                                        '' :
                                                                                        <img className="image-kycpreview" src={`${config.imageUrl}${profileList?.kyc_image_back}`} alt /> :
                                                                                    <img className="image-auth" src={image_preview1} />
                                                                                }
                                                                                <div className="dz-message1" style={{ padding: image_preview1 === '' ? '' : '68px' }}>
                                                                                    {image_preview1 === '' ?
                                                                                        <button className="btn btn-primary">SELECT</button>

                                                                                        : ''}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-sm-4 d-none d-sm-block">
                                                                        <div className="mx-md-4">
                                                                            <img src="user-dashboard/images/icons/id-back.svg" alt="ID Back" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>{/* nk-kycfm-upload */}
                                                        </div>{/* .nk-kycfm-content */}
                                                        <div className="nk-kycfm-footer">
                                                            <div className="form-group">
                                                                <div className="custom-control custom-control-xs custom-checkbox">
                                                                    <input type="checkbox" className="custom-control-input" id="tc-agree" />
                                                                    <label className="custom-control-label" htmlFor="tc-agree">I Have Read The <a href="#">Terms Of Condition</a> And <a href="#">Privacy Policy</a></label>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <div className="custom-control custom-control-xs custom-checkbox">
                                                                    <input type="checkbox" className="custom-control-input" id="info-assure" />
                                                                    <label className="custom-control-label" htmlFor="info-assure">All The Personal Information I Have Entered Is Correct.</label>
                                                                </div>
                                                            </div>
                                                            <div className="nk-kycfm-action pt-2">
                                                                <button type="submit" className="btn btn-lg btn-primary">Process for Verify</button>
                                                            </div>
                                                        </div>{/* .nk-kycfm-footer */}
                                                    </form>
                                                </div>{/* .nk-kycfm */}
                                            </div>{/* .card */}
                                        </div>{/* nk-block */}
                                    </div>{/* kyc-app */}
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

export default Kycform;
















