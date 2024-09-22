"use client"
import React, { useState } from 'react';
import { Register } from '@/Register/Register';
import { Users } from '@/Users';

const Home: React.FC = () => {
    const [isRegistered, setIsRegistered] = useState(false);

    return (
        <div>
            {!isRegistered ? (
                <Register setIsRegistered={setIsRegistered} />
            ) : (
                <Users />
            )}
        </div>
    );
};

export default Home;
