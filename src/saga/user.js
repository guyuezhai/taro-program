import Taro from '@tarojs/taro'
import {call,put,take,fork} from 'redux-saga/effects'

import {userApi} from '../api'
import {
    SET_LOGIN_INFO,
    LOGIN_ERROR,
    LOGIN,
    LOGIN_SUCCESS,
    SET_IS_OPENED
} from '../constants';

function* login(userInfo) {
    try {
       
        const user=yield call(userApi.login,userInfo)
        console.log('--------------------------',user)
        yield Taro.setStorage({key:'userInfo',data:user})

        yield put({type:LOGIN_SUCCESS})

        yield put({type:SET_IS_OPENED,payload:{isOpened:false}})

        const {nickName,avatar,_id}=user

        yield put({
            type:SET_LOGIN_INFO,
            payload:{nickName,avatar,userId:_id}
        })

        Taro.atMessage({
            type:'success',
            message:'恭喜您，登录成功！'
        })
    } catch (error) {
        console.log('login Err :', error);

        yield put({type:LOGIN_ERROR})

        Taro.atMessage({
            type:'error',
            message:'很遗憾，登录失败！'
        })
    }
}

function* watchLogin() {
    while (true) {
        const {payload}=yield take(LOGIN)
        console.log('payload :', payload);
        yield fork(login,payload.userInfo)
    }
}
export {watchLogin}