import React, { useState } from 'react'
import { Ajax } from '@/services/Ajax';
import { useDispatch, UseDispatch } from 'react-redux';
import './Log.css'
export const Login = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState({});
    const handleChange = (eve: any) => {
        const { id, value } = eve.target;
        setData({
            ...data,
            [id]: value
        })
    }

    const handleClick = async () => {
        try {
            dispatch({ type: "LOADER", payload: true })
            const res = await Ajax.sendPostReq("std/login", data)
            if (res?.data?.length > 0) {
                if (typeof window !== 'undefined') {
                    sessionStorage.user = res?.data?.[0]?.uid;
                    sessionStorage.token = res?.data?.[0]?.token
                }
                dispatch({ type: "LOGIN", payload: { isLoggedIn: true, user: res?.data?.[0]?.uid } })
            } else {
                alert("check uid and pwd")
            }
        } catch (ex) {

        } finally {
            dispatch({ type: "LOADER", payload: false })
        }

    }
    return (
            <div className='container-fluid'>
          <div className='row' id="row" >
            <div className='col-6'> 
            <h3><img id="img" src='/images/images1.png'/></h3>
                <div className='row'>
                Username: <input id="uid"  className="form-control "onChange={handleChange} />
            </div>
            <div className='row '>
             Password:<input id="pwd" type='password' className="form-control" onChange={handleChange} />
            </div>
            <p>
                <button className="btn btn-primary btn-lg b" onClick={handleClick}>Login</button>
            </p>
</div>
<div className="col-6" id="color">
<img height='500px' width='500px' src='/images/image.png'/>

</div>
        </div>
        </div>

        
    )
}
