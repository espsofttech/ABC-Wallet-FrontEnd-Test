// import React, { useEffect, useState } from 'react';
// import Header from '../directive/header';
// import Footer from '../directive/footer';
// import { NavLink } from 'react-router-dom';
// const helpcenter = (props) => {

//     useEffect(() => {
//         window.scrollTo({ top: 0, behavior: 'smooth' });

//     }, [])

//     return (
//         <>

//             {/* Preloader */}
//             <Header />

//             {/* ##### Header Area Start ##### */}
//             {/* Login Start */}

//             <section className="Privacy-policy">
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-lg-12 col-xl-12 col-md-12 col-sm-12">
//                             <div className="Privacy-policy-content">
//                                 <h2>Help</h2>
//                                 <p>Abc Wallet Payment Solutions and our affiliates (“Abc Wallet”, “we”, “our” or “us”) are committed to respecting your privacy and to complying with applicable data protection and privacy laws. This Privacy Policy is provided to help you understand how we may collect, use, disclose, protect and otherwise deal with your information, whether you are a person acting on your own behalf or on behalf of a business, entity or charitable organization. This Privacy Policy applies to information collected in connection with your access to and use of our Services.<br />
//                                     You acknowledge that by providing your information to Abc Wallet, you consent to the processing of your data in accordance with this Privacy Policy. You should read this policy in conjunction with the Consumer Terms of Use and Merchant Terms of Use associated with our services.
//                                     This Privacy Policy complies with the Trinidad and Tobago Data Protection Act, 2011, and covers all Abc Wallet businesses and entities in all countries in which Abc Wallet operates.</p>
//                                 <h2>INFORMATION WE COLLECT ABOUT YOU</h2>
//                                 <p>We use your data to make ABC Wallet products and services work better for you and for others. This describes what data we collect about you (which can vary depending on your country of residence).</p>
//                                 <p>Abc Wallet collects and uses your personal information with your knowledge and consent and typically when you:</p>
//                                 <ul className="collect-info">
//                                     <li>Use Abc Wallet's range of services that are offered, including our online, mobile and smart terminal services and products;</li>
//                                     <li>Respond to communications from us (such as SMS, emails, questionnaires or surveys);</li>
//                                     <li>Participate on Abc Wallet's social media pages such as Facebook and Instagram;</li>
//                                     <li>Participate in Abc Wallet's promotional events, incentives or loyalty programs;</li>
//                                     <li>Provide information through Abc Wallet's customer support centre, authorized agents or any other affiliates or business dealings with Abc Wallet for which you have consented to provide your personal information.</li>
//                                 </ul>
//                                 <h2 className="mt-3"> Types of Information Collected</h2>
//                                 <p>The types of information that Abc Wallet may collect include, but are not limited to:</p>
//                                 {/* <p>Abc Wallet collects and uses your personal information with your knowledge and consent and typically when you:</p> */}
//                                 <ul className="collect-info">
//                                     <li>Use Abc Wallet's range of services that are offered, including our online, mobile and smart terminal services and products;</li>
//                                     <li>contact information (such as name, mailing address, email address and telephone number)</li>
//                                     <li>identification information (such as passport details, driver's license details, national ID details)</li>
//                                     <li>demographic information (such as age, gender)</li>
//                                     <li>banking information (such as bank account number, name on bank account, name of bank, routing number)</li>
//                                 </ul>
//                                 <h2 className="mt-3"> INFORMATION WE MAY COLLECT ABOUT YOUR CUSTOMERS</h2>
//                                 <p>We also obtain information about your customers when they transact with you. We collect this data when they transact with you through your use of Abc Wallet’s services, for instance when they make a payment to you or receive a request for payment from you. The particular customer data we collect will vary depending on how you use our services and which products and services you use. The customer data may include:</p>
//                                 {/* <p>Abc Wallet collects and uses your personal information with your knowledge and consent and typically when you:</p> */}
//                                 <ul className="collect-info">
//                                     <li><strong>Identification Information: </strong> Your customer’s name; email address; mailing address; phone number; government-issued identification.</li>
//                                     <li><strong>Transaction Information: </strong>When your customers use Abc Wallet’s services to make payments to you, we collect information about when the transactions occur, a description of the transactions which may include item-level data, the payment or transfer amounts, and the payment methods used to complete the transactions.</li>
//                                 </ul>
//                                 <h2 className="mt-3">SECURITY</h2>
//                                 <p>We do a lot to keep your data safe. While we think we have strong defenses in place, no one can ever guarantee that hackers won’t be able to break into our sites or steal your data while it is stored or flowing from you to us or vice versa.</p>
//                                 <p>We take reasonable measures, including administrative, technical, and physical safeguards, to protect your information from loss, theft, and misuse, and unauthorized access, disclosure, alteration, and destruction. We also engage well-known technologies including but not limited to firewalls, intrusion detection, encryption, SSL (Secure Sockets Layer) and vulnerability assessments. Nevertheless, the internet is not a 100% secure environment, and we cannot guarantee absolute security of the transmission or storage of your information. We hold information about you both at our own premises and with the assistance of third-party service providers.</p>
//                                 <h2 className="mt-3">CHANGES TO THIS PRIVACY POLICY</h2>
//                                 <p>We reserve the right to make changes to this privacy policy at any time and in response to changes in applicable data protection and privacy legislation. When the changes impact your rights or how we use your data in important ways, we’ll notify you by email (if we have your email address) and post the revised policy on our website.</p>
//                                 <p>We may amend this Privacy Policy from time to time by posting a revised version on our website. We will provide you thirty (30) days’ prior notice of material changes in how we use your information, including by email if you have provided one. If you disagree with these changes, you may cancel your Abc Wallet account and/or discontinue use of our Services. If you keep using our Services, you consent to any amendment of this Privacy Policy..</p>
//                                 <h2 className="mt-3">Merchant Terms of Use</h2>
//                                 <p>Welcome to Abc Wallet! We’re excited to have you here. Before you start using Abc Wallet, we do need you to look through and agree to these Merchant Terms of Use. We’ve done our best to explain it all without using too much jargon, so it’s clear what we expect from you and what you can expect from us.</p>
//                                 <p>These are your legal rights and obligations, so please do read everything. If you still have questions or comments after you’ve read these terms, please take a look at our FAQ’s (https://Abc Walletcaribbean.com/faq/). If you can’t find the answer you’re looking for there, please feel free to contact us at support@Abc Wallettoday.com or (868) 235-4729. We’d love to help.</p>
//                                 <p>These Merchant Terms of Use (“Merchant Terms”) are a legal agreement between you (“you” or “your”) and Abc Wallet Payment Solutions Limited (“Abc Wallet”, “we”, “our” or “us”) and govern your use of Abc Wallet’s services, as described below. If you are using Abc Wallet’s services on behalf of a business, you represent to us that you have authority to bind that business or entity to these terms, and that business accepts these terms. By using any of Abc Wallet’s services, you agree to these Merchant Terms and any policies referenced within, including our Privacy Policy and terms that limit our liability. You also agree to any additional terms specific to services you use, such as those listed below, which become part of your agreement with us (collectively, the “Terms”). You should read all of our Terms carefully, noting that not all services are supported in the countries in which Abc Wallet operates.</p>
//                                 <ul className="collect-info">
//                                     <li><strong>Consumer Terms of Use: </strong>These terms apply when you use our services to make payments.</li>
//                                     <li><strong>Card Payment Terms of Use: </strong>These terms apply to all card payments made through our services.</li>
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             {/* ########## All JS ########## */}
//             <Footer hideFooterClass="HideFooter" />

//         </>
//     );
// }

// export default helpcenter;
















