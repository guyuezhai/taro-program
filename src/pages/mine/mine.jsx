import Taro,{useState,useEffect} from '@tarojs/taro';
import {View,Image} from '@tarojs/components';
import {Header,Footer} from '../../component';
import './index.scss';
import avatar from '../../images/avatar.png'
export default function Mine(){
    const [nickName, setNickName] = useState("")
    const [avatar, setAvatar] = useState("")
    const [isOpened, setIsOpened] = useState(false)
    const [isLogout, setIsLogout] = useState(false)

    const isLogged=!!nickName
    useEffect(() => {
        async function getStorage() {
            try {
                const {data}=await Taro.getStorage({key:'userInfo'})
                const {nickName,avatar}=data
                setAvatar(avatar)
                setNickName(nickName)
            } catch (error) {
                console.log('getStroage Err :', error);    
            }
        }
        getStorage()
     
    }) 
    async function setLoginInfo(avatar,nickName) {
        setAvatar(avatar)
        setNickName(nickName)
        try {
            await Taro.setStorage({
                key:'userInfo',
                data:{avatar,nickName}
            })
        } catch (error) {
            console.log('setStorage Err :', error);
        }
    }
    async function handleLogout() {
        setIsLogout(true)
        try {
            await Taro.removeStorage({
                key:'userInfo'
            })
            setAvatar('')
            setNickName('')
        } catch (error) {
            console.log('removeStorage Err :', error);
        }
        setIsLogout(false)
    }
    function handleSetIsOpened(isOpened) {
        setIsOpened(isOpened)
    }
    function handleClick() {
        handleSetIsOpened(true)
    }
    async function handleSubmit(userInfo) {
        await Taro.setStorage({key:'userInfo',data:userInfo})
        setAvatar(userInfo.avatar)
        setNickName(userInfo.nickName)

        setIsOpened(false)
    }
    return(
        <View className="mine">
            <Header
             isLogged={isLogged}
             userInfo={{avatar,nickName}}
             handleClick={handleClick}
             setLoginInfo={setLoginInfo}
            ></Header>
            <Footer
                isLogged={isLogged}
                isOpened={isOpened}
                isLogout={isLogout}
                handleLogout={handleLogout}
                handleSetIsOpened={handleSetIsOpened}
                handleSubmit={handleSubmit}
            ></Footer>
        </View>
    )
}

Mine.config={
    navigationBarTitleText:"我的"
}