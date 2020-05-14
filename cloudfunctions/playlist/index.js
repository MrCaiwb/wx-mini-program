const cloud = require('wx-server-sdk')
cloud.init()
const rp = require('request-promise')
const url = 'http://musicapi.xiecheng.live/personalized'
const db = cloud.database()

const searchNumber = 10
exports.main = async (event, context) => {
  var allList = []
  let playcount = await db.collection('playlist').count()
  let listcount = Math.ceil(playcount.total / searchNumber)

  for (let i = 0; i < listcount; i++) {
    let list = await db.collection('playlist')
    .skip(i * searchNumber)
    .limit(searchNumber)
    .get()
    allList.push(list)
  }
  var mylist = {
    data: []
  }
  
  if (allList.length > 0) {
    mylist = (await Promise.all(allList)).reduce((acc, cur) => {
      return {
        data: acc.data.concat(cur.data)
      }
    })
  } 
  const playlists = await rp(url)
    .then(function (res) {
      return JSON.parse(res).result
    })
    .catch(function (err) {
      console.log(err)
    })

  var taskList = []
  for (let i = 0; i < playlists.length; i++) {
    var flag = true
    for (let j = 0; j < mylist.data.length; j++) {
      if (mylist.data[j].id === playlists[i].id) {
        flag = false
        break
      }
    }
    if (flag) {
      taskList.push(playlists[i])
    }
  }

  for(let i = 0; i < taskList.length; i++) {
    await db.collection('playlist').add({
      data: {
        ...taskList[i],
        createtime: db.serverDate()
      }
    })
      .then((res) => {
        console.log('插入成功')
      })
      .catch((err) => {
        console.log('插入失败')
      })
  }
}
