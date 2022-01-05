import React, { useEffect, useState } from 'react';
import Header from '../directive/header';
import Footer from '../directive/footer';
const Aboutwallet = (props) => {

    useEffect(()=>{
        window.scrollTo({ top: 0, behavior: 'smooth' });

    },[])
    
    return (
        <>
         <div className="home-page">
            <Header />

            {/* ##### Header Area End ##### */}
            {/* ##### Welcome Area Start ##### */}
            <section className="welcome_area clearfix dzsparallaxer auto-init none fullwidth" data-options="{direction: &quot;normal&quot;}" id="about">
                <div className="divimage dzsparallaxer--target" style={{ width: '101%', height: '130%', backgroundImage: 'url(img/bg-img/about-us.png)',transform:"translate3d(0px, -95.4999px, 0px)" }} />
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
                            <div className="col-12 col-lg-6 col-md-12" />
                            {/* Welcome Content */}
                            <div className="col-12 col-lg-6 col-md-12">
                                <div className="welcome-content">
                                    <div className="promo-section">
                                        <h3 className="special-head dark">About ABC Wallet</h3>
                                    </div>
                                    <h1 className="big fadeInUp" data-wow-delay="0.2s">The most trusted &amp; secure  ABC coin wallet</h1>
                                    <p className="w-text fadeInUp" data-wow-delay="0.3s">Buy, store, Send, Receive &amp; earn coin.</p>
                                    <div className="dream-btn-group fadeInUp" data-wow-delay="0.4s">
                                        <a href="#" className="btn more-btn mr-3">Read More</a>
                                        {/* <a href="signup.html" class="btn more-btn">Signup</a> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="clearfix" />
            {/* ##### About Us Area Start ##### */}
            <section className="about-us-area section-padding-0-0 clearfix" id="buy" style={{backgroundColor:'#fff'}}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-12 col-lg-6">
                            <div className="welcome-meter fadeInUp" data-wow-delay="0.7s">
                                <img src="img/bg-img/about-us3.png" className="center-block" alt="" />
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 mt-s">
                            <div className="who-we-contant mt-5">
                                <div className="dream-dots text-left fadeInUp" data-wow-delay="0.2s" style={{ visibility: 'visible', animationDelay: '0.2s', animationName: 'fadeInUp' }}>
                                    <span className="gradient-text blue" style={{color:'#222'}}>A BETTER WAY TO PAY IS FINALLY HERE</span>
                                </div>
                                <h4 className="fadeInUp about-h4" data-wow-delay="0.3s">About ABC Wallet</h4>
                                <p className="fadeInUp p-fade" data-wow-delay="0.4s">Abc Wallet was created in 2021 as a direct result of a persistent problem. The Caribbean faced challenges with digital payments and the lack of ‘financial inclusion’ for the majority of persons. Abc Wallet, developed a uniquely ‘inclusive’ platform that is secure, flexible and simple to use. Abc Wallet allows anything connected to the Internet to move money quickly, safely and easily for the ‘Banked’ and for the ‘Unbanked'.</p>
                                <p className="fadeInUp p-fade" data-wow-delay="0.5s">Abc Wallet integrates with existing legacy systems to bring payments over the Internet to any industry, taking advantage of the latest developments in technology; built on blockchain making it safe and secure.</p>
                                <a className="btn more-btn mt-30 fadeInUp" data-wow-delay="0.6s" href="#">Read More</a>
                            </div>
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-12 col-lg-6 mt-s">
                            <div className="who-we-contant mt-5">
                                <div className="dream-dots text-left fadeInUp" data-wow-delay="0.2s" style={{ visibility: 'visible', animationDelay: '0.2s', animationName: 'fadeInUp' }}>
                                    {/* <span class="gradient-text blue" style={{color:'#222'}}>A BETTER WAY TO PAY IS FINALLY HERE</span> */}
                                </div>
                                <h4 className="fadeInUp about-h4" data-wow-delay="0.3s">JOHAN WRIGHT</h4>
                                <span className="gradient-text blue" style={{color:'#222'}}>CEO ABC Wallet</span>
                                <p className="fadeInUp p-fade" data-wow-delay="0.4s">ABC WALLET IS THE NUMBER ONE PAYMENT PLATFORM IN THE CARIBBEAN EMPOWERING PEOPLE TO ACCEPT AND MAKE PAYMENTS ONLINE USING ALL FORMS OF PAYMENT IN LOCAL CURRENCY.</p>
                                <a className="btn more-btn mt-30 fadeInUp" data-wow-delay="0.6s" href="#">Read More</a>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6">
                            <div className="welcome-meter fadeInUp" data-wow-delay="0.7s">
                                <img src="img/team-img/5.png" className="center-block" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer chagneClass="whiteFooter"/>
            </div>
        </>
    );
}

export default Aboutwallet;
















