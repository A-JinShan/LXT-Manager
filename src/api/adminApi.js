import {ajax} from "../tools/Ajax";
import store from "store"

export const USERKEY = "USERKEY"

export function saveUser(userObj){
    store.set(USERKEY,userObj)
}

export function getUser(userKey){
    return store.get(userKey)||{}
}

export function isLogin(){
    let user = getUser(USERKEY)
    return user.id !== undefined
}

export function exit(){
    store.remove(USERKEY)
}

export function checkLogin(account,password){
    return ajax("/api/manager/admin/login", {account,password},"post")
}