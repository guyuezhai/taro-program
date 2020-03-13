import Taro, { useState,useEffect } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtFab, AtFloatLayout, AtMessage } from 'taro-ui'
import {useSelector,useDispatch} from '@tarojs/redux';
import { PostCard, PostForm } from '../../component/index.jsx'
import './index.scss'

import {
    SET_LOGIN_INFO,
} from '../../constants'
export default function Index() {
    const [posts, setPosts] = useState(
        [
            {
                title: '嗯嗯啊啊',
                content: 'nenqnwenncknkdnfkn'
            }
        ]
    )
    const [formTitle, setFormTitle] = useState('')
    const [formContent, setFormContent] = useState('')
    const [isOpened, setIsOpened] = useState(false)
    const nickname=useSelector(state=>state.user.nickName)
    const isLogged=!!nickname
    const dispatch=useDispatch()

    useEffect(() => {
        const WeappEnv=Taro.getEnv()==Taro.ENV_TYPE.WEAPP
        if (WeappEnv) {
            Taro.cloud.init()
        }
        async function getStorage() {
            try {
                const {data }=await Taro.getStorage({key:'userInfo'})
                const {nickName,avatar,_id}=data
                dispatch({
                    type:SET_LOGIN_INFO,
                    payload:{
                        nickName,avatar,userId:_id
                    }
                })
            } catch (error) {
                console.log('getStorage Err :', error);
            }
        }
        if(!isLogged){
            getStorage()
        }
  
    }, []) 
    const handleSubmit = (e) => {
        e.preventDefault()
        const newPosts = this.state.posts.concat({ title: formTitle, content: formContent })

        setPosts(newPosts)
        setFormContent('')
        setFormTitle('')
        setIsOpened(false)
        Taro.atMessage({
            message: "发表文章成功！",
            type: 'success'
        })
    }

    return (
        <View className='index'>
            <AtMessage></AtMessage>
            {
                posts.map((post, index) => (
                    <PostCard
                        key={index}
                        title={post.title}
                        content={post.content}
                        isList
                    />
                )

                )
            }
            <AtFloatLayout
                isOpened={isOpened}
                title="发表新文章"
                onClose={() => setIsOpened(false)}
            >
                <PostForm
                    formTitle={formTitle}
                    formContent={formContent}
                    handleSubmit={e => handleSubmit(e)}
                    handleTitleInput={e => setFormTitle(e.target.value)}
                    handleContentInput={e => setFormContent(e.target.value)}
                />
            </AtFloatLayout>

            <View className="post-button">
                <AtFab onClick={() => setIsOpened(true)}>
                    <Text className="at-fab__icon at-icon at-icon-edit"></Text>
                </AtFab>
            </View>


        </View>
    )

}

Index.config = {
    navigationBarTitleText: '首页'
}