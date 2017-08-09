//
import getCalendarItems from './src/getCalendarItems'
import getRest from './src/getRest'
import postTips from './src/postTips'
import timer from './utils/timer'
import checkOneTimeOneDay from './src/checkOneTimeOneDay'
import _ from './config'

function getMeiCanData () {
  return getCalendarItems().then(data => {
    return data.dateList[0].calendarItemList.map(i => {
      return getRestData(i.title, i.status, i.userTab.uniqueId, i.openingTime.postboxOpenTime)
    })
  })
}

function getRestData (title, status, id, time) {
  return getRest(id, time).then(data => {
    return { [`${title} ${status} ${time}`]: data.restaurantList.map(r => r.name) }
  })
}

function doTip(checkOneTimeOneDay) {
  getMeiCanData().then(data => {
    Promise.all(data).then((data) => {
      let text = ''
      console.log(data)
      data.forEach(o => {
        const key = Object.keys(o)[0]
        if (key.indexOf(_.TARGET_ADDR) > -1 && key.indexOf('AVAILABLE') >= 0) {
          text += `##### **${key.replace(/[CLOSED|ORDER]|晚餐\d/g, '')}**
          店铺: ${o[key].map(t => ` ${t}`)}
          `
        }
      })
      if (checkOneTimeOneDay(text)) {
        postTips(text)
      }
    })
  })
}

timer(doTip)(checkOneTimeOneDay)
