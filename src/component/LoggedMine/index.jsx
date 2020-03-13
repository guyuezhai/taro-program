import Taro from '@tarojs/taro';
import {View,Image} from '@tarojs/components';
import { AtAvatar } from "taro-ui";
import {useSelector} from '@tarojs/redux'
import PropTypes from 'prop-types'
import './index.scss'
// import avatar from '../../images/avatar.png'

export default function LoggedMine(props) {
    const nickName=useSelector(state=>state.user.nickName)
    const avatar = useSelector(state=>state.user.avatar)
    
    function onImageClick(){
        Taro.previewImage({
            urls:[avatar]
        })
    }
    return (
        <View className="logged-mine">
            
            {
                avatar?(
                    <Image src={avatar}
                    className="mine-avatar"
                    onClick={onImageClick}
                    />
                ):(
                    <AtAvatar size='large' circle text="taro"/>       
                )
            }
            <View className="mine-nickName">
                {nickName}
            </View>
            
        </View>
    )

}

LoggedMine.propTypes={
    avatar:PropTypes.string,
    nickName:PropTypes.string,
    username:PropTypes.string,
}