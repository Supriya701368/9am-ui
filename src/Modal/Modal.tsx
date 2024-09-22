import React, { useState } from 'react'
import styles from './Modal.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { Ajax } from '@/services/Ajax';
export const Modal = () => {
    const dispatch = useDispatch();

    const [data, setData] = useState(useSelector((state: any) => state?.appReducer?.student) || {})

    const fnUpdate = async () => {
        try {
            const id = data?._id;
            delete data?._id
            var dataObj = {
                "data": data
            }
            dispatch({ type: "LOADER", payload: true })
            const res = await Ajax.sendPutReq(`std/update-std?id=${id}`, dataObj)
            const { acknowledged, modifiedCount } = res?.data;
            if (acknowledged && modifiedCount) {
                dispatch({ type: "MODAL", payload: { isShowModal: false, student: {} } })
                dispatch({ type: "GET_STUDENTS" })
                alert('success')
            } else {
                dispatch({ type: "MODAL", payload: { isShowModal: false, student: {} } })
                alert('fail')
            }


        } catch (ex: any) {
            console.error(ex);
            alert(ex.message);
        } finally {
            dispatch({ type: "LOADER", payload: false })
        }
    }

    const handleChange = (eve: any) => {
        const { name, value } = eve.target;
        setData({ ...data, [name]: value })
    }

    const fnClose = () => {
        dispatch({ type: "MODAL", payload: { isShowModal: false, student: {} } })
    }
    return (
        <div>
            <div className={styles.mask}></div>
            <div className={`px-3 py-3 ${styles.modalContent}`}>
                <h5 className="mb-5">
                    <h3>Register</h3>
                    <p>
                        <b>Name:</b><input value={data?.name} name="name" onChange={handleChange} />
                    </p>
                    <p>
                        <b>Rno:</b><input value={data?.rno} name="rno" type='number' onChange={handleChange} />
                    </p>
                    <p>
                        <b>Location:</b><textarea value={data?.loc} name="loc" onChange={handleChange} />
                    </p>

                </h5>
                <div className="text-end">
                    <button className="btn btn-dark me-3" onClick={fnUpdate} >
                        UPDATE
                    </button>
                    <button className="btn btn-dark" onClick={fnClose} >
                        CLOSE
                    </button>
                </div>
            </div>
        </div>
    );
};