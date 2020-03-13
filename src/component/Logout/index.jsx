import Taro from '@tarojs/taro';
import {AtButton} from 'taro-ui';
export default function LogoutButton(props){
    return(
        <AtButton className="atubtn" type="secondary"
            full
            loading={props.loading}
            onClick={props.handleLogout}
        >
            退出登录
        </AtButton>    
    )
}