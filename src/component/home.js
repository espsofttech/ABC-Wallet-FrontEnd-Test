import React, { useEffect, useRef, useState } from 'react';
import Header from '../directive/header';
import Footer from '../directive/footer';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import { useRipple } from "react-use-ripple";
import { NavLink } from 'react-router-dom';
import config from '../config/config';
import Cookies from 'js-cookie';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Home = (props) => {

    const buttonRef = useRef();
    const buttonRef1 = useRef();
    const buttonRef2 = useRef();
    const buttonRef3 = useRef();

    const [loginData, setLoginData] = useState((!Cookies.get('AbcWalletFrontLogin')) ? [] : JSON.parse(Cookies.get('AbcWalletFrontLogin')))
    const [faqlist, setfaqlist] = useState([])
    useRipple(buttonRef);
    useRipple(buttonRef1);
    useRipple(buttonRef2);
    useRipple(buttonRef3);


    useEffect(() => {
        // window.scrollTo({ top: 0, behavior: 'smooth' });
        getFaqList()
    }, [])

    //=======================================================  faq list API =========================

    const getFaqList = async () => {
        
        try {
            await axios({
                method: 'get',
                url: `${config.apiUrl}faqlist`,
                headers: { "Authorization": loginData.data?.Token },
            }).then(response => {
                if (response.data.success === true) {
                    setfaqlist(response.data.response);
                }
            })
        } catch (err) {
            // toast.error(err.response?.data.msg)
        }
    }

    return (
        <>
            <div className="home-page">
                {/* <div id="preloader">
            <div className="preload-content">
              <div id="dream-load" />
            </div>
          </div> */}
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
                <Header />
                <section className="welcome_area clearfix dzsparallaxer auto-init none fullwidth" data-options="{direction: &quot;normal&quot;}" id="about">
                    <div className="divimage dzsparallaxer--target" style={{ width: '101%', height: '130%', backgroundImage: 'url(img/bg-img/2-banner1.png)', transform: 'translate3d(0px, -54.5001px, 0px)' }} />
                    {/* Hero Content */}
                    <div className="hero-content transparent">
                        {/* blip */}
                        <div className="dream-blip blip1" />
                        <div className="dream-blip blip2" />
                        <div className="dream-blip blip3" />
                        <div className="dream-blip blip4" />
                        <div className="dream-blip blip5" />
                        <div className="dream-blip blip6" />
                        <div className="dream-blip blip7" />
                        <div className="dream-blip blip8" />
                        <div className="dream-blip blip9" />
                        <div className="dream-blip blip10" />
                        <div className="container h-100">
                            <div className="row h-100 align-items-center">
                                {/* Welcome Content */}
                                <div className="col-12 col-lg-6 col-md-12">
                                    <div className="welcome-content">
                                        <div className="promo-section">
                                            <h3 className="special-head dark">Barteka Home Center (Do it Best)</h3>
                                        </div>
                                        <h1 className="big fadeInUp" data-wow-delay="0.2s">The most trusted &amp; secure coin wallet</h1>
                                        <p className="w-text fadeInUp" data-wow-delay="0.3s">Buy, store, Send,  &amp; earn coin.</p>
                                        <div className="dream-btn-group fadeInUp" data-wow-delay="0.4s">
                                            <NavLink to={loginData.length === 0 ? `${config.baseUrl}Login` : `${config.baseUrl}`} style={{ cursor: loginData.length === 0 ? '' : 'not-allowed' }} className="btn more-btn mr-3">Sigin</NavLink>
                                            <NavLink to={loginData.length === 0 ? `${config.baseUrl}Signup` : `${config.baseUrl}`} style={{ cursor: loginData.length === 0 ? '' : 'not-allowed' }} className="btn more-btn">Signup</NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* ##### About Us Area Start ##### */}
                <section className="about-us-area features section-padding-100-70 clearfix" id="about">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-12 col-lg-4 col-md-12">
                                <div className="who-we-contant">
                                    <div className="dream-dots text-left fadeInUp" data-wow-delay="0.2s" style={{ visibility: 'visible', animationDelay: '0.2s', animationName: 'fadeInUp' }}>
                                        <span className="gradient-text blue">Barteka Wallet</span>
                                    </div>
                                    <h4 className="fadeInUp" style={{ color: '#fff' }} data-wow-delay="0.3s">Everything you need in one place</h4>
                                    <p className="fadeInUp" data-wow-delay="0.4s">Barteka Wallet is for you if you want to</p>
                                    <a className="btn more-btn mt-30 fadeInUp" data-wow-delay="0.6s" href="#">Read More</a>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12 mt-md-30">
                                <div className="services-block-four v2">
                                    <div className="inner-box">
                                        <div className="icon-img-box">
                                            <img src="img/features/swap.png" alt="" className="token_icons" />
                                        </div>
                                        <h3><a href="#">Send &amp; Hold</a></h3>
                                        <div className="text">Get, Send &amp; hold many different Coins</div>
                                    </div>
                                </div>
                                <div className="services-block-four v2">
                                    <div className="inner-box">
                                        <div className="icon-img-box">
                                            <img src="img/features/earning.png" alt="" className="token_icons" />
                                        </div>
                                        <h3><a href="#">Easily Earn</a></h3>
                                        <div className="text">Easily earn interest on the Coin in your wallet</div>
                                    </div>
                                </div>
                                <div className="services-block-four v2">
                                    <div className="inner-box">
                                        <div className="icon-img-box">
                                            <img src="img/features/buy.png" alt="" className="token_icons" />
                                        </div>
                                        <h3><a href="#">Buy &amp; Sell</a></h3>
                                        <div className="text">Buy more coin with your credit card</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12 mt-md-30 mt-sm-0">
                                <div className="services-block-four v2">
                                    <div className="inner-box">
                                        <div className="icon-img-box">
                                            <img src="img/features/wallet.png" alt="" className="token_icons" />
                                        </div>
                                        <h3><a href="#">Wallet to wallet Transfer</a></h3>
                                        <div className="text">Store wallet to wallet Transfer money</div>
                                    </div>
                                </div>
                                <div className="services-block-four v2">
                                    <div className="inner-box">
                                        <div className="icon-img-box">
                                            <img src="img/features/privacy.png" alt="" className="token_icons" />
                                        </div>
                                        <h3><a href="#">Privacy &amp; Secure</a></h3>
                                        <div className="text">Stay private &amp; secure storing your privacy coins</div>
                                    </div>
                                </div>
                                <div className="services-block-four v2">
                                    <div className="inner-box">
                                        <div className="icon-img-box">
                                            <img src="img/features/trader.png" alt="" className="token_icons" />
                                        </div>
                                        <h3><a href="#">Send &amp; Receive</a></h3>
                                        <div className="text">Send or Receive your assets in seconds.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* ##### About Us Area End ##### */}
                <div className="clearfix" />

                {/* ##### About Us Area Start ##### */}
                <section className="about-us-area section-padding-0-0 clearfix" id="buy">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-12 col-lg-6">
                                <div className="welcome-meter fadeInUp" data-wow-delay="0.7s">
                                    <img src="img/core-img/data3.jpg" className="center-block" alt="" />
                                </div>
                            </div>
                            <div className="col-12 col-lg-6 mt-s">
                                <div className="who-we-contant">
                                    <div className="dream-dots text-left fadeInUp" data-wow-delay="0.2s" style={{ visibility: 'visible', animationDelay: '0.2s', animationName: 'fadeInUp' }}>
                                        <span className="gradient-text blue">Supper Easy to use</span>
                                    </div>
                                    <h4 className="fadeInUp" data-wow-delay="0.3s" style={{ color: '#fff' }}>Buy Coin With a Card</h4>
                                    <p className="fadeInUp" data-wow-delay="0.4s">Get your first $50 of Coins and many other Benifit.</p>
                                    <p className="fadeInUp" data-wow-delay="0.5s">One of the major benefits for staking coins is that it removes the need for continuously purchasing expensive hardware and consuming energy.</p>
                                    <a className="btn more-btn mt-30 fadeInUp" data-wow-delay="0.6s" href="#">Read More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* ##### About Us Area End ##### */}
                {/* ##### About Us Area Start ##### */}
                <section className="about-us-area section-padding-0-100 clearfix" id="services">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-12 col-lg-6">
                                <div className="who-we-contant">
                                    <div className="dream-dots text-left fadeInUp" data-wow-delay="0.2s" style={{ visibility: 'visible', animationDelay: '0.2s', animationName: 'fadeInUp' }}>
                                        <span className="gradient-text blue">Best Coin Experience</span>
                                    </div>
                                    <h4 className="fadeInUp" data-wow-delay="0.3s" style={{ color: '#fff' }}>Send &amp; Receive</h4>
                                    <p className="fadeInUp" data-wow-delay="0.4s">No forms, no selfies. Sell and Receive Coin anytime with ease.</p>
                                    <p className="fadeInUp" data-wow-delay="0.5s">The standard methods for staking are usually holding coins in your wallet or locking them in a smart contract (masternodes).</p>
                                    <a className="btn more-btn mt-30 fadeInUp" data-wow-delay="0.6s" href="#">Read More</a>
                                </div>
                            </div>
                            <div className="col-12 col-lg-6 mt-s">
                                <div className="welcome-meter fadeInUp" data-wow-delay="0.7s">
                                    <img src="img/core-img/data2.jpg" className="center-block" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* ##### About Us Area End ##### */}
                <section className="special fuel-features section-padding-100 clearfix">
                    <div className="container has-shadow">
                        <div className="row align-items-center">
                            <div className="col-12 col-lg-6 offset-lg-0">
                                <div className="who-we-contant">
                                    <div className="dream-dots text-left fadeInUp" data-wow-delay="0.2s" style={{ visibility: 'visible', animationDelay: '0.2s', animationName: 'fadeInUp' }}>
                                        <span className="gradient-text blue">Privacy &amp; Secure</span>
                                    </div>
                                    <h4 className="fadeInUp" data-wow-delay="0.3s">Private &amp; Secure</h4>
                                    <p className="fadeInUp" data-wow-delay="0.4s">You can buy Coin using a card and Send &amp; Recevie them instantly with better privacy and security. You can also buy Coins in a few minutes, earn Coins interest in your wallet, and see your Buy, Receive, and collectibles in a single place.</p>
                                    <div className="services-block-four align-items-center">
                                        <div className="inner-box">
                                            <div className="icon-img-box">
                                                <img src="img/core-img/small-car.png" width={140} alt="" />
                                            </div>
                                            <h3><a href="#">great customer experience</a></h3>
                                            <div className="text">Easy to use, easy to buy, easy to sell</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-6 offset-lg-0 col-md-12 no-padding-left">
                                <div className="welcome-meter fadeInUp mb-30" data-wow-delay="0.7s">
                                    <img src="img/core-img/data4.jpg" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* ##### Our Trial Area End ##### */}
                {/* ##### FAQ & Timeline Area Start ##### */}
                <div className="faq-timeline-area section-padding-100-85" id="faq">
                    <div className="container">
                        <div className="section-heading text-center">
                            {/* Dream Dots */}
                            <div className="dream-dots justify-content-center fadeInUp" data-wow-delay="0.2s">
                                <span className="gradient-text blue">Token FAQ</span>
                            </div>
                            <h2 className="fadeInUp" data-wow-delay="0.3s">  Frequently Questions</h2>
                            <p className="fadeInUp" data-wow-delay="0.4s">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis accumsan nisi Ut ut felis congue nisl hendrerit commodo.</p>
                        </div>
                        <div className="row ">
                            <div className="col-12 col-lg-6 offset-lg-0 col-md-8 offset-md-2 col-sm-12">
                                <img src="img/core-img/faq.png" alt="" className="center-block img-responsive" />
                            </div>
                            <div className="col-12 col-lg-6 col-md-12">
                                <div className="dream-faq-area mt-s ">
                                    {/* uuid="a" */}
                                    <Accordion preExpanded={['a']}>
                                        {faqlist.map(item => (
                                            <AccordionItem>
                                                <AccordionItemHeading>
                                                    <AccordionItemButton>
                                                        <button ref={buttonRef} className="button">
                                                            {item.question}
                                                        </button>

                                                    </AccordionItemButton>
                                                </AccordionItemHeading>
                                                <AccordionItemPanel>
                                                    <p>
                                                        {item.answer}

                                                    </p>
                                                </AccordionItemPanel>
                                            </AccordionItem>
                                        ))}



                                    </Accordion>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* ##### FAQ & Timeline Area End ##### */}
                {/* ##### Team Area Start ##### */}
                <section className="our_team_area section-padding-100-0 clearfix" id="team">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="section-heading text-center">
                                    <div className="dream-dots justify-content-center fadeInUp" data-wow-delay="0.2s">
                                        <span className="gradient-text blue">Our Team</span>
                                    </div>
                                    <h2 className="fadeInUp" data-wow-delay="0.3s">Awesome Team</h2>
                                    <p className="fadeInUp" data-wow-delay="0.4s">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis accumsan nisi Ut ut felis congue nisl hendrerit commodo. </p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-sm-6 col-lg-3">
                                <div className="single-team-member v2 fadeInUp" data-wow-delay="0.2s">
                                    <div className="team-member-thumb">
                                        <img src="img/team-img/1.png" className="center-block" alt="" />
                                    </div>
                                    <div className="team-info">
                                        <h5>Joman Helal</h5>
                                        <p>Executive Officer</p>
                                    </div>
                                    <div className="team-social-icon">
                                        <a href="#"><i className="fa fa-linkedin" /></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 col-lg-3">
                                <div className="single-team-member v2 fadeInUp" data-wow-delay="0.3s">
                                    <div className="team-member-thumb">
                                        <img src="img/team-img/2.png" className="center-block" alt="" />
                                    </div>
                                    <div className="team-info">
                                        <h5>Slans Alons</h5>
                                        <p>Business Development</p>
                                    </div>
                                    <div className="team-social-icon">
                                        <a href="#"><i className="fa fa-linkedin" /></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 col-lg-3">
                                <div className="single-team-member v2 fadeInUp" data-wow-delay="0.4s">
                                    <div className="team-member-thumb">
                                        <img src="img/team-img/3.png" className="center-block" alt="" />
                                    </div>
                                    <div className="team-info">
                                        <h5>Josha Michal</h5>
                                        <p>UX/UI Designer</p>
                                    </div>
                                    <div className="team-social-icon">
                                        <a href="#"><i className="fa fa-linkedin" /></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 col-lg-3">
                                <div className="single-team-member v2 fadeInUp" data-wow-delay="0.5s">
                                    <div className="team-member-thumb">
                                        <img src="img/team-img/4.png" className="center-block" alt="" />
                                    </div>
                                    <div className="team-info">
                                        <h5>Johan Wright</h5>
                                        <p>Head of Marketing</p>
                                    </div>
                                    <div className="team-social-icon">
                                        <a href="#"><i className="fa fa-linkedin" /></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* ##### Team Area End ##### */}
                {/* ##### Footer Area Start ##### */}
                <Footer />
            </div>

        </>
    );
}

export default Home;


