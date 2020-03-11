import Taro from '@tarojs/taro';
import {View,Image} from '@tarojs/components';
import './index.scss';
import avatar from '../../images/avatar.png'
export default function Mine(){
    return(
        <View className="mine">
            <View>
                <Image src={avatar} className="mine-avatar"></Image>
                <View className="mine-nickName">古月飞</View>
                <View className="mine-username">guyuefei</View>
            </View>
            <View className="mine-footer"> From taro 社区</View>
        </View>
    )
}

Mine.config={
    navigationBarTitleText:"我的"
}