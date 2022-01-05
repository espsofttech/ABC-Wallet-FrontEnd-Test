import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import config from '../config/config';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
const Footer = (props) => {
    const [whiteFooter, setWhiteFooter] = useState('');
    const [hideFooter, sethideFooter] = useState('');
    const [NameErrorLogin, setNameErrorLogin] = useState(null)
    const [emailErrorLogin, setEmailErrorLogin] = useState(null)
    const [SubjectErrorLogin, setSubjectErrorLogin] = useState(null)
    const [commentsErrorLogin, setcommentsErrorLogin] = useState(null)

    const [formData, setFormData] = useState({
        name: '',
        email: "",
        subject: "",
        comments: ""
    });
    const { name, email, subject, comments } = formData;

    //=======================================================  chage function =========================

    const onChangeContact = (e) => {
        if (e.target.name === 'name') {
            setNameErrorLogin('');
        }

        if (e.target.name === 'email') {
            setEmailErrorLogin('');
        }

        if (e.target.name === 'subject') {
            setSubjectErrorLogin('');
        }

        if (e.target.name === 'comments') {
            setcommentsErrorLogin('');
        }

        setFormData({ ...formData, [e.target.name]: e.target.value }
        );
    }

    //=======================================================  Onsubmit login API =========================

    const onSubmit = async (e) => {
        e.preventDefault();

        const newContact = {
            name,
            email,
            subject,
            comments
        };
        if (formData.name === '') {
            setNameErrorLogin('Name is required')
        }
        if (formData.email === '') {
            setEmailErrorLogin('Email is required')
        }

        if (formData.subject === '') {
            setSubjectErrorLogin('Subject is required')
        }
        if (formData.comments === '') {
            setcommentsErrorLogin('Comments is required')
        }
        else {
            if (formData.name && formData.email && formData.subject && formData.comments) {
                try {
                    setNameErrorLogin('')
                    setEmailErrorLogin('');
                    setSubjectErrorLogin('');
                    setcommentsErrorLogin('');


                    await axios({
                        method: 'post',
                        url: `${config.apiUrl}insertContact`,
                        data: newContact
                    }).then(response => {
                        if (response.data.success === true) {
                            toast.success(response.data.msg)
                            setFormData({ ...formData, name: '', email: '', subject: '', comments: '' })
                        }
                    })
                } catch (err) {
                    toast.error(err.response.data.msg)
                }
            }

        }

    }

    useEffect(() => {
        setWhiteFooter(props.chagneClass);
        sethideFooter(props.hideFooterClass);

    }, [])

    
    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <footer className={`footer-area bg-img ${whiteFooter}`} style={{ backgroundImage: 'url(img/core-img/pattern.png)' }}>
                {/* ##### Contact Area Start ##### */}
                <div className={`contact_us_area section-padding-100-0 ${hideFooter}`} id="contact" >
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="section-heading text-center">
                                    {/* Dream Dots */}
                                    <div className="dream-dots justify-content-center fadeInUp" data-wow-delay="0.2s">
                                        <span className="gradient-text blue">Contact us</span>
                                    </div>
                                    <h2 className="fadeInUp" data-wow-delay="0.3s">Contact With Us</h2>
                                    <p className="fadeInUp" data-wow-delay="0.4s">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis accumsan nisi Ut ut felis congue nisl hendrerit commodo.</p>
                                </div>
                            </div>
                        </div>
                        {/* Contact Form */}
                        <div className="row justify-content-center" >
                            <div className="col-12 col-md-10 col-lg-8">
                                <div className="contact_form">
                                    <form onSubmit={(e) => onSubmit(e)} >
                                        <div className="row">

                                            <div className="col-12 col-md-6">
                                                <div className="group fadeInUp" data-wow-delay="0.2s">
                                                    <input type="text" style={{ borderBottom: NameErrorLogin === '' || NameErrorLogin === null ? '' : '2px solid red' }} name="name" value={formData.name} onChange={onChangeContact} id="name"  />
                                                    <span className="highlight" />
                                                    <span className="bar" />
                                                    <label>Name</label>
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div className="group fadeInUp" data-wow-delay="0.3s">
                                                    <input type="email" style={{ borderBottom: emailErrorLogin === '' || emailErrorLogin === null ? '' : '2px solid red' }} name="email" value={formData.email} onChange={onChangeContact} id="email"  />
                                                    <span className="highlight" />
                                                    <span className="bar" />
                                                    <label>Email</label>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="group fadeInUp" data-wow-delay="0.4s">
                                                    <input type="text" style={{ borderBottom: SubjectErrorLogin === '' || SubjectErrorLogin === null ? '' : '2px solid red' }} name="subject" value={formData.subject} onChange={onChangeContact} id="subject"  />
                                                    <span className="highlight" />
                                                    <span className="bar" />
                                                    <label>Subject</label>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="group fadeInUp" data-wow-delay="0.5s">
                                                    <textarea name="comments" style={{ borderBottom: commentsErrorLogin === '' || commentsErrorLogin === null ? '' : '2px solid red' }} value={formData.comments} onChange={onChangeContact} id="message"  />
                                                    <span className="highlight" />
                                                    <span className="bar" />
                                                    <label>Message</label>
                                                </div>
                                            </div>
                                            <div className="col-12 text-center fadeInUp" data-wow-delay="0.6s">
                                                <button type="submit" className="btn more-btn">Send Message</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* ##### Contact Area End ##### */}
                <div className="footer-content-area " style={{ marginTop: hideFooter ? '0px' : '100px' }}>
                    <div className="container">
                        <div className="row ">
                            <div className="col-12 col-lg-4 col-md-6">
                                <div className="footer-copywrite-info">
                                    {/* Copywrite */}
                                    <div className="copywrite_text fadeInUp" data-wow-delay="0.2s">
                                        <div className="footer-logo">
                                            <a href="#"><img src="img/core-img/logo.jpeg" alt="logo" /></a>
                                        </div>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit ducimus voluptatibus neque illo id repellat quisquam? Autem expedita earum quae laborum ipsum ad.</p>
                                    </div>
                                    {/* Social Icon */}
                                    <div className="footer-social-info fadeInUp" data-wow-delay="0.4s">
                                        <a href="#"><i className="fa fa-facebook" aria-hidden="true" /></a>
                                        <a href="#"> <i className="fa fa-twitter" aria-hidden="true" /></a>
                                        <a href="#"><i className="fa fa-google-plus" aria-hidden="true" /></a>
                                        <a href="#"><i className="fa fa-instagram" aria-hidden="true" /></a>
                                        <a href="#"><i className="fa fa-linkedin" aria-hidden="true" /></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-3 col-md-6">
                                <div className="contact_info_area d-sm-flex justify-content-between">
                                    {/* Content Info */}
                                    <div className="contact_info mt-x text-center fadeInUp" data-wow-delay="0.3s">
                                        <h5>PRIVACY &amp; TOS</h5>
                                        <a href><p>Advertiser Agreement</p></a>
                                        <NavLink to={`${config.baseUrl}TermsandCondition`}><p>Term &amp; Condition</p></NavLink>
                                        <NavLink to={`${config.baseUrl}PrivacyPolicy`}><p>Privacy Policy</p></NavLink>
                                        <a href><p>Technology Privacy</p></a>
                                        <a href><p>Developer Agreement</p></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-2 col-md-6 ">
                                {/* Content Info */}
                                <div className="contact_info_area d-sm-flex justify-content-between">
                                    <div className="contact_info mt-s text-center fadeInUp" data-wow-delay="0.2s">
                                        <h5>NAVIGATE</h5>
                                        <a href><p>Buy</p></a>
                                        <a href><p>Send</p></a>
                                        <a href><p>Receive</p></a>
                                        <a href><p>Company</p></a>
                                        <a href><p>Connect</p></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-3 col-md-6 ">
                                <div className="contact_info_area d-sm-flex justify-content-between">
                                    {/* Content Info */}
                                    <div className="contact_info mt-s text-center fadeInUp" data-wow-delay="0.4s">
                                        <h5>CONTACT US</h5>
                                        <p>101 Platinum plaza , Scheme no 54, Pu 4, behind C21 mall, Near off NRK Bizpark,indore(452010).m.p.</p>
                                        <p>+91 90932 627</p>
                                        <p>abc@wallet.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;
















