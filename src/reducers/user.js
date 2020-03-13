import {
    SET_IS_OPENED,
    LOGIN,
    LOGIN_ERROR,
    LOGIN_SUCCESS,
    LOGIN_NORMAL,
    SET_LOGIN_INFO
} from '../constants';

const INITIAL_STATE={
    userId:'',
    avatar:'',
    nickName:'',
    isOpened:false,
    isLogin:false,
    loginStatus:LOGIN_NORMAL
}

export default function user(state=INITIAL_STATE,action) {
    switch (action.type) {
        case SET_IS_OPENED:
            const {isOpened}=action.payload
            return {...state,isOpened}
        case SET_LOGIN_INFO:
            const {avatar,nickName,userId}=action.payload
            return {...state,avatar,nickName,userId}
        case LOGIN:
            return {...state,loginStatus:LOGIN,isLogin:true}
        case LOGIN_SUCCESS:
            return {...state,loginStatus:LOGIN_SUCCESS,isLogin:false}
        case LOGIN_ERROR:
            return {...state,loginStatus:LOGIN_ERROR,isLogin:false}
        default:
            return state
    }
}