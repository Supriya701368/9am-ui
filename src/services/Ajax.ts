"use client"
import axios from "axios";


const BASE_URL = 'https://9amserver-2y26.vercel.app/'

if (typeof window !== 'undefined') {
    // Add a request interceptor
    axios.interceptors.request.use(function (req) {
        // Do something before request is sent
        req.headers.Authorization = sessionStorage?.token
        return req;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

    // Add a response interceptor
    axios.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    }, function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    });
}

export class Ajax {
    static sendGetReq(url: string) {
        return axios.get(BASE_URL + url);
    }
    static sendPostReq(url: string, data: any) {
        return axios.post(BASE_URL + url, data);
    }
    static sendPutReq(url: string, data: any) {
        return axios.put(BASE_URL + url, data);
    }
    static sendDeleteReq(url: string, data: any) {
        return axios.delete(BASE_URL + url, data)
    }
}