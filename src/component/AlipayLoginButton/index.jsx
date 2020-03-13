import Taro,{useState} from '@tarojs/taro';
import {useDispatch} from '@tarojs/redux';
import {Login, LOGIN} from '../../constants'
import { Button } from "@tarojs/components";
import './index.scss'
export default function LoginButton(props){
    const [isLogin,setIsLogin]=useState(false)
    const dispatch=useDispatch()
    async function onGetAuthorize(res){
        setIsLogin(true)
        try{
            let userInfo=await Taro.getOpenUserInfo()
            userInfo=JSON.parse(userInfo.response).response
            const {avatar,nickName}=userInfo
            dispatch({
                type:LOGIN,
                payload:{
                    avatar,
                    nickName
                }
            })
           
        }catch(err){
            console.log('onGetAuthorize ERR',err)
        }
        setIsLogin(false)
    }
    return(
        <Button className="login-button" type="primary"
        scope="userInfo" openType="getAuthorize"
        onGetAuthorize={onGetAuthorize} loading={isLogin}
        >
            支付宝登录
        </Button>
    )
}