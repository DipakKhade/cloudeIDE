import { atom } from "recoil";

export const userAtom = atom<{
    isLoggedin:boolean,
    user?:{
        email:string
    }
}>({
    key:'useratom',
    default:{
        isLoggedin:false
    }
})