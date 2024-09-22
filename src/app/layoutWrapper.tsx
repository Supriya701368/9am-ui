"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Login } from "@/Login";
import { appStore } from '../redux/store'
import React, { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Modal } from '../Modal'
import { Loader } from "@/Loader";

const inter = Inter({ subsets: ["latin"] });



export default function LayoutWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage?.user) {
      dispatch({ type: "LOGIN", payload: { isLoggedIn: true, user: sessionStorage?.user } })
    }
  }, [])
  const isLoggedIn = useSelector((state: any) => {
    return state?.appReducer?.isLoggedIn
  })
  const user = useSelector((state: any) => {
    return state?.appReducer?.user
  })

  const isShowModal = useSelector((state: any) => {
    return state?.appReducer?.isShowModal
  })

  const isShowLoader = useSelector((state: any) => {
    return state?.appReducer?.isShowLoader
  })
  const handleLogout = () => {
    const bool = confirm("R u sure...")
    if (bool) {
      sessionStorage.clear();
      dispatch({ type: "LOGIN", payload: { isLoggedIn: false, user: "" } });
    }
  }
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={appStore}>
          {isLoggedIn ? <div>
            <div>
            <h3>Welcome {user}</h3>
            <div><img src="./images/images1.png"/></div>
            </div>
            <div><button className="btn btn-info"onClick={handleLogout}>Logout</button></div>
            {children}
          </div> : <Login />}
          {isShowModal && <Modal />}
          {isShowLoader && <Loader />}
        </Provider>

      </body>
    </html>
  );
}
