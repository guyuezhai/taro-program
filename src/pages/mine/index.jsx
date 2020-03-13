import Taro,{useState,useEffect} from '@tarojs/taro';
import {View,Image} from '@tarojs/components';
import {Header,Footer} from '../../component';
import {useDispatch,useSelector} from '@tarojs/redux'

import {SET_LOGIN_INFO} from '../../constants'
import './index.scss';
import avatar from '../../images/avatar.png'
export default function Mine(){
    const dispatch=useDispatch()
    const nickName=useSelector(state=>state.user.nickName)

    const isLogged=!!nickName
    useEffect(() => {
        async function getStorage() {
            try {
                const {data}=await Taro.getStorage({key:'userInfo'})
                const {nickName,avatar,_id}=data
                dispatch({
                    type:SET_LOGIN_INFO,
                    payload:{
                        nickName,avatar,userId:_id
                    }
                })
            } catch (error) {
                console.log('getStroage ERR :', error);    
            }
        }
        if(!isLogged){

            getStorage()
        }
     
    }) 
    return(
        <View className="mine">
            <Header></Header>
            <Footer></Footer>
        </View>
    )
    }
    
  
  
   


Mine.config={
    navigationBarTitleText:"我的"
}