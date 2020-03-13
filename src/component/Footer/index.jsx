import Taro, { useState } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtFloatLayout } from 'taro-ui'

import Logout from '../Logout'
import LoginForm from '../LoginForm'
import './index.scss'

export default function Footer(props) {
    const [formNickName, setFormNickName] = useState("")
    const [files, setFiles] = useState([])
    async function handleSubmit(e) {
        e.preventDefault()

        if (!formNickName || !files.length) {
            Taro.atMessage({
                type:'error',
                message:"您还有内容没有填写！",
            })
            return
        }
        Taro.atMessage({
            type:'success',
            message:"恭喜您，登录成功！",
        })

        const userInfo={avatar:files[0].url,nickName:formNickName}
        await props.handleSubmit(userInfo)

        setFiles([])
        setFormNickName('')
    }

    return(
        <View className="mine-footer">
            {
                props.isLogged && (
                    <Logout loading={props.isLogout} handleLogout={props.handleLogout}/>
                )
            }
            <View className="taro-tip">
                {
                    props.isLogged?'From taro 社区':"您还未登录"
                }
            </View>
            <AtFloatLayout isOpened={props.isOpened} title="登录"
                onClose={()=>props.handleSetIsOpened(false)}
            >
                <LoginForm formNickName={formNickName}
                files={files}
                handleSubmit={e=>handleSubmit(e)}
                handleNickNameInput={e=>setFormNickName(e.target.value)}
                handleFilesSelect={files=>setFiles(files)}
                ></LoginForm>
            </AtFloatLayout>
        </View>
    )
}