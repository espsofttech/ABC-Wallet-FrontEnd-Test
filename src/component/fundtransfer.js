import React, { useEffect, useRef, useState } from 'react';
import Header from '../directive/header';
import Footer from '../directive/footer';
import { useHistory, useParams } from 'react-router-dom';

import config from '../config/config';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Fundtransfer = (props) => {

    const history = useHistory()
    const { token } = useParams()
    const verifytoken = async () => {

        try {
            await axios({
                method: 'post',
                url: `${config.apiUrl}approveTransferFund`,
                data: { 'code': token }
            }).then(response => {
                if (response.data.success === true) {
                    toast.success(response.data.msg)
                }
            })
        } catch (err) {
            toast.error(err.response?.data.msg)
        }
    }


    useEffect(() => {
        verifytoken()
    }, [])

    return (
        <>
            <div className="home-page">
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
                <Header />

                <h3 className="fundTransferCss">Your Fund is deposit succesfully!</h3>

                <Footer />
            </div>

        </>
    );
}

export default Fundtransfer;


