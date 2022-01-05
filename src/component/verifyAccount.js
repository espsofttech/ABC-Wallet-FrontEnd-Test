
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import config from '../config/config';
import axios from 'axios';
//import url from '../../public/static/images'


const VerifyAccount = () => {
    const history = useHistory()
    const [form, setForm] = useState({ email: '', password: '' })
    const { token } = useParams()
    const verifytoken = async () => {
        const res = await axios.post(`${config.apiUrl}verifyAccount/` + token)
        console.log(res);
        if (res.data.success === true) {
            toast.success(res.data.msg)
            history.push(`${config.baseUrl}Login`)
        } else {
            toast.error(res.data.msg)
        }
    }
    useEffect(() => {
        verifytoken()
    }, [])


    return (
        <div>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </div>
    );
}

export default VerifyAccount;
