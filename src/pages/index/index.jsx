import Taro, { Component, useState } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import {AtFab,AtFloatLayout,AtMessage} from 'taro-ui'   
import { PostCard, PostForm } from '../../component/index.jsx'
import './index.scss'

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
    const [isOpened,setIsOpened]=useState(false)


    const handleSubmit = (e) => {
        e.preventDefault()
        const newPosts = this.state.posts.concat({ title: formTitle, content: formContent })

        setPosts(newPosts)
        setFormContent('')
        setFormTitle('')
        setIsOpened(false)
        Taro.atMessage({
            message:"发表文章成功！",
            type:'success'
        })
    }

    const handleTitleInput = (e) => {
        setFormTitle(e.target.value)
    }
    const handleContentInput = (e) => {
        setFormContent(e.target.value)
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
            {/* <AtFloatLayout
                isOpened={isOpened}
                title={"发表文章"}
                onClose={()=>setIsOpened(false)}
            >
            <PostForm
                formTitle={formTitle}
                formContent={formContent}
                handleContentInput={e => handleContentInput(e)}
                handleTitleInput={e => handleTitleInput(e)}
                handleSubmit={e => handleSubmit(e)}
            ></PostForm>
            </AtFloatLayout> */}
            {/* <View className="post-button">
                <AtFab onClick={()=>setIsOpened(true)}>
                    <Text className="at-fab_icon at-icon at-icon-edit"></Text>
                </AtFab>
            </View> */}
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