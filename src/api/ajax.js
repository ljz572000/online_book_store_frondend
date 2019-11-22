/**
 * 能发送异步ajax请求的函数模块
 * 封装axios库
 * 函数的返回值是promise对象
 */
import axios from 'axios'
import Qs from 'qs';
import {message} from 'antd';

 export default function ajax(url,data={},type='GET'){

    return new Promise((resolve, reject)=>{
        let promise;
        if(type==='GET'){
            promise = axios.get( url,{params: data}, {maxContentLength: 1024000},);
        }else{
            promise = axios.post(url, Qs.stringify(data));
        }
        promise.then(response =>{
            resolve(response.data);
        }).catch(error=>{
            message.error('出错了'+error.message);
        })
    });
 }