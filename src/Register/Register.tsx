"use client";
import { Ajax } from '@/services/Ajax';
import React, { useState, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import './Register.css';

interface RegisterProps {
    setIsRegistered: React.Dispatch<React.SetStateAction<boolean>>;
}

interface RegisterData {
    name?: string;
    rno?: number;
    loc?: string;
}

export const Register: React.FC<RegisterProps> = ({ setIsRegistered }) => {
    const dispatch = useDispatch();
    const [data, setData] = useState<RegisterData>({});

    const fnRegister = async () => {
        try {
            const dataObj = { data };
            dispatch({ type: "LOADER", payload: true });

            const res = await Ajax.sendPostReq('std/register', dataObj);
            const { acknowledged, insertedId } = res?.data;

            if (acknowledged && insertedId) {
                dispatch({ type: "GET_STUDENTS" });
                alert('Registration successful');

                // Change state to show the Users component
                setIsRegistered(true);
            } else {
                alert('Registration failed');
            }
        } catch (ex: any) {
            console.error(ex);
            alert(ex.message);
        } finally {
            dispatch({ type: "LOADER", payload: false });
        }
    };

    const handleChange = (eve: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = eve.target;
        setData({ ...data, [name]: name === "rno" ? Number(value) : value });
    };

    return (
        <div id="position">
            <h3>Register</h3>
            <p>
                Name: <input className='form-control' name="name" onChange={handleChange} />
            </p>
            <p>
                <b>Rno:</b> <input className='form-control' name="rno" type='number' onChange={handleChange} />
            </p>
            <p>
                <b>Location:</b> <textarea className="form-control" name="loc" onChange={handleChange} />
            </p>
            <p>
                <button className="btn btn-info" onClick={fnRegister}>Register</button>
            </p>
        </div>
    );
};
