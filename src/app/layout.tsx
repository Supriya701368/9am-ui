"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Login } from "@/Login";
import { appStore } from '../redux/store'
import { Provider } from "react-redux";
import 'bootstrap/dist/css/bootstrap.css'
import LayoutWrapper from "./layoutWrapper";
const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={appStore}>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </Provider>

      </body>
    </html>
  );
}
