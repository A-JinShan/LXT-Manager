import axios from "axios";
import {message} from "antd";

export const baseURL = "http://localhost:5000"

axios.defaults.baseURL = baseURL

//1.分层解耦 2.业务植入 3.统一API
export function ajax(url,data={},method="get"){
    return new Promise((resolve, reject)=>{
        if(method.toLowerCase() === "get"){
            axios.get(url,{params:data}).then(response=>{
                resolve(response.data)
            }).catch(error=>{
                message.warn("网络出现问题:" + error.message)
                // reject(error)
            })
        }else{
            axios.post(url,data).then(response=>{
                resolve(response.data)
            }).catch(error=>{
                message.warn("网络出现问题:" + error.message)
                // reject(error)
            })
        }
    })


}