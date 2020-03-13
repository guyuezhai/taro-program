import Taro,{useState} from '@tarojs/taro';
import {Button} from '@tarojs/components';
import { useDispatch} from '@tarojs/redux'
import {LOGIN} from '../../constants'
import './index.scss'
export default function LoginButton(props){
    const [isLogin,setIsLogin]=useState(false)
    const dispatch=useDispatch()

    async function onGetUserInfo(e){
        setIsLogin(true)
        const {avatarUrl,nickName}=e.detail.userInfo;
        const userInfo={avatar:avatarUrl,nickName}
        console.log('userInfo',userInfo)
        dispatch({
            type:LOGIN,
            payload:{
                userInfo:userInfo
            }
        })
        setIsLogin(false)
    }
    return(
        <Button className="login-button"
        type="primary"
        openType="getUserInfo"
        onGetUserInfo={onGetUserInfo}
        loading={isLogin}
        >
            微信登录
        </Button>
    )
}