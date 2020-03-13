// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env:cloud.DYNAMIC_CURRENT_ENV,
})

const db=cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {

  const {userInfo}=event
  
  try {
      const {data}=await db.collection('user').where({nickName:userInfo.nickName}).get()
      console.log('event--------------------------',userInfo,data)
      if(data.length>0){
          return {
              user:data[0]
          }
      }else{
          const {_id}=await db.collection('user').add({
              data:{
                  ...userInfo,
                  createAt:db.serverDate(),
                  uodateAt:db.serverDate()
              }
          })
          const user=await db.collection('user').doc(_id)
          return {
              user
          }
      }
  } catch (error) {
      console.log('login db Err :', error);
  }


}